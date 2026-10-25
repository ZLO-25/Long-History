// npm run validate：檢查必填欄位、斷掉的連結、缺來源的欄位
import { loadCards, loadTagVocab, readYaml } from './lib/cards.ts';
import { checkCards, loadContext } from './lib/check.ts';
import { loadEcon, loadChains, checkEcon, checkChains } from './lib/econ.ts';
import { loadToday, checkToday } from './lib/today.ts';
import { loadCivTaxonomy } from './lib/civ.ts';

const cards = loadCards();
const tagVocab = loadTagVocab();
const routes = readYaml('data/routes/routes.yaml')?.routes ?? [];
const frameworks = readYaml('data/frameworks.yaml')?.frameworks ?? [];
const issues = [
  ...checkCards(cards, loadContext(tagVocab, routes, frameworks)),
  ...checkEcon(loadEcon()),
  ...checkChains(loadChains(), cards, new Set(routes.map((r: any) => r.id))),
  ...checkToday(loadToday(), cards, new Set(tagVocab.flatMap((c: any) => c.tags.map((t: any) => t.tag))), new Set(routes.map((r: any) => r.id))),
];
// 文明寫法要能對應到 data/civilizations.yaml 的分類樹
const civ = loadCivTaxonomy();
for (const b of civ.badMap) issues.push({ level: 'error', file: 'data/civilizations.yaml', msg: `map 指向不存在的路徑：${b}` });
for (const c of cards) for (const v of c.fm?.civilization ?? []) if (!civ.resolve(v).length) issues.push({ level: 'warning', file: c.file, msg: `文明「${v}」對不上 data/civilizations.yaml 的分類，篩選時會放在「其他」` });

const byFile = new Map<string, typeof issues>();
for (const i of issues) byFile.set(i.file, [...(byFile.get(i.file) ?? []), i]);
for (const [file, list] of byFile) {
  console.log(`\n${file}`);
  for (const i of list) console.log(`  ${i.level === 'error' ? '✗ 錯誤' : '! 警告'}  ${i.msg}`);
}
const errors = issues.filter((i) => i.level === 'error').length;
const warnings = issues.length - errors;
const econ = loadEcon();
console.log(`\n共 ${cards.length} 張卡、${econ.series?.length ?? 0} 條經濟數列、${loadChains().length} 條物資鏈、${(loadToday().chokepoints ?? []).length} 個今日咽喉、${(loadToday().chains ?? []).length} 條今日供應鏈：${errors} 個錯誤、${warnings} 個警告`);
process.exit(errors ? 1 : 0);
