// 人物關係網（深入專題）：把專題裡的人物排成一圈（依出生年順時針），人物之間的關係畫成弧線，
// 顏色＝關係種類（主從／同盟／聯姻／敵對／背叛／師友／親屬）。關係開始年份晚於目前年代的畫成淡色虛線。
// 不用力導向圖：15 個人以內，圓排比較穩定、每次打開長一樣，學生比較好認。點人物開卡。
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Card, Index, RelationKind } from '../types';
import { relationsOf } from './Person';
import { fmtYear } from '../lib/format';
import './relation-graph.css';

// 顏色全站共用（人物卡的關係膠囊 person.css 的 .k-* 是同一組色相）；背叛／敵對另外用線型區分，不只靠顏色
export const KIND_COLOR: Record<RelationKind, string> = {
  主從: '#2b6cb0', 同盟: '#276749', 聯姻: '#b83280', 敵對: '#c53030', 背叛: '#b7501a', 師友: '#6b46c1', 親屬: '#4a5568',
};
const KIND_DASH: Partial<Record<RelationKind, string>> = { 背叛: '7 3' };

// 圈上只放短名：去掉括號、外國人名只留最後一節（路易斯・佛洛伊斯 → 佛洛伊斯），超過 6 字再截斷
export function shortName(name: string, max = 6) {
  const base = name.replace(/（.*$/, '');
  const last = base.includes('・') ? base.split('・').pop()! : base;
  return last.length > max ? last.slice(0, max) + '…' : last;
}

interface Props {
  index: Index; persons: Card[]; year: number; onOpen: (id: string) => void; currentId?: string | null;
  /** 可切換的年份（通常是勢力圖的年份）；給了就在圖上方顯示年份徽章與年份膠囊，手機沒有時間軸也能切 */
  years?: number[]; onYear?: (y: number) => void;
}

