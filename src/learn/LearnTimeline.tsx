// 學習模式的三軌時間軸（臺灣／東亞／世界；選專題史時多一條專題軌）
// 只有一條主軌展開，其他收成細線、只標重要度 3 的大事；拉遠只看時代色塊，拉近才出現卡片橫條；
// 放不下的標籤一律省略（滑過才顯示），同一位置太擠就合併成「+N」，點一下放大
import { useEffect, useMemo, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { zoom as d3zoom, zoomIdentity, type ZoomTransform } from 'd3-zoom';
import type { Card, History, LearnTrack } from '../types';
import { makeBaseScale, MIN_YEAR, MAX_YEAR, ERAS as ERA_LIST, eraOf } from '../lib/timeScale';
import { fmtYear, TYPE_COLOR, TYPE_ICON } from '../lib/format';
import { EraBar } from '../components/EraBar';

type Lane = LearnTrack | '專題';
const ERAS: [string, number, number, string][] = ERA_LIST.map((e) => [e.name, e.a, e.b, e.color]);
const AXIS_H = 22, ROW_H = 22, BG_H = 26, MAX_ROWS = 3, CH_W = 13, LEFT = 64;

interface Props {
  cards: Card[]; history: History | null; year: number; setYear: (y: number) => void;
  selectedId: string | null; onOpen: (id: string) => void; inHistory: (c: Card) => boolean;
}

export function LearnTimeline({ cards, history, year, setYear, selectedId, onOpen, inHistory }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(900);
  const [t, setT] = useState<ZoomTransform>(zoomIdentity);
  // 切換列上亮哪一顆：'all'＝全部、時代名稱、null＝自己縮放過；era 記住範圍，畫面寬度改變時重新對準
  const [eraSel, setEraSel] = useState<string | null>('all');
  const era = useRef<[number, number] | null>(null);
  const lastT = useRef<ZoomTransform>(zoomIdentity);
  const theme = !!history?.theme;
  const lanes: Lane[] = theme ? ['專題', '臺灣', '東亞', '世界'] : ['臺灣', '東亞', '世界'];
  const defMain: Lane = theme ? '專題' : history && (history.track === '臺灣' || history.track === '東亞') ? history.track : '世界';
  const [main, setMain] = useState<Lane>(defMain);
  useEffect(() => setMain(defMain), [defMain]);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(320, e.contentRect.width)));
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);
  const base = useMemo(() => makeBaseScale(cards, width - LEFT - 10), [cards, width]);
  const x = (y: number) => LEFT + t.applyX(base(y));

  useEffect(() => {
    const svg = select(svgRef.current!);
    const z = d3zoom<SVGSVGElement, unknown>().scaleExtent([1, 40]).translateExtent([[0, 0], [width - LEFT, 0]]).extent([[0, 0], [width - LEFT, 0]])
      .filter((ev: any) => ev.type === 'wheel' || ev.type.startsWith('touch') || (ev.type === 'mousedown' && !(ev.target as Element).closest('.lnode, .cluster, .era')))
      .on('zoom', (ev) => {
        const p = lastT.current, n = ev.transform;
        if (ev.sourceEvent && (Math.abs(n.k - p.k) > 1e-3 || Math.abs(n.x - p.x) > 1)) { era.current = null; setEraSel(null); }
        lastT.current = n; setT(n);
      });
    svg.call(z).on('dblclick.zoom', null);
    const zoomTo = (svg.node() as any).__zoom_to = (a: number, b: number) => {
      era.current = [a, b];
      const k = Math.min(40, Math.max(1, (width - LEFT - 10) / Math.max(4, base(b) - base(a))));
      svg.call(z.transform, zoomIdentity.translate(-base(a) * k, 0).scale(k));
    };
    (svg.node() as any).__zoom_reset = () => { era.current = null; setEraSel('all'); svg.call(z.transform, zoomIdentity); };
    if (era.current) zoomTo(...era.current); else { setEraSel('all'); svg.call(z.transform, zoomIdentity); }
    return () => { svg.on('.zoom', null); };
  }, [width, base]);
  // name：切到某個時代（按鈕亮起）；不給 name＝放大到一小段（例如「+N」），算自訂範圍
  const zoomTo = (a: number, b: number, name: string | null = null) => { (svgRef.current as any)?.__zoom_to?.(a, b); setEraSel(name); };
  const goEra = (name: string, a: number, b: number) => { zoomTo(a, b, name); if (year < a || year > b) setYear(a); };

  const laneOf = (c: Card): Lane => c.learn!.track;
  const mainCards = cards.filter((c) => inHistory(c) && (main === '專題' ? true : laneOf(c) === main) && (main !== '專題' || (history?.theme ?? []).includes(c.type)));
  const overview = t.k < 1.6 && mainCards.length > 6;

  // 主軌排版：最多 3 列；標籤放得下才畫，放不下先試著不畫標籤，再不行就併入「+N」
  const layout = useMemo(() => {
    const items = [...mainCards].sort((a, b) => a.time.start - b.time.start || b.time.end - a.time.end);
    const rowEnd = Array(MAX_ROWS).fill(-Infinity);
    const barEnd = Array(MAX_ROWS).fill(-Infinity);
    const placed: { c: Card; x0: number; x1: number; row: number; label: boolean; inside: boolean; text: string }[] = [];
    const over: Card[] = [];
    for (const c of items) {
      const x0 = x(c.time.start), x1 = Math.max(x(c.time.end), x0 + 6);
      if (x1 < LEFT - 50 || x0 > width + 10) continue;
      // 橫條在畫面內的那一段夠長，就把名稱寫在橫條裡面（拉近到某個時代時，長期的卡才不會只剩一條沒字的色塊）
      const vis0 = Math.max(x0, LEFT), vis1 = Math.min(x1, width);
      // 橫條裡至少放得下 4 個字就寫進去，太長的名稱用「…」截短（滑過或點開看全名）
      const fitN = Math.floor((vis1 - vis0 - 12) / CH_W);
      const inside = fitN >= Math.min(4, c.name.length);
      const text = inside && fitN < c.name.length ? c.name.slice(0, fitN - 1) + '…' : c.name;
      const withLabel = inside ? x1 + 4 : x1 + 4 + c.name.length * CH_W + 10;
      let row = rowEnd.findIndex((e) => e <= x0);
      if (row >= 0) { rowEnd[row] = withLabel; barEnd[row] = x1 + 4; placed.push({ c, x0, x1, row, label: true, inside, text }); continue; }
      // 放不下標籤：找一列「橫條本身」放得下的，只畫橫條（滑過看名稱）
      row = barEnd.findIndex((e) => e <= x0);
      if (row >= 0) { barEnd[row] = x1 + 4; rowEnd[row] = Math.max(rowEnd[row], x1 + 4); placed.push({ c, x0, x1, row, label: inside, inside, text }); continue; }
      over.push(c);
    }
    // 下一個同列項目太近時，前一個標籤會被截掉：檢查並關掉
    for (const p of placed) {
      if (p.inside) continue;
      const next = placed.filter((q) => q.row === p.row && q.x0 > p.x0).sort((a, b) => a.x0 - b.x0)[0];
      if (next && p.x1 + 4 + p.c.name.length * CH_W + 6 > next.x0) p.label = false;
      if (p.x1 + 4 + p.c.name.length * CH_W > width) p.label = false;
      if (p.x1 + 4 < LEFT) p.label = false; // 標籤會壓到左邊的軌名
    }
    // 擠不進來的：相近的合併成一顆「+N」
    const clusters: { x: number; a: number; b: number; cards: Card[] }[] = [];
    for (const c of over) {
      const cx = x(c.time.start);
      const k = clusters.find((q) => Math.abs(q.x - cx) < 34);
      if (k) { k.cards.push(c); k.a = Math.min(k.a, c.time.start); k.b = Math.max(k.b, c.time.end); }
      else clusters.push({ x: cx, a: c.time.start, b: c.time.end, cards: [c] });
    }
    return { placed, clusters };
  }, [mainCards, t, base, width]);

  const mainH = AXIS_H + (MAX_ROWS + (layout.clusters.length ? 1 : 0)) * ROW_H + 12;
  const tops: Record<string, number> = {};
  let acc = AXIS_H;
  for (const l of lanes) { tops[l] = acc; acc += l === main ? mainH - AXIS_H : BG_H; }
  const height = acc + 4;
  const ticks: number[] = [];
  const span = base.invert(t.invertX(width - LEFT)) - base.invert(t.invertX(0));
  const step = span > 1500 ? 500 : span > 600 ? 100 : span > 250 ? 50 : span > 80 ? 20 : 5;
  for (let y = Math.ceil(MIN_YEAR / step) * step; y <= MAX_YEAR; y += step) ticks.push(y === 0 ? 1 : y);
  let lastTick = -Infinity;
  const viewA = Math.round(base.invert(t.invertX(0))), viewB = Math.round(base.invert(t.invertX(width - LEFT - 10)));
  const cx = x(year);
  const curOff = cx < LEFT ? 'left' : cx > width - 2 ? 'right' : null;
  const badgeX = Math.max(LEFT + 26, Math.min(width - 28, cx));

  return (
    <div className="ltimeline" ref={wrap}>
      <div className="tl-head">
        <span>時間軸：{lanes.map((l) => <button key={l} className={`chip ${l === main ? 'on' : ''}`} onClick={() => setMain(l)} title="點一下讓這條軌展開">{l === '專題' ? history?.name : l}</button>)}</span>
        <EraBar active={eraSel} range={[viewA, viewB]} onAll={() => (svgRef.current as any)?.__zoom_reset?.()} onEra={goEra} />
        <span className="tl-year" title="地圖顯示的年代（紅線）">紅線：{fmtYear(year)} 年・{eraOf(year)}</span>
        <span className="muted small">{overview ? '拉近（滾輪或兩指）看卡片；點時代色塊直接放大' : '細線＝其他軌的大事'}</span>
      </div>
      <svg ref={svgRef} width={width} height={height} role="img" aria-label="三軌時間軸">
        <defs><clipPath id="lt-clip"><rect x={LEFT} y={-10} width={Math.max(0, width - LEFT)} height={2000} /></clipPath><pattern id="era-empty" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#f7f5f0" /><line x1="0" y1="0" x2="0" y2="8" stroke="#ebe5d8" strokeWidth="3" /></pattern></defs>
        <rect x={0} y={0} width={width} height={AXIS_H} className="axis-bg" onClick={(e) => {
          const r = svgRef.current!.getBoundingClientRect(); const y = Math.round(base.invert(t.invertX(e.clientX - r.left - LEFT)));
          setYear(Math.max(MIN_YEAR, Math.min(MAX_YEAR, y || 1)));
        }} />
        {ticks.map((y) => { const px = x(y); if (px < LEFT || px + fmtYear(y).length * 4 + 2 > width || px - lastTick < 44) return null; lastTick = px;
          // 紅線年份標籤正下方的刻度字不畫，避免兩個數字疊在一起
          const hide = Math.abs(px - badgeX) < 26 + fmtYear(y).length * 3.5 + 2;
          return <g key={y}><line x1={px} x2={px} y1={AXIS_H - 5} y2={height} className="tick" />{!hide && <text x={px} y={14} textAnchor="middle" className="tk">{fmtYear(y)}</text>}</g>; })}
        {lanes.map((l) => {
          const top = tops[l];
          const label = l === '專題' ? history?.name ?? '專題' : l;
          if (l !== main) {
            const big = cards.filter((c) => c.importance === 3 && (l === '專題' ? (history?.theme ?? []).includes(c.type) : laneOf(c) === l));
            let lastEnd = -Infinity;
            return (
              <g key={l} transform={`translate(0,${top})`} className="bg-lane">
                <rect x={0} width={width} height={BG_H} className="bg-lane-bg" onClick={() => setMain(l)} />
                <line x1={LEFT} x2={width} y1={BG_H / 2} y2={BG_H / 2} />
                <text x={6} y={BG_H / 2 + 4} className="lane-name">{label}</text>
                {big.map((c) => {
                  const px = x(c.time.start); if (px < LEFT || px > width) return null;
                  const show = px > lastEnd && px + c.name.length * CH_W + 14 < width; if (show) lastEnd = px + c.name.length * CH_W + 14;
                  return <g key={c.id} className="lnode bg" onClick={() => onOpen(c.id)}><title>{c.name}（{fmtYear(c.time.start)}）</title>
                    <circle cx={px} cy={BG_H / 2} r={4} fill={TYPE_COLOR[c.type]} />{show && <text x={px + 6} y={BG_H / 2 - 3} className="bg-label">{c.name}</text>}</g>;
                })}
              </g>
            );
          }
          return (
            <g key={l} transform={`translate(0,${top})`}>
              <rect x={0} width={width} height={mainH - AXIS_H} className="main-lane-bg" />
              {ERAS.map(([n, a, b, col]) => { const x0 = Math.max(LEFT, x(a)), x1 = Math.min(width, x(b)); if (x1 <= x0) return null;
                const cnt = mainCards.filter((c) => c.time.start >= a && c.time.start < b).length;
                // 這條軌在這個時代還沒有卡：不要只寫「0 張」讓人以為壞掉，改成說明，並指向有卡的另一條軌
                if (cnt === 0) {
                  const alt = lanes.filter((l2) => l2 !== main && l2 !== '專題').map((l2) => [l2, cards.filter((c) => inHistory(c) && laneOf(c) === l2 && c.time.start >= a && c.time.start < b).length] as const)
                    .sort((p, q) => q[1] - p[1])[0];
                  const go = alt && alt[1] > 0 ? () => { setMain(alt[0]); zoomTo(a, b, n); } : undefined;
                  const room = x1 - x0 - 8;
                  const lines = [`${n}：這條線還沒有卡片`, go ? `點這裡看${alt![0]}（${alt![1]} 張）` : '內容還在補'];
                  const fit = lines.every((t2) => t2.length * CH_W <= room);
                  const short = `${n}・還沒有卡片`;
                  return <g key={n} className={`era empty ${go ? '' : 'none'}`} onClick={go}><title>{lines.join('；')}</title>
                    <rect x={x0} y={4} width={x1 - x0} height={mainH - AXIS_H - 8} fill="url(#era-empty)" stroke="#d6cfc0" strokeDasharray="4 3" opacity={overview ? 1 : 0.5} />
                    {overview && (fit ? lines.map((t2, i) => <text key={i} x={(x0 + x1) / 2} y={(mainH - AXIS_H) / 2 - 4 + i * 17} textAnchor="middle" className={i ? 'era-alt' : 'era-t muted-t'}>{t2}</text>)
                      : short.length * CH_W <= room ? <text x={(x0 + x1) / 2} y={(mainH - AXIS_H) / 2 + 4} textAnchor="middle" className="era-t muted-t">{short}</text> : null)}</g>;
                }
                return <g key={n} className="era" onClick={() => zoomTo(a, b, n)}><rect x={x0} y={4} width={x1 - x0} height={mainH - AXIS_H - 8} fill={col} opacity={overview ? 0.9 : 0.35} />
                  {overview && (() => { // 色塊太窄時先改成只寫張數，再不行就不寫（點色塊仍可放大）
                    const room = x1 - x0 - 8, full = `${n}・${cnt} 張`, short = `${cnt} 張`;
                    const s = full.length * CH_W <= room ? full : short.length * CH_W <= room ? short : null;
                    return s && <text x={(x0 + x1) / 2} y={(mainH - AXIS_H) / 2 + 4} textAnchor="middle" className="era-t">{s}</text>; })()}</g>; })}
              {!overview && <g clipPath="url(#lt-clip)">{layout.placed.map(({ c, x0, x1, row, label: lb, inside, text }) => (
                <g key={c.id} className={`lnode ${c.id === selectedId ? 'sel' : ''}`} transform={`translate(${x0},${6 + row * ROW_H})`} onClick={() => onOpen(c.id)}>
                  <title>{`${TYPE_ICON[c.type]} ${c.name}（${fmtYear(c.time.start)}${c.time.end !== c.time.start ? `–${fmtYear(c.time.end)}` : ''}）`}</title>
                  <rect width={Math.max(6, x1 - x0)} height={ROW_H - 8} rx={3} fill={TYPE_COLOR[c.type]} />
                  {lb && (inside
                    ? <text className="in" x={Math.max(x0, LEFT) - x0 + 6} y={ROW_H - 11}>{text}</text>
                    : <text x={Math.max(6, x1 - x0) + 4} y={ROW_H - 11}>{c.name}</text>)}
                </g>
              ))}</g>}
              <text x={6} y={14} className="lane-name main">{label}</text>
              {!overview && layout.clusters.map((k, i) => (
                <g key={i} className="cluster" transform={`translate(${k.x},${6 + MAX_ROWS * ROW_H + 7})`} onClick={() => zoomTo(k.a - 5, k.b + 5)}>
                  <title>{k.cards.map((c) => c.name).join('、')}（點一下放大）</title>
                  <rect x={-14} y={-8} width={28} height={16} rx={8} /><text textAnchor="middle" y={4}>+{k.cards.length}</text>
                </g>
              ))}
            </g>
          );
        })}
        {!curOff && <line x1={cx} x2={cx} y1={0} y2={height} className="lcursor" />}
        <g className={`lcursor-tag ${curOff ? 'off' : ''}`} transform={`translate(${badgeX},0)`}
          onClick={curOff ? () => zoomTo(Math.max(MIN_YEAR, year - 50), Math.min(MAX_YEAR, year + 50)) : undefined}>
          <title>{curOff ? '紅線（地圖年代）不在畫面上，點一下移過去' : '紅線＝地圖顯示的年代；點刻度列可以換年代'}</title>
          <rect x={-26} y={3} width={52} height={16} rx={8} />
          <text y={15} textAnchor="middle">{curOff === 'left' ? '◀ ' : ''}{fmtYear(year)}{curOff === 'right' ? ' ▶' : ''}</text>
        </g>
      </svg>
    </div>
  );
}
