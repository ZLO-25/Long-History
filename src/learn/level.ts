// 完成分三級（2026-11-15 試用報告 #13）：走完／做完／學會。不鎖「下一步」，等級由「有沒有作答」與「自我檢查答對率」算出來。
// 進度（UnitProgress.answers）新增的鍵，舊鍵全部保留（舊進度照常讀得出來）：
//   r:<題> = { f: 第一次是否答對, l: 最近一次是否答對, n: 嘗試次數, p?: 最近選的選項（選擇題原本的第幾個） }
//          <題>：s{步}＝史料第一問、s{步}k＝史料第二問（critique）、o{步}＝因果鏈、o{步}f＝追問（followup）、c{步}_{題}＝自我檢查的選擇／排序
//   w:<題> = { seen?, skip?, pts?: (boolean|null)[], more?: string }  開放題：看過參考說法、按了「我真的想不出來」、points 自評、補寫的一句
//          <題>：s{步}＝觀點比較／今日對照（文字存在 s{步}）、cs{步}_{題}＝自我檢查簡答（文字存在 cs{步}_{題}）、recap＝回顧（文字存在 prog.recap）
//   qk{步}_{j} = 'right'|'half'|'wrong'  card.quick 自評；g{步} = 猜猜看選的選項；dp{步} = 決策選的選項（原本的第幾個）
// 舊鍵：s{步}（史料選的選項數字／簡答文字）、c{步}_{題}（自我檢查第一次是否答對 true/false）、d{步}（決策自己寫的想法）仍照舊寫入。
import type { Step, Unit } from '../types';
import type { UnitProgress } from './progress';

export interface Rec { f: boolean; l: boolean; n: number; p?: number }
export interface Meta { seen?: boolean; skip?: boolean; pts?: (boolean | null)[]; more?: string }
export type Level = 'walked' | 'done' | 'mastered';
export const LEVELS: Record<Level, { icon: string; name: string; desc: string }> = {
  walked: { icon: '👣', name: '走完', desc: '從頭走到最後。還有一些題目沒作答，回去做做看會更有收穫。' },
  done: { icon: '✍️', name: '做完', desc: '每一題都作答了。' },
  mastered: { icon: '🏅', name: '學會', desc: '每一題都作答了，而且自我檢查最近一次答對八成以上。' },
};
export const MIN_CHARS = 15;

export interface Req { key: string; kind: 'rec' | 'open' | 'quick' | 'guess' | 'pick'; step: number; grade?: boolean; legacy?: string; textKey?: string; what: string }

/** 這一課所有「需要作答」的互動（骨架與完整單元都能算：骨架的 guess／critique／followup 是 true、card 有 nq） */
export function reqOf(u: Pick<Unit, 'steps'>): Req[] {
  const out: Req[] = [];
  (u.steps as any[]).forEach((s: Step & Record<string, any>, i: number) => {
    switch (s.type) {
      case 'hook': if (s.guess) out.push({ key: `g${i}`, kind: 'guess', step: i, what: '先猜猜看' }); break;
      case 'card': { const n = s.nq ?? s.quick?.length ?? 0; for (let j = 0; j < n; j++) out.push({ key: `qk${i}_${j}`, kind: 'quick', step: i, what: '讀完小題' }); break; }
      case 'source':
        out.push({ key: `s${i}`, kind: 'rec', step: i, legacy: `s${i}`, what: '史料判讀' });
        if (s.critique) out.push({ key: `s${i}k`, kind: 'rec', step: i, what: '史料第二問' });
        break;
      case 'chain':
        out.push({ key: `o${i}`, kind: 'rec', step: i, what: '因果鏈' });
        if (s.followup) out.push({ key: `o${i}f`, kind: 'rec', step: i, what: '因果鏈追問' });
        break;
      case 'compare': out.push({ key: `s${i}`, kind: 'open', step: i, textKey: `s${i}`, what: '觀點比較' }); break;
      case 'today': out.push({ key: `s${i}`, kind: 'open', step: i, textKey: `s${i}`, what: '今日對照' }); break;
      case 'decision': out.push({ key: `dp${i}`, kind: 'pick', step: i, legacy: `d${i}`, what: '你是決策者' }); break;
      case 'check': (s.items ?? []).forEach((q: any, j: number) => {
        if (q.kind === 'short') out.push({ key: `cs${i}_${j}`, kind: 'open', step: i, textKey: `cs${i}_${j}`, what: '自我檢查簡答' });
        else out.push({ key: `c${i}_${j}`, kind: 'rec', step: i, grade: true, legacy: `c${i}_${j}`, what: '自我檢查' });
      }); break;
      case 'recap': out.push({ key: 'recap', kind: 'open', step: i, textKey: 'recap', what: '回顧' }); break;
    }
  });
  return out;
}

type Ans = Record<string, any>;
export const recOf = (p: UnitProgress | undefined, key: string): Rec | undefined => {
  const r = p?.answers?.[`r:${key}`] as Rec | undefined;
  return r && typeof r === 'object' && typeof r.n === 'number' ? r : undefined;
};
export const metaOf = (p: UnitProgress | undefined, key: string): Meta | undefined => (p?.answers as Ans | undefined)?.[`w:${key}`];
export const textOf = (p: UnitProgress | undefined, r: Req): string => {
  const v = r.textKey === 'recap' ? p?.recap : (p?.answers as Ans | undefined)?.[r.textKey ?? ''];
  return typeof v === 'string' ? v : '';
};
export const charCount = (t: string) => [...t.trim()].length;
export const openOk = (text: string, meta?: Meta) => charCount(text) >= MIN_CHARS || !!meta?.skip;

