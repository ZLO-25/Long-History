// 深入專題的純函式（找專題、勢力圖年份、地圖標記）。不含任何畫面元件，首頁與 App 外殼可以直接用，不必載入 Dive.tsx 這一大包
import type { Card, Dive, Index, PowerMap, PowerUi } from '../types';
import { cardEn } from './bilingual';

export function findDive(index: Index, id: string): Dive | undefined {
  return (index.dives ?? []).find((d) => d.id === id);
}
/** 專題沒寫 power_ui 時的預設文字 */
export const DEFAULT_POWER_UI: PowerUi = { title: '勢力圖', subtitle: '誰在什麼時候最強', caveat: '', legend: '' };
/** 這個專題有沒有要畫的主視覺地圖（visual 是 power 且至少一張圖） */
export const hasPowerVisual = (d: Dive) => (d.visual ?? 'power') === 'power' && d.power_maps.length > 0;
export const byIdOf = (index: Index) => new Map(index.cards.map((c) => [c.id, c]));

/** 讀書專題：地圖上一直亮著的路線（例如《人類大歷史》的智人擴散路線）＝專題卡片的史前遷徙路線 */
export function diveRoutes(index: Index, id: string): string[] {
  const d = findDive(index, id);
  if (!d?.book) return [];
  const m = byIdOf(index), mig = new Set(index.routes.filter((r) => r.kind === 'migration').map((r) => r.id));
  return [...new Set(d.cards.flatMap((cid) => m.get(cid)?.routes ?? []).filter((r) => mig.has(r)))];
}

/** 地圖上要標的點：專題的每張卡（人物除外）取第一個地點，編號＝依年代的順序 */
export function diveMarks(index: Index, id: string) {
  const d = findDive(index, id);
  if (!d) return [];
  const m = byIdOf(index);
  return d.cards.map((cid) => m.get(cid)).filter((c): c is Card => !!c && c.type !== 'person' && !!c.place.locations[0])
    // start：地圖依目前年代把還沒發生的卡調淡（讀書專題直接不畫，免得 7 萬年前出現羅馬）
    .map((c, i) => ({ key: c.place.locations[0].key, n: i + 1, name: c.name, en: cardEn(c), start: c.time.start, hideFuture: !!d.book }));
}

/** 打開專題時年代跳到哪：第一張勢力圖 → 專題指定的 focus_year → 專題起點 */
export function diveYear(d: Dive): number {
  return (hasPowerVisual(d) ? powerFor(d, d.range.start)?.year : undefined) ?? d.focus_year ?? d.range.start;
}
/** 史前按鈕要打開的專題：第一個從史前開始的專題（時間軸裝不下的卡都在那裡） */
export function prehistDive(index: Index): Dive | undefined {
  return (index.dives ?? []).find((d) => d.range.start < -800);
}

/** 目前年代該顯示哪一張勢力圖：不晚於該年的最近一張；都比該年晚就用第一張 */
export function powerFor(d: Dive, year: number): PowerMap | null {
  const s = [...d.power_maps].sort((a, b) => a.year - b.year);
  return s.filter((p) => p.year <= year).pop() ?? s[0] ?? null;
}


/** 專題入口卡／清單要顯示的數字。骨架 index（home.json）的專題沒有 cards 等明細，數字直接帶在 stat 裡；完整 index 照明細算 */
export function diveStat(d: Dive, m: Map<string, Card>): NonNullable<Dive['stat']> {
  if (d.stat) return d.stat;
  return {
    cards: d.cards.length, persons: d.cards.filter((id) => m.get(id)?.type === 'person').length,
    power: hasPowerVisual(d) ? d.power_maps.length : 0, curves: d.visual === 'curve' && d.curves ? d.curves.series.length : 0, chapters: d.book ? d.book.chapters.length : 0,
  };
}
