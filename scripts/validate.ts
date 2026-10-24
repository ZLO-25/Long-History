// npm run validate：檢查必填欄位、斷掉的連結、缺來源的欄位
import { loadCards, loadTagVocab, readYaml } from './lib/cards.ts';
import { checkCards, loadContext } from './lib/check.ts';

const cards = loadCards();
const routes = readYaml('data/routes/routes.yaml')?.routes ?? [];
const frameworks = readYaml('data/frameworks.yaml')?.frameworks ?? [];
const issues = checkCards(cards, loadContext(loadTagVocab(), routes, frameworks));

const byFile = new Map<string, typeof issues>();
for (const i of issues) byFile.set(i.file, [...(byFile.get(i.file) ?? []), i]);
for (const [file, list] of byFile) {
  console.log(`\n${file}`);
  for (const i of list) console.log(`  ${i.level === 'error' ? '✗ 錯誤' : '! 警告'}  ${i.msg}`);
}
const errors = issues.filter((i) => i.level === 'error').length;
const warnings = issues.length - errors;
console.log(`\n共 ${cards.length} 張卡：${errors} 個錯誤、${warnings} 個警告`);
process.exit(errors ? 1 : 0);
