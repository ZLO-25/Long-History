// Leaflet 地圖：歷代疆域（示意）＋道路／航線＋卡片地點；隨年代同步更新
import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import type { Index, Card, Chain } from '../types';
import { posAt } from '../lib/chain';
import { addBasemap } from '../lib/basemap';
import { labelLayer } from '../lib/labelLayer';
import { biHtml, biParts, cardEn, setNameTable } from '../lib/bilingual';
import { activeAt, fmtYear, KIND_LABEL, METHOD_LABEL, SEG_LABEL, ERA_LABEL, eraOf, roadInEra, TYPE_COLOR } from '../lib/format';

interface Props {
  index: Index; cards: Card[]; year: number;
  highlight: { keys: string[]; routes: string[] };
  onPlace: (key: string) => void; onRoute: (id: string) => void; compact?: boolean;
  chain?: { chain: Chain; t: number } | null;
  todayOn?: boolean; setTodayOn?: (v: boolean) => void; onToday?: (id: string) => void; todaySel?: string | null;
  // 第 6 期學習模式：其他史的卡淡化成背景小點；多一個「東亞」視野；圖例加上疆域示意的說明
  bgCards?: Card[]; learn?: boolean; home?: [[number, number], [number, number]] | null;
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
const hue = (s: string) => { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 360; return h; };
const borderCache = new Map<string, Promise<any>>();
const loadBorders = (file: string) => {
  if (!borderCache.has(file)) borderCache.set(file, fetch(`${import.meta.env.BASE_URL}data/borders/${file}`).then((r) => r.json()));
  return borderCache.get(file)!;
};

export function MapView({ index, cards, year, highlight, onPlace, onRoute, compact, chain, todayOn, setTodayOn, onToday, todaySel, bgCards, learn, home }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map>();
  const layers = useRef<{ borders: L.LayerGroup; routes: L.LayerGroup; itinere: L.LayerGroup; awmc: L.LayerGroup; places: L.LayerGroup; hl: L.LayerGroup; chain: L.LayerGroup; mover: L.LayerGroup; today: L.LayerGroup }>();
  const cb = useRef({ onPlace, onRoute, onToday });
  cb.current = { onPlace, onRoute, onToday };
  const [snapLabel, setSnapLabel] = useState('');
  // 地圖上的名稱一律「繁中＋英文」：先載入對照表
  useMemo(() => setNameTable(index.names), [index]);

  useEffect(() => {
    const m = L.map(el.current!, { zoomControl: true, worldCopyJump: true, preferCanvas: false }).setView(compact ? [38, 18] : [39, 20], compact ? 4 : 4);
    m.setMaxZoom(12);
    // 底圖不帶文字，地名由 labelLayer 畫成繁中＋英文（見 lib/basemap.ts、lib/labelLayer.ts）
    m.attributionControl.setPrefix(false).addAttribution('疆域 historical-basemaps｜古道 AWMC／Barrington Atlas｜古地名 Pleiades');
    addBasemap(m);
    labelLayer().addTo(m);
    m.createPane('borders').style.zIndex = '350';
    layers.current = {
      borders: L.layerGroup().addTo(m), awmc: L.layerGroup().addTo(m), itinere: L.layerGroup().addTo(m), routes: L.layerGroup().addTo(m),
      places: L.layerGroup().addTo(m), hl: L.layerGroup().addTo(m), chain: L.layerGroup().addTo(m), mover: L.layerGroup().addTo(m), today: L.layerGroup().addTo(m),
    };
    map.current = m;
    // 區塊被拖曳改大小時，馬上讓 Leaflet 重新量容器，地圖才不會留白或偏掉
    const ro = new ResizeObserver(() => m.invalidateSize({ animate: false }));
    ro.observe(el.current!);
    return () => { ro.disconnect(); m.remove(); };
  }, []);

  // 疆域：選「不晚於目前年代」的最近快照
  const snap = useMemo(() => {
    const s = [...index.borders.snapshots].sort((a, b) => a.year - b.year);
    return s.filter((x) => x.year <= year).pop() ?? s[0];
  }, [index, year]);
  useEffect(() => {
    let cancelled = false;
    // 今日對照層打開時，不畫古代疆域，避免把古代邊界誤認為今天的國界
    if (todayOn) { layers.current?.borders.clearLayers(); setSnapLabel('今日對照層：已隱藏古代疆域'); return; }
    loadBorders(snap.file).then((gj) => {
      if (cancelled || !layers.current) return;
      const g = layers.current.borders;
      g.clearLayers();
      L.geoJSON(gj, {
        pane: 'borders',
        style: (f) => {
          const h = hue(f?.properties?.name ?? '');
          return { color: `hsl(${h},45%,40%)`, weight: 1, fillColor: `hsl(${h},60%,55%)`, fillOpacity: 0.16, dashArray: '3 3' };
        },
        onEachFeature: (f, layer) => layer.bindTooltip(`${f.properties.zh ?? ''} <span class="en">${f.properties.name}</span>（疆界示意）`, { sticky: true }),
      }).addTo(g);
      setSnapLabel(`疆域示意：${fmtYear(snap.year)} 年快照`);
    });
    return () => { cancelled = true; };
  }, [snap, todayOn]);

  // Itiner-e 精細道路（若已用 npm run roads 下載）
  useEffect(() => {
    if (!index.itinere || !layers.current) return;
    fetch(`${import.meta.env.BASE_URL}data/itinere.geojson`).then((r) => r.json()).then((gj) => {
      L.geoJSON(gj, { style: { color: '#8b5a2b', weight: 1, opacity: 0.55 }, interactive: false }).addTo(layers.current!.itinere);
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
      const color = r.method === 'stations' ? '#555' : r.kind === 'sea' ? '#2b6cb0' : r.kind === 'wall' ? '#6b2737' : '#8b4513';
      const base = hl ? 6 : r.kind === 'sea' ? 2.5 : r.kind === 'wall' ? 4.5 : 3.5;
      const tip = `${biHtml(r.name)}（${KIND_LABEL[r.kind]}・${METHOD_LABEL[r.method]}）`;
      for (const sg of r.segments) {
        const line = L.polyline(sg.coords, {
          color, opacity: on ? 0.9 : 0.45,
          weight: sg.kind === 'gap' ? Math.max(2, base - 1.5) : base,
          dashArray: sg.kind === 'unknown' ? '1 7' : r.kind === 'sea' ? '6 6' : sg.kind === 'approx' ? '8 4' : sg.kind === 'gap' ? '2 5' : undefined,
        });
        line.bindTooltip(`${tip}${r.kind === 'road' || sg.kind === 'unknown' ? `：${SEG_LABEL[sg.kind]}` : ''}`, { sticky: true });
        line.on('click', () => cb.current.onRoute(r.id));
        line.addTo(g);
      }
      if (hl || r.method === 'stations') for (const st of r.stations) L.circleMarker([st.lat, st.lng], { radius: 3, color, weight: 1, fillOpacity: 1 }).bindTooltip(biHtml(st.name)).addTo(g);
    }
  }, [index, year, highlight]);

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
    if (pts.length === 1) m.flyTo(pts[0], Math.max(m.getZoom(), 6), { duration: 0.6 });
    else if (pts.length > 1) m.flyToBounds(L.latLngBounds(pts).pad(0.3), { duration: 0.6, maxZoom: 7 });
  }, [highlight, places, index]);

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
  }, [todayOn, index, todaySel]);
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
        {setTodayOn && <button className={`today-toggle ${todayOn ? 'on' : ''}`} onClick={() => { const v = !todayOn; setTodayOn(v); if (v) map.current?.flyToBounds(TODAY_VIEW, { duration: 0.6 }); }} title="疊上今天的咽喉要道（每筆都標資料截至）">◆ 今日對照層</button>}
      </div>
      <div className="map-legend">
        <div>{snapLabel}</div>
        <div className="map-names-note">地名：中文＋英文（灰字＝今天的國家、城市）</div>
        {learn && <div className="learn-map-note">疆域都是示意：古代國界不像今天是一條清楚的線，很多地方是勢力越往外越淡，或好幾方都說是自己的。</div>}
        <div><i className="lg road" />主要大道 <i className="lg sea" />航線 <i className="lg wall" />長城 <i className="lg unknown" />路線不詳（只知道經過哪些站）</div>
        {era !== 'M' && <div><i className="lg awmc" />巴林頓地圖集古道（{ERA_LABEL[era]}）・虛線＝大致路線</div>}
        {todayOn && <div><i className="lg today" />今日咽喉要道（灰色＝資料可能過時）</div>}
        {ch && <div><i className="lg chain" />物資鏈（實線＝沿已畫路線，點線＝路線示意）</div>}
      </div>
    </div>
  );
}
