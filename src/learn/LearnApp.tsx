// 第 6 期：自主學習模式。和研究模式共用同一批卡片資料，只是呈現方式不同
// 網址：?mode=learn&history=japan&unit=unit-xxx&card=war-xxx&sim=bubble&view=mymap
import { useDeferredValue, useCallback, useEffect, useMemo, useState } from 'react';
import { DockLayout, useDock } from '../components/Dock';
import { useLayout, colSize } from '../lib/layout';
import { SkipLink } from '../components/SkipLink';

type LPanel = 'content' | 'map' | 'tl';
const L_PANELS: readonly LPanel[] = ['content', 'map', 'tl'];
import type { Card, Index } from '../types';
import { PeoplePanel } from '../components/PeoplePanel';
import { PEOPLE_INTRO } from '../lib/peoples';
import { MapView } from '../components/MapView';
import { createSearch, matchTopics, useSearchLibs, loadSearchLibs } from '../lib/search';
import { TopicView, TopicIndex, topicMarks, findTopic } from '../components/Topics';
import { StorylineView, StorylineIndex, storyMarks, findStory } from '../components/Story';
import { keepRead } from '../components/StoryReader';
import { DiveView, DiveIndex, diveMarks, diveRoutes, findDive, hasPowerVisual, powerFor, diveYear, prehistDive } from '../components/Dive';
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
import { ensureCards, ensureUnits, cardLoaded, unitLoaded, waitingText } from '../lib/detail';
import { historyOf, inHistory, learnCards } from './util';
import './learn.css';

type View = { kind: 'home' } | { kind: 'history' } | { kind: 'unit'; id: string } | { kind: 'card'; id: string; section?: string }
  | { kind: 'mymap' } | { kind: 'record' } | { kind: 'sim'; id: string } | { kind: 'search' }
  | { kind: 'topic'; name: string } | { kind: 'topics' } | { kind: 'story'; id: string } | { kind: 'stories' }
  | { kind: 'dive'; id: string } | { kind: 'dives' } | { kind: 'peoples'; id: string };
type Tab = 'main' | 'card' | 'map' | 'timeline';

