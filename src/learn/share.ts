// 分享碼：把一課的作答（姓名、班級、座號、作答）壓成一段文字，學生貼給老師；備份碼也用同一套編碼
// 格式：`HR1.` + base64url(deflate-raw(JSON))；瀏覽器不支援 CompressionStream 時用 `HR1u.` + base64url(JSON)
// 網站沒有伺服器：碼只存在學生複製出去的地方，不會上傳
import type { Unit } from '../types';
import type { Profile, Progress, UnitProgress } from './progress';
import { toProgress } from './progress';
import { unitLevel, type Level } from './level';

export const CODE_MAX = 6000;

// ---- base64url ----
const b64u = (u8: Uint8Array) => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode(...u8.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const unb64u = (t: string) => { const s = atob(t.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((t.length + 3) % 4)); const u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; };
const hasCS = () => typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';
async function pipe(data: Uint8Array, ts: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const w = ts.writable.getWriter(); w.write(data as BufferSource).catch(() => {}); w.close().catch(() => {});
  return new Uint8Array(await new Response(ts.readable).arrayBuffer());
}

/** 物件 → 碼（prefix 是 'HR1' 或備份用的 'HRB1'） */
export async function pack(obj: unknown, prefix = 'HR1'): Promise<string> {
  const raw = new TextEncoder().encode(JSON.stringify(obj));
  if (hasCS()) { try { return `${prefix}.${b64u(await pipe(raw, new CompressionStream('deflate-raw')))}`; } catch { /* 退回不壓縮 */ } }
  return `${prefix}u.${b64u(raw)}`;
}
/** 碼 → 物件；格式不對丟 Error（訊息給人看） */
export async function unpack(code: string, prefix = 'HR1'): Promise<unknown> {
  const m = new RegExp(`^${prefix}(u?)\\.([A-Za-z0-9_-]+)$`).exec(code.trim());
  if (!m) throw new Error(`開頭不是「${prefix}.」，可能不是這個網站產生的碼，或複製時少了一段`);
  let bytes: Uint8Array;
  try { bytes = unb64u(m[2]); } catch { throw new Error('內容不是正確的編碼，可能複製時被截斷或多了字'); }
  if (!m[1]) {
    if (!hasCS()) throw new Error('這個瀏覽器不能解壓縮，請換新版 Chrome、Edge、Safari 或 Firefox');
    try { bytes = await pipe(bytes, new DecompressionStream('deflate-raw')); } catch { throw new Error('解壓縮失敗，碼可能被截斷或改過（請重新複製完整的碼）'); }
  }
  try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)); } catch { throw new Error('解開後不是正確的資料'); }
}

// ---- 一課的分享資料 ----
export interface Payload {
  v: 1; n?: string; c?: string; s?: string;
  /** 課 id、課名 */ u: string; t?: string;
  /** 等級（沒按完成＝省略） */ lv?: Level;
  /** 作答停留時間（秒） */ tm?: number; da?: string; at: string;
  /** 回顧的字 */ rc?: string;
  /** 作答（level.ts 檔頭定義的鍵）；回到自己 reflect 預設不放 */ a: Record<string, unknown>;
}
const KEEP = /^(r:|w:|qk\d|g\d|dp\d|d\d|s\d|cs\d|c\d+_\d)/;

export function buildPayload(u: Pick<Unit, 'id' | 'title' | 'steps'>, p: UnitProgress | undefined, who: Profile | undefined, opt: { reflect: boolean }): Payload {
  const a: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(p?.answers ?? {})) if (KEEP.test(k)) a[k] = v;
  if (opt.reflect && typeof p?.answers?.reflect === 'string' && (p.answers.reflect as string).trim()) a.reflect = p.answers.reflect;
  const lv = unitLevel(u, p);
  return { v: 1, n: who?.name?.trim() || undefined, c: who?.cls?.trim() || undefined, s: who?.no?.trim() || undefined, u: u.id, t: u.title, lv: lv ?? undefined, tm: p?.time, da: p?.doneAt, at: new Date().toISOString().slice(0, 10), rc: p?.recap?.trim() || undefined, a };
}
export const encodePayload = (pl: Payload) => pack(pl, 'HR1');
export const teacherLink = (code: string) => `${location.origin}${location.pathname}?mode=learn&view=teacher#code=${code}`;

/** 解出來的資料要有基本形狀才收 */
export function checkPayload(x: unknown): Payload {
  const o = x as Partial<Payload> | null;
  if (!o || typeof o !== 'object') throw new Error('解開後不是一課的作答');
  if (o.v !== 1) throw new Error(`版本 ${String((o as { v?: unknown }).v)} 不認得（這個網站讀得懂版本 1）`);
  if (typeof o.u !== 'string' || !o.u) throw new Error('裡面沒有課的代號');
  if (!o.a || typeof o.a !== 'object') throw new Error('裡面沒有作答');
  return o as Payload;
}
/** 分享資料 → 可以丟進 level.ts／report.ts 的進度（沒按完成的等級是 null） */
export const progOf = (pl: Payload): UnitProgress => ({ step: 0, done: !!pl.lv, doneAt: pl.da, recap: pl.rc, answers: pl.a, time: pl.tm, lastAt: pl.at });

/** 把貼上的一大段切成一個一個碼：換行或空白分隔；帶 #code= 的連結取出 code */
export function splitCodes(text: string): string[] {
  return text.split(/\s+/).map((t) => t.trim()).filter(Boolean).map((t) => { const i = t.indexOf('code='); return i >= 0 ? t.slice(i + 5) : t; });
}
export type Parsed = { n: number; code: string; payload: Payload } | { n: number; code: string; error: string };
export async function parseCodes(text: string): Promise<Parsed[]> {
  const out: Parsed[] = [];
  const seen = new Set<string>();
  let n = 0;
  for (const code of splitCodes(text)) {
    n++;
    if (seen.has(code)) { out.push({ n, code, error: '和前面的碼重複（已略過）' }); continue; }
    seen.add(code);
    try { out.push({ n, code, payload: checkPayload(await unpack(code, 'HR1')) }); }
    catch (e) { out.push({ n, code, error: (e as Error).message }); }
  }
  return out;
}

// ---- 備份碼（整份進度）----
export const packBackup = (p: Progress) => pack({ app: 'history-river-learn', v: 1, at: new Date().toISOString(), data: p }, 'HRB1');
export async function unpackBackup(text: string): Promise<Progress> {
  const t = text.trim();
  let raw: unknown;
  if (t.startsWith('{')) { try { raw = JSON.parse(t); } catch { throw new Error('這不是正確的備份檔（JSON 讀不懂）'); } }
  else raw = await unpack(t.replace(/\s+/g, ''), 'HRB1');
  const p = toProgress(raw);
  if (!p) throw new Error('裡面沒有學習進度，可能選錯檔案了');
  return p;
}
