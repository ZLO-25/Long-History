// 我的學習紀錄：姓名班級座號、做過的課（可展開看自己寫的）、備份／還原進度、「這不是我」清除
// 只存在這台瀏覽器；可以列印、複製成文字，或到每一課匯出作答給老師
import { useEffect, useState } from 'react';
import type { Index, Unit } from '../types';
import { backupOf, mergeProgress, planMerge, type MergePlan, type Progress } from './progress';
import { ensureUnits, unitLoaded } from '../lib/detail';
import { learnCards, unitHalf } from './util';
import { levelText, unitLevel, unitStat } from './level';
import { fmtTime, rowsOf, yn } from './report';
import { packBackup, unpackBackup } from './share';
import { ProfileFields, ProfileLine } from './profile';
import { LLink } from './nav';
import './extra.css';

const status = (u: Unit, p: Progress) => {
  const x = p.units[u.id];
  if (x?.done) return { k: 'done', t: `${levelText(unitLevel(u, x) ?? 'walked')}${x.doneAt ? `（${x.doneAt}）` : ''}` };
  if (x && x.step > 0) return { k: 'doing', t: `進行中：第 ${x.step + 1}／${u.steps.length} 步${u.steps.length >= 8 ? (x.step >= unitHalf(u) ? '・下半' : '・上半') : ''}` };
  return { k: 'todo', t: '還沒開始' };
};
/** 做過的課：有進度、答過、花過時間 */
const touched = (u: Unit, p: Progress) => { const x = p.units[u.id]; return !!x && (x.done || x.step > 0 || !!x.time || !!x.recap || Object.keys(x.answers ?? {}).length > 0); };
const today = () => new Date().toISOString().slice(0, 10);

