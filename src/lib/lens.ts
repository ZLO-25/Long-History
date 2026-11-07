// 李彔、哈拉瑞「雙軌解讀」：卡片上只顯示他們直接談到的內容。
// 寫著「無直接論述」的小節（他們沒有特別說明這件事）一律不顯示。
import type { Section } from '../types';

export const LENS_KEYS = ['李彔', '哈拉瑞'] as const;

/** 回傳有直接論述的 [人名, 內文]；兩人都沒有就回傳空陣列 */
export function directLens(sec?: Section): [string, string][] {
  if (!sec?.sub) return [];
  return LENS_KEYS.map((k) => [k, sec.sub![k]?.text?.trim() ?? ''] as [string, string])
    .filter(([, t]) => t && !t.startsWith('無直接論述'));
}
