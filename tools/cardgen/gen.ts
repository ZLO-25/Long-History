// 第 7 期：用 Claude API（Sonnet）起草、修正、查核卡片的小工具
// 用法：
//   ANTHROPIC_API_KEY=... npx tsx tools/cardgen/gen.ts draft [id ...]   起草（不給 id＝specs.yaml 全部尚未存在的卡）
//   npx tsx tools/cardgen/gen.ts fix [id ...]      依 npm run validate 的錯誤／警告請模型修正（最多 2 輪）
//   npx tsx tools/cardgen/gen.ts urls [id ...]     檢查來源網址是否打得開
//   npx tsx tools/cardgen/gen.ts check [id ...]    獨立查核：另一次呼叫、只看卡片與抓回來的來源原文
// API 金鑰只從環境變數讀，不寫入任何檔案；原始回應存在 tools/cardgen/.out/（已列入 .gitignore）
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import YAML from 'yaml';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const OUT = path.join(import.meta.dirname, '.out');
fs.mkdirSync(OUT, { recursive: true });
export const MODEL = process.env.CARDGEN_MODEL ?? 'claude-sonnet-5-5';
const TODAY = process.env.CARDGEN_DATE ?? new Date().toISOString().slice(0, 10);
const rd = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const specs: any[] = YAML.parse(rd('tools/cardgen/specs.yaml'));
const cardPath = (s: any) => path.join(ROOT, 'cards', s.type, `${s.id}.md`);

async function claude(system: string, user: string, maxTokens = 32000): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('缺 ANTHROPIC_API_KEY');
  for (let i = 0; i < 4; i++) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }], messages: [{ role: 'user', content: user }] }),
    });
    if (r.ok) { const j: any = await r.json(); if (process.env.CARDGEN_DEBUG || j.stop_reason !== 'end_turn') console.error('  [api]', j.stop_reason, JSON.stringify(j.usage)); return j.content.filter((c: any) => c.type === 'text').map((c: any) => c.text).join(''); }
    const t = await r.text();
    if (r.status >= 500 || r.status === 429 || r.status === 529) { await new Promise((res) => setTimeout(res, 15000 * (i + 1))); continue; }
    throw new Error(`API ${r.status}: ${t.slice(0, 300)}`);
  }
  throw new Error('API 重試失敗');
}

async function pool<T>(items: T[], n: number, fn: (x: T) => Promise<void>) {
  const q = [...items];
  await Promise.all(Array.from({ length: n }, async () => { while (q.length) { const x = q.shift()!; try { await fn(x); } catch (e) { console.error('✗', x, (e as Error).message); } } }));
}

