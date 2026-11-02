// 故事線（data/storylines.yaml）：沿著前因／後果箭頭走出來的跨時代路線。
// 每兩站之間必須有一條因果關係（前一站 → 後一站），畫面上的「橋」就是那條關係的 why，所以故事線不寫新史實。
import { exists } from './check.ts';
import { readYaml, type RawCard } from './cards.ts';
import type { Edge } from './causes.ts';
import type { Issue } from './check.ts';

export interface Storyline { id: string; title: string; question: string; blurb?: string; stops: string[] }

export function loadStorylines(): Storyline[] {
  return exists('data/storylines.yaml') ? readYaml('data/storylines.yaml')?.storylines ?? [] : [];
}

const bridgeOf = (edges: Edge[], a: string, b: string) => edges.find((e) => e.from === a && e.to === b);

export function checkStorylines(lines: Storyline[], cards: RawCard[], edges: Edge[]): Issue[] {
  const issues: Issue[] = [];
  const file = 'data/storylines.yaml';
  const err = (msg: string) => issues.push({ level: 'error', file, msg });
  const warn = (msg: string) => issues.push({ level: 'warning', file, msg });
  const byId = new Map(cards.filter((c) => c.fm?.id).map((c) => [c.fm.id, c.fm]));
  const ids = new Set<string>();
  for (const l of lines) {
    const w = `故事線 ${l.id ?? '?'}`;
    if (!/^story-[a-z0-9-]+$/.test(l.id ?? '')) err(`${w}：id 要是 story-xxx 格式`);
    if (ids.has(l.id)) err(`${w}：id 重複`);
    ids.add(l.id);
    if (!l.title) err(`${w}：缺 title`);
    if (!l.question) err(`${w}：缺 question（開場的大問題）`);
    if (!Array.isArray(l.stops) || l.stops.length < 4) { err(`${w}：stops 至少要 4 站`); continue; }
    l.stops.forEach((id, i) => {
      if (!byId.has(id)) { err(`${w}：第 ${i + 1} 站 ${id} 不存在`); return; }
      if (l.stops.indexOf(id) !== i) err(`${w}：${id} 重複出現`);
      const next = l.stops[i + 1];
      if (!next || !byId.has(next)) return;
      if (!bridgeOf(edges, id, next)) err(`${w}：第 ${i + 1}→${i + 2} 站（${byId.get(id).name} → ${byId.get(next).name}）之間沒有前因／後果關係；請先在卡片的 causes 或 effects 寫好，故事線才能接起來`);
      if (byId.get(next).time.end < byId.get(id).time.start) warn(`${w}：第 ${i + 2} 站整個發生在第 ${i + 1} 站之前，順序請再確認`);
    });
  }
  return issues;
}

export function buildStorylines(lines: Storyline[], edges: Edge[], cards: { id: string }[]) {
  const has = new Set(cards.map((c) => c.id));
  return lines.filter((l) => Array.isArray(l.stops) && l.stops.every((id) => has.has(id))).map((l) => ({
    id: l.id, title: l.title, question: l.question, blurb: l.blurb ?? '',
    stops: l.stops.map((id, i) => {
      const e = i < l.stops.length - 1 ? bridgeOf(edges, id, l.stops[i + 1]) : undefined;
      return { id, bridge: e ? { rel: e.rel, why: e.why, disputed: e.disputed, sources: e.sources } : null };
    }),
  }));
}
