// 可縮放的非線性時間軸（D3 zoom）：上方西方軌、下方中國對照軌；拖動紅線改變年代
import { useEffect, useMemo, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { zoom as d3zoom, zoomIdentity, type ZoomTransform } from 'd3-zoom';
import type { Card } from '../types';
import { makeBaseScale, BREAKS } from '../lib/timeScale';
import { fmtYear, TYPE_COLOR } from '../lib/format';

const AXIS_H = 26, ROW_H = 20, LANE_PAD = 6, LABEL_PX = 12.5;

interface Props {
  cards: Card[]; allCards: Card[]; year: number; setYear: (y: number) => void;
  selectedId: string | null; onOpen: (id: string) => void;
}

export function Timeline({ cards, allCards, year, setYear, selectedId, onOpen }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(800);
  const [t, setT] = useState<ZoomTransform>(zoomIdentity);
  const dragging = useRef(false);

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
      .on('zoom', (ev) => setT(ev.transform));
    svg.call(z).on('dblclick.zoom', null);
    (svg.node() as any).__zoom_reset = () => svg.call(z.transform, zoomIdentity);
    return () => { svg.on('.zoom', null); };
  }, [width]);

  // 依目前縮放排列：每條軌道內以貪婪法分列，避免重疊
  const showFull = t.k >= 2.5;
  const lanes = useMemo(() => {
    const lane = (track: 'west' | 'other' | 'china') => cards.filter((c) => (track === 'china' ? c.track === 'china' : c.track !== 'china'));
    return (['west', 'china'] as const).map((track) => {
      const items = lane(track).slice().sort((a, b) => a.time.start - b.time.start || b.time.end - a.time.end);
      const rowEnds: number[] = [];
      const placed = items.map((c) => {
        const x0 = x(c.time.start), x1 = Math.max(x(c.time.end), x0 + 6);
        const label = showFull ? c.summary_line : c.name;
        const end = Math.max(x1, x0 + label.length * LABEL_PX) + 10;
        let row = rowEnds.findIndex((e) => e <= x0);
        if (row === -1) { row = rowEnds.length; rowEnds.push(end); } else rowEnds[row] = end;
        return { c, x0, x1, row, label };
      });
      return { track, placed, rows: Math.max(1, rowEnds.length) };
    });
  }, [cards, t, base, showFull]);

  const westH = lanes[0].rows * ROW_H + LANE_PAD * 2;
  const chinaH = lanes[1].rows * ROW_H + LANE_PAD * 2;
  const height = AXIS_H + westH + chinaH + 4;

  // 刻度：縮放越大越細
  const span = base.invert(t.invertX(width)) - base.invert(t.invertX(0));
  const step = span > 900 ? 100 : span > 400 ? 50 : span > 150 ? 25 : span > 60 ? 10 : 5;
  const ticks: number[] = [];
  for (let y = Math.ceil(-800 / step) * step; y <= 500; y += step) ticks.push(y === 0 ? 1 : y);

  const startDrag = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const r = svgRef.current!.getBoundingClientRect();
    setYear(Math.max(-800, Math.min(500, yearAt(e.clientX - r.left))));
  };
  const endDrag = () => { dragging.current = false; };
  const clickAxis = (e: React.MouseEvent) => {
    const r = svgRef.current!.getBoundingClientRect();
    setYear(Math.max(-800, Math.min(500, yearAt(e.clientX - r.left))));
  };

  const cx = x(year);
  return (
    <div className="timeline" ref={wrap}>
      <div className="tl-head">
        <span>時間軸（滾輪縮放、拖曳平移；拖動紅線或點刻度列改變年代）</span>
        <span className="tl-year">目前：{fmtYear(year)} 年</span>
        <button className="btn sm" onClick={() => (svgRef.current as any)?.__zoom_reset?.()}>重設縮放</button>
      </div>
      <svg ref={svgRef} width={width} height={height} onPointerMove={onMove} onPointerUp={endDrag} onPointerLeave={endDrag}>
        <g className="axis" onClick={clickAxis}>
          <rect x={0} y={0} width={width} height={AXIS_H} className="axis-bg" />
          {ticks.map((y) => {
            const px = x(y);
            if (px < -20 || px > width + 20) return null;
            const major = BREAKS.includes(y) || y % 100 === 0;
            return (
              <g key={y} transform={`translate(${px},0)`}>
                <line y1={AXIS_H - (major ? 8 : 4)} y2={height} className={major ? 'tick major' : 'tick'} />
                {(major || step <= 25) && <text y={13} textAnchor="middle">{fmtYear(y)}</text>}
              </g>
            );
          })}
        </g>
        {lanes.map((ln, li) => {
          const top = AXIS_H + (li === 0 ? 0 : westH);
          const h = li === 0 ? westH : chinaH;
          return (
            <g key={ln.track} transform={`translate(0,${top})`}>
              <rect x={0} y={0} width={width} height={h} className={`lane lane-${ln.track}`} />
              <text x={4} y={12} className="lane-label">{ln.track === 'china' ? '中國對照' : '希臘羅馬'}</text>
              {ln.placed.map(({ c, x0, x1, row, label }) => {
                if (x1 < -200 || x0 > width + 10) return null;
                const y = LANE_PAD + row * ROW_H + 2;
                const sel = c.id === selectedId;
                return (
                  <g key={c.id} className={`node ${sel ? 'sel' : ''}`} onClick={() => onOpen(c.id)} transform={`translate(${x0},${y})`}>
                    <title>{`${c.summary_line}\n${fmtYear(c.time.start)}–${fmtYear(c.time.end)}`}</title>
                    <rect width={x1 - x0} height={ROW_H - 6} rx={3} fill={TYPE_COLOR[c.type]} opacity={sel ? 1 : 0.85} />
                    <text x={Math.max(x1 - x0, 6) + 4} y={ROW_H - 9}>{label}</text>
                  </g>
                );
              })}
            </g>
          );
        })}
        <g className="cursor" transform={`translate(${cx},0)`} onPointerDown={startDrag}>
          <line y1={0} y2={height} />
          <rect x={-7} y={0} width={14} height={height} className="cursor-hit" />
          <rect x={-24} y={AXIS_H - 2} width={48} height={16} rx={8} className="cursor-badge" />
          <text y={AXIS_H + 10} textAnchor="middle">{fmtYear(year)}</text>
        </g>
      </svg>
    </div>
  );
}
