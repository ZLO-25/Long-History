// 可縮放的非線性時間軸（D3 zoom）：上方西方軌、中間中國軌（兩軌等高並列）、下方技術軌與金融軌；滑鼠移到卡上會連線到另一軌的對照卡；拖動紅線改變年代
import { useEffect, useMemo, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { zoom as d3zoom, zoomIdentity, type ZoomTransform } from 'd3-zoom';
import type { Card, Econ } from '../types';
import { scaleLinear, scaleLog } from 'd3-scale';
import { fmtEcon, ENTITY_COLORS } from '../lib/format';
import { makeBaseScale, BREAKS, MIN_YEAR, MAX_YEAR } from '../lib/timeScale';
import { fmtYear, TYPE_COLOR } from '../lib/format';

// 時代快速跳轉（大致依課本分期）
const ERAS: [string, number, number][] = [['上古', MIN_YEAR, 500], ['中古', 500, 1500], ['近代', 1500, 1900], ['現代', 1900, MAX_YEAR]];
const AXIS_H = 26, ROW_H = 20, LANE_PAD = 6, LABEL_PX = 12.5;

interface Props {
  cards: Card[]; allCards: Card[]; year: number; setYear: (y: number) => void;
  selectedId: string | null; onOpen: (id: string) => void;
  econ?: Econ; onEcon?: (series: string, point: number) => void; econSel?: { series: string; point: number } | null;
}

export function Timeline({ cards, allCards, year, setYear, selectedId, onOpen, econ, onEcon, econSel }: Props) {
  const [metric, setMetric] = useState<string | null>(null);
  const ECON_H = metric ? 150 : 0, EPAD = 14;
  const wrap = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(800);
  const [t, setT] = useState<ZoomTransform>(zoomIdentity);
  const dragging = useRef(false);
  // 目前選的時代；畫面寬度改變時重新套用，使用者自己縮放平移就取消
  const era = useRef<[number, number] | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(320, e.contentRect.width)));
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  const base = useMemo(() => makeBaseScale(allCards, width - 50), [allCards, width]);
  const x = (y: number) => 22 + t.applyX(base(y));
  const yearAt = (px: number) => {
    const y = Math.round(base.invert(t.invertX(px - 22)));
    return y === 0 ? 1 : y;
  };

  useEffect(() => {
    const svg = select(svgRef.current!);
    const z = d3zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 40])
      .translateExtent([[0, 0], [width, 0]])
      .extent([[0, 0], [width, 0]])
      .filter((ev: any) => !dragging.current && (ev.type === 'wheel' || ev.type.startsWith('touch') || (ev.type === 'mousedown' && !(ev.target as Element).closest('.cursor, .node'))))
      .on('zoom', (ev) => { if (ev.sourceEvent) era.current = null; setT(ev.transform); });
    svg.call(z).on('dblclick.zoom', null);
    (svg.node() as any).__zoom_reset = () => { era.current = null; svg.call(z.transform, zoomIdentity); };
    // 跳到某個時代：讓 [a, b] 剛好填滿畫面
    const zoomTo = (svg.node() as any).__zoom_to = (a: number, b: number) => {
      era.current = [a, b];
      const k = Math.min(40, Math.max(1, (width - 50) / (base(b) - base(a))));
      svg.call(z.transform, zoomIdentity.translate(-base(a) * k, 0).scale(k));
    };
    // 寬度或刻度變了：有選時代就重新對準，否則回到全覽，避免畫面跑到別的年代
    if (era.current) zoomTo(...era.current); else svg.call(z.transform, zoomIdentity);
    return () => { svg.on('.zoom', null); };
  }, [width, base]);

  // 依目前縮放排列：每條軌道內以貪婪法分列，避免重疊
  const showFull = t.k >= 2.5;
  const lanes = useMemo(() => {
    // 技術卡、金融卡不分中西，各自獨立一條軌
    const own = (c: Card) => c.type === 'tech' || c.type === 'finance';
    const lane = (track: 'west' | 'china' | 'tech' | 'finance') => cards.filter((c) => (track === 'tech' || track === 'finance' ? c.type === track : !own(c) && (track === 'china' ? c.track === 'china' || c.track === 'east' : c.track !== 'china' && c.track !== 'east')));
    return (['west', 'china', 'tech', 'finance'] as const).map((track) => {
      // 只排目前畫面內的卡：放大到某個時代時，軌道高度只依畫面內的卡數，技術軌與金融軌才不會被擠到下面看不到
      const items = lane(track).filter((c) => x(Math.max(c.time.end, c.time.start)) >= -200 && x(c.time.start) <= width + 10)
        .sort((a, b) => a.time.start - b.time.start || b.time.end - a.time.end);
      const rowEnds: number[] = [];
      const placed = items.map((c) => {
        const x0 = x(c.time.start), x1 = Math.max(x(c.time.end), x0 + 6);
        const label = showFull ? c.summary_line : c.name;
        const end = x1 + 4 + label.length * LABEL_PX + 8;
        let row = rowEnds.findIndex((e) => e <= x0);
        if (row === -1) { row = rowEnds.length; rowEnds.push(end); } else rowEnds[row] = end;
        return { c, x0, x1, row, label };
      });
      return { track, placed, rows: Math.max(1, rowEnds.length) };
    });
  }, [cards, t, base, showFull, width]);

  // 兩軌等高：以列數較多的一軌為準，中西份量在畫面上相同
  const laneH = Math.max(lanes[0].rows, lanes[1].rows) * ROW_H + LANE_PAD * 2;
  const westH = laneH, chinaH = laneH;
  const techH = lanes[2].rows * ROW_H + LANE_PAD * 2, finH = lanes[3].rows * ROW_H + LANE_PAD * 2;
  const laneTop = [0, westH, westH + chinaH, westH + chinaH + techH];
  const laneHt = [westH, chinaH, techH, finH];

  // 對照連線：滑鼠所在（或已選取）的卡 ↔ 另一軌的對照卡
  const focus = hover ?? selectedId;
  const pos = new Map<string, { x: number; y: number }>();
  lanes.forEach((ln, li) => ln.placed.forEach(({ c, x0, x1, row }) =>
    pos.set(c.id, { x: (x0 + Math.max(x1, x0 + 6)) / 2, y: AXIS_H + ECON_H + laneTop[li] + LANE_PAD + row * ROW_H + 2 + (ROW_H - 6) / 2 })));
  const fc = focus ? allCards.find((c) => c.id === focus) : undefined;
  const related = new Set(fc ? [...fc.counterparts.map((x) => x.id), ...fc.counterpart_of] : []);
  // 經濟曲線帶：共用同一條 x 刻度；只畫有來源的點與期間，不連線、不內插
  // 經濟帶放在刻度列正下方、兩條軌道之上，打開時一定看得到
  const econTop = AXIS_H;
  const m = econ?.metrics.find((x) => x.id === metric);
  const eSeries = (econ?.series ?? []).filter((s) => s.metric === metric);
  const eVals = eSeries.flatMap((s) => s.points.flatMap((p) => [p.value, p.low, p.high].filter((v): v is number => typeof v === 'number')));
  const ey = m?.scale === 'log'
    ? scaleLog().domain([Math.min(...eVals) * 0.7, Math.max(...eVals) * 1.4]).range([ECON_H - EPAD, EPAD])
    : scaleLinear().domain([0, Math.max(...eVals, 1) * 1.1]).range([ECON_H - EPAD, EPAD]);
  // 對數刻度的 d3 預設刻度太密（1、2、3…9、10…），只留 10 的次方；跨不到兩個次方時加上 2、5 倍
  const eTicks = m?.scale === 'log'
    ? (() => { const all = ey.ticks(); const p10 = all.filter((v) => Math.abs(Math.log10(v) % 1) < 1e-9 || Math.abs(Math.log10(v) % 1) > 1 - 1e-9);
        const out = p10.length >= 2 ? p10 : all.filter((v) => '125'.includes(v.toExponential()[0]));
        return out.length > 6 ? out.filter((_, i) => i % Math.ceil(out.length / 6) === 0) : out; })()
    : ey.ticks(4);
  const entities = [...new Set(eSeries.flatMap((s) => s.points.map((p) => p.entity)))];
  const ecolor = (e: string) => ENTITY_COLORS[entities.indexOf(e) % ENTITY_COLORS.length];
  const height = AXIS_H + ECON_H + westH + chinaH + techH + finH + 4;

  // 刻度：縮放越大越細
  const span = base.invert(t.invertX(width)) - base.invert(t.invertX(0));
  const step = span > 900 ? 100 : span > 400 ? 50 : span > 150 ? 25 : span > 60 ? 10 : 5;
  const ticks: number[] = [];
  for (let y = Math.ceil(MIN_YEAR / step) * step; y <= MAX_YEAR; y += step) ticks.push(y === 0 ? 1 : y);

  const startDrag = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const r = svgRef.current!.getBoundingClientRect();
    setYear(Math.max(MIN_YEAR, Math.min(MAX_YEAR, yearAt(e.clientX - r.left))));
  };
  const endDrag = () => { dragging.current = false; };
  const clickAxis = (e: React.MouseEvent) => {
    const r = svgRef.current!.getBoundingClientRect();
    setYear(Math.max(MIN_YEAR, Math.min(MAX_YEAR, yearAt(e.clientX - r.left))));
  };

  const cx = x(year);
  return (
    <div className="timeline" ref={wrap}>
      <div className="tl-head">
        <span>時間軸（滾輪縮放、拖曳平移；拖動紅線或點刻度列改變年代）</span>
        <span className="tl-year">目前：{fmtYear(year)} 年</span>
        <button className="btn sm" onClick={() => (svgRef.current as any)?.__zoom_reset?.()}>全部</button>
        {ERAS.map(([l, a, b]) => <button key={l} className="btn sm" title={`${fmtYear(a)}–${fmtYear(b)} 年`} onClick={() => { (svgRef.current as any)?.__zoom_to?.(a, b); if (year < a || year > b) setYear(a); }}>{l}</button>)}
        {econ && <span className="econ-toggle">經濟曲線：
          {[{ id: null, name: '關' }, ...econ.metrics].map((x) => (
            <button key={x.id ?? 'off'} className={`chip ${metric === x.id ? 'on' : ''}`} onClick={() => setMetric(x.id)}>{x.name}</button>))}
        </span>}
      </div>
      <svg ref={svgRef} width={width} height={height} onPointerMove={onMove} onPointerUp={endDrag} onPointerLeave={endDrag}>
        <g className="axis" onClick={clickAxis}>
          <rect x={0} y={0} width={width} height={AXIS_H} className="axis-bg" />
          {(() => { let lastLabel = -Infinity; return ticks.map((y) => {
            const px = x(y);
            if (px < -20 || px > width + 20) return null;
            const major = BREAKS.includes(y) || y % 100 === 0;
            return (
              <g key={y} transform={`translate(${px},0)`}>
                <line y1={AXIS_H - (major ? 8 : 4)} y2={height} className={major ? 'tick major' : 'tick'} />
                {(major || step <= 25) && px - lastLabel >= 46 && ((lastLabel = px), true) && <text y={13} textAnchor="middle">{fmtYear(y)}</text>}
              </g>
            );
          }); })()}
        </g>
        {lanes.map((ln, li) => {
          const top = AXIS_H + ECON_H + laneTop[li];
          const h = laneHt[li];
          return (
            <g key={ln.track} transform={`translate(0,${top})`}>
              <rect x={0} y={0} width={width} height={h} className={`lane lane-${ln.track}`} />
              {ln.placed.map(({ c, x0, x1, row, label }) => {
                if (x1 < -200 || x0 > width + 10) return null;
                const y = LANE_PAD + row * ROW_H + 2;
                const sel = c.id === selectedId;
                const rel = related.has(c.id);
                return (
                  <g key={c.id} className={`node ${sel ? 'sel' : ''} ${rel ? 'rel' : ''} ${fc && !sel && !rel && c.id !== focus ? 'dim' : ''}`} onClick={() => onOpen(c.id)}
                    onMouseEnter={() => setHover(c.id)} onMouseLeave={() => setHover(null)} transform={`translate(${x0},${y})`}>
                    <title>{`${c.summary_line}\n${fmtYear(c.time.start)}–${fmtYear(c.time.end)}`}</title>
                    <rect width={x1 - x0} height={ROW_H - 6} rx={3} fill={TYPE_COLOR[c.type]} opacity={sel ? 1 : 0.85} />
                    <text x={Math.max(x1 - x0, 6) + 4} y={ROW_H - 9}>{label}</text>
                  </g>
                );
              })}
              <text x={4} y={12} className="lane-label">{{ china: '中國與東亞', west: '西方', tech: '技術（發明→普及）', finance: '金融' }[ln.track]}</text>
            </g>
          );
        })}
        {fc && pos.has(fc.id) && [...related].map((id) => {
          const a = pos.get(fc.id)!, b = pos.get(id);
          if (!b) return null;
          return <line key={id} className="cp-link" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
        })}
        {m && (
          <g className="econ" transform={`translate(0,${econTop})`}>
            <rect x={0} y={0} width={width} height={ECON_H} className="lane lane-econ" />
            <text x={4} y={12} className="lane-label">{m.name}（{m.unit}{m.scale === 'log' ? '，對數刻度' : ''}）</text>
            {eTicks.map((v) => (
              <g key={v} transform={`translate(0,${ey(v)})`}>
                <line x1={22} x2={width} className="econ-grid" />
                <text x={width - 4} y={-2} textAnchor="end" className="econ-tick">{fmtEcon(v, m.id)}</text>
              </g>))}
            {eSeries.map((s) => s.points.map((p, i) => {
              const x0 = x(p.start), x1 = x(p.end);
              if (x1 < -10 || x0 > width + 10) return null;
              const c = ecolor(p.entity);
              const sel = econSel?.series === s.id && econSel.point === i;
              const val = p.value != null ? fmtEcon(p.value, m.id) : `${fmtEcon(p.low!, m.id)}–${fmtEcon(p.high!, m.id)}`;
              const tip = `${p.entity}｜${p.start === p.end ? fmtYear(p.start) : `${fmtYear(p.start)}–${fmtYear(p.end)}`} 年｜${val}\n${s.name}（${s.kind}・${p.verification}）${p.note ? `\n${p.note}` : ''}\n點一下看來源`;
              const span = x1 - x0 > 3;
              return (
                <g key={`${s.id}-${i}`} className={`epoint ${sel ? 'sel' : ''} kind-${s.kind}`} onClick={() => onEcon?.(s.id, i)}>
                  <title>{tip}</title>
                  {p.value != null
                    ? (span ? <line x1={x0} x2={x1} y1={ey(p.value)} y2={ey(p.value)} stroke={c} strokeWidth={sel ? 6 : 4} />
                            : <circle cx={x0} cy={ey(p.value)} r={sel ? 6 : 4.5} fill={s.kind === '登記' ? '#fff' : c} stroke={c} strokeWidth={2} />)
                    : (span ? <rect x={x0} width={x1 - x0} y={ey(p.high!)} height={Math.max(2, ey(p.low!) - ey(p.high!))} fill={c} opacity={0.35} stroke={c} />
                            : <line x1={x0} x2={x0} y1={ey(p.high!)} y2={ey(p.low!)} stroke={c} strokeWidth={sel ? 6 : 4} />)}
                </g>
              );
            }))}
          </g>
        )}
        <g className="cursor" transform={`translate(${cx},0)`} onPointerDown={startDrag}>
          <line y1={0} y2={height} />
          <rect x={-7} y={0} width={14} height={height} className="cursor-hit" />
          <rect x={-24} y={AXIS_H - 2} width={48} height={16} rx={8} className="cursor-badge" />
          <text y={AXIS_H + 10} textAnchor="middle">{fmtYear(year)}</text>
        </g>
      </svg>
      {m && <div className="econ-legend">
        {entities.map((e) => <span key={e}><i style={{ background: ecolor(e) }} />{e}</span>)}
        <span className="muted">● 估計／實測　○ 官方登記　橫條＝一段期間　方塊或直條＝數值範圍。只畫有來源的點，不連線、不補中間年份。</span>
      </div>}
    </div>
  );
}
