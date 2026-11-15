// 結構化資料的「不認得的鍵」檢查。
// 單行 `{ a: …, b: 約 2,000 人 }` 裡的千分位逗號會被當成分隔符號，後半段變成奇怪的鍵、畫面上文字被切斷。
// 這裡對已知物件列出允許的鍵，出現其他鍵就報錯。
// 白名單由現有資料歸納；新增欄位時請同步補在這裡。
type Issue = { level: 'error' | 'warning'; file: string; msg: string };

const CARD_SHAPES: Record<string, string[]> = {
  'time': ['start', 'end', 'precision', 'src'],
  'place.locations': ['name_ancient', 'name_modern', 'lat', 'lng', 'pleiades_id', 'precision', 'role', 'src', 'year'],
  'causes': ['id', 'rel', 'why', 'src', 'disputed'],
  'effects': ['id', 'rel', 'why', 'src', 'disputed'],
  'counterparts': ['id', 'note', 'src'],
  'sources': ['id', 'title', 'url', 'accessed', 'tier'],
  'learn.key_terms': ['term', 'plain', 'example'],
  'learn.primary_source': ['text', 'from', 'src'],
  'learn.perspectives': ['history', 'text'],
  'learn.pop_culture': ['claim', 'fact', 'src'],
  'relations': ['id', 'kind', 'from', 'to', 'note', 'src'],
};
const UNIT_SHAPES: Record<string, string[]> = {
  'rows': ['aspect', 'a', 'b'],
  'options': ['label', 'result'],
};

const HINT = '值裡有逗號（例如千分位 2,000）時請整個值加雙引號，否則會被切斷';

function checkObjs(file: string, where: string, v: any, allowed: string[], issues: Issue[]) {
  if (v == null) return;
  for (const [i, o] of (Array.isArray(v) ? v : [v]).entries()) {
    if (!o || typeof o !== 'object' || Array.isArray(o)) continue;
    const bad = Object.keys(o).filter((k) => !allowed.includes(k));
    if (bad.length) issues.push({ level: 'error', file, msg: `${where}[${i}] 出現不認得的鍵「${bad.map((k) => (k.length > 24 ? k.slice(0, 24) + '…' : k)).join('」「')}」（允許：${allowed.join('、')}）。${HINT}` });
  }
}
const dig = (o: any, p: string) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);

export function checkCardShapes(cards: { file: string; fm: any }[]): Issue[] {
  const issues: Issue[] = [];
  for (const c of cards) for (const [p, keys] of Object.entries(CARD_SHAPES)) checkObjs(c.file, p, dig(c.fm, p), keys, issues);
  return issues;
}

export function checkUnitShapes(units: { file: string; unit: any }[]): Issue[] {
  const issues: Issue[] = [];
  for (const { file, unit } of units) for (const [si, s] of (unit?.steps ?? []).entries()) {
    for (const [p, keys] of Object.entries(UNIT_SHAPES)) checkObjs(file, `steps[${si}].${p}`, s?.[p], keys, issues);
  }
  return issues;
}
