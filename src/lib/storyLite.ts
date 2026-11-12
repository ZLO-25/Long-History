// 故事線的小工具（首屏用）。Story.tsx／StoryReader.tsx 整包很大（閱讀頁、樣式），延後到打開故事線才載入；
// App 外殼與學習首頁只需要下面這幾個小函式，所以在這裡有一份輕量版（行為與原函式相同；Story.tsx 自己仍用自己的）。
import type { Index, Storyline } from '../types';
import { cardEn } from './bilingual';
import { byIdOf } from './dive';

export function findStory(index: Index, id: string): Storyline | undefined {
  return (index.storylines ?? []).find((s) => s.id === id);
}

/** 地圖上要標的點：每站取第一個地點，編號＝站序（同 Story.tsx storyMarks） */
export function storyMarks(index: Index, id: string) {
  const s = findStory(index, id);
  if (!s) return [];
  const m = byIdOf(index);
  return s.stops.map((x, i) => ({ c: m.get(x.id), n: i + 1 })).filter((x) => !!x.c?.place.locations[0])
    .map(({ c, n }) => ({ key: c!.place.locations[0].key, n, name: c!.name, en: cardEn(c!) }));
}

// keepRead：網址是不是正開著這篇故事的閱讀頁。原本在 StoryReader.tsx（沒有副作用）；
// 閱讀頁自己還有一個 activeRead 變數，只有故事線的 chunk 載入後才有——載入時由 chunks.tsx 登記進來。
// chunk 還沒載入時沒有任何閱讀頁開著（activeRead 一定是 null），只看網址就和原函式等價。
let realKeep: ((id: string) => boolean) | null = null;
export const registerKeepRead = (f: (id: string) => boolean) => { realKeep = f; };
export const keepRead = (id: string) => {
  if (realKeep) return realKeep(id);
  const q = new URLSearchParams(location.search);
  return q.get('story') === id && q.get('read') === '1';
};

// 入口旁的「📖 故事・約 N 分鐘」小標籤（同 StoryReader.tsx 的 ReadBadge；讀過的 id 存在 localStorage）
const READ_KEY = 'history-river-stories-read';
export function readStoriesLite(): Set<string> {
  try { const v = JSON.parse(localStorage.getItem(READ_KEY) ?? '[]'); return new Set(Array.isArray(v) ? v : []); } catch { return new Set(); }
}