function initialView(q: URLSearchParams): View {
  if (q.get('peoples')) return { kind: 'peoples', id: q.get('peoples')! };
  if (q.get('unit')) return { kind: 'unit', id: q.get('unit')! };
  if (q.get('card')) return { kind: 'card', id: q.get('card')! };
  if (q.get('sim')) return { kind: 'sim', id: q.get('sim')! };
  if (q.get('topic')) return { kind: 'topic', name: q.get('topic')! };
  if (q.get('story')) return { kind: 'story', id: q.get('story')! };
  if (q.get('view') === 'stories') return { kind: 'stories' };
  if (q.get('dive')) return { kind: 'dive', id: q.get('dive')! };
  if (q.get('view') === 'dives') return { kind: 'dives' };
  if (q.get('view') === 'topics') return { kind: 'topics' };
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
  // 人群圖層（今天）：網址帶 ?peoples= 時自動打開
  const [peoplesOn, setPeoplesOn] = useState(() => new URLSearchParams(location.search).has('peoples'));
  const [lastCard, setLastCard] = useState<string | null>(view.kind === 'card' ? view.id : null);
  const [focus, setFocus] = useState<string | null>(null);
  // 學習單元「看人群地圖」那一步要在地圖上顯示的人群頁（離開單元就清掉）
  const [unitPeople, setUnitPeople] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const all = useMemo(() => learnCards(index), [index.cards]); // eslint-disable-line react-hooks/exhaustive-deps
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
  const byId = useCallback((id: string) => index.cards.find((c) => c.id === id), [index.cards]);
  const unit = view.kind === 'unit' ? index.units.find((u) => u.id === view.id) : undefined;
  const selected = view.kind === 'card' ? byId(view.id) : focus ? byId(focus) : undefined;
  const [year, setYear] = useState(() => (view.kind === 'card' ? byId(view.id)?.time.start : view.kind === 'dive' ? (() => { const dv = findDive(index, view.id); return dv ? diveYear(dv) : undefined; })() : undefined) ?? 1);
  useEffect(() => { if (selected) setYear(selected.time.start); }, [selected?.id]);
  const fs = p.fontScale ?? 1;
  // 桌機的時間軸可以收起來，讀單元時留更多空間給文字；記在瀏覽器
  const tlOpen = p.timelineOpen ?? true;
  // 文字欄寬、時間軸高可拖曳調整，記在瀏覽器；「⟲ 版面」恢復預設
  // 三個區塊還可以拖曳交換位置、變浮動小窗、彈出新視窗（components/Dock.tsx）
  const dock = useDock('l', L_PANELS, useLayout());
  const tlInC = dock.order[2] === 'tl' && !dock.float.tl && !dock.wins.tl;
  const toggleTl = () => update((o) => ({ ...o, timelineOpen: !(o.timelineOpen ?? true) }));
  // 字級：手機上用一顆按鈕循環（標準 → 大 → 特大 → 標準）
  const cycleFs = () => update((o) => { const cur = o.fontScale ?? 1; return { ...o, fontScale: cur >= 1.35 ? 1 : cur >= 1.15 ? 1.4 : 1.2 }; });
  const fsLabel = fs >= 1.35 ? '特大' : fs >= 1.15 ? '大' : '標準';

  // 分頁標題跟著目前在看的東西走，瀏覽器歷史與書籤才看得出是哪一課
  useEffect(() => {
    const t = view.kind === 'unit' ? unit?.title : view.kind === 'card' ? byId(view.id)?.name : view.kind === 'history' ? h?.name : view.kind === 'topic' ? `#${view.name}` : view.kind === 'topics' ? '主題標籤' : view.kind === 'story' ? findStory(index, view.id)?.title : view.kind === 'stories' ? '故事線' : view.kind === 'dive' ? findDive(index, view.id)?.title : view.kind === 'dives' ? '深入專題' : view.kind === 'mymap' ? '我的歷史地圖' : view.kind === 'record' ? '我的學習紀錄' : null;
    document.title = t ? `${t}｜歷史長河` : '歷史長河：國高中生的歷史學習';
  }, [view, unit, h]);

  // 狀態寫回網址，方便分享與重新整理
  useEffect(() => {
    const q = new URLSearchParams({ mode: 'learn' });
    if (hid) q.set('history', hid);
    if (view.kind === 'unit') q.set('unit', view.id);
    if (view.kind === 'card') q.set('card', view.id);
    if (view.kind === 'sim') q.set('sim', view.id);
    if (view.kind === 'topic') q.set('topic', view.name);
    if (view.kind === 'topics') q.set('view', 'topics');
    if (view.kind === 'story') { q.set('story', view.id); if (keepRead(view.id)) q.set('read', '1'); }
    if (view.kind === 'stories') q.set('view', 'stories');
    if (view.kind === 'dive') q.set('dive', view.id);
    if (view.kind === 'dives') q.set('view', 'dives');
    if (view.kind === 'peoples') q.set('peoples', view.id);
    if (view.kind === 'mymap') q.set('view', 'mymap');
    if (view.kind === 'record') q.set('view', 'record');
    history.replaceState(null, '', `${location.pathname}?${q}`);
  }, [hid, view]);

  // 人群圖層：連點不同國家時換掉最上面那一頁，不一直疊
  // 離開單元才關掉單元帶出的人群頁（手機切到地圖分頁時單元會卸載，不能在卸載時關）
  useEffect(() => { if (view.kind !== 'unit') setUnitPeople(null); }, [view.kind]);
  const openPeople = (id: string) => { setPeoplesOn(true); setStack((s) => (s[s.length - 1].kind === 'peoples' ? [...s.slice(0, -1), { kind: 'peoples', id }] : [...s, { kind: 'peoples', id }])); if (!isMobile) setTab('main'); };
  const push = (v: View) => { setStack((s) => [...s, v]); setTab(v.kind === 'card' ? 'card' : 'main'); window.scrollTo?.(0, 0); };
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const chooseHistory = (id: string) => { setHid(id); update((o) => ({ ...o, history: id })); push({ kind: 'history' }); };
  const openCard = (id: string, section?: string) => { if (!byId(id)?.learn) return; markCard(id); setLastCard(id); push({ kind: 'card', id, section }); };
  const openUnit = (id: string) => push({ kind: 'unit', id });
  const openTopic = (name: string) => { setQuery(''); push({ kind: 'topic', name }); };
  const openStory = (id: string) => { setQuery(''); push({ kind: 'story', id }); };
  // 深入專題（docs/dives.md）：學習模式也能打開專題頁；勢力圖疊在地圖上
  const [powerYear, setPowerYear] = useState<number | null>(() => { const dv = findDive(index, params.get('dive') ?? ''); return dv ? powerFor(dv, dv.range.start)?.year ?? null : null; });
  const diveBelow = (() => { for (let i = stack.length - 1; i >= 0; i--) { const v = stack[i]; if (v.kind === 'dive') return v.id; if (v.kind !== 'card') return null; } return null; })();
  const activeDive = diveBelow ? findDive(index, diveBelow) ?? null : null;
  const activePower = activeDive && hasPowerVisual(activeDive) && powerYear != null ? activeDive.power_maps.find((x) => x.year === powerYear) ?? null : null;
  const openDive = (id: string) => {
    setQuery('');
    const dv = findDive(index, id);
    if (dv) {
      // 年代不在專題範圍內就跳到專題的第一張圖（沒有圖就跳到專題起點）；沒有圖的專題要清掉上一個專題殘留的年份
      if (year < dv.range.start || year > dv.range.end || (dv.focus_year != null && !dv.power_maps.length)) { const y0 = diveYear(dv); setYear(y0); setPowerYear(powerFor(dv, y0)?.year ?? null); }
      else setPowerYear(powerFor(dv, year)?.year ?? null);
    }
    push({ kind: 'dive', id });
  };
  const allTopics = useMemo(() => (index.topicLayers ?? []).flatMap((l) => l.topics), [index]);
  // 學習模式的標籤數字只算學習版的卡（和路徑頁「你讀過 n／m」的 m 一致）
  const learnCount = (t: { cards: string[] }) => t.cards.filter((id) => !!byId(id)?.learn).length;
  const researchHref = (id: string) => `${location.pathname}?mode=research&card=${encodeURIComponent(id)}`;
  const random = () => {
    const pool = index.units.filter((u) => !p.units[u.id]?.done);
    const list = pool.length ? pool : index.units;
    if (list.length) openUnit(list[Math.floor(Math.random() * list.length)].id);
  };

  const search = useMemo(() => createSearch(all), [all]);
  const libsReady = useSearchLibs(!!query.trim()); // 套件載入後重算，簡轉繁與拼音即生效
  const dq = useDeferredValue(query);
  const hits = useMemo(() => (dq.trim() ? search(dq).hits.slice(0, 20) : []), [search, dq, libsReady]); // eslint-disable-line react-hooks/exhaustive-deps
  const unitHits = query.trim() ? index.units.filter((u) => (u.title + u.mystery).includes(query.trim())) : [];
  const topicHits = query.trim() ? matchTopics(allTopics.map((t) => t.name), query) : [];

  const contentRaw = (() => {
    if (query.trim()) return (
      <div className="lsearch">
        <h2>搜尋「{query}」</h2>
        {topicHits.length > 0 && <div className="topic-suggest"><span className="muted small">看整條歷史路徑：</span>{topicHits.map((t) => <button key={t} className="chip topic big" onClick={() => openTopic(t)}>#{t}<small>{learnCount(findTopic(index, t)?.topic ?? { cards: [] })}</small></button>)}</div>}
        {unitHits.map((u) => <button key={u.id} className="mystery" onClick={() => { setQuery(''); openUnit(u.id); }}><span className="q">❓ {u.mystery}</span><span className="meta">{u.title}</span></button>)}
        {hits.map(({ card }) => <button key={card.id} className="lresult" onClick={() => { setQuery(''); openCard(card.id); }}><span className="nm">{card.name}</span><span className="why">{card.learn?.why_care}</span></button>)}
        {!hits.length && !unitHits.length && !topicHits.length && <p className="muted">學習模式還沒有這個主題的卡片。可以到研究模式找找看，或試試下面的推薦謎題。</p>}
      </div>
    );
    switch (view.kind) {
      case 'home': return <LearnHome index={index} p={p} onHistory={chooseHistory} onUnit={openUnit} onRandom={random} onIntroSeen={() => update((o) => ({ ...o, seenIntro: true }))} onRecord={() => push({ kind: 'record' })} onTopic={openTopic} onTopics={() => push({ kind: 'topics' })} onStory={openStory} onDive={openDive} />;
      case 'history': return h ? <HistoryPage index={index} h={h} cards={histCards} p={p} onUnit={openUnit} onCard={openCard} onHistory={chooseHistory} onSim={(id) => push({ kind: 'sim', id })} onDive={openDive} />
        : <LearnHome index={index} p={p} onHistory={chooseHistory} onUnit={openUnit} onRandom={random} onIntroSeen={() => {}} />;
      case 'unit': return unit ? <UnitPlayer key={unit.id} unit={unit} index={index} prog={p.units[unit.id]} setProg={(x) => setUnit(unit.id, x)}
        onCard={openCard} onUnit={openUnit} onSim={(id) => push({ kind: 'sim', id })} onFocus={setFocus} onHome={() => setStack([{ kind: 'home' }])} onTopic={openTopic} topicCount={learnCount} onStory={openStory} onDive={openDive} unitPeople={setUnitPeople} openPeople={openPeople} onMap={isMobile ? () => setTab('map') : undefined} /> : <p>找不到這個單元（可能還在查核中）。</p>;
      case 'card': { const c = byId(view.id); return c?.learn ? <LearnCard key={c.id} card={c} index={index} history={h} onOpen={openCard} onHistory={(id) => setHid(id)} onTopic={openTopic} topicCount={learnCount} onStory={openStory} onUnit={openUnit} onDive={openDive} /> : <p>這張卡還不在學習模式裡（需要通過交叉查核）。</p>; }
      case 'mymap': return <MyMap index={index} cards={all} p={p} onCard={openCard} onUnit={openUnit} onRecord={() => push({ kind: 'record' })} />;
      case 'record': return <LearnRecord index={index} p={p} onUnit={openUnit} onReset={() => { reset(); setStack([{ kind: 'home' }]); }} />;
      case 'sim': return <SimView id={view.id} index={index} onCard={openCard} />;
      case 'topic': return <TopicView key={view.name} index={index} name={view.name} currentId={lastCard} onOpen={(id) => openCard(id)} onTopic={openTopic} onAll={() => push({ kind: 'topics' })}
        canOpen={(c) => !!c.learn} researchHref={researchHref} read={(id) => !!p.cards[id]} onMap={isMobile ? () => setTab('map') : undefined} />;
      case 'topics': return <TopicIndex index={index} onTopic={openTopic} count={learnCount} />;
      case 'story': return <StorylineView key={view.id} index={index} id={view.id} currentId={lastCard} onOpen={(id) => openCard(id)} onAll={() => push({ kind: 'stories' })}
        canOpen={(c) => !!c.learn} researchHref={researchHref} read={(id) => !!p.cards[id]} onStory={openStory} onMap={isMobile ? () => setTab('map') : undefined} />;
      case 'stories': return <StorylineIndex index={index} onStory={openStory} onTopics={() => push({ kind: 'topics' })} onDives={(index.dives ?? []).length ? () => push({ kind: 'dives' }) : undefined} />;
      case 'dive': return <DiveView key={view.id} index={index} id={view.id} year={year} setYear={setYear} currentId={lastCard} powerYear={powerYear} setPowerYear={setPowerYear}
        onOpen={(id) => openCard(id)} onStory={openStory} onAll={() => push({ kind: 'dives' })} onUnit={openUnit} canOpen={(c) => !!c.learn} researchHref={researchHref} onMap={isMobile ? () => setTab('map') : undefined} learn />;
      case 'dives': return <DiveIndex index={index} onDive={openDive} />;
      case 'peoples': return <PeoplePanel id={view.id} onPick={openPeople} onCard={openCard} />;
    }
    return null;
  })();
  // 長內文（src/lib/detail.ts）：只有卡片（那一張）、單元（那一個＋它用到的卡）、學習紀錄（寫過回答的單元，要顯示題目）真的用到；
  // 首頁、史、主題、故事線、專題、模擬、我的地圖、人群用的都是 index.json 裡就有的欄位，不必等。
  // 要用的小檔在頁面打開時抓（通常在滑鼠移上去時就開始了），到了才顯示，之前顯示「載入卡片內容…」
  const recordUnits = index.units.filter((u) => Object.entries(p.units[u.id]?.answers ?? {}).some(([k, v]) => /^s\d+$/.test(k) && typeof v === 'string' && v.trim())).map((u) => u.id);
  const recordKey = recordUnits.join();
  useEffect(() => {
    if (view.kind === 'card') ensureCards([view.id]);
    else if (view.kind === 'unit') ensureUnits([view.id]);
    else if (view.kind === 'record') ensureUnits(recordUnits);
  }, [view, recordKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const ready = query.trim() ? true : view.kind === 'card' ? cardLoaded(index, view.id) : view.kind === 'unit' ? unitLoaded(index, view.id)
    : view.kind === 'record' ? recordUnits.every((id) => unitLoaded(index, id)) : true;
  const content = ready ? contentRaw : <p className="muted loading-detail">{waitingText(index)}</p>;

  const topicName = view.kind === 'topic' ? view.name : null;
  const storyId = view.kind === 'story' ? view.id : null;
  const diveId = view.kind === 'dive' ? view.id : null;
  const hl = useMemo(() => diveId ? { keys: [], routes: diveRoutes(index, diveId), marks: diveMarks(index, diveId) } : storyId ? { keys: [], routes: [], marks: storyMarks(index, storyId) } : topicName ? { keys: [], routes: [], marks: topicMarks(index, topicName) }
    : { keys: selected?.place.locations.map((l) => l.key) ?? [], routes: selected?.routes ?? [] }, [topicName, storyId, diveId, selected?.id, index]);
  const map = <MapView index={index} cards={histCards} bgCards={bgCards} year={year} learn compact={isMobile} home={home}
    highlight={hl} power={activePower ? { file: activePower.file, title: activePower.title, legend: activeDive?.power_ui?.legend, files: activeDive?.power_maps.map((x) => x.file) } : null} onCard={(id) => openCard(id)}
    trail={selected?.type === 'person' ? selected.place.locations.filter((l) => typeof l.year === 'number').map((l) => ({ lat: l.lat, lng: l.lng, year: l.year!, name: l.name_ancient })) : null}
    onPlace={(key) => { const c = histCards.find((x) => x.place.locations.some((l) => l.key === key)); if (c) openCard(c.id); }} onRoute={() => {}}
    peoples={{ on: peoplesOn || (view.kind === 'unit' && !!unitPeople), setOn: (v) => { setPeoplesOn(v); if (!v) setUnitPeople(null); if (!v && view.kind === 'peoples') back(); }, sel: view.kind === 'peoples' ? view.id : view.kind === 'unit' ? unitPeople : null, onPick: (id) => { openPeople(id); if (isMobile && id !== PEOPLE_INTRO) setTab('main'); } }} />;
  const timeline = <LearnTimeline cards={all} history={h} year={year} setYear={setYear} selectedId={selected?.id ?? null} onOpen={openCard} inHistory={(c) => inHistory(c, h)} onPrehistory={prehistDive(index) ? () => openDive(prehistDive(index)!.id) : undefined} />;
  const cardTab = lastCard && !cardLoaded(index, lastCard) ? <p className="muted loading-detail">{waitingText(index)}</p> : lastCard && byId(lastCard)?.learn ? <LearnCard card={byId(lastCard)!} index={index} history={h} onOpen={openCard} onTopic={openTopic} topicCount={learnCount} onStory={openStory} onUnit={openUnit} onDive={openDive} /> : <p className="muted">還沒打開任何卡片。</p>;

  const contentTitle = query.trim() ? '搜尋' : ({ home: '學習首頁', history: h?.name ?? '史', unit: '單元', card: '卡片', mymap: '我的地圖', record: '學習紀錄', sim: '模擬', search: '搜尋', topic: '主題路徑', topics: '主題標籤', story: '故事線', stories: '故事線', dive: '深入專題', dives: '深入專題', peoples: '人群' } as Record<View['kind'], string>)[view.kind];
  const header = (
    <header className="ltop">
      <SkipLink sel=".lcontent, .panel" />
      <button className="brand" onClick={() => setStack([{ kind: 'home' }])} title="回到學習模式首頁">歷史長河</button>
      <div className="mode-switch" role="group" aria-label="切換模式">
        <button onClick={onResearch}>研究模式</button><button className="on" aria-pressed>學習模式</button>
      </div>
      {h && <button className="chip hist-chip" onClick={() => push({ kind: 'history' })} title="目前選的史">📚 {h.name}</button>}
      <div className="lsearch-box">
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => { loadSearchLibs().catch(() => {}); }} placeholder="想知道什麼？例：羅馬為什麼滅亡" aria-label="搜尋學習內容" />
        {!query && !isMobile && index.units.length > 0 && <div className="suggest">試試：{index.units.slice(0, 3).map((u) => <button key={u.id} className="link" onClick={() => openUnit(u.id)}>{u.mystery}</button>)}</div>}
      </div>
      {!isMobile && <button className="btn sm" onClick={random} title="隨機一個謎題" aria-label="隨機一個謎題">🎲</button>}
      {(index.storylines ?? []).length > 0 && <button className={`btn sm ${view.kind === 'story' || view.kind === 'stories' ? 'on' : ''}`} onClick={() => { setQuery(''); push({ kind: 'stories' }); }} title="故事線：沿著前因 → 後果，把不同時代的事件接成一條路" aria-label="故事線">{isMobile ? '故事線' : '〰 故事線'}</button>}
      {(index.dives ?? []).length > 0 && <button className={`btn sm ${view.kind === 'dive' || view.kind === 'dives' ? 'on' : ''}`} onClick={() => { setQuery(''); push({ kind: 'dives' }); }} title="深入專題：把一段時代放大來看（地圖、卡片、故事線、單元）" aria-label="深入專題">{isMobile ? '專題' : '🔍 專題'}</button>}
      <button className={`btn sm ${view.kind === 'topic' || view.kind === 'topics' ? 'on' : ''}`} onClick={() => { setQuery(''); push({ kind: 'topics' }); }} title="主題標籤：把同一個主題的卡片依年代串成歷史路徑" aria-label="主題標籤">#{!isMobile && ' 主題標籤'}</button>
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
      {!isMobile && (Object.keys(dock.wins) as LPanel[]).map((id) => <button key={id} className="btn sm dock-back" onClick={() => dock.unpop(id)} title="這個區塊在另一個視窗，按一下收回來">↩ 收回{({ content: '文字欄', map: '地圖', tl: '時間軸' } as const)[id]}</button>)}
      {!isMobile && dock.customized && <button className="btn sm layout-reset" onClick={dock.resetAll} title="恢復預設版面：大小、位置、浮動小窗、彈出的視窗全部歸位">⟲ 版面</button>}
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
      <DockLayout dock={dock} mainClass="ld-main"
        panels={{
          content: { title: contentTitle, cls: 'lcontent', node: <>{stack.length > 1 && <button className="back" onClick={back}>← 返回</button>}{content}</> },
          map: { title: '地圖', cls: 'ld-map', node: map },
          tl: { title: '時間軸', cls: 'ld-tl', extra: tlInC && <button className="tl-toggle" onClick={toggleTl} aria-expanded={tlOpen}>{tlOpen ? '▾ 收起' : '▸ 展開'}</button>,
            node: (tlOpen || !tlInC) && timeline },
        }}
        colA={(px) => colSize(px, 'minmax(0, 1.15fr)', 320, 75)} colB={() => 'minmax(0, 1fr)'} colSized="a" colMin={320} colMaxPct={75}
        rowCDefault={(id) => (id === 'tl' ? 'auto' : '38%')} cCollapsed={(id) => id === 'tl' && !tlOpen}
        popRoot={{ className: 'learn desktop popout', style: { ['--fs' as any]: fs } }} />
    </div>
  );
}

export type { Card };
