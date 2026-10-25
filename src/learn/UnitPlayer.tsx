// 單元播放器：謎題 → 一步一步（進度條）→ 自我檢查 → 回顧 → 接下來可以挖
import { useEffect, useRef, useState } from 'react';
import type { Index, Step, Unit } from '../types';
import { LearnCard, type Depth } from './LearnCard';
import { LearnText } from './LearnText';
import { Choice, CheckQ, CompareTable, Decision, Hints, Order, RefLink, Short } from './Steps';
import { SimView } from './sims/SimView';
import type { UnitProgress } from './progress';

const STEP_LABEL: Record<Step['type'], string> = {
  hook: '引子', card: '讀卡片', source: '史料判讀', chain: '因果鏈', compare: '觀點比較', decision: '你是決策者',
  today: '今日對照', sim: '金融模擬', check: '自我檢查', recap: '回顧',
};

interface Props {
  unit: Unit; index: Index; prog: UnitProgress | undefined; setProg: (p: Partial<UnitProgress>) => void;
  onCard: (id: string, section?: string) => void; onUnit: (id: string) => void; onSim: (id: string) => void;
  onFocus?: (cardId: string | null) => void;
}

export function UnitPlayer({ unit: u, index, prog, setProg, onCard, onUnit, onFocus }: Props) {
  const step = Math.min(prog?.step ?? -1, u.steps.length - 1);
  const top = useRef<HTMLDivElement>(null);
  const go = (n: number) => { setProg({ step: n }); top.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }); };
  const s = step >= 0 ? u.steps[step] : null;
  const byId = (id: string) => index.cards.find((c) => c.id === id);
  // 讓地圖與時間軸跟著目前這一步的卡片走
  const focusId = s && (s.type === 'card' ? s.id : s.type === 'source' || s.type === 'today' ? s.card : s.type === 'compare' ? s.cards[0] : s.type === 'decision' ? s.ref.split('#')[0] : null);
  useEffect(() => { onFocus?.(focusId ?? null); }, [focusId]);
  const ref = (r?: string) => <RefLink refStr={r} index={index} onCard={onCard} />;
  const save = (k: string, v: unknown) => setProg({ answers: { ...(prog?.answers ?? {}), [k]: v } });
  // 自我檢查的小計：每題答對／答錯／簡答（不評分）
  const [checkRes, setCheckRes] = useState<Record<number, boolean | null>>({});
  useEffect(() => setCheckRes({}), [step]);
  // 鍵盤 ← → 換步（打字中不觸發）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.altKey || e.ctrlKey || e.metaKey || tag === 'INPUT' || tag === 'TEXTAREA' || step < 0) return;
      if (e.key === 'ArrowRight' && step < u.steps.length - 1) go(step + 1);
      if (e.key === 'ArrowLeft' && step > 0) go(step - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, u.steps.length]);
  // 複製這一課的連結（老師派作業、同學互傳）
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    const url = `${location.origin}${location.pathname}?mode=learn&unit=${u.id}`;
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500); }
    catch { window.prompt('複製這個連結：', url); }
  };

  const body = (() => {
    if (!s) return (
      <div className="unit-intro">
        <p className="mystery-big">❓ {u.mystery}</p>
        {u.teaser && <p>{u.teaser}</p>}
        <h3>學完你會</h3>
        <ul>{u.goals.map((g) => <li key={g}>{g}</li>)}</ul>
        <p className="muted">預估 {u.minutes} 分鐘・{u.steps.length} 步・可以隨時離開，進度會記在這台瀏覽器</p>
        <ol className="step-outline" aria-label="這一課的步驟">{u.steps.map((x, i) => <li key={i} className={prog?.step != null && i < prog.step ? 'done' : ''}>{STEP_LABEL[x.type]}</li>)}</ol>
        <button className="btn primary big" onClick={() => go(0)}>{prog?.step != null && prog.step > 0 ? `從第 ${prog.step + 1} 步繼續` : '開始'}</button>
      </div>
    );
    switch (s.type) {
      case 'hook': return <div className="hook-step"><LearnText text={s.text} sources={[]} /></div>;
      case 'card': {
        const c = byId(s.id);
        return c?.learn ? <>{s.prompt && <p className="prompt">👉 {s.prompt}</p>}<LearnCard key={c.id} card={c} index={index} history={null} depth={s.depth as Depth} onOpen={(id) => onCard(id)} compact /></> : <p>找不到卡片 {s.id}</p>;
      }
      case 'source': {
        const c = byId(s.card)!;
        const p = c.learn!.primary_source[s.idx ?? 0];
        return <>
          <figure className="primary big"><blockquote>{p.text}</blockquote><figcaption>— {p.from}</figcaption></figure>
          <Choice key={step} q={s.question} options={s.options} answer={s.answer} explain={s.explain} hints={s.hints} after={ref(s.ref)}
            saved={prog?.answers?.[`s${step}`] as number | undefined} onDone={(v) => save(`s${step}`, v)} />
          <p className="muted small">讀史料先問三件事：誰寫的？什麼時候寫的？他為什麼這樣寫？</p>
        </>;
      }
      case 'chain': return <Order key={step} prompt={s.prompt} items={s.items} explain={s.explain} hints={s.hints} seed={`${u.id}-${step}`} after={ref(s.ref)} />;
      case 'compare': {
        const [a, b] = s.cards.map(byId);
        return <>
          {s.prompt && <p className="prompt">{s.prompt}</p>}
          {a && b && <CompareTable a={a} b={b} rows={s.rows} />}
          <div className="chips">{[a, b].map((c) => c && <button key={c.id} className="chip" onClick={() => onCard(c.id)}>📖 {c.name}</button>)}</div>
          <Short key={step} q={s.question} model={s.model_answer} hints={s.hints} saved={prog?.answers?.[`s${step}`] as string | undefined} onSave={(t) => save(`s${step}`, t)} />
        </>;
      }
      case 'decision': return <Decision key={step} role={s.role} situation={s.situation} options={s.options} actual={s.actual} note={s.note} after={ref(s.ref)} />;
      case 'today': {
        const c = byId(s.card)!;
        const hook = c.sections.find((x) => x.role === 'today_hook'), no = c.sections.find((x) => x.role === 'non_analogous');
        return <>
          <div className="today-pair"><div className="pair">
            <div><h4>像的地方</h4><LearnText text={hook?.text ?? ''} sources={c.sources} /></div>
            <div className="not"><h4>不能直接類比的地方</h4><LearnText text={no?.text ?? ''} sources={c.sources} /></div>
          </div></div>
          <Short key={step} q={s.question} model={s.model_answer} saved={prog?.answers?.[`s${step}`] as string | undefined} onSave={(t) => save(`s${step}`, t)} />
        </>;
      }
      case 'sim': return <>{s.prompt && <p className="prompt">{s.prompt}</p>}<SimView id={s.sim} index={index} onCard={onCard} /></>;
      case 'check': {
        const graded = s.items.map((_, i) => checkRes[i]).filter((v) => typeof v === 'boolean');
        const right = graded.filter(Boolean).length, nGrade = s.items.filter((q) => q.kind !== 'short').length;
        return <>
          <p className="check-tally" aria-live="polite">{graded.length ? <>選擇與排序題：答對 <b>{right}</b>／{nGrade}（已作答 {graded.length}）{graded.length === nGrade && (right === nGrade ? '・全對，太強了 🎉' : '・答錯的題目下面有「回到卡片看」，看完再試一次')}</> : `共 ${s.items.length} 題，答完每一題都會馬上有解析。`}</p>
          <div className="checks-list">{s.items.map((q, i) => <CheckQ key={`${step}-${i}`} q={q} i={i} seed={`${u.id}-${step}`} index={index} onCard={onCard} onResult={(ok) => setCheckRes((r) => (r[i] === ok ? r : { ...r, [i]: ok }))} />)}</div>
        </>;
      }
      case 'recap': return (
        <div className="recap">
          <p className="mystery-big">❓ {u.mystery}</p>
          <Short key={step} q="現在，用你自己的話回答一開始的謎題：" model={s.model_answer} label="寫好了，看參考說法"
            saved={prog?.recap} onSave={(t) => setProg({ recap: t })} />
          {!prog?.done ? <button className="btn primary big" onClick={() => setProg({ done: true, doneAt: new Date().toISOString().slice(0, 10) })}>完成這個單元 🏅</button>
            : <p className="badge-earned">🏅 你完成了「{u.title}」！它已經點亮在「我的歷史地圖」上。</p>}
          <h3>接下來可以挖</h3>
          <div className="next-units">
            {u.next.map((id) => index.units.find((x) => x.id === id)).filter((x): x is Unit => !!x).map((n) => (
              <button key={n.id} className="unit-tile" onClick={() => onUnit(n.id)}><b>{n.title}</b><span>❓ {n.mystery}</span></button>
            ))}
          </div>
        </div>
      );
    }
  })();

  return (
    <div className="unit" ref={top}>
      <div className="unit-head">
        <div className="unit-title-row"><h2>{u.title}</h2><button className="btn sm" onClick={copyLink} title="複製這一課的連結，可以傳給同學或老師">{copied ? '✓ 已複製' : '🔗 複製連結'}</button></div>
        {step >= 0 && <div className="progress" aria-label={`第 ${step + 1} 步，共 ${u.steps.length} 步`}>
          {u.steps.map((x, i) => <button key={i} className={`pdot ${i < step ? 'done' : ''} ${i === step ? 'on' : ''}`} title={`${i + 1}. ${STEP_LABEL[x.type]}`} onClick={() => go(i)} />)}
        </div>}
        {s && <p className="step-label">第 {step + 1}／{u.steps.length} 步・{STEP_LABEL[s.type]}{step < u.steps.length - 1 && <span className="muted">・下一步：{STEP_LABEL[u.steps[step + 1].type]}</span>}</p>}
      </div>
      {body}
      {s && <div className="step-nav">
        <button className="btn" onClick={() => go(step - 1)}>← 上一步</button>
        {step < u.steps.length - 1 ? <button className="btn primary" onClick={() => go(step + 1)}>下一步：{STEP_LABEL[u.steps[step + 1].type]} →</button>
          : <span className="muted small">最後一步了，記得按「完成這個單元」</span>}
      </div>}
    </div>
  );
}
export { Hints };
