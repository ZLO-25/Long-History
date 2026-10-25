// 第 3 期：經濟曲線（data/economy/series.yaml）與物資鏈（data/chains/chains.yaml）的讀取、檢查與編譯
import { readYaml, dateStr, type RawCard } from './cards.ts';
import { exists } from './check.ts';

const KINDS = ['估計', '登記', '實測'];
const VERIF = ['AI草稿', '交叉確認', '爭議'];
const ROLES = ['產地', '加工', '集散', '運輸', '消費', '決策'];
const MIN_YEAR = -800, MAX_YEAR = 500;

export interface EconIssue { file: string; level: 'error' | 'warning'; msg: string }

export const fixSrc = (list: any[] = []) => list.map((s) => ({ ...s, accessed: dateStr(s.accessed) }));

export function loadEcon() {
  return exists('data/economy/series.yaml') ? readYaml('data/economy/series.yaml') : { sources: [], metrics: [], series: [] };
}
export function loadChains(): any[] {
  return exists('data/chains/chains.yaml') ? readYaml('data/chains/chains.yaml')?.chains ?? [] : [];
}

export function checkEcon(econ: any): EconIssue[] {
  const out: EconIssue[] = [];
  const file = 'data/economy/series.yaml';
  const err = (msg: string) => out.push({ file, level: 'error', msg });
  const srcIds = new Set((econ.sources ?? []).map((s: any) => s.id));
  for (const s of econ.sources ?? []) if (!s.url || !s.title || !s.accessed) err(`來源 ${s.id} 缺標題、網址或查閱日期`);
  const metrics = new Set((econ.metrics ?? []).map((m: any) => m.id));
  const ids = new Set<string>();
  for (const s of econ.series ?? []) {
    const at = `數列 ${s.id}`;
    if (ids.has(s.id)) err(`${at}：id 重複`); ids.add(s.id);
    if (!metrics.has(s.metric)) err(`${at}：metric「${s.metric}」不存在`);
    if (!KINDS.includes(s.kind)) err(`${at}：kind 必須是 ${KINDS.join('／')}`);
    if (!VERIF.includes(s.verification)) err(`${at}：verification 不合法`);
    if (!s.points?.length) err(`${at}：沒有資料點`);
    for (const [i, p] of (s.points ?? []).entries()) {
      const pa = `${at} 第 ${i + 1} 點（${p.entity ?? '?'}）`;
      if (!p.entity) err(`${pa}：缺 entity`);
      if (typeof p.start !== 'number' || p.start < MIN_YEAR || p.start > MAX_YEAR) err(`${pa}：start 必須是 ${MIN_YEAR}–${MAX_YEAR} 之間的年份`);
      if (p.end != null && (typeof p.end !== 'number' || p.end < p.start || p.end > MAX_YEAR)) err(`${pa}：end 不合法`);
      const hasV = typeof p.value === 'number', hasR = typeof p.low === 'number' && typeof p.high === 'number';
      if (hasV === hasR) err(`${pa}：value 與 low/high 必須擇一`);
      if (hasR && p.low > p.high) err(`${pa}：low 大於 high`);
      if (p.verification && !VERIF.includes(p.verification)) err(`${pa}：verification 不合法`);
      if (!p.src?.length) err(`${pa}：缺來源`);
      for (const r of p.src ?? []) if (!srcIds.has(r)) err(`${pa}：來源 ${r} 不存在`);
    }
  }
  return out;
}

export function checkChains(chains: any[], cards: RawCard[], routeIds: Set<string>): EconIssue[] {
  const out: EconIssue[] = [];
  const file = 'data/chains/chains.yaml';
  const err = (msg: string) => out.push({ file, level: 'error', msg });
  const byId = new Map(cards.map((c) => [c.fm.id, c]));
  const ids = new Set<string>();
  for (const ch of chains) {
    const at = `物資鏈 ${ch.id}`;
    if (ids.has(ch.id)) err(`${at}：id 重複`); ids.add(ch.id);
    const card = byId.get(ch.card);
    if (!card) { err(`${at}：card 指向不存在的卡 ${ch.card}`); continue; }
    if (card.fm.type !== 'commodity') err(`${at}：card 必須是物資卡`);
    if (typeof ch.start !== 'number' || typeof ch.end !== 'number' || ch.start > ch.end) err(`${at}：start/end 不合法`);
    const own = new Set((ch.sources ?? []).map((s: any) => s.id));
    const cardSrc = new Set((card.fm.sources ?? []).map((s: any) => s.id));
    if ((ch.steps ?? []).length < 2) err(`${at}：至少要有 2 個節點`);
    for (const [i, st] of (ch.steps ?? []).entries()) {
      const sa = `${at} 第 ${i + 1} 個節點（${st.name ?? '?'}）`;
      if (!st.name || typeof st.lat !== 'number' || typeof st.lng !== 'number') err(`${sa}：缺名稱或座標`);
      if (!ROLES.includes(st.role)) err(`${sa}：role 必須是 ${ROLES.join('／')}`);
      if (!st.text || st.text.length < 10) err(`${sa}：說明太短`);
      if (!st.src?.length) err(`${sa}：缺來源`);
      for (const r of st.src ?? []) if (!own.has(r) && !cardSrc.has(r)) err(`${sa}：來源 ${r} 不在本鏈或卡片 ${ch.card} 的來源中`);
      if (st.via && i === 0) err(`${sa}：第一個節點不能有 via`);
      if (st.via && !routeIds.has(st.via)) err(`${sa}：via 指向不存在的路線 ${st.via}`);
    }
  }
  return out;
}

