// 段考複習（?mode=learn&view=exam[&units=id1,id2]）：勾幾課 → 只出題（不讀卡片）→ 答對率、每課成績、錯題清單。延後載入（Extra.tsx）
// 只出會自動對答案的題（選擇、排序）；讀完小題（自評）不放進段考。對錯不寫進課內的 r 紀錄，答錯的題加進複習排程（examMiss）
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Index, Unit } from '../types';
import type { Progress } from './progress';
import { ensureUnits, unitLoaded } from '../lib/detail';
import { Skel } from '../ui';
import { LevelTag } from './LearnHome';
import { hasLevels, levelMatch, type LevelPick } from './util';
import { ReviewQ, answerText, letterOf, optionOrder } from './ReviewQ';
import { LLink, learnHref } from './nav';
import { examMiss, questionsOf, rkey, todayStr, type RQ } from './review';
import './review.css';

interface Item { q: RQ; unit: Unit }
interface Res extends Item { ok: boolean }
const COUNTS: [number, string][] = [[10, '10 題'], [20, '20 題'], [0, '全部']];
const LEVEL_TABS: [LevelPick, string][] = [['all', '全部'], ['國中', '國中'], ['高中', '高中']];
const shuffle = <T,>(a: T[]) => { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };

/** 從勾選的課抽 n 題（0＝全部）：每一課輪流抽，每一課都會出到 */
function build(units: Unit[], n: number): Item[] {
  const pools = shuffle(units).map((unit) => shuffle(questionsOf(unit).filter((q) => q.kind !== 'quick').map((q) => ({ q, unit }))));
  const total = pools.reduce((s, x) => s + x.length, 0), want = n === 0 ? total : Math.min(n, total), out: Item[] = [];
  for (let r = 0; out.length < want; r++) { let any = false; for (const pl of pools) if (pl[r] && out.length < want) { out.push(pl[r]); any = true; } if (!any) break; }
  return shuffle(out);
}

