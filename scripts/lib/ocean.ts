// 遠洋航線（method: ocean，2026-11-17 起，給大航海時代）：
// 帆船橫渡大洋不走「最短海路」，而是順著風帶與洋流繞大圈（例如達伽馬在南大西洋往西繞一個大弧）。
// 所以這裡不自己算路，只把 routes.yaml 依史料列出的經停港與「轉向點」用大圓弧連起來；
// 轉向點本身就是示意（note 要寫明），每段之間的線不是某艘船的實際航跡。
// 另外檢查內插點有沒有落在陸地上（Natural Earth 110m），落在陸地的段落會列在報告裡，請加轉向點。
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const topo = require('world-atlas/land-110m.json');
const { feature } = require('topojson-client');

type P = [number, number]; // [lng, lat]
const R = Math.PI / 180;

const rings: { ring: P[]; bbox: [number, number, number, number] }[] = [];
{
  const geo = feature(topo, topo.objects.land);
  for (const f of geo.features ?? [geo]) {
    const g = f.geometry;
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    for (const poly of polys) for (const ring of poly as P[][]) {
      let a = 180, b = 90, c = -180, d = -90;
      for (const [x, y] of ring) { a = Math.min(a, x); b = Math.min(b, y); c = Math.max(c, x); d = Math.max(d, y); }
      rings.push({ ring, bbox: [a, b, c, d] });
    }
  }
}
/** 點在陸地上嗎（奇偶規則；湖泊等內環自然算水） */
export function onLand([x, y]: P): boolean {
  let inside = false;
  for (const { ring, bbox } of rings) {
    if (x < bbox[0] || x > bbox[2] || y < bbox[1] || y > bbox[3]) continue;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i], [xj, yj] = ring[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
  }
  return inside;
}

const vec = ([lng, lat]: P) => [Math.cos(lat * R) * Math.cos(lng * R), Math.cos(lat * R) * Math.sin(lng * R), Math.sin(lat * R)];
const ll = (v: number[]): P => [Math.atan2(v[1], v[0]) / R, Math.atan2(v[2], Math.hypot(v[0], v[1])) / R];
export const kmBetween = (a: P, b: P) => {
  const va = vec(a), vb = vec(b);
  const dot = Math.min(1, Math.max(-1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
  return Math.acos(dot) * 6371;
};

/** 兩點之間的大圓弧，約每 STEP 公里一點（含兩端） */
export function greatCircle(a: P, b: P, STEP = 120): P[] {
  const d = kmBetween(a, b), n = Math.max(1, Math.ceil(d / STEP));
  const va = vec(a), vb = vec(b), w = d / 6371;
  if (w < 1e-9) return [a, b];
  const out: P[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, s1 = Math.sin((1 - t) * w) / Math.sin(w), s2 = Math.sin(t * w) / Math.sin(w);
    out.push(ll([s1 * va[0] + s2 * vb[0], s1 * va[1] + s2 * vb[1], s1 * va[2] + s2 * vb[2]]));
  }
  out[0] = a; out[n] = b;
  return out;
}

/** 在 ±180° 經線切開：回傳多段，每段經度都連續、不會橫跨整張地圖 */
export function splitAntimeridian(cs: P[]): P[][] {
  const parts: P[][] = [[]];
  for (let i = 0; i < cs.length; i++) {
    const p = cs[i], cur = parts[parts.length - 1];
    if (i && Math.abs(p[0] - cs[i - 1][0]) > 180) {
      const q = cs[i - 1];
      const east = q[0] > 0; // 從東半球往東跨 180°
      const x1 = q[0], x2 = east ? p[0] + 360 : p[0] - 360, edge = east ? 180 : -180;
      const t = (edge - x1) / (x2 - x1), lat = q[1] + (p[1] - q[1]) * t;
      cur.push([edge, lat]);
      parts.push([[-edge, lat], p]);
    } else cur.push(p);
  }
  return parts.filter((s) => s.length > 1);
}

/** 略過陸地檢查的海峽（[西, 南, 東, 北]）：這些水道比 110m 陸地資料的解析度還窄，內插點會被誤判成陸地；只略過檢查，不改線。
 *  跟 sea.ts 的 STRAITS 同一個做法。 */
const STRAITS: [number, number, number, number][] = [
  [-76, -54.5, -66, -52], // 麥哲倫海峽（最窄處約 3 公里，110m 的陸地畫不出來）
];
const inStrait = ([x, y]: P) => STRAITS.some(([a, b, c, d]) => x >= a && x <= c && y >= b && y <= d);

/** 整條遠洋航線：依序連大圓弧；回傳切好的段落、總里程、落在陸地上的段落 */
export function oceanPath(pts: { name: string; p: P }[]) {
  const all: P[] = [], warn: string[] = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const leg = greatCircle(pts[i - 1].p, pts[i].p);
    total += kmBetween(pts[i - 1].p, pts[i].p);
    // 兩端是港口，本來就貼著陸地；只檢查中間的內插點
    const bad = leg.slice(1, -1).filter((p) => !inStrait(p) && onLand(p)).length;
    if (bad > 1) warn.push(`${pts[i - 1].name} → ${pts[i].name}：${bad} 個內插點在陸地上`);
    all.push(...(all.length ? leg.slice(1) : leg));
  }
  return { parts: splitAntimeridian(all), km: Math.round(total), warn };
}
