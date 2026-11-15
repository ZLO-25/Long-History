// 今天的 3 分鐘複習（?mode=learn&view=review）：一次一題。延後載入（Extra.tsx）；題目內容用 ensureUnits 按需載入
import { useEffect, useMemo, useState } from 'react';
import type { Index, Unit } from '../types';
import type { Progress } from './progress';
import { ensureUnits, unitLoaded } from '../lib/detail';
import { Skel } from '../ui';
import { ReviewQ } from './ReviewQ';
import { LLink } from './nav';
import { applyReview, answeredToday, dayText, dropReview, legacyUnits, nextDue, pickToday, questionsOf, scheduleUnit, splitKey, todayStr, type RQ } from './review';
import './review.css';

interface Props { index: Index; p: Progress; update: (f: (p: Progress) => Progress) => void; onHome: () => void }

export default function ReviewPage(props: Props) {
  const { index, p, update } = props;
  const today = useMemo(todayStr, []);
  const legacy = useMemo(() => legacyUnits(p, today).filter((id) => index.units.some((u) => u.id === id)), [p.units, p.review]); // eslint-disable-line react-hooks/exhaustive-deps
  const [prepped, setPrepped] = useState(legacy.length === 0);
  // 這次改版前就完成的課：載入題目，補建複習排程（一次性）
  useEffect(() => {
    if (prepped) return;
    let alive = true;
    ensureUnits(legacy).then(() => {
      if (!alive) return;
      update((o) => legacy.reduce((acc, id) => { const u = index.units.find((x) => x.id === id); return u && unitLoaded(index, id) ? scheduleUnit(acc, u, today) : acc; }, o));
      setPrepped(true);
    });
    return () => { alive = false; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="review-page">
      <h2>今天的 3 分鐘複習</h2>
      {prepped ? <Run {...props} today={today} /> : <><p className="muted">正在整理你做過的課…</p><Skel /></>}
    </div>
  );
}

interface Res { key: string; ok: boolean; q: RQ; unit: Unit }

function Run({ index, p, update, onHome, today }: Props & { today: string }) {
  const [sess] = useState(() => pickToday(p, today));
  const [before] = useState(() => answeredToday(p, today).length);
  const [k, setK] = useState(0);
  const [results, setResults] = useState<Res[]>([]);
  const uids = useMemo(() => [...new Set(sess.map((x) => splitKey(x)[0]))], [sess]);
  const [tried, setTried] = useState(uids.length === 0);
  useEffect(() => { if (!tried) ensureUnits(uids).then(() => setTried(true)); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const loaded = uids.every((id) => unitLoaded(index, id));
  const cur = sess[k];
  const [uid, qk] = cur ? splitKey(cur) : ['', ''];
  const unit = index.units.find((u) => u.id === uid);
  const q = useMemo(() => (loaded && unit ? questionsOf(unit).find((x) => x.key === qk) : undefined), [loaded, unit, qk]);
  // 題目已經不在課裡：畢業掉，換下一題
  useEffect(() => { if (cur && loaded && unit && !q) { update((o) => dropReview(o, cur)); setK((x) => x + 1); } }, [cur, loaded, unit, q]); // eslint-disable-line react-hooks/exhaustive-deps

  if (k >= sess.length) return <Done {...{ index, p, today, results, onHome, before }} />;
  if (!loaded || !unit || !q) {
    if (tried && !loaded) return <p>題目下載失敗，請檢查網路後重新整理。<button className="btn sm" onClick={() => { setTried(false); ensureUnits(uids).then(() => setTried(true)); }}>重試</button></p>;
    return <Skel />;
  }
  const total = before + sess.length, last = k === sess.length - 1;
  return (
    <div className="review-run">
      <p className="rq-head" aria-live="polite"><b>第 {before + k + 1}／{total} 題</b>・來自《{unit.title}》<span className="muted">・{q.what}</span></p>
      <div className="rq-bar" aria-hidden><i style={{ width: `${((before + k) / total) * 100}%` }} /></div>
      <ReviewQ key={cur} q={q} uid={uid} index={index} nextLabel={last ? '看結果' : '下一題 →'}
        onResult={(ok) => { update((o) => applyReview(o, cur, ok, today)); setResults((r) => [...r, { key: cur, ok, q, unit }]); }}
        onNext={() => { setK(k + 1); window.scrollTo?.(0, 0); }} />
    </div>
  );
}

function Done({ p, today, results, onHome, before }: { index: Index; p: Progress; today: string; results: Res[]; onHome: () => void; before: number }) {
  const all = answeredToday(p, today);
  const right = all.filter(([, r]) => r.ok).length;
  const wrong = results.filter((r) => !r.ok);
  const nx = nextDue(p, today);
  if (!all.length) return <div className="rv-done"><p>今天沒有要複習的題目。做完一課之後，隔天、第 3、7、21 天會回來複習。</p><div className="row"><button className="btn primary" onClick={onHome}>回首頁</button></div></div>;
  return (
    <div className="rv-done">
      <p className="rv-score" aria-live="polite">{before > 0 && results.length === 0 ? '今天已經複習完了 ✓' : '複習完成 ✓'}　答對 <b>{right}</b>／{all.length} 題</p>
      {wrong.length > 0 ? (
        <div role="status" className="feedback no"><b>這幾題明天會再出現：</b>
          <ul>{wrong.map((r) => <li key={r.key}>《{r.unit.title}》{r.q.what}：{r.q.q.length > 40 ? `${r.q.q.slice(0, 40)}…` : r.q.q}　<LLink className="link small" q={{ unit: r.unit.id, step: String(r.q.step) }}>回這一課看</LLink></li>)}</ul></div>
      ) : <p role="status" className="feedback ok">全部答對。答對的題會照 1、3、7、21 天的節奏再回來。</p>}
      <p>{nx ? <>下次複習：<b>{dayText(nx, today)}</b></> : '所有的題都畢業了，不用再複習。'}</p>
      <div className="row"><button className="btn primary" onClick={onHome}>回首頁</button></div>
    </div>
  );
}