export default function ExamPage({ index, p, update, initial }: { index: Index; p: Progress; update: (f: (p: Progress) => Progress) => void; initial: string[] }) {
  const today = useMemo(todayStr, []);
  const [phase, setPhase] = useState<'pick' | 'load' | 'run' | 'result'>('pick');
  const [sel, setSel] = useState<Set<string>>(() => {
    const ids = initial.filter((id) => index.units.some((u) => u.id === id));
    return new Set(ids.length ? ids : index.units.filter((u) => p.units[u.id]?.done).map((u) => u.id));
  });
  const [lv, setLv] = useState<LevelPick>('all');
  const [count, setCount] = useState(10);
  const [items, setItems] = useState<Item[]>([]);
  const [res, setRes] = useState<Res[]>([]);
  const [k, setK] = useState(0);
  const [fail, setFail] = useState(false);
  const any = hasLevels(index.units);
  const doneIds = useMemo(() => new Set(index.units.filter((u) => p.units[u.id]?.done).map((u) => u.id)), [index.units, p.units]);
  // 做過的排前面（各自維持原本的順序）
  const list = useMemo(() => [...index.units.filter((u) => doneIds.has(u.id)), ...index.units.filter((u) => !doneIds.has(u.id))].filter((u) => levelMatch(u, lv, any)), [index.units, doneIds, lv, any]);
  const toggle = (id: string) => setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const ids = index.units.filter((u) => sel.has(u.id)).map((u) => u.id);

  const start = async () => {
    setPhase('load'); setFail(false);
    await ensureUnits(ids);
    const us = index.units.filter((u) => ids.includes(u.id) && unitLoaded(index, u.id));
    if (us.length < ids.length) { setFail(true); setPhase('pick'); return; }
    runWith(build(us, count));
  };
  const runWith = (its: Item[]) => { setItems(its); setRes([]); setK(0); setPhase(its.length ? 'run' : 'pick'); window.scrollTo?.(0, 0); };

  // 做完：答錯的加進複習排程（只一次）
  const saved = useRef(false);
  useEffect(() => {
    if (phase !== 'result') { saved.current = false; return; }
    if (saved.current) return;
    saved.current = true;
    const miss = res.filter((r) => !r.ok).map((r) => rkey(r.unit.id, r.q.key));
    if (miss.length) update((o) => examMiss(o, miss, today));
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const shareUrl = () => `${location.origin}${learnHref({ view: 'exam' })}&units=${ids.join(',')}`;
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(shareUrl()).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }).catch(() => {}); };

  if (phase === 'load') return <div className="exam-page"><h2>📝 段考複習</h2><p className="muted">正在準備題目…</p><Skel /></div>;
  if (phase === 'run' && items[k]) {
    const it = items[k], last = k === items.length - 1;
    return (
      <div className="exam-page review-run">
        <h2>📝 段考複習</h2>
        <p className="rq-head" aria-live="polite"><b>第 {k + 1}／{items.length} 題</b>・來自《{it.unit.title}》<span className="muted">・{it.q.what}</span></p>
        <div className="rq-bar" aria-hidden><i style={{ width: `${(k / items.length) * 100}%` }} /></div>
        <ReviewQ key={`${it.unit.id}:${it.q.key}:${k}`} q={it.q} uid={it.unit.id} index={index} nextLabel={last ? '看結果' : '下一題 →'}
          onResult={(ok) => setRes((r) => [...r, { ...it, ok }])}
          onNext={() => { if (last) setPhase('result'); else { setK(k + 1); window.scrollTo?.(0, 0); } }} />
      </div>
    );
  }
  if (phase === 'result') {
    const right = res.filter((r) => r.ok).length, wrong = res.filter((r) => !r.ok);
    const per = [...new Set(res.map((r) => r.unit.id))].map((id) => { const rs = res.filter((r) => r.unit.id === id); return { id, title: rs[0].unit.title, n: rs.length, right: rs.filter((r) => r.ok).length }; });
    return (
      <div className="exam-page">
        <h2>📝 段考複習：結果</h2>
        <p className="rv-score" aria-live="polite">答對 <b>{right}</b>／{res.length} 題（<b>{Math.round((right / Math.max(1, res.length)) * 100)}%</b>）</p>
        <h3>每一課答對幾題</h3>
        <ul className="exam-per">{per.map((x) => <li key={x.id}><span>《{x.title}》</span><b>{x.right}／{x.n}</b></li>)}</ul>
        <h3>答錯的題目{wrong.length ? `（${wrong.length}）` : ''}</h3>
        {wrong.length === 0 ? <p className="feedback ok">全部答對，太強了 🎉</p> : (
          <ol className="exam-wrong">{wrong.map((r, i) => (
            <li key={i}>
              <p className="muted small">《{r.unit.title}》・{r.q.what}</p>
              <div className="q">{r.q.q}</div>
              <p><b>正解：</b>{r.q.kind === 'choice' ? `${letterOf[optionOrder(r.q.options!).indexOf(r.q.answer!)]}．` : ''}{answerText(r.q)}</p>
              <p className="muted">{r.q.explain}</p>
              <LLink className="link small rq-link" q={{ unit: r.unit.id, step: String(r.q.step) }}>📖 回這一課看（第 {r.q.step + 1} 步）</LLink>
            </li>))}</ol>)}
        {wrong.length > 0 && doneIds.size > 0 && <p className="muted small">答錯的題（已經完成的課）明天會出現在「今天的 3 分鐘複習」。</p>}
        <div className="row exam-act">
          {wrong.length > 0 && <button className="btn primary" onClick={() => runWith(shuffle(wrong.map(({ q, unit }) => ({ q, unit }))))}>把錯的再做一次</button>}
          <button className="btn" onClick={() => setPhase('pick')}>重新選課</button>
          <button className="btn" onClick={copy}>{copied ? '已複製 ✓' : '複製這份段考複習的連結'}</button>
        </div>
      </div>
    );
  }
  return (
    <div className="exam-page">
      <h2>📝 段考複習</h2>
      <p className="muted">勾幾課，只出題，不用再讀卡片。做過的課排在前面、已經勾好；沒做過的課也可以勾。對錯不會改變你在課裡的「學會」等級。</p>
      {any && <div className="seg" role="group" aria-label="年級">{LEVEL_TABS.map(([key, l]) => <button key={key} className={lv === key ? 'on' : ''} aria-pressed={lv === key} onClick={() => setLv(key)}>{l}</button>)}</div>}
      <div className="exam-tools">
        <button className="btn sm" onClick={() => setSel((s) => new Set([...s, ...list.map((u) => u.id)]))}>全選{lv === 'all' ? '' : `（${lv}）`}</button>
        <button className="btn sm" onClick={() => setSel((s) => new Set([...s].filter((id) => !list.some((u) => u.id === id))))}>全不選</button>
        <span className="muted small">已勾 {ids.length} 課</span>
      </div>
      <ul className="exam-list">
        {list.map((u) => (
          <li key={u.id}><label className={sel.has(u.id) ? 'on' : ''}>
            <input type="checkbox" checked={sel.has(u.id)} onChange={() => toggle(u.id)} />
            <span className="et"><b>{u.title}</b><span className="muted small">{u.level && <><LevelTag level={u.level} />・</>}{doneIds.has(u.id) ? '做過' : '還沒做'}</span></span>
          </label></li>
        ))}
      </ul>
      <div className="exam-start">
        <div className="seg" role="group" aria-label="題數">{COUNTS.map(([n, l]) => <button key={n} className={count === n ? 'on' : ''} aria-pressed={count === n} onClick={() => setCount(n)}>{l}</button>)}</div>
        <button className="btn primary big" disabled={!ids.length} onClick={start}>開始（{ids.length} 課）</button>
        {ids.length > 0 && <button className="link small" onClick={copy}>{copied ? '已複製 ✓' : '複製分享連結（帶著勾好的課）'}</button>}
      </div>
      {fail && <p className="feedback no">有幾課的題目下載失敗，請檢查網路後再按一次「開始」。</p>}
      {!ids.length && <p className="muted small">至少勾一課才能開始。</p>}
    </div>
  );
}
