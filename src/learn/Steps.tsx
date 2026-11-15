// 單元裡的各種活動：史料判讀、因果鏈排序、觀點比較、決策情境、今日對照、自我檢查、回顧
import { useMemo, useRef, useState, type ReactNode } from 'react';
import type { Card, CheckItem, Index } from '../types';
import { LearnText } from './LearnText';
import { charCount, MIN_CHARS, type Meta, type Rec } from './level';

// 逐段提示：按一次多給一段
export function Hints({ hints, open = 0 }: { hints: string[]; open?: number }) {
  const [n, setN] = useState(Math.min(open, hints.length));
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
  if (refStr.startsWith('peoples:')) return <button className="link small" onClick={() => onCard(refStr)}>◎ 回到人群圖層看</button>;
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

export function Choice({ q, options, answer, explain, hints, after, whyWrong, rec, onRec, legacyPick }: {
  q: ReactNode; options: string[]; answer: number; explain: string; hints: string[]; after?: ReactNode;
  /** 與 options 等長；選到那一格時顯示那一句（正解那格是 null） */
  whyWrong?: (string | null)[]; rec?: Rec; onRec?: (r: Rec) => void; legacyPick?: number;
}) {
  // 第一次選錯：只說「不太對」＋那一格的 why_wrong＋提示＋回到卡片看，不標出正解；同一輪第二次選錯才公布正解與完整解析
  const init = (): { wrongs: number[]; done: 'ok' | 'rev' | null; pick: number | null } => {
    if (rec && rec.n >= 1) {
      if (rec.l) return { wrongs: [], done: 'ok', pick: rec.p ?? answer };
      if (rec.n >= 2) return { wrongs: rec.p != null ? [rec.p] : [], done: 'rev', pick: rec.p ?? null };
      return { wrongs: rec.p != null ? [rec.p] : [], done: null, pick: rec.p ?? null };
    }
    if (typeof legacyPick === 'number') return { wrongs: [], done: legacyPick === answer ? 'ok' : 'rev', pick: legacyPick }; // 舊進度：當時已經公布過答案
    return { wrongs: [], done: null, pick: null };
  };
  const [st, setSt] = useState(init);
  const recRef = useRef(rec);
  const { wrongs, done, pick } = st;
  // 選項在畫面上的順序：用題目內容做決定性洗牌（同一題每次一樣），正確答案不會固定在某個位置。
  // pick／answer 仍是「原本的第幾個」，紀錄與對答案都不受影響。有「以上皆…」的題目不洗。
  const order = useMemo(() => {
    const idx = options.map((_, i) => i);
    return options.some((o) => /以上|上述/.test(o)) ? idx : shuffleOptions(idx, options.join('|'));
  }, [options]);
  const letter = (i: number) => 'ABCDEF'[order.indexOf(i)];
  const choose = (i: number) => {
    const ok = i === answer, cur = recRef.current;
    const next: Rec = { f: cur ? cur.f : ok, l: ok, n: (cur?.n ?? 0) + 1, p: i };
    recRef.current = next; onRec?.(next);
    if (ok) setSt({ wrongs, done: 'ok', pick: i });
    else if (wrongs.length >= 1) setSt({ wrongs: [...wrongs, i], done: 'rev', pick: i });
    else setSt({ wrongs: [i], done: null, pick: i });
  };
  const why = pick != null && pick !== answer ? whyWrong?.[pick] : null;
  return (
    <div className="activity">
      <div className="q">{q}</div>
      <div className="options" role="radiogroup">
        {order.map((i, pos) => (
          <button key={i} role="radio" aria-checked={pick === i} disabled={!!done || wrongs.includes(i)}
            className={`opt ${done && i === answer ? 'right' : ''} ${wrongs.includes(i) ? 'wrong' : ''} ${done === 'ok' && pick === i ? 'right' : ''}`}
            onClick={() => choose(i)}>
            <span className="opt-key">{'ABCDEF'[pos]}</span>{options[i]}
          </button>
        ))}
      </div>
      {!done && wrongs.length === 0 && <Hints hints={hints} />}
      {!done && wrongs.length > 0 && (
        <div className="feedback no" role="status" aria-live="polite">
          <b>✘ 不太對。</b>
          {why && <p>{why}</p>}
          <p>先不公布答案，再想一想，換一個選項試試。下面有提示，也可以回到卡片找線索。</p>
          {after}
          <Hints key="h1" hints={hints} open={1} />
        </div>
      )}
      {done && (
        <div className={`feedback ${done === 'ok' ? 'ok' : 'no'}`} role="status" aria-live="polite">
          <b>{done === 'ok' ? (wrongs.length ? '✔ 這次答對了！' : '✔ 答對了！') : `✘ 不太對。正確答案是 ${letter(answer)}。`}</b>
          {done === 'rev' && why && <p>{why}</p>}
          <p>{explain}</p>{after}
          {done === 'rev' && <button className="btn sm" onClick={() => setSt({ wrongs: [], done: null, pick: null })}>再試一次</button>}
        </div>
      )}
    </div>
  );
}

// 因果鏈排序：點選（點下面的項目放進第一個空格、點格子裡的拿回來）或拖曳（滑鼠直接拖、手機按住 ⠿ 拖）都可以；
// 放好之後可以用 ↑↓ 微調；對答案後可以「只重排錯的」，排對的留在原位
type From = { slot: number } | { pool: true };
export function Order({ prompt, items, explain, hints, seed, after, rec, onRec }: {
  prompt: ReactNode; items: string[]; explain: string; hints: string[]; seed: string; after?: ReactNode; rec?: Rec; onRec?: (r: Rec) => void;
}) {
  const pool = useMemo(() => shuffled(items, seed), [items, seed]);
  // 已經做完（答對或已公布）的題目重新打開：直接顯示正確順序
  const finished = !!rec && (rec.l || rec.n >= 2);
  const [seq, setSeq] = useState<(string | null)[]>(() => (finished ? [...items] : items.map(() => null)));
  const [checked, setChecked] = useState(finished);
  // 這一題已經對過幾次答案：第一次只標哪幾格對，第二次起才印出正確順序
  const [att, setAtt] = useState(rec ? rec.n : 0);
  const recRef = useRef(rec);
  const [shownAns, setShownAns] = useState(finished && !rec?.l); // 重新打開已公布過答案的題目
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
      {!checked && <div className="row"><button className="btn primary" disabled={!full} onClick={() => {
        const ok = right === items.length, cur = recRef.current;
        const next: Rec = { f: cur ? cur.f : ok, l: ok, n: (cur?.n ?? 0) + 1 };
        recRef.current = next; onRec?.(next); setAtt(att + 1); setChecked(true);
      }}>對答案</button><Hints hints={hints} /></div>}
      {checked && (
        <div role="status" className={`feedback ${right === items.length ? 'ok' : 'no'}`} aria-live="polite">
          {shownAns ? <><b>這題之前已經公布過答案，正確順序是：</b><p>{items.map((x, i) => `${i + 1}. ${x}`).join('　')}</p><p>{explain}</p>{after}</> : <>
          <b>{right === items.length ? '✔ 全部排對！' : `排對 ${right}／${items.length} 個（綠色的是對的）。`}</b>
          {right !== items.length && att < 2 && <p>先不公布順序。想一想：哪一個一定要先發生，後面的才會出現？調整紅色的格子，再對一次答案。</p>}
          {right !== items.length && att >= 2 && <p>正確順序：{items.map((x, i) => `${i + 1}. ${x}`).join('　')}</p>}
          {(right === items.length || att >= 2) && <p>{explain}</p>}{(right === items.length || att >= 2) && after}
          {right !== items.length && att < 2 && <>{after}<Hints key="h1" hints={hints} open={1} /></>}</>}
          <div className="row">
            {right !== items.length && <button className="btn sm" onClick={() => { setShownAns(false); setChecked(false); setSeq(seq.map((x, i) => (x === items[i] ? x : null))); }}>只重排錯的</button>}
            <button className="btn sm" onClick={() => { setShownAns(false); setChecked(false); setSeq(items.map(() => null)); }}>全部重排</button>
          </div>
        </div>
      )}
    </div>
  );
}

