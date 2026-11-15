// 一課的學習單（紙本）與教師解答：?mode=learn&unit=<id>&print=sheet｜key
// 學習單：題目＋作答線，不含答案、不含卡片全文。解答版：正解、解析、參考說法與 points。
// 打亂的順序用固定種子（和畫面上的一樣）：同一課每次印出來都相同
import { Fragment, type ReactNode } from 'react';
import type { Index, Step } from '../types';
import { shuffled, shuffleOptions } from './Steps';
import { gotoLearn, LLink } from './nav';
import { allMin, mustMin } from './util';
import { LEVELS } from './level';
import './extra.css';

const L = 'ABCDEF';
const CIRC = '①②③④⑤⑥⑦⑧⑨⑩⑪⑫';
/** 選項在畫面上的順序（和 Steps.tsx 的 Choice 一樣：以上皆…的題目不洗） */
const optOrder = (options: string[]) => { const idx = options.map((_, i) => i); return options.some((o) => /以上|上述/.test(o)) ? idx : shuffleOptions(idx, options.join('|')); };
const Lines = ({ n = 2 }: { n?: number }) => <div className="ws-lines" style={{ height: `${n * 2.1}em` }} aria-hidden />;
const STEP_NAME: Record<Step['type'], string> = { hook: '引子', card: '讀卡片', source: '史料判讀', chain: '因果鏈', compare: '觀點比較', decision: '你是決策者', today: '今日對照', sim: '金融模擬', peoples: '看人群地圖', check: '自我檢查', recap: '回顧' };