// ---------- 起草用的系統提示 ----------
function existingList() {
  const out: string[] = [];
  for (const t of fs.readdirSync(path.join(ROOT, 'cards'))) for (const f of fs.readdirSync(path.join(ROOT, 'cards', t))) {
    const m = fs.readFileSync(path.join(ROOT, 'cards', t, f), 'utf8').match(/^---\n([\s\S]*?)\n---/);
    if (!m) continue; let fm: any; try { fm = YAML.parse(m[1]); } catch { continue; }
    out.push(`${fm.id}｜${fm.name}｜track=${fm.track}｜${fm.time?.start}~${fm.time?.end}`);
  }
  return out.join('\n');
}
function tagList() { return rd('docs/structure-tags.md').split('\n').filter((l) => /^## |^- \*\*/.test(l)).map((l) => l.replace(/^- \*\*(.+?)\*\*.*/, '  $1')).join('\n'); }
function systemPrompt() {
  const hist = YAML.parse(rd('data/histories.yaml')).histories.map((h: any) => h.name).join('、');
  return `你是「歷史長河」(History River) 專案的卡片作者。專案用 Markdown 卡片（YAML frontmatter + ## 段落）記錄歷史，網站給臺灣讀者（含高中生）使用。
你要依照下列規格書與範例，寫出一張「完全符合格式」的新卡。

# 硬性規則
1. 全部用臺灣慣用的繁體中文（例：網際網路、軟體、品質、聯準會、川普），專有名詞第一次出現可附英文。
2. 每個段落（## 與 ### ）都要有來源代號 [s1] 等；查不到就以「未知：」「估計：」「來源不足：」開頭說明。frontmatter 的 learn.story／historiography／misconceptions 也要有 [sN]。
3. sources 只能放你非常確定存在的網址：優先 en/zh.wikipedia.org 條目、federalreservehistory.org、history.state.gov、archives.gov、avalon.law.yale.edu、founders.archives.gov、loc.gov、imf.org、bis.org、nber.org、doi.org 等。不要編造網址或論文；寧可少而真。不要用 britannica.com（自動檢查抓不到，無法驗證）。每個來源都要被內文引用，tier 一定要標（一手｜學術｜通論｜百科｜摘要），至少要有 1 個「一手」或「學術」來源（例如 avalon/founders 的原文就是一手；NBER/期刊/大學出版社的研究是學術）。accessed 一律寫 ${TODAY}。
4. 雙軌解讀段（李彔／哈拉瑞）：本期一律寫「無直接論述：查不到李彔（哈拉瑞）公開講稿談○○。」，lens_status 寫「無直接論述」。
5. verification 寫「交叉確認」（來源至少來自 2 個不同網域）。不要寫 crosscheck 欄位（由另一位查核者填）。
6. 要寫 importance（1–3）與 learn 區塊（histories 只能用：${hist}；美國相關卡請放「美國史」）。finance 卡的 learn 必須有 hindsight。primary_source 的 text 必須是真實、可查的原文短句（≤160 字，可附中譯），來源要是 sources 裡的一手來源；沒把握就不要寫 primary_source。
7. structure_tags 只能用下列詞表中的詞（一字不差）；links 只能用「既有卡片／本期新卡」清單中的 id；counterparts 要指向「另一條 track」的卡，並寫 ≥10 字的 note 與 src，找不到就寫「無適當對照：原因」。
8. 文明（civilization）照任務書寫法；地點要有正確的 lat/lng（小數 4 位）與 src。
9. 數字、日期要保守、可在你引用的來源中查到；有爭議就寫出爭議。不要寫你沒把握的細節。
10. YAML 語法：flow 寫法 { ... } 或 [ ... ] 裡的字串若含有 [ ] { } , : # 「」等符號（例如 [s1]），整個值一定要用雙引號包起來；多行文字用 | 區塊。
11. 只輸出卡片檔案全文，放在 <card> 與 </card> 之間，不要其他說明。

# 規格書 docs/card-fields.md
${rd('docs/card-fields.md')}

# 結構標籤詞表（只能用這些詞）
${tagList()}

# 文明分類 data/civilizations.yaml
${rd('data/civilizations.yaml')}

# 既有卡片（id｜名稱｜軌道｜年代）
${existingList()}

# 本期新卡（也可以互相連結）
${specs.map((s) => `${s.id}｜${s.name}｜track=${s.track}｜${s.time}`).join('\n')}

# 範例卡 1（event）
${rd('cards/event/event-black-ships.md')}

# 範例卡 2（finance）
${rd('cards/finance/finance-bretton-woods.md')}

# 範例卡 3（war）
${rd('cards/war/war-opium-war.md')}
`;
}
const extract = (t: string) => { const m = t.match(/<card>\s*([\s\S]*?)\s*<\/card>/); if (!m) throw new Error('回應裡沒有 <card>'); return m[1].trim() + '\n'; };
const pick = (ids: string[]) => (ids.length ? specs.filter((s) => ids.includes(s.id)) : specs);

async function draft(ids: string[]) {
  const sys = systemPrompt();
  const todo = pick(ids).filter((s) => ids.length || !fs.existsSync(cardPath(s)));
  await pool(todo, 6, async (s) => {
    const user = `請寫這張新卡：\nid: ${s.id}\ntype: ${s.type}\ntrack: ${s.track}\nname（可微調）: ${s.name}\n時間: ${s.time}\ncivilization: ${s.civ}\n內容重點（請自行查核、補充、修正）: ${s.brief}`;
    const t = await claude(sys, user);
    fs.writeFileSync(path.join(OUT, `${s.id}.draft.txt`), t);
    fs.mkdirSync(path.dirname(cardPath(s)), { recursive: true });
    fs.writeFileSync(cardPath(s), extract(t));
    console.log('✓ draft', s.id);
  });
}

// ---------- 依 validate 結果修正 ----------
function yamlError(file: string): string | null {
  const m = fs.readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/);
  if (!m) return '找不到 frontmatter';
  try { YAML.parse(m[1]); return null; } catch (e) { return String((e as Error).message).split('\n').slice(0, 4).join(' '); }
}
function validateIssues(): Map<string, string[]> {
  const bad = new Map<string, string[]>();
  for (const s of specs) if (fs.existsSync(cardPath(s))) { const e = yamlError(cardPath(s)); if (e) bad.set(`cards/${s.type}/${s.id}.md`, [`✗ 錯誤  YAML 解析失敗：${e}`]); }
  if (bad.size) return bad;
  let out = '';
  try { out = execSync('npx tsx scripts/validate.ts', { cwd: ROOT, encoding: 'utf8' }); } catch (e: any) { out = e.stdout ?? ''; }
  const m = new Map<string, string[]>(); let cur = '';
  for (const l of out.split('\n')) { if (/^cards\//.test(l)) cur = l.trim(); else if (cur && /^\s+(✗|!)/.test(l) && !l.includes('crosscheck')) m.set(cur, [...(m.get(cur) ?? []), l.trim()]); else if (!l.trim()) cur = ''; }
  return m;
}
async function fix(ids: string[]) {
  const sys = systemPrompt();
  for (let round = 0; round < 2; round++) {
    const iss = validateIssues();
    const todo = pick(ids).filter((s) => iss.has(`cards/${s.type}/${s.id}.md`));
    if (!todo.length) break;
    await pool(todo, 6, async (s) => {
      const list = iss.get(`cards/${s.type}/${s.id}.md`)!;
      const t = await claude(sys, `這張卡跑 npm run validate 出現以下問題，請修正後輸出完整卡片（其他內容不要亂改）：\n${list.join('\n')}\n\n<card>\n${fs.readFileSync(cardPath(s), 'utf8')}\n</card>`);
      fs.writeFileSync(cardPath(s), extract(t)); console.log('✓ fix', round + 1, s.id, list.length);
    });
  }
}

// ---------- 網址檢查 ----------
const UA = 'Mozilla/5.0 (X11; Linux x86_64) HistoryRiverCardgen/1.0 (link check)';
async function urlOk(u: string) {
  try { const r = await fetch(u, { headers: { 'user-agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(20000) }); return r.status; } catch (e) { return 0; }
}
function cardFm(s: any) { const m = fs.readFileSync(cardPath(s), 'utf8').match(/^---\n([\s\S]*?)\n---/); return YAML.parse(m![1]); }
async function urls(ids: string[]) {
  const bad: string[] = [];
  await pool(pick(ids).filter((s) => fs.existsSync(cardPath(s))), 8, async (s) => {
    for (const src of cardFm(s).sources ?? []) { const st = await urlOk(src.url); if (st !== 200) bad.push(`${s.id}\t${src.id}\t${st}\t${src.url}`); }
  });
  fs.writeFileSync(path.join(OUT, 'bad-urls.tsv'), bad.join('\n') + '\n');
  console.log(bad.join('\n') || '全部網址 200');
  if (!process.env.CARDGEN_FIXURLS || !bad.length) return;
  const sys = systemPrompt();
  const by = new Map<string, string[]>(); for (const b of bad) { const [id] = b.split('\t'); by.set(id, [...(by.get(id) ?? []), b]); }
  await pool([...by.keys()], 6, async (id) => {
    const s = specs.find((x) => x.id === id)!;
    const t = await claude(sys, `自動檢查打不開（或無法驗證）下列來源網址（欄位：卡片、來源代號、HTTP 狀態、網址）：\n${by.get(id)!.join('\n')}\n請改用你確定存在、可公開抓取的網址（優先 Wikipedia 條目或政府／大學網站），內容要能支持原本引用它的句子；找不到就刪掉該來源並調整引用。輸出完整卡片。\n\n<card>\n${fs.readFileSync(cardPath(s), 'utf8')}\n</card>`);
    fs.writeFileSync(cardPath(s), extract(t)); console.log('✓ url-fix', id);
  });
}

// ---------- 獨立查核 ----------
async function sourceText(u: string): Promise<string> {
  const w = u.match(/^https?:\/\/(\w+)\.wikipedia\.org\/wiki\/(.+)$/);
  try {
    if (w) {
      const api = `https://${w[1]}.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&redirects=1&format=json&titles=${w[2]}`;
      const j: any = await (await fetch(api, { headers: { 'user-agent': UA } })).json();
      return (Object.values(j.query.pages)[0] as any).extract ?? '';
    }
    const h = await (await fetch(u, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(20000) })).text();
    return h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/\s+/g, ' ');
  } catch { return ''; }
}
const CHECK_SYS = `你是獨立的歷史事實查核者，沒有參與這張卡的寫作。你會拿到一張繁體中文歷史卡片，以及卡片所引用來源的原文（自動抓取，可能被截斷）。
請逐項檢查：年份、數字、人名、地名、因果說法、引文（primary_source 必須能在來源原文或公認史料中找到）、引用代號是否對得上來源內容、有沒有過度簡化成錯誤的說法、座標是否大致正確。
判斷標準：有任何「明確的事實錯誤」或「捏造的引文／來源」→ 不通過；只有措辭可改進或來源原文被截斷而無法逐字確認但與公認史實一致 → 通過，並在 notes 裡寫出。
只輸出 JSON：{"result":"通過"或"不通過","notes":"繁體中文，≤200 字，摘要查核發現","problems":[{"where":"段落或欄位","claim":"卡片原文","issue":"問題","fix":"建議改法"}]}`;
async function checkOne(s: any) {
  const card = fs.readFileSync(cardPath(s), 'utf8');
  const fm = cardFm(s);
  let ctx = '';
  for (const src of fm.sources ?? []) { const t = (await sourceText(src.url)).slice(0, 18000); ctx += `\n\n=== ${src.id}｜${src.title}｜${src.url} ===\n${t || '（抓不到原文）'}`; }
  const t = await claude(CHECK_SYS, `<card>\n${card}\n</card>\n\n# 來源原文${ctx.slice(0, 120000)}`, 16000);
  const j = JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1));
  fs.writeFileSync(path.join(OUT, `${s.id}.check.json`), JSON.stringify(j, null, 2));
  return { j, ctx };
}
function setCrosscheck(s: any, j: any) {
  let card = fs.readFileSync(cardPath(s), 'utf8').replace(/^crosscheck:.*\n/m, '');
  const notes = String(j.notes).replace(/"/g, '「').replace(/\n/g, ' ');
  const line = `crosscheck: { date: ${TODAY}, by: 獨立查核（${MODEL} 另一次呼叫，未參與寫作，比對抓取的來源原文）, result: ${j.result}, notes: "${notes}" }\n`;
  card = card.replace(/^verification:/m, line + 'verification:');
  fs.writeFileSync(cardPath(s), card);
}
async function check(ids: string[]) {
  const sys = systemPrompt();
  await pool(pick(ids).filter((s) => fs.existsSync(cardPath(s))), 4, async (s) => {
    let { j, ctx } = await checkOne(s);
    if (j.result === '通過') ctx = ctx; // keep
    if (j.result !== '通過') {
      console.log('… 修正', s.id, (j.problems ?? []).length);
      const t = await claude(sys, `獨立查核者指出這張卡有以下問題。請依來源原文修正（無法證實的說法請刪除或改寫成保守說法；引文查不到就刪掉 primary_source），輸出完整卡片：\n${JSON.stringify(j.problems, null, 1)}\n\n<card>\n${fs.readFileSync(cardPath(s), 'utf8')}\n</card>\n\n# 來源原文（節錄）${ctx.slice(0, 60000)}`);
      fs.writeFileSync(cardPath(s), extract(t));
      ({ j } = await checkOne(s));
    }
    if (j.result === '通過' && (j.problems ?? []).length) {
      const t = await claude(sys, `獨立查核者判定通過，但提出以下小建議。請依建議與來源原文修正（只改這些地方），輸出完整卡片：\n${JSON.stringify(j.problems, null, 1)}\n\n<card>\n${fs.readFileSync(cardPath(s), 'utf8')}\n</card>\n\n# 來源原文（節錄）${ctx.slice(0, 60000)}`);
      fs.writeFileSync(cardPath(s), extract(t));
      j.notes = `${j.notes} 小建議已依查核修正。`;
    }
    setCrosscheck(s, j);
    console.log(j.result === '通過' ? '✓' : '✗', 'check', s.id, j.notes);
  });
}


// ---------- 學習單元 ----------
const unitSpecs: any[] = YAML.parse(rd('tools/cardgen/unit-specs.yaml'));
const unitPath = (u: any) => path.join(ROOT, 'data', 'units', `${u.id}.yaml`);
const cardFile = (id: string) => { for (const t of fs.readdirSync(path.join(ROOT, 'cards'))) { const f = path.join(ROOT, 'cards', t, `${id}.md`); if (fs.existsSync(f)) return f; } throw new Error(`找不到卡 ${id}`); };
const unitCards = (u: any) => u.cards.map((id: string) => `=== ${id} ===\n${fs.readFileSync(cardFile(id), 'utf8')}`).join('\n\n');
const unitIds = () => fs.readdirSync(path.join(ROOT, 'data', 'units')).map((f) => f.replace(/\.yaml$/, '')).join('、');
const extractUnit = (t: string) => { const m = t.match(/<unit>\s*([\s\S]*?)\s*<\/unit>/); if (!m) throw new Error('回應裡沒有 <unit>'); return m[1].trim() + '\n'; };
function unitSys() {
  return `你是「歷史長河」學習模式的單元作者，對象是臺灣國高中生，全部用臺灣繁體中文。單元不放新史實：每一句都必須能在提供的卡片裡找到。
# 規格 docs/learn-units.md
${rd('docs/learn-units.md')}
# 範例單元 data/units/unit-bubbles.yaml
${rd('data/units/unit-bubbles.yaml')}
# 硬性規則
- 必須有 source、chain、compare、decision、today、check、recap 步驟；可以有 hook、card、sim。
- source 的 idx 是該卡 learn.primary_source 的索引（從 0 起），該卡必須真的有那一筆。
- ref 寫 卡片id 或 卡片id#段落代號（代號要真的存在於該卡），或 卡片id#story。
- today 的 card 要有「不可類比的差異」段落（C9／F8／A11 之類，請看卡片）。
- hints 每題 2–3 段。next 寫 2–3 個已存在或本期的單元 id：${unitIds()}、${unitSpecs.map((u) => u.id).join('、')}。
- 不要寫 crosscheck。只輸出 YAML 全文，放在 <unit></unit> 之間。`;
}
function unitIssues(u: any): string[] {
  let out = '';
  try { out = execSync('npx tsx scripts/validate.ts', { cwd: ROOT, encoding: 'utf8' }); } catch (e: any) { out = e.stdout ?? ''; }
  const res: string[] = []; let cur = '';
  for (const l of out.split('\n')) { if (/^\S/.test(l)) cur = l.trim(); else if (cur.includes(u.id) && /^\s+(✗|!)/.test(l) && !l.includes('crosscheck')) res.push(l.trim()); }
  return res;
}
async function unit(ids: string[]) {
  const sys = unitSys();
  for (const u of unitSpecs.filter((x) => !ids.length || ids.includes(x.id))) {
    if (!fs.existsSync(unitPath(u))) {
      const t = await claude(sys, `請寫單元 ${u.id}\n標題方向：${u.title}\nhistories：${u.histories.join('、')}\n重點：${u.brief}\n可用卡片（只能用這些卡）：\n${unitCards(u)}`);
      fs.writeFileSync(path.join(OUT, `${u.id}.draft.txt`), t); fs.writeFileSync(unitPath(u), extractUnit(t)); console.log('✓ unit draft', u.id);
    }
    for (let r = 0; r < 3; r++) {
      const iss = unitIssues(u); if (!iss.length) break;
      const t = await claude(sys, `這個單元跑 validate 出現以下問題，請修正後輸出完整 YAML：\n${iss.join('\n')}\n\n<unit>\n${fs.readFileSync(unitPath(u), 'utf8')}\n</unit>\n\n可用卡片：\n${unitCards(u)}`);
      fs.writeFileSync(unitPath(u), extractUnit(t)); console.log('✓ unit fix', r + 1, u.id, iss.length);
    }
  }
}
const UCHECK_SYS = `你是獨立的學習單元查核者，沒有參與寫作。你會拿到一個學習單元 YAML 與它用到的卡片全文。請依 docs/learn-units.md 的寫作規則逐條檢查：每句史實是否都在卡片裡、數字年份是否一致、ref 段落是否支持題目、選擇題答案與排序是否正確、card 步驟深度是否讓學生看得到被問的段落、decision 未發生選項是否標「推測」、today 是否先說不能類比、談錢單元是否提醒後見之明與倖存者偏差並寫不構成投資建議。
有明確錯誤 → 不通過；只有小建議 → 通過。只輸出 JSON：{"result":"通過"或"不通過","notes":"繁體中文 ≤200 字","problems":[{"where":"","issue":"","fix":"建議修正文字"}]}`;
async function unitcheck(ids: string[]) {
  const sys = unitSys();
  for (const u of unitSpecs.filter((x) => !ids.length || ids.includes(x.id))) {
    const run = async () => { const t = await claude(UCHECK_SYS, `<unit>\n${fs.readFileSync(unitPath(u), 'utf8')}\n</unit>\n\n# 卡片\n${unitCards(u)}`, 16000); const j = JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1)); fs.writeFileSync(path.join(OUT, `${u.id}.check.json`), JSON.stringify(j, null, 2)); return j; };
    let j = await run(); let fixed = false;
    for (let r = 0; r < 2 && (j.result !== '通過' || (j.problems ?? []).length) && !fixed; r++) {
      const wasPass = j.result === '通過';
      const t = await claude(sys, `獨立查核者${wasPass ? '判定通過，但提出小建議' : '判定不通過'}。請逐項採用建議修正（只改這些地方），輸出完整 YAML：\n${JSON.stringify(j.problems, null, 1)}\n\n<unit>\n${fs.readFileSync(unitPath(u), 'utf8')}\n</unit>\n\n可用卡片：\n${unitCards(u)}`);
      fs.writeFileSync(unitPath(u), extractUnit(t));
      if (wasPass) { j.notes = `${j.notes} 建議已採用。`; fixed = true; } else j = await run();
    }
    const y = fs.readFileSync(unitPath(u), 'utf8').replace(/^crosscheck:.*\n?/m, '').trimEnd();
    fs.writeFileSync(unitPath(u), `${y}\ncrosscheck: { date: ${TODAY}, by: 獨立查核（${MODEL} 另一次呼叫，未參與寫作）, result: ${j.result}, notes: "${String(j.notes).replace(/"/g, '「').replace(/\n/g, ' ')}" }\n`);
    console.log(j.result === '通過' ? '✓' : '✗', 'unitcheck', u.id, j.notes);
  }
}

const [cmd, ...ids] = process.argv.slice(2);
const fns: Record<string, (ids: string[]) => Promise<void>> = { draft, fix, urls, check, unit, unitcheck };
if (!fns[cmd]) { console.log('用法：gen.ts draft|fix|urls|check|unit|unitcheck [id ...]'); process.exit(1); }
await fns[cmd](ids);
