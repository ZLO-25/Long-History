// 間隔複習與段考複習的純函式（不碰畫面；首頁也會用，所以保持很小，只讀 localStorage 進度）
// 排程：一課完成後第 1、3、7、21 天各到期一次（doneAt 當第 0 天）。紀錄在 Progress.review（形狀見 progress.ts RevRec、level.ts 檔頭）。
//   答對：s＋1，下次到期＝max(doneAt＋下一階天數, 今天＋兩階之間的間隔)（晚做不會連著幾天都出）；s 到 4 就畢業
//   答錯：s 不變，明天再出
import type { Unit } from '../types';
import type { Progress, RevRec } from './progress';

export const INTERVALS = [1, 3, 7, 21];
export const MAX_DAILY = 6;
export const MAX_PER_UNIT = 3;
/** 一課最多排幾題進複習（課內第一次答錯的優先，其餘用課 id 當種子隨機抽）：不然長課會一直積壓 */
export const SCHEDULE_PER_UNIT = 6;

const pad = (n: number) => String(n).padStart(2, '0');
/** 今天（本機日期）YYYY-MM-DD */
export const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
export const addDays = (s: string, n: number) => new Date(Date.parse(`${s}T00:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
export const dayDiff = (a: string, b: string) => Math.round((Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`)) / 864e5);
/** 「2026-11-16」→「11 月 16 日」；明天／後天另外說 */
export function dayText(d: string, today = todayStr()) {
  const n = dayDiff(d, today);
  const md = `${Number(d.slice(5, 7))} 月 ${Number(d.slice(8, 10))} 日`;
  return n === 1 ? `明天（${md}）` : n === 2 ? `後天（${md}）` : n > 2 && n < 14 ? `${n} 天後（${md}）` : md;
}

export const rkey = (unit: string, q: string) => `${unit}:${q}`;
export const splitKey = (k: string): [string, string] => { const i = k.indexOf(':'); return [k.slice(0, i), k.slice(i + 1)]; };

// ---- 題目：從一課的步驟找出「會自動對答案」的題 ----
export interface RQ {
  /** 題鍵（同 level.ts：s3、s3k、o4、o4f、c9_2、qk2_0） */
  key: string; step: number; kind: 'choice' | 'order' | 'quick'; what: string; q: string;
  options?: string[]; answer?: number; items?: string[]; whyWrong?: (string | null)[];
  /** choice／order：解析；quick：參考答案 */
  explain: string;
  /** 史料題：要先顯示的那段史料（卡片 id＋第幾段） */
  card?: string; idx?: number;
}
/** 這一課所有可以自動對答案的題（要完整的單元：steps 有內容）。順序依步驟 */
export function questionsOf(u: Pick<Unit, 'steps'>): RQ[] {
  const out: RQ[] = [];
  (u.steps as any[]).forEach((s, i) => {
    switch (s.type) {
      case 'card': (s.quick ?? []).forEach((x: any, j: number) => out.push({ key: `qk${i}_${j}`, step: i, kind: 'quick', what: '讀完小題', q: x.q, explain: x.a })); break;
      case 'source':
        if (Array.isArray(s.options)) out.push({ key: `s${i}`, step: i, kind: 'choice', what: '史料判讀', q: s.question, options: s.options, answer: s.answer, explain: s.explain, whyWrong: s.why_wrong, card: s.card, idx: s.idx ?? 0 });
        if (s.critique && typeof s.critique === 'object') out.push({ key: `s${i}k`, step: i, kind: 'choice', what: '史料第二問', q: s.critique.question, options: s.critique.options, answer: s.critique.answer, explain: s.critique.explain, whyWrong: s.critique.why_wrong, card: s.card, idx: s.idx ?? 0 });
        break;
      case 'chain':
        out.push({ key: `o${i}`, step: i, kind: 'order', what: '因果鏈', q: s.prompt, items: s.items, explain: s.explain });
        if (s.followup && typeof s.followup === 'object') out.push({ key: `o${i}f`, step: i, kind: 'choice', what: '因果鏈追問', q: s.followup.question, options: s.followup.options, answer: s.followup.answer, explain: s.followup.explain, whyWrong: s.followup.why_wrong });
        break;
      case 'check': (s.items ?? []).forEach((x: any, j: number) => {
        if (x.kind === 'choice') out.push({ key: `c${i}_${j}`, step: i, kind: 'choice', what: '自我檢查', q: x.q, options: x.options, answer: x.answer, explain: x.explain, whyWrong: x.why_wrong });
        else if (x.kind === 'order') out.push({ key: `c${i}_${j}`, step: i, kind: 'order', what: '自我檢查', q: x.q, items: x.items, explain: x.explain });
      }); break;
    }
  });
  return out;
}

