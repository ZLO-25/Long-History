// 底圖：OpenFreeMap 向量圖磚（免金鑰、無流量上限），用 Liberty 配色但把所有文字圖層拿掉，
// 地名改由 labelLayer.ts 畫成「繁體中文＋英文」。
// 瀏覽器不支援 WebGL 或載入失敗時，退回 OpenStreetMap 點陣圖（地名會是各國當地文字）。
import L from 'leaflet';
import style from './basemap-style.json';
import { notifyBasemapDone } from './detail';

export const BASEMAP_ATTRIBUTION = '底圖 <a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OSM</a>｜地名 Natural Earth';
const OSM_ATTRIBUTION = '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';

const hasWebGL = () => {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
};

function addRaster(m: L.Map) {
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 12, attribution: OSM_ATTRIBUTION }).addTo(m);
  m.getContainer().classList.add('basemap-raster');
}

/** 加上底圖；回傳實際用的是哪一種。底圖處理完（成功或退回點陣圖）就通知 src/lib/detail.ts，之後才開始背景下載卡片整包內文 */
export const addBasemap = (m: L.Map): Promise<'vector' | 'raster'> => addBasemapNow(m).finally(notifyBasemapDone);
async function addBasemapNow(m: L.Map): Promise<'vector' | 'raster'> {
  if (!hasWebGL()) { addRaster(m); return 'raster'; }
  try {
    // 地圖函式庫較大，用到時才載入，不拖慢首頁
    await import('maplibre-gl/dist/maplibre-gl.css');
    // MapLibre 6 的背景執行緒是獨立檔案：交給 Vite 打包成單一 worker 檔，再告訴 MapLibre 去哪裡載
    const [{ setWorkerUrl }, { default: workerUrl }] = await Promise.all([
      import('maplibre-gl'), import('maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url')]);
    setWorkerUrl(workerUrl);
    const { maplibreGL } = await import('@maplibre/maplibre-gl-leaflet');
    // 地圖可能在底圖載入期間就被拿掉了（例如區塊拉到新視窗、或關掉新視窗），這時就不要再加
    if (!(m as any)._mapPane) return 'vector';
    const layer = maplibreGL({ style: style as any, attributionControl: false, interactive: false } as any);
    // 外掛的已知問題：地圖移除後，排在下一格畫面的 _transitionEnd 仍會執行而讀 null 的 _map。
    // 這裡照外掛原本的寫法重寫一次，只多一行「地圖已移除就不做」（區塊拉到新視窗再收回時會遇到）
    (layer as any)._transitionEnd = function (this: any) {
      requestAnimationFrame(() => {
        const map = this._map; if (!map || !this._glMap) return;
        const zoom = map.getZoom(), center = map.getCenter();
        const offset = map.latLngToContainerPoint(map.getBounds().getNorthWest());
        this._resizeContainer();
        L.DomUtil.setTransform(this._glMap._actualCanvas, offset, 1);
        this._glMap.once('moveend', () => { if (this._map) this._zoomEnd(); });
        this._glMap.jumpTo({ center, zoom: zoom - 1 });
      });
    };
    layer.addTo(m);
    m.attributionControl?.addAttribution(BASEMAP_ATTRIBUTION);
    m.getContainer().classList.add('basemap-vector');
    return 'vector';
  } catch (e) {
    console.warn('向量底圖載入失敗，改用 OpenStreetMap 點陣圖', e);
    addRaster(m);
    return 'raster';
  }
}
