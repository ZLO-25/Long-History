// 老師檢視：貼上學生的分享碼（一個或全班），依課分組成表格——一列一位學生、一欄一個互動
// 資料只在這個畫面的記憶體裡，不存檔、不上傳；重新整理就沒有了
import { useEffect, useMemo, useState } from 'react';
import type { Index, Unit } from '../types';
import { ensureUnits, unitLoaded } from '../lib/detail';
import { charCount, LEVELS, unitLevel } from './level';
import { minutesOf, rowsOf, yn, type Row } from './report';
import { parseCodes, progOf, type Parsed, type Payload } from './share';
import { LLink } from './nav';
import './extra.css';

interface Stu { pl: Payload; rows: Row[]; level: string; mins: number | ''; no: string; name: string; cls: string }
const seatNum = (s: string) => { const n = parseInt(s, 10); return Number.isFinite(n) ? n : 9999; };
const csvCell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const short = (t: string, n = 8) => { const a = [...t]; return a.length > n ? `${a.slice(0, n).join('')}…` : t; };

function csvOf(groups: { u: Unit; stu: Stu[] }[]): string {
  const head = ['課名', '班級', '座號', '姓名', '等級', '花費分鐘', '步驟', '題目', '類型', '第一次對錯', '最後對錯', '嘗試次數', '回答', '補寫'];
  const L = [head.map(csvCell).join(',')];
  for (const { u, stu } of groups) for (const s of stu) for (const r of s.rows) {
    const type = r.kind === 'rec' ? '選擇／排序' : r.kind === 'open' ? '開放題' : r.kind === 'think' ? '掩卷自思' : r.kind === 'guess' ? '先猜猜看' : r.kind === 'quick' ? '小題自評' : '決策選擇';
    const ans = r.kind === 'rec' ? r.chose : r.kind === 'open' || r.kind === 'think' ? r.text : r.value;
    L.push([u.title, s.cls, s.no, s.name, s.level, s.mins, r.label, r.q, type, r.kind === 'rec' && r.answered ? (r.f ? '對' : '錯') : '', r.kind === 'rec' && r.answered ? (r.l ? '對' : '錯') : '', r.kind === 'rec' ? r.n ?? '' : '', ans ?? '', r.more ?? ''].map(csvCell).join(','));
  }
  return `﻿${L.join('\r\n')}`;
}

