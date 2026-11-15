// 第 6 期：學習模式的資料（data/histories.yaml、data/units/*.yaml）讀取、檢查與編譯
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { ROOT, readYaml, refsOf, type RawCard } from './cards.ts';
import { exists } from './check.ts';
import { SECTIONS, type CardType } from './fields.ts';

export interface History {
  id: string; name: string; track: '臺灣' | '東亞' | '世界' | '全部' | '專題';
  civs?: string[]; theme?: CardType[]; all?: boolean; blurb?: string;
}
export interface LearnIssue { file: string; level: 'error' | 'warning'; msg: string }

export function loadHistories(): History[] {
  return exists('data/histories.yaml') ? readYaml('data/histories.yaml')?.histories ?? [] : [];
}
// 卡片 learn.histories 可以寫史名（臺灣史）或 id（taiwan）
export function historyKeys(hs: History[]) { return new Set(hs.flatMap((h) => [h.id, h.name])); }
export const historyId = (hs: History[], key: string) => hs.find((h) => h.id === key || h.name === key)?.id;

// 依 civilization（已對應成「地區/文明/時期」路徑）與卡片類型推算屬於哪些史
export function inferHistories(hs: History[], civPaths: string[], type: CardType): string[] {
  const civNames = new Set(civPaths.map((p) => p.split('/')[1]).filter(Boolean));
  return hs.filter((h) => h.all || (h.civs ?? []).some((c) => civNames.has(c)) || (h.theme ?? []).includes(type)).map((h) => h.id);
}

// 學習模式三軌：臺灣 → 東亞 → 世界（依文明路徑判斷，臺灣優先）
export function learnTrack(civPaths: string[]): '臺灣' | '東亞' | '世界' {
  if (civPaths.some((p) => p.startsWith('東亞/臺灣'))) return '臺灣';
  if (civPaths.some((p) => p.startsWith('東亞/'))) return '東亞';
  return '世界';
}

export function loadUnits(): { file: string; unit: any }[] {
  const dir = path.join(ROOT, 'data', 'units');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.yaml') && !f.startsWith('_')).sort()
    .map((f) => ({ file: `data/units/${f}`, unit: YAML.parse(fs.readFileSync(path.join(dir, f), 'utf8')) }));
}

const STEP_TYPES = ['hook', 'card', 'source', 'chain', 'compare', 'decision', 'today', 'sim', 'peoples', 'check', 'recap'] as const;
// 人群圖層能打開的頁（peoples 步驟、ref 寫 peoples:<頁>）：說明、為什麼不畫人種、遷徙清單、各條遷徙、各國
let peoplePages: Set<string> | null = null;
const peoplePage = (id: string) => {
  peoplePages ??= new Set(['intro', 'about', 'migrations',
    ...readYaml('data/peoples/migrations.yaml').map((m: any) => `mig-${m.id}`), ...Object.keys(readYaml('data/peoples/countries.yaml'))]);
  return peoplePages.has(id);
};
const DEPTHS = ['story', 'understand', 'deep'];
const SIMS = ['debase', 'bankrun', 'bubble'];
const REQUIRED_STEPS = ['source', 'chain', 'compare', 'decision', 'today', 'check', 'recap'];

// 2026-11 新欄位的格式檢查（全部選填，有寫就要寫對；規格見 docs/learn-units.md 最後一節）
const nonEmpty = (v: any) => typeof v === 'string' && v.trim().length > 0;
const FOCUS_EXTRA = ['story', 'sources', 'debate', 'terms', 'misc', 'exaggerated', 'hindsight'];
const HAS_YEAR = /\d{4}|^\s*(西元|公元)?前?\d{1,4}\s*年/;
// 全站「正確選項最長（或並列最長）」的統計：validate 結尾印一行
const longestTally = { total: 0, longest: 0 };
let exitHook = false;
const isLongest = (q: { options: string[]; answer: number }) => {
  const a = String(q.options[q.answer] ?? '').length;
  return q.options.every((o, i) => i === q.answer || String(o).length <= a);
};

