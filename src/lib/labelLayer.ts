// 底圖地名圖層：把 public/data/labels.json（Natural Earth，繁中＋英文）畫在地圖上
// 做法：每次移動／縮放結束後，挑出「這個縮放級別該出現、又在畫面裡」的地名，
// 依重要性一個個放；會和已放好的字重疊的就跳過（所以放大才會看到小城市）。
import L from 'leaflet';

// [類型, 中文, 英文, 緯度, 經度, 最小縮放, 優先序]；類型 c 國家、o 海洋、r 地形區、T 首都、t 城市、v 河流
type Label = [string, string, string, number, number, number, number];

// 各類字級（中文、英文）；國家與海洋放大後字也跟著大一點
const SIZE: Record<string, [number, number]> = { c: [13, 9.5], o: [12.5, 9.5], r: [11.5, 9], T: [12, 9], t: [11, 8.5], v: [11, 8.5] };
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

let cache: Promise<Label[]> | null = null;
const loadLabels = () => (cache ??= fetch(`${import.meta.env.BASE_URL}data/labels.json`).then((r) => r.json()).then((d) => d.labels as Label[]).catch(() => []));

export const LabelLayer = L.Layer.extend({
  onAdd(this: any, map: L.Map) {
    if (!map.getPane('basemapLabels')) {
      const pane = map.createPane('basemapLabels');
      pane.style.zIndex = '380'; // 在古代疆域（350）之上、在路線與案例圓點（400）之下
      pane.style.pointerEvents = 'none';
    }
    this._el = L.DomUtil.create('div', 'bm-labels', map.getPane('basemapLabels'));
    this._labels = [] as Label[];
    loadLabels().then((ls) => { this._labels = ls; this._draw(); });
    this._draw();
  },
  onRemove(this: any) { this._el?.remove(); },
  getEvents() { return { moveend: this._draw, zoomstart: this._hide, viewreset: this._draw }; },
  _hide(this: any) { if (this._el) this._el.style.visibility = 'hidden'; },
  _draw(this: any) {
    const map: L.Map = this._map;
    if (!map || !this._el) return;
    const z = map.getZoom();
    const size = map.getSize();
    const scale = Math.max(1, Math.min(1.25, 0.85 + z * 0.06));
    const placed: number[][] = [];
    const hit = (b: number[]) => placed.some((p) => b[0] < p[2] && b[2] > p[0] && b[1] < p[3] && b[3] > p[1]);
    let html = '';
    for (const [t, zh, en, lat, lng, minZ] of this._labels as Label[]) {
      if (minZ > z) continue;
      const pt = map.latLngToContainerPoint([lat, lng]);
      if (pt.x < -80 || pt.y < -30 || pt.x > size.x + 80 || pt.y > size.y + 30) continue;
      const [fz, fe] = SIZE[t] ?? SIZE.t;
      const fzS = fz * (t === 'c' || t === 'o' ? scale : 1);
      const w = Math.max(zh.length * fzS, en.length * fe * 0.56) + 6;
      const h = fzS + fe + 4;
      const city = t === 't' || t === 'T';
      // 城市字放在點的右邊；其他字以座標為中心
      const box = city ? [pt.x - 3, pt.y - h / 2, pt.x + 6 + w, pt.y + h / 2] : [pt.x - w / 2, pt.y - h / 2, pt.x + w / 2, pt.y + h / 2];
      if (hit(box)) continue;
      placed.push([box[0] - 2, box[1] - 2, box[2] + 2, box[3] + 2]);
      const lp = map.containerPointToLayerPoint(pt);
      html += `<div class="bm-l bm-${t}" style="transform:translate(${Math.round(lp.x)}px,${Math.round(lp.y)}px);font-size:${fzS.toFixed(1)}px">`
        + `<div class="bm-in">${city ? '<i></i>' : ''}<b>${esc(zh)}</b><small style="font-size:${fe}px">${esc(en)}</small></div></div>`;
    }
    this._el.innerHTML = html;
    this._el.style.visibility = '';
  },
});

export const labelLayer = () => new (LabelLayer as any)() as L.Layer;