export default function Worksheet({ index, id, answerKey }: { index: Index; id: string; answerKey: boolean }) {
  const u = index.units.find((x) => x.id === id);
  if (!u) return <p>找不到這一課（{id}）。</p>;
  const byId = (cid: string) => index.cards.find((c) => c.id === cid);
  const url = `${location.origin}${location.pathname}?mode=learn&unit=${u.id}`;
  let qn = 0;
  const key = (children: ReactNode) => (answerKey ? <div className="ws-key"><b>教師用</b>{children}</div> : null);

  /** 選擇題：題號、題目、選項（A–D）；解答版標出正解與解析 */
  const mcq = ({ q, options, answer, explain, why }: { q: string; options: string[]; answer: number; explain?: string; why?: (string | null)[] }) => {
    const order = optOrder(options); const no = ++qn;
    return (
      <div className="ws-q">
        <p><b>{no}.</b> {q}</p>
        <ol className="ws-opts" type="A">{order.map((i) => <li key={i} className={`ws-opt ${answerKey && i === answer ? 'ws-right' : ''}`}>{options[i]}{answerKey && i === answer ? '　✔' : ''}</li>)}</ol>
        {key(<><p>正解：{L[order.indexOf(answer)]}．{options[answer]}</p>{explain && <p>解析：{explain}</p>}{why && why.some(Boolean) && <ul>{why.map((w, i) => w ? <li key={i}>選 {L[order.indexOf(i)]} 的話：{w}</li> : null)}</ul>}</>)}
      </div>
    );
  };
  const open = ({ q, n = 3, model, points }: { q: string; n?: number; model?: string; points?: string[] }) => {
    const no = ++qn;
    return (
      <div className="ws-q">
        <p><b>{no}.</b> {q}</p><Lines n={n} />
        {key(<>{model && <p>參考說法：{model}</p>}{points && points.length > 0 && <><p>重點：</p><ul>{points.map((t, i) => <li key={i}>{t}</li>)}</ul></>}</>)}
      </div>
    );
  };
  const chain = ({ prompt, items, seed, explain }: { prompt: string; items: string[]; seed: string; explain?: string }) => {
    const pool = shuffled(items, seed), no = ++qn;
    return (
      <div className="ws-q">
        <p><b>{no}.</b> {prompt}（把編號依時間或因果寫在下面，最早的在最前面）</p>
        <ol className="ws-chain">{pool.map((x, i) => <li key={i}><span className="ws-num">{CIRC[i]}</span> {x}</li>)}</ol>
        <p className="ws-seq">我的排序：＿＿ → ＿＿ → ＿＿ → ＿＿ → ＿＿ → ＿＿</p>
        {key(<><p>正確順序：{items.map((x) => CIRC[pool.indexOf(x)]).join(' → ')}</p><ol>{items.map((x, i) => <li key={i}>{x}</li>)}</ol>{explain && <p>解析：{explain}</p>}</>)}
      </div>
    );
  };

  const steps = (u.steps as Step[]).map((s, i) => {
    const head = (extra?: string) => <h3>第 {i + 1} 步・{STEP_NAME[s.type]}{extra ? `：${extra}` : ''}</h3>;
    switch (s.type) {
      case 'hook': {
        if (!s.guess || typeof s.guess !== 'object') return null;
        const g = s.guess, no = ++qn;
        return <section key={i} className="ws-step">{head()}<div className="ws-q"><p><b>{no}.</b> 先猜猜看（沒有對錯，憑直覺選）：{g.q}</p>
          <ol className="ws-opts" type="A">{g.options.map((o, k) => <li key={k} className="ws-opt">{o}</li>)}</ol>
          {key(<p>歷史上的答案：{g.reveal}</p>)}</div></section>;
      }
      case 'card': {
        const c = byId(s.id);
        return <section key={i} className="ws-step">{head(c?.name)}
          <p className="ws-read">請到網站讀這張卡片：{c?.name ?? s.id}（網址見最上方）{s.prompt ? <><br />👉 {s.prompt}</> : null}</p>
          {(s.quick ?? []).map((q, j) => <Fragment key={j}>{open({ q: q.q, n: 2, model: q.a })}</Fragment>)}
        </section>;
      }
      case 'source': {
        const c = byId(s.card), p = c?.learn?.primary_source?.[s.idx ?? 0];
        return <section key={i} className="ws-step">{head()}
          {p && <blockquote className="ws-src">{p.text}<cite>— {p.from}</cite></blockquote>}
          {mcq({ q: s.question, options: s.options, answer: s.answer, explain: s.explain, why: s.why_wrong })}
          {typeof s.critique === 'object' && mcq({ q: s.critique.question, options: s.critique.options, answer: s.critique.answer, explain: s.critique.explain, why: s.critique.why_wrong })}
        </section>;
      }
      case 'chain': return <section key={i} className="ws-step">{head()}
        {chain({ prompt: s.prompt, items: s.items, seed: `${u.id}-${i}`, explain: s.explain })}
        {typeof s.followup === 'object' && mcq({ q: s.followup.question, options: s.followup.options, answer: s.followup.answer, explain: s.followup.explain, why: s.followup.why_wrong })}
      </section>;
      case 'compare': {
        const [a, b] = s.cards.map(byId);
        return <section key={i} className="ws-step">{head()}
          {s.prompt && <p>{s.prompt}</p>}
          <table className="ws-table"><thead><tr><th></th><th>{a?.name ?? s.cards[0]}</th><th>{b?.name ?? s.cards[1]}</th></tr></thead>
            <tbody>{s.rows.map((r, k) => <tr key={k}><th>{r.aspect}</th><td>{r.a}</td><td>{r.b}</td></tr>)}</tbody></table>
          {open({ q: s.question, n: 4, model: s.model_answer, points: s.points })}
        </section>;
      }
      case 'decision': {
        const opts = shuffleOptions(s.options, `${u.id}-${i}`), no = ++qn;
        return <section key={i} className="ws-step">{head()}
          <div className="ws-q"><p><b>{no}.</b> 🎭 {s.role}</p><p className="ws-situation">{s.situation}</p>
            <ol className="ws-opts" type="A">{opts.map((o, k) => <li key={k} className="ws-opt">{o.label}</li>)}</ol>
            <p>我會選 ＿＿，因為：</p><Lines n={3} />
            {key(<><ul>{opts.map((o, k) => <li key={k}>{L[k]}．{o.label}：{o.result}</li>)}</ul><p>歷史上實際發生的：{s.actual}</p>{s.note && <p>{s.note}</p>}</>)}</div>
        </section>;
      }
      case 'today': {
        const c = byId(s.card);
        return <section key={i} className="ws-step">{head(c?.name)}{open({ q: s.question, n: 3, model: s.model_answer, points: s.points })}</section>;
      }
      case 'sim': return <section key={i} className="ws-step">{head()}<p className="ws-read">請到網站操作這個模擬（{s.sim}）。{s.prompt ? <><br />👉 {s.prompt}</> : null}</p></section>;
      case 'peoples': return <section key={i} className="ws-step">{head()}<p className="ws-read">請到網站看人群地圖。<br />👉 {s.prompt}</p></section>;
      case 'check': return <section key={i} className="ws-step">{head()}
        {s.items.map((q, k) => <Fragment key={k}>{q.kind === 'choice' ? mcq({ q: q.q, options: q.options!, answer: q.answer!, explain: q.explain, why: q.why_wrong })
          : q.kind === 'order' ? chain({ prompt: q.q, items: q.items!, seed: `${u.id}-${i}-${k}`, explain: q.explain })
            : open({ q: q.q, n: 3, model: q.model ? `${q.model}（${q.explain}）` : q.explain, points: q.points })}</Fragment>)}
      </section>;
      case 'recap': return <section key={i} className="ws-step">{head()}
        {open({ q: `現在，用自己的話回答一開始的謎題：${u.mystery}`, n: 5, model: s.model_answer, points: s.points })}
        <div className="ws-q ws-reflect"><p><b>🪞 回到自己</b>：{u.reflect ?? '這段歷史裡，哪一個人的哪一個選擇最讓你有感？如果將來你遇到很像的處境，你想記得什麼？'}</p><Lines n={4} />
          {key(<p>沒有標準答案，請尊重學生寫給自己的想法。</p>)}</div>
      </section>;
    }
  });

  return (
    <div className={`ws ${answerKey ? 'ws-answers' : ''}`}>
      <div className="no-print ws-bar">
        <button className="btn primary" onClick={() => window.print()}>🖨 列印{answerKey ? '解答' : '學習單'}</button>
        {answerKey ? <LLink className="btn" q={{ unit: u.id, print: 'sheet' }}>看學習單（學生用）</LLink> : <LLink className="btn" q={{ unit: u.id, print: 'key' }}>看解答（教師用）</LLink>}
        <button className="btn" onClick={() => gotoLearn({ unit: u.id })}>← 回到這一課</button>
        <p className="muted small">下面是列印預覽（A4）。列印時只會印白底的內容；解答只有老師用的那一版才有。</p>
      </div>
      <header className="ws-head">
        <p className="ws-site">歷史長河・{answerKey ? <b className="ws-tag">教師用解答</b> : '學習單'}</p>
        <h2>《{u.title}》</h2>
        {!answerKey && <p className="ws-who">姓名：＿＿＿＿＿＿　班級：＿＿＿＿　座號：＿＿＿　日期：＿＿＿＿＿＿</p>}
        <p className="ws-mystery">❓ {u.mystery}</p>
        {u.goals.length > 0 && <><p className="ws-goals-h"><b>學完你會</b></p><ul className="ws-goals">{u.goals.map((g) => <li key={g}>{g}</li>)}</ul></>}
        <p className="muted small">必讀約 {mustMin(u)} 分鐘{allMin(u) > mustMin(u) ? `・全部讀完約 ${allMin(u)} 分鐘` : ''}・共 {u.steps.length} 步。卡片請到網站閱讀：<span className="ws-url">{url}</span></p>
        {answerKey && <p className="muted small">等級說明：{LEVELS.walked.icon}{LEVELS.walked.name}＝走完；{LEVELS.done.icon}{LEVELS.done.name}＝每題都作答；{LEVELS.mastered.icon}{LEVELS.mastered.name}＝自我檢查答對八成以上。</p>}
      </header>
      {steps}
      <p className="ws-foot muted small">歷史長河 · {url}</p>
    </div>
  );
}