// 簡答：自己先寫（少於 15 字不能看參考說法，除非按「我真的想不出來」），再看參考說法；有 points 時逐條勾「有寫到／沒寫到」，還可以補寫一句
export function Short({ q, model, hints, after, saved, onSave, label = '看參考說法', points, meta, onMeta }: {
  q: ReactNode; model: string; hints?: string[]; after?: ReactNode; saved?: string; onSave?: (t: string) => void; label?: string;
  points?: string[]; meta?: Meta; onMeta?: (m: Meta) => void;
}) {
  const [txt, setTxt] = useState(saved ?? '');
  const [m, setM] = useState<Meta>(meta ?? {});
  const [show, setShow] = useState(!!meta?.seen);
  const upd = (patch: Partial<Meta>) => { const n = { ...m, ...patch }; setM(n); onMeta?.(n); };
  const n = charCount(txt), ok = n >= MIN_CHARS;
  const pts = m.pts ?? (points ?? []).map(() => null);
  const marked = pts.filter((x) => x !== null).length, got = pts.filter((x) => x === true).length;
  return (
    <div className="activity">
      <div className="q">{q}</div>
      <textarea value={txt} onChange={(e) => { setTxt(e.target.value); onSave?.(e.target.value); }} placeholder="用自己的話寫寫看（至少 15 個字；只存在你的瀏覽器）" rows={3} />
      {!show && <div className="row">
        <button className="btn primary" disabled={!ok} onClick={() => { setShow(true); upd({ seen: true }); }}>{label}</button>
        <button className="link small" onClick={() => { setShow(true); upd({ seen: true, skip: true }); }}>我真的想不出來</button>
        {!ok && <span className="muted small" aria-live="polite">{n ? `再寫 ${MIN_CHARS - n} 個字就能看` : `先寫至少 ${MIN_CHARS} 個字，才能看參考說法`}</span>}
        {hints && <Hints hints={hints} />}
      </div>}
      {show && <div role="status" className="feedback model"><b>參考說法</b><p>{model}</p>
        {m.skip && !ok && <p className="muted small">你按了「我真的想不出來」，這也沒關係，已經記下來。看完參考說法，試著補寫一句自己的話。</p>}
        {points && points.length > 0 && <div className="points">
          <p><b>對照一下：這幾個重點，你有寫到嗎？</b></p>
          <ul>{points.map((p, i) => <li key={i}><span>{p}</span>
            <span className="pt-btns" role="group" aria-label={`重點 ${i + 1}`}>
              <button type="button" className={`btn sm ${pts[i] === true ? 'on' : ''}`} aria-pressed={pts[i] === true} onClick={() => upd({ pts: pts.map((x, k) => (k === i ? true : x)) })}>有寫到</button>
              <button type="button" className={`btn sm ${pts[i] === false ? 'on' : ''}`} aria-pressed={pts[i] === false} onClick={() => upd({ pts: pts.map((x, k) => (k === i ? false : x)) })}>沒寫到</button>
            </span></li>)}</ul>
          {marked === points.length && <p className="muted small">你寫到了 {got}／{points.length} 個重點。沒寫到的，可以在下面補一句。</p>}
        </div>}
        <label className="more-line"><span className="muted small">補寫一句（原本寫的會保留）</span>
          <input type="text" value={m.more ?? ''} onChange={(e) => upd({ more: e.target.value })} placeholder="看完之後，我想補充…" /></label>
        <p className="muted small">這不是標準答案。比一比：你的說法有沒有提到同樣的重點？有沒有參考說法沒想到的？</p>{after}</div>}
    </div>
  );
}

