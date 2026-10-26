// 我的學習紀錄：做了哪些單元、做到哪、自我檢查答對幾題、自己寫過的回答。
// 只存在這台瀏覽器；可以列印或複製成文字交給老師。
import { useState } from 'react';
import type { Index, Unit } from '../types';
import type { Progress } from './progress';
import { learnCards, unitHalf, unitScore } from './util';

const status = (u: Unit, p: Progress) => {
  const x = p.units[u.id];
  if (x?.done) return { k: 'done', t: `🏅 完成${x.doneAt ? `（${x.doneAt}）` : ''}` };
  if (x && x.step > 0) return { k: 'doing', t: `進行中：第 ${x.step + 1}／${u.steps.length} 步${u.steps.length >= 8 ? (x.step >= unitHalf(u) ? '・下半' : '・上半') : ''}` };
  return { k: 'todo', t: '還沒開始' };
};

// 自己寫的文字回答（觀點比較、今日對照、回顧）
const writings = (u: Unit, p: Progress) => {
  const x = p.units[u.id];
  const out: { label: string; text: string }[] = [];
  u.steps.forEach((s, i) => {
    const v = x?.answers?.[`s${i}`];
    if (typeof v === 'string' && v.trim()) out.push({ label: `第 ${i + 1} 步・${'question' in s ? s.question : ''}`, text: v.trim() });
  });
  if (x?.recap?.trim()) out.push({ label: `回顧・${u.mystery}`, text: x.recap.trim() });
  return out;
};

export function LearnRecord({ index, p, onUnit, onReset }: { index: Index; p: Progress; onUnit: (id: string) => void; onReset: () => void }) {
  const [copied, setCopied] = useState(false);
  const units = index.units;
  const done = units.filter((u) => p.units[u.id]?.done).length;
  const doing = units.filter((u) => !p.units[u.id]?.done && (p.units[u.id]?.step ?? 0) > 0).length;
  const cards = learnCards(index), read = cards.filter((c) => p.cards[c.id]).length;
  const sc = units.map((u) => unitScore(u, p.units[u.id]?.answers)).reduce((a, b) => ({ total: a.total + b.total, right: a.right + b.right, answered: a.answered + b.answered }), { total: 0, right: 0, answered: 0 });
  const pct = sc.answered ? Math.round((sc.right / sc.answered) * 100) : null;

  const asText = () => {
    const L = [`歷史長河・我的學習紀錄（${new Date().toISOString().slice(0, 10)}）`, `完成單元 ${done}／${units.length}、進行中 ${doing}、讀過卡片 ${read}／${cards.length}、自我檢查答對 ${sc.right}／${sc.answered}`, ''];
    for (const u of units) {
      const s = status(u, p), r = unitScore(u, p.units[u.id]?.answers);
      L.push(`■ ${u.title}：${s.t.replace('🏅 ', '')}${r.answered ? `；自我檢查 ${r.right}／${r.total}` : ''}`);
      for (const w of writings(u, p)) L.push(`  - ${w.label}\n    ${w.text.replace(/\n/g, '\n    ')}`);
    }
    return L.join('\n');
  };
  const copy = async () => {
    const t = asText();
    try { await navigator.clipboard.writeText(t); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { window.prompt('複製下面的文字：', t); }
  };

  return (
    <div className="record">
      <h2>📒 我的學習紀錄</h2>
      <p className="muted">紀錄只存在這台瀏覽器（換電腦、清除瀏覽資料就會不見）。要交給老師，可以列印或複製成文字。</p>
      <div className="stat-tiles">
        <div><b>{done}<small>／{units.length}</small></b><span>完成單元</span></div>
        <div><b>{doing}</b><span>進行中</span></div>
        <div><b>{read}<small>／{cards.length}</small></b><span>讀過卡片</span></div>
        <div><b>{pct === null ? '—' : `${pct}%`}</b><span>自我檢查答對率{sc.answered ? `（${sc.right}／${sc.answered}）` : ''}</span></div>
      </div>
      <div className="row no-print">
        <button className="btn" onClick={() => window.print()}>🖨 列印（交給老師）</button>
        <button className="btn" onClick={copy}>{copied ? '✓ 已複製' : '📋 複製成文字'}</button>
      </div>
      <div className="table-scroll">
        <table className="rec">
          <thead><tr><th>單元</th><th>狀態</th><th>自我檢查</th><th className="no-print"></th></tr></thead>
          <tbody>{units.map((u) => {
            const s = status(u, p), r = unitScore(u, p.units[u.id]?.answers);
            return <tr key={u.id} className={`st-${s.k}`}>
              <td><b>{u.title}</b></td>
              <td>{s.t}</td>
              <td>{r.answered ? <>{r.right}／{r.total}{r.answered < r.total ? <span className="muted small">（做了 {r.answered} 題）</span> : r.right === r.total ? ' 🎉' : ''}</> : <span className="muted">—</span>}</td>
              <td className="no-print"><button className="btn sm" onClick={() => onUnit(u.id)}>{s.k === 'done' ? '複習' : s.k === 'doing' ? '接著做' : '開始'}</button></td>
            </tr>;
          })}</tbody>
        </table>
      </div>
      <h3>我寫過的回答</h3>
      {units.every((u) => !writings(u, p).length) ? <p className="muted">還沒有。單元裡的「觀點比較」「今日對照」「回顧」寫下的文字，會整理在這裡。</p>
        : units.map((u) => { const ws = writings(u, p); return ws.length ? (
          <details key={u.id} className="rec-w" open>
            <summary>{u.title}（{ws.length}）</summary>
            {ws.map((w, i) => <div key={i} className="rec-a"><p className="muted small">{w.label}</p><p>{w.text}</p></div>)}
          </details>) : null; })}
      <details className="no-print danger-zone"><summary>清除紀錄</summary>
        <p className="muted small">會清掉這台瀏覽器裡所有單元進度、讀過的卡片和寫過的回答，無法復原。</p>
        <button className="btn sm danger" onClick={() => { if (window.confirm('確定要清除全部學習紀錄？清掉就找不回來了。')) onReset(); }}>清除全部學習紀錄</button>
      </details>
    </div>
  );
}
