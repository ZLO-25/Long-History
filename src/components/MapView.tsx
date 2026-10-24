// Leaflet 地圖：歷代疆域（示意）＋道路／航線＋卡片地點；隨年代同步更新
import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import type { Index, Card } from '../types';
import { activeAt, fmtYear, KIND_LABEL, TYPE_COLOR } from '../lib/format';

interface Props {
  index: Index; cards: Card[]; year: number;
  highlight: { keys: string[]; routes: string[] };
  onPlace: (key: string) => void; onRoute: (id: string) => void; compact?: boolean;
}

const hue = (s: string) => { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 360; return h; };
const borderCache = new Map<string, Promise<any>>();
const loadBorders = (file: string) => {
  if (!borderCache.has(file)) borderCache.set(file, fetch(`/data/borders/${file}`).then((r) => r.json()));
  return borderCache.get(file)!;
};

export function MapView({ index, cards, year, highlight, onPlace, onRoute, compact }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map>();
  const layers = useRef<{ borders: L.LayerGroup; routes: L.LayerGroup; itinere: L.LayerGroup; places: L.LayerGroup; hl: L.LayerGroup }>();
  const cb = useRef({ onPlace, onRoute });
  cb.current = { onPlace, onRoute };
  const [snapLabel, setSnapLabel] = useState('');

  useEffect(() => {
    const m = L.map(el.current!, { zoomControl: true, worldCopyJump: true, preferCanvas: false }).setView(compact ? [38, 18] : [39, 20], compact ? 4 : 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 12,
      attribution: '© OpenStreetMap contributors｜疆域：historical-basemaps (GPL-3.0)｜地名：Pleiades (CC BY)',
    }).addTo(m);
    m.createPane('borders').style.zIndex = '350';
    layers.current = {
      borders: L.layerGroup().addTo(m), itinere: L.layerGroup().addTo(m), routes: L.layerGroup().addTo(m),
      places: L.layerGroup().addTo(m), hl: L.layerGroup().addTo(m),
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

  // 道路與航線
  useEffect(() => {
    const g = layers.current?.routes;
    if (!g) return;
    g.clearLayers();
    for (const r of index.routes) {
      const on = r.start <= year && year <= r.end;
      const hl = highlight.routes.includes(r.id);
      if (!on && !hl) continue;
      const line = L.polyline(r.coords, {
        color: r.kind === 'sea' ? '#2b6cb0' : r.kind === 'wall' ? '#6b2737' : '#8b4513',
        weight: hl ? 6 : r.kind === 'sea' ? 2.5 : r.kind === 'wall' ? 4.5 : 3.5,
        opacity: on ? 0.9 : 0.45,
        dashArray: r.kind === 'sea' ? '6 6' : undefined,
      });
      line.bindTooltip(`${r.name}（${KIND_LABEL[r.kind]}・示意）`, { sticky: true });
      line.on('click', () => cb.current.onRoute(r.id));
      line.addTo(g);
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

  useEffect(() => { setTimeout(() => map.current?.invalidateSize(), 50); });

  return (
    <div className="map">
      <div ref={el} className="map-canvas" />
      <div className="map-legend">
        <div>{snapLabel}</div>
        <div><i className="lg road" />道路 <i className="lg sea" />航線 <i className="lg wall" />防線（皆為示意）</div>
      </div>
    </div>
  );
}