// onResult：回報這一題最後答對與否（簡答題不評分，回報 null），讓自我檢查那一步可以統計
export function CheckQ({ q, i, seed, index, onCard, onResult, rec, onRec, saved, onSave, meta, onMeta }: {
  q: CheckItem; i: number; seed: string; index: Index; onCard: (id: string, s?: string) => void; onResult?: (ok: boolean | null) => void;
  rec?: Rec; onRec?: (r: Rec) => void; saved?: string; onSave?: (t: string) => void; meta?: Meta; onMeta?: (m: Meta) => void;
}) {
  const after = <RefLink refStr={q.ref} index={index} onCard={onCard} />;
  const head = <><span className="qnum">第 {i + 1} 題</span> {q.q}</>;
  const rr = (r: Rec) => { onRec?.(r); if (r.l || r.n >= 2) onResult?.(r.l); };
  if (q.kind === 'choice') return <Choice q={head} options={q.options!} answer={q.answer!} explain={q.explain} hints={q.hints} after={after} whyWrong={q.why_wrong} rec={rec} onRec={rr} />;
  if (q.kind === 'order') return <Order prompt={head} items={q.items!} explain={q.explain} hints={q.hints} seed={`${seed}-${i}`} after={after} rec={rec} onRec={rr} />;
  return <Short q={head} model={`${q.model}（${q.explain}）`} hints={q.hints} after={after} points={q.points} saved={saved} onSave={(t) => { onSave?.(t); onResult?.(null); }} meta={meta} onMeta={onMeta} />;
}

