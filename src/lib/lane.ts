// 研究模式時間軸與結構對照的「地區軌」：依文明分類（civPaths 的第一個地區）分，不再用「中／西」二分。
// 東亞｜歐洲與地中海｜其他地區（西亞、南亞、東南亞、美洲、史前等）。
// 卡片的 track 欄位（china／west／east／other）仍是「對照卡要指向另一邊」的起源地標記，與這裡的畫面分軌分開。
import type { Card } from '../types';

export type Region = 'ea' | 'eu' | 'other';

export const REGION_LABEL: Record<Region, string> = { ea: '東亞', eu: '歐洲與地中海', other: '其他地區' };
export const REGION_NOTE: Record<Region, string> = { ea: '中國、臺灣、日本、朝鮮、北方草原', eu: '古希臘羅馬、歐洲各國', other: '西亞、南亞、東南亞、美洲、非洲、史前' };
const EU_REGIONS = new Set(['歐洲', '地中海古代']);

export function regionOf(c: Pick<Card, 'civPaths' | 'track'>): Region {
  if (c.track === 'china') return 'ea'; // 例如尼克森訪中：第一個文明是美國，但卡片的主場是中國
  const r = c.civPaths[0]?.split('/')[0];
  if (r === '東亞') return 'ea';
  if (r && EU_REGIONS.has(r)) return 'eu';
  return 'other';
}