// eligible：有 learn 區塊、交叉查核通過的卡
export function checkUnits(units: { file: string; unit: any }[], cards: RawCard[], hs: History[], eligible: Set<string>): LearnIssue[] {
  const out: LearnIssue[] = [];
  longestTally.total = 0; longestTally.longest = 0;
  // validate.ts 的最後一行之後再印全站統計（只在 npm run validate 時）
  if (!exitHook && /validate/.test(process.argv[1] ?? '')) {
    exitHook = true;
    process.on('exit', () => { if (longestTally.total) console.log(`選擇題「正確選項最長或並列最長」：${longestTally.longest}／${longestTally.total}（${Math.round((longestTally.longest / longestTally.total) * 100)}%；目標 ≤ 50%）`); });
  }
  const byId = new Map(cards.map((c) => [c.fm?.id, c]));
  const unitIds = new Set(units.map((u) => u.unit?.id));
  const hk = historyKeys(hs);
  for (const { file, unit: u } of units) {
    const err = (msg: string) => out.push({ file, level: 'error', msg });
    const warn = (msg: string) => out.push({ file, level: 'warning', msg });
    if (!u) { err('檔案是空的'); continue; }
    if (!/^unit-[a-z0-9-]+$/.test(u.id ?? '')) err(`id 必須是 unit-英文短名：「${u.id}」`);
    if (path.basename(file, '.yaml') !== u.id) err(`檔名應為 ${u.id}.yaml`);
    for (const k of ['title', 'mystery']) if (!u[k]) err(`缺 ${k}`);
    if (!Array.isArray(u.goals) || !u.goals.length) err('goals 至少 1 個');
    if (typeof u.minutes !== 'number') err('minutes 必須是數字（預估自學分鐘數）');
    if (!Array.isArray(u.histories) || !u.histories.length) err('histories 至少 1 個');
    for (const h of u.histories ?? []) if (!hk.has(h)) err(`histories 的「${h}」不在 data/histories.yaml`);
    for (const n of u.next ?? []) if (!unitIds.has(n)) err(`next 指向不存在的單元：${n}`);
    if (!Array.isArray(u.next) || u.next.length < 2) warn('「接下來可以挖」建議 2–3 個單元');

    const useCard = (id: string, where: string) => {
      const c = byId.get(id);
      if (!c) { err(`${where}：卡片 ${id} 不存在`); return null; }
      if (!eligible.has(id)) err(`${where}：卡片 ${id} 還不能進入學習模式（需要 learn 區塊且交叉查核通過）`);
      return c;
    };
    // ref 寫法：card-id 或 card-id#A2（連回卡片的某一段）
    const useRef = (ref: any, where: string) => {
      if (!ref) return;
      if (String(ref).startsWith('peoples:')) { if (!peoplePage(String(ref).slice(8))) err(`${where}：人群圖層沒有「${String(ref).slice(8)}」這一頁`); return; }
      const [id, code] = String(ref).split('#');
      const c = useCard(id, where);
      if (c && code && code !== 'story' && !SECTIONS[c.fm.type as CardType]?.some((d) => d.code === code)) err(`${where}：${id} 沒有段落 ${code}`);
    };
    const needHints = (s: any, where: string) => { if (!Array.isArray(s.hints) || s.hints.length < 2 || s.hints.length > 3) err(`${where}：hints 要 2–3 段逐步提示`); };
    // 選擇題的 why_wrong：與 options 等長，正解那格 null，其餘每格一句話
    const checkWhy = (q: any, where: string) => {
      if (q.why_wrong === undefined) return;
      if (!Array.isArray(q.why_wrong) || !Array.isArray(q.options) || q.why_wrong.length !== q.options.length) { err(`${where}：why_wrong 要是和 options 等長的陣列`); return; }
      q.why_wrong.forEach((x: any, k: number) => {
        if (k === q.answer) { if (x !== null) err(`${where}：why_wrong 正解那格（第 ${k + 1} 個）要寫 null`); }
        else if (!nonEmpty(x)) err(`${where}：why_wrong 第 ${k + 1} 格要寫一句話（說明為什麼錯）`);
      });
    };
    // 第二問（source.critique、chain.followup）：和一般選擇題一樣
    const checkMcq = (q: any, where: string) => {
      if (q === undefined) return;
      if (!q || typeof q !== 'object' || !nonEmpty(q.question) || !Array.isArray(q.options) || q.options.length < 2 || typeof q.answer !== 'number' || !q.options[q.answer] || !nonEmpty(q.explain)) { err(`${where}：需要 question、options（≥2）、answer（第幾個，從 0 起）、explain`); return; }
      checkWhy(q, where);
    };
    const checkPoints = (s: any, where: string) => {
      if (s.points === undefined) return;
      if (!Array.isArray(s.points) || s.points.length < 2 || s.points.length > 4 || s.points.some((x: any) => !nonEmpty(x))) err(`${where}：points 要 2–4 個重點（每個一句話）`);
    };
    const mcqs: { options: string[]; answer: number }[] = [];
    const addMcq = (q: any) => { if (q && Array.isArray(q.options) && typeof q.answer === 'number' && q.options[q.answer] !== undefined) mcqs.push(q); };
    const seen = new Set<string>();
    (u.steps ?? []).forEach((s: any, i: number) => {
      const w = `steps[${i}]（${s?.type}）`;
      if (!STEP_TYPES.includes(s?.type)) { err(`${w}：type 必須是 ${STEP_TYPES.join('|')}`); return; }
      seen.add(s.type);
      switch (s.type) {
        case 'hook':
          if (!s.text) err(`${w}：缺 text`);
          if (s.guess !== undefined) {
            const g = s.guess;
            if (!g || !nonEmpty(g.q) || !Array.isArray(g.options) || g.options.length < 3 || g.options.some((o: any) => !nonEmpty(o)) || !nonEmpty(g.reveal)) err(`${w}：guess 需要 q、options（至少 3 個）、reveal`);
            else if (g.options.length > 4) warn(`${w}：guess 的選項建議 3–4 個`);
          }
          break;
        case 'card': {
          const c = useCard(s.id, w);
          if (!DEPTHS.includes(s.depth)) err(`${w}：depth 必須是 story|understand|deep`);
          if (s.focus !== undefined) {
            if (!Array.isArray(s.focus)) err(`${w}：focus 要是代號清單，例如 [C2, C5]`);
            else for (const code of s.focus) {
              const ok = FOCUS_EXTRA.includes(code) || (c && SECTIONS[c.fm.type as CardType]?.some((d) => d.code === code));
              if (c && !ok) err(`${w}：focus 的「${code}」不是 ${s.id} 的段落代號（可用：${[...FOCUS_EXTRA, ...(SECTIONS[c.fm.type as CardType] ?? []).map((d) => d.code)].join('、')}）`);
            }
          }
          if (s.quick !== undefined) {
            if (!Array.isArray(s.quick) || s.quick.length < 1 || s.quick.length > 2) err(`${w}：quick 要 1–2 題`);
            else s.quick.forEach((q: any, k: number) => { if (!q || !nonEmpty(q.q) || !nonEmpty(q.a)) err(`${w}：quick 第 ${k + 1} 題需要 q 與 a`); });
          }
          break;
        }
        case 'source': {
          const c = useCard(s.card, w);
          if (c && !c.fm.learn?.primary_source?.[s.idx ?? 0]) err(`${w}：${s.card} 沒有第 ${s.idx ?? 0} 筆 primary_source`);
          if (!s.question || !Array.isArray(s.options) || typeof s.answer !== 'number' || !s.explain) err(`${w}：需要 question、options、answer（第幾個，從 0 起）、explain`);
          needHints(s, w); useRef(s.ref, w);
          checkWhy(s, w); checkMcq(s.critique, `${w} critique`); addMcq(s); addMcq(s.critique); break;
        }
        case 'chain':
          if (!s.prompt || !Array.isArray(s.items) || s.items.length < 3 || !s.explain) err(`${w}：需要 prompt、items（正確順序，至少 3 個）、explain`);
          needHints(s, w); useRef(s.ref, w); checkMcq(s.followup, `${w} followup`); addMcq(s.followup);
          if (Array.isArray(s.items) && s.items.length >= 3 && s.items.filter((x: any) => HAS_YEAR.test(String(x))).length > s.items.length / 2) warn(`${w}：因果鏈的選項多數帶年份，會變成排年代；請拿掉年份，改問因果`);
          break;
        case 'compare':
          if (!Array.isArray(s.cards) || s.cards.length !== 2) err(`${w}：cards 要剛好 2 張`);
          for (const id of s.cards ?? []) useCard(id, w);
          if (!Array.isArray(s.rows) || !s.rows.length || !s.question || !s.model_answer) err(`${w}：需要 rows（aspect、a、b）、question、model_answer`);
          needHints(s, w); checkPoints(s, w); break;
        case 'decision':
          if (!s.role || !s.situation || !Array.isArray(s.options) || s.options.length < 2 || !s.actual) err(`${w}：需要 role、situation、options（≥2，各有 label 與 result）、actual`);
          for (const o of s.options ?? []) if (!o.label || !o.result) err(`${w}：每個選項要有 label 與 result`);
          useRef(s.ref, w); if (!s.ref) err(`${w}：要用 ref 連回歷史卡`); break;
        case 'today': {
          const c = useCard(s.card, w);
          if (c && !c.sections.some((x) => /^(A12|B10|C10|D8|T8|F8|E8|P9)$/.test(x.code) && x.text)) err(`${w}：${s.card} 沒有「不可類比的差異」段落`);
          if (!s.question || !s.model_answer) err(`${w}：需要 question（這個類比哪裡不成立？）與 model_answer`);
          checkPoints(s, w); break;
        }
        case 'sim': if (!SIMS.includes(s.sim)) err(`${w}：sim 必須是 ${SIMS.join('|')}`); break;
        case 'peoples': if (!peoplePage(String(s.id))) err(`${w}：人群圖層沒有「${s.id}」這一頁`); if (!s.prompt) err(`${w}：缺 prompt（看的時候注意什麼）`); break;
        case 'check':
          if (!Array.isArray(s.items) || !s.items.length) { err(`${w}：items 至少 1 題`); break; }
          s.items.forEach((q: any, j: number) => {
            const qw = `${w} 第 ${j + 1} 題`;
            if (!['choice', 'order', 'short'].includes(q.kind)) err(`${qw}：kind 必須是 choice|order|short`);
            if (!q.q || !q.explain) err(`${qw}：需要 q 與 explain`);
            if (q.kind === 'choice' && (!Array.isArray(q.options) || typeof q.answer !== 'number')) err(`${qw}：選擇題需要 options 與 answer`);
            if (q.kind === 'order' && (!Array.isArray(q.items) || q.items.length < 3)) err(`${qw}：排序題需要 items（正確順序）`);
            if (q.kind === 'short' && !q.model) err(`${qw}：簡答題需要 model（參考說法）`);
            needHints(q, qw); useRef(q.ref, qw);
            if (q.kind === 'choice') { checkWhy(q, qw); addMcq(q); }
            if (q.kind === 'short') checkPoints(q, qw);
          });
          break;
        case 'recap': if (!s.model_answer) err(`${w}：需要 model_answer（參考說法）`); checkPoints(s, w); break;
      }
      for (const k of ['text', 'situation', 'explain', 'actual']) if (s[k] && refsOf(String(s[k])).length) warn(`${w}：單元文字不要用 [s1] 代號，請用 ref 連回卡片`);
    });
    if (u.reflect !== undefined) {
      if (typeof u.reflect !== 'string' || !u.reflect.trim()) err('reflect 要是一句反思題（字串）');
      else if (refsOf(u.reflect).length) warn('reflect 不要用 [s1] 代號：反思題不放新史實');
    } else warn('建議加 reflect：回顧後「回到自己」的反思題（見 docs/lu-method.md）');
    const cc = u.crosscheck;
    // 選擇題的作答線索：正確選項如果常常是最長的，學生不讀內容也猜得到（2026-11-11 教育者複查；2026-11-15 改為超過一半就警告）
    {
      const longest = mcqs.filter(isLongest).length;
      longestTally.total += mcqs.length; longestTally.longest += longest;
      if (mcqs.length >= 3 && longest / mcqs.length > 0.5) warn(`${mcqs.length} 題選擇題裡有 ${longest} 題（${Math.round((longest / mcqs.length) * 100)}%）正確選項是最長或並列最長：請把誘答寫長一點或把正解寫短（選項順序畫面上會自動打亂，位置不必調）`);
    }
    if (!cc) warn('還沒有交叉查核紀錄（crosscheck），不會出現在學習模式');
    else if (cc.result !== '通過') warn('交叉查核不通過，不會出現在學習模式');
    // 上下兩半的長單元：companion 指向另一半，完整步驟（史料、因果鏈、比較、決策、今日對照…）只要兩半合起來齊全即可
    const comp = u.companion ? units.find((x) => x.unit?.id === u.companion)?.unit : null;
    if (u.companion && !comp) err(`companion 指向不存在的單元：${u.companion}`);
    if (comp && comp.companion !== u.id) err(`companion 要互相指向：${u.companion} 沒有指回 ${u.id}`);
    for (const x of comp?.steps ?? []) seen.add(x.type);
    for (const t of REQUIRED_STEPS) if (!seen.has(t)) err(`單元缺少「${t}」步驟（每個單元都要有史料判讀、因果鏈、觀點比較、決策、今日對照、自我檢查、回顧）`);
  }
  return out;
}
