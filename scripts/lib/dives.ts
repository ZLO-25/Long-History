// 深入專題（data/dives/*.yaml）：讀取、檢查、編譯。說明見 docs/dives.md
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { ROOT, type RawCard } from './cards.ts';
import type { Issue } from './check.ts';

export interface DiveLane { name: string; types: string[] }
export interface DiveDef {
  id: string; title: string; question: string; blurb?: string;
  range: { start: number; end: number }; histories?: string[];
  lanes?: DiveLane[]; cards: string[]; storylines?: string[]; units?: string[];
  power_maps?: { year: number; file: string }[];
  focus_year?: number;
  book?: BookDef;
  /** 主視覺種類：power＝勢力圖／領土圖（預設）；curve＝曲線（畫面尚未做）；none＝沒有主視覺 */
  visual?: 'power' | 'curve' | 'none';
  /** 主視覺的畫面文字（標題、副標、「這張圖怎麼畫的」說明、圖例小字的前綴） */
  power_ui?: { title: string; subtitle?: string; caveat?: string; legend?: string };
}
// 讀書專題（例如《人類大歷史》）：書的每一章是一站。書的論點寫在這裡，卡片只當證據（docs/dives.md 第七節）
export interface BookDef {
  title: string; author: string; note?: string;
  parts: { no: number; name: string; span: string; blurb?: string; from: number; to: number; unit?: string }[];
  chapters: { no: number; part: number; title: string; en?: string; claim: string; cards?: string[]; card_notes?: Record<string, string>; debate?: { who: string; text: string; src: string[]; stance?: string }[]; think?: string; core?: boolean; minutes?: number }[];
  sources: { id: string; title: string; url: string; accessed: string; tier?: string }[];
}

const allCards = (d: DiveDef) => [...new Set([...(d.cards ?? []), ...(d.book?.chapters ?? []).flatMap((c) => c.cards ?? [])])];

function checkBook(b: BookDef, byId: Map<string, any>, err: (m: string) => void, warn: (m: string) => void, unitIds?: Set<string>) {
  for (const k of ['title', 'author'] as const) if (!b[k]) err(`book 缺 ${k}`);
  const src = new Set((b.sources ?? []).map((x) => x.id));
  for (const x of b.sources ?? []) if (!x.id || !x.title || !x.url || !x.accessed) err(`book.sources 的 ${x.id ?? '?'} 要有 id、title、url、accessed`);
  const parts = new Set((b.parts ?? []).map((p) => p.no));
  for (const p of b.parts ?? []) {
    if (typeof p.from !== 'number' || typeof p.to !== 'number' || p.from >= p.to) err(`book.parts 第 ${p.no} 部要有 from < to（年份）`);
    if (p.unit && unitIds && !unitIds.has(p.unit)) err(`book.parts 第 ${p.no} 部的學習單元 ${p.unit} 不存在`);
  }
  const refs = (t: string) => [...(t ?? '').matchAll(/\[(b\d+)\]/g)].map((m) => m[1]);
  (b.chapters ?? []).forEach((c, i) => {
    const w = `第 ${c.no ?? i + 1} 章`;
    if (!parts.has(c.part)) err(`${w}：part ${c.part} 不在 book.parts`);
    if (!c.title || !c.claim) err(`${w}：缺 title 或 claim`);
    const r = refs(c.claim);
    if (!r.length) err(`${w}：claim（書裡怎麼說）要附來源 [bN]`);
    for (const id of r) if (!src.has(id)) err(`${w}：claim 引用的 ${id} 不在 book.sources`);
    for (const id of c.cards ?? []) if (!byId.has(id)) err(`${w}：證據卡 ${id} 不存在`);
    for (const id of Object.keys(c.card_notes ?? {})) if (!(c.cards ?? []).includes(id)) err(`${w}：card_notes 的 ${id} 不在這章的 cards`);
    if (c.minutes != null && !(c.minutes > 0)) err(`${w}：minutes 要是正數（建議分鐘數）`);
    for (const d of c.debate ?? []) {
      if (!d.who || !d.text || !d.src?.length) err(`${w}：debate 每條要有 who、text、src`);
      if (d.stance && !['支持', '補充', '反對'].includes(d.stance)) err(`${w}：debate 的 stance 只能是 支持、補充、反對：「${d.stance}」`);
      if (!d.stance) warn(`${w}：debate「${d.who}」沒有 stance（支持／補充／反對）`);
      for (const id of [...(d.src ?? []), ...refs(d.text)]) if (!src.has(id)) err(`${w}：debate 引用的 ${id} 不在 book.sources`);
    }
    if (!c.think) warn(`${w}：沒有「想一想」`);
    if (!(c.cards ?? []).length && !(c.debate ?? []).length) warn(`${w}：沒有證據卡也沒有另一種看法`);
  });
}

