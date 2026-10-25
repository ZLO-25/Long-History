// 讀取 cards/ 下所有卡片：解析 YAML frontmatter 與 ## 段落
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { SECTIONS, UNKNOWN_MARKERS, type CardType } from './fields.ts';

export const ROOT = path.resolve(import.meta.dirname, '..', '..');
export const CARDS_DIR = path.join(ROOT, 'cards');

export interface Source { id: string; title: string; url: string; accessed: string | Date }
export interface Location {
  name_ancient: string; name_modern: string; lat: number; lng: number;
  pleiades_id?: string; precision: string; role?: string; src?: string[];
}
export interface Section {
  code: string; title: string; text: string; refs: string[];
  unknown: boolean; // 以「未知／來源不足…」開頭
  sub?: Record<string, { text: string; refs: string[]; unknown: boolean }>;
}
export interface RawCard {
  file: string; // 相對 ROOT
  fm: any;
  sections: Section[];
  extraHeadings: string[]; // 不屬於規格的 ## 標題
}

const REF_RE = /\[(s\d+)\]/g;
export const refsOf = (t: string) => [...new Set([...t.matchAll(REF_RE)].map((m) => m[1]))];
export const isUnknown = (t: string) => UNKNOWN_MARKERS.some((m) => t.trim().startsWith(m));

function splitFrontmatter(src: string) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { fm: null, body: src };
  return { fm: YAML.parse(m[1]), body: m[2] };
}

function parseSections(body: string, type: CardType) {
  const defs = SECTIONS[type] ?? [];
  const parts = body.split(/^##\s+/m).slice(1);
  const sections: Section[] = [];
  const extraHeadings: string[] = [];
  for (const part of parts) {
    const nl = part.indexOf('\n');
    const heading = (nl === -1 ? part : part.slice(0, nl)).trim();
    const text = (nl === -1 ? '' : part.slice(nl + 1)).trim();
    const code = heading.split(/\s+/)[0];
    const def = defs.find((d) => d.code === code);
    if (!def) { extraHeadings.push(heading); continue; }
    const sec: Section = { code, title: def.title, text, refs: refsOf(text), unknown: isUnknown(text) };
    if (def.role === 'lens') {
      sec.sub = {};
      for (const sp of text.split(/^###\s+/m).slice(1)) {
        const i = sp.indexOf('\n');
        const h = (i === -1 ? sp : sp.slice(0, i)).trim();
        const t = (i === -1 ? '' : sp.slice(i + 1)).trim();
        sec.sub[h] = { text: t, refs: refsOf(t), unknown: isUnknown(t) };
      }
    }
    sections.push(sec);
  }
  return { sections, extraHeadings };
}

export function loadCards(): RawCard[] {
  const out: RawCard[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.md') && !e.name.startsWith('_')) {
        const { fm, body } = splitFrontmatter(fs.readFileSync(p, 'utf8'));
        const type = fm?.type as CardType;
        const { sections, extraHeadings } = parseSections(body, type);
        out.push({ file: path.relative(ROOT, p).split(path.sep).join('/'), fm, sections, extraHeadings });
      }
    }
  };
  walk(CARDS_DIR);
  return out.sort((a, b) => a.file.localeCompare(b.file));
}

// 解析 docs/structure-tags.md
export function loadTagVocab() {
  const md = fs.readFileSync(path.join(ROOT, 'docs', 'structure-tags.md'), 'utf8');
  const cats: { name: string; tags: { tag: string; def: string; plain?: string; example?: string }[] }[] = [];
  for (const line of md.split(/\r?\n/)) {
    const h = line.match(/^##\s+(.+)$/);
    if (h) { cats.push({ name: h[1].trim(), tags: [] }); continue; }
    const t = line.match(/^-\s+\*\*(.+?)\*\*[：:]\s*(.+)$/);
    if (t && cats.length) { cats[cats.length - 1].tags.push({ tag: t[1].trim(), def: t[2].trim() }); continue; }
    // 第 6 期：標籤下一行「白話：…｜例子：…」
    const pl = line.match(/^\s+白話[：:]\s*(.+?)\s*[｜|]\s*例子[：:]\s*(.+)$/);
    const last = cats[cats.length - 1]?.tags.at(-1);
    if (pl && last) { last.plain = pl[1].trim(); last.example = pl[2].trim(); }
  }
  return cats;
}

export const readYaml = (rel: string) => YAML.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
export const readJson = (rel: string) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
export const dateStr = (d: string | Date) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d));
