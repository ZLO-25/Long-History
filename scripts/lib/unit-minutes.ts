// 單元的預估時間（依字數自動算，2026-11-15 試用報告 #9）
// 必讀 minutes_must＝（引子＋各步驟題目文字＋每張卡「故事＋focus 段落」字數）÷ 300 字／分 ＋ 每個互動 1.5 分鐘；
// 全部 minutes_all＝同樣的算法，但每張卡讀全文（所有段落、史料、史家爭論、名詞小抄…）。四捨五入到 5 分鐘（至少 5）。
// step_min：每一步的必讀分鐘（未四捨五入），畫面上算上下半段用。
export const CPM = 300, PER_INTERACTION = 1.5;
const len = (v: unknown) => (typeof v === 'string' ? v.replace(/\[s\d+\]/g, '').replace(/\s+/g, '').length : 0);
const lens = (xs: unknown): number => (Array.isArray(xs) ? xs.reduce((a: number, x) => a + lens(x), 0) : typeof xs === 'string' ? len(xs) : 0);
export const round5 = (m: number) => Math.max(5, Math.round(m / 5) * 5);

type Card = { sections?: { code: string; text?: string; role?: string }[]; learn?: any };

/** 卡片的必讀字數：故事＋focus 的段落；all＝全文 */
export function cardChars(c: Card | undefined, focus: string[] | undefined, all: boolean): number {
  const L = c?.learn; if (!L) return 0;
  let n = len(L.story);
  const secs = c?.sections ?? [];
  const want = (code: string) => all || (focus ?? []).includes(code);
  for (const s of secs) if (s.text && want(s.code)) n += len(s.text);
  if (want('sources')) n += (L.primary_source ?? []).reduce((a: number, p: any) => a + len(p.text), 0);
  if (want('debate')) n += len(L.historiography);
  if (want('terms')) n += (L.key_terms ?? []).reduce((a: number, t: any) => a + len(t.term) + len(t.plain) + len(t.example), 0);
  if (all) n += lens(L.misconceptions) + len(L.money_scale) + len(L.exaggerated) + len(L.hindsight) + (L.pop_culture ?? []).reduce((a: number, p: any) => a + len(p.claim) + len(p.fact), 0);
  return n;
}

const mcqChars = (q: any) => len(q?.question ?? q?.q) + lens(q?.options);

/** 單一步驟：回傳 [字數, 互動數]；all＝卡片讀全文 */
export function stepLoad(s: any, byCard: (id: string) => Card | undefined, all: boolean, unit: any): [number, number] {
  switch (s.type) {
    case 'hook': return [len(s.text) + (s.guess ? len(s.guess.q) + lens(s.guess.options) : 0), s.guess ? 1 : 0];
    case 'card': return [len(s.prompt) + cardChars(byCard(s.id), s.focus, all) + (s.quick ?? []).reduce((a: number, q: any) => a + len(q.q), 0), (s.quick ?? []).length];
    case 'source': {
      const p = byCard(s.card)?.learn?.primary_source?.[s.idx ?? 0];
      return [len(p?.text) + mcqChars(s) + (s.critique ? mcqChars(s.critique) : 0), 1 + (s.critique ? 1 : 0)];
    }
    case 'chain': return [len(s.prompt) + lens(s.items) + (s.followup ? mcqChars(s.followup) : 0), 1 + (s.followup ? 1 : 0)];
    case 'compare': return [len(s.prompt) + (s.rows ?? []).reduce((a: number, r: any) => a + len(r.aspect) + len(r.a) + len(r.b), 0) + len(s.question), 1];
    case 'decision': return [len(s.situation) + (s.options ?? []).reduce((a: number, o: any) => a + len(o.label), 0), 1];
    case 'today': {
      const c = byCard(s.card);
      const hook = c?.sections?.find((x) => x.role === 'today_hook')?.text, no = c?.sections?.find((x) => x.role === 'non_analogous')?.text;
      return [len(hook) + len(no) + len(s.question), 1];
    }
    case 'sim': return [len(s.prompt) + CPM, 1]; // 玩模擬大約 1 分鐘
    case 'peoples': return [len(s.prompt) + CPM, 0];
    case 'check': return [(s.items ?? []).reduce((a: number, q: any) => a + len(q.q) + lens(q.options) + lens(q.items), 0), (s.items ?? []).length];
    case 'recap': return [len(unit.mystery) + len(unit.reflect), unit.reflect ? 2 : 1];
  }
  return [0, 0];
}

export function unitMinutes(u: any, byCard: (id: string) => Card | undefined) {
  const steps: any[] = u.steps ?? [];
  const must = steps.map((s) => stepLoad(s, byCard, false, u)), all = steps.map((s) => stepLoad(s, byCard, true, u));
  const min = (x: [number, number]) => x[0] / CPM + x[1] * PER_INTERACTION;
  const sum = (xs: [number, number][]) => xs.reduce((a, x) => a + min(x), 0);
  return { minutes_must: round5(sum(must)), minutes_all: round5(sum(all)), step_min: must.map((x) => Math.round(min(x) * 10) / 10) };
}
