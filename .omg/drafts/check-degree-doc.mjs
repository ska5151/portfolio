import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const appTsx = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');

assert.ok(appTsx.includes('doc-degree'), 'src/App.tsx must register id "doc-degree"');
assert.ok(appTsx.includes('학위증명서(학점은행제)'), 'src/App.tsx must register title "학위증명서(학점은행제)"');
assert.ok(appTsx.includes('학위증명서.pdf'), 'src/App.tsx must specify filename "학위증명서.pdf"');
assert.ok(appTsx.includes('docs/학위증명서.pdf'), 'src/App.tsx must specify relative filePath "docs/학위증명서.pdf" for public/docs/학위증명서.pdf');
assert.ok(appTsx.includes('portfolioData.documents'), 'src/App.tsx must register the document in portfolioData.documents for EditorialTemplate and openDocModal');

const tscPath = path.join(root, 'node_modules/typescript/bin/tsc');
if (fs.existsSync(tscPath)) {
  const tsc = spawnSync(process.execPath, [tscPath, '--noEmit'], { cwd: root, encoding: 'utf8' });
  assert.equal(tsc.status, 0, `TypeScript check failed:\n${tsc.stdout}\n${tsc.stderr}`);
}

console.log('Degree certificate document check and TypeScript check passed.');
