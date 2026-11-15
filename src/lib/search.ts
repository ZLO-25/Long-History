// 模糊搜尋：Fuse.js（容錯）＋ pinyin-pro（同音錯字）＋ opencc-js（簡轉繁）
import Fuse, { type FuseResultMatch } from 'fuse.js';
import { useEffect, useState } from 'react';
import type { Card } from '../types';
import { fmtYear } from './format';

// 效能：pinyin-pro（約 1MB）和 opencc（約 1MB）不放進首頁載入，
// 第一次要搜尋（或瀏覽器空閒）時才下載；下載完成前先用原字搜尋，不會擋住畫面。
type Libs = { toTrad: (s: string) => string; py: (s: string) => string };
let libs: Libs | null = null;
let loading: Promise<Libs> | null = null;
export function loadSearchLibs(): Promise<Libs> {
  if (!loading) loading = Promise.all([import('pinyin-pro'), import('opencc-js/cn2t')]).then(([p, o]) => {
    const conv = o.Converter({ from: 'cn', to: 'tw' });
    libs = {
      toTrad: (s) => conv(s),
      py: (s) => p.pinyin(s, { toneType: 'none', separator: '', nonZh: 'consecutive' }).toLowerCase().replace(/\s+/g, ''),
    };
    return libs;
  });
  return loading;
}
const toTrad = (s: string) => (libs ? libs.toTrad(s) : s);

/** 回傳搜尋輔助套件是否已載入；want 為 true（使用者開始打字）時才載 */
export function useSearchLibs(want: boolean): boolean {
  const [ready, setReady] = useState(!!libs);
  useEffect(() => {
    if (ready) return;
    let alive = true;
    const go = () => loadSearchLibs().then(() => { if (alive) setReady(true); }).catch(() => {});
    // 效能：不再於空閒時預載（簡轉繁字典解析一次要 0.2–0.3 秒，多數人不會用到）；開始打字才載
    if (want) go();
    return () => { alive = false; };
  }, [want, ready]);
  return ready;
}

const KEYS = [
  { name: 'name', label: '名稱', weight: 3 },
  { name: 'aliases', label: '別名', weight: 2.5 },
  { name: 'places', label: '地名', weight: 2 },
  { name: 'fields', label: '場域', weight: 1.5 },
  { name: 'civilization', label: '文明', weight: 1.5 },
  { name: 'topics', label: '#標籤', weight: 1.8 },
  { name: 'tags', label: '結構標籤', weight: 1.5 },
  { name: 'typeLabel', label: '類型', weight: 1 },
] as const;
const LABEL = Object.fromEntries(KEYS.map((k) => [k.name, k.label])) as Record<string, string>;

interface Rec {
  id: string; name: string; aliases: string[]; places: string[]; fields: string[];
  civilization: string[]; topics: string[]; tags: string[]; typeLabel: string;
  py_name: string; py_aliases: string[]; py_places: string[];
}

export interface Hit {
  card: Card; score: number;
  /** 精確命中：比對到的文字（名稱、別名、地名…）真的含有搜尋字，或是年份搜尋。拼音近似、錯字容錯的結果是 false，排在精確的後面（學習模式標「可能相關」） */
  exact?: boolean;
  highlights: { field: string; value: string; ranges?: readonly [number, number][]; via?: string }[];
}

