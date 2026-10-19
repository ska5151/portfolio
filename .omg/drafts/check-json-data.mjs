import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const root = process.cwd();

function readJson(relPath) {
  const full = path.join(root, relPath);
  assert.ok(fs.existsSync(full), `Missing file: ${relPath}`);
  const raw = fs.readFileSync(full, 'utf8').trim();
  assert.ok(raw.length > 0, `Empty JSON file: ${relPath}`);
  return JSON.parse(raw);
}

// 1. Validate data/Career.json (02. 회사 활동 및 경력)
const career = readJson('data/Career.json');
assert.ok(Array.isArray(career) && career.length >= 5, 'data/Career.json must be a non-empty array with at least 5 entries');
assert.equal(career[0].company, '(주) 케이비드');
assert.equal(career[4].company, '(주) 보람정보시스템');
for (const item of career) {
  assert.equal(typeof item.company, 'string');
  assert.equal(typeof item.position, 'string');
  assert.equal(typeof item.period, 'string');
  assert.equal(typeof item.badge, 'string');
  assert.equal(typeof item.description, 'string');
  assert.ok(Array.isArray(item.activities), 'Career activities must be an array');
}

// 2. Validate data/Works.json (03. 주요 프로젝트)
const works = readJson('data/Works.json');
assert.ok(Array.isArray(works) && works.length >= 8, 'data/Works.json must be a non-empty array with at least 8 entries');
assert.equal(works[0].id, 'proj-1');
assert.equal(works[0].title, '정비마법사2');
assert.equal(works[7].id, 'proj-8');
assert.equal(works[7].title, 'LVMC');
for (const proj of works) {
  assert.equal(typeof proj.id, 'string');
  assert.equal(typeof proj.category, 'string');
  assert.equal(typeof proj.title, 'string');
  assert.equal(typeof proj.period, 'string');
  assert.equal(typeof proj.summary, 'string');
  assert.ok(Array.isArray(proj.details), 'Project details must be an array');
  assert.ok(Array.isArray(proj.techs), 'Project techs must be an array');
}

// 3. Validate data/TechnicalProficiency.json (04. 기술 스택)
const skills = readJson('data/TechnicalProficiency.json');
assert.ok(Array.isArray(skills) && skills.length >= 3, 'data/TechnicalProficiency.json must be a non-empty array with at least 3 categories');
assert.equal(skills[0].category, 'Frontend Engineering');
assert.equal(skills[1].category, 'Backend & Distributed System');
assert.equal(skills[2].category, 'DevOps & Cloud Native');
for (const cat of skills) {
  assert.equal(typeof cat.category, 'string');
  assert.equal(typeof cat.icon, 'string');
  assert.ok(Array.isArray(cat.items) && cat.items.length > 0, 'Skill category items must be a non-empty array');
  for (const s of cat.items) {
    assert.equal(typeof s.name, 'string');
    assert.equal(typeof s.stars, 'string');
  }
}

// 4. Validate data/Credentials.json (05. 자격증 및 학력)
const credentials = readJson('data/Credentials.json');
assert.ok(credentials && typeof credentials === 'object' && !Array.isArray(credentials), 'data/Credentials.json must be an object');
assert.ok(Array.isArray(credentials.certifications) && credentials.certifications.length >= 6, 'certifications must have at least 6 entries');
assert.ok(Array.isArray(credentials.education) && credentials.education.length >= 2, 'education must have at least 2 entries');
assert.equal(credentials.certifications[0].name, '정보기술자격(ITQ)');
assert.equal(credentials.education[0].school, '안동과학대학교 컴퓨터정보과');

// 5. Validate tsconfig.json includes data and resolveJsonModule
const tsconfig = readJson('tsconfig.json');
assert.equal(tsconfig.compilerOptions?.resolveJsonModule, true, 'tsconfig.json must enable resolveJsonModule');
assert.ok(Array.isArray(tsconfig.include) && tsconfig.include.includes('data'), 'tsconfig.json include must contain "data"');

// 6. Validate src/data/portfolio.ts imports all 4 JSON files and maps dynamic data
const portfolioTs = fs.readFileSync(path.join(root, 'src/data/portfolio.ts'), 'utf8');
assert.ok(portfolioTs.includes('data/Career.json'), 'src/data/portfolio.ts must import data/Career.json');
assert.ok(portfolioTs.includes('data/Works.json'), 'src/data/portfolio.ts must import data/Works.json');
assert.ok(portfolioTs.includes('data/TechnicalProficiency.json'), 'src/data/portfolio.ts must import data/TechnicalProficiency.json');
assert.ok(portfolioTs.includes('data/Credentials.json'), 'src/data/portfolio.ts must import data/Credentials.json');
assert.ok(portfolioTs.includes('usePortfolioData'), 'src/data/portfolio.ts must export usePortfolioData for dynamic updates');

// 7. Validate src/components/EditorialTemplate.tsx uses dynamic portfolio data
const editorialTsx = fs.readFileSync(path.join(root, 'src/components/EditorialTemplate.tsx'), 'utf8');
assert.ok(editorialTsx.includes('usePortfolioData'), 'EditorialTemplate.tsx must consume usePortfolioData()');

// 8. Run TypeScript typecheck (tsc --noEmit)
const tscPath = path.join(root, 'node_modules/typescript/bin/tsc');
if (fs.existsSync(tscPath)) {
  const tsc = spawnSync(process.execPath, [tscPath, '--noEmit'], { cwd: root, encoding: 'utf8' });
  assert.equal(tsc.status, 0, `TypeScript check failed:\n${tsc.stdout}\n${tsc.stderr}`);
}

console.log('All JSON data, dynamic hook, and TypeScript checks passed.');
