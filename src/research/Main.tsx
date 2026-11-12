// 研究模式（地圖＋時間軸＋右欄）。從 App.tsx 搬出來，整個延後載入（src/chunks.tsx ResearchMain）；
// 載入完成前外殼（ResearchShell）先畫出標題列、搜尋框、篩選列與各區塊的框。
import { useDeferredValue, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import type { Index, Card, Filters } from '../types';
import { createSearch, matchTopics, useSearchLibs, loadSearchLibs } from '../lib/search';
import { TopicView, TopicIndex, topicMarks, findTopic } from '../components/Topics';
import { findStory, storyMarks, keepRead } from '../lib/storyLite';
import { findDive, hasPowerVisual, powerFor, diveYear, prehistDive, diveRoutes, diveMarks } from '../lib/dive';
import { activeAt } from '../lib/format';
import { CardDetail } from '../components/CardDetail';
import { ResultList } from '../components/ResultList';
import { FilterBar } from '../components/FilterBar';
import { PlacePanel } from '../components/PlacePanel';
import { RoutePanel } from '../components/RoutePanel';
import { StructureMatch } from '../components/StructureMatch';
import { ChainPanel } from '../components/ChainPanel';
import { EconPanel } from '../components/EconPanel';
import { TodayPanel } from '../components/TodayPanel';
import { PEOPLE_INTRO } from '../lib/peoples';
import { useIsMobile } from '../lib/useIsMobile';
import { MIN_YEAR, MAX_YEAR, ERAS, eraOf } from '../lib/timeScale';
import { DockLayout, useDock } from '../components/Dock';
import { useLayout, colSize } from '../lib/layout';
import { SkipLink } from '../components/SkipLink';
import { ensureCards, startFullDetail, cardLoaded, waitingText } from '../lib/detail';
import type { Pre } from './pre';
import { MapView, Timeline, PeoplePanel, StorylineView, StorylineIndex, DiveView, DiveIndex } from '../chunks';

type RPanel = 'map' | 'side' | 'tl';
const R_PANELS: readonly RPanel[] = ['map', 'side', 'tl'];

export type Panel =
  | { kind: 'list' }
  | { kind: 'card'; id: string }
  | { kind: 'place'; key: string }
  | { kind: 'route'; id: string }
  | { kind: 'match'; tags?: string[] }
  | { kind: 'chain'; id: string }
  | { kind: 'econ'; series: string; point: number }
  | { kind: 'today'; id: string }
  | { kind: 'peoples'; id: string }
  | { kind: 'topic'; name: string }
  | { kind: 'topics' }
  | { kind: 'story'; id: string }
  | { kind: 'stories' }
  | { kind: 'dive'; id: string }
  | { kind: 'dives' };

export function Main({ index, onLearn, pre }: { index: Index; onLearn: () => void; pre: Pre }) {
  const isMobile = useIsMobile();
  // 網址參數：?year=100 指定年份、?card=war-peloponnesian 直接開卡、?chain=chain-silk 直接播物資鏈、?q=羅馬 預填搜尋
  const params = useMemo(() => new URLSearchParams(location.search), []);
  const [year, setYear] = useState(() => {
    const y = Number(params.get('year'));
    if (Number.isFinite(y) && params.has('year')) return y;
    const ch = index.chains.find((c) => c.id === params.get('chain'));
    if (ch) return ch.start;
    // ?card= 直接開卡時，年代跳到該卡開始的年份
    const cd = index.cards.find((c) => c.id === params.get('card'));
    if (cd) return cd.time.start;
    // ?dive= 打開深入專題時，年代跳到第一張勢力圖的年份（沒有就專題起點）
    const dv = findDive(index, params.get('dive') ?? '');
    if (dv) return diveYear(dv);
    // ?topic= 打開主題路徑時，年代跳到路徑第一張卡
    const tp = findTopic(index, params.get('topic') ?? '')?.topic.cards[0];
    const tc = tp ? index.cards.find((c) => c.id === tp) : undefined;
    return tc ? tc.time.start : -490;
  });
  // 外殼上正在打字時，換成真畫面後把游標還給搜尋框
  useEffect(() => { if (pre.focus) { const el = document.querySelector<HTMLInputElement>('input.search'); if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); } } }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [query, setQuery] = useState(() => pre.query || (params.get('q') ?? ''));
  const [filters, setFilters] = useState<Filters>(pre.filters);
  const [stack, setStack] = useState<Panel[]>(() => {
    // 完整資料還沒到時就點了入口（故事線、專題、主題標籤、結構對照）：資料到了就直接開
    if (pre.panel) return [{ kind: 'list' }, pre.panel];
    const id = params.get('card');
    const ch = params.get('chain');
    if (ch && [...index.chains, ...index.today.chains].some((c) => c.id === ch)) return [{ kind: 'list' }, { kind: 'chain', id: ch }];
    // ?topic=交易所 直接打開主題路徑
    const tp = params.get('topic');
    if (tp && findTopic(index, tp)) return [{ kind: 'list' }, { kind: 'topic', name: tp }];
    // ?story=story-xxx 直接打開故事線
    const st = params.get('story');
    if (st && findStory(index, st)) return [{ kind: 'list' }, { kind: 'story', id: st }];
    // ?dive=dive-sengoku 直接打開深入專題
    const dv = params.get('dive');
    if (dv && findDive(index, dv)) return [{ kind: 'list' }, { kind: 'dive', id: dv }];
    // ?peoples=Taiwan 直接打開人群圖層的某一國（?peoples=intro 說明、?peoples=about 為什麼不畫人種）
    const pp = params.get('peoples');
    if (pp) return [{ kind: 'list' }, { kind: 'peoples', id: pp }];
    const td = params.get('today');
    if (td && index.today.chokepoints.some((c) => c.id === td)) return [{ kind: 'list' }, { kind: 'today', id: td }];
    return id && index.cards.some((c) => c.id === id) ? [{ kind: 'list' }, { kind: 'card', id }] : [{ kind: 'list' }];
  });
  const [chainT, setChainT] = useState(0);
  // 今日對照層開關：網址帶 ?today= 或打開今日項目時自動打開
  const [todayOn, setTodayOn] = useState(() => params.has('today') || (params.get('chain') ?? '').startsWith('today-'));
  // 人群圖層開關：網址帶 ?peoples= 時自動打開
  const [peoplesOn, setPeoplesOn] = useState(() => params.has('peoples'));
  const [mobileTab, setMobileTab] = useState<'list' | 'map' | 'match' | 'topics'>(() => (isMobile && (params.get('dive') || params.get('story') || params.get('topic') || (pre.panel && ['stories', 'dives', 'topics'].includes(pre.panel.kind))) ? 'topics' : pre.panel?.kind === 'match' ? 'match' : 'list'));
  const panel = stack[stack.length - 1];
  // 深入專題：目前打開哪一年的勢力圖（null＝關）。進專題時自動打開最接近目前年代的一張
  const [powerYear, setPowerYear] = useState<number | null>(() => { const dv = findDive(index, params.get('dive') ?? ''); return dv ? powerFor(dv, powerFor(dv, dv.range.start)?.year ?? dv.range.start)?.year ?? null : null; });
  // 專題「打開著」的判定：目前在專題頁，或從專題頁點進卡片（上面只疊著卡片）——時間軸維持放大、勢力圖維持
  const diveBelow = (() => { for (let i = stack.length - 1; i >= 0; i--) { const p = stack[i]; if (p.kind === 'dive') return p.id; if (p.kind !== 'card') return null; } return null; })();
  const activeDive = diveBelow ? findDive(index, diveBelow) ?? null : null;
  const activePower = activeDive && hasPowerVisual(activeDive) && powerYear != null ? activeDive.power_maps.find((p) => p.year === powerYear) ?? null : null;
  // 各區塊大小可拖曳調整（右欄寬、時間軸高、時間軸收合），記在這台瀏覽器；「⟲ 版面」恢復預設
  // 三個區塊還可以拖曳交換位置、變浮動小窗、彈出新視窗（components/Dock.tsx）
  const L = useLayout();
  const { layout, set: setLayout } = L;
  const dock = useDock('r', R_PANELS, L);
  const tlOpen = layout.rTlOpen ?? true;
  const tlInC = dock.order[2] === 'tl' && !dock.float.tl && !dock.wins.tl;

  // 效能：依賴 index.cards（長內文併入時沿用同一批卡片物件），不會因此重建搜尋索引
  const byId = useMemo(() => new Map(index.cards.map((c) => [c.id, c])), [index.cards]);
  const search = useMemo(() => createSearch(index.cards), [index.cards]);
  const passFilter = useCallback((c: Card) =>
    (!filters.types.length || filters.types.includes(c.type)) &&
    (!filters.fields.length || [c.place.primary_field, ...c.place.secondary_fields].some((f) => filters.fields.includes(f))) &&
    (!filters.civs.length || c.civPaths.some((v) => filters.civs.some((f) => v === f || v.startsWith(f + '/')))), [filters]);
  const visible = useMemo(() => index.cards.filter(passFilter), [index.cards, passFilter]);
  const libsReady = useSearchLibs(!!query.trim());
  // 效能：搜尋結果用延後值，打字不會因為重算結果和地圖而卡住
  const dq = useDeferredValue(query);
  const result = useMemo(() => search(dq), [search, dq, libsReady]); // eslint-disable-line react-hooks/exhaustive-deps
  const hits = useMemo(() => result.hits.filter((h) => passFilter(h.card)), [result, passFilter]);

  const open = useCallback((p: Panel) => {
    setStack((s) => (s[s.length - 1].kind === p.kind && JSON.stringify(s[s.length - 1]) === JSON.stringify(p) ? s : [...s, p]));
    if (p.kind === 'match') setMobileTab('match');
    else if (isMobile && (p.kind === 'topic' || p.kind === 'topics' || p.kind === 'story' || p.kind === 'stories' || p.kind === 'dive' || p.kind === 'dives')) setMobileTab('topics');
    else if (isMobile && p.kind !== 'place') setMobileTab('list');
  }, [isMobile]);
  const [lastOpened, setLastOpened] = useState<string | null>(() => params.get('card'));
  const openCard = useCallback((id: string) => {
    setLastOpened(id);
    const c = byId.get(id);
    if (c && !activeAt(c, year)) setYear(c.time.start);
    open({ kind: 'card', id });
  }, [byId, year, open]);
  const openChain = useCallback((id: string) => {
    const ch = [...index.chains, ...index.today.chains].find((c) => c.id === id);
    if (ch && !ch.today && (year < ch.start || year > ch.end)) setYear(ch.start);
    if (ch?.today) setTodayOn(true);
    setChainT(0); open({ kind: 'chain', id });
    if (isMobile) setMobileTab('map');
  }, [index, year, open, isMobile]);
  const openEcon = useCallback((series: string, point: number) => {
    setStack((s) => (s[s.length - 1].kind === 'econ' ? [...s.slice(0, -1), { kind: 'econ', series, point }] : [...s, { kind: 'econ', series, point }]));
  }, []);
  const activeChain = panel.kind === 'chain' ? [...index.chains, ...index.today.chains].find((c) => c.id === panel.id) ?? null : null;
  const openToday = useCallback((id: string) => { setTodayOn(true); open({ kind: 'today', id }); }, [open]);
  const activeToday = panel.kind === 'today' ? index.today.chokepoints.find((c) => c.id === panel.id) ?? null : null;
  // 人群圖層：同一層連點不同國家時換掉最上面那一頁，不一直疊（返回鍵回到原本的卡片或清單）
  const openPeople = useCallback((id: string) => {
    setPeoplesOn(true);
    setStack((s) => (s[s.length - 1].kind === 'peoples' ? [...s.slice(0, -1), { kind: 'peoples', id }] : [...s, { kind: 'peoples', id }]));
  }, []);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const home = () => setStack([{ kind: 'list' }]);

  const selectedCard = panel.kind === 'card' ? byId.get(panel.id) ?? null : null;
  const highlight = useMemo(() => {
    if (selectedCard) return { keys: selectedCard.place.locations.map((l) => l.key), routes: selectedCard.routes };
    if (panel.kind === 'place') return { keys: [panel.key], routes: [] };
    if (panel.kind === 'route') return { keys: [], routes: [panel.id] };
    if (panel.kind === 'topic') return { keys: [], routes: [], marks: topicMarks(index, panel.name) };
    if (panel.kind === 'story') return { keys: [], routes: [], marks: storyMarks(index, panel.id) };
    if (panel.kind === 'dive') return { keys: [], routes: diveRoutes(index, panel.id), marks: diveMarks(index, panel.id) };
    return { keys: [], routes: [] };
  }, [selectedCard, panel, index]);
  // 人物卡：地圖上依年份把他去過的地點連成人生軌跡
  const trail = useMemo(() => selectedCard?.type === 'person' ? selectedCard.place.locations.filter((l) => typeof l.year === 'number').map((l) => ({ lat: l.lat, lng: l.lng, year: l.year!, name: l.name_ancient })) : null, [selectedCard]);
  const openDive = useCallback((id: string) => {
    const d = findDive(index, id);
    if (!d) return;
    const y = powerFor(d, year)?.year ?? null;
    // 讀書專題（沒有勢力圖、有 focus_year）一打開就跳到起點，例如《人類大歷史》跳到 7 萬年前
    if (year < d.range.start || year > d.range.end || (d.focus_year != null && !d.power_maps.length)) { const y0 = diveYear(d); setYear(y0); setPowerYear(powerFor(d, y0)?.year ?? null); }
    else setPowerYear(y);
    open({ kind: 'dive', id });
  }, [open, index, year]);
  const openTopic = useCallback((name: string) => open({ kind: 'topic', name }), [open]);
  const openStory = useCallback((id: string) => {
    const first = byId.get(findStory(index, id)?.stops[0]?.id ?? '');
    if (first && !activeAt(first, year)) setYear(first.time.start);
    open({ kind: 'story', id });
  }, [open, index, byId, year]);
  const topicNames = useMemo(() => (index.topicLayers ?? []).flatMap((l) => l.topics.map((t) => ({ name: t.name, n: t.cards.length }))), [index]);
  const topicHits = useMemo(() => { const m = matchTopics(topicNames.map((t) => t.name), query); return topicNames.filter((t) => m.includes(t.name)); }, [topicNames, query, libsReady]); // eslint-disable-line react-hooks/exhaustive-deps
  // 打開卡片或主題路徑時，網址跟著變（?card= / ?topic=），可以直接複製分享
  const urlFirst = useRef(true);
  useEffect(() => {
    const first = urlFirst.current; urlFirst.current = false;
    // 回到清單（例如關掉人群圖層、按首頁）：把上面這些參數拿掉，網址回到 ?mode=research；第一次載入不動，深連結還要靠網址開面板
    if (panel.kind === 'list') {
      if (first) return;
      const u = new URL(location.href), keys = ['card', 'topic', 'story', 'read', 'dive', 'peoples'];
      if (keys.some((k) => u.searchParams.has(k))) { keys.forEach((k) => u.searchParams.delete(k)); history.replaceState(null, '', `${u.pathname}${u.search}`); }
      return;
    }
    if (panel.kind !== 'card' && panel.kind !== 'topic' && panel.kind !== 'story' && panel.kind !== 'dive' && panel.kind !== 'peoples') return;
    const q = new URLSearchParams({ mode: 'research' });
    if (panel.kind === 'peoples') q.set('peoples', panel.id); else if (panel.kind === 'card') q.set('card', panel.id); else if (panel.kind === 'story') { q.set('story', panel.id); if (keepRead(panel.id)) q.set('read', '1'); } else if (panel.kind === 'dive') q.set('dive', panel.id); else q.set('topic', panel.name);
    history.replaceState(null, '', `${location.pathname}?${q}`);
  }, [panel]);

  const onQuery = (q: string) => { setQuery(q); if (panel.kind !== 'list') home(); if (isMobile) setMobileTab('list'); };

  const panelTitle = ({ list: '卡片清單', card: '卡片', place: '地點', route: '路線', match: '結構對照', chain: '物資鏈', econ: '經濟曲線', today: '今日對照', peoples: '人群', topic: '主題路徑', topics: '主題標籤', story: '故事線', stories: '故事線', dive: '深入專題', dives: '深入專題' } as const)[panel.kind];
  const sideRaw = (() => {
    switch (panel.kind) {
      case 'card': return selectedCard && <CardDetail card={selectedCard} index={index} byId={byId} onOpen={openCard}
        onTag={(t) => open({ kind: 'match', tags: [t] })} onTopic={openTopic} onPlace={(key) => open({ kind: 'place', key })} onRoute={(id) => open({ kind: 'route', id })} onChain={openChain} onToday={openToday} onStory={openStory} onDive={(index.dives ?? []).length ? openDive : undefined} />;
      case 'place': return <PlacePanel placeKey={panel.key} cards={index.cards} onOpen={openCard} />;
      case 'route': return <RoutePanel route={index.routes.find((r) => r.id === panel.id)!} cards={index.cards} onOpen={openCard} />;
      case 'chain': return activeChain && <ChainPanel chain={activeChain} card={byId.get(activeChain.card)} t={chainT} setT={setChainT} onOpen={openCard} byId={byId} />;
      case 'today': return activeToday && <TodayPanel point={activeToday} index={index} byId={byId} onOpen={openCard} onTag={(t) => open({ kind: 'match', tags: [t] })} onChain={openChain} />;
      case 'peoples': return <PeoplePanel id={panel.id} onPick={openPeople} onCard={openCard} />;
      case 'econ': return <EconPanel econ={index.econ} seriesId={panel.series} point={panel.point} onPick={openEcon} />;
      case 'match': return <StructureMatch index={index} initialTags={panel.tags} onOpen={openCard} onToday={openToday} onPlace={(key) => open({ kind: 'place', key })} />;
      case 'topic': return <TopicView key={panel.name} index={index} name={panel.name} currentId={lastOpened} onOpen={openCard} onTopic={openTopic} onAll={() => open({ kind: 'topics' })} onMap={isMobile ? () => setMobileTab('map') : undefined} />;
      case 'topics': return <TopicIndex index={index} onTopic={openTopic} />;
      case 'story': return <StorylineView key={panel.id} index={index} id={panel.id} currentId={lastOpened} onOpen={openCard} onAll={() => open({ kind: 'stories' })} onStory={openStory} onMap={isMobile ? () => setMobileTab('map') : undefined} />;
      case 'stories': return <StorylineIndex index={index} onStory={openStory} onTopics={() => open({ kind: 'topics' })} onDives={(index.dives ?? []).length ? () => open({ kind: 'dives' }) : undefined} />;
      case 'dive': return <DiveView key={panel.id} index={index} id={panel.id} year={year} setYear={setYear} currentId={lastOpened} powerYear={powerYear} setPowerYear={setPowerYear} onOpen={openCard} onStory={openStory} onAll={() => open({ kind: 'dives' })} unitHref={(id) => `${location.pathname}?mode=learn&unit=${id}`} onMap={isMobile ? () => setMobileTab('map') : undefined} timelineZoomed={!isMobile} />;
      case 'dives': return <DiveIndex index={index} onDive={openDive} />;
      default: return <ResultList query={query} result={result} hits={hits} cards={visible} year={year} onOpen={openCard} topics={topicHits} onTopic={openTopic} />;
    }
  })();
  // 長內文（src/lib/detail.ts）：只有卡片（那一張）和結構對照（關鍵字要掃過所有卡的內文，等整包）真的用到；
  // 地點、路線、物資鏈、今日對照、主題、故事線、專題用的都是 index.json 裡就有的欄位，不必等。
  // 卡片：打開時只抓那一張的小檔（通常在滑鼠移上去時就開始了），到了就顯示
  const cardId = panel.kind === 'card' ? panel.id : null;
  useEffect(() => { if (cardId) ensureCards([cardId]); }, [cardId]);
  useEffect(() => { if (panel.kind === 'match') startFullDetail(); }, [panel.kind]);
  const side = (panel.kind === 'card' && !cardLoaded(index, panel.id)) || (panel.kind === 'match' && index.detailReady === false) ? <p className="muted loading-detail">{waitingText(index)}</p> : sideRaw;

  const map = <MapView index={index} cards={visible} year={year} highlight={highlight}
    onPlace={(key) => { open({ kind: 'place', key }); if (isMobile) setMobileTab('list'); }}
    onRoute={(id) => { open({ kind: 'route', id }); if (isMobile) setMobileTab('list'); }} compact={isMobile}
    chain={activeChain ? { chain: activeChain, t: chainT } : null}
    todayOn={todayOn} setTodayOn={setTodayOn} onToday={(id) => { openToday(id); if (isMobile) setMobileTab('list'); }} todaySel={activeToday?.id ?? null}
    power={activePower ? { file: activePower.file, title: activePower.title, legend: activeDive?.power_ui?.legend, files: activeDive?.power_maps.map((x) => x.file) } : null} onCard={(id) => { openCard(id); if (isMobile) setMobileTab('list'); }} trail={trail}
    peoples={{ on: peoplesOn, setOn: (v) => { setPeoplesOn(v); if (!v && panel.kind === 'peoples') back(); }, sel: panel.kind === 'peoples' ? panel.id : null, onPick: (id) => { openPeople(id); if (isMobile && id !== PEOPLE_INTRO) setMobileTab('list'); } }} />;

  return (
    <div className={`app ${isMobile ? 'mobile' : 'desktop'}`}>
      <SkipLink sel=".panel" />
      <header className="top">
        <button className="brand" onClick={() => { home(); setQuery(''); }} title="回到首頁">歷史長河</button>
        <input className="search" type="search" value={query} onChange={(e) => onQuery(e.target.value)} onFocus={() => { loadSearchLibs().catch(() => {}); }}
          placeholder={isMobile ? '搜尋卡片（可打錯字、簡體、英文）' : '搜尋：名稱、別名、古今地名、場域、文明、年份、結構標籤（可打錯字、簡體、英文）'} aria-label="搜尋" />
        {!isMobile && (index.storylines ?? []).length > 0 && <button className={`btn ${panel.kind === 'story' || panel.kind === 'stories' ? 'on' : ''}`} onClick={() => open({ kind: 'stories' })} title="沿著前因 → 後果，把不同時代的事件接成一條路">故事線</button>}
        {!isMobile && (index.dives ?? []).length > 0 && <button className={`btn ${panel.kind === 'dive' || panel.kind === 'dives' ? 'on' : ''}`} onClick={() => open({ kind: 'dives' })} title="把一段時代放大來看：地圖、卡片、故事線">專題</button>}
        {!isMobile && <button className={`btn ${panel.kind === 'topic' || panel.kind === 'topics' ? 'on' : ''}`} onClick={() => open({ kind: 'topics' })} title="依主題把卡片串成歷史路徑，例如 #交易所">主題標籤</button>}
        {!isMobile && <button className={`btn ${panel.kind === 'match' ? 'on' : ''}`} onClick={() => open({ kind: 'match' })}>結構對照</button>}
        {!isMobile && (Object.keys(dock.wins) as RPanel[]).map((id) => <button key={id} className="btn sm dock-back" onClick={() => dock.unpop(id)} title="這個區塊在另一個視窗，按一下收回來">↩ 收回{({ map: '地圖', side: '卡片欄', tl: '時間軸' } as const)[id]}</button>)}
        {!isMobile && dock.customized && <button className="btn layout-reset" onClick={dock.resetAll} title="恢復預設版面：大小、位置、浮動小窗、彈出的視窗全部歸位">⟲ 版面</button>}
        <button className="btn learn-btn" onClick={onLearn} title="給國高中生的自主學習模式">學習模式</button>
        <a className="btn credits" href={`${import.meta.env.BASE_URL}credits.html`} target="_blank" rel="noopener" title="資料來源與授權">出處</a>
      </header>
      <FilterBar index={index} filters={filters} setFilters={setFilters} />
      {isMobile ? (
        <>
          <nav className="tabs">
            {(['list', 'map', 'topics', 'match'] as const).map((t) => (
              <button key={t} className={mobileTab === t ? 'on' : ''} onClick={() => {
                setMobileTab(t);
                if (t === 'match' && panel.kind !== 'match') open({ kind: 'match' });
                if (t === 'topics' && !['topics', 'topic', 'story', 'stories', 'dive', 'dives'].includes(panel.kind)) open({ kind: 'stories' });
                if (t === 'list' && ['match', 'topics', 'topic', 'story', 'stories', 'dive', 'dives'].includes(panel.kind)) home();
              }}>
                {{ list: '清單', map: '地圖', topics: '故事／主題', match: '結構對照' }[t]}
              </button>
            ))}
          </nav>
          <main className="m-main">
            {mobileTab === 'map' ? (
              <div className="m-map">
                <YearSlider year={year} setYear={setYear} />
                {map}
                {activeChain && <section className="panel m-chain">{side}</section>}
              </div>
            ) : (
              <section className="panel">
                {stack.length > 1 && <button className="back" onClick={back}>← 返回</button>}
                {side}
              </section>
            )}
          </main>
        </>
      ) : (
        <DockLayout dock={dock} mainClass={`d-main ${tlOpen ? '' : 'tl-closed'}`}
          panels={{
            map: { title: '地圖', cls: 'map-wrap', node: map },
            side: { title: panelTitle, cls: 'panel', node: <>
              {stack.length > 1 && <div className="panel-nav"><button className="back" onClick={back}>← 返回</button><button className="back" onClick={home}>清單</button></div>}
              {side}
            </> },
            tl: { title: '時間軸', cls: 'timeline-wrap', extra: tlInC && <button className="tl-toggle" onClick={() => setLayout({ rTlOpen: !tlOpen })} aria-expanded={tlOpen}>{tlOpen ? '▾ 收起' : '▸ 展開'}</button>,
              node: (tlOpen || !tlInC) && <Timeline cards={activeDive ? visible.filter((c) => activeDive.cards.includes(c.id)) : visible} allCards={index.cards} year={year} setYear={setYear} lanesDef={activeDive ? activeDive.lanes : null}
                selectedId={selectedCard?.id ?? null} onOpen={openCard} focusIds={panel.kind === 'topic' ? findTopic(index, panel.name)?.topic.cards ?? null : panel.kind === 'story' ? findStory(index, panel.id)?.stops.map((x) => x.id) ?? null : activeDive ? activeDive.cards : null}
                range={activeDive ? activeDive.range : null} onPrehistory={prehistDive(index) ? () => openDive(prehistDive(index)!.id) : undefined}
                econ={index.econ} onEcon={openEcon} econSel={panel.kind === 'econ' ? { series: panel.series, point: panel.point } : null} /> },
          }}
          colA={() => 'minmax(0, 1fr)'} colB={(px) => colSize(px, 'minmax(360px, 34%)')} colSized="b" colMin={280} colMaxPct={65}
          rowCDefault={(id) => (id === 'tl' ? 'auto' : '38%')} cCollapsed={(id) => id === 'tl' && !tlOpen}
          popRoot={{ className: 'app desktop popout' }} />
      )}
    </div>
  );
}

function YearSlider({ year, setYear }: { year: number; setYear: (y: number) => void }) {
  // 手機沒有時間軸：滑桿下方放時代按鈕，目前年代落在哪個時代就亮哪一顆，點一下跳到該時代開頭
  const cur = eraOf(year);
  return (
    <div className="year-slider-wrap">
      <label className="year-slider">
        <span>年代 <b>{year < 0 ? `前${-year}` : year}</b></span>
        <input type="range" min={MIN_YEAR} max={MAX_YEAR} step={1} value={year} onChange={(e) => setYear(Number(e.target.value) || 1)} />
      </label>
      <div className="era-seg m-era" role="group" aria-label="跳到時代">
        {ERAS.map((e) => <button key={e.name} className={cur === e.name ? 'on' : ''} aria-pressed={cur === e.name} onClick={() => setYear(e.a === 0 ? 1 : e.a)}>{e.name}</button>)}
      </div>
    </div>
  );
}
