// 非線性時間刻度：事件越密集的年代分到越寬的畫面
import { scaleLinear } from 'd3-scale';
import type { Card } from '../types';

// 第 5 期延伸到今天：中世紀以後每百年一段，19 世紀起每 50 年一段
export const MIN_YEAR = -800, MAX_YEAR = 2025;
export const BREAKS = [MIN_YEAR, -600, -500, -400, -300, -200, -100, 1, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1850, 1900, 1950, MAX_YEAR];

export function makeBaseScale(cards: Card[], width: number) {
  // 每段寬度 = 1 + 0.5 × 該段內（有重疊）的卡片數
  const weights = BREAKS.slice(0, -1).map((a, i) => {
    const b = BREAKS[i + 1];
    const n = cards.filter((c) => c.time.start < b && c.time.end >= a).length;
    return 1 + 0.5 * n;
  });
  const total = weights.reduce((s, w) => s + w, 0);
  let acc = 0;
  const range = [0, ...weights.map((w) => (acc += (w / total) * width))];
  return scaleLinear().domain(BREAKS).range(range).clamp(true);
}

// 時代分期：研究模式、學習模式、歷史頁、我的地圖共用同一套，名稱與起訖年一致，教的時候才不會兩邊對不上
export const ERAS: { name: string; a: number; b: number; color: string }[] = [
  { name: '上古', a: MIN_YEAR, b: 500, color: '#efe6d2' },
  { name: '中古', a: 500, b: 1500, color: '#e3ecdf' },
  { name: '近代早期', a: 1500, b: 1800, color: '#e2e8f3' },
  { name: '近現代', a: 1800, b: MAX_YEAR, color: '#f1e3ea' },
];
export const eraOf = (y: number) => y < ERAS[0].a ? (y < -3000 ? '史前' : '上古') : (ERAS.find((e) => y >= e.a && y < e.b) ?? ERAS[ERAS.length - 1]).name;
