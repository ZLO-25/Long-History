// 深色模式（2026-11 第 5 批）：不手寫第二份樣式，而是在建置時由每一份 CSS 自動產生「深色覆寫」。
//
// 做法：對每一條含顏色的規則（color、background、border、fill、stroke、outline、自訂屬性 --x…），
// 在檔案最後附上一條 `:root[data-theme="dark"] <原選擇器>` 的複本，顏色換成「亮度反轉」後的顏色（色相不變）。
// 全部包在 `@media screen { … }` 裡，所以列印（學習單）永遠是淺色。
// <html data-theme="dark"> 由 src/lib/theme.ts 設定（跟隨系統 prefers-color-scheme，或使用者在「Aa」面板自己選）。
//
// 好處：以後誰改了某個元件的 CSS，深色版自動跟著變，不用同步維護兩份。
// 不處理的：node_modules 裡的 CSS（Leaflet、MapLibre：地圖底圖本來就不換）、故事地圖與小地圖（.smap、.sm-*、minimap.css：它們畫的是淺色地圖，面板留淺色）、
// 陰影（box-shadow／text-shadow 本來就是黑色半透明）、@keyframes、列印用的規則。
// 內嵌在 TSX 裡的 style={{ color }} 不在這裡處理：用到的地方要自己挑兩種模式都看得清楚的顏色（src/polish.css 的深色區有補丁）。
import { AtRule as AtRuleCtor, Declaration as DeclCtor, Rule as RuleCtor, type AtRule, type Declaration, type PluginCreator, type Rule } from 'postcss';

// ---- 顏色轉換 ----
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (!d) return [0, 0, l];
  const s = d / (1 - Math.abs(2 * l - 1));
  const h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [(h * 60 + 360) % 360, s, l];
}
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}
/** 亮度對應（分段線性）：白 1→0.09、淺色底 0.75→0.22、中間 0.5→0.52、黑 0→0.92。淺色底（米黃、淡黃、淡藍的標籤底）要壓得更深，字才讀得清楚 */
const mapL = (l: number) => (l >= 0.75 ? 0.09 + (1 - l) * 0.52 : l >= 0.5 ? 0.52 - (l - 0.5) * 1.2 : 0.92 - l * 0.8);
/** 亮度反轉：白→很深的灰，深字→淺字，色相不變。
 *  飽和度不能直接沿用 HSL 的 s（接近白色的奶油色 s 很高，反轉後會變成很濃的咖啡色）；改成保留「色度」（最大減最小的 RGB 差），淺色底再收斂一些 */
export function invert(r: number, g: number, b: number): [number, number, number] {
  const [h, , l] = rgbToHsl(r, g, b);
  const chroma = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
  let l2 = mapL(l);
  const sat = (ll: number) => { const room = 1 - Math.abs(2 * ll - 1); return room > 0 ? clamp((chroma * (l > 0.7 ? 0.8 : 1)) / room) : 0; };
  let out = hslToRgb(h, sat(l2), l2);
  // 原本是深色或中間色（深字、深色強調色）：反轉後要夠亮，在深色底上才有 4.5:1 的對比（藍、紫這類色相的亮度本來就低，同樣的 L 還是偏暗）
  if (relLum(r, g, b) < 0.4) for (let i = 0; i < 30 && relLum(...out) < 0.34 && l2 < 0.95; i++) { l2 += 0.02; out = hslToRgb(h, sat(l2), l2); }
  return out;
}
const relLum = (r: number, g: number, b: number) => { const f = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const hex2 = (n: number) => n.toString(16).padStart(2, '0');
const NAMED: Record<string, string> = { white: '#ffffff', black: '#000000', red: '#ff0000', gray: '#808080', grey: '#808080', silver: '#c0c0c0', orange: '#ffa500', yellow: '#ffff00', green: '#008000', blue: '#0000ff' };

const COLOR_RE = /#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3,4}\b|rgba?\([^)]*\)|\b(?:white|black|red|gray|grey|silver|orange|yellow|green|blue)\b/g;
function convertColor(tok: string): string {
  let r: number, g: number, b: number, a: number | null = null;
  const t = tok.toLowerCase();
  if (t.startsWith('#')) {
    let h = t.slice(1);
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    r = parseInt(h.slice(0, 2), 16); g = parseInt(h.slice(2, 4), 16); b = parseInt(h.slice(4, 6), 16);
    if (h.length === 8) a = parseInt(h.slice(6, 8), 16) / 255;
  } else if (t.startsWith('rgb')) {
    const nums = t.replace(/rgba?\(|\)/g, '').split(/[\s,/]+/).filter(Boolean).map((x) => (x.endsWith('%') ? parseFloat(x) * 2.55 : parseFloat(x)));
    if (nums.length < 3 || nums.slice(0, 3).some((n) => Number.isNaN(n))) return tok;
    [r, g, b] = nums; if (nums.length > 3) a = nums[3] > 1 ? nums[3] / 255 : nums[3];
  } else if (NAMED[t]) {
    const h = NAMED[t]; r = parseInt(h.slice(1, 3), 16); g = parseInt(h.slice(3, 5), 16); b = parseInt(h.slice(5, 7), 16);
  } else return tok;
  const [R, G, B] = invert(r, g, b);
  return a != null && a < 1 ? `rgba(${R},${G},${B},${+a.toFixed(3)})` : `#${hex2(R)}${hex2(G)}${hex2(B)}`;
}
/** 值裡所有顏色換成深色版；沒有顏色就回傳 null。url(...) 裡面不動 */
export function darkValue(v: string): string | null {
  let any = false;
  const out = v.split(/(url\([^)]*\))/).map((part) => (part.startsWith('url(') ? part : part.replace(COLOR_RE, (m) => { any = true; return convertColor(m); }))).join('');
  return any ? out : null;
}