export function loadDives(): { file: string; dive: DiveDef }[] {
  const dir = path.join(ROOT, 'data', 'dives');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.yaml') && !f.startsWith('_')).sort()
    .map((f) => ({ file: `data/dives/${f}`, dive: YAML.parse(fs.readFileSync(path.join(dir, f), 'utf8')) }));
}

export function checkDives(dives: { file: string; dive: DiveDef }[], cards: RawCard[], storyIds: Set<string>, unitIds: Set<string>, histories: Set<string>): Issue[] {
  const out: Issue[] = [];
  const byId = new Map(cards.filter((c) => c.fm?.id).map((c) => [c.fm.id, c.fm]));
  const seen = new Set<string>();
  for (const { file, dive: d } of dives) {
    const err = (msg: string) => out.push({ level: 'error', file, msg });
    const warn = (msg: string) => out.push({ level: 'warning', file, msg });
    if (!d) { err('檔案是空的'); continue; }
    if (!/^dive-[a-z0-9-]+$/.test(d.id ?? '')) err(`id 必須是 dive-英文短名：「${d.id}」`);
    if (path.basename(file, '.yaml') !== (d.id ?? '').replace(/^dive-/, '')) err(`檔名應為 ${(d.id ?? '').replace(/^dive-/, '')}.yaml`);
    if (seen.has(d.id)) err('id 重複'); seen.add(d.id);
    for (const k of ['title', 'question'] as const) if (!d[k]) err(`缺 ${k}`);
    if (!d.range || typeof d.range.start !== 'number' || typeof d.range.end !== 'number' || d.range.start >= d.range.end) err('range 要有 start < end（數字年份）');
    for (const h of d.histories ?? []) if (!histories.has(h)) err(`histories 的「${h}」不在 data/histories.yaml`);
    // 讀書專題：每章的證據卡也算進專題（不必在 cards 再列一次）
    const ids = allCards(d);
    if (ids.length < 6) err('cards 至少 6 張');
    ids.forEach((id, i) => {
      const c = byId.get(id);
      if (!c) { err(`cards[${i}] ${id} 不存在`); return; }
      if ((d.cards ?? []).indexOf(id) !== (d.cards ?? []).lastIndexOf(id)) warn(`${id} 重複列出`);
      if (d.range && (c.time.end < d.range.start || c.time.start > d.range.end)) warn(`${id}（${c.time.start}–${c.time.end}）完全在專題年代 ${d.range.start}–${d.range.end} 之外`);
    });
    for (const s of d.storylines ?? []) if (!storyIds.has(s)) err(`storylines 指向不存在的故事線：${s}`);
    for (const u of d.units ?? []) if (!unitIds.has(u)) err(`units 指向不存在的單元：${u}`);
    for (const l of d.lanes ?? []) if (!l.name || !Array.isArray(l.types) || !l.types.length) err('lanes 每條要有 name 與 types');
    for (const pm of d.power_maps ?? []) {
      if (typeof pm.year !== 'number') err('power_maps 每筆要有 year（數字）');
      if (!pm.file || !fs.existsSync(path.join(ROOT, 'data', 'dives', pm.file))) err(`power_maps 找不到 ${pm.file}（先執行 npm run power）`);
      else {
        const gj = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'dives', pm.file), 'utf8'));
        if (!gj.features?.length) err(`${pm.file} 沒有任何勢力`);
        if (!gj.sources?.length) err(`${pm.file} 沒有來源（在 power-<年>.yaml 的 sources 列出）`);
        for (const f of gj.features ?? []) if (f.properties?.card && !byId.has(f.properties.card)) err(`${pm.file}：勢力「${f.properties.name}」的 card ${f.properties.card} 不存在`);
      }
    }
    if (d.book) checkBook(d.book, byId, err, warn, unitIds);
    if (d.focus_year != null && (typeof d.focus_year !== 'number' || (d.range && (d.focus_year < d.range.start || d.focus_year > d.range.end)))) err('focus_year 要是專題年代內的年份');
    if (d.visual !== undefined && !['power', 'curve', 'none'].includes(d.visual)) err(`visual 只能是 power、curve、none：「${d.visual}」`);
    if (d.power_ui && !d.power_ui.title) err('power_ui 要有 title');
    if (!(d.power_maps ?? []).length && (d.visual ?? 'power') === 'power' && !d.book) warn('沒有勢力圖（power_maps）；若這個專題不用地圖主視覺，請寫 visual: none 或 curve');
    if ((d.power_maps ?? []).length && !d.power_ui) warn('沒有 power_ui，畫面會用預設文字「勢力圖」');
    if (!d.book && !ids.some((id) => byId.get(id)?.type === 'person')) warn('這個專題沒有人物卡：人物區與關係網會自動隱藏');
  }
  return out;
}

