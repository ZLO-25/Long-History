// 深入專題的主視覺「曲線」（visual: curve，例如日本失落 30 年）：
// 每條數列各畫一張小圖（同一條年份軸、不畫雙軸），專題的關鍵事件畫成直線，點直線開卡；
// 紅線＝目前年代，點圖上任何一處就把年代跳到那一年。資料只放有來源的點，不內插（data/dives/<id>.yaml 的 curves）。
import type { Card, DiveCurves } from '../types';

const W = 560, H = 120, PL = 52, PR = 10, PT = 12, PB = 20;
const PALETTE = ['#2f5aa8', '#c0392b', '#2e7d4f', '#8e6bb0', '#b8860b'];

const fmtNum = (v: number) => (Math.abs(v) >= 1000 ? Math.round(v).toLocaleString('en-US') : String(Math.round(v * 10) / 10));

export function DiveCurve({ curves, range, year, setYear, onOpen, byId }: {
  curves: DiveCurves; range: { start: number; end: number }; year: number; setYear: (y: number) => void;
  onOpen: (id: string) => void; byId: Map<string, Card>;
}) {
  const x = (y: number) => PL + ((y - range.start) / (range.end - range.start)) * (W - PL - PR);
  const yearAt = (px: number) => Math.round(range.start + ((px - PL) / (W - PL - PR)) * (range.end - range.start));
  const ticks: number[] = [];
  const step = range.end - range.start > 40 ? 10 : 5;
  for (let t = Math.ceil(range.start / step) * step; t <= range.end; t += step) ticks.push(t);
  const srcOf = new Map(curves.sources.map((s, i) => [s.id, i + 1]));
  const inRange = year >= range.start && year <= range.end;
  return (
    <div className="dv-curves">
      {curves.series.map((se, si) => {
        const color = se.color || PALETTE[si % PALETTE.length];
        const pts = se.points.filter((p) => p[0] >= range.start && p[0] <= range.end); // 只畫專題年代內的點
        if (pts.length < 2) return null;
        const vs = pts.map((p) => p[1]);
        let lo = Math.min(...vs), hi = Math.max(...vs);
        if (se.zero !== false && (se.zero || lo > 0)) lo = Math.min(lo, 0);
        if (hi === lo) hi = lo + 1;
        const pad = (hi - lo) * 0.08; hi += pad; if (lo < 0 || se.zero === false) lo -= pad;
        const y = (v: number) => PT + (1 - (v - lo) / (hi - lo)) * (H - PT - PB);
        const path = pts.map((p, i) => `${i ? 'L' : 'M'}${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join('');
        const cur = pts.find((p) => p[0] === year);
        const peak = pts.reduce((a, b) => (b[1] > a[1] ? b : a));
        return (
          <figure key={se.id} className="dv-curve">
            <figcaption><b style={{ color }}>{se.name}</b> <small className="muted">（{se.unit}）{cur ? `・${year} 年：${fmtNum(cur[1])}` : ''}</small></figcaption>
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${se.name}，${pts[0][0]}–${pts[pts.length - 1][0]} 年；最高 ${peak[0]} 年 ${fmtNum(peak[1])}`}
              onClick={(e) => { const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect(); const px = ((e.clientX - r.left) / r.width) * W; const yy = yearAt(px); if (yy >= range.start && yy <= range.end) setYear(yy); }}>
              {[lo, (lo + hi) / 2, hi].map((v, i) => <g key={i}><line x1={PL} x2={W - PR} y1={y(v)} y2={y(v)} className="dv-cv-grid" /><text x={PL - 4} y={y(v) + 3} className="dv-cv-ax" textAnchor="end">{fmtNum(v)}</text></g>)}
              {lo < 0 && <line x1={PL} x2={W - PR} y1={y(0)} y2={y(0)} className="dv-cv-zero" />}
              {ticks.map((t) => <text key={t} x={x(t)} y={H - 6} className="dv-cv-ax" textAnchor="middle">{t}</text>)}
              {curves.events.map((ev) => <line key={ev.label} x1={x(ev.year)} x2={x(ev.year)} y1={PT} y2={H - PB} className="dv-cv-ev" />)}
              <path d={path} fill="none" stroke={color} strokeWidth={2} />
              {pts.map((p) => <circle key={p[0]} cx={x(p[0])} cy={y(p[1])} r={p[0] === year ? 3.6 : 1.8} fill={color}><title>{p[0]} 年：{fmtNum(p[1])}（{se.unit}）</title></circle>)}
              {inRange && <line x1={x(year)} x2={x(year)} y1={PT - 4} y2={H - PB} className="dv-cv-now" />}
            </svg>
            {se.note && <p className="small muted">{se.note}</p>}
            <p className="small muted">來源：{se.src.map((k) => `[${srcOf.get(k) ?? k}]`).join('')}</p>
          </figure>
        );
      })}
      {curves.events.length > 0 && (
        <div className="dv-cv-events small">
          <span className="muted">圖上的灰色直線：</span>
          {curves.events.map((ev) => {
            const c = ev.card ? byId.get(ev.card) : undefined;
            return c ? <button key={ev.label} className="chip" onClick={() => { setYear(ev.year); onOpen(c.id); }}>{ev.year} {ev.label}</button>
              : <button key={ev.label} className="chip" onClick={() => setYear(ev.year)}>{ev.year} {ev.label}</button>;
          })}
        </div>
      )}
      <details className="small"><summary>這些曲線怎麼畫的、根據什麼</summary>
        {curves.caveat && <p className="muted">{curves.caveat}</p>}
        <ol className="sources">{curves.sources.map((s) => <li key={s.id}><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a><span className="muted small">（{s.tier}・查閱 {s.accessed}）</span></li>)}</ol>
      </details>
    </div>
  );
}