export function CompareTable({ a, b, rows }: { a: Card; b: Card; rows: { aspect: string; a: string; b: string }[] }) {
  return (
    <div className="table-scroll">
      <table className="cmp">
        <thead><tr><th></th><th>{a.name}</th><th>{b.name}</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.aspect}><th>{r.aspect}</th><td data-side={a.name}>{r.a}</td><td data-side={b.name}>{r.b}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

// 決策：先「掩卷自思」寫下自己的想法，再看選項與結果（讀史方法見 docs/lu-method.md）
/** 決策題的選項順序：依單元 id＋步驟序號做決定性洗牌（同一題每次一樣、不同題不同），避免歷史上實際的選擇永遠排在 A */
export function shuffleOptions<T>(items: T[], seed: string): T[] {
  const r = seeded(seed); const a = [...items];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function Decision({ role, situation, options: rawOptions, seed, actual, note, after, saved, onSave, onPick }: { onPick?: (orig: number) => void; role: string; situation: string; options: { label: string; result: string }[]; seed: string; actual: string; note?: string; after?: ReactNode; saved?: string; onSave?: (t: string) => void }) {
  const options = useMemo(() => shuffleOptions(rawOptions, seed), [rawOptions, seed]);
  const [pick, setPick] = useState<number | null>(null);
  const [thought, setThought] = useState(saved ?? '');
  const [open, setOpen] = useState(!!saved);
  return (
    <div className="activity decision">
      <p className="role">🎭 {role}</p>
      <LearnText text={situation} sources={[]} />
      {!open ? (
        <div className="think-first">
          <p><b>先別看選項。</b>把自己放進這個處境：你知道的只有上面這些，不知道後來會怎樣。你會怎麼做？為什麼？</p>
          <textarea value={thought} onChange={(e) => { setThought(e.target.value); onSave?.(e.target.value); }} placeholder="寫一兩句就好（只存在你的瀏覽器）" rows={3} />
          <div className="row"><button className="btn primary" onClick={() => setOpen(true)}>想好了，看選項</button><button className="link" onClick={() => setOpen(true)}>先跳過</button></div>
        </div>
      ) : (<>
        {thought && <p className="muted small">你一開始的想法：「{thought}」</p>}
        <p><b>你的決定是？</b></p>
        <div className="options">
          {options.map((o, i) => <button key={i} className={`opt ${pick === i ? 'picked' : ''}`} disabled={pick !== null} onClick={() => { setPick(i); onPick?.(rawOptions.indexOf(o)); }}><span className="opt-key">{'ABCD'[i]}</span>{o.label}</button>)}
        </div>
      </>)}
      {pick !== null && (
        <div role="status" className="feedback model">
          <p><b>你選了：{options[pick].label}</b></p>
          <p>{options[pick].result}</p>
          <details open><summary>其他選項會怎樣？</summary>{options.map((o, i) => i !== pick && <p key={i}><b>{o.label}：</b>{o.result}</p>)}</details>
          <p className="actual"><b>歷史上實際發生的：</b>{actual}</p>
          {note && <p className="muted small">{note}</p>}
          <div className="mirror">
            <b>對照一下</b>
            <ul>
              <li>當時的人手上有哪些資訊、哪些壓力，讓他這樣選？</li>
              <li>你一開始的直覺，和他實際的做法，差在哪裡？誰想得比較遠？</li>
              <li>這個選擇的代價，最後是誰付的？</li>
            </ul>
          </div>
          {after}
          <button className="btn sm" onClick={() => setPick(null)}>重新選</button>
        </div>
      )}
    </div>
  );
}

// 回到自己：讀完一段歷史，把它和自己的生活連起來（讀史方法見 docs/lu-method.md）
export const LU_LECTURE_URL = 'https://www.5070.com.tw/i5070/userfiles/evtrpt/3cp/201406112.pdf';
export function Reflect({ q, saved, onSave }: { q?: string; saved?: string; onSave?: (t: string) => void }) {
  const [txt, setTxt] = useState(saved ?? '');
  return (
    <div className="activity reflect">
      <h3>🪞 回到自己</h3>
      <div className="q">{q ?? '這段歷史裡，哪一個人的哪一個選擇最讓你有感？如果將來你遇到很像的處境，你想記得什麼？'}</div>
      <textarea value={txt} onChange={(e) => { setTxt(e.target.value); onSave?.(e.target.value); }} placeholder="沒有標準答案，寫給自己看就好（只存在你的瀏覽器）" rows={3} />
      <p className="muted small">讀歷史不只是知道發生了什麼，也是借別人的經驗想想自己會怎麼做。臺大歷史系呂世浩老師在〈《史記》中的智慧〉一文中引宋代呂祖謙的話：讀史要「如身在其中」，看到事情的利害禍患時，「必掩卷自思，使我遇此等事，當作何處之」。<a href={LU_LECTURE_URL} target="_blank" rel="noreferrer">原文 PDF</a></p>
    </div>
  );
}

// 讀完一張卡後的小題：先不要往回翻，心裡先回答 → 看答案 → 自評
export const RATES: [string, string][] = [['right', '答對'], ['half', '一半'], ['wrong', '沒答對']];
export function Quick({ items, saved, onRate }: { items: { q: string; a: string }[]; saved: (string | undefined)[]; onRate: (j: number, v: string) => void }) {
  const [shown, setShown] = useState<boolean[]>(() => items.map((_, j) => !!saved[j]));
  return (
    <div className="quick activity">
      <h4>📝 先不要往回翻</h4>
      <p className="muted small">合起書本，憑印象想一想。想好了再看答案，然後誠實打個分數。</p>
      {items.map((it, j) => (
        <div key={j} className="quick-q">
          <div className="q">{items.length > 1 ? `${j + 1}. ` : ''}{it.q}</div>
          {!shown[j] ? <button className="btn primary" onClick={() => setShown(shown.map((x, k) => x || k === j))}>想好了，看答案</button>
            : <div role="status" className="feedback model"><b>參考答案</b><p>{it.a}</p>
              <div className="rate" role="group" aria-label="你答得怎麼樣"><span className="muted small">我剛才的答案：</span>
                {RATES.map(([k, l]) => <button key={k} type="button" className={`btn sm ${saved[j] === k ? 'on' : ''}`} aria-pressed={saved[j] === k} onClick={() => onRate(j, k)}>{l}</button>)}</div></div>}
        </div>
      ))}
    </div>
  );
}

// 先猜猜看（引子）：沒有對錯，選完記下來，回顧時再對照
export function Guess({ q, options, saved, onPick }: { q: string; options: string[]; saved?: number; onPick: (i: number) => void }) {
  return (
    <div className="activity guess">
      <h4>🤔 先猜猜看</h4>
      <div className="q">{q}</div>
      <div className="options" role="radiogroup">
        {options.map((o, i) => <button key={i} role="radio" aria-checked={saved === i} className={`opt ${saved === i ? 'picked' : ''}`} onClick={() => onPick(i)}><span className="opt-key">{'ABCD'[i]}</span>{o}</button>)}
      </div>
      {typeof saved === 'number' && <p className="muted small" aria-live="polite">✓ 記下來了，讀完再回來對照。（沒有對錯，憑直覺選就好）</p>}
    </div>
  );
}
