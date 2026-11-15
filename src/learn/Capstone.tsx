// 深入專題的總結任務（2026-11 第 4f 批）：專題的所有課都走完（按過「完成這一課」）之後，專題頁最下面出現一個較長的寫作題。
// 資料：data/dives/*.yaml 的 capstone { question, points, model_answer?, min? }；進度：Progress.capstone[專題 id]（見 level.ts 檔頭、progress.ts）。
// 沒走完時顯示鎖住的說明與還差哪幾課。寫到字數才能看重點對照（或按「我真的想不出來」）；看完逐條自評，可複製文字或列印。
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Dive, Index } from '../types';
import { charCount } from './level';
import type { CapstoneRec, Progress } from './progress';
import { todayStr } from './review';
import './newsteps.css';

export const CAPSTONE_MIN = 60;

export function Capstone({ dive, index, p, update, onUnit }: { dive: Dive; index: Index; p: Progress; update: (f: (p: Progress) => Progress) => void; onUnit: (id: string) => void }) {
  const cap = dive.capstone;
  const lessons = dive.units.map((id) => index.units.find((u) => u.id === id)).filter((u): u is NonNullable<typeof u> => !!u);
  const left = lessons.filter((u) => !p.units[u.id]?.done);
  const rec: CapstoneRec | undefined = p.capstone?.[dive.id];
  const [txt, setTxt] = useState(rec?.text ?? '');
  const [copied, setCopied] = useState(false);
  useEffect(() => { setTxt(p.capstone?.[dive.id]?.text ?? ''); }, [dive.id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!cap) return null;
  const min = cap.min ?? CAPSTONE_MIN;
  const id = `dv-capstone-${dive.id}`;
  const save = (patch: Partial<CapstoneRec>) => update((o) => ({ ...o, capstone: { ...(o.capstone ?? {}), [dive.id]: { text: '', ...(o.capstone?.[dive.id] ?? {}), ...patch, at: todayStr() } } }));

  if (lessons.length === 0 || left.length > 0) {
    return (
      <section className="dv-sec dv-capstone locked" id={id} aria-label="總結任務（還沒開放）">
        <h3>🔒 總結任務<span className="cap-sub">走完這個專題的所有課之後開放</span></h3>
        <p>{left.length > 0 ? <>還差 <b>{left.length}</b> 課沒走完：</> : '這個專題還沒有可以做的課。'}</p>
        {left.length > 0 && <div className="dv-chips">{left.map((u) => <button key={u.id} className="dv-story unit" onClick={() => onUnit(u.id)}>《{u.title}》</button>)}</div>}
        <p className="cap-note">「走完」就是從頭走到最後、按下最後一步的「完成這一課」；題目沒有全部答對也可以。</p>
      </section>
    );
  }

  const n = charCount(txt), ok = n >= min;
  const pts = rec?.pts ?? cap.points.map(() => null);
  const marked = pts.filter((x) => x !== null && x !== undefined).length, got = pts.filter((x) => x === true).length;
  const seen = !!rec?.seen;
  const who = p.profile;
  const sheetText = () => [
    '歷史長河・深入專題總結任務',
    `姓名：${who?.name || '＿＿＿'}　班級：${who?.cls || '＿＿＿'}　座號：${who?.no || '＿＿'}`,
    `專題：${dive.title}`, `題目：${cap.question}`, '', '我寫的：', txt.trim(),
    ...(rec?.pts && rec.pts.some((x) => x !== null && x !== undefined) ? ['', `自評：${cap.points.map((t, i) => `${i + 1}.${t}（${pts[i] === true ? '有寫到' : pts[i] === false ? '沒寫到' : '未勾'}）`).join('　')}`] : []),
    ...(rec?.more?.trim() ? ['', `補寫：${rec.more.trim()}`] : []),
  ].join('\n');
  const copy = async () => {
    const t = sheetText();
    try { await navigator.clipboard.writeText(t); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { window.prompt('複製這段文字：', t); }
  };
  const print = () => {
    const off = () => { document.body.classList.remove('print-capstone'); window.removeEventListener('afterprint', off); };
    document.body.classList.add('print-capstone');
    window.addEventListener('afterprint', off);
    window.print();
  };

  return (
    <section className="dv-sec dv-capstone" id={id} aria-label="總結任務">
      <h3>✍️ 總結任務<span className="cap-sub">專題的 {lessons.length} 課都走完了，把它們連起來</span></h3>
      <div className="q cap-q">{cap.question}</div>
      <textarea className="cap-text" aria-label="總結任務的回答" rows={8} value={txt} placeholder={`用自己的話寫（至少 ${min} 個字；只存在你的瀏覽器）`}
        onChange={(e) => { setTxt(e.target.value); save({ text: e.target.value }); }} />
      <p className="cap-count" role="status">{ok ? `已經寫了 ${n} 個字，可以對照重點了。` : n ? `已寫 ${n} 個字，再寫 ${min - n} 個字就能對照重點。` : `先寫至少 ${min} 個字，才能對照重點。`}</p>
      {!seen && <div className="row">
        <button className="btn primary" disabled={!ok} onClick={() => save({ seen: true })}>寫好了，對照重點</button>
        <button className="link small" onClick={() => save({ seen: true, skip: true })}>我真的想不出來</button>
      </div>}
      {seen && (
        <div className="feedback model cap-model">
          {rec?.skip && !ok && <p className="muted">你按了「我真的想不出來」，這也沒關係。看完重點，試著補寫幾句自己的話。</p>}
          <div className="points">
            <p><b>對照一下：這幾個重點，你有寫到嗎？</b></p>
            <ul>{cap.points.map((t, i) => <li key={i}><span>{t}</span>
              <span className="pt-btns" role="group" aria-label={`重點 ${i + 1}`}>
                <button type="button" className={`btn sm ${pts[i] === true ? 'on' : ''}`} aria-pressed={pts[i] === true} onClick={() => save({ pts: cap.points.map((_, k) => (k === i ? true : pts[k] ?? null)) })}>有寫到</button>
                <button type="button" className={`btn sm ${pts[i] === false ? 'on' : ''}`} aria-pressed={pts[i] === false} onClick={() => save({ pts: cap.points.map((_, k) => (k === i ? false : pts[k] ?? null)) })}>沒寫到</button>
              </span></li>)}</ul>
            {marked === cap.points.length && <p role="status">你寫到了 {got}／{cap.points.length} 個重點。沒寫到的，可以回頭補寫。</p>}
          </div>
          {cap.model_answer && <details className="cap-ref"><summary>看一種參考說法</summary><p>{cap.model_answer}</p><p className="muted">這不是標準答案。比一比：你的說法有沒有提到同樣的重點？有沒有參考說法沒想到的？</p></details>}
          <div className="row cap-actions">
            <button className="btn sm" onClick={copy}>{copied ? '✓ 已複製' : '📋 複製我寫的'}</button>
            <button className="btn sm" onClick={print}>🖨 列印</button>
          </div>
        </div>
      )}
      {createPortal(
        <div className="cap-sheet" aria-hidden>
          <p>歷史長河・深入專題總結任務</p>
          <p>姓名：{who?.name || '＿＿＿＿＿'}　班級：{who?.cls || '＿＿＿＿'}　座號：{who?.no || '＿＿＿'}</p>
          <h2>{dive.title}</h2>
          <p><b>題目：</b>{cap.question}</p>
          <p className="cap-sheet-text">{txt.trim() || '（還沒有寫）'}</p>
          {seen && <><p><b>重點自評</b></p><ul>{cap.points.map((t, i) => <li key={i}>{t}（{pts[i] === true ? '有寫到' : pts[i] === false ? '沒寫到' : '未勾'}）</li>)}</ul></>}
        </div>, document.body)}
    </section>
  );
}
