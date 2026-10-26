// 地圖上的名稱一律「繁體中文＋英文」：查 data/labels/names-en.yaml 編進 index.json 的對照表
// 只有中文的 → 補英文；只有拉丁文的（路線站點、古道名）→ 補中文；本身已中英並列的（例如「阿庇亞大道（Via Appia）」）照原樣
export interface NameTable { en: Record<string, string>; zh: Record<string, string> }

const CJK = /[㐀-鿿]/;
const LATIN = /[A-Za-z]/;
// 古道名的寫法不一（Via_Appia、via Sebaste、Via Campana?），比對前先統一
export const normLatin = (s: string) => s.replace(/_/g, ' ').replace(/\?/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

let table: NameTable = { en: {}, zh: {} };
let zhByNorm: Record<string, string> = {};
export function setNameTable(t: NameTable | undefined) {
  table = t ?? { en: {}, zh: {} };
  zhByNorm = Object.fromEntries(Object.entries(table.zh).map(([k, v]) => [normLatin(k), v]));
}

/** 拆成中文與英文兩部分（查不到的那一半是空字串） */
export function biParts(name: string): { zh: string; en: string } {
  const s = (name ?? '').trim();
  if (!s) return { zh: '', en: '' };
  const hasCjk = CJK.test(s), hasLatin = LATIN.test(s);
  if (hasCjk && hasLatin) return { zh: s, en: '' };
  if (hasCjk) return { zh: s, en: table.en[s] ?? '' };
  return { zh: zhByNorm[normLatin(s)] ?? '', en: s.replace(/_/g, ' ').replace(/\s+/g, ' ').trim() };
}

/** 「中文 English」；缺一半時只顯示有的那一半 */
export function bi(name: string, sep = ' '): string {
  const { zh, en } = biParts(name);
  return [zh, en].filter(Boolean).join(sep);
}

/** 給 HTML 用：中文正常字、英文小一號灰字 */
export function biHtml(name: string): string {
  const { zh, en } = biParts(name);
  const esc = (x: string) => x.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
  return `${esc(zh)}${zh && en ? ' ' : ''}${en ? `<span class="en">${esc(en)}</span>` : ''}`;
}

/** 卡片的英文名：先查對照表，沒有就用別名裡第一個純英文的 */
export function cardEn(c: { name: string; aliases?: string[] }): string {
  return table.en[c.name] ?? (c.aliases ?? []).find((a) => LATIN.test(a) && !CJK.test(a)) ?? '';
}
