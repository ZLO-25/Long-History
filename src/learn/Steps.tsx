// 單元裡的各種活動：史料判讀、因果鏈排序、觀點比較、決策情境、今日對照、自我檢查、回顧
import { useMemo, useState, type ReactNode } from 'react';
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

export function Order({ prompt, items, explain, hints, seed, after, onDone }: {
  prompt: ReactNode; items: string[]; explain: string; hints: string[]; seed: string; after?: ReactNode; onDone?: (ok: boolean) => void;
}) {
  const pool = useMemo(() => shuffled(items, seed), [items, seed]);
  const [seq, setSeq] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const full = seq.length === items.length;
  const right = seq.filter((x, i) => x === items[i]).length;
  return (
    <div className="activity">
      <div className="q">{prompt}</div>
      <p className="muted small">依序點選下面的項目，排到上面的框框裡；點框框裡的項目可以拿回來。</p>
      <ol className="seq">
        {items.map((_, i) => {
          const x = seq[i];
          return <li key={i} className={`slot ${checked ? (x === items[i] ? 'right' : 'wrong') : ''}`}>
            {x ? <button className="opt" disabled={checked} onClick={() => setSeq(seq.filter((y) => y !== x))}>{x}</button> : <span className="muted">（第 {i + 1} 個）</span>}
          </li>;
        })}
      </ol>
      <div className="pool">
        {pool.filter((x) => !seq.includes(x)).map((x) => <button key={x} className="opt" onClick={() => setSeq([...seq, x])}>{x}</button>)}
      </div>
      {!checked && <div className="row"><button className="btn primary" disabled={!full} onClick={() => { setChecked(true); onDone?.(right === items.length); }}>對答案</button><Hints hints={hints} /></div>}
      {checked && (
        <div className={`feedback ${right === items.length ? 'ok' : 'no'}`}>
          <b>{right === items.length ? '✔ 全部排對！' : `排對 ${right}／${items.length} 個。`}</b>
          {right !== items.length && <p>正確順序：{items.map((x, i) => `${i + 1}. ${x}`).join('　')}</p>}
          <p>{explain}</p>{after}
          <button className="btn sm" onClick={() => { setChecked(false); setSeq([]); }}>重排一次</button>
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
