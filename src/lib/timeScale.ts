// 非線性時間刻度：事件越密集的年代分到越寬的畫面
import { scaleLinear } from 'd3-scale';
import type { Card } from '../types';

export const BREAKS = [-800, -600, -500, -400, -300, -200, -100, 1, 100, 200, 300, 400, 500];

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
