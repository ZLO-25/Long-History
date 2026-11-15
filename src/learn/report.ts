// 一課的作答整理成「一題一列」：匯出頁、學習紀錄、老師檢視頁共用（純函式，不碰畫面）
// 只讀 level.ts 定義的進度鍵（r:、w:、qk、g、dp、d、s、cs、recap，以及第 4f 批的 m、x、xo、im、t），舊進度照樣讀得出來
import type { Unit } from '../types';
import type { Profile, UnitProgress } from './progress';
import { answered, firstRight, lastRight, LEVELS, metaOf, recOf, reqOf, textOf, unitLevel, unitStat, type Level, type Req } from './level';

export const RATE_TEXT: Record<string, string> = { right: '答對', half: '一半', wrong: '沒答對' };
const LETTER = 'ABCDEF';

/** 作答停留時間：舊進度沒有 time 欄位就顯示「—」 */
export function fmtTime(sec?: number): string {
  if (typeof sec !== 'number' || !isFinite(sec) || sec < 0) return '—';
  if (sec < 60) return '不到 1 分鐘';
  const m = Math.round(sec / 60);
  return m >= 60 ? `約 ${Math.floor(m / 60)} 小時 ${m % 60} 分鐘` : `約 ${m} 分鐘`;
}
export const minutesOf = (sec?: number): number | '' => (typeof sec === 'number' && isFinite(sec) ? Math.round((sec / 60) * 10) / 10 : '');

export interface Row {
  key: string; step: number; kind: 'guess' | 'quick' | 'rec' | 'open' | 'pick' | 'think';
  /** 步驟名稱＋第幾題，例如「史料判讀」「自我檢查 2」 */
  what: string; label: string; q: string; answered: boolean;
  /** rec：第一次／最後是否答對、嘗試次數、最後選的選項（文字） */
  f?: boolean; l?: boolean; n?: number; chose?: string; right?: string;
  /** open／think：自己寫的字；自評勾選；補寫；按了「我真的想不出來」 */
  text?: string; pts?: { t: string; v: boolean | null }[]; more?: string; skip?: boolean;
  /** guess／quick／pick：選了什麼 */
  value?: string;
}

type U = Pick<Unit, 'steps'> & Partial<Pick<Unit, 'mystery'>>;

/** 這一課每個互動一列（p 可以是 undefined：只要題目，用來當老師表格的欄） */
export function rowsOf(u: U, p?: UnitProgress): Row[] {
  const A = (p?.answers ?? {}) as Record<string, any>;
  const out: Row[] = [];
  const steps = u.steps as any[];
  for (const r of reqOf(u)) {
    const s = steps[r.step] ?? {};
    const base = (what: string, q: string, kind: Row['kind'] = r.kind as Row['kind']): Row => ({ key: r.key, step: r.step, kind, what, label: `第 ${r.step + 1} 步・${what}`, q, answered: answered(u, p, r) });
    switch (r.kind) {
      case 'guess': {
        const g = typeof s.guess === 'object' ? s.guess : null;
        out.push({ ...base('先猜猜看', g?.q ?? '先猜猜看'), value: g && typeof A[r.key] === 'number' ? g.options[A[r.key]] : undefined });
        break;
      }
      case 'quick': {
        const j = Number(r.key.split('_')[1]);
        out.push({ ...base(`讀完小題 ${j + 1}`, s.quick?.[j]?.q ?? `小題 ${j + 1}`), value: RATE_TEXT[A[r.key]] });
        break;
      }
      case 'rec': {
        let q = '', opts: string[] | undefined, ans: number | undefined, what = r.what;
        const m = /^c(\d+)_(\d+)$/.exec(r.key);
        if (m) { const it = s.items?.[Number(m[2])]; q = it?.q ?? ''; opts = it?.kind === 'choice' ? it.options : undefined; ans = it?.answer; what = `自我檢查 ${Number(m[2]) + 1}`; }
        else if (r.key === `s${r.step}k`) { q = s.critique?.question ?? ''; opts = s.critique?.options; ans = s.critique?.answer; }
        else if (r.key === `o${r.step}`) { q = s.prompt ?? ''; }
        else if (r.key === `o${r.step}f`) { q = s.followup?.question ?? ''; opts = s.followup?.options; ans = s.followup?.answer; }
        else if (r.key === `m${r.step}`) { q = s.question ?? ''; opts = (s.places ?? []).map((x: any) => x.label); ans = s.answer; } // 看地圖回答：選項是地圖上的 A、B、C…，報表上寫地名
        else { q = s.question ?? ''; opts = s.options; ans = s.answer; }
        const rc = recOf(p, r.key);
        const pick = rc?.p ?? (r.key === `s${r.step}` && typeof A[r.key] === 'number' ? (A[r.key] as number) : undefined);
        const row = base(what, q);
        const ok = answered(u, p, r);
        out.push({ ...row, f: ok ? firstRight(u, p, r) : undefined, l: ok ? lastRight(u, p, r) : undefined, n: rc?.n,
          chose: opts && pick != null && opts[pick] != null ? `${LETTER[pick] ?? ''}．${opts[pick]}` : undefined,
          right: opts && ans != null ? `${LETTER[ans] ?? ''}．${opts[ans]}` : undefined });
        break;
      }
      case 'open': {
        const m = metaOf(p, r.key);
        let q = s.question ?? '', points: string[] | undefined = s.points, what = r.what;
        const mc = /^cs(\d+)_(\d+)$/.exec(r.key);
        if (mc) { const it = s.items?.[Number(mc[2])]; q = it?.q ?? ''; points = it?.points; what = `自我檢查簡答 ${Number(mc[2]) + 1}`; }
        if (r.key === `xo${r.step}`) { q = s.open?.question ?? ''; points = s.open?.points; } // 兩份史料對讀的開放題
        if (r.key === 'recap') q = `用自己的話回答一開始的謎題${u.mystery ? `：${u.mystery}` : ''}`;
        const marks = m?.pts ?? [];
        out.push({ ...base(what, q), text: textOf(p, r).trim(), more: m?.more?.trim() || undefined, skip: !!m?.skip,
          pts: points?.length && marks.some((x) => x !== null && x !== undefined) ? points.map((t, i) => ({ t, v: marks[i] ?? null })) : undefined });
        break;
      }
      case 'pick': {
        const t = typeof A[`d${r.step}`] === 'string' ? (A[`d${r.step}`] as string).trim() : '';
        out.push({ ...base('掩卷自思', `${s.role ?? ''}：先不看選項，你會怎麼做？為什麼？`, 'think'), key: `d${r.step}`, answered: !!t, text: t });
        const pk = A[r.key];
        out.push({ ...base('你是決策者', `${s.role ?? ''}：你的決定是？`), value: typeof pk === 'number' ? s.options?.[pk]?.label : undefined });
        break;
      }
    }
  }
  return out;
}

