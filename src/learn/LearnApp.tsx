// 第 6 期：自主學習模式。和研究模式共用同一批卡片資料，只是呈現方式不同
// 網址：?mode=learn&history=japan&unit=unit-xxx&card=war-xxx&sim=bubble&view=mymap
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Card, Index } from '../types';
import { MapView } from '../components/MapView';
import { createSearch } from '../lib/search';
import { useIsMobile } from '../lib/useIsMobile';
import { LearnHome } from './LearnHome';
import { HistoryPage } from './HistoryPage';
import { UnitPlayer } from './UnitPlayer';
import { LearnCard } from './LearnCard';
import { LearnTimeline } from './LearnTimeline';
import { MyMap } from './MyMap';
import { LearnRecord } from './LearnRecord';
import { SimView } from './sims/SimView';
import { useProgress } from './progress';
import { historyOf, inHistory, learnCards } from './util';
import './learn.css';

type View = { kind: 'home' } | { kind: 'history' } | { kind: 'unit'; id: string } | { kind: 'card'; id: string; section?: string }
  | { kind: 'mymap' } | { kind: 'record' } | { kind: 'sim'; id: string } | { kind: 'search' };
type Tab = 'main' | 'card' | 'map' | 'timeline';

function initialView(q: URLSearchParams): View {
  if (q.get('unit')) return { kind: 'unit', id: q.get('unit')! };
  if (q.get('card')) return { kind: 'card', id: q.get('card')! };
  if (q.get('sim')) return { kind: 'sim', id: q.get('sim')! };
  if (q.get('view') === 'mymap') return { kind: 'mymap' };
  if (q.get('view') === 'record') return { kind: 'record' };
  if (q.get('history')) return { kind: 'history' };
  return { kind: 'home' };
}