export function RelationGraph({ index, persons, year, onOpen, currentId, years, onYear }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [kindOn, setKindOn] = useState<Set<RelationKind> | null>(null);
  const [narrow, setNarrow] = useState(false);
  const [touch, setTouch] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try { setTouch(window.matchMedia('(hover: none)').matches); } catch { /* ignore */ }
    const el = wrap.current; if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => setNarrow(el.clientWidth < 480));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  // 寬螢幕：左右各留約 120px 給人名；窄螢幕（<480px）改成較方的畫布、較大的字，縮放後仍約 16px
  const W = narrow ? 440 : 540, H = narrow ? 440 : 380, R = narrow ? 118 : 140, cx = W / 2, cy = H / 2, nameOff = narrow ? 26 : 22;
  const nodes = useMemo(() => [...persons].sort((a, b) => a.time.start - b.time.start).map((c, i, arr) => {
    const t = -Math.PI / 2 + (2 * Math.PI * i) / arr.length;
    return { c, x: cx + R * Math.cos(t), y: cy + R * Math.sin(t), t };
  }), [persons, cx, cy, R]);
  const pos = new Map(nodes.map((n) => [n.c.id, n]));
  // 每對人物之間可能有多條關係（例如先主從後背叛）；全部畫，同一對的第二條弧往外彎一點
  const edges = useMemo(() => {
    const ids = new Set(persons.map((c) => c.id));
    const seen = new Set<string>(); const out: { a: string; b: string; kind: RelationKind; from?: number; to?: number; note: string; k: number }[] = [];
    const pairCount = new Map<string, number>();
    for (const c of persons) for (const r of relationsOf(index, c)) {
      const o = r.other.id; // relationsOf 也會併入「別人寫到我」的列，那種列的 r.id 是我自己，對方在 r.other
      if (!ids.has(o) || o === c.id) continue;
      const key = [c.id, o].sort().join('|') + '|' + r.kind + '|' + (r.from ?? '');
      if (seen.has(key)) continue; seen.add(key);
      const pk = [c.id, o].sort().join('|'); const k = pairCount.get(pk) ?? 0; pairCount.set(pk, k + 1);
      out.push({ a: c.id, b: o, kind: r.kind, from: r.from, to: r.to, note: r.note, k });
    }
    return out;
  }, [persons, index]);
  const kinds = [...new Set(edges.map((e) => e.kind))];
  const active = hover ?? pinned;
  const kindShown = (k: RelationKind) => !kindOn || kindOn.has(k);
  const show = (e: typeof edges[number]) => kindShown(e.kind) && (!active || e.a === active || e.b === active);
  const started = (e: typeof edges[number]) => e.from == null || e.from <= year;
  const path = (e: typeof edges[number]) => {
    const A = pos.get(e.a)!, B = pos.get(e.b)!;
    // 控制點：兩點中點往圓心拉（第一條），第二條以後往外一點，避免重疊
    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
    const f = e.k === 0 ? 0.35 : e.k === 1 ? -0.15 : 0.7;
    const qx = mx + (cx - mx) * f, qy = my + (cy - my) * f;
    return `M${A.x},${A.y} Q${qx},${qy} ${B.x},${B.y}`;
  };
  // 點膠囊：全亮時＝只看這一種；之後再點＝加入／移除；全部取消回到全亮
  const toggleKind = (k: RelationKind) => setKindOn((s) => {
    if (!s) return new Set([k]);
    const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k);
    return n.size === 0 || n.size === kinds.length ? null : n;
  });
  const tap = (id: string) => { if (pinned === id) onOpen(id); else setPinned(id); };
  if (persons.length < 2) return null;
  const pinC = pinned ? pos.get(pinned)?.c : null;
  const pinCount = pinned ? edges.filter((e) => (e.a === pinned || e.b === pinned) && kindShown(e.kind)).length : 0;
  return (
    <div className={`rel-graph ${narrow ? "narrow" : ""}`} ref={wrap}>
      {years && years.length > 0 && onYear && (
        <div className="rg-year">
          <span className="rg-badge" key={year}>目前：{fmtYear(year)} 年</span>
          <span className="muted small">換年份，關係網會跟著變：</span>
          {years.map((y) => <button key={y} className={`chip ${Math.abs(y - year) <= 3 ? 'on' : ''}`} onClick={() => onYear(y)}>{fmtYear(y)} 年</button>)}
        </div>
      )}
      <div className="rg-kinds" role="group" aria-label="關係種類">
        <span className="small muted">關係種類（點選只看這種）：</span>
        {kinds.map((k) => {
          const on = kindShown(k);
          return <button key={k} className={`chip rg-kind ${on ? 'on' : ''}`} aria-pressed={on} data-kind={k} style={{ borderColor: KIND_COLOR[k], color: on ? '#fff' : KIND_COLOR[k], background: on ? KIND_COLOR[k] : '#fff' }} onClick={() => toggleKind(k)}>
            <svg className="rg-sample" width="22" height="6" aria-hidden><line x1="0" y1="3" x2="22" y2="3" stroke={on ? '#fff' : KIND_COLOR[k]} strokeWidth={k === '敵對' ? 3 : 2} strokeDasharray={KIND_DASH[k]} /></svg>{k}
          </button>;
        })}
        <button className="link small" onClick={() => setKindOn(null)} disabled={!kindOn}>全部</button>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="人物關係網" onClick={() => setPinned(null)}>
        {edges.map((e, i) => {
          const on = show(e), st = started(e);
          return <path key={i} d={path(e)} className={`rg-edge ${on ? '' : 'dim'} ${st ? '' : 'future'}`} data-a={e.a} data-b={e.b} stroke={KIND_COLOR[e.kind]} fill="none" strokeWidth={!st ? 1 : on ? (e.kind === '敵對' ? 3.5 : 2.5) : 1} strokeDasharray={KIND_DASH[e.kind]}>
            <title>{`${pos.get(e.a)!.c.name} — ${e.kind} — ${pos.get(e.b)!.c.name}${e.from ? `（${fmtYear(e.from)}${e.to ? `–${fmtYear(e.to)}` : ' 起'}）` : ''}${st ? '' : `（${fmtYear(year)} 年還沒開始）`}：${e.note}`}</title>
          </path>;
        })}
        {nodes.map((n, ni) => {
          const alive = n.c.time.start <= year && year <= n.c.time.end;
          // 圈上下方的名字是置中的，相鄰兩個會互相壓住：隔一個往外多推一點
          const stagger = Math.abs(Math.cos(n.t)) < 0.45 && ni % 2 === 1 ? (narrow ? 22 : 16) : 0;
          const dx = Math.cos(n.t) * nameOff, dy = Math.sin(n.t) * (nameOff + stagger);
          const id = n.c.id;
          return (
            <g key={id} className={`rg-node ${alive ? 'alive' : ''} ${currentId === id ? 'here' : ''} ${pinned === id ? 'pinned' : ''} ${active && active !== id ? 'faded' : ''}`} transform={`translate(${n.x},${n.y})`}
              onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(id)} onBlur={() => setHover(null)}
              onClick={(ev) => { ev.stopPropagation(); tap(id); }} role="button" tabIndex={0} aria-pressed={pinned === id}
              aria-label={`${n.c.name}，${pinned === id ? '再按一次開卡' : '按一下只看他的關係'}`}
              onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); tap(id); } else if (ev.key === 'Escape') setPinned(null); }}>
              <circle className="rg-hit" r={24} fill="transparent" stroke="none" />
              <circle className="rg-dot" r={alive ? 9 : 7} />
              <text x={dx} y={dy} textAnchor={Math.abs(Math.cos(n.t)) < 0.3 ? 'middle' : Math.cos(n.t) > 0 ? 'start' : 'end'} dominantBaseline="middle">{shortName(n.c.name, narrow ? 4 : 6)}</text>
              <title>{`${n.c.name}（${fmtYear(n.c.time.start)}–${fmtYear(n.c.time.end)}）`}</title>
            </g>
          );
        })}
      </svg>
      <div className="rg-pin" aria-live="polite">
        {pinC ? <><b>{pinC.name.replace(/（.*$/, '')}</b><span className="muted small">{fmtYear(pinC.time.start)}–{fmtYear(pinC.time.end)}｜{pinCount} 條關係</span><button className="chip on" onClick={() => onOpen(pinC.id)}>開卡 →</button><button className="link small" onClick={() => setPinned(null)}>取消</button></>
          : <span className="muted small">{touch ? '點人名只看他的關係，再點一次開卡。' : '點人名（或用 Tab 選取）只看他的關係，再點一次或按「開卡」看他的一生。'}</span>}
      </div>
      <p className="muted small">圈上依出生年順時針排；實心＝{fmtYear(year)} 年在世。淡色細線＝這段關係在 {fmtYear(year)} 年還沒開始；虛線＝背叛，粗線＝敵對。</p>
    </div>
  );
}