export function LearnRecord({ index, p, update, onUnit, onReset }: { index: Index; p: Progress; update: (f: (p: Progress) => Progress) => void; onUnit: (id: string) => void; onReset: () => void }) {
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const units = index.units;
  const mine = units.filter((u) => touched(u, p));
  const shown = showAll ? units : mine;
  const done = units.filter((u) => p.units[u.id]?.done).length;
  const doing = units.filter((u) => !p.units[u.id]?.done && (p.units[u.id]?.step ?? 0) > 0).length;
  const cards = learnCards(index), read = cards.filter((c) => p.cards[c.id]).length;
  // 自我檢查（選擇＋排序）：已作答的題數與「最近一次」答對的題數
  const sc = units.map((u) => { const st = unitStat(u, p.units[u.id]); const g = st.reqs.filter((r) => r.grade); return { total: st.gradeTotal, right: st.gradeLast, answered: g.filter((r) => !st.missing.includes(r)).length }; })
    .reduce((a, b) => ({ total: a.total + b.total, right: a.right + b.right, answered: a.answered + b.answered }), { total: 0, right: 0, answered: 0 });
  const pct = sc.answered ? Math.round((sc.right / sc.answered) * 100) : null;

  // 做過的課要顯示自己寫的內容：把這些課的完整內容（小檔）抓進來
  const mineKey = mine.map((u) => u.id).join();
  useEffect(() => { if (mine.length) ensureUnits(mine.map((u) => u.id)); }, [mineKey]); // eslint-disable-line react-hooks/exhaustive-deps
  // 列印時展開每一課（「回到自己」另外用 CSS 藏起來）
  useEffect(() => {
    const open = () => document.querySelectorAll<HTMLDetailsElement>('.record details.rec-lesson').forEach((d) => { d.open = true; });
    window.addEventListener('beforeprint', open);
    return () => window.removeEventListener('beforeprint', open);
  }, []);

  const w = p.profile;
  const asText = () => {
    const L = [`歷史長河・我的學習紀錄（${today()}）`, `姓名：${w?.name || '＿＿＿'}　班級：${w?.cls || '＿＿＿'}　座號：${w?.no || '＿＿'}`,
      `走完課程 ${done}／${units.length}（學會 ${units.filter((u) => unitLevel(u, p.units[u.id]) === 'mastered').length}、做完 ${units.filter((u) => unitLevel(u, p.units[u.id]) === 'done').length}）、進行中 ${doing}、讀過卡片 ${read}／${cards.length}、自我檢查答對 ${sc.right}／${sc.answered}`, ''];
    for (const u of mine) {
      const s = status(u, p), st = unitStat(u, p.units[u.id]), g = st.reqs.filter((r) => r.grade), ga = g.filter((r) => !st.missing.includes(r)).length;
      L.push(`■ ${u.title}：${s.t}${st.answered ? `；作答 ${st.answered}／${st.total} 個互動` : ''}${ga ? `；自我檢查 ${st.gradeLast}／${st.gradeTotal}` : ''}${p.units[u.id]?.time ? `；停留 ${fmtTime(p.units[u.id]?.time)}` : ''}`);
      if (unitLoaded(index, u.id)) for (const r of rowsOf(u, p.units[u.id])) if ((r.kind === 'open' || r.kind === 'think') && r.text) L.push(`  - ${r.label}・${r.q}\n    ${r.text.replace(/\n/g, '\n    ')}${r.more ? `\n    補寫：${r.more}` : ''}`);
    }
    return L.join('\n');
  };
  const copy = async () => {
    const t = asText();
    try { await navigator.clipboard.writeText(t); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { window.prompt('複製下面的文字：', t); }
  };
  const print = () => { document.querySelectorAll<HTMLDetailsElement>('.record details.rec-lesson').forEach((d) => { d.open = true; }); window.print(); };

  return (
    <div className="record">
      <h2>📒 我的學習紀錄</h2>
      <p className="muted">紀錄只存在這台瀏覽器（換電腦、清除瀏覽資料就會不見，可以用下面的「備份進度」留一份）。要交給老師，可以列印、複製成文字，或到每一課按「匯出這一課的作答」。</p>
      <ProfileFields p={p} update={update} />
      <div className="print-only"><ProfileLine p={p} /></div>
      <div className="stat-tiles">
        <div><b>{done}<small>／{units.length}</small></b><span>走完課程（🏅 學會 {units.filter((u) => unitLevel(u, p.units[u.id]) === 'mastered').length}・✍️ 做完 {units.filter((u) => unitLevel(u, p.units[u.id]) === 'done').length}）</span></div>
        <div><b>{doing}</b><span>進行中</span></div>
        <div><b>{read}<small>／{cards.length}</small></b><span>讀過卡片</span></div>
        <div><b>{pct === null ? '—' : `${pct}%`}</b><span>自我檢查答對率{sc.answered ? `（${sc.right}／${sc.answered}）` : ''}</span></div>
      </div>
      <div className="row no-print">
        <button className="btn" onClick={print}>🖨 列印（交給老師）</button>
        <button className="btn" onClick={copy}>{copied ? '✓ 已複製' : '📋 複製成文字'}</button>
        <LLink className="btn" q={{ view: 'teacher' }} title="給老師：貼上學生的分享碼，一次看全班">👩‍🏫 老師檢視</LLink>
      </div>

      <h3>做過的課{showAll ? '（全部）' : `（${mine.length}）`}</h3>
      <label className="no-print rec-all"><input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> 顯示全部 {units.length} 課（包含還沒開始的）</label>
      {!shown.length ? <p className="muted">還沒有做過的課。到首頁選一課開始吧。</p> : (
        <div className="table-scroll">
          <table className="rec">
            <thead><tr><th>課</th><th>狀態</th><th>實際作答</th><th>自我檢查</th><th>停留時間</th><th className="no-print"></th></tr></thead>
            <tbody>{shown.map((u) => {
              const s = status(u, p), st = unitStat(u, p.units[u.id]), g = st.reqs.filter((q) => q.grade), ga = g.filter((q) => !st.missing.includes(q)).length;
              return <tr key={u.id} className={`st-${s.k}`}>
                <td><b>{u.title}</b></td>
                <td>{s.t}</td>
                <td>{st.total ? <>{st.answered}／{st.total}</> : <span className="muted">—</span>}</td>
                <td>{ga ? <>{st.gradeLast}／{st.gradeTotal}{ga < st.gradeTotal ? <span className="muted small">（做了 {ga} 題）</span> : st.gradeLast === st.gradeTotal ? ' 🎉' : ''}</> : <span className="muted">—</span>}</td>
                <td>{fmtTime(p.units[u.id]?.time)}</td>
                <td className="no-print"><button className="btn sm" onClick={() => onUnit(u.id)}>{s.k === 'done' ? '複習' : s.k === 'doing' ? '接著做' : '開始'}</button></td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      )}

      {mine.length > 0 && <>
        <h3>我的作答（點開看自己寫的）</h3>
        {mine.map((u) => <Lesson key={u.id} u={u} p={p} index={index} />)}
      </>}

      <Backup index={index} p={p} update={update} onReset={onReset} />
    </div>
  );
}

/** 一課的作答：掩卷自思、開放題與自評、回顧、補寫；選擇題一行一題；「回到自己」預設摺起 */
function Lesson({ u, p, index }: { u: Unit; p: Progress; index: Index }) {
  const prog = p.units[u.id], loaded = unitLoaded(index, u.id);
  const rows = loaded ? rowsOf(u, prog) : [];
  const texts = rows.filter((r) => (r.kind === 'open' || r.kind === 'think') && (r.text || r.skip));
  const recs = rows.filter((r) => r.kind === 'rec' && r.answered);
  const refl = typeof prog?.answers?.reflect === 'string' ? (prog.answers.reflect as string).trim() : '';
  const s = status(u, p);
  return (
    <details className="rec-lesson">
      <summary><b>{u.title}</b>　<span className="muted small">{s.t}・停留 {fmtTime(prog?.time)}</span></summary>
      {!loaded ? <p className="muted">載入這一課的內容…</p> : <>
        {texts.length === 0 && <p className="muted">這一課還沒有寫過文字。</p>}
        {texts.map((r) => (
          <div key={r.key} className="rec-a">
            <p className="muted small">{r.kind === 'think' ? '🧠 ' : ''}{r.label}・{r.q}</p>
            <p>{r.text || '（按了「我真的想不出來」）'}</p>
            {r.pts && <p className="muted small">自評：{r.pts.map((x, i) => `${i + 1}. ${x.v === true ? '有寫到' : x.v === false ? '沒寫到' : '未勾'}`).join('　')}</p>}
            {r.more && <p className="muted small">補寫：{r.more}</p>}
          </div>
        ))}
        {recs.length > 0 && <div className="rec-choices"><p className="muted small">選擇與排序題</p>
          <ul>{recs.map((r) => <li key={r.key}>{r.label}：第一次 <b className={r.f ? 'ok' : 'no'}>{yn(r.f)}</b>・最後 {yn(r.l)}・{r.n ?? '—'} 次</li>)}</ul></div>}
        <p className="no-print"><LLink className="btn sm" q={{ view: 'export', unit: u.id }}>📤 匯出這一課的作答</LLink></p>
      </>}
      {refl && <details className="reflect-sec"><summary>🪞 回到自己　<span className="muted small">🔒 只有你看得到，匯出時預設不包含</span></summary>
        <p className="muted small">{u.reflect}</p><p className="exp-text">{refl}</p></details>}
    </details>
  );
}

/** 備份、還原、換人 */
function Backup({ index, p, update, onReset }: { index: Index; p: Progress; update: (f: (p: Progress) => Progress) => void; onReset: () => void }) {
  const [code, setCode] = useState('');
  const [src, setSrc] = useState('');
  const [inc, setInc] = useState<Progress | null>(null);
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [typed, setTyped] = useState('');
  const title = (id: string) => index.units.find((u) => u.id === id)?.title ?? id;
  // 貼上或選檔後解析
  useEffect(() => {
    setInc(null); setErr(''); setMsg('');
    if (!src.trim()) return;
    let off = false;
    unpackBackup(src).then((x) => { if (!off) setInc(x); }).catch((e) => { if (!off) setErr((e as Error).message); });
    return () => { off = true; };
  }, [src]);
  const plan: MergePlan | null = inc ? planMerge(p, inc) : null;
  const download = () => {
    const blob = new Blob([JSON.stringify(backupOf(p), null, 1)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `歷史長河-學習進度-${today()}.json`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };
  const makeCode = async () => { const c = await packBackup(p); setCode(c); try { await navigator.clipboard.writeText(c); } catch { /* 手動複製 */ } };
  const apply = () => { if (!inc) return; update((o) => mergeProgress(o, inc)); setMsg(`已還原：新增 ${plan!.added.length} 課、更新 ${plan!.newer.length} 課。`); setSrc(''); };

  return (
    <section className="backup no-print" id="backup">
      <h3>💾 備份與換人</h3>
      <p className="muted small">進度只存在這台瀏覽器。換電腦、換瀏覽器，或學校電腦要給下一位同學用之前，先備份。</p>
      <div className="row">
        <button className="btn" onClick={download}>⬇ 備份進度（下載 .json 檔）</button>
        <button className="btn" onClick={makeCode}>📋 產生備份碼（複製）</button>
      </div>
      {code && <><textarea className="code-box" readOnly rows={3} value={code} onFocus={(e) => e.currentTarget.select()} aria-label="備份碼" /><p className="muted small">備份碼共 {code.length} 個字元，已嘗試複製到剪貼簿。含姓名、班級、座號與全部作答，請自己保管。</p></>}

      <h4>還原進度</h4>
      <p className="muted small">選備份檔，或把備份碼／檔案內容貼在下面。還原前會先告訴你會改動什麼；同一課會取「最近做的那一份」，不會把比較新的蓋掉。</p>
      <div className="row"><input type="file" accept=".json,.txt,application/json,text/plain" aria-label="選備份檔" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setSrc(await f.text()); e.target.value = ''; }} /></div>
      <textarea className="code-box" rows={3} value={src} onChange={(e) => setSrc(e.target.value)} placeholder="貼上備份碼（HRB1.…）或備份檔的內容" spellCheck={false} aria-label="貼上備份碼" />
      {err && <p className="t-errors" role="alert">讀不懂這份備份：{err}</p>}
      {plan && inc && (
        <div className="restore-plan" role="region" aria-label="還原預覽">
          <p><b>這份備份有 {Object.keys(inc.units).length} 課的進度。還原後：</b></p>
          <ul>
            <li>新增 {plan.added.length} 課{plan.added.length > 0 && <small className="muted">：{plan.added.map(title).join('、')}</small>}</li>
            <li>用備份裡比較新的取代 {plan.newer.length} 課{plan.newer.length > 0 && <small className="muted">：{plan.newer.map(title).join('、')}</small>}</li>
            <li>這台比較新、保留不動 {plan.kept.length} 課；完全相同 {plan.same.length} 課</li>
            <li>讀過的卡片多 {plan.cardsAdded} 張{inc.profile?.name && !p.profile?.name ? `；姓名會補上「${inc.profile.name}」` : ''}</li>
          </ul>
          <button className="btn primary" onClick={apply}>確認還原</button>
        </div>
      )}
      {msg && <p className="ok" role="status">✓ {msg}</p>}

      <details className="danger-zone" id="notme"><summary>🙋 這不是我？清除並重新開始</summary>
        <p>這台電腦是不是換人用了？把這台瀏覽器裡<b>所有</b>課程進度、讀過的卡片、寫過的回答和姓名班級座號清掉，讓下一位從頭開始。<b>清掉就找不回來</b>，要留著請先按上面的「備份進度」。</p>
        <label className="notme-in">輸入「清除」兩個字才能按下面的按鈕：<input type="text" value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" /></label>
        <button className="btn sm danger" disabled={typed.trim() !== '清除'} onClick={() => { setTyped(''); onReset(); }}>清除這台的全部紀錄，重新開始</button>
      </details>
    </section>
  );
}
