// 「看地圖回答」用的小地圖（Leaflet）：標出幾個點（先只顯示 A、B、C…），點地圖上的點或下面的按鈕作答。
// 這個檔案只有 mapq 那一步才用 React.lazy 載入：首頁與沒有 mapq 的課不會下載地圖程式（效能原則）。
// 手機：一指拖曳留給頁面捲動（地圖不用手指拖），可以兩指縮放或按 ＋－；底圖載不到時點仍然在，下面的按鈕照樣能作答。
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map-base.css';
import './minimap.css';
import { addBasemap } from '../lib/basemap';

export interface MiniPoint { lat: number; lng: number; label: string }
interface Props {
  points: MiniPoint[];
  /** 答對（done）之後才顯示地名；wrongs＝選錯過的點；right＝正解那一點（公布後才給） */
  done: boolean; wrongs: number[]; right: number | null; picked: number | null;
  onPick: (i: number) => void; disabled?: boolean;
  /** 地圖建不起來（例如 Leaflet 例外）：讓外面退回按鈕版 */
  onFail?: () => void;
}
const LETTER = 'ABCDEF';

function pinHtml(i: number, cls: string, name?: string) {
  const safe = (name ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
  return `<span class="mq-pin ${cls}"><b>${LETTER[i]}</b>${safe ? `<i class="mq-name">${safe}</i>` : ''}</span>`;
}

export default function MiniMap({ points, done, wrongs, right, picked, onPick, disabled, onFail }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const pickRef = useRef(onPick); pickRef.current = onPick;
  const disRef = useRef(disabled); disRef.current = disabled;
  const [note, setNote] = useState('');

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let map: L.Map;
    try {
      map = L.map(el, { zoomControl: true, attributionControl: true, scrollWheelZoom: false, dragging: !L.Browser.mobile, touchZoom: true, doubleClickZoom: false, keyboard: false, zoomSnap: 0.25 });
      mapRef.current = map;
      const b = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
      map.fitBounds(b.pad(0.35), { maxZoom: 9, animate: false });
      markers.current = points.map((p, i) => {
        const m = L.marker([p.lat, p.lng], {
          icon: L.divIcon({ className: 'mq-icon', html: pinHtml(i, ''), iconSize: [44, 44], iconAnchor: [22, 22] }),
          keyboard: true, title: `地圖上的 ${LETTER[i]} 點`, alt: `地圖上的 ${LETTER[i]} 點`, riseOnHover: true,
        }).addTo(map);
        m.on('click', () => { if (!disRef.current) pickRef.current(i); });
        return m;
      });
      // 鍵盤：Tab 聚焦某個點後按 Enter 或空白鍵作答（自己接，不靠 Leaflet 的 keypress 轉譯）
      const onKey = (e: KeyboardEvent) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const i = markers.current.findIndex((m) => m.getElement() === e.target);
        if (i >= 0) { e.preventDefault(); e.stopPropagation(); if (!disRef.current) pickRef.current(i); }
      };
      el.addEventListener('keydown', onKey, true);
      // 底圖是後來才補上的：失敗或慢都不影響作答
      addBasemap(map).catch(() => {});
      const ro = new ResizeObserver(() => map.invalidateSize());
      ro.observe(el);
      const t = window.setTimeout(() => {
        if (!el.querySelector('.leaflet-tile-loaded, canvas.maplibregl-canvas, .leaflet-layer canvas')) setNote('底圖還沒載入（可能沒有網路）。點的位置仍然正確，也可以直接按下面的按鈕作答。');
      }, navigator.onLine === false ? 0 : 7000);
      return () => { window.clearTimeout(t); el.removeEventListener('keydown', onKey, true); ro.disconnect(); map.remove(); mapRef.current = null; markers.current = []; };
    } catch (e) {
      console.warn('小地圖建立失敗', e);
      onFail?.();
    }
  }, [points]); // eslint-disable-line react-hooks/exhaustive-deps

  // 作答狀態改變：換標記的顏色，公布後才顯示地名
  useEffect(() => {
    markers.current.forEach((m, i) => {
      const cls = [done && i === right ? 'right' : '', wrongs.includes(i) ? 'wrong' : '', picked === i && !done ? 'picked' : ''].filter(Boolean).join(' ');
      m.setIcon(L.divIcon({ className: 'mq-icon', html: pinHtml(i, cls, done ? points[i].label : undefined), iconSize: [44, 44], iconAnchor: [22, 22] }));
    });
  }, [done, wrongs, right, picked, points]);

  return (
    <div className="mq-wrap">
      <div ref={box} className="mq-map" role="group" aria-label={`地圖，有 ${points.length} 個點：${points.map((_, i) => LETTER[i]).join('、')}。也可以用下面的按鈕作答。`} />
      {note && <p className="muted small mq-note" role="status">{note}</p>}
    </div>
  );
}
