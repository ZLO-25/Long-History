// npm run validate：檢查必填欄位、斷掉的連結、缺來源的欄位
import { loadCards, loadTagVocab, readYaml } from './lib/cards.ts';
import { checkCards, loadContext } from './lib/check.ts';
import { loadEcon, loadChains, checkEcon, checkChains } from './lib/econ.ts';
import { loadToday, checkToday } from './lib/today.ts';
import { loadCivTaxonomy } from './lib/civ.ts';
import { loadHistories, historyKeys, historyId, inferHistories, loadUnits, checkUnits } from './lib/learn.ts';

const cards = loadCards();
const tagVocab = loadTagVocab();
const routes = readYaml('data/routes/routes.yaml')?.routes ?? [];
const frameworks = readYaml('data/frameworks.yaml')?.frameworks ?? [];
const histories = loadHistories();
const cardIssues = checkCards(cards, loadContext(tagVocab, routes, frameworks, historyKeys(histories)));
// 學習模式可用的卡：有 learn、交叉查核通過、沒有錯誤
const eligible = new Set(cards.filter((c) => c.fm?.learn && c.fm?.crosscheck?.result === '通過' && !cardIssues.some((i) => i.file === c.file && i.level === 'error')).map((c) => c.fm.id));
const units = loadUnits();
const issues = [
  ...cardIssues,
  ...checkUnits(units, cards, histories, eligible),
  ...checkEcon(loadEcon()),
  ...checkChains(loadChains(), cards, new Set(routes.map((r: any) => r.id))),
  ...checkToday(loadToday(), cards, new Set(tagVocab.flatMap((c: any) => c.tags.map((t: any) => t.tag))), new Set(routes.map((r: any) => r.id))),
];
// 文明寫法要能對應到 data/civilizations.yaml 的分類樹
const civ = loadCivTaxonomy();
for (const b of civ.badMap) issues.push({ level: 'error', file: 'data/civilizations.yaml', msg: `map 指向不存在的路徑：${b}` });
for (const c of cards) for (const v of c.fm?.civilization ?? []) if (!civ.resolve(v).length) issues.push({ level: 'warning', file: c.file, msg: `文明「${v}」對不上 data/civilizations.yaml 的分類，篩選時會放在「其他」` });

for (const cat of tagVocab) for (const t of cat.tags) if (!t.plain || !t.example) issues.push({ level: 'warning', file: 'docs/structure-tags.md', msg: `標籤「${t.tag}」缺白話解釋或生活例子` });

// XX史：明寫的 ∪ 依文明推算的。--histories 會列出每張卡的推算結果
{
  const rows = cards.filter((c) => c.fm?.id).map((c) => {
    const paths = [...new Set((c.fm.civilization ?? []).flatMap((v: string) => civ.resolve(v)))] as string[];
    const explicit = (c.fm.learn?.histories ?? []).map((h: string) => historyId(histories, h)).filter(Boolean) as string[];
    const inferred = inferHistories(histories, paths, c.fm.type);
    return { c, explicit, inferred };
  });
  if (process.argv.includes('--histories')) {
    console.log('\n卡片 → XX史（＊＝明寫，其餘為依文明或類型推算；世界通史一律包含，不列）');
    for (const r of rows) {
      const all = [...new Set([...r.explicit, ...r.inferred])].filter((h) => h !== 'world');
      console.log(`  ${r.c.fm.id}${r.c.fm.learn ? '（學習）' : ''}：${all.map((h) => (r.explicit.includes(h) ? '＊' : '') + (histories.find((x) => x.id === h)?.name ?? h)).join('、') || '（只有世界通史）'}`);
    }
  }
  const counts = histories.map((h) => `${h.name} ${rows.filter((r) => r.c.fm.learn && eligible.has(r.c.fm.id) && (r.explicit.includes(h.id) || r.inferred.includes(h.id))).length}`);
  console.log(`\n學習模式可用卡 ${eligible.size} 張（有 learn 區塊 ${cards.filter((c) => c.fm?.learn).length} 張）；單元 ${units.length} 個。各史可用卡：${counts.join('、')}`);
}

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
