// 別名分「主要」和「其他」：卡片上只先顯示主要的 2～3 個，其他收在「顯示更多」裡
// 卡片可以在 frontmatter 寫 aliases_main: [..] 自己指定；沒寫就用下面的規則自動挑：
//   1. 跳過和卡名重複、或本身就是卡名一部分的（例如卡名「美中貿易戰與科技戰」裡的「美中貿易戰」）
//   2. 跳過簡體字寫法（繁體版已經有了）、日文韓文
//   3. 跳過和已選別名互相包含的（「戒嚴」和「戒嚴令」只留一個）
//   4. 先挑最前面的 2 個中文，再補 1 個英文（作者通常把最常用的同義詞寫在最前面）
import { Converter } from 'opencc-js/cn2t';

const cn2tw = Converter({ from: 'cn', to: 'tw' });
const HAN_ONLY = /^[\p{Script=Han}0-9０-９\s·．・—–\-－「」《》（）()、，：:.／/]+$/u;
const HAS_HAN = /\p{Script=Han}/u;
const LATIN = /^[\p{Script=Latin}0-9\s'’.\-–—&,()/]+$/u;
const norm = (s: string) => s.replace(/[\s·．・—–\-－「」《》（）()]/g, '').toLowerCase();

export const MAIN_ZH = 2;
export const MAIN_EN = 1;
/** 別名總數不多於這個數字時全部直接顯示，不必收合 */
export const SHOW_ALL_UP_TO = 4;

export function pickMainAliases(name: string, aliases: string[], override?: unknown): string[] {
  if (Array.isArray(override) && override.length) return override.map(String).filter((a) => aliases.includes(a));
  if (aliases.length <= SHOW_ALL_UP_TO) return aliases;
  const n = norm(name);
  const picked: string[] = [];
  const clash = (a: string) => {
    const x = norm(a);
    if (!x || n === x || n.includes(x)) return true;
    return picked.some((p) => { const y = norm(p); return y.includes(x) || x.includes(y); });
  };
  const zh = aliases.filter((a) => HAN_ONLY.test(a) && HAS_HAN.test(a) && cn2tw(a) === a);
  for (const a of zh) { if (picked.length >= MAIN_ZH) break; if (!clash(a)) picked.push(a); }
  const en = aliases.filter((a) => LATIN.test(a) && /[A-Za-z]{3}/.test(a));
  let k = 0;
  for (const a of en) { if (k >= MAIN_EN) break; if (!clash(a)) { picked.push(a); k++; } }
  // 補不滿就從剩下的照原順序補（但不補簡體）
  for (const a of aliases) { if (picked.length >= MAIN_ZH + MAIN_EN) break; if (!picked.includes(a) && !clash(a) && cn2tw(a) === a) picked.push(a); }
  return picked;
}
