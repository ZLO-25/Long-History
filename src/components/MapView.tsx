// Leaflet 地圖：歷代疆域（示意）＋道路／航線＋卡片地點；隨年代同步更新
import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import type { Index, Card, Chain } from '../types';
import { posAt } from '../lib/chain';
import { addBasemap } from '../lib/basemap';
import { labelLayer } from '../lib/labelLayer';
import { biHtml, biParts, cardEn, setNameTable } from '../lib/bilingual';
import './peoples.css';
import { loadPeoples, loadPeopleGeo, loadPeopleLangs, PEOPLE_INTRO, type Peoples, type PLang, type PFamily } from '../lib/peoples';
import { activeAt, fmtYear, KIND_LABEL, METHOD_LABEL, SEG_LABEL, ERA_LABEL, eraOf, roadInEra, TYPE_COLOR } from '../lib/format';

interface Props {
  index: Index; cards: Card[]; year: number;
  /** marks：主題路徑的編號（依年代排的第幾張卡），畫在該地點上 */
  highlight: { keys: string[]; routes: string[]; marks?: { key: string; n: number; name: string; start?: number; hideFuture?: boolean }[] };
  onPlace: (key: string) => void; onRoute: (id: string) => void; compact?: boolean;
  chain?: { chain: Chain; t: number } | null;
  todayOn?: boolean; setTodayOn?: (v: boolean) => void; onToday?: (id: string) => void; todaySel?: string | null;
  // 第 6 期學習模式：其他史的卡淡化成背景小點；多一個「東亞」視野；圖例加上疆域示意的說明
  bgCards?: Card[]; learn?: boolean; home?: [[number, number], [number, number]] | null;
  // 深入專題：主視覺（勢力圖／領土圖，public/data/dives/<file>）；人物卡的人生軌跡（依年份連線）
  power?: { file: string; title: string; legend?: string } | null; onCard?: (id: string) => void;
  trail?: { lat: number; lng: number; year: number; name: string }[] | null;
  // 人群圖層（今天）：國家依多數人母語的語系上色＋Glottolog 語言點；sel＝目前打開的國家（Natural Earth 國名）
  peoples?: { on: boolean; setOn: (v: boolean) => void; sel: string | null; onPick: (id: string) => void } | null;
}

// 地圖視野：地中海／中國／歐亞
const VIEWS: { label: string; bounds: [[number, number], [number, number]] }[] = [
  { label: '地中海', bounds: [[29, -10], [48, 42]] },
  { label: '中國', bounds: [[20, 95], [45, 125]] },
  { label: '歐亞', bounds: [[18, -10], [52, 125]] },
  { label: '全球', bounds: [[-40, -120], [65, 150]] },
];
// 今日對照層的視野：大致涵蓋巴拿馬到東亞
const TODAY_VIEW: [[number, number], [number, number]] = [[-5, -85], [55, 125]];
const TAIWAN_VIEW: [[number, number], [number, number]] = [[21.8, 119.4], [25.4, 122.1]];
const hue = (s: string) => { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 360; return h; };
const borderCache = new Map<string, Promise<any>>();
const loadBorders = (file: string) => {
  if (!borderCache.has(file)) borderCache.set(file, fetch(`${import.meta.env.BASE_URL}data/borders/${file}`).then((r) => r.json()));
  return borderCache.get(file)!;
};