// ---- 排程 ----
const doneDay = (up: { doneAt?: string; lastAt?: string }, today: string) => up.doneAt || up.lastAt || today;

/** 這一課按「完成」（或補建）時，把它的題目排進複習：第一次到期＝完成日＋1 天。已經有的題不動 */
export function scheduleUnit(p: Progress, u: Pick<Unit, 'id' | 'steps'>, today = todayStr()): Progress {
  const up = p.units[u.id];
  if (!up?.done) return p;
  const base = doneDay(up, today);
  const review = { ...(p.review ?? {}) };
  const qs = questionsOf(u).map((q) => ({ k: rkey(u.id, q.key), t: firstWrong(p, rkey(u.id, q.key)) ? 0 : 1, h: hash(`${u.id}|${q.key}`) }))
    .sort((a, b) => a.t - b.t || a.h - b.h).slice(0, SCHEDULE_PER_UNIT);
  for (const { k } of qs) if (!review[k]) review[k] = { s: 0, due: addDays(base, INTERVALS[0]), ok: true };
  return { ...p, review, units: { ...p.units, [u.id]: { ...up, rv: 1 } } };
}

/** 做完了課、但還沒排進複習的課（這次改版前完成的）。minDays＝至少完成幾天了（首頁只算已經到期的：1） */
export function legacyUnits(p: Progress, today = todayStr(), minDays = 0): string[] {
  const has = new Set(Object.keys(p.review ?? {}).map((k) => splitKey(k)[0]));
  return Object.entries(p.units).filter(([id, up]) => up?.done && !up.rv && !has.has(id) && (!!up.doneAt || !!up.lastAt) && dayDiff(today, doneDay(up, today)) >= minDays).map(([id]) => id);
}

const hash = (s: string) => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return (h ^ (h >>> 15)) >>> 0; };

/** 課內第一次作答就答錯？（r:<題> 的 f；舊進度的自我檢查 boolean；小題自評不是「答對」） */
function firstWrong(p: Progress, key: string): boolean {
  const [uid, qk] = splitKey(key);
  const A = (p.units[uid]?.answers ?? {}) as Record<string, any>;
  const r = A[`r:${qk}`];
  if (r && typeof r === 'object' && typeof r.f === 'boolean') return !r.f;
  if (/^qk/.test(qk)) return typeof A[qk] === 'string' && A[qk] !== 'right';
  return A[qk] === false;
}

/** 今天已經複習過的題（last＝今天） */
export const answeredToday = (p: Progress, today = todayStr()) => Object.entries(p.review ?? {}).filter(([, r]) => r.last === today);
const live = (p: Progress, k: string) => !!p.units[splitKey(k)[0]]?.done;

