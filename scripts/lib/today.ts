// 第 4 期：今日對照層（data/today/today.yaml）的讀取、檢查與編譯
import { readYaml, dateStr, type RawCard } from './cards.ts';
import { exists } from './check.ts';
import { buildLegs, fixSrc, type EconIssue } from './econ.ts';

const FILE = 'data/today/today.yaml';
const STALE_MONTHS = 18;
const ROLES = ['產地', '加工', '集散', '運輸', '消費', '決策'];
const VERIF = ['AI草稿', '交叉確認', '爭議'];

export const loadToday = () => (exists(FILE) ? readYaml(FILE) : { sources: [], chokepoints: [], chains: [] });
const isDate = (d: unknown) => /^\d{4}-\d{2}-\d{2}$/.test(dateStr(d as any));
// 超過 18 個月的資料視為「可能過時」
export const isStale = (asOf: string, now = new Date()) => {
  const d = new Date(asOf);
  return (now.getFullYear() - d.getFullYear()) * 12 + now.getMonth() - d.getMonth() > STALE_MONTHS;
};

export function checkToday(today: any, cards: RawCard[], tags: Set<string>, routeIds: Set<string>): EconIssue[] {
  const out: EconIssue[] = [];
  const err = (msg: string) => out.push({ file: FILE, level: 'error', msg });
  const warn = (msg: string) => out.push({ file: FILE, level: 'warning', msg });
  const src = new Set((today.sources ?? []).map((s: any) => s.id));
  for (const s of today.sources ?? []) if (!s.url || !s.title || !s.accessed) err(`來源 ${s.id} 缺標題、網址或查閱日期`);
  const cardIds = new Set(cards.map((c) => c.fm.id));
  const refs = (at: string, list: string[] | undefined) => {
    if (!list?.length) err(`${at}：缺來源`);
    for (const r of list ?? []) if (!src.has(r)) err(`${at}：來源 ${r} 不存在`);
  };
  const asOf = (at: string, d: unknown) => {
    if (!isDate(d)) { err(`${at}：data_as_of（資料截至）必填，格式 YYYY-MM-DD`); return; }
    if (isStale(dateStr(d as any))) warn(`${at}：資料截至 ${dateStr(d as any)}，已超過 ${STALE_MONTHS} 個月，可能過時`);
  };
  const ids = new Set<string>();
  for (const c of today.chokepoints ?? []) {
    const at = `今日咽喉 ${c.id}`;
    if (ids.has(c.id)) err(`${at}：id 重複`); ids.add(c.id);
    if (!c.name || typeof c.lat !== 'number' || typeof c.lng !== 'number') err(`${at}：缺名稱或座標`);
    asOf(at, c.data_as_of);
    if (!VERIF.includes(c.verification)) err(`${at}：verification 不合法`);
    for (const t of c.structure_tags ?? []) if (!tags.has(t)) err(`${at}：結構標籤「${t}」不在詞表中`);
    if (!c.facts?.length) err(`${at}：沒有任何事實`);
    (c.facts ?? []).forEach((f: any, i: number) => refs(`${at} 事實 ${i + 1}`, f.src));
    (c.events ?? []).forEach((e: any, i: number) => { if (!e.date || !e.text) err(`${at} 事件 ${i + 1}：缺日期或說明`); refs(`${at} 事件 ${i + 1}`, e.src); });
    if (!c.counterparts?.length) err(`${at}：至少要連到一張歷史卡片`);
    for (const cp of c.counterparts ?? []) {
      if (!cardIds.has(cp.id)) err(`${at}：對照卡 ${cp.id} 不存在`);
      if (!cp.note || cp.note.length < 20 || !cp.note.includes('不同')) err(`${at}：對照 ${cp.id} 的說明要寫出相似與不同`);
      refs(`${at} 對照 ${cp.id}`, cp.src);
    }
    if (!c.non_analogous) err(`${at}：缺「不可類比的差異」`);
  }
  for (const ch of today.chains ?? []) {
    const at = `今日供應鏈 ${ch.id}`;
    if (ids.has(ch.id)) err(`${at}：id 重複`); ids.add(ch.id);
    asOf(at, ch.data_as_of);
    if (!ch.counterparts?.length) err(`${at}：至少要連到一張歷史卡片`);
    for (const id of ch.counterparts ?? []) if (!cardIds.has(id)) err(`${at}：對照卡 ${id} 不存在`);
    const cps = new Set((today.chokepoints ?? []).map((c: any) => c.id));
    for (const id of ch.chokepoints ?? []) if (!cps.has(id)) err(`${at}：chokepoints 指向不存在的今日咽喉 ${id}`);
    if ((ch.steps ?? []).length < 2) err(`${at}：至少要有 2 個節點`);
    (ch.steps ?? []).forEach((st: any, i: number) => {
      const sa = `${at} 第 ${i + 1} 個節點（${st.name ?? '?'}）`;
      if (!st.name || typeof st.lat !== 'number' || typeof st.lng !== 'number') err(`${sa}：缺名稱或座標`);
      if (!ROLES.includes(st.role)) err(`${sa}：role 必須是 ${ROLES.join('／')}`);
      if (!st.text || st.text.length < 10) err(`${sa}：說明太短`);
      if (st.via && !routeIds.has(st.via)) err(`${sa}：via 指向不存在的路線 ${st.via}`);
      refs(sa, st.src);
    });
  }
  return out;
}

export function buildToday(today: any, routes: any[]) {
  const pool = new Map(fixSrc(today.sources).map((s: any) => [s.id, s]));
  const res = (ids: string[]) => ids.map((id) => pool.get(id));
  const now = new Date();
  return {
    stale_months: STALE_MONTHS,
    chokepoints: (today.chokepoints ?? []).map((c: any) => {
      const as = dateStr(c.data_as_of);
      return {
        ...c, data_as_of: as, stale: isStale(as, now),
        facts: c.facts.map((f: any) => ({ ...f, sources: res(f.src) })),
        events: (c.events ?? []).map((e: any) => ({ ...e, date: dateStr(e.date), sources: res(e.src) })),
        counterparts: c.counterparts.map((cp: any) => ({ ...cp, sources: res(cp.src) })),
      };
    }),
    chains: (today.chains ?? []).map((ch: any) => {
      const as = dateStr(ch.data_as_of);
      const steps = ch.steps.map((st: any) => ({ ...st, sources: res(st.src) }));
      return { id: ch.id, card: '', name: ch.name, start: 2026, end: 2026, today: true, data_as_of: as, stale: isStale(as, now),
        counterparts: ch.counterparts, chokepoints: ch.chokepoints ?? [], steps, legs: buildLegs(steps, routes) };
    }),
  };
}
