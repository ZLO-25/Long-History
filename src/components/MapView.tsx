// Leaflet 地圖：歷代疆域（示意）＋道路／航線＋卡片地點；隨年代同步更新
import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import type { Index, Card, Chain } from '../types';
import { posAt } from '../lib/chain';
import { activeAt, fmtYear, KIND_LABEL, METHOD_LABEL, SEG_LABEL, ERA_LABEL, eraOf, roadInEra, TYPE_COLOR } from '../lib/format';

interface Props {
  index: Index; cards: Card[]; year: number;
  highlight: { keys: string[]; routes: string[] };
  onPlace: (key: string) => void; onRoute: (id: string) => void; compact?: boolean;
  chain?: { chain: Chain; t: number } | null;
}

// 地圖視野：地中海／中國／歐亞
const VIEWS: { label: string; bounds: [[number, number], [number, number]] }[] = [
  { label: '地中海', bounds: [[29, -10], [48, 42]] },
  { label: '中國', bounds: [[20, 95], [45, 125]] },
  { label: '歐亞', bounds: [[18, -10], [52, 125]] },
];
const hue = (s: string) => { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 360; return h; };
const borderCache = new Map<string, Promise<any>>();
const loadBorders = (file: string) => {
  if (!borderCache.has(file)) borderCache.set(file, fetch(`/data/borders/${file}`).then((r) => r.json()));
  return borderCache.get(file)!;
};

export function MapView({ index, cards, year, highlight, onPlace, onRoute, compact, chain }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map>();
  const layers = useRef<{ borders: L.LayerGroup; routes: L.LayerGroup; itinere: L.LayerGroup; awmc: L.LayerGroup; places: L.LayerGroup; hl: L.LayerGroup; chain: L.LayerGroup; mover: L.LayerGroup }>();
  const cb = useRef({ onPlace, onRoute });
  cb.current = { onPlace, onRoute };
  const [snapLabel, setSnapLabel] = useState('');

  useEffect(() => {
    const m = L.map(el.current!, { zoomControl: true, worldCopyJump: true, preferCanvas: false }).setView(compact ? [38, 18] : [39, 20], compact ? 4 : 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 12,
      attribution: '© OpenStreetMap contributors｜疆域：historical-basemaps (GPL-3.0)｜古道：AWMC／Barrington Atlas (ODbL)｜地名：Pleiades (CC BY)',
    }).addTo(m);
    m.createPane('borders').style.zIndex = '350';
    layers.current = {
      borders: L.layerGroup().addTo(m), awmc: L.layerGroup().addTo(m), itinere: L.layerGroup().addTo(m), routes: L.layerGroup().addTo(m),
      places: L.layerGroup().addTo(m), hl: L.layerGroup().addTo(m), chain: L.layerGroup().addTo(m), mover: L.layerGroup().addTo(m),
    };
    map.current = m;
    return () => { m.remove(); };
  }, []);

  // 疆域：選「不晚於目前年代」的最近快照
  const snap = useMemo(() => {
    const s = [...index.borders.snapshots].sort((a, b) => a.year - b.year);
    return s.filter((x) => x.year <= year).pop() ?? s[0];
  }, [index, year]);
  useEffect(() => {
    let cancelled = false;
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
        onEachFeature: (f, layer) => layer.bindTooltip(`${f.properties.name}（疆界示意）`, { sticky: true }),
      }).addTo(g);
      setSnapLabel(`疆域示意：${fmtYear(snap.year)} 年快照`);
    });
    return () => { cancelled = true; };
  }, [snap]);

  // Itiner-e 精細道路（若已用 npm run roads 下載）
  useEffect(() => {
    if (!index.itinere || !layers.current) return;
    fetch('/data/itinere.geojson').then((r) => r.json()).then((gj) => {
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
  useEffect(() => { fetch('/data/awmc-roads.geojson').then((r) => r.json()).then(setAwmc).catch(() => {}); }, []);
  const era = eraOf(year);
  useEffect(() => {
    const g = layers.current?.awmc;
    if (!g || !awmc) return;
    g.clearLayers();
    L.geoJSON(awmc, {
      filter: (f) => roadInEra(f.properties.t, era),
      style: (f) => ({ color: '#8b5a2b', weight: f?.properties.m ? 1.6 : 0.9, opacity: f?.properties.t ? 0.6 : 0.4, dashArray: f?.properties.k ? undefined : '4 3' }),
      onEachFeature: (f, layer) => layer.bindTooltip(`${f.properties.n || '古道'}（巴林頓地圖集；${f.properties.k ? '路線確定' : '大致路線'}；${f.properties.t ? `時代 ${f.properties.t}` : '未標時代'}）`, { sticky: true }),
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
      const tip = `${r.name}（${KIND_LABEL[r.kind]}・${METHOD_LABEL[r.method]}）`;
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
      if (hl || r.method === 'stations') for (const st of r.stations) L.circleMarker([st.lat, st.lng], { radius: 3, color, weight: 1, fillOpacity: 1 }).bindTooltip(st.name).addTo(g);
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
    for (const p of places) {
      const act = p.cards.filter((c) => activeAt(c, year));
      const on = act.length > 0;
      const main = (act[0] ?? p.cards[0]).type;
      const mk = L.circleMarker([p.lat, p.lng], {
        radius: on ? 7 + Math.min(4, p.cards.length) : 4 + Math.min(3, p.cards.length),
        color: '#fff', weight: 1.5, fillColor: TYPE_COLOR[main], fillOpacity: on ? 0.95 : 0.35,
        dashArray: p.precision === 'schematic' ? '2 2' : undefined,
      });
      mk.bindTooltip(`${p.name}（今 ${p.modern}）・${p.cards.length} 張卡${p.precision === 'schematic' ? '・位置示意' : ''}`);
      mk.on('click', () => cb.current.onPlace(p.key));
      mk.addTo(g);
    }
  }, [places, year]);

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
        .bindTooltip(p.kind === 'route' ? `${ch.name}：沿已畫路線` : `${ch.name}：路線示意（實際走法不詳）`, { sticky: true }).addTo(g);
    }));
    ch.steps.forEach((s, i) => {
      L.marker([s.lat, s.lng], { icon: L.divIcon({ className: 'chain-step', html: `<span>${i + 1}</span>`, iconSize: [22, 22] }) })
        .bindTooltip(`${i + 1}. ${s.name}（${s.role}）`).addTo(g);
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
    if (!mover.current) mover.current = L.circleMarker(at, { radius: 8, color: '#fff', weight: 2, fillColor: '#c53030', fillOpacity: 1, className: 'chain-mover' }).addTo(g);
    else mover.current.setLatLng(at);
  }, [chain]);

  useEffect(() => { setTimeout(() => map.current?.invalidateSize(), 50); });

  return (
    <div className="map">
      <div ref={el} className="map-canvas" />
      <div className="map-views">
        {VIEWS.map((v) => <button key={v.label} onClick={() => map.current?.flyToBounds(v.bounds, { duration: 0.6 })}>{v.label}</button>)}
      </div>
      <div className="map-legend">
        <div>{snapLabel}</div>
        <div><i className="lg road" />主要大道 <i className="lg sea" />航線 <i className="lg wall" />長城 <i className="lg unknown" />路線不詳（只知道經過哪些站）</div>
        <div><i className="lg awmc" />巴林頓地圖集古道（{ERA_LABEL[era]}）・虛線＝大致路線</div>
        {ch && <div><i className="lg chain" />物資鏈（實線＝沿已畫路線，點線＝路線示意）</div>}
      </div>
    </div>
  );
}