export const levelLabel = (u: Pick<Unit, 'steps'>, p?: UnitProgress) => { const l: Level | null = unitLevel(u, p); return l ? `${LEVELS[l].icon} ${LEVELS[l].name}` : '還沒按「完成」'; };
export const yn = (b?: boolean) => (b === undefined ? '—' : b ? '答對' : '答錯');

/** 純文字版（複製貼上給老師）。reflect＝要不要包含「回到自己」 */
export function reportText(u: Pick<Unit, 'steps' | 'title' | 'mystery'>, p: UnitProgress | undefined, who: Profile | undefined, opt: { reflect: boolean }): string {
  const st = unitStat(u, p);
  const L: string[] = [
    '歷史長河・這一課的作答',
    `姓名：${who?.name || '＿＿＿'}　班級：${who?.cls || '＿＿＿'}　座號：${who?.no || '＿＿'}`,
    `課名：《${u.title}》`,
    `等級：${levelLabel(u, p)}${p?.doneAt ? `（${p.doneAt} 完成）` : ''}　作答停留時間：${fmtTime(p?.time)}　實際作答 ${st.answered}／${st.total} 個互動`, '',
  ];
  for (const r of rowsOf(u, p)) {
    if (!r.answered && r.kind !== 'rec') { L.push(`【${r.label}】沒有作答`); continue; }
    L.push(`【${r.label}】${r.q}`);
    if (r.kind === 'rec') L.push(r.answered ? `  第一次：${yn(r.f)}　最後：${yn(r.l)}　嘗試 ${r.n ?? '—'} 次${r.chose ? `　最後選的：${r.chose}` : ''}` : '  沒有作答');
    else if (r.kind === 'open' || r.kind === 'think') {
      L.push(`  ${(r.text || (r.skip ? '（按了「我真的想不出來」）' : '')).replace(/\n/g, '\n  ')}`);
      if (r.pts) L.push(`  自評：${r.pts.map((x, i) => `${i + 1}.${x.v === true ? '有寫到' : x.v === false ? '沒寫到' : '未勾'}`).join('　')}`);
      if (r.more) L.push(`  補寫：${r.more}`);
    } else L.push(`  ${r.value ?? '—'}`);
  }
  const reflect = typeof p?.answers?.reflect === 'string' ? (p.answers.reflect as string).trim() : '';
  if (opt.reflect && reflect) L.push('', '【回到自己】', `  ${reflect.replace(/\n/g, '\n  ')}`);
  return L.join('\n');
}