export function MapView({ index, cards, year, highlight, onPlace, onRoute, compact, chain, todayOn, setTodayOn, onToday, todaySel, bgCards, learn, home, power, onCard, trail, peoples }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map>();
  const topicZoom = useRef<() => void>(() => {});
  const yearRef = useRef(year); yearRef.current = year;
  const layers = useRef<{ borders: L.LayerGroup; routes: L.LayerGroup; itinere: L.LayerGroup; awmc: L.LayerGroup; places: L.LayerGroup; hl: L.LayerGroup; topic: L.LayerGroup; chain: L.LayerGroup; mover: L.LayerGroup; today: L.LayerGroup; power: L.LayerGroup; trail: L.LayerGroup; peoples: L.LayerGroup; plangs: L.LayerGroup; ptribes: L.LayerGroup }>();
  const canvasR = useRef<{ borders: L.Canvas; roads: L.Canvas; peoples: L.Canvas; plangs: L.Canvas }>();
  const cb = useRef({ onPlace, onRoute, onToday, onCard, onPeople: peoples?.onPick });
  cb.current = { onPlace, onRoute, onToday, onCard, onPeople: peoples?.onPick };
  const peoplesOn = !!peoples?.on;
  // 疆域快照的狀態：標籤文字在畫面上才組（要用目前選的年份，不是快照自己的年份）
  const [snapInfo, setSnapInfo] = useState<{ today: boolean; year: number; covered: boolean; none?: boolean }>({ today: false, year: 0, covered: false });
  const snapLabel = peoplesOn ? '人群圖層：今天的國界（已隱藏古代疆域）' : snapInfo.today ? '今日對照層：已隱藏古代疆域'
    : snapInfo.none ? `${fmtYear(year)}：還沒有國家，不畫疆域`
    : `疆域示意：${fmtYear(year)} 年${snapInfo.year && snapInfo.year !== year ? `（用最接近的 ${fmtYear(snapInfo.year)} 年世界疆域快照）` : ''}${snapInfo.covered ? '（專題地圖範圍內以專題地圖為準）' : ''}`;
  const [powerBox, setPowerBox] = useState<L.LatLngBounds | null>(null);
  const [legendOpen, setLegendOpen] = useState(!compact && !power);
  // 打開專題勢力圖時圖例先收起來，免得蓋住主角區域（顏色說明在專題頁）
  const legendPower = power?.file ?? null;
  useEffect(() => { if (legendPower) setLegendOpen(false); }, [legendPower]);
  // 地圖上的名稱一律「繁中＋英文」：先載入對照表
  useMemo(() => setNameTable(index.names), [index]);

  useEffect(() => {
    const m = L.map(el.current!, { zoomControl: true, worldCopyJump: true, preferCanvas: false, zoomSnap: 0.5 }).setView(compact ? [38, 18] : [39, 20], compact ? 4 : 4);
    m.setMaxZoom(12);
    // 底圖不帶文字，地名由 labelLayer 畫成繁中＋英文（見 lib/basemap.ts、lib/labelLayer.ts）
    m.attributionControl.setPrefix(false).addAttribution('疆域 historical-basemaps｜古道 AWMC／Barrington Atlas｜古地名 Pleiades');
    addBasemap(m);
    labelLayer().addTo(m);
    m.createPane('borders').style.zIndex = '350';
    m.createPane('power').style.zIndex = '360';
    m.createPane('peoples').style.zIndex = '355';
    const noteZoom = () => { m.getContainer().dataset.zoom = m.getZoom().toFixed(2); }; m.on('zoomend moveend', noteZoom); noteZoom(); // 給自動測試讀目前縮放
    // 效能：疆域（一個年代上千個多邊形）和古道網改畫在 canvas，不再產生數千個 SVG 節點
    canvasR.current = { borders: L.canvas({ pane: 'borders', padding: 0.3 }), roads: L.canvas({ padding: 0.3 }), peoples: L.canvas({ pane: 'peoples', padding: 0.3 }), plangs: L.canvas({ padding: 0.3 }) };
    layers.current = {
      borders: L.layerGroup().addTo(m), awmc: L.layerGroup().addTo(m), itinere: L.layerGroup().addTo(m), routes: L.layerGroup().addTo(m),
      places: L.layerGroup().addTo(m), hl: L.layerGroup().addTo(m), topic: L.layerGroup().addTo(m), chain: L.layerGroup().addTo(m), mover: L.layerGroup().addTo(m), today: L.layerGroup().addTo(m),
      power: L.layerGroup().addTo(m), trail: L.layerGroup().addTo(m), peoples: L.layerGroup().addTo(m), plangs: L.layerGroup().addTo(m), ptribes: L.layerGroup().addTo(m),
    };
    map.current = m;
    // 區塊被拖曳改大小時，馬上讓 Leaflet 重新量容器，地圖才不會留白或偏掉
    const ro = new ResizeObserver(() => m.invalidateSize({ animate: false }));
    ro.observe(el.current!);
    return () => { ro.disconnect(); m.off('zoomend', topicZoom.current); m.remove(); };
  }, []);

  // 疆域：選「不晚於目前年代」的最近快照
  const snap = useMemo(() => {
    const s = [...index.borders.snapshots].sort((a, b) => a.year - b.year);
    // 比最早的快照還早 200 年以上（例如史前）就不畫疆域，免得把後來的國家畫到幾萬年前
    return s.filter((x) => x.year <= year).pop() ?? (s[0] && year >= s[0].year - 200 ? s[0] : null);
  }, [index.borders, year]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    let cancelled = false;
    // 今日對照層打開時，不畫古代疆域，避免把古代邊界誤認為今天的國界
    if (todayOn || peoplesOn) { layers.current?.borders.clearLayers(); setSnapInfo((s) => ({ ...s, today: !!todayOn })); return; }
    const box = powerBox?.pad(0.2) ?? null;
    let covered = 0;
    if (!snap) { layers.current?.borders.clearLayers(); setSnapInfo({ today: false, year: 0, covered: false, none: true }); return; }
    loadBorders(snap.file).then((gj) => {
      if (cancelled || !layers.current) return;
      const g = layers.current.borders;
      g.clearLayers();
      L.geoJSON(gj, {
        pane: 'borders',
        ...({ renderer: canvasR.current?.borders } as L.GeoJSONOptions),
        style: (f) => {
          const h = hue(f?.properties?.name ?? '');
          // 專題地圖打開時，完全落在專題地圖範圍內的疆域多邊形只留淡邊線，不再疊一層填色（以專題地圖為準）
          if (box && f && box.contains(L.geoJSON(f as any).getBounds())) { covered++; return { color: `hsl(${h},45%,40%)`, weight: 0.5, opacity: 0.3, fillOpacity: 0, dashArray: '3 3' }; }
          return { color: `hsl(${h},45%,40%)`, weight: 1, fillColor: `hsl(${h},60%,55%)`, fillOpacity: 0.16, dashArray: '3 3' };
        },
        onEachFeature: (f, layer) => layer.bindTooltip(`${f.properties.zh ?? ''} <span class="en">${f.properties.name}</span>（疆界示意）`, { sticky: true }),
      }).addTo(g);
      setSnapInfo({ today: false, year: snap.year, covered: covered > 0 });
    });
    return () => { cancelled = true; };
  }, [snap, todayOn, peoplesOn, powerBox, snap ? 0 : year]); // eslint-disable-line react-hooks/exhaustive-deps

  // Itiner-e 精細道路（若已用 npm run roads 下載）
  useEffect(() => {
    if (!index.itinere || !layers.current) return;
    fetch(`${import.meta.env.BASE_URL}data/itinere.geojson`).then((r) => r.json()).then((gj) => {
      L.geoJSON(gj, { renderer: canvasR.current?.roads, style: { color: '#8b5a2b', weight: 1, opacity: 0.55 }, interactive: false } as L.GeoJSONOptions).addTo(layers.current!.itinere);
    });
  }, [index.itinere]);
  useEffect(() => {
    const m = map.current, g = layers.current?.itinere;
    if (!m || !g) return;
    const show = year >= -312 && year <= 500;
    if (show && !m.hasLayer(g)) g.addTo(m); else if (!show && m.hasLayer(g)) m.removeLayer(g);
  }, [year]);

  // AWMC 古代道路網（巴林頓地圖集）：依地圖集標註的時代顯示
  const [awmc, setAwmc] = useState<any>(null);
  useEffect(() => { fetch(`${import.meta.env.BASE_URL}data/awmc-roads.geojson`).then((r) => r.json()).then(setAwmc).catch(() => {}); }, []);
  const era = eraOf(year);
  useEffect(() => {
    const g = layers.current?.awmc;
    if (!g || !awmc) return;
    g.clearLayers();
    L.geoJSON(awmc, {
      ...({ renderer: canvasR.current?.roads } as L.GeoJSONOptions),
      filter: (f) => roadInEra(f.properties.t, era),
      style: (f) => ({ color: '#8b5a2b', weight: f?.properties.m ? 1.6 : 0.9, opacity: f?.properties.t ? 0.6 : 0.4, dashArray: f?.properties.k ? undefined : '4 3' }),
      onEachFeature: (f, layer) => layer.bindTooltip(`${biHtml(f.properties.n || '古道')}（巴林頓地圖集；${f.properties.k ? '路線確定' : '大致路線'}；${f.properties.t ? `時代 ${f.properties.t}` : '未標時代'}）`, { sticky: true }),
    }).addTo(g);
  }, [awmc, era]);

  // 主要道路、航線與長城（沿古道網描線／依史料經停港計算）
  useEffect(() => {
    const g = layers.current?.routes;
    if (!g) return;
    g.clearLayers();
    for (const r of index.routes) {
      const on = r.start <= year && year <= r.end;
      const hl = highlight.routes.includes(r.id);
      if (!on && !hl) continue;
      const color = r.kind === 'migration' ? '#a21caf' : r.method === 'stations' ? '#555' : r.kind === 'sea' ? '#2b6cb0' : r.kind === 'wall' ? '#6b2737' : '#8b4513';
      const base = hl ? 6 : r.kind === 'sea' ? 2.5 : r.kind === 'wall' ? 4.5 : 3.5;
      const tip = `${biHtml(r.name)}（${KIND_LABEL[r.kind]}・${METHOD_LABEL[r.method]}）`;
      for (const sg of r.segments) {
        const line = L.polyline(sg.coords, {
          color, opacity: on ? 0.9 : 0.45,
          weight: sg.kind === 'gap' ? Math.max(2, base - 1.5) : base,
          dashArray: r.kind === 'migration' ? '3 7' : sg.kind === 'unknown' ? '1 7' : r.kind === 'sea' ? '6 6' : sg.kind === 'approx' ? '8 4' : sg.kind === 'gap' ? '2 5' : undefined,
        });
        line.bindTooltip(`${tip}${r.kind === 'road' || sg.kind === 'unknown' ? `：${SEG_LABEL[sg.kind]}` : ''}`, { sticky: true });
        line.on('click', () => cb.current.onRoute(r.id));
        line.addTo(g);
      }
      if (hl || r.method === 'stations') for (const st of r.stations) L.circleMarker([st.lat, st.lng], { radius: 3, color, weight: 1, fillOpacity: 1 }).bindTooltip(biHtml(st.name)).addTo(g);
    }
  }, [index.routes, year, highlight]); // eslint-disable-line react-hooks/exhaustive-deps

  // 地點：同一地點合併成一個點，點擊列出所有卡片
  const places = useMemo(() => {
    const m = new Map<string, { key: string; lat: number; lng: number; name: string; modern: string; cards: Card[]; precision: string }>();
    for (const c of cards) for (const l of c.place.locations) {
      const p = m.get(l.key) ?? { key: l.key, lat: l.lat, lng: l.lng, name: l.name_ancient, modern: l.name_modern, cards: [], precision: l.precision };
      if (!p.cards.includes(c)) p.cards.push(c);
      m.set(l.key, p);
    }
    return [...m.values()];
  }, [cards]);
  useEffect(() => {
    const g = layers.current?.places;
    if (!g) return;
    g.clearLayers();
    // 學習模式：不屬於目前這個史的卡，只畫灰色小點當背景
    const own = new Set(places.map((p) => p.key));
    for (const c of bgCards ?? []) for (const l of c.place.locations) {
      if (own.has(l.key)) continue;
      L.circleMarker([l.lat, l.lng], { radius: 3, color: '#999', weight: 1, fillColor: '#bbb', fillOpacity: 0.6, interactive: true })
        .bindTooltip(`${c.name} <span class="en">${cardEn(c)}</span>（其他史）`).addTo(g);
    }
    for (const p of places) {
      const act = p.cards.filter((c) => activeAt(c, year));
      const on = act.length > 0;
      const main = (act[0] ?? p.cards[0]).type;
      const mk = L.circleMarker([p.lat, p.lng], {
        radius: on ? 7 + Math.min(4, p.cards.length) : 4 + Math.min(3, p.cards.length),
        color: '#fff', weight: 1.5, fillColor: TYPE_COLOR[main], fillOpacity: on ? 0.95 : 0.35,
        dashArray: p.precision === 'schematic' ? '2 2' : undefined,
      });
      mk.bindTooltip(`${biHtml(p.name)}（今 ${biHtml(p.modern)}）・${p.cards.length} 張卡${p.precision === 'schematic' ? '・位置示意' : ''}`);
      mk.on('click', () => cb.current.onPlace(p.key));
      mk.addTo(g);
    }
    // 鍵盤：地圖上幾百個圓點不放進 Tab 順序（同一批卡在清單、專題頁都能用鍵盤開）
    g.eachLayer((l) => (l as L.Path).getElement?.()?.setAttribute('tabindex', '-1'));
  }, [places, year, bgCards]);

  // 學習模式：換一條史時，先框住這條史的範圍
  const homeKey = home ? home.flat().join() : '';
  useEffect(() => {
    if (!home) return;
    // 等版面排好（容器有大小）再框，否則 Leaflet 會算出整個世界
    const id = setTimeout(() => { const m = map.current; if (!m) return; m.invalidateSize(); m.fitBounds(home, { padding: [24, 24], maxZoom: 6 }); }, 120);
    return () => clearTimeout(id);
  }, [homeKey]);

  // 高亮並移動視角
  useEffect(() => {
    const g = layers.current?.hl, m = map.current;
    if (!g || !m) return;
    g.clearLayers();
    const pts: L.LatLngExpression[] = [];
    for (const k of highlight.keys) {
      const p = places.find((x) => x.key === k) ?? index.cards.flatMap((c) => c.place.locations).find((l) => l.key === k);
      if (!p) continue;
      pts.push([p.lat, p.lng]);
      L.circleMarker([p.lat, p.lng], { radius: 16, color: '#e53e3e', weight: 3, fill: false, className: 'pulse' }).addTo(g);
    }
    for (const id of highlight.routes) {
      const r = index.routes.find((x) => x.id === id);
      if (r) pts.push(...r.coords);
    }
    // 主題路徑：編號標在地圖上；靠得太近的點（例如布魯日、安特衛普、阿姆斯特丹）合併成「1・2・3」，縮放時重新合併
    const marks = (highlight.marks ?? []).map((mk) => {
      const p = places.find((x) => x.key === mk.key) ?? index.cards.flatMap((c) => c.place.locations).find((l) => l.key === mk.key);
      return p ? { ...mk, ll: L.latLng(p.lat, p.lng) } : null;
    }).filter((x): x is NonNullable<typeof x> => !!x);
    // 深入專題：還沒發生的卡（start 晚於目前年代）——讀書專題不畫、其他專題調淡；年代改變時重畫（見下面的 year effect）
    const future = (mk: (typeof marks)[number]) => mk.start != null && mk.start > yearRef.current;
    for (const mk of marks) if (!(mk.hideFuture && future(mk))) pts.push(mk.ll);
    const drawMarks = () => {
      const tg = layers.current?.topic; if (!tg) return;
      tg.clearLayers();
      const groups: { pt: L.Point; ll: L.LatLng; items: typeof marks; future: boolean }[] = [];
      for (const mk of marks) {
        const fu = future(mk);
        if (fu && mk.hideFuture) continue;
        const pt = m.latLngToLayerPoint(mk.ll);
        const g0 = groups.find((g) => g.future === fu && g.pt.distanceTo(pt) < 26);
        if (g0) g0.items.push(mk); else groups.push({ pt, ll: mk.ll, items: [mk], future: fu });
      }
      for (const g of groups) {
        const ns = [...new Set(g.items.map((x) => x.n))].sort((a, b) => a - b);
        const label = ns.length > 4 ? `${ns[0]}…${ns[ns.length - 1]}` : ns.join('・');
        const w = Math.max(22, label.length * 8 + 10);
        L.marker(g.ll, { icon: L.divIcon({ className: `topic-mark${g.future ? ' future' : ''}`, html: label, iconSize: [w, 22], iconAnchor: [w / 2, 11] }), keyboard: false, zIndexOffset: g.future ? 400 : 500 })
          .bindTooltip((g.future ? '（目前年代之後）<br>' : '') + g.items.map((x) => `${x.n}. ${x.name}`.replace(/[&<>]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch]!))).join('<br>'))
          .addTo(tg);
      }
    };
    drawMarks();
    m.off('zoomend', topicZoom.current); topicZoom.current = drawMarks; if (marks.length) m.on('zoomend', drawMarks); else layers.current?.topic.clearLayers();
    if (powerOn.current && marks.length > 1) return; // 專題開著勢力圖時，視野以勢力圖為準（卡片編號可能散到朝鮮、臺灣）
    if (pts.length === 1) m.flyTo(pts[0], Math.max(m.getZoom(), 6), { duration: 0.6 });
    else if (pts.length > 1) m.flyToBounds(L.latLngBounds(pts).pad(0.3), { duration: 0.6, maxZoom: 7 });
  }, [highlight, places, index.cards, index.routes]); // eslint-disable-line react-hooks/exhaustive-deps
  // 年代改變時只重畫編號（不移動視角）
  const hasFutureMarks = (highlight.marks ?? []).some((x) => x.start != null);
  useEffect(() => { if (hasFutureMarks) topicZoom.current?.(); }, [year, hasFutureMarks]);

  // 物資鏈：沿路線的段落畫實線（橘），沒有路線或只知站點的段落畫點線；節點編號
  const ch = chain?.chain;
  useEffect(() => {
    const g = layers.current?.chain, m = map.current;
    if (!g || !m) return;
    g.clearLayers();
    if (!ch) return;
    const pts: [number, number][] = [];
    ch.legs.forEach((leg) => leg.parts.forEach((p) => {
      pts.push(...p.coords);
      L.polyline(p.coords, { color: '#dd6b20', weight: p.kind === 'route' ? 5 : 3, opacity: 0.9, dashArray: p.kind === 'route' ? undefined : '2 8', className: `chain-${p.kind}` })
        .bindTooltip(p.kind === 'route' ? `${biHtml(ch.name)}：沿已畫路線` : `${biHtml(ch.name)}：路線示意（實際走法不詳）`, { sticky: true }).addTo(g);
    }));
    ch.steps.forEach((s, i) => {
      L.marker([s.lat, s.lng], { icon: L.divIcon({ className: 'chain-step', html: `<span>${i + 1}</span>`, iconSize: [22, 22] }) })
        .bindTooltip(`${i + 1}. ${biHtml(s.name)}（${s.role}）`).addTo(g);
    });
    m.flyToBounds(L.latLngBounds(pts).pad(0.2), { duration: 0.6, maxZoom: 8 });
  }, [ch]);
  // 移動中的紅點：同一個標記只更新位置，不每格重畫
  const mover = useRef<L.CircleMarker>();
  useEffect(() => {
    const g = layers.current?.mover;
    if (!g) return;
    if (!chain) { g.clearLayers(); mover.current = undefined; return; }
    const at = posAt(chain.chain, chain.t);
    // 開發模式下地圖會被重建一次，舊標記不在新圖層裡就重新建立
    if (!mover.current || !g.hasLayer(mover.current)) mover.current = L.circleMarker(at, { radius: 8, color: '#fff', weight: 2, fillColor: '#c53030', fillOpacity: 1, className: 'chain-mover' }).addTo(g);
    else mover.current.setLatLng(at);
  }, [chain]);

  // 深入專題：主視覺（勢力圖／領土圖）。每個區塊一個顏色，名稱標在最大一塊的中央；縮小時只標主要區塊，放大才全部標；點名稱打開對應的卡
  const powerFile = power?.file ?? null;
  const powerOn = useRef(false); powerOn.current = !!powerFile;
  const legendRef = useRef(''); legendRef.current = power?.legend ?? '';
  const powerZoom = useRef<() => void>(() => {});
  useEffect(() => {
    const g = layers.current?.power, m = map.current;
    if (!g || !m) return;
    g.clearLayers();
    m.off('zoomend', powerZoom.current);
    if (!powerFile) { setPowerBox(null); return; }
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}data/dives/${powerFile}`).then((r) => r.json()).then((gj) => {
      if (cancelled) return;
      g.clearLayers();
      const all: L.LatLng[] = [];
      const labels: { ll: L.LatLng; major: boolean; size: number; mk: L.Marker }[] = [];
      L.geoJSON(gj, {
        pane: 'power',
        style: (f) => ({ color: f?.properties.color ?? '#888', weight: 1.2, opacity: 0.9, fillColor: f?.properties.color ?? '#888', fillOpacity: 0.38 }),
        onEachFeature: (f, layer) => {
          layer.bindTooltip(`${f.properties.name} <span class="en">${f.properties.en ?? ''}</span><br><small>${legendRef.current ? legendRef.current + '：' : ''}${f.properties.provinces ?? ''}</small><br><small>示意範圍，不是確切界線</small>`, { sticky: true });
          if (f.properties.card) layer.on('click', () => cb.current.onCard?.(f.properties.card));
          // 名稱放在面積最大的那一塊多邊形的框中央
          const geom = f.geometry as any;
          const polys: number[][][] = (geom.type === 'MultiPolygon' ? geom.coordinates : [geom.coordinates]).map((p: number[][][]) => p[0]);
          const boundsOf = (ring: number[][]) => L.latLngBounds(ring.map(([x, y]) => [y, x] as [number, number]));
          const size = (ring: number[][]) => { const b = boundsOf(ring); return b.getSouthWest().distanceTo(b.getNorthEast()); };
          const big = polys.reduce((a, b) => (size(b) > size(a) ? b : a), polys[0]);
          if (!big) return;
          const bb = boundsOf(big);
          all.push(bb.getSouthWest(), bb.getNorthEast());
          const short = String(f.properties.name).replace(/（.*）/, '');
          const major = !f.properties.minor && size(big) > 120000;
          const mk = L.marker(bb.getCenter(), { icon: L.divIcon({ className: `power-label ${major ? 'major' : 'minor'}`, html: `${short}${m.getSize().x < 500 ? '' : `<small>${f.properties.en ? String(f.properties.en).replace(/\s*\(.*\)$/, '') : ''}</small>`}`, iconSize: undefined as any }), keyboard: false, interactive: !!f.properties.card, zIndexOffset: 300 })
            .on('click', () => { if (f.properties.card) cb.current.onCard?.(f.properties.card); });
          labels.push({ ll: bb.getCenter(), major, size: size(big), mk });
        },
      }).addTo(g);
      // 縮得越小標得越少：zoom<6 只標最大的 6 個主要勢力，6 標全部主要勢力，7 以上全標
      labels.sort((a, b) => b.size - a.size);
      // 標籤依面積由大到小放，和已放好的標籤相交（留 4px）就拿掉，避免互相壓住
      const draw = () => {
        const z = m.getZoom(); const placed: DOMRect[] = [];
        labels.forEach((l, i) => {
          const show = z >= 7 || (l.major && (z >= 6 || i < 6));
          if (!show) { if (g.hasLayer(l.mk)) g.removeLayer(l.mk); return; }
          if (!g.hasLayer(l.mk)) l.mk.addTo(g);
          const el = l.mk.getElement(); if (!el) return;
          const r = el.getBoundingClientRect();
          const hit = placed.some((q) => r.left < q.right + 4 && r.right > q.left - 4 && r.top < q.bottom + 4 && r.bottom > q.top - 4);
          if (hit) g.removeLayer(l.mk); else placed.push(r);
        });
      };
      draw();
      powerZoom.current = draw; m.on('zoomend', draw);
      if (all.length) { const bb = gj.view ? L.latLngBounds(gj.view) : L.latLngBounds(all); setPowerBox(bb); m.flyToBounds(bb, { duration: 0.6, maxZoom: 7, paddingBottomRight: [0, compact ? 40 : 90] }); }
    }).catch(() => {});
    return () => { cancelled = true; m.off('zoomend', powerZoom.current); };
  }, [powerFile]);

  // 人物卡：人生軌跡。依年份把地點連成虛線，每個點標年份
  useEffect(() => {
    const g = layers.current?.trail;
    if (!g) return;
    g.clearLayers();
    if (!trail || trail.length < 2) return;
    const pts = [...trail].sort((a, b) => a.year - b.year);
    L.polyline(pts.map((p) => [p.lat, p.lng] as [number, number]), { color: '#8a5a00', weight: 3, opacity: 0.85, dashArray: '6 5', className: 'trail-line' })
      .bindTooltip('人生軌跡（依年份連線，只是先後順序，不是實際走的路）', { sticky: true }).addTo(g);
    // 年份標籤：畫面上距離小於 34px 的點合併成一個標籤（1・1534／3・1567），縮放時重算
    const m = map.current;
    const drawYears = () => {
      g.eachLayer((l) => { if ((l as any).options?.className !== 'trail-line' && !(l instanceof L.Polyline)) g.removeLayer(l); });
      const groups: { x: number; y: number; lat: number; lng: number; items: string[] }[] = [];
      pts.forEach((p, i) => {
        const pt = m ? m.latLngToContainerPoint([p.lat, p.lng]) : { x: 0, y: 0 };
        const gr = m ? groups.find((q) => Math.hypot(q.x - pt.x, q.y - pt.y) < 34) : undefined;
        const lab = `${i + 1}・${fmtYear(p.year)}`;
        if (gr) gr.items.push(lab); else groups.push({ x: pt.x, y: pt.y, lat: p.lat, lng: p.lng, items: [lab] });
      });
      groups.forEach((q) => L.marker([q.lat, q.lng], { icon: L.divIcon({ className: 'trail-year', html: q.items.join('<br>'), iconSize: undefined as any, iconAnchor: [0, 22 + (q.items.length - 1) * 16] }), keyboard: false, interactive: false, zIndexOffset: 400 }).addTo(g));
    };
    drawYears();
    m?.on('zoomend', drawYears);
    return () => { m?.off('zoomend', drawYears); };
  }, [trail]);

  // 人群圖層（今天）：國家依語系上色、語言點、臺灣各族名稱（放大到臺灣才顯示）
  const [pd, setPd] = useState<Peoples | null>(null);
  const [langsOn, setLangsOn] = useState(true);
  const pgeo = useRef<L.GeoJSON | null>(null);
  useEffect(() => {
    const g = layers.current?.peoples, gl = layers.current?.plangs, gt = layers.current?.ptribes, m = map.current;
    if (!g || !gl || !gt || !m) return;
    g.clearLayers(); gl.clearLayers(); gt.clearLayers(); pgeo.current = null;
    if (!peoplesOn) return;
    let cancelled = false;
    Promise.all([loadPeoples(), loadPeopleGeo(), loadPeopleLangs()]).then(([d, geo, langs]: [Peoples, any, PLang[]]) => {
      if (cancelled) return;
      setPd(d);
      const fam = new Map<string, PFamily>(d.families.map((f) => [f.id, f]));
      pgeo.current = L.geoJSON(geo, {
        pane: 'peoples', ...({ renderer: canvasR.current?.peoples } as L.GeoJSONOptions),
        style: (f) => { const fm = fam.get(f?.properties.f); return { color: fm?.hatch ? '#777' : '#fff', weight: fm?.hatch ? 1.2 : 0.8, dashArray: fm?.hatch ? '4 3' : undefined, fillColor: fm?.color ?? '#999', fillOpacity: fm?.hatch ? 0.3 : 0.42 }; },
        onEachFeature: (f, layer) => {
          const c = d.countries[f.properties.n]; const fm = fam.get(f.properties.f);
          layer.bindTooltip(`${c?.zh ?? ''} <span class="en">${f.properties.n}</span>：${fm?.zh ?? ''}<br><small>點一下看族群與語言</small>`, { sticky: true });
          layer.on('click', () => cb.current.onPeople?.(f.properties.n));
        },
      }).addTo(g);
      for (const [name, lat, lng, fid] of langs) {
        const fm = fam.get(fid);
        L.circleMarker([lat, lng], { renderer: canvasR.current?.plangs, radius: 2.4, weight: 0.6, color: '#fff', fillColor: fm?.color ?? '#888', fillOpacity: 0.95 })
          .bindTooltip(`${name}・${fm?.zh ?? ''}<br><small>語言的代表位置（Glottolog），不是人數</small>`).addTo(gl);
      }
      for (const t of [...d.taiwan.tribes, ...d.taiwan.plains]) {
        if (t.lat == null || t.lng == null) continue;
        const plain = d.taiwan.plains.includes(t);
        L.marker([t.lat, t.lng], { icon: L.divIcon({ className: `tribe-label ${plain ? 'plain' : ''}`, html: `${t.zh}<small>${t.en}</small>`, iconSize: undefined as any }), keyboard: false, zIndexOffset: 600 })
          .bindTooltip(`${t.zh} ${t.en}${plain ? '（平埔族群，尚未認定）' : ''}<br><small>${t.schematic ? '示意位置' : '族語的代表位置（Glottolog）'}，不是族人住的範圍</small>`)
          .on('click', () => cb.current.onPeople?.('Taiwan')).addTo(gt);
      }
      // 放大到臺灣（6 級以上）才顯示族名；標籤互相壓到時，依清單順序（官方承認的在前）保留前面的
      const marks: L.Marker[] = []; gt.eachLayer((l) => marks.push(l as L.Marker));
      const z = () => {
        const show = m.getZoom() >= 6;
        if (show && !m.hasLayer(gt)) gt.addTo(m); else if (!show && m.hasLayer(gt)) m.removeLayer(gt);
        if (!show) return;
        const placed: DOMRect[] = [];
        for (const mk of marks) {
          const el = mk.getElement(); if (!el) continue;
          el.style.visibility = 'visible'; el.classList.toggle('compact', m.getZoom() < 8);
          const r = el.getBoundingClientRect();
          if (placed.some((q) => r.left < q.right + 2 && r.right > q.left - 2 && r.top < q.bottom + 2 && r.bottom > q.top - 2)) el.style.visibility = 'hidden'; else placed.push(r);
        }
      };
      z(); m.on('zoomend', z);
      cleanup = () => m.off('zoomend', z);
    }).catch(() => {});
    let cleanup = () => {};
    return () => { cancelled = true; cleanup(); };
  }, [peoplesOn]);
  useEffect(() => {
    const m = map.current, gl = layers.current?.plangs;
    if (!m || !gl) return;
    if (peoplesOn && langsOn && !m.hasLayer(gl)) gl.addTo(m); else if ((!peoplesOn || !langsOn) && m.hasLayer(gl)) m.removeLayer(gl);
  }, [peoplesOn, langsOn]);
  // 人群圖層打開時，先收起案例地點、路線、古道（圓點太像語言點，容易看混）
  useEffect(() => {
    const m = map.current, ls = layers.current;
    if (!m || !ls) return;
    for (const g of [ls.places, ls.routes, ls.awmc, ls.hl, ls.topic]) { if (peoplesOn && m.hasLayer(g)) m.removeLayer(g); else if (!peoplesOn && !m.hasLayer(g)) g.addTo(m); }
  }, [peoplesOn]);
  // 打開的國家加粗外框，並把視野移過去（臺灣直接放大到能看到各族名稱）
  const peopleSel = peoples?.sel ?? null;
  useEffect(() => {
    const m = map.current, geo = pgeo.current;
    if (!m || !peoplesOn) return;
    geo?.eachLayer((l: any) => l.setStyle?.(l.feature?.properties.n === peopleSel && peopleSel !== 'Taiwan' ? { color: '#111', weight: 2.5 } : { color: '#fff', weight: 0.8 }));
    if (peopleSel === 'Taiwan') m.flyToBounds(TAIWAN_VIEW, { duration: 0.6 });
    else if (peopleSel && geo) { let b: L.LatLngBounds | null = null; geo.eachLayer((l: any) => { if (l.feature?.properties.n === peopleSel) b = l.getBounds(); }); if (b) m.flyToBounds(b, { duration: 0.6, maxZoom: 5, padding: [20, 20] }); }
  }, [peopleSel, peoplesOn, pd]);

  // 今日對照層：菱形標記＋「資料截至」；與歷史年代無關，打開就一直顯示
  useEffect(() => {
    const g = layers.current?.today, m = map.current;
    if (!g || !m) return;
    g.clearLayers();
    if (!todayOn) return;
    for (const p of index.today.chokepoints) {
      const sel = p.id === todaySel;
      L.marker([p.lat, p.lng], { icon: L.divIcon({ className: `today-mk ${p.stale ? 'stale' : ''} ${sel ? 'sel' : ''}`, html: `<i></i><span>${p.name.replace(/（.*）/, '')} <small class="en">${biParts(p.name).en.replace(/\s*\(.*\)$/, '')}</small><em>截至 ${p.data_as_of}</em></span>`, iconSize: [16, 16], iconAnchor: [8, 8] }), zIndexOffset: 1000 })
        .bindTooltip(`今日咽喉：${biHtml(p.name)}・資料截至 ${p.data_as_of}${p.stale ? '（可能過時）' : ''}`)
        .on('click', () => cb.current.onToday?.(p.id)).addTo(g);
    }
  }, [todayOn, index.today, todaySel]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const m = map.current, p = index.today.chokepoints.find((x) => x.id === todaySel);
    if (m && p) m.flyTo([p.lat, p.lng], Math.max(m.getZoom(), 5), { duration: 0.6 });
  }, [todaySel]);

  useEffect(() => { setTimeout(() => map.current?.invalidateSize(), 50); });

  return (
    <div className="map">
      <div ref={el} className="map-canvas" />
      <div className="map-views">
        {learn && <button onClick={() => map.current?.flyToBounds([[0, 95], [45, 145]], { duration: 0.6 })}>東亞</button>}
        {VIEWS.map((v) => <button key={v.label} onClick={() => map.current?.flyToBounds(v.bounds, { duration: 0.6 })}>{v.label}</button>)}
        {peoples && <button className={`peoples-toggle ${peoplesOn ? 'on' : ''}`} aria-pressed={peoplesOn} onClick={() => { const v = !peoplesOn; peoples.setOn(v); if (v) { peoples.onPick(PEOPLE_INTRO); map.current?.flyToBounds([[-40, -120], [65, 150]], { duration: 0.6 }); } }} title="今天各地主要是哪些人：國家依多數人母語的語系上色，點國家看族群與語言（每筆都標資料年份）">◎ 人群</button>}
        {setTodayOn && <button className={`today-toggle ${todayOn ? 'on' : ''}`} onClick={() => { const v = !todayOn; setTodayOn(v); if (v) map.current?.flyToBounds(TODAY_VIEW, { duration: 0.6 }); }} title="疊上今天的咽喉要道（每筆都標資料截至）">◆ 今日對照層</button>}
      </div>
      <div className={`map-legend ${legendOpen ? '' : 'closed'}`}>
        <button className="ml-toggle" aria-expanded={legendOpen} onClick={() => setLegendOpen((v) => !v)}>圖例 {legendOpen ? '▾' : '▸'}</button>
        {legendOpen && <>
        <div>{snapLabel}</div>
        <div className="map-names-note">地名：中文＋英文（灰字＝今天的國家、城市）</div>
        {learn && !peoplesOn && <div className="learn-map-note">疆域都是示意：古代國界不像今天是一條清楚的線，很多地方是勢力越往外越淡，或好幾方都說是自己的。</div>}
        {!peoplesOn && <><div><i className="lg road" />主要大道 <i className="lg sea" />航線 <i className="lg wall" />長城 <i className="lg unknown" />路線不詳（只知道經過哪些站）</div>
        {era !== 'M' && <div><i className="lg awmc" />巴林頓地圖集古道（{ERA_LABEL[era]}）・虛線＝大致路線</div>}
        {(highlight.routes.some((id) => index.routes.find((r) => r.id === id)?.kind === 'migration') || year < -3000) && <div><i className="lg migr" />史前遷徙（示意）：只連有遺址根據的點，線不是實際走法</div>}</>}
        {peoplesOn && pd && <div className="lg-peoples">
          <div><b>人群（今天）</b>：顏色＝多數人母語的語系（主要，不是全部）<label className="lg-langs"><input type="checkbox" checked={langsOn} onChange={(e) => setLangsOn(e.target.checked)} /> 語言點</label></div>
          <div className="lg-fams">{pd.families.slice(0, 13).map((f) => <span key={f.id} className={f.hatch ? 'hatch' : ''} style={{ ['--fc' as any]: f.color }}><i />{f.zh}</span>)}<span className="muted">…完整圖例見「◎ 人群圖層說明」</span></div>
        </div>}
        {todayOn && <div><i className="lg today" />今日咽喉要道（灰色＝資料可能過時）</div>}
        {power && <div><i className="lg power" />專題示意（顏色見專題頁圖例）：{power.title}（示意範圍，不是確切界線）</div>}
        {trail && trail.length > 1 && <div><i className="lg trail" />人生軌跡：依年份連線（先後順序，不是實際路線）</div>}
        {ch && <div><i className="lg chain" />物資鏈（實線＝沿已畫路線，點線＝路線示意）</div>}
        </>}
      </div>
    </div>
  );
}
