// 單元播放器：謎題 → 一步一步（進度條）→ 自我檢查 → 回顧 → 接下來可以挖
import { useEffect, useRef, useState } from 'react';
import type { Index, Step, Unit } from '../types';
import { LearnCard } from './LearnCard';
import { LearnText } from './LearnText';
import { Choice, CheckQ, CompareTable, Decision, Guess, Hints, Order, Quick, RefLink, Reflect, Short } from './Steps';
import { ImageQ, MapQ, Sources2, Transfer } from './NewSteps';
import { UnitResult } from './UnitResult';
import { LEVELS, metaOf, recOf, seenSet, unitLevel, type Meta, type Rec } from './level';
import { SimView } from './sims/SimView';
import { saveTimeNow, type UnitProgress } from './progress';
import { allMin, mustMin, unitHalf } from './util';
import { intent } from '../lib/detail';
import { LLink } from './nav';
import { PeoplePanel } from '../components/PeoplePanel';
import { loadPeoples, PEOPLE_ABOUT, PEOPLE_INTRO, PEOPLE_MIGS, MIG_PREFIX, type Peoples } from '../lib/peoples';

/** 人群圖層某一頁的短名稱，用在「下一步：看人群地圖・臺灣放大鏡」 */
const peopleTitle = (d: Peoples | null, id: string) =>
  id === PEOPLE_ABOUT ? '為什麼不畫人種' : id === PEOPLE_INTRO ? '人群圖層' : id === PEOPLE_MIGS ? '八條大遷徙' : id === 'Taiwan' ? '臺灣放大鏡'
    : id.startsWith(MIG_PREFIX) ? (d?.migrations.find((m) => MIG_PREFIX + m.id === id)?.name.split('：')[0] ?? '遷徙') : d?.countries[id]?.zh ?? id;

const STEP_LABEL: Record<Step['type'], string> = {
  hook: '引子', card: '讀卡片', source: '史料判讀', chain: '因果鏈', compare: '觀點比較', decision: '你是決策者',
  today: '今日對照', sim: '金融模擬', peoples: '看人群地圖', check: '自我檢查', recap: '回顧',
  mapq: '看地圖回答', sources2: '兩份史料對讀', image: '圖像史料', transfer: '換個案例試試',
};

interface Props {
  unit: Unit; index: Index; prog: UnitProgress | undefined; setProg: (p: Partial<UnitProgress>) => void;
  onCard: (id: string, section?: string) => void; onUnit: (id: string) => void; onSim: (id: string) => void;
  onTopic?: (name: string) => void; topicCount?: (t: { cards: string[] }) => number;
  onFocus?: (cardId: string | null) => void; onHome?: () => void;
  onStory?: (id: string) => void; onDive?: (id: string) => void;
  /** 人群圖層：unitPeople＝這一步要在地圖上顯示的頁（null＝關掉）；openPeople＝離開單元去看完整的人群頁 */
  unitPeople?: (id: string | null) => void; openPeople?: (id: string) => void;
  /** 手機：切到地圖分頁 */
  onMap?: () => void;
}

