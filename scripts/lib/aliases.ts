// 卡片上「別名」列的顯示順序
// 規則：卡片 aliases 清單寫的順序就是知名度順序（最有名、最常用的寫在最前面）。
//   1. 卡片若有選填欄位 aliases_main: [..]，這幾個硬排到最前面（舊卡相容用）
//   2. 跳過和卡名完全一樣的（卡名已經是標題了）
//   3. 簡體字寫法一律排到最後（它們主要是給搜尋用的，繁體版已經有了）
// 畫面上最多先顯示兩行，放不下的收在「顯示更多」。
import { Converter as CN2T } from 'opencc-js/cn2t';
import { Converter as T2CN } from 'opencc-js/t2cn';

const cn2tw = CN2T({ from: 'cn', to: 'tw' });
const tw2cn = T2CN({ from: 'tw', to: 'cn' });
const HAS_HAN = /\p{Script=Han}/u;
const norm = (s: string) => s.replace(/[\s·．・—–\-－「」《》（）()]/g, '').toLowerCase();
// 簡體：轉繁體會變、轉簡體不會變（只看「轉繁體會變」會誤判「台積電」「萬里長城」這類本來就是正體的寫法）
export const isSimplified = (a: string) => HAS_HAN.test(a) && cn2tw(a) !== a && tw2cn(a) === a;

export function orderAliases(name: string, aliases: string[], override?: unknown): string[] {
  const first = Array.isArray(override) ? override.map(String).filter((a) => aliases.includes(a)) : [];
  const n = norm(name);
  const rest = aliases.filter((a) => !first.includes(a) && norm(a) !== n);
  const seen = new Set<string>();
  const out = [...first, ...rest.filter((a) => !isSimplified(a)), ...rest.filter(isSimplified)];
  return out.filter((a) => (seen.has(a) ? false : (seen.add(a), true)));
}
