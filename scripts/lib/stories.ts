// 故事（data/stories/story-xxx.md）：每條故事線一篇 5–15 分鐘可以一口氣讀完的文章（docs/stories.md）。
// 故事不寫新史實：每一段都要標出它根據哪張卡的哪個來源 [卡片id:sN]，validate 會擋沒有出處的段落。
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { ROOT, type RawCard } from './cards.ts';
import type { Issue } from './check.ts';
import type { Storyline } from './storylines.ts';

export const STORIES_DIR = path.join(ROOT, 'data', 'stories');
/** 國高中生讀敘事文，每分鐘約 300 字 */
export const CHARS_PER_MIN = 300;
export const MIN_CHARS = 1500, MAX_CHARS = 4500;

export interface StoryBlock { kind: 'p' | 'quote'; text: string }
export interface StorySection { title: string; cards: string[]; blocks: StoryBlock[] }
export interface RawStory { file: string; fm: any; sections: StorySection[]; stray: string }

const CITE_RE = /\[([a-z0-9-]+):(s\d+)\]/g;
/** 拿掉出處標記與粗體記號後的純文字（算字數、估閱讀時間用） */
export const plain = (t: string) => t.replace(CITE_RE, '').replace(/\*\*/g, '');
const countChars = (t: string) => plain(t).replace(/\s/g, '').length;
export const storyChars = (s: RawStory) => s.sections.reduce((n, sec) => n + countChars(sec.title) + sec.blocks.reduce((m, b) => m + countChars(b.text), 0), 0);
export const storyMinutes = (chars: number) => Math.max(1, Math.round(chars / CHARS_PER_MIN));

export function parseStory(file: string, src: string): RawStory {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const fm = m ? YAML.parse(m[1]) : null;
  const body = (m ? m[2] : src).replace(/\r\n/g, '\n');
  const parts = body.split(/^##\s+/m);
  const stray = parts[0].trim();
  const sections: StorySection[] = parts.slice(1).map((part) => {
    const nl = part.indexOf('\n');
    const heading = (nl === -1 ? part : part.slice(0, nl)).trim();
    const text = nl === -1 ? '' : part.slice(nl + 1);
    const hm = heading.match(/^(.*?)\s*\{([^}]*)\}\s*$/);
    const title = (hm ? hm[1] : heading).trim();
    const cards = hm ? hm[2].split(/[,，\s]+/).map((x) => x.trim()).filter(Boolean) : [];
    const blocks: StoryBlock[] = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean).map((b) => (
      b.startsWith('>') ? { kind: 'quote' as const, text: b.split('\n').map((l) => l.replace(/^>\s?/, '')).join('').trim() }
        : { kind: 'p' as const, text: b.split('\n').map((l) => l.trim()).join('') }
    ));
    return { title, cards, blocks };
  });
  return { file, fm, sections, stray };
}

export function loadStories(): RawStory[] {
  if (!fs.existsSync(STORIES_DIR)) return [];
  return fs.readdirSync(STORIES_DIR).filter((f) => f.endsWith('.md')).sort()
    .map((f) => parseStory(`data/stories/${f}`, fs.readFileSync(path.join(STORIES_DIR, f), 'utf8')));
}

const THINKERS = /李彔|李录|哈拉瑞|赫拉利|Harari|Li Lu/;