/** 今天到期、還沒做的題（依優先順序排好，沒套用每日與每課上限） */
function dueSorted(p: Progress, today: string): string[] {
  const rows = Object.entries(p.review ?? {}).filter(([k, r]) => r.s < INTERVALS.length && r.due <= today && r.last !== today && live(p, k));
  const tier = (k: string, r: RevRec) => (r.ok === false ? 0 : firstWrong(p, k) ? 1 : 2);
  return rows.map(([k, r]) => ({ k, t: tier(k, r), due: r.due, h: hash(`${today}|${k}`) })).sort((a, b) => a.t - b.t || a.due.localeCompare(b.due) || a.h - b.h).map((x) => x.k);
}
/** 今天要複習的題（每天最多 6 題、同一課最多 3 題；同一天重開結果相同）。已經做過的算在 6 題裡 */
export function pickToday(p: Progress, today = todayStr()): string[] {
  const room = MAX_DAILY - answeredToday(p, today).length;
  const per = new Map<string, number>();
  for (const [k] of answeredToday(p, today)) { const u = splitKey(k)[0]; per.set(u, (per.get(u) ?? 0) + 1); }
  const out: string[] = [];
  for (const k of dueSorted(p, today)) {
    if (out.length >= room) break;
    const u = splitKey(k)[0];
    if ((per.get(u) ?? 0) >= MAX_PER_UNIT) continue;
    per.set(u, (per.get(u) ?? 0) + 1); out.push(k);
  }
  return out;
}

/** 記下一題複習的結果（同一天同一題只算第一次） */
export function applyReview(p: Progress, key: string, ok: boolean, today = todayStr()): Progress {
  const r = p.review?.[key];
  if (!r || r.last === today) return p;
  const up = p.units[splitKey(key)[0]];
  const base = up ? doneDay(up, today) : today;
  let next: RevRec;
  if (!ok) next = { s: r.s, due: addDays(today, 1), last: today, ok: false };
  else {
    const s = r.s + 1;
    if (s >= INTERVALS.length) next = { s, due: r.due, last: today, ok: true }; // 畢業
    else { const gap = INTERVALS[s] - INTERVALS[s - 1]; const a = addDays(base, INTERVALS[s]), b = addDays(today, gap); next = { s, due: a > b ? a : b, last: today, ok: true }; }
  }
  const days = p.reviewDays ?? [];
  return { ...p, review: { ...p.review, [key]: next }, reviewDays: days.includes(today) ? days : [...days, today] };
}
/** 題目已經不在課裡（內容改版）：直接畢業，不再出 */
export const dropReview = (p: Progress, key: string): Progress => (p.review?.[key] ? { ...p, review: { ...p.review, [key]: { ...p.review[key], s: INTERVALS.length } } } : p);

/** 段考複習答錯的題：已經完成的課，把它加進（或提前到）明天的複習。不動課內的 r 紀錄 */
export function examMiss(p: Progress, keys: string[], today = todayStr()): Progress {
  const review = { ...(p.review ?? {}) };
  let changed = false;
  for (const k of keys) {
    if (!live(p, k)) continue;
    const tomorrow = addDays(today, 1), r = review[k];
    changed = true;
    if (!r) review[k] = { s: 0, due: tomorrow, ok: false };
    else review[k] = { ...r, s: Math.min(r.s, INTERVALS.length - 1), due: r.s >= INTERVALS.length || r.due > tomorrow ? tomorrow : r.due, ok: false };
  }
  return changed ? { ...p, review } : p;
}

/** 下一次複習是哪一天（今天以後最早到期的；沒有就 null＝都畢業了） */
export function nextDue(p: Progress, today = todayStr()): string | null {
  const ds = Object.entries(p.review ?? {}).filter(([k, r]) => r.s < INTERVALS.length && live(p, k)).map(([, r]) => (r.due > today ? r.due : addDays(today, 1)));
  return ds.sort()[0] ?? null;
}

/** 首頁卡片要的數字：只靠 localStorage 進度算，不需要任何題目內容 */
export interface HomeReview { due: number; legacy: number; doneToday: { n: number; right: number } | null; any: boolean }
export function homeReview(p: Progress, today = todayStr()): HomeReview {
  const done = answeredToday(p, today);
  const due = pickToday(p, today).length;
  return {
    due, legacy: legacyUnits(p, today, 1).length,
    doneToday: done.length ? { n: done.length, right: done.filter(([, r]) => r.ok).length } : null,
    any: Object.values(p.units).some((u) => u?.done),
  };
}
