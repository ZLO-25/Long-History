// 單元裡的各種活動：史料判讀、因果鏈排序、觀點比較、決策情境、今日對照、自我檢查、回顧
import { useMemo, useRef, useState, type ReactNode } from 'react';
import type { Card, CheckItem, Index } from '../types';
import { LearnText } from './LearnText';

// 逐段提示：按一次多給一段
export function Hints({ hints }: { hints: string[] }) {
  const [n, setN] = useState(0);
  return (
    <div className="hints">
      {hints.slice(0, n).map((h, i) => <p key={i} className="hint">提示 {i + 1}：{h}</p>)}
      {n < hints.length && <button className="btn sm" onClick={() => setN(n + 1)}>{n === 0 ? '🤔 卡住了？給我提示' : '再給一個提示'}（{n}/{hints.length}）</button>}
    </div>
  );
}

// 連回卡片的某一段（ref 寫法 card-id#A2）
export function RefLink({ refStr, index, onCard }: { refStr?: string; index: Index; onCard: (id: string, section?: string) => void }) {
  if (!refStr) return null;
  const [id, code] = refStr.split('#');
  const c = index.cards.find((x) => x.id === id);
  if (!c) return null;
  const s = code ? c.sections.find((x) => x.code === code) : null;
  return <button className="link small" onClick={() => onCard(id, code)}>📖 回到卡片看：{c.name}{s ? `「${s.title}」` : ''}</button>;
}

const seeded = (seed: string) => { let h = 2166136261; for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296; };
// 打亂順序，而且保證不會剛好是正確順序
export function shuffled<T>(items: T[], seed: string): T[] {
  const r = seeded(seed);
  const a = [...items];
  for (let k = 0; k < 5; k++) {
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    if (a.some((x, i) => x !== items[i])) return a;
  }
  return [...a.slice(1), a[0]];
}

export function Choice({ q, options, answer, explain, hints, after, onDone, saved }: {
  q: ReactNode; options: string[]; answer: number; explain: string; hints: string[]; after?: ReactNode; onDone?: (v: number) => void; saved?: number;
}) {
  const [pick, setPick] = useState<number | null>(saved ?? null);
  const done = pick !== null;
  return (
    <div className="activity">
      <div className="q">{q}</div>
      <div className="options" role="radiogroup">
        {options.map((o, i) => (
          <button key={i} role="radio" aria-checked={pick === i} disabled={done}
            className={`opt ${done && i === answer ? 'right' : ''} ${done && pick === i && i !== answer ? 'wrong' : ''}`}
            onClick={() => { setPick(i); onDone?.(i); }}>
            <span className="opt-key">{'ABCDEF'[i]}</span>{o}
          </button>
        ))}
      </div>
      {!done && <Hints hints={hints} />}
      {done && (
        <div className={`feedback ${pick === answer ? 'ok' : 'no'}`}>
          <b>{pick === answer ? '✔ 答對了！' : `✘ 不太對。正確答案是 ${'ABCDEF'[answer]}。`}</b>
          <p>{explain}</p>{after}
          {pick !== answer && <button className="btn sm" onClick={() => setPick(null)}>再試一次</button>}
        </div>
      )}
    </div>
  );
}

