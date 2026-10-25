// 年份與通用格式
export const fmtYear = (y: number) => (y < 0 ? `前${-y}` : `${y}`);
export const fmtRange = (s: number, e: number) => (s === e ? `${fmtYear(s)} 年` : `${fmtYear(s)}–${fmtYear(e)} 年`);
export const PRECISION_LABEL: Record<string, string> = {
  exact: '確切', approx: '約略', disputed: '有爭議', schematic: '示意', unknown: '未知',
};
export const TYPE_COLOR: Record<string, string> = {
  war: '#c0392b', commodity: '#b7791f', event: '#2b6cb0', building: '#2f855a', tech: '#6b46c1', finance: '#0f766e',
};
export const TYPE_ICON: Record<string, string> = { war: '⚔', commodity: '⚖', event: '◆', building: '▲', tech: '⚙', finance: '¤' };
export const KIND_LABEL: Record<string, string> = { road: '道路', sea: '航線', wall: '長城／防線' };

// 卡片在某一年是否「存在」：建築完工後、技術發明後、金融制度出現後持續存在
export const activeAt = (c: { type: string; time: { start: number; end: number } }, year: number) =>
  c.type === 'building' || c.type === 'tech' || c.type === 'finance' ? c.time.start <= year : c.time.start <= year && year <= c.time.end;

export const METHOD_LABEL: Record<string, string> = { 'awmc-road': '沿巴林頓地圖集古道描線', 'awmc-wall': '巴林頓地圖集城牆線', sea: '經停港依史料，港間為最短可行海路', stations: '只標史料記載的站點，站與站之間路線不詳' };
export const SEG_LABEL: Record<string, string> = { known: '地圖集標「路線確定」', approx: '地圖集標「大致路線」', gap: '地圖集兩段古道間的缺口（程式補接）', unknown: '路線不詳：只是把兩個站點連起來，不代表實際走法' };
// 巴林頓地圖集的時代代號：A 古風、C 古典、H 希臘化、R 羅馬、L 古代晚期；M 是本站自訂（640 年以後，地圖集不涵蓋，不畫古道）
export const ERA_LABEL: Record<string, string> = { A: '古風時代', C: '古典時代', H: '希臘化時代', R: '羅馬時代', L: '古代晚期', M: '中世紀以後不顯示' };
export function eraOf(year: number): string {
  return year < -550 ? 'A' : year < -330 ? 'C' : year < -30 ? 'H' : year < 300 ? 'R' : year < 640 ? 'L' : 'M';
}
// 地圖集未標時代的古道：多半是羅馬道路，從希臘化時代（前 330 年）起才顯示（推定，見報告）
export function roadInEra(t: string, era: string): boolean {
  if (era === 'M') return false;
  if (!t) return era === 'R' || era === 'L' || era === 'H';
  return t.replace(/[^ACHRL]/g, '').includes(era);
}

// 經濟曲線
export const ENTITY_COLORS = ['#2b6cb0', '#c05621', '#2f855a', '#9b2c2c', '#6b46c1', '#b7791f', '#2c7a7b', '#97266d', '#4a5568'];
export const fmtEcon = (v: number, metric: string) =>
  metric === 'population' ? (v >= 1e4 ? `${(v / 1e4).toLocaleString('zh-TW', { maximumFractionDigits: v >= 1e6 ? 0 : 1 })} 萬` : v.toLocaleString())
  : metric === 'silver' ? `${v}%` : v.toLocaleString();
