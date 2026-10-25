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