export function checkStories(stories: RawStory[], lines: Storyline[], cards: RawCard[], opts: { requireAll?: boolean } = {}): Issue[] {
  const issues: Issue[] = [];
  const byId = new Map(cards.filter((c) => c.fm?.id).map((c) => [c.fm.id as string, c.fm]));
  const lineById = new Map(lines.map((l) => [l.id, l]));
  const seen = new Set<string>();
  for (const s of stories) {
    const err = (msg: string) => issues.push({ level: 'error', file: s.file, msg });
    const warn = (msg: string) => issues.push({ level: 'warning', file: s.file, msg });
    const id = s.fm?.story;
    const line = lineById.get(id);
    if (!line) { err(`frontmatter 的 story「${id}」不是 data/storylines.yaml 裡的故事線`); continue; }
    if (path.basename(s.file) !== `${id}.md`) err(`檔名要和故事線 id 一樣（${id}.md）`);
    if (seen.has(id)) err(`故事線 ${id} 有兩篇故事`);
    seen.add(id);
    if (!s.fm.hook || typeof s.fm.hook !== 'string') err('缺 hook（入口按鈕下的一句引子）');
    else if (s.fm.hook.length > 70) warn(`hook 太長（${s.fm.hook.length} 字，建議 ≤60）`);
    for (const k of ['remember', 'think'] as const) {
      const v = s.fm[k];
      if (!Array.isArray(v) || v.length < 2 || v.length > 4 || v.some((x: any) => typeof x !== 'string' || !x.trim())) err(`${k} 要是 2–4 條文字`);
    }
    if (s.stray) err(`第一個 ## 標題之前有文字，請放進小節裡：「${s.stray.slice(0, 20)}…」`);
    if (s.sections.length < 3) err('至少要 3 個小節（## 標題）');
    // 每一站都要出現，而且順序和故事線一樣
    const order = s.sections.flatMap((sec) => sec.cards);
    for (const c of order) if (!line.stops.includes(c)) err(`小節標題 {${c}} 不是這條故事線的站`);
    const firstAt = line.stops.map((c) => order.indexOf(c));
    line.stops.forEach((c, i) => { if (firstAt[i] < 0) err(`故事線的第 ${i + 1} 站 ${c}（${byId.get(c)?.name}）沒有出現在任何小節標題的 {…} 裡`); });
    for (let i = 1; i < firstAt.length; i++) if (firstAt[i] >= 0 && firstAt[i - 1] >= 0 && firstAt[i] < firstAt[i - 1]) err(`小節順序和故事線不同：${line.stops[i]} 出現在 ${line.stops[i - 1]} 之前`);
    // 每一段都要有出處，出處要真的存在
    s.sections.forEach((sec, si) => {
      if (!sec.title) err(`第 ${si + 1} 個小節沒有標題`);
      if (!sec.blocks.length) err(`小節「${sec.title}」沒有內文`);
      sec.blocks.forEach((b, bi) => {
        const where = `小節「${sec.title}」第 ${bi + 1} 段`;
        const cites = [...b.text.matchAll(CITE_RE)];
        if (!cites.length) err(`${where}沒有出處標記 [卡片id:sN]：「${b.text.slice(0, 24)}…」`);
        for (const [, cid, sid] of cites) {
          const fm = byId.get(cid);
          if (!fm) err(`${where}引用了不存在的卡片 ${cid}`);
          else if (!(fm.sources ?? []).some((x: any) => x.id === sid)) err(`${where}引用了 ${cid} 沒有的來源 ${sid}`);
        }
        if (/\[s\d+\]/.test(b.text)) err(`${where}有沒寫卡片 id 的出處（要寫成 [卡片id:sN]）`);
        if (THINKERS.test(b.text)) err(`${where}提到李彔／哈拉瑞：故事裡不寫思想家解讀`);
        if (/^#|^[-*]\s/.test(b.text)) err(`${where}用了清單或其他層級的標題；故事只用 ## 小節、段落和 > 引文`);
      });
    });
    const chars = storyChars(s);
    if (chars < MIN_CHARS) err(`只有 ${chars} 字，不到 ${MIN_CHARS} 字（約 5 分鐘）`);
    if (chars > MAX_CHARS) err(`有 ${chars} 字，超過 ${MAX_CHARS} 字（約 15 分鐘）`);
  }
  if (opts.requireAll) for (const l of lines) if (!seen.has(l.id)) issues.push({ level: 'warning', file: 'data/stories/', msg: `故事線 ${l.id}（${l.title}）還沒有故事` });
  return issues;
}

/** 輸出給網頁的故事：出處換成編號，並附上來源清單 */
export function buildStory(s: RawStory, cards: RawCard[]) {
  const byId = new Map(cards.filter((c) => c.fm?.id).map((c) => [c.fm.id as string, c.fm]));
  const sources: { card: string; cardName: string; title: string; url: string }[] = [];
  const num = new Map<string, number>();
  const swap = (t: string) => t.replace(CITE_RE, (_, cid: string, sid: string) => {
    const key = `${cid}:${sid}`;
    if (!num.has(key)) {
      const fm = byId.get(cid);
      const src = (fm?.sources ?? []).find((x: any) => x.id === sid);
      if (!src) return '';
      sources.push({ card: cid, cardName: fm.name, title: src.title, url: src.url });
      num.set(key, sources.length);
    }
    return `[^${num.get(key)}]`;
  });
  const sections = s.sections.map((sec) => ({ title: sec.title, cards: sec.cards, blocks: sec.blocks.map((b) => ({ kind: b.kind, text: swap(b.text) })) }));
  const chars = storyChars(s);
  return { id: s.fm.story as string, hook: s.fm.hook as string, remember: s.fm.remember as string[], think: s.fm.think as string[], chars, minutes: storyMinutes(chars), sections, sources };
}
