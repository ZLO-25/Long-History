// 物資鏈動畫：t 從 0 到 legs.length，整數部分是第幾段、小數部分是該段走了多少（依距離）
import type { Chain } from '../types';

const km = (a: [number, number], b: [number, number]) =>
  Math.hypot(a[0] - b[0], (a[1] - b[1]) * Math.cos((a[0] * Math.PI) / 180)) * 111.2;

export function legPath(chain: Chain, i: number): [number, number][] {
  const out: [number, number][] = [];
  for (const p of chain.legs[i].parts) for (const c of p.coords) {
    const last = out[out.length - 1];
    if (!last || last[0] !== c[0] || last[1] !== c[1]) out.push(c);
  }
  return out;
}

export function posAt(chain: Chain, t: number): [number, number] {
  const n = chain.legs.length;
  if (t <= 0) return [chain.steps[0].lat, chain.steps[0].lng];
  if (t >= n) { const s = chain.steps[n]; return [s.lat, s.lng]; }
  const i = Math.floor(t), f = t - i;
  const path = legPath(chain, i);
  const seg = path.slice(1).map((c, j) => km(path[j], c));
  const total = seg.reduce((a, b) => a + b, 0);
  let want = f * total;
  for (let j = 0; j < seg.length; j++) {
    if (want <= seg[j] || j === seg.length - 1) {
      const r = seg[j] ? Math.min(1, want / seg[j]) : 0;
      const a = path[j], b = path[j + 1];
      return [a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r];
    }
    want -= seg[j];
  }
  return path[path.length - 1];
}