export default function Teacher({ index }: { index: Index }) {
  // 從連結（#code=…）進來：先取出放進文字框，再把網址上的碼拿掉（不留在瀏覽紀錄裡）
  const [text, setText] = useState(() => { try { const m = /(?:^|[#&])code=([^&]+)/.exec(location.hash); return m ? decodeURIComponent(m[1]) : ''; } catch { return ''; } });
  useEffect(() => { if (location.hash) history.replaceState(history.state, '', location.pathname + location.search); }, []);
  const [parsed, setParsed] = useState<Parsed[]>([]);
  const [openAll, setOpenAll] = useState(false);
  useEffect(() => { let off = false; parseCodes(text).then((r) => { if (!off) setParsed(r); }); return () => { off = true; }; }, [text]);

  const good = parsed.filter((x): x is Extract<Parsed, { payload: Payload }> => 'payload' in x);
  const bad = parsed.filter((x): x is Extract<Parsed, { error: string }> => 'error' in x);
  const ids = useMemo(() => [...new Set(good.map((g) => g.payload.u))].filter((id) => index.units.some((u) => u.id === id)), [parsed, index.units]); // eslint-disable-line react-hooks/exhaustive-deps
  const idsKey = ids.join();
  useEffect(() => { if (ids.length) ensureUnits(ids); }, [idsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const unknown = [...new Set(good.map((g) => g.payload.u).filter((id) => !index.units.some((u) => u.id === id)))];
  const groups = ids.filter((id) => unitLoaded(index, id)).map((id) => {
    const u = index.units.find((x) => x.id === id)!;
    const stu: Stu[] = good.filter((g) => g.payload.u === id).map((g) => {
      const pr = progOf(g.payload), lv = unitLevel(u, pr);
      return { pl: g.payload, rows: rowsOf(u, pr), level: lv ? `${LEVELS[lv].icon}${LEVELS[lv].name}` : '未完成', mins: minutesOf(g.payload.tm), no: g.payload.s ?? '', name: g.payload.n ?? '', cls: g.payload.c ?? '' };
    }).sort((a, b) => seatNum(a.no) - seatNum(b.no) || a.name.localeCompare(b.name));
    return { u, stu };
  });
  const waiting = ids.filter((id) => !unitLoaded(index, id)).length;

  // 列印時把每個「展開全文」都打開
  useEffect(() => {
    const open = () => document.querySelectorAll<HTMLDetailsElement>('.teacher details').forEach((d) => { d.open = true; });
    window.addEventListener('beforeprint', open);
    return () => window.removeEventListener('beforeprint', open);
  }, []);
  const download = () => {
    const blob = new Blob([csvOf(groups)], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `歷史長河-全班作答-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  return (
    <div className="teacher">
      <div className="no-print">
        <h2>👩‍🏫 老師檢視</h2>
        <p className="muted">請學生在做完一課後，到那一課的「匯出作答」按「產生分享碼」，把碼傳給你。把一個或全班的碼貼在下面（換行或空白隔開，也可以貼帶 <code>#code=</code> 的連結），就會依課排成表格。</p>
        <p className="privacy"><b>隱私說明：</b>分享碼裡有學生的姓名、座號和作答，只有拿到碼的人看得到。這個網站沒有伺服器，貼進來的資料只在這台瀏覽器的記憶體裡，不會上傳、也不會存檔；重新整理或關掉頁面就沒有了。公用電腦用完請關掉這一頁。</p>
        <label className="t-label" htmlFor="t-codes">貼上分享碼</label>
        <textarea id="t-codes" className="code-box" rows={5} value={text} onChange={(e) => setText(e.target.value)} placeholder={'HR1.…（每個學生一個碼，用換行隔開）'} spellCheck={false} />
        <div className="row">
          <span className="muted small" aria-live="polite">讀到 {good.length} 個碼{bad.length ? `，${bad.length} 個有問題` : ''}{waiting ? '・載入題目中…' : ''}</span>
          {text && <button className="btn sm" onClick={() => setText('')}>清空</button>}
          {groups.length > 0 && <>
            <button className="btn sm" onClick={download}>⬇ 下載 CSV</button>
            <button className="btn sm" onClick={() => window.print()}>🖨 列印</button>
            <button className="btn sm" onClick={() => setOpenAll(!openAll)}>{openAll ? '收合全部作答' : '展開全部作答'}</button>
          </>}
          <LLink className="btn sm" q={{ view: 'record' }}>← 回學習紀錄</LLink>
        </div>
        {bad.length > 0 && <ul className="t-errors" role="alert">{bad.map((b) => <li key={b.n}>第 {b.n} 個碼有問題：{b.error}（{short(b.code, 14)}）</li>)}</ul>}
        {unknown.length > 0 && <p className="t-errors" role="alert">有 {unknown.length} 個碼的課（{unknown.join('、')}）這個網站版本找不到，已略過。</p>}
      </div>

      {groups.map(({ u, stu }) => <Lesson key={u.id} u={u} stu={stu} openAll={openAll} />)}
    </div>
  );
}

function Lesson({ u, stu, openAll }: { u: Unit; stu: Stu[]; openAll: boolean }) {
  const cols = useMemo(() => rowsOf(u).filter((r) => r.kind !== 'think'), [u]);
  const cell = (s: Stu, r: Row) => {
    const x = s.rows.find((y) => y.key === r.key && y.kind === r.kind)!;
    if (x.kind === 'rec') return x.answered ? <><b className={x.f ? 'ok' : 'no'} title={`最後${yn(x.l)}${x.chose ? `，選了 ${x.chose}` : ''}`}>{x.f ? '✔' : '✘'}</b><small>{x.n ?? ''}</small></> : <span className="muted">—</span>;
    if (x.kind === 'open') return x.text ? <details className="t-open" open={openAll}><summary>{charCount(x.text)} 字</summary><div className="t-text">{x.text}{x.more && <p className="small">補寫：{x.more}</p>}</div></details> : x.skip ? <span className="muted" title="按了「我真的想不出來」">想不出來</span> : <span className="muted">—</span>;
    return x.value ? <span title={x.value}>{short(x.value, 6)}</span> : <span className="muted">—</span>;
  };
  // 第一次答對率：只算有作答的人
  const rates = cols.map((c) => {
    if (c.kind !== 'rec') return null;
    const xs = stu.map((s) => s.rows.find((y) => y.key === c.key)!).filter((x) => x.answered && x.f !== undefined);
    return xs.length ? { right: xs.filter((x) => x.f).length, total: xs.length } : null;
  });
  const vals = rates.filter((r): r is { right: number; total: number } => !!r).map((r) => r.right / r.total);
  const min = vals.length ? Math.min(...vals) : 1;
  const low = (i: number) => { const r = rates[i]; return !!r && min < 1 && r.right / r.total === min; };
  const lowCols = cols.filter((_, i) => low(i));
  // 逐題看全班：開放題與掩卷自思
  const textQs = rowsOf(u).filter((r) => r.kind === 'open' || r.kind === 'think');
  const allDone = stu.filter((s) => s.pl.lv).length;
  return (
    <section className="t-lesson">
      <h3>《{u.title}》<small className="muted">　{stu.length} 位學生・{allDone} 位按了完成</small></h3>
      <div className="table-scroll">
        <table className="t-table">
          <thead><tr><th>座號</th><th>姓名</th><th>等級</th><th>分鐘</th>
            {cols.map((c) => <th key={c.key + c.kind} title={c.q}>{c.label}</th>)}</tr></thead>
          <tbody>{stu.map((s, i) => <tr key={i}><td>{s.no || '—'}</td><td>{s.name || '（未填）'}{s.cls && <small className="muted"> {s.cls}</small>}</td><td>{s.level}</td><td>{s.mins === '' ? '—' : s.mins}</td>
            {cols.map((c) => <td key={c.key + c.kind}>{cell(s, c)}</td>)}</tr>)}</tbody>
          <tfoot><tr><th colSpan={4}>第一次答對率</th>{cols.map((c, i) => <td key={c.key + c.kind} className={low(i) ? 't-low' : ''}>{rates[i] ? <>{rates[i]!.right}／{rates[i]!.total}<br />{Math.round((rates[i]!.right / rates[i]!.total) * 100)}%{low(i) && <><br />⚠ 最低</>}</> : ''}</td>)}</tr></tfoot>
        </table>
      </div>
      {lowCols.length > 0 && <p className="t-lowline" role="status">⚠ 答對率最低的題目：{lowCols.map((c) => <span key={c.key}>{c.label}「{c.q}」（{Math.round(min * 100)}%）</span>)}</p>}
      <p className="muted small">✔／✘＝第一次答對／答錯，旁邊的小數字＝嘗試次數（游標移上去可看最後結果與選的選項）。開放題顯示字數，點開看全文。</p>
      {textQs.length > 0 && (
        <div className="t-class">
          <h4>逐題看全班（課堂討論用）</h4>
          {textQs.map((q) => {
            const ans = stu.map((s) => ({ s, x: s.rows.find((y) => y.key === q.key && y.kind === q.kind)! })).filter(({ x }) => x.text || x.skip);
            return (
              <details key={q.key + q.kind} open={openAll}>
                <summary><b>{q.label}</b>・{q.q}　<span className="muted small">（{ans.length}／{stu.length} 人有回答）</span></summary>
                {ans.length === 0 ? <p className="muted">還沒有人回答。</p> : ans.map(({ s, x }, i) => (
                  <div key={i} className="rec-a"><p className="muted small">{s.no ? `${s.no} 號 ` : ''}{s.name || '（未填姓名）'}</p>
                    <p>{x.text || '（按了「我真的想不出來」）'}</p>
                    {x.pts && <p className="small">自評：{x.pts.map((p, k) => `${k + 1}.${p.v === true ? '有寫到' : p.v === false ? '沒寫到' : '未勾'}`).join('　')}</p>}
                    {x.more && <p className="muted small">補寫：{x.more}</p>}</div>
                ))}
              </details>
            );
          })}
        </div>
      )}
    </section>
  );
}