// ---- postcss 外掛 ----
const PROPS = /^(color|background|background-color|background-image|border|border-(top|right|bottom|left)(-color)?|border-color|outline|outline-color|fill|stroke|caret-color|text-decoration-color|accent-color|column-rule-color|--[\w-]+)$/;
const SKIP_FILE = /node_modules|minimap\.css|dark-patches\.css/;
// 故事地圖（.smap、.sm-*）畫的是一張淺色地圖，面板也留淺色（dark-patches.css 把它的文字色與變數固定成淺色版）
const SKIP_SELECTOR = /data-theme|\.leaflet-|\.maplibregl-|\.mapboxgl-|\.smap\b|\.sm-/;
const DARK = ':root[data-theme="dark"]';

const scopeSelector = (sel: string) => {
  const s = sel.trim();
  if (s === ':root' || s === 'html') return `${s === 'html' ? 'html' : ':root'}[data-theme="dark"]`;
  if (s.startsWith(':root')) return `${DARK}${s.slice(5)}`;
  if (s.startsWith('html')) return `html[data-theme="dark"]${s.slice(4)}`;
  return `${DARK} ${s}`;
};

const darkPlugin: PluginCreator<unknown> = () => ({
  postcssPlugin: 'hr-dark-css',
  Once(root) {
    const file = root.source?.input.file ?? '';
    if (SKIP_FILE.test(file.replace(/\\/g, '/'))) return;
    const screen = new AtRuleCtor({ name: 'media', params: 'screen' });
    const wrapCache = new Map<AtRule, AtRule>(); // 同一個 @media 的複本放在同一個容器
    root.walkRules((rule: Rule) => {
      // 列印、動畫、字型：不管
      for (let p = rule.parent; p && p.type !== 'root'; p = p.parent) {
        if (p.type === 'atrule') { const n = (p as AtRule).name; if (/keyframes|font-face/.test(n) || (n === 'media' && /print/.test((p as AtRule).params))) return; }
      }
      const decls: Declaration[] = [];
      let hasColor = false;
      rule.each((n) => {
        if (n.type !== 'decl' || !PROPS.test(n.prop)) return;
        const v = darkValue(n.value);
        if (v != null) hasColor = true;
        // 顏色不是寫死的（var(--x)、transparent、none…）也要複製一份：否則深色版裡，別條「寫死顏色」的規則（複製後選擇器多了 [data-theme] 而更優先）會蓋過原本比它優先的規則
        else if (n.prop.startsWith('--')) return;
        decls.push(new DeclCtor({ prop: n.prop, value: v ?? n.value, important: n.important }));
      });
      if (!decls.length || !hasColor && !decls.some((d) => /var\(|transparent|none|inherit|currentcolor/i.test(d.value))) return;
      const sels = rule.selectors.filter((s) => !SKIP_SELECTOR.test(s));
      if (!sels.length) return;
      const clone = new RuleCtor({ selectors: sels.map(scopeSelector) });
      decls.forEach((d) => clone.append(d));
      const parent = rule.parent;
      if (parent && parent.type === 'atrule') {
        const at = parent as AtRule;
        let w = wrapCache.get(at);
        if (!w) { w = new AtRuleCtor({ name: at.name, params: at.params }); wrapCache.set(at, w); screen.append(w); }
        w.append(clone);
      } else screen.append(clone);
    });
    if (screen.nodes?.length) {
      screen.prepend(new RuleCtor({ selector: DARK }).append(new DeclCtor({ prop: 'color-scheme', value: 'dark' })));
      root.append(screen);
    }
  },
});
darkPlugin.postcss = true;
export default darkPlugin;