// ---- 編譯 ----
const dist2 = (a: [number, number], b: [number, number]) => (a[0] - b[0]) ** 2 + ((a[1] - b[1]) * Math.cos((a[0] * Math.PI) / 180)) ** 2;
const km = (a: [number, number], b: [number, number]) => Math.sqrt(dist2(a, b)) * 111.2;
const nearest = (coords: [number, number][], p: [number, number]) => {
  let bi = 0, bd = Infinity;
  coords.forEach((c, i) => { const d = dist2(c, p); if (d < bd) { bd = d; bi = i; } });
  return bi;
};

export function buildEcon(econ: any) {
  const src = new Map(fixSrc(econ.sources).map((s: any) => [s.id, s]));
  return {
    metrics: econ.metrics ?? [],
    series: (econ.series ?? []).map((s: any) => ({
      ...s,
      points: s.points.map((p: any) => ({ end: p.start, verification: s.verification, note: '', ...p })),
      sources: [...new Set(s.points.flatMap((p: any) => p.src))].map((id) => src.get(id)),
    })),
  };
}

// 每一段 leg：有 via 時取路線上離兩端最近的兩點之間那段（必要時反向），頭尾與節點之間若有距離就補點線
type RouteGeo = { id: string; method: string; coords: [number, number][] };

// 把依序的節點算成線段：有 via 時取路線上離兩端最近的那段，頭尾與節點之間若有距離就補點線
export function buildLegs(steps: { lat: number; lng: number; via?: string; path?: [number, number][] }[], routes: RouteGeo[]) {
  const rById = new Map(routes.map((r) => [r.id, r]));
  return steps.slice(1).map((to, i) => {
    const from = steps[i];
    const a: [number, number] = [from.lat, from.lng], b: [number, number] = [to.lat, to.lng];
    const parts: { kind: 'route' | 'schematic'; coords: [number, number][] }[] = [];
    const r = to.via ? rById.get(to.via) : undefined;
    if (r) {
      const ia = nearest(r.coords, a), ib = nearest(r.coords, b);
      let seg = ia <= ib ? r.coords.slice(ia, ib + 1) : r.coords.slice(ib, ia + 1).reverse();
      if (seg.length < 2) seg = [r.coords[ia], r.coords[ib]];
      if (km(a, seg[0]) > 3) parts.push({ kind: 'schematic', coords: [a, seg[0]] });
      // 只標站點的路線（張騫等）本身就不是實際走法，照樣畫成點線
      parts.push({ kind: r.method === 'stations' ? 'schematic' : 'route', coords: seg });
      if (km(seg[seg.length - 1], b) > 3) parts.push({ kind: 'schematic', coords: [seg[seg.length - 1], b] });
    } else parts.push({ kind: 'schematic', coords: [a, ...(to.path ?? []), b] });
    const length = parts.reduce((s, p) => s + p.coords.slice(1).reduce((t, c, j) => t + km(p.coords[j], c), 0), 0);
    return { via: to.via ?? null, parts, km: Math.round(length) };
  });
}

export function buildChains(chains: any[], cards: RawCard[], routes: RouteGeo[]) {
  const byId = new Map(cards.map((c) => [c.fm.id, c]));
  return chains.map((ch) => {
    const card = byId.get(ch.card)!;
    const pool = new Map([...fixSrc(card?.fm.sources), ...fixSrc(ch.sources)].map((s: any) => [s.id, s]));
    const steps = ch.steps.map((st: any) => ({ ...st, sources: st.src.map((id: string) => pool.get(id)) }));
    return { id: ch.id, card: ch.card, name: ch.name, start: ch.start, end: ch.end, steps, legs: buildLegs(steps, routes) };
  });
}
