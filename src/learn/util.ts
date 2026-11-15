import type { Card, History, Index, Source, Unit } from '../types';

const TIER_RANK: Record<string, number> = { 一手: 0, 學術: 1, 通論: 2, 百科: 3, 摘要: 4 };
const isZh = (s: Source) => /[一-鿿]/.test(s.title.replace(/—.*$/, '')) && !/Wikipedia|Britannica/.test(s.title);
// 來源排序：先中文，再依分級（一手 → 學術 → 通論 → 百科 → 摘要）
export const tierOrder = (a: Source, b: Source) =>
  Number(isZh(b)) - Number(isZh(a)) || (TIER_RANK[a.tier ?? '通論'] ?? 9) - (TIER_RANK[b.tier ?? '通論'] ?? 9);

export const learnCards = (index: Index) => index.cards.filter((c) => c.learn);
export const inHistory = (c: Card, h: History | null) => !h || h.all || !!c.learn?.histories.includes(h.id);
export const unitsOf = (index: Index, h: History | null) =>
  index.units.filter((u) => !h || h.all || u.histories.some((x) => x === h.id || x === h.name));
export const unitCards = (u: Unit) => [...new Set(u.steps.flatMap((s) =>
  s.type === 'card' ? [s.id] : s.type === 'source' || s.type === 'today' ? [s.card] : s.type === 'compare' ? s.cards : []))];
// 單元的年代：用到的卡最早的開始年份
export const unitYear = (index: Index, u: Unit) => Math.min(...unitCards(u).map((id) => index.cards.find((c) => c.id === id)?.time.start ?? 9999));
export const historyOf = (index: Index, key: string | null) => index.histories.find((h) => h.id === key || h.name === key) ?? null;

export const ERA_BINS: [string, number, number][] = [['上古', -9999, 500], ['中古', 500, 1500], ['近代早期', 1500, 1800], ['近現代', 1800, 9999]];
export const eraOfYear = (y: number) => ERA_BINS.find(([, a, b]) => y >= a && y < b)?.[0] ?? '近現代';

// 長單元分成上下兩半，一節課做一半：前半段的步數（13 步 → 7）
export const unitHalf = (u: Unit) => Math.ceil(u.steps.length / 2);
// 自我檢查的成績：答案存在 answers 的 c{步}_{題}（true/false）
export function unitScore(u: Unit, answers: Record<string, unknown> | undefined) {
  let total = 0, right = 0, answered = 0;
  u.steps.forEach((s, si) => { if (s.type !== 'check') return; s.items.forEach((q, qi) => {
    if (q.kind === 'short') return; total++; const v = answers?.[`c${si}_${qi}`];
    if (typeof v === 'boolean') { answered++; if (v) right++; } }); });
  return { total, right, answered };
}

/** 畫面上的預估時間：建置時依字數算的「必讀」分鐘；舊資料或骨架還沒到時退回手填的 minutes */
export const mustMin = (u: { minutes: number; minutes_must?: number }) => u.minutes_must ?? u.minutes;
export const allMin = (u: { minutes: number; minutes_all?: number; minutes_must?: number }) => u.minutes_all ?? mustMin(u);

// ---- 年級（國中／高中／皆可）與首頁精選 ----
export type LevelPick = 'all' | '國中' | '高中';
export const levelLabel = (l?: string) => (l === '皆可' ? '國高中皆可' : l ?? '');
/** 有任何一課標了年級嗎（資料還沒填時，年級切換一律顯示全部，不出錯） */
export const hasLevels = (units: { level?: string }[]) => units.some((u) => !!u.level);
export const levelMatch = (u: { level?: string }, pick: LevelPick, any = true) => pick === 'all' || !any || u.level === pick || u.level === '皆可';
/** 首頁「挑一課開始」的精選：沒做完的優先、國中的優先、必讀時間短的優先；同一個史最多 2 課（不夠再補） */
export function pickUnits<U extends { id: string; histories: string[]; minutes: number; minutes_must?: number; level?: string }>(units: U[], done: (id: string) => boolean, pick: LevelPick, n: number): U[] {
  const any = hasLevels(units);
  // 年級資料還沒填完時：符合的不到 n 課，就用還沒標年級的課補滿（排在後面）
  let pool = units.filter((u) => levelMatch(u, pick, any));
  if (pool.length < n) pool = [...pool, ...units.filter((u) => !u.level && !pool.includes(u))];
  const rank = (u: U) => [done(u.id) ? 1 : 0, u.level === pick || (pick === 'all' && u.level === '國中') ? 0 : u.level ? 1 : 2, mustMin(u)];
  const sorted = [...(pool.length ? pool : units)].sort((a, b) => { const x = rank(a), y = rank(b); return x[0] - y[0] || x[1] - y[1] || x[2] - y[2]; });
  const out: U[] = [], per = new Map<string, number>();
  for (const u of sorted) { const k = u.histories[0] ?? ''; if ((per.get(k) ?? 0) >= 2) continue; per.set(k, (per.get(k) ?? 0) + 1); out.push(u); if (out.length >= n) return out; }
  for (const u of sorted) if (!out.includes(u)) { out.push(u); if (out.length >= n) break; }
  return out;
}