export function LearnApp({ index, onResearch }: { index: Index; onResearch: () => void }) {
  const isMobile = useIsMobile();
  const params = useMemo(() => new URLSearchParams(location.search), []);
  const { p, update, markCard, setUnit, reset } = useProgress();
  const [hid, setHid] = useState<string | null>(() => params.get('history') ?? p.history ?? null);
  const h = historyOf(index, hid);
  const [stack, setStack] = useState<View[]>(() => { const v = initialView(params); return v.kind === 'home' ? [v] : [{ kind: 'home' }, v]; });
  const view = stack[stack.length - 1];
  const [tab, setTab] = useState<Tab>('main');
  const [lastCard, setLastCard] = useState<string | null>(view.kind === 'card' ? view.id : null);
  const [focus, setFocus] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const all = useMemo(() => learnCards(index), [index]);
  const histCards = useMemo(() => all.filter((c) => inHistory(c, h)), [all, h]);
  // 選了某一條史，地圖就先框住這條史的卡片所在範圍（世界通史維持原本視野）
  const home = useMemo(() => {
    if (!h || h.all || h.theme) return null;
    type B = [[number, number], [number, number]];
    // 臺灣、東亞用固定範圍：這些史的卡也會連到阿姆斯特丹、波托西等遠方，照卡片算會框成全世界
    if (h.track === '臺灣') return [[21.5, 119], [25.8, 122.5]] as B;
    if (h.track === '東亞') return [[0, 95], [45, 145]] as B;
    // 其他史：用卡片主要地點，去掉兩端各 15% 的離群點
    const ls = histCards.filter((c) => c.learn?.track === h.track).map((c) => c.place.locations[0]).filter(Boolean);
    if (!ls.length) return null;
    const cut = (v: number[]) => { const s = [...v].sort((a, b) => a - b), k = Math.floor(s.length * 0.15); return [s[k], s[s.length - 1 - k]]; };
    const [la0, la1] = cut(ls.map((l) => l.lat)), [ln0, ln1] = cut(ls.map((l) => l.lng));
    return [[la0, ln0], [la1, ln1]] as B;
  }, [h, histCards]);
  const bgCards = useMemo(() => all.filter((c) => !inHistory(c, h)), [all, h]);
  const byId = useCallback((id: string) => index.cards.find((c) => c.id === id), [index]);
  const unit = view.kind === 'unit' ? index.units.find((u) => u.id === view.id) : undefined;
  const selected = view.kind === 'card' ? byId(view.id) : focus ? byId(focus) : undefined;
  const [year, setYear] = useState(() => (view.kind === 'card' ? byId(view.id)?.time.start : undefined) ?? 1);
  useEffect(() => { if (selected) setYear(selected.time.start); }, [selected?.id]);
  const fs = p.fontScale ?? 1;
  // 桌機的時間軸可以收起來，讀單元時留更多空間給文字；記在瀏覽器
  const tlOpen = p.timelineOpen ?? true;
  const toggleTl = () => update((o) => ({ ...o, timelineOpen: !(o.timelineOpen ?? true) }));
  // 字級：手機上用一顆按鈕循環（標準 → 大 → 特大 → 標準）
  const cycleFs = () => update((o) => { const cur = o.fontScale ?? 1; return { ...o, fontScale: cur >= 1.35 ? 1 : cur >= 1.15 ? 1.4 : 1.2 }; });
  const fsLabel = fs >= 1.35 ? '特大' : fs >= 1.15 ? '大' : '標準';

  // 分頁標題跟著目前在看的東西走，瀏覽器歷史與書籤才看得出是哪一課
  useEffect(() => {
    const t = view.kind === 'unit' ? unit?.title : view.kind === 'card' ? byId(view.id)?.name : view.kind === 'history' ? h?.name : view.kind === 'mymap' ? '我的歷史地圖' : view.kind === 'record' ? '我的學習紀錄' : null;
    document.title = t ? `${t}｜歷史長河` : '歷史長河：國高中生的歷史學習';
  }, [view, unit, h]);

  // 狀態寫回網址，方便分享與重新整理
  useEffect(() => {
    const q = new URLSearchParams({ mode: 'learn' });
    if (hid) q.set('history', hid);
    if (view.kind === 'unit') q.set('unit', view.id);
    if (view.kind === 'card') q.set('card', view.id);
    if (view.kind === 'sim') q.set('sim', view.id);
    if (view.kind === 'mymap') q.set('view', 'mymap');
    if (view.kind === 'record') q.set('view', 'record');
    history.replaceState(null, '', `${location.pathname}?${q}`);
  }, [hid, view]);

  const push = (v: View) => { setStack((s) => [...s, v]); setTab(v.kind === 'card' ? 'card' : 'main'); window.scrollTo?.(0, 0); };
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const chooseHistory = (id: string) => { setHid(id); update((o) => ({ ...o, history: id })); push({ kind: 'history' }); };
  const openCard = (id: string, section?: string) => { if (!byId(id)?.learn) return; markCard(id); setLastCard(id); push({ kind: 'card', id, section }); };
  const openUnit = (id: string) => push({ kind: 'unit', id });
  const random = () => {
    const pool = index.units.filter((u) => !p.units[u.id]?.done);
    const list = pool.length ? pool : index.units;
    if (list.length) openUnit(list[Math.floor(Math.random() * list.length)].id);
  };

  const search = useMemo(() => createSearch(all), [all]);
  const hits = query.trim() ? search(query).hits.slice(0, 20) : [];
  const unitHits = query.trim() ? index.units.filter((u) => (u.title + u.mystery).includes(query.trim())) : [];

  const content = (() => {
    if (query.trim()) return (
      <div className="lsearch">
        <h2>搜尋「{query}」</h2>
        {unitHits.map((u) => <button key={u.id} className="mystery" onClick={() => { setQuery(''); openUnit(u.id); }}><span className="q">❓ {u.mystery}</span><span className="meta">{u.title}</span></button>)}
        {hits.map(({ card }) => <button key={card.id} className="lresult" onClick={() => { setQuery(''); openCard(card.id); }}><span className="nm">{card.name}</span><span className="why">{card.learn?.why_care}</span></button>)}
        {!hits.length && !unitHits.length && <p className="muted">學習模式還沒有這個主題的卡片。可以到研究模式找找看，或試試下面的推薦謎題。</p>}
      </div>
    );
    switch (view.kind) {
      case 'home': return <LearnHome index={index} p={p} onHistory={chooseHistory} onUnit={openUnit} onRandom={random} onIntroSeen={() => update((o) => ({ ...o, seenIntro: true }))} onRecord={() => push({ kind: 'record' })} />;
      case 'history': return h ? <HistoryPage index={index} h={h} cards={histCards} p={p} onUnit={openUnit} onCard={openCard} onHistory={chooseHistory} onSim={(id) => push({ kind: 'sim', id })} />
        : <LearnHome index={index} p={p} onHistory={chooseHistory} onUnit={openUnit} onRandom={random} onIntroSeen={() => {}} />;
      case 'unit': return unit ? <UnitPlayer key={unit.id} unit={unit} index={index} prog={p.units[unit.id]} setProg={(x) => setUnit(unit.id, x)}
        onCard={openCard} onUnit={openUnit} onSim={(id) => push({ kind: 'sim', id })} onFocus={setFocus} onHome={() => setStack([{ kind: 'home' }])} /> : <p>找不到這個單元（可能還在查核中）。</p>;
      case 'card': { const c = byId(view.id); return c?.learn ? <LearnCard key={c.id} card={c} index={index} history={h} depth={view.section ? 'deep' : 'story'} onOpen={openCard} onHistory={(id) => setHid(id)} /> : <p>這張卡還不在學習模式裡（需要通過交叉查核）。</p>; }
      case 'mymap': return <MyMap index={index} cards={all} p={p} onCard={openCard} onUnit={openUnit} onRecord={() => push({ kind: 'record' })} />;
      case 'record': return <LearnRecord index={index} p={p} onUnit={openUnit} onReset={() => { reset(); setStack([{ kind: 'home' }]); }} />;
      case 'sim': return <SimView id={view.id} index={index} onCard={openCard} />;
    }
    return null;
  })();

  const map = <MapView index={index} cards={histCards} bgCards={bgCards} year={year} learn compact={isMobile} home={home}
    highlight={{ keys: selected?.place.locations.map((l) => l.key) ?? [], routes: selected?.routes ?? [] }}
    onPlace={(key) => { const c = histCards.find((x) => x.place.locations.some((l) => l.key === key)); if (c) openCard(c.id); }} onRoute={() => {}} />;
  const timeline = <LearnTimeline cards={all} history={h} year={year} setYear={setYear} selectedId={selected?.id ?? null} onOpen={openCard} inHistory={(c) => inHistory(c, h)} />;
  const cardTab = lastCard && byId(lastCard)?.learn ? <LearnCard card={byId(lastCard)!} index={index} history={h} onOpen={openCard} /> : <p className="muted">還沒打開任何卡片。</p>;

  const header = (
    <header className="ltop">
      <button className="brand" onClick={() => setStack([{ kind: 'home' }])} title="回到學習模式首頁">歷史長河</button>
      <div className="mode-switch" role="group" aria-label="切換模式">
        <button onClick={onResearch}>研究模式</button><button className="on" aria-pressed>學習模式</button>
      </div>
      {h && <button className="chip hist-chip" onClick={() => push({ kind: 'history' })} title="目前選的史">📚 {h.name}</button>}
      <div className="lsearch-box">
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="想知道什麼？例：羅馬為什麼滅亡" aria-label="搜尋學習內容" />
        {!query && !isMobile && index.units.length > 0 && <div className="suggest">試試：{index.units.slice(0, 3).map((u) => <button key={u.id} className="link" onClick={() => openUnit(u.id)}>{u.mystery}</button>)}</div>}
      </div>
      {!isMobile && <button className="btn sm" onClick={random} title="隨機一個謎題" aria-label="隨機一個謎題">🎲</button>}
      <button className="btn sm" onClick={() => push({ kind: 'mymap' })} title="我的歷史地圖">🗺{!isMobile && ' 我的地圖'}</button>
      <button className="btn sm" onClick={() => push({ kind: 'record' })} title="我的學習紀錄：進度、答對率、寫過的回答">📒{!isMobile && ' 紀錄'}</button>
      {isMobile ? (
        <button className="btn sm" onClick={cycleFs} title="切換字級" aria-label={`字級：${fsLabel}，按一下切換`}>Aa{fs >= 1.15 ? '+' : ''}</button>
      ) : (
        <div className="fs" role="group" aria-label="字級">
          <button className="btn sm" onClick={() => update((o) => ({ ...o, fontScale: Math.max(0.85, (o.fontScale ?? 1) - 0.1) }))} aria-label="字變小">A−</button>
          <button className="btn sm" onClick={() => update((o) => ({ ...o, fontScale: Math.min(1.5, (o.fontScale ?? 1) + 0.1) }))} aria-label="字變大">A＋</button>
        </div>
      )}
      <button className="btn sm" onClick={() => { update((o) => ({ ...o, seenIntro: false })); setStack([{ kind: 'home' }]); setQuery(''); }} title="怎麼使用這個網站" aria-label="使用說明">？</button>
    </header>
  );

  if (isMobile) return (
    <div className="learn mobile" style={{ ['--fs' as any]: fs }}>
      {header}
      <main className="lm-main">
        {tab === 'main' && <div className="lcontent">{stack.length > 1 && <button className="back" onClick={back}>← 返回</button>}{content}</div>}
        {tab === 'card' && <div className="lcontent">{cardTab}</div>}
        {tab === 'map' && <div className="lm-map">{map}</div>}
        {tab === 'timeline' && <div className="lm-tl">{timeline}</div>}
      </main>
      <nav className="ltabs">
        {([['main', '單元'], ['card', '卡片'], ['map', '地圖'], ['timeline', '時間軸']] as [Tab, string][]).map(([t, l]) =>
          <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{l}</button>)}
      </nav>
    </div>
  );
  return (
    <div className={`learn desktop ${tlOpen ? '' : 'tl-closed'}`} style={{ ['--fs' as any]: fs }}>
      {header}
      <main className="ld-main">
        <section className="lcontent">{stack.length > 1 && <button className="back" onClick={back}>← 返回</button>}{content}</section>
        <div className="ld-map">{map}</div>
        <div className="ld-tl">
          <button className="tl-toggle" onClick={toggleTl} aria-expanded={tlOpen}>{tlOpen ? '▾ 收起時間軸' : '▸ 展開時間軸'}</button>
          {tlOpen && timeline}
        </div>
      </main>
    </div>
  );
}

export type { Card };
