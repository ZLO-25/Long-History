// 年份與通用格式
export const fmtYear = (y: number) => (y < 0 ? `前${-y}` : `${y}`);
export const fmtRange = (s: number, e: number) => (s === e ? `${fmtYear(s)} 年` : `${fmtYear(s)}–${fmtYear(e)} 年`);
export const PRECISION_LABEL: Record<string, string> = {
  exact: '確切', approx: '約略', disputed: '有爭議', schematic: '示意', unknown: '未知',
};
export const TYPE_COLOR: Record<string, string> = {
  war: '#c0392b', commodity: '#b7791f', event: '#2b6cb0', building: '#2f855a',
};
export const TYPE_ICON: Record<string, string> = { war: '⚔', commodity: '⚖', event: '◆', building: '▲' };

// 卡片在某一年是否「存在」：建築完工後持續存在
export const activeAt = (c: { type: string; time: { start: number; end: number } }, year: number) =>
  c.type === 'building' ? c.time.start <= year : c.time.start <= year && year <= c.time.end;