export function createSearch(cards: Card[]) {
  const recs: Rec[] = cards.map((c) => {
    const places = c.place.locations.flatMap((l) => [l.name_ancient, l.name_modern]);
    return {
      id: c.id, name: c.name, aliases: c.aliases, places,
      fields: [c.place.primary_field, ...c.place.secondary_fields],
      civilization: c.civilization, topics: c.topics ?? [], tags: c.structure_tags, typeLabel: c.typeLabel,
      py_name: '', py_aliases: [], py_places: [],
    };
  });
  const byId = new Map(cards.map((c) => [c.id, c]));
  const opts = { includeScore: true, includeMatches: true, ignoreLocation: true, threshold: 0.34, minMatchCharLength: 1 };
  const text = new Fuse(recs, { ...opts, keys: KEYS.map((k) => ({ name: k.name, weight: k.weight })) });
  // 拼音索引等套件載入後、第一次需要時才建
  let phon: Fuse<Rec> | null = null;
  const getPhon = (py: (s: string) => string) => {
    if (phon) return phon;
    for (const r of recs) { r.py_name = py(r.name); r.py_aliases = r.aliases.map(py); r.py_places = r.places.map(py); }
    phon = new Fuse(recs, { ...opts, threshold: 0.25, keys: [
      { name: 'py_name', weight: 3 }, { name: 'py_aliases', weight: 2.5 }, { name: 'py_places', weight: 2 },
    ] });
    return phon;
  };

  return function search(raw: string): { hits: Hit[]; converted: string; year: number | null } {
    const q = raw.trim();
    if (!q) return { hits: [], converted: '', year: null };
    const converted = toTrad(q);
    const year = parseYear(converted);
    const found = new Map<string, Hit>();
    const add = (id: string, score: number, h: Hit['highlights']) => {
      const prev = found.get(id);
      if (prev) { prev.score = Math.min(prev.score, score); prev.highlights.push(...h); }
      else found.set(id, { card: byId.get(id)!, score, highlights: [...h] });
    };

    if (year !== null) {
      for (const c of cards) if (c.time.start <= year && year <= c.time.end)
        add(c.id, 0.02 + Math.min(0.2, (c.time.end - c.time.start) / 2000), [{ field: '年份', value: `${fmtYear(c.time.start)}–${fmtYear(c.time.end)}，包含 ${fmtYear(year)} 年` }]);
    } else {
      for (const r of text.search(converted)) add(r.item.id, r.score ?? 1, (r.matches ?? []).map(toHighlight));
      // 拼音只在輸入含中文且長度 ≥ 2 時使用，避免英文誤命中
      if (libs && /[一-鿿]/.test(converted) && converted.length >= 2) {
        const pq = libs.py(converted);
        for (const r of getPhon(libs.py).search(pq)) {
          const hl = (r.matches ?? []).map((m) => phonHighlight(r.item, m));
          add(r.item.id, (r.score ?? 1) + 0.1, hl);
        }
      }
    }
    const ql = converted.toLowerCase();
    for (const h of found.values()) h.exact = year !== null || h.highlights.some((x) => !x.via && x.value.toLowerCase().includes(ql));
    const hits = [...found.values()].sort((a, b) => Number(!!b.exact) - Number(!!a.exact) || a.score - b.score || a.card.time.start - b.card.time.start);
    for (const h of hits) h.highlights = dedupe(h.highlights);
    return { hits, converted, year };
  };
}