// 因果鏈排序：點選（點下面的項目放進第一個空格、點格子裡的拿回來）或拖曳（滑鼠直接拖、手機按住 ⠿ 拖）都可以；
// 放好之後可以用 ↑↓ 微調；對答案後可以「只重排錯的」，排對的留在原位
type From = { slot: number } | { pool: true };
export function Order({ prompt, items, explain, hints, seed, after, onDone }: {
  prompt: ReactNode; items: string[]; explain: string; hints: string[]; seed: string; after?: ReactNode; onDone?: (ok: boolean) => void;
}) {
  const pool = useMemo(() => shuffled(items, seed), [items, seed]);
  const [seq, setSeq] = useState<(string | null)[]>(() => items.map(() => null));
  const [checked, setChecked] = useState(false);
  const [drag, setDrag] = useState<{ x: string; from: From; px: number; py: number; over: number | 'pool' | null } | null>(null);
  const justDragged = useRef(false);
  const start = useRef<{ x: string; from: From; sx: number; sy: number; moved: boolean; id: number } | null>(null);
  const full = seq.every(Boolean);
  const right = seq.filter((x, i) => x === items[i]).length;
  const inPool = pool.filter((x) => !seq.includes(x));

  const put = (x: string, from: From, to: number | 'pool') => setSeq((s0) => {
    const s = [...s0];
    if ('slot' in from) s[from.slot] = null;
    if (to === 'pool') return s;
    const old = s[to];
    s[to] = x;
    if (old && old !== x) { if ('slot' in from) s[from.slot] = old; } // 目標格有東西：兩個交換（從下面拖上來的，原本那個回到下面）
    return s;
  });
  const tapPool = (x: string) => { const i = seq.indexOf(null); if (i >= 0) put(x, { pool: true }, i); };
  const move = (i: number, d: number) => setSeq((s0) => { const s = [...s0]; const j = i + d; if (j < 0 || j >= s.length) return s0; [s[i], s[j]] = [s[j], s[i]]; return s; });

  const hit = (cx: number, cy: number): number | 'pool' | null => {
    const el = document.elementFromPoint(cx, cy) as HTMLElement | null;
    const sl = el?.closest('[data-slot]') as HTMLElement | null;
    if (sl) return Number(sl.dataset.slot);
    return el?.closest('[data-pool]') ? 'pool' : null;
  };
  const down = (e: React.PointerEvent, x: string, from: From) => {
    if (checked) return;
    // 手機只有按住 ⠿ 才拖（避免擋住捲動），滑鼠整顆都可以拖
    if (e.pointerType !== 'mouse' && !(e.target as HTMLElement).closest('.grip')) return;
    start.current = { x, from, sx: e.clientX, sy: e.clientY, moved: false, id: e.pointerId };
    const mv = (ev: PointerEvent) => {
      const st = start.current; if (!st || ev.pointerId !== st.id) return;
      if (!st.moved && Math.hypot(ev.clientX - st.sx, ev.clientY - st.sy) < 6) return;
      st.moved = true; ev.preventDefault();
      setDrag({ x: st.x, from: st.from, px: ev.clientX, py: ev.clientY, over: hit(ev.clientX, ev.clientY) });
    };
    const up = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      const st = start.current; start.current = null;
      if (st?.moved) { justDragged.current = true; setTimeout(() => { justDragged.current = false; }, 0); }
      if (st?.moved && ev.type === 'pointerup') { const to = hit(ev.clientX, ev.clientY); if (to !== null) put(st.x, st.from, to); }
      setDrag(null);
    };
    window.addEventListener('pointermove', mv, { passive: false }); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  };
  // 拖曳結束時瀏覽器還會送一次 click：拖過就不要再當成點選
  const clickGuard = (f: () => void) => () => { if (!justDragged.current) f(); };

  return (
    <div className="activity order">
      <div className="q">{prompt}</div>
      <p className="muted small">點下面的項目放進空格；也可以<b>拖曳</b>（手機按住 ⠿ 拖）。放好後用 ↑↓ 調整，點格子裡的項目可以拿回來。</p>
      <ol className="seq">
        {items.map((_, i) => {
          const x = seq[i];
          return <li key={i} data-slot={i} className={`slot ${checked ? (x === items[i] ? 'right' : 'wrong') : ''} ${drag?.over === i ? 'over' : ''}`}>
            {x ? <div className={`placed ${drag?.x === x ? 'dragging' : ''}`} onPointerDown={(e) => down(e, x, { slot: i })}>
              {!checked && <span className="grip" aria-hidden>⠿</span>}
              <button className="opt" disabled={checked} onClick={clickGuard(() => put(x, { slot: i }, 'pool'))} title="點一下拿回去">{x}</button>
              {!checked && <span className="nudge">
                <button className="btn sm" disabled={i === 0} onClick={() => move(i, -1)} aria-label={`把「${x}」往前移`}>↑</button>
                <button className="btn sm" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label={`把「${x}」往後移`}>↓</button>
              </span>}
            </div> : <span className="muted">（第 {i + 1} 個）{drag ? '放這裡' : ''}</span>}
          </li>;
        })}
      </ol>
      {!checked && <div className={`pool ${drag?.over === 'pool' ? 'over' : ''}`} data-pool>
        {inPool.map((x) => <div key={x} className={`pitem ${drag?.x === x ? 'dragging' : ''}`} onPointerDown={(e) => down(e, x, { pool: true })}>
          <span className="grip" aria-hidden>⠿</span><button className="opt" onClick={clickGuard(() => tapPool(x))}>{x}</button></div>)}
        {!inPool.length && <span className="muted small">全部放好了，按「對答案」。</span>}
      </div>}
      {drag && <div className="drag-ghost" style={{ left: drag.px, top: drag.py }}>{drag.x}</div>}
      {!checked && <div className="row"><button className="btn primary" disabled={!full} onClick={() => { setChecked(true); onDone?.(right === items.length); }}>對答案</button><Hints hints={hints} /></div>}
      {checked && (
        <div className={`feedback ${right === items.length ? 'ok' : 'no'}`}>
          <b>{right === items.length ? '✔ 全部排對！' : `排對 ${right}／${items.length} 個（綠色的是對的）。`}</b>
          {right !== items.length && <p>正確順序：{items.map((x, i) => `${i + 1}. ${x}`).join('　')}</p>}
          <p>{explain}</p>{after}
          <div className="row">
            {right !== items.length && <button className="btn sm" onClick={() => { setChecked(false); setSeq(seq.map((x, i) => (x === items[i] ? x : null))); }}>只重排錯的</button>}
            <button className="btn sm" onClick={() => { setChecked(false); setSeq(items.map(() => null)); }}>全部重排</button>
          </div>
        </div>
      )}
    </div>
  );
}