/** 舊資料的對錯：自我檢查的 c{步}_{題} 是 boolean（第一次）；史料的 s{步} 是選的選項數字，要對 answer */
function legacyRight(u: Pick<Unit, 'steps'>, p: UnitProgress | undefined, r: Req): boolean | undefined {
  const v = (p?.answers as Ans | undefined)?.[r.legacy ?? ''];
  if (typeof v === 'boolean') return v;
  const a = (u.steps[r.step] as any)?.answer;
  return typeof v === 'number' && typeof a === 'number' ? v === a : undefined;
}
export function answered(u: Pick<Unit, 'steps'>, p: UnitProgress | undefined, r: Req): boolean {
  const A = (p?.answers ?? {}) as Ans;
  switch (r.kind) {
    case 'rec': return (recOf(p, r.key)?.n ?? 0) >= 1 || typeof A[r.legacy ?? ''] === 'boolean' || typeof A[r.legacy ?? ''] === 'number';
    case 'open': return openOk(textOf(p, r), metaOf(p, r.key));
    case 'quick': return typeof A[r.key] === 'string';
    case 'guess': return typeof A[r.key] === 'number';
    case 'pick': return typeof A[r.key] === 'number' || (typeof A[r.legacy ?? ''] === 'string' && A[r.legacy ?? ''].trim().length > 0);
  }
}
export const firstRight = (u: Pick<Unit, 'steps'>, p: UnitProgress | undefined, r: Req) => { const x = recOf(p, r.key); return x ? x.f : legacyRight(u, p, r); };
export const lastRight = (u: Pick<Unit, 'steps'>, p: UnitProgress | undefined, r: Req) => { const x = recOf(p, r.key); return x ? x.l : legacyRight(u, p, r); };

export interface UnitStat {
  reqs: Req[]; total: number; answered: number; missing: Req[];
  /** 選擇與排序題（含史料第二問、追問）答對：第一次／最近一次 */
  recTotal: number; first: number; last: number;
  /** 自我檢查（選擇＋排序）最近一次答對 */
  gradeTotal: number; gradeLast: number;
}
export function unitStat(u: Pick<Unit, 'steps'>, p: UnitProgress | undefined): UnitStat {
  const reqs = reqOf(u);
  const missing = reqs.filter((r) => !answered(u, p, r));
  const rec = reqs.filter((r) => r.kind === 'rec' && answered(u, p, r)), grade = reqs.filter((r) => r.grade);
  return {
    reqs, total: reqs.length, answered: reqs.length - missing.length, missing,
    recTotal: reqs.filter((r) => r.kind === 'rec').length,
    first: rec.filter((r) => firstRight(u, p, r)).length, last: rec.filter((r) => lastRight(u, p, r)).length,
    gradeTotal: grade.length, gradeLast: grade.filter((r) => answered(u, p, r) && lastRight(u, p, r)).length,
  };
}
/** 等級：沒按「完成」＝null；按了但還有題目沒作答＝走完；都作答＝做完；再加自我檢查最近一次答對 ≥ 80%＝學會 */
export function unitLevel(u: Pick<Unit, 'steps'>, p: UnitProgress | undefined): Level | null {
  if (!p?.done) return null;
  if (!u.steps.length) return 'walked'; // 骨架還沒到
  const st = unitStat(u, p);
  if (st.missing.length) return 'walked';
  if (st.gradeTotal && st.gradeLast / st.gradeTotal < 0.8) return 'done';
  return 'mastered';
}
export const levelText = (l: Level) => `${LEVELS[l].icon} ${LEVELS[l].name}`;

/** 走過的步驟：新進度存 seen；舊進度沒有 seen，視為 0..step-1 都走過 */
export const seenSet = (p: UnitProgress | undefined): Set<number> => new Set(p?.seen ?? Array.from({ length: Math.max(0, p?.step ?? 0) }, (_, i) => i));

/** 自己寫的文字回答（觀點比較、今日對照、自我檢查簡答、回顧；reflect 另外放） */
export function writingsOf(u: Pick<Unit, 'steps' | 'mystery'>, p: UnitProgress | undefined) {
  const A = (p?.answers ?? {}) as Ans;
  const out: { label: string; text: string; more?: string }[] = [];
  (u.steps as any[]).forEach((s, i) => {
    const v = A[`s${i}`];
    if ((s.type === 'compare' || s.type === 'today') && typeof v === 'string' && v.trim()) out.push({ label: `第 ${i + 1} 步・${s.question ?? ''}`, text: v.trim(), more: A[`w:s${i}`]?.more?.trim() || undefined });
    if (s.type === 'check') (s.items ?? []).forEach((q: any, j: number) => {
      const t = A[`cs${i}_${j}`];
      if (q.kind === 'short' && typeof t === 'string' && t.trim()) out.push({ label: `第 ${i + 1} 步・自我檢查第 ${j + 1} 題・${q.q ?? ''}`, text: t.trim(), more: A[`w:cs${i}_${j}`]?.more?.trim() || undefined });
    });
  });
  if (p?.recap?.trim()) out.push({ label: `回顧・${u.mystery}`, text: p.recap.trim(), more: (A['w:recap'] as Meta | undefined)?.more?.trim() || undefined });
  return out;
}