function toHighlight(m: FuseResultMatch) {
  return { field: LABEL[m.key ?? ''] ?? m.key ?? '', value: String(m.value), ranges: m.indices };
}
function phonHighlight(rec: Rec, m: FuseResultMatch) {
  const key = (m.key ?? '').replace('py_', '') as 'name' | 'aliases' | 'places';
  const orig = key === 'name' ? rec.name : rec[key][m.refIndex ?? 0];
  return { field: LABEL[key], value: orig, via: '拼音近似' };
}
function dedupe(h: Hit['highlights']) {
  const seen = new Set<string>();
  return h.filter((x) => { const k = x.field + x.value; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 4);
}

// 搜尋字和主題標籤對得上時，先推薦標籤（例：打「交易所」→ #交易所）
export function matchTopics(names: string[], raw: string): string[] {
  const q = toTrad(raw.trim()).replace(/^#/, '');
  if (!q) return [];
  return names.filter((n) => n === q || (q.length >= 2 && (n.includes(q) || (n.length >= 2 && q.includes(n))))).slice(0, 4);
}

// 「前431」「公元前 431 年」「431 BC」「-431」「212」「西元212年」→ 年份
export function parseYear(q: string): number | null {
  const s = q.replace(/\s+/g, '');
  let m = s.match(/^(?:西元|公元)?(前|-)(\d{1,4})年?$/);
  if (m) return -Number(m[2]);
  m = s.match(/^(\d{1,4})(?:年)?(bc|bce)$/i);
  if (m) return -Number(m[1]);
  m = s.match(/^(?:西元|公元)?(\d{1,4})年?(?:ad|ce)?$/i);
  if (m) return Number(m[1]);
  return null;
}

// ---- 學習模式的搜尋：學生會打問句（「羅馬為什麼滅亡」）。研究模式的搜尋（createSearch）不動 ----
// 問句用字：拿掉之後只剩真正的關鍵詞。長的先拆（「是什麼」先於「什麼」）
const Q_WORDS = ['為什麼會', '為什麼', '為甚麼', '為何', '怎麼樣', '怎麼會', '怎麼', '怎樣', '如何', '是什麼', '是甚麼', '什麼時候', '什麼', '甚麼', '是誰', '哪一個', '哪個', '哪裡', '哪些', '多少', '有沒有', '是不是', '請問', '我想知道', '想知道', '告訴我', '嗎', '呢', '吧', '啊', '呀', '會', '的', '了']
  .sort((a, b) => b.length - a.length);
/** 把問句拆成關鍵詞：先拿掉標點與問句用字，剩下的依空白拆開（「羅馬為什麼滅亡」→ 羅馬、滅亡）。太短的單字只在沒有更長的詞時保留 */
export function learnKeywords(raw: string): string[] {
  let s = toTrad(raw.trim()).replace(/[？?！!，,。.、；;：:「」『』（）()#\s]+/g, ' ');
  for (const w of Q_WORDS) s = s.split(w).join(' ');
  const parts = s.split(/\s+/).filter(Boolean);
  const long = parts.filter((t) => t.length >= 2);
  return [...new Set(long.length ? long : parts)];
}

/** 這筆結果夠不夠像：分數很低（幾乎完全相符），或比對到的文字真的含有搜尋詞。「asdfgh」這種亂碼靠模糊比對會碰到不相干的卡，在這裡擋掉 */
function relevant(h: Hit, terms: string[]): boolean {
  if (h.score <= 0.12) return true;
  // 純英文／拼音的拼錯（napolen → Napoleon）容許一點誤差；亂碼（asdfgh 0.80）分數很差，擋掉
  if (!/[一-鿿]/.test(terms.join('')) && h.score <= 0.5) return true;
  const ts = terms.map((t) => t.toLowerCase());
  return h.highlights.some((x) => {
    if (x.field === '年份') return true;
    const v = x.value.toLowerCase();
    return ts.some((t) => v.includes(t)) || (x.via === '拼音近似' && h.score <= 0.15);
  });
}

/** 學習模式搜尋：① 原字串 ② 拿掉問句用字後的整串 ③ 關鍵詞各自比對再合併排序；每一步都過「夠不夠像」的門檻，前面有結果就不往下 */
export function learnSearch(search: ReturnType<typeof createSearch>, raw: string): Hit[] {
  const q = raw.trim();
  if (!q) return [];
  const tryOne = (s: string) => search(s).hits.filter((h) => relevant(h, [toTrad(s)]));
  const first = tryOne(q);
  if (first.length) return first;
  const kws = learnKeywords(q);
  if (!kws.length) return [];
  const joined = kws.join('');
  if (joined !== q) { const r = tryOne(joined); if (r.length) return r; }
  if (kws.length < 2) return [];
  // 各關鍵詞各自比對再合併：每個詞命中的分數取最好的，命中越多個詞排越前面
  const merged = new Map<string, { hit: Hit; n: number }>();
  for (const k of kws) for (const h of tryOne(k)) {
    const m = merged.get(h.card.id);
    if (m) { m.n++; m.hit.score = Math.min(m.hit.score, h.score); m.hit.exact = m.hit.exact || h.exact; m.hit.highlights.push(...h.highlights); } else merged.set(h.card.id, { hit: { ...h, highlights: [...h.highlights] }, n: 1 });
  }
  return [...merged.values()].sort((a, b) => b.n - a.n || Number(!!b.hit.exact) - Number(!!a.hit.exact) || a.hit.score - b.hit.score || a.hit.card.time.start - b.hit.card.time.start).map((x) => x.hit);
}
