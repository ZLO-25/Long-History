// 底圖：OpenFreeMap 向量圖磚（免金鑰、無流量上限），用 Liberty 配色但把所有文字圖層拿掉，
// 地名改由 labelLayer.ts 畫成「繁體中文＋英文」。
// 瀏覽器不支援 WebGL 或載入失敗時，退回 OpenStreetMap 點陣圖（地名會是各國當地文字）。
import L from 'leaflet';
import style from './basemap-style.json';

export const BASEMAP_ATTRIBUTION = '底圖 <a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OSM</a>｜地名 Natural Earth';
const OSM_ATTRIBUTION = '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';

const hasWebGL = () => {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
};

function addRaster(m: L.Map) {
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 12, attribution: OSM_ATTRIBUTION }).addTo(m);
  m.getContainer().classList.add('basemap-raster');
}

/** 加上底圖；回傳實際用的是哪一種 */
export async function addBasemap(m: L.Map): Promise<'vector' | 'raster'> {
  if (!hasWebGL()) { addRaster(m); return 'raster'; }
  try {
    // 地圖函式庫較大，用到時才載入，不拖慢首頁
    await import('maplibre-gl/dist/maplibre-gl.css');
    // MapLibre 6 的背景執行緒是獨立檔案：交給 Vite 打包成單一 worker 檔，再告訴 MapLibre 去哪裡載
    const [{ setWorkerUrl }, { default: workerUrl }] = await Promise.all([
      import('maplibre-gl'), import('maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url')]);
    setWorkerUrl(workerUrl);
    const { maplibreGL } = await import('@maplibre/maplibre-gl-leaflet');
    const layer = maplibreGL({ style: style as any, attributionControl: false, interactive: false } as any);
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