// 簡答：自己寫，再看參考說法（不自動評分）
export function Short({ q, model, hints, after, saved, onSave, label = '看參考說法' }: {
  q: ReactNode; model: string; hints?: string[]; after?: ReactNode; saved?: string; onSave?: (t: string) => void; label?: string;
}) {
  const [txt, setTxt] = useState(saved ?? '');
  const [show, setShow] = useState(false);
  return (
    <div className="activity">
      <div className="q">{q}</div>
      <textarea value={txt} onChange={(e) => { setTxt(e.target.value); onSave?.(e.target.value); }} placeholder="用自己的話寫寫看（只存在你的瀏覽器）" rows={3} />
      {!show && <div className="row"><button className="btn primary" onClick={() => setShow(true)}>{label}</button>{hints && <Hints hints={hints} />}</div>}
      {show && <div className="feedback model"><b>參考說法</b><p>{model}</p><p className="muted small">這不是標準答案。比一比：你的說法有沒有提到同樣的重點？有沒有參考說法沒想到的？</p>{after}</div>}
    </div>
  );
}

// onResult：回報這一題答對與否（簡答題不評分，回報 null），讓自我檢查那一步可以統計
export function CheckQ({ q, i, seed, index, onCard, onResult }: { q: CheckItem; i: number; seed: string; index: Index; onCard: (id: string, s?: string) => void; onResult?: (ok: boolean | null) => void }) {
  const after = <RefLink refStr={q.ref} index={index} onCard={onCard} />;
  const head = <><span className="qnum">第 {i + 1} 題</span> {q.q}</>;
  if (q.kind === 'choice') return <Choice q={head} options={q.options!} answer={q.answer!} explain={q.explain} hints={q.hints} after={after} onDone={(v) => onResult?.(v === q.answer)} />;
  if (q.kind === 'order') return <Order prompt={head} items={q.items!} explain={q.explain} hints={q.hints} seed={`${seed}-${i}`} after={after} onDone={(ok) => onResult?.(ok)} />;
  return <Short q={head} model={`${q.model}（${q.explain}）`} hints={q.hints} after={after} onSave={() => onResult?.(null)} />;
}

export function CompareTable({ a, b, rows }: { a: Card; b: Card; rows: { aspect: string; a: string; b: string }[] }) {
  return (
    <div className="table-scroll">
      <table className="cmp">
        <thead><tr><th></th><th>{a.name}</th><th>{b.name}</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.aspect}><th>{r.aspect}</th><td>{r.a}</td><td>{r.b}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export function Decision({ role, situation, options, actual, note, after }: { role: string; situation: string; options: { label: string; result: string }[]; actual: string; note?: string; after?: ReactNode }) {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <div className="activity decision">
      <p className="role">🎭 {role}</p>
      <LearnText text={situation} sources={[]} />
      <p><b>你的決定是？</b></p>
      <div className="options">
        {options.map((o, i) => <button key={i} className={`opt ${pick === i ? 'picked' : ''}`} disabled={pick !== null} onClick={() => setPick(i)}><span className="opt-key">{'ABCD'[i]}</span>{o.label}</button>)}
      </div>
      {pick !== null && (
        <div className="feedback model">
          <p><b>你選了：{options[pick].label}</b></p>
          <p>{options[pick].result}</p>
          <details open><summary>其他選項會怎樣？</summary>{options.map((o, i) => i !== pick && <p key={i}><b>{o.label}：</b>{o.result}</p>)}</details>
          <p className="actual"><b>歷史上實際發生的：</b>{actual}</p>
          {note && <p className="muted small">{note}</p>}
          {after}
          <button className="btn sm" onClick={() => setPick(null)}>重新選</button>
        </div>
      )}
    </div>
  );
}
