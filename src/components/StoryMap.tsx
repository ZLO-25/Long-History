// 故事地圖：讀故事時標出「這一節發生在哪裡」，讓讀者把事件和地理連起來（docs/stories.md 第七節）。
// 簡易地圖：Natural Earth 陸地輪廓＋海洋與地區名＋今天的國名（灰字），自己用 SVG 畫，不載入圖磚，打開就有。
//   ● 這一節的地點（有名字）  · 其他節的地點  ①②③ 故事順序（虛線，不是行進路線）  ━ 卡片上的路線
// 內文正在讀的那一段提到的地點會亮起來；點內文的地名或下面的地點，地圖就移過去。
// 這個檔案用 React.lazy 載入：先出現文字，地圖晚一點才下載（效能原則：第一眼的畫面先到）。
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import type { Card, StoryDoc, StoryMapData, StoryPlace } from '../types';
import { fmtRange } from '../lib/format';

const cache = new Map<string, Promise<StoryMapData>>();
const loadMap = (id: string) => {
  if (!cache.has(id)) {
    const p = fetch(`${import.meta.env.BASE_URL}data/stories/${id}.map.json`).then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json() as Promise<StoryMapData>; });
    p.catch(() => cache.delete(id));
    cache.set(id, p);
  }
  return cache.get(id)!;
};

// Web Mercator：世界寬 256 單位
const X = (lng: number) => ((lng + 180) / 360) * 256;
const Y = (lat: number) => { const l = Math.max(-80, Math.min(82, lat)) * Math.PI / 180; return (1 - Math.log(Math.tan(l) + 1 / Math.cos(l)) / Math.PI) / 2 * 256; };
interface View { cx: number; cy: number; k: number }

/** 把一群點放進畫面；點太集中時至少看得到約 3 個經度寬，免得放太大看不出在哪裡 */
function fit(pts: [number, number][], w: number, h: number, pad = 0.2): View {
  if (!pts.length || w <= 0 || h <= 0) return { cx: 128, cy: 100, k: 1 };
  const xs = pts.map((p) => X(p[1])), ys = pts.map((p) => Y(p[0]));
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const minSpan = (7 / 360) * 256;
  const dx = Math.max(minSpan, x1 - x0), dy = Math.max(minSpan * 0.7, y1 - y0);
  const k = Math.min((w * (1 - 2 * pad)) / dx, (h * (1 - 2 * pad)) / dy);
  return { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, k: Math.max(0.6, Math.min(k, 900)) };
}

interface Props {
  doc: StoryDoc; byId: Map<string, Card>; sec: number;
  /** 正在讀的段落提到的地點 */
  hot: number[];
  /** 讀者點的地點（內文地名或下面的清單）；null＝沒有 */
  focus: number | null; onFocus: (i: number | null) => void;
  /** 跳到某一節 */
  onSection?: (i: number) => void;
  compact?: boolean;
}

const LABEL_FS: Record<string, number> = { o: 11, r: 10.5, c: 10, v: 10.5 };

