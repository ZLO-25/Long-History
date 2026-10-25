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
