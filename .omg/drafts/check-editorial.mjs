import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const htmlPath = path.resolve('index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const errors = [];

// 1. Check that the sticky top template selector header panel (<header ...>) is completely removed
if (/<header\b/i.test(html)) {
  errors.push('Top <header> panel still exists in index.html');
}
for (const forbidden of [
  'tab-btn-A',
  'tab-btn-B',
  'tab-btn-C',
  '1. 모던 스플릿',
  '2. 벤토 대시보드',
  '3. 에디토리얼 미니멀',
  'DEV PORTFOLIO',
  '3 TEMPLATES',
  'renderTemplateA',
  'renderTemplateB',
  'filterProjectsB',
  'switchTemplate'
]) {
  if (html.includes(forbidden)) {
    errors.push(`Forbidden top-panel or multi-template symbol still exists in index.html: ${forbidden}`);
  }
}

// 2. Check explicit brief constraints: brand palette tokens, modal markup, toast markup, and footer
for (const requiredHtml of [
  '#6A89A7',
  '#BDDDFC',
  '#888DF2',
  '#384959',
  '#F4F8FB',
  'id="template-viewport"',
  'id="doc-modal"',
  'id="toast-box"',
  '<footer'
]) {
  if (!html.includes(requiredHtml)) {
    errors.push(`Required HTML/brand constraint missing: ${requiredHtml}`);
  }
}

// 3. Extract main portfolio inline <script> and execute it in a minimal DOM sandbox to verify runtime behavior
const scriptMatches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)];
if (scriptMatches.length < 2) {
  errors.push('Expected inline <script> blocks (tailwind config and portfolio script) in index.html');
} else {
  const mainScript = scriptMatches[scriptMatches.length - 1][1];

  // Syntax & runtime verification using node:vm
  const elements = {
    'template-viewport': { innerHTML: '' },
    'toast-box': {
      classList: {
        classes: new Set(['hidden']),
        remove(c) { this.classes.delete(c); },
        add(c) { this.classes.add(c); }
      }
    },
    'toast-message': { textContent: '' },
    'doc-modal': {
      classList: {
        classes: new Set(['hidden']),
        remove(c) { this.classes.delete(c); },
        add(c) { this.classes.add(c); }
      }
    },
    'modal-doc-title': { textContent: '' },
    'modal-doc-meta': { textContent: '' },
    'modal-doc-date': { textContent: '' },
    'modal-doc-desc': { textContent: '' },
    'modal-doc-highlights': { innerHTML: '' },
    'modal-download-btn': { onclick: null }
  };

  let domContentLoadedCallback = null;
  let lucideIconsCalled = false;

  const sandbox = {
    tailwind: {},
    lucide: {
      createIcons() {
        lucideIconsCalled = true;
      }
    },
    window: {
      addEventListener(event, cb) {
        if (event === 'DOMContentLoaded') domContentLoadedCallback = cb;
      },
      scrollTo() {}
    },
    document: {
      getElementById(id) {
        return elements[id] || null;
      },
      createElement() {
        return { value: '', select() {}, click() {}, href: '', download: '' };
      },
      body: {
        appendChild() {},
        removeChild() {}
      },
      execCommand() {
        return true;
      }
    },
    Blob: class {},
    URL: {
      createObjectURL() { return 'blob:test'; },
      revokeObjectURL() {}
    },
    setTimeout() { return 1; },
    clearTimeout() {},
    console
  };

  try {
    vm.createContext(sandbox);
    vm.runInContext(mainScript, sandbox);

    if (typeof domContentLoadedCallback !== 'function') {
      errors.push('DOMContentLoaded listener was not registered by the inline script');
    } else {
      domContentLoadedCallback();
    }

    const rendered = elements['template-viewport'].innerHTML;
    if (!rendered || typeof rendered !== 'string') {
      errors.push('#template-viewport was not populated on DOMContentLoaded');
    } else {
      const requiredRenderedMarkers = [
        'INDEX // SUNGYUN KWON PORTFOLIO',
        '01.PROFILE',
        '02.CAREER',
        '03.PROJECTS',
        '04.SKILLS',
        '05.CREDENTIALS',
        '06.ARCHIVES',
        'id="section-hero"',
        'id="section-activities"',
        'id="section-projects"',
        'id="section-skills"',
        'id="section-cert-edu"',
        'id="section-docs"',
        '권성윤 (Sungyun Kwon)',
        'Senior Full-Stack & Cloud Architect'
      ];
      for (const marker of requiredRenderedMarkers) {
        if (!rendered.includes(marker)) {
          errors.push(`Rendered #template-viewport is missing Editorial Minimal marker: ${marker}`);
        }
      }
      if (rendered.includes('Template 01') || rendered.includes('Template 02')) {
        errors.push('#template-viewport rendered non-Editorial template content');
      }
      if (html.includes('김도현') || /dohyun/i.test(html)) {
        errors.push('Old name (김도현 / Dohyun) still exists in index.html');
      }
    }

    if (!lucideIconsCalled) {
      errors.push('lucide.createIcons() was not called during initial render');
    }

    // Verify helper functions exist and work at runtime
    for (const fnName of ['renderHeroSection', 'renderTemplateC', 'copyText', 'showToast', 'openDocModal', 'closeDocModal', 'triggerSampleDownload']) {
      if (typeof sandbox[fnName] !== 'function') {
        errors.push(`Required function ${fnName} is missing in runtime scope`);
      }
    }

    if (typeof sandbox.openDocModal === 'function') {
      sandbox.openDocModal('doc-resume');
      if (elements['modal-doc-title'].textContent !== '통합 이력서 (Master Resume)') {
        errors.push('openDocModal("doc-resume") did not populate modal title properly');
      }
    }
    if (typeof sandbox.showToast === 'function') {
      sandbox.showToast('테스트 메시지');
      if (elements['toast-message'].textContent !== '테스트 메시지') {
        errors.push('showToast() did not update toast-message textContent');
      }
    }
  } catch (err) {
    errors.push(`Runtime execution of inline script failed: ${err.message}`);
  }
}

if (errors.length > 0) {
  console.error('Validation failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}

console.log('Validation passed: Only Editorial Minimal (Template C) is rendered at runtime and the top panel is removed.');