export const StoryMap = memo(function StoryMap({ doc, byId, sec, hot, focus, onFocus, onSection, compact }: Props) {
  const [data, setData] = useState<StoryMapData | null>(null);
  const [failed, setFailed] = useState(false);
  const [all, setAll] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const places = doc.places ?? [];

  useEffect(() => { let on = true; setData(null); setFailed(false); loadMap(doc.id).then((d) => on && setData(d)).catch(() => on && setFailed(true)); return () => { on = false; }; }, [doc.id]);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);
  useEffect(() => { setAll(false); }, [sec]);

  const secPlaces = useMemo(() => places.map((p, i) => (p.secs.includes(sec) ? i : -1)).filter((i) => i >= 0), [places, sec]);
  // 目標畫面：這一節（加上讀者點的地點）或全篇
  const target = useMemo(() => {
    const ids = all || !secPlaces.length ? places.map((_, i) => i) : [...secPlaces, ...(focus != null && !secPlaces.includes(focus) ? [focus] : [])];
    return fit(ids.map((i) => [places[i].lat, places[i].lng]), size.w, size.h, compact ? 0.16 : 0.2);
  }, [all, secPlaces, places, focus, size, compact]);

  // 換節時地圖平滑移過去（約 0.45 秒）；不喜歡動畫的人直接跳
  const [view, setView] = useState<View>(target);
  const cur = useRef(view); cur.current = view;
  const first = useRef(true);
  useEffect(() => {
    if (size.w <= 0) return;
    const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (first.current || reduce) { first.current = false; setView(target); return; }
    const a = cur.current, b = target, t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 450), e = 1 - (1 - t) ** 3;
      setView({ cx: a.cx + (b.cx - a.cx) * e, cy: a.cy + (b.cy - a.cy) * e, k: Math.exp(Math.log(a.k) + (Math.log(b.k) - Math.log(a.k)) * e) });
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, size.w]);

  const { w, h } = size;
  const sx = (lng: number) => (X(lng) - view.cx) * view.k + w / 2;
  const sy = (lat: number) => (Y(lat) - view.cy) * view.k + h / 2;

  // 陸地：世界座標的路徑只算一次，移動地圖只改 transform
  const landD = useMemo(() => data ? data.land.map((r) => { let d = ''; for (let i = 0; i < r.length; i += 2) d += `${i ? 'L' : 'M'}${X(r[i]).toFixed(2)} ${Y(r[i + 1]).toFixed(2)}`; return `${d}Z`; }).join('') : '', [data]);
  const water = useMemo(() => {
    if (!data) return null;
    const line = (r: number[], close: boolean) => { let d = ''; for (let i = 0; i < r.length; i += 2) d += `${i ? 'L' : 'M'}${X(r[i]).toFixed(2)} ${Y(r[i + 1]).toFixed(2)}`; return close ? `${d}Z` : d; };
    return <>
      <path d={(data.lakes ?? []).map((r) => line(r, true)).join('')} className="sm-lake" vectorEffect="non-scaling-stroke" />
      <path d={(data.rivers ?? []).map((r) => line(r, false)).join('')} className="sm-river" vectorEffect="non-scaling-stroke" />
    </>;
  }, [data]);
  const land = useMemo(() => <><path d={landD} className="sm-land" fillRule="evenodd" vectorEffect="non-scaling-stroke" />{water}</>, [landD, water]);
  const routeD = useMemo(() => (data?.routes ?? []).map((r) => { let d = ''; for (let i = 0; i < r.c.length; i += 2) d += `${i ? 'L' : 'M'}${X(r.c[i]).toFixed(2)} ${Y(r.c[i + 1]).toFixed(2)}`; return d; }), [data]);

  // 故事順序：每節的代表點依序連起來
  const order = (doc.secPt ?? []).map((p, i) => ({ p, i })).filter((x) => x.p >= 0);
  const hotSet = new Set(hot);
  const z = Math.log2(view.k);

  // 文字標籤：這一節的地點優先，其次海洋、地區、今天的國名；互相擋到就不畫
  const taken: [number, number, number, number][] = [];
  const free = (x: number, y: number, tw: number, th: number) => {
    if (x < 2 || y < 2 || x + tw > w - 2 || y + th > h - 2) return false;
    for (const [a, b, c, d] of taken) if (x < c && x + tw > a && y < d && y + th > b) return false;
    taken.push([x, y, x + tw, y + th]); return true;
  };
  const tw = (s: string, fs: number) => [...s].reduce((n, ch) => n + (ch.charCodeAt(0) > 0x2e80 ? fs : fs * 0.55), 0);
  const shortName = (p: StoryPlace) => p.n.replace(/[（(][^）)]*[）)]/g, '').trim();
  const pinLabels: JSX.Element[] = [];
  const mainIds = [...new Set([...(focus != null ? [focus] : []), ...hot, ...secPlaces])];
  for (const i of mainIds) {
    const p = places[i];
    if (!p) continue;
    const x = sx(p.lng), y = sy(p.lat);
    const name = shortName(p), fs = 12.5, wd = tw(name, fs) + 6;
    for (const [dx, dy] of [[9, -7], [-wd - 9, -7], [-wd / 2, -24], [-wd / 2, 9]] as const) {
      if (free(x + dx, y + dy, wd, fs + 4)) { pinLabels.push(<text key={`pl${i}`} x={x + dx + 3} y={y + dy + fs} className={`sm-plabel ${hotSet.has(i) || focus === i ? 'hot' : ''}`}>{name}</text>); break; }
    }
  }
  // 地點圓點也要占位，底圖文字才不會壓在點上
  for (const i of mainIds) { const p = places[i]; if (p) taken.push([sx(p.lng) - 6, sy(p.lat) - 6, sx(p.lng) + 6, sy(p.lat) + 6]); }
  const baseLabels: JSX.Element[] = [];
  if (data) {
    // 河名比國名重要（事件常在河邊）；同一級裡先畫海洋與河
    const pri: Record<string, number> = { o: 0, v: 0.2, r: 0.4, c: 0.6 };
    const ls = [...data.labels].filter((l) => l[4] <= z + (l[0] === 'c' ? 0.6 : 1.4)).sort((a, b) => a[4] + pri[a[0]] - (b[4] + pri[b[0]]));
    for (const [t, name, la, ln] of ls) {
      if (baseLabels.length > (z < 2.5 ? 8 : 14)) break;
      const fs = LABEL_FS[t] ?? 10, wd = tw(name, fs), x = sx(ln) - wd / 2, y = sy(la) - fs / 2;
      if (free(x, y, wd, fs + 2)) baseLabels.push(<text key={`b${name}${la}`} x={x} y={y + fs} className={`sm-blabel ${t}`}>{name}</text>);
    }
  }

  const fp = focus != null ? places[focus] : null;
  const s0 = doc.sections[sec];
  return (
    <div className={`sm ${compact ? 'compact' : ''}`}>
      <div className="sm-box" ref={box} role="img" aria-label={`地圖：${s0 ? `第 ${sec + 1} 節「${s0.title}」` : ''}的地點有 ${secPlaces.map((i) => shortName(places[i])).join('、') || '（這一節沒有特定地點）'}`}>
        {w > 0 && (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
            <rect width={w} height={h} className="sm-sea" />
            <g transform={`translate(${w / 2 - view.cx * view.k} ${h / 2 - view.cy * view.k}) scale(${view.k})`}>
              {land}
              {routeD.map((d, i) => <path key={i} d={d} className={`sm-route ${data!.routes[i].secs.includes(sec) ? 'on' : ''}`} vectorEffect="non-scaling-stroke"><title>{data!.routes[i].name}</title></path>)}
            </g>
            {baseLabels}
            {order.length > 1 && <polyline className="sm-order" points={order.map(({ p }) => `${sx(places[p].lng)},${sy(places[p].lat)}`).join(' ')} />}
            {places.map((p, i) => {
              if (mainIds.includes(i)) return null;
              const past = p.secs.some((s) => s < sec);
              return <circle key={i} cx={sx(p.lng)} cy={sy(p.lat)} r={2.6} className={`sm-dot ${past ? 'past' : ''}`}><title>{shortName(p)}（第 {p.secs.map((s) => s + 1).join('、')} 節）</title></circle>;
            })}
            {order.map(({ p, i }) => i === sec || mainIds.includes(p) ? null : (
              <g key={`o${i}`} className="sm-num" transform={`translate(${sx(places[p].lng)} ${sy(places[p].lat)})`} onClick={() => onSection?.(i)}>
                <circle r={7.5} /><text y={3.6}>{i + 1}</text><title>第 {i + 1} 節：{doc.sections[i].title}（點一下跳過去）</title>
              </g>
            ))}
            {mainIds.map((i) => {
              const p = places[i]; if (!p) return null;
              const on = hotSet.has(i) || focus === i;
              return (
                <g key={`m${i}`} transform={`translate(${sx(p.lng)} ${sy(p.lat)})`} className={`sm-pin ${on ? 'hot' : ''} ${p.ap ? 'ap' : ''} ${p.secs.includes(sec) ? '' : 'other'}`} onClick={() => onFocus(focus === i ? null : i)}>
                  {on && <circle r={13} className="sm-pulse" />}
                  <circle r={on ? 7 : 5.5} /><title>{shortName(p)}{p.m ? `（今：${p.m}）` : ''}{p.ap ? '・位置為示意' : ''}</title>
                </g>
              );
            })}
            {pinLabels}
          </svg>
        )}
        {!data && !failed && <p className="sm-msg">地圖載入中…</p>}
        {failed && <p className="sm-msg">地圖載入失敗。<button className="link" onClick={() => { setFailed(false); loadMap(doc.id).then(setData).catch(() => setFailed(true)); }}>重試</button></p>}
        <button className="sm-zoom" onClick={() => setAll((v) => !v)} aria-pressed={all} title={all ? '回到這一節的地點' : '看整篇故事走過的地方'}>{all ? '看這一節' : '看全篇'}</button>
      </div>
      <div className="sm-cap" aria-live="polite">
        {fp ? (
          <div className="sm-focus">
            <b>📍 {shortName(fp)}</b>{fp.m && <span className="sm-today">今天：{fp.m}</span>}{fp.ap && <span className="sm-ap">位置為示意</span>}
            <ul>{fp.roles.slice(0, 3).map((r, j) => { const c = byId.get(r.card); return <li key={j}>{r.role}{c && <small>（{c.name}，{fmtRange(c.time.start, c.time.end)}）</small>}</li>; })}</ul>
            <button className="link" onClick={() => onFocus(null)}>回到這一節</button>
          </div>
        ) : secPlaces.length ? (
          <div className="sm-list"><span>第 {sec + 1} 節的地點</span>{secPlaces.map((i) => <button key={i} className={hotSet.has(i) ? 'hot' : ''} onClick={() => onFocus(i)} title={places[i].m ? `今天：${places[i].m}` : undefined}>{shortName(places[i])}</button>)}</div>
        ) : <p className="sm-list"><span>這一節是開場，看看整篇故事會走到哪些地方。數字是第幾節。</span></p>}
        <p className="sm-legend"><i className="lg-pin" />這一節 <i className="lg-num">2</i>其他節 <i className="lg-order" />故事順序（不是行進路線）{!!data?.routes.length && <><i className="lg-route" />路線</>}<i className="lg-today">灰字</i>今天的國名</p>
      </div>
    </div>
  );
});

export default StoryMap;