/** 編譯進 index.json；勢力圖檔案另外複製到 public/data/dives/ */
export function buildDives(dives: { file: string; dive: DiveDef }[], cards: { id: string; type: string; time: { start: number; end: number } }[]) {
  const has = new Map(cards.map((c) => [c.id, c]));
  return dives.map(({ dive: d }) => ({
    id: d.id, title: d.title, question: d.question, blurb: d.blurb ?? '', range: d.range, histories: d.histories ?? [],
    lanes: d.lanes ?? [], visual: d.visual ?? (d.book ? 'none' : 'power'), power_ui: d.power_ui ?? null,
    cards: allCards(d).filter((id) => has.has(id)).sort((a, b) => has.get(a)!.time.start - has.get(b)!.time.start || has.get(a)!.time.end - has.get(b)!.time.end),
    storylines: d.storylines ?? [], units: d.units ?? [],
    focus_year: d.focus_year, book: d.book ? { title: d.book.title, author: d.book.author, note: d.book.note ?? '', sources: d.book.sources ?? [],
      parts: (d.book.parts ?? []).map((p) => ({ ...p, blurb: p.blurb ?? '' })),
      chapters: (d.book.chapters ?? []).map((c) => ({ no: c.no, part: c.part, title: c.title, en: c.en ?? '', claim: c.claim, cards: (c.cards ?? []).filter((id) => has.has(id)), card_notes: c.card_notes ?? {}, debate: (c.debate ?? []).map((d) => ({ ...d, stance: d.stance ?? '' })), think: c.think ?? '', core: !!c.core, minutes: c.minutes ?? null })) } : null,
    power_maps: (d.power_maps ?? []).map((pm) => {
      const p = path.join(ROOT, 'data', 'dives', pm.file);
      const gj = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null;
      return { year: pm.year, file: pm.file, view: gj?.view ?? null, title: gj?.title ?? String(pm.year), note: gj?.note ?? '', sources: gj?.sources ?? [],
        powers: (gj?.features ?? []).map((f: any) => ({ name: f.properties.name, en: f.properties.en, color: f.properties.color, provinces: f.properties.provinces, card: f.properties.card, minor: !!f.properties.minor })) };
    }),
  }));
}

export function copyPowerMaps(dives: { dive: DiveDef }[], pubData: string) {
  for (const { dive: d } of dives) for (const pm of d.power_maps ?? []) {
    const src = path.join(ROOT, 'data', 'dives', pm.file);
    if (!fs.existsSync(src)) continue;
    const dst = path.join(pubData, 'dives', pm.file);
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}