export function UnitPlayer({ unit: u, index, prog, setProg, onCard: onCardRaw, onUnit, onFocus, onHome, onTopic, topicCount, onStory, onDive, unitPeople, openPeople, onMap }: Props) {
  // ref 也可以寫 peoples:<頁>（例如 peoples:Taiwan），按了回到人群圖層那一頁
  const onCard = (id: string, section?: string) => (id.startsWith('peoples:') ? openPeople?.(id.slice(8)) : onCardRaw(id, section));
  // 這一課屬於哪個專題（從 index.dives 的 units 清單算），第幾課、下一課
  const dive = (index.dives ?? []).find((d) => d.units.includes(u.id));
  const lessons = dive ? dive.units.map((id) => index.units.find((x) => x.id === id)).filter((x): x is Unit => !!x) : [];
  const lessonNo = lessons.findIndex((x) => x.id === u.id);
  const nextLesson = lessonNo >= 0 ? lessons[lessonNo + 1] : undefined;
  const n = u.steps.length, half = unitHalf(u), long = n >= 8;
  // 網址帶 &step=N（1 起算）：直接到第 N 步；超出範圍就留在封面（#24）。只在這個畫面一打開時讀一次
  const [urlStep] = useState<number | null>(() => { try { const q = new URLSearchParams(location.search); return q.get('unit') === u.id && q.get('step') != null ? Number(q.get('step')) : null; } catch { return null; } });
  const urlOk = urlStep != null && Number.isInteger(urlStep) && urlStep >= 1 && urlStep <= n;
  const [cover, setCover] = useState(urlStep != null && !urlOk);
  const step = cover ? -1 : Math.min(prog?.step ?? -1, u.steps.length - 1);
  const top = useRef<HTMLDivElement>(null);
  useEffect(() => { if (urlOk && prog?.step !== urlStep! - 1) setProg({ step: urlStep! - 1, seen: [...seenSet(prog)] }); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // 網址跟著步驟走（replaceState：不新增瀏覽紀錄）
  useEffect(() => {
    try {
      const q = new URLSearchParams(location.search);
      if (q.get('unit') !== u.id) return;
      if (step >= 0) q.set('step', String(step + 1)); else q.delete('step');
      const next = `${location.pathname}?${q}`;
      if (next !== location.pathname + location.search) history.replaceState(history.state, '', next);
    } catch { /* 網址寫不了就算了 */ }
  }, [step, u.id]);
  // 作答停留時間（秒）：頁面看得到、在課裡（不是封面）、最近 2 分鐘內有動作才計；每 10 秒、離開頁面、關掉時存一次
  const progRef = useRef(prog); progRef.current = prog;
  const setProgRef = useRef(setProg); setProgRef.current = setProg;
  const inStep = useRef(false); inStep.current = step >= 0;
  useEffect(() => {
    let acc = 0, last = Date.now(), lastAct = Date.now(), base: number | null = null, sent = 0;
    const act = () => { lastAct = Date.now(); };
    const flush = (now = false) => {
      const add = Math.floor(acc);
      if (add < 1 || !progRef.current || (progRef.current.step ?? -1) < 0) return;
      if (base === null) base = progRef.current.time ?? 0;
      acc -= add; sent += add;
      if (now === true) saveTimeNow(u.id, base + sent); else setProgRef.current({ time: base + sent });
    };
    const tick = () => {
      const now = Date.now(), dt = Math.min((now - last) / 1000, 2); last = now;
      if (document.visibilityState === 'visible' && inStep.current && now - lastAct < 120000) acc += dt;
      if (acc >= 10) flush();
    };
    const vis = () => { if (document.visibilityState === 'hidden') flush(false); else { last = Date.now(); lastAct = Date.now(); } };
    const evs = ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel'] as const;
    evs.forEach((e) => window.addEventListener(e, act, { passive: true }));
    window.addEventListener('scroll', act, { passive: true, capture: true });
    document.addEventListener('visibilitychange', vis);
    const pagehide = () => flush(true);
    window.addEventListener('pagehide', pagehide);
    const iv = window.setInterval(tick, 1000);
    return () => { window.clearInterval(iv); flush(false); evs.forEach((e) => window.removeEventListener(e, act)); window.removeEventListener('scroll', act, { capture: true } as EventListenerOptions); document.removeEventListener('visibilitychange', vis); window.removeEventListener('pagehide', pagehide); };
  }, []);
  // 中場休息：做完上半段的最後一步按「下一步」，先停在休息畫面（不是一定要休息，可以直接繼續）
  const [brk, setBrk] = useState(false);
  const [showResult, setShowResult] = useState(false); // 按「完成這一課」後換成結果畫面
  // 走過的步驟（進度條的綠點）：離開哪一步就記哪一步；「直接做下半段」不會把上半段算成走過
  const leave = () => [...new Set([...seenSet(prog), ...(step >= 0 && !brk ? [step] : [])])];
  const jump = (to: number) => { setCover(false); setBrk(false); setShowResult(false); setProg({ step: to, seen: leave() }); };
  const go = (to: number) => {
    if (long && step === half - 1 && to === half && !brk) { setCover(false); setBrk(true); setProg({ step: half, halfBreak: true, seen: leave() }); top.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
    jump(to); top.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };
  const partOf = (i: number) => (!long ? '' : i < half ? '上半' : '下半');
  // 上下半段的分鐘：建置時算好每一步的必讀分鐘（step_min），這裡加起來四捨五入到 5 分鐘；沒有就按步數比例
  const mins = (a: number, b: number) => {
    const sm = u.step_min && u.step_min.length === n ? u.step_min.slice(a, b).reduce((x, y) => x + y, 0) : (mustMin(u) * (b - a)) / n;
    return Math.max(5, Math.round(sm / 5) * 5);
  };
  const s = step >= 0 ? u.steps[step] : null;
  const byId = (id: string) => index.cards.find((c) => c.id === id);
  // 讓地圖與時間軸跟著目前這一步的卡片走
  const stepFocus = (x: typeof s) => x && (x.type === 'card' ? x.id : x.type === 'source' || x.type === 'today' || x.type === 'image' ? x.card : x.type === 'compare' ? x.cards[0] : x.type === 'decision' ? x.ref.split('#')[0]
    : x.type === 'mapq' || x.type === 'transfer' ? x.card ?? null : x.type === 'sources2' ? x.a.card ?? null : null);
  // 封面（還沒開始）也讓地圖和年代先跳到這一課的第一張卡，例如會安單元一打開就看越南
  const focusId = s ? stepFocus(s) : u.steps.map(stepFocus).find(Boolean) ?? null;
  useEffect(() => { onFocus?.(focusId ?? null); }, [focusId]);
  // 「看人群地圖」這一步：地圖打開人群圖層並跳到那一頁；其他步驟關掉
  // 在這一步裡點別的國家或遷徙：留在單元裡換頁（地圖跟著跳），有「回到這一步」可以回來
  const [pPage, setPPage] = useState<string | null>(null);
  useEffect(() => setPPage(null), [step]);
  // 人群步驟：內容放在限高、可自己捲動的框裡（「下一步」不會被擠到四屏之外）；框內換頁時捲回頂端
  const pBox = useRef<HTMLDivElement>(null);
  useEffect(() => { if (pBox.current) { pBox.current.scrollTop = 0; if (pPage) pBox.current.scrollIntoView({ block: 'nearest' }); } }, [pPage, step]);
  const peopleId = s?.type === 'peoples' ? pPage ?? s.id : null;
  useEffect(() => { unitPeople?.(peopleId); }, [peopleId]);
  const [pData, setPData] = useState<Peoples | null>(null);
  const hasPeoples = u.steps.some((x) => x.type === 'peoples');
  useEffect(() => { if (hasPeoples) loadPeoples().then(setPData).catch(() => {}); }, [hasPeoples]);
  const stepName = (x: Step) => (x.type === 'peoples' ? `${STEP_LABEL.peoples}・${peopleTitle(pData, x.id)}` : STEP_LABEL[x.type]);
  const ref = (r?: string) => <RefLink refStr={r} index={index} onCard={onCard} />;
  // 只傳要改的鍵，進度（progress.ts setUnit）會和原本的合併
  const save = (k: string, v: unknown) => setProg({ answers: { [k]: v } });
  const saveMany = (o: Record<string, unknown>) => setProg({ answers: o });
  const A = (prog?.answers ?? {}) as Record<string, any>;
  /** 選擇／排序題做完了（答對，或已公布答案）：第二問、追問才出現 */
  const finished = (key: string, legacy?: unknown) => { const r = recOf(prog, key); return r ? r.l || r.n >= 2 : typeof legacy === 'number' || typeof legacy === 'boolean'; };
  const saveRec = (key: string, r: Rec, legacy?: Record<string, unknown>) => saveMany({ [`r:${key}`]: r, ...(legacy ?? {}) });
  const saveMeta = (key: string, m: Meta) => save(`w:${key}`, m);
  // 鍵盤 ← → 換步（打字中不觸發）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.altKey || e.ctrlKey || e.metaKey || tag === 'INPUT' || tag === 'TEXTAREA' || step < 0) return;
      if (brk) { if (e.key === 'ArrowRight') { setBrk(false); } if (e.key === 'ArrowLeft') { setBrk(false); setProg({ step: half - 1 }); } return; }
      if (e.key === 'ArrowRight' && step < n - 1) go(step + 1);
      if (e.key === 'ArrowLeft' && step > 0) go(step - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, n, brk]);
  // 複製這一課的連結（老師派作業、同學互傳）
  const [copied, setCopied] = useState(false);
  const [menu, setMenu] = useState(false);
  const baseUrl = `${location.origin}${location.pathname}?mode=learn&unit=${u.id}`;
  const copyLink = async (url = baseUrl) => {
    setMenu(false);
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500); }
    catch { window.prompt('複製這個連結：', url); }
  };

  const body = (() => {
    if (brk) return (
      <div className="half-break">
        <p className="big-emoji" aria-hidden>☕</p>
        <h3>上半段完成！中場休息</h3>
        <p>你已經做完第 1–{half} 步。進度已經存在這台瀏覽器，現在關掉也沒關係，下次打開這一課會從<b>第 {half + 1} 步（下半段）</b>開始。</p>
        <p className="muted">下半段：{u.steps.slice(half).map((x) => STEP_LABEL[x.type]).join('、')}・約 {mins(half, n)} 分鐘（必讀）</p>
        <div className="row">
          <button className="btn primary big" onClick={() => setBrk(false)}>繼續下半段 →</button>
          {onHome && <button className="btn big" onClick={onHome}>先休息，回學習首頁</button>}
        </div>
      </div>
    );
    if (!s) return (
      <div className="unit-intro">
        <p className="mystery-big">❓ {u.mystery}</p>
        {u.teaser && <p>{u.teaser}</p>}
        <h3>學完你會</h3>
        <ul>{u.goals.map((g) => <li key={g}>{g}</li>)}</ul>
        <p className="muted">必讀約 {mustMin(u)} 分鐘{allMin(u) > mustMin(u) && <>・全部讀完約 {allMin(u)} 分鐘</>}・{u.steps.length} 步・可以隨時離開，進度會記在這台瀏覽器</p>
        <div className="row">
          <button className="btn primary big" onClick={() => go(prog?.step != null && prog.step > 0 ? prog.step : 0)}>{prog?.step != null && prog.step > 0 ? `從第 ${prog.step + 1} 步繼續（${partOf(prog.step) || '接著做'}）` : long ? '開始上半段' : '開始'}</button>
          {long && !(prog?.step != null && prog.step >= half) && <button className="btn big" onClick={() => { setCover(false); setBrk(false); setProg({ step: half, seen: [...seenSet(prog)] }); }}>直接做下半段</button>}
        </div>
        <details className="unit-outline"><summary>看全部 {u.steps.length} 步</summary>
        {(long ? [[0, half], [half, n]] : [[0, n]]).map(([a, b], k) => (
          <div key={k} className="half-block">
            {long && <h4>{k === 0 ? '上半' : '下半'}：第 {a + 1}–{b} 步・必讀約 {mins(a, b)} 分鐘</h4>}
            <ol className="step-outline" start={a + 1} aria-label={long ? `${k === 0 ? '上半' : '下半'}的步驟` : '這一課的步驟'}>
              {u.steps.slice(a, b).map((x, i) => <li key={i} className={seenSet(prog).has(a + i) ? 'done' : ''}>{a + i + 1}. {stepName(x)}</li>)}
            </ol>
          </div>
        ))}
        </details>
        <p className="cover-print no-print"><LLink q={{ unit: u.id, print: 'sheet' }} className="btn sm" title="印出題目與作答線（不含答案），可以發給全班">🖨 印學習單</LLink> <LLink q={{ unit: u.id, print: 'key' }} className="btn sm" title="印出正解、解析與參考說法（給老師）">印解答（教師用）</LLink></p>
        {long && <p className="muted small">一節課做不完沒關係：做完上半段會有中場休息，進度自動存好，下次從下半段接著做。</p>}
      </div>
    );
    switch (s.type) {
      case 'hook': return <div className="hook-step"><LearnText text={s.text} sources={[]} />
        {s.guess && typeof s.guess === 'object' && <Guess q={s.guess.q} options={s.guess.options} saved={A[`g${step}`]} onPick={(i) => save(`g${step}`, i)} />}</div>;
      case 'card': {
        const c = byId(s.id);
        return c?.learn ? <>{s.prompt && <p className="prompt">👉 {s.prompt}</p>}<LearnCard key={c.id} card={c} index={index} history={null} onOpen={(id) => onCard(id)} onTopic={onTopic} topicCount={topicCount} onStory={onStory} onUnit={onUnit} hereUnit={u.id} compact unitMode={{ focus: s.focus }} />
          {s.quick && s.quick.length > 0 && <Quick key={`q${step}`} items={s.quick} saved={s.quick.map((_, j) => A[`qk${step}_${j}`] as string | undefined)} onRate={(j, v) => save(`qk${step}_${j}`, v)} />}</> : <p>找不到卡片 {s.id}</p>;
      }
      case 'source': {
        const c = byId(s.card)!;
        const p = c.learn!.primary_source[s.idx ?? 0];
        return <>
          <figure className="primary big"><blockquote>{p.text}</blockquote><figcaption>— {p.from}</figcaption></figure>
          <Choice key={step} q={s.question} options={s.options} answer={s.answer} explain={s.explain} hints={s.hints} after={ref(s.ref)} whyWrong={s.why_wrong}
            rec={recOf(prog, `s${step}`)} legacyPick={typeof A[`s${step}`] === 'number' ? A[`s${step}`] : undefined}
            onRec={(r) => saveRec(`s${step}`, r, { [`s${step}`]: r.p })} />
          {typeof s.critique === 'object' && finished(`s${step}`, A[`s${step}`]) && (
            <div className="critique"><p className="muted small">第二問：讀史料，不只問「說了什麼」，還要問「誰說的、為什麼這樣說」。</p>
              <Choice key={`${step}k`} q={s.critique.question} options={s.critique.options} answer={s.critique.answer} explain={s.critique.explain} hints={[]} after={ref(s.ref)} whyWrong={s.critique.why_wrong}
                rec={recOf(prog, `s${step}k`)} onRec={(r) => saveRec(`s${step}k`, r)} /></div>)}
          <p className="muted small">讀史料先問三件事：誰寫的？什麼時候寫的？他為什麼這樣寫？</p>
        </>;
      }
      case 'chain': return <>
        <Order key={step} prompt={s.prompt} items={s.items} explain={s.explain} hints={s.hints} seed={`${u.id}-${step}`} after={ref(s.ref)} rec={recOf(prog, `o${step}`)} onRec={(r) => saveRec(`o${step}`, r)} />
        {typeof s.followup === 'object' && finished(`o${step}`) && (
          <div className="critique"><p className="muted small">再想一步：</p>
            <Choice key={`${step}f`} q={s.followup.question} options={s.followup.options} answer={s.followup.answer} explain={s.followup.explain} hints={[]} after={ref(s.ref)} whyWrong={s.followup.why_wrong}
              rec={recOf(prog, `o${step}f`)} onRec={(r) => saveRec(`o${step}f`, r)} /></div>)}
      </>;
      case 'compare': {
        const [a, b] = s.cards.map(byId);
        return <>
          {s.prompt && <p className="prompt">{s.prompt}</p>}
          {a && b && <CompareTable a={a} b={b} rows={s.rows} />}
          <div className="chips">{[a, b].map((c) => c && <button key={c.id} className="chip" onClick={() => onCard(c.id)}>📖 {c.name}</button>)}</div>
          <Short key={step} q={s.question} model={s.model_answer} hints={s.hints} saved={A[`s${step}`]} onSave={(t) => save(`s${step}`, t)} points={s.points} meta={metaOf(prog, `s${step}`)} onMeta={(m) => saveMeta(`s${step}`, m)} />
        </>;
      }
      case 'decision': return <Decision key={step} role={s.role} situation={s.situation} options={s.options} seed={`${u.id}-${step}`} actual={s.actual} note={s.note} after={ref(s.ref)}
        saved={A[`d${step}`]} onSave={(t) => save(`d${step}`, t)} onPick={(i) => save(`dp${step}`, i)} />;
      case 'today': {
        const c = byId(s.card)!;
        const hook = c.sections.find((x) => x.role === 'today_hook'), no = c.sections.find((x) => x.role === 'non_analogous');
        return <>
          <div className="today-pair"><div className="pair">
            <div><h4>像的地方</h4><LearnText text={hook?.text ?? ''} sources={c.sources} /></div>
            <div className="not"><h4>不能直接類比的地方</h4><LearnText text={no?.text ?? ''} sources={c.sources} /></div>
          </div></div>
          <Short key={step} q={s.question} model={s.model_answer} saved={A[`s${step}`]} onSave={(t) => save(`s${step}`, t)} points={s.points} meta={metaOf(prog, `s${step}`)} onMeta={(m) => saveMeta(`s${step}`, m)} />
        </>;
      }
      case 'sim': return <>{s.prompt && <p className="prompt">{s.prompt}</p>}<SimView id={s.sim} index={index} onCard={onCard} /></>;
      case 'peoples': return <>
        <p className="prompt">👉 {s.prompt}</p>
        <p className="muted small">{onMap ? <>地圖已經打開「◎ 人群」圖層，<button className="link" onClick={onMap}>點這裡到地圖看 ▶</button>，看完按下方「首頁」回來。</> : '右邊的地圖已經打開「◎ 人群」圖層。'}下面是這一頁的內容；點裡面的國家或其他遷徙，會在這裡換頁，不會離開單元。</p>
        {pPage && pPage !== s.id && <p><button className="btn sm" onClick={() => setPPage(null)}>← 回到這一步：{peopleTitle(pData, s.id)}</button></p>}
        <div className="unit-peoples" ref={pBox} tabIndex={0} role="region" aria-label="人群圖層這一頁的內容（可捲動）"><PeoplePanel id={pPage ?? s.id} onPick={(id) => setPPage(id)} onCard={(id) => onCardRaw(id)} /></div>
      </>;
      case 'check': {
        // 小計直接由進度算：選擇與排序題「最近一次」答對幾題（簡答不評分）
        const nGrade = s.items.filter((q) => q.kind !== 'short').length;
        const res = s.items.map((q, i) => { if (q.kind === 'short') return undefined; const r = recOf(prog, `c${step}_${i}`); return r ? (r.l || r.n >= 2 ? r.l : undefined) : typeof A[`c${step}_${i}`] === 'boolean' ? A[`c${step}_${i}`] as boolean : undefined; });
        const graded = res.filter((v) => typeof v === 'boolean') as boolean[];
        const right = graded.filter(Boolean).length;
        return <>
          <p className="check-tally" aria-live="polite">{graded.length ? <>選擇與排序題：答對 <b>{right}</b>／{nGrade}（已作答 {graded.length}）{graded.length === nGrade && (right === nGrade ? '・全對，太強了 🎉' : '・答錯的題目下面有「回到卡片看」，看完再試一次')}</> : `共 ${s.items.length} 題，第一次答錯會先給提示，第二次才公布答案。`}</p>
          <div className="checks-list">{s.items.map((q, i) => { const key = `c${step}_${i}`; return <CheckQ key={`${step}-${i}`} q={q} i={i} seed={`${u.id}-${step}`} index={index} onCard={onCard}
            rec={recOf(prog, key)} onRec={(r) => saveRec(key, r, { [key]: r.f })}
            saved={A[`cs${step}_${i}`]} onSave={(t) => save(`cs${step}_${i}`, t)} meta={metaOf(prog, `cs${step}_${i}`)} onMeta={(m) => saveMeta(`cs${step}_${i}`, m)} />; })}</div>
        </>;
      }
      case 'mapq': return <MapQ key={step} s={s} rec={recOf(prog, `m${step}`)} onRec={(r) => saveRec(`m${step}`, r)} after={ref(s.ref)} />;
      case 'sources2': return <Sources2 key={step} s={s} rec={recOf(prog, `x${step}`)} onRec={(r) => saveRec(`x${step}`, r)} after={ref(s.ref)}
        openUnlocked={finished(`x${step}`)} openSaved={A[`xo${step}`]} onOpenSave={(t) => save(`xo${step}`, t)} openMeta={metaOf(prog, `xo${step}`)} onOpenMeta={(m) => saveMeta(`xo${step}`, m)} />;
      case 'image': return <ImageQ key={step} s={s} card={byId(s.card)} rec={recOf(prog, `im${step}`)} onRec={(r) => saveRec(`im${step}`, r)} after={ref(s.ref)} />;
      case 'transfer': return <Transfer key={step} s={s} after={ref(s.ref)} saved={A[`t${step}`]} onSave={(t) => save(`t${step}`, t)} meta={metaOf(prog, `t${step}`)} onMeta={(m) => saveMeta(`t${step}`, m)} />;
      case 'recap': {
        const hookI =u.steps.findIndex((x) => x.type === 'hook' && typeof x.guess === 'object');
        const gs = hookI >= 0 ? (u.steps[hookI] as Extract<Step, { type: 'hook' }>).guess : null;
        const gPick = hookI >= 0 ? A[`g${hookI}`] : undefined;
        if (showResult && prog?.done) return <UnitResult u={u} prog={prog} index={index} stepName={stepName} onGo={jump} onUnit={onUnit} onBack={() => setShowResult(false)}
          nextLesson={nextLesson} diveTitle={dive?.title} lessonNo={lessonNo} lessonCount={lessons.length} />;
        return (
        <div className="recap">
          <p className="mystery-big">❓ {u.mystery}</p>
          {gs && typeof gs === 'object' && (
            <div className="guess-back">
              <p>{typeof gPick === 'number' ? <>你一開始猜的是：<b>{gs.options[gPick]}</b></> : '你一開始沒有猜。'}</p>
              <p><b>歷史上的答案：</b>{gs.reveal}</p>
              <p className="muted small">和你猜的一樣嗎？不一樣的話，是哪一步讓你改變想法？</p>
            </div>)}
          <Short key={step} q="現在，用你自己的話回答一開始的謎題：" model={s.model_answer} label="寫好了，看參考說法"
            saved={prog?.recap} onSave={(t) => setProg({ recap: t })} points={s.points} meta={metaOf(prog, 'recap')} onMeta={(m) => saveMeta('recap', m)} />
          <Reflect key={`r${step}`} q={u.reflect} saved={prog?.answers?.reflect as string | undefined} onSave={(t) => save('reflect', t)} />
          {!prog?.done ? <button className="btn primary big" onClick={() => { setProg({ done: true, doneAt: new Date().toISOString().slice(0, 10), seen: leave() }); setShowResult(true); top.current?.scrollIntoView({ block: 'start' }); }}>完成這一課 🏅</button>
            : <p className="badge-earned">{LEVELS[unitLevel(u, prog) ?? 'walked'].icon} 你完成了「{u.title}」（{LEVELS[unitLevel(u, prog) ?? 'walked'].name}）！它已經點亮在「我的歷史地圖」上。<button className="btn sm" onClick={() => setShowResult(true)}>看這一課的結果</button></p>}
          {nextLesson && dive && <p className="ud-recap-next">深入專題<b>「{dive.title}」</b>的下一課：<button className="btn primary" onClick={() => onUnit(nextLesson.id)} {...intent('unit', nextLesson.id)}>第 {lessonNo + 2}／{lessons.length} 課《{nextLesson.title}》 →</button></p>}
          <h3>接下來可以挖</h3>
          <div className="next-units">
            {u.next.map((id) => index.units.find((x) => x.id === id)).filter((x): x is Unit => !!x).map((n) => (
              <button key={n.id} className="unit-tile" onClick={() => onUnit(n.id)} {...intent('unit', n.id)}><b>{n.title}</b><span>❓ {n.mystery}</span></button>
            ))}
          </div>
        </div>
        );
      }
    }
  })();

  return (
    <div className="unit" ref={top}>
      <div className="unit-head">
        {dive && lessonNo >= 0 && (
          <p className="unit-dive"><span className="ud-pos">深入專題「{dive.title}」第 {lessonNo + 1}／{lessons.length} 課</span>
            {onDive && <button className="link small" onClick={() => onDive(dive.id)}>看深入專題頁</button>}
            {nextLesson && <button className="chip ud-next" onClick={() => onUnit(nextLesson.id)}>下一課：《{nextLesson.title}》 →</button>}</p>
        )}
        <div className="unit-title-row"><h2>{u.title}</h2><div className="copy-menu"><button className="btn sm" onClick={() => (step >= 0 ? setMenu(!menu) : copyLink())} aria-expanded={step >= 0 ? menu : undefined} title="複製這一課的連結，可以傳給同學或老師">{copied ? '✓ 已複製' : '🔗 複製連結'}</button>
          {menu && step >= 0 && <div className="copy-pop" role="menu"><button className="btn sm" role="menuitem" onClick={() => copyLink()}>這一課的連結</button><button className="btn sm" role="menuitem" onClick={() => copyLink(`${baseUrl}&step=${step + 1}`)}>從第 {step + 1} 步開始的連結</button></div>}</div></div>
        {step >= 0 && <div className="progress" aria-label={`第 ${step + 1} 步，共 ${u.steps.length} 步`}>
          {u.steps.map((x, i) => <button key={i} className={`pdot ${seenSet(prog).has(i) && !(i === step && !brk) ? 'done' : ''} ${i === step && !brk ? 'on' : ''} ${long && i === half ? 'half-start' : ''}`} title={`${i + 1}. ${stepName(x)}${long ? `（${partOf(i)}）` : ''}`} onClick={() => jump(i)} />)}
        </div>}
        {s && !brk && <p className="step-label">{long && <span className="part-tag">{partOf(step)}</span>}第 {step + 1}／{u.steps.length} 步・{stepName(s)}{step < u.steps.length - 1 && <span className="muted">・下一步：{stepName(u.steps[step + 1])}</span>}</p>}
      </div>
      {body}
      {s && !brk && <div className="step-nav">
        <button className="btn" onClick={() => go(step - 1)}>← 上一步</button>
        {step < u.steps.length - 1 ? <button className="btn primary" onClick={() => go(step + 1)}>{long && step === half - 1 ? '完成上半段 ✓' : <>下一步：{stepName(u.steps[step + 1])} →</>}</button>
          : <span className="muted small">最後一步了，記得按「完成這一課」</span>}
      </div>}
    </div>
  );
}
export { Hints };
