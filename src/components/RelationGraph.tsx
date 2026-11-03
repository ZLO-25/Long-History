// 人物關係網（深入專題）：把專題裡的人物排成一圈（依出生年順時針），人物之間的關係畫成弧線，
// 顏色＝關係種類（主從／同盟／聯姻／敵對／背叛／師友／親屬）。關係開始年份晚於目前年代的畫成淡色虛線。
// 不用力導向圖：15 個人以內，圓排比較穩定、每次打開長一樣，學生比較好認。點人物開卡。
import { useMemo, useState } from 'react';
import type { Card, Index, RelationKind } from '../types';
import { relationsOf } from './Person';
import { fmtYear } from '../lib/format';
import './relation-graph.css';

export const KIND_COLOR: Record<RelationKind, string> = {
  主從: '#2b6cb0', 同盟: '#2f855a', 聯姻: '#b83280', 敵對: '#c53030', 背叛: '#dd6b20', 師友: '#6b46c1', 親屬: '#975a16',
};

// 圈上只放短名：去掉括號、外國人名只留最後一節（路易斯・佛洛伊斯 → 佛洛伊斯），超過 6 字再截斷
export function shortName(name: string) {
  const base = name.replace(/（.*$/, '');
  const last = base.includes('・') ? base.split('・').pop()! : base;
  return last.length > 6 ? last.slice(0, 6) + '…' : last;
}

interface Props { index: Index; persons: Card[]; year: number; onOpen: (id: string) => void; currentId?: string | null }

export function RelationGraph({ index, persons, year, onOpen, currentId }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const [kindOn, setKindOn] = useState<Set<RelationKind> | null>(null);
  // 左右各留約 120px 給人名（最長 6 個字＋間距），不然圈左右兩側的名字會被切掉
  const W = 540, H = 380, R = 140, cx = W / 2, cy = H / 2;
  const nodes = useMemo(() => [...persons].sort((a, b) => a.time.start - b.time.start).map((c, i, arr) => {
    const t = -Math.PI / 2 + (2 * Math.PI * i) / arr.length;
    return { c, x: cx + R * Math.cos(t), y: cy + R * Math.sin(t), t };
  }), [persons]);
  const pos = new Map(nodes.map((n) => [n.c.id, n]));
  // 每對人物之間可能有多條關係（例如先主從後背叛）；全部畫，同一對的第二條弧往外彎一點
  const edges = useMemo(() => {
    const seen = new Set<string>(); const out: { a: string; b: string; kind: RelationKind; from?: number; to?: number; note: string; k: number }[] = [];
    const pairCount = new Map<string, number>();
    for (const c of persons) for (const r of relationsOf(index, c)) {
      if (!pos.has(r.id)) continue;
      const key = [c.id, r.id].sort().join('|') + '|' + r.kind + '|' + (r.from ?? '');
      if (seen.has(key)) continue; seen.add(key);
      const pk = [c.id, r.id].sort().join('|'); const k = pairCount.get(pk) ?? 0; pairCount.set(pk, k + 1);
      out.push({ a: c.id, b: r.id, kind: r.kind, from: r.from, to: r.to, note: r.note, k });
    }
    return out;
  }, [persons, index]);
  const kinds = [...new Set(edges.map((e) => e.kind))];
  const show = (e: typeof edges[number]) => (!kindOn || kindOn.has(e.kind)) && (!hover || e.a === hover || e.b === hover);
  const started = (e: typeof edges[number]) => e.from == null || e.from <= year;
  const path = (e: typeof edges[number]) => {
    const A = pos.get(e.a)!, B = pos.get(e.b)!;
    // 控制點：兩點中點往圓心拉（第一條），第二條以後往外一點，避免重疊
    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
    const f = e.k === 0 ? 0.35 : e.k === 1 ? -0.15 : 0.7;
    const qx = mx + (cx - mx) * f, qy = my + (cy - my) * f;
    return `M${A.x},${A.y} Q${qx},${qy} ${B.x},${B.y}`;
  };
  if (persons.length < 2) return null;
  return (
    <div className="rel-graph">
      <div className="rg-kinds">
        {kinds.map((k) => (
          <button key={k} className={`chip ${!kindOn || kindOn.has(k) ? 'on' : ''}`} style={{ borderColor: KIND_COLOR[k], color: !kindOn || kindOn.has(k) ? '#fff' : KIND_COLOR[k], background: !kindOn || kindOn.has(k) ? KIND_COLOR[k] : '#fff' }}
            onClick={() => setKindOn((s) => { const n = new Set(s ?? kinds); if (n.has(k) && n.size > 1) n.delete(k); else n.add(k); return n.size === kinds.length ? null : n; })}>{k}</button>
        ))}
        {kindOn && <button className="link small" onClick={() => setKindOn(null)}>全部</button>}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="人物關係網">
        {edges.map((e, i) => {
          const on = show(e), st = started(e);
          return <path key={i} d={path(e)} className={`rg-edge ${on ? '' : 'dim'} ${st ? '' : 'future'}`} stroke={KIND_COLOR[e.kind]} fill="none" strokeWidth={on ? 2.5 : 1} strokeDasharray={st ? undefined : '4 4'}>
            <title>{`${pos.get(e.a)!.c.name} — ${e.kind} — ${pos.get(e.b)!.c.name}${e.from ? `（${fmtYear(e.from)}${e.to ? `–${fmtYear(e.to)}` : ' 起'}）` : ''}：${e.note}`}</title>
          </path>;
        })}
        {nodes.map((n) => {
          const alive = n.c.time.start <= year && year <= n.c.time.end;
          const dx = Math.cos(n.t) * 22, dy = Math.sin(n.t) * 22;
          return (
            <g key={n.c.id} className={`rg-node ${alive ? 'alive' : ''} ${currentId === n.c.id ? 'here' : ''} ${hover && hover !== n.c.id ? 'faded' : ''}`} transform={`translate(${n.x},${n.y})`}
              onMouseEnter={() => setHover(n.c.id)} onMouseLeave={() => setHover(null)} onClick={() => onOpen(n.c.id)} role="button" tabIndex={0} onKeyDown={(ev) => { if (ev.key === 'Enter') onOpen(n.c.id); }}>
              <circle r={alive ? 9 : 7} />
              <text x={dx} y={dy} textAnchor={Math.abs(Math.cos(n.t)) < 0.3 ? 'middle' : Math.cos(n.t) > 0 ? 'start' : 'end'} dominantBaseline="middle">{shortName(n.c.name)}</text>
              <title>{`${n.c.name}（${fmtYear(n.c.time.start)}–${fmtYear(n.c.time.end)}）點開看他的一生`}</title>
            </g>
          );
        })}
      </svg>
      <p className="muted small">圈上依出生年順時針排；實心＝{fmtYear(year)} 年在世。虛線＝這段關係在 {fmtYear(year)} 年還沒開始。把滑鼠移到人名上只看他的關係；點人名開卡。</p>
    </div>
  );
}
