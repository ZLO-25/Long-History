import { useEffect, useMemo, useState, useCallback } from 'react';
import { setNameTable } from './lib/bilingual';
import type { Index, Card, Filters } from './types';
import { createSearch } from './lib/search';
import { activeAt } from './lib/format';
import { Timeline } from './components/Timeline';
import { MapView } from './components/MapView';
import { CardDetail } from './components/CardDetail';
import { ResultList } from './components/ResultList';
import { FilterBar } from './components/FilterBar';
import { PlacePanel } from './components/PlacePanel';
import { RoutePanel } from './components/RoutePanel';
import { StructureMatch } from './components/StructureMatch';
import { ChainPanel } from './components/ChainPanel';
import { EconPanel } from './components/EconPanel';
import { TodayPanel } from './components/TodayPanel';
import { useIsMobile } from './lib/useIsMobile';
import { MIN_YEAR, MAX_YEAR } from './lib/timeScale';
import { LearnApp } from './learn/LearnApp';
import { Splitter } from './components/Splitter';
import { useLayout, colSize, rowSize } from './lib/layout';
import { useRef } from 'react';

export type Panel =
  | { kind: 'list' }
  | { kind: 'card'; id: string }
  | { kind: 'place'; key: string }
  | { kind: 'route'; id: string }
  | { kind: 'match'; tags?: string[] }
  | { kind: 'chain'; id: string }
  | { kind: 'econ'; series: string; point: number }
  | { kind: 'today'; id: string };

export default function App() {
  const [index, setIndex] = useState<Index | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}index.json`).then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then((ix) => { setNameTable(ix.names); setIndex(ix); }).catch(() => setError('讀不到 public/index.json。請先執行 npm run build:index（npm run dev 會自動執行）。'));
  }, []);
  if (error) return <div className="fatal">{error}</div>;
  if (!index) return <div className="fatal">載入中…</div>;
  return <ModeSwitch index={index} />;
}

// 第 6 期：研究模式／學習模式。網址 ?mode=learn 進入學習模式；研究模式的網址參數完全不變
// 第一次來（網址沒帶任何參數、也沒記住過模式）的人，預設進學習模式；之後記住上次用的模式。
// 研究模式的網址參數（?card= ?year= ?chain= …）一律維持研究模式，舊連結不受影響。
const MODE_KEY = 'history-river-mode';
function initialMode(): 'learn' | 'research' {
  const q = new URLSearchParams(location.search);
  if (q.get('mode') === 'learn') return 'learn';
  if (q.get('mode') === 'research' || [...q.keys()].length) return 'research';
  try { return window.localStorage.getItem(MODE_KEY) === 'research' ? 'research' : 'learn'; } catch { return 'learn'; }
}
function ModeSwitch({ index }: { index: Index }) {
  const [mode, setMode] = useState<'learn' | 'research'>(initialMode);
  useEffect(() => { try { window.localStorage.setItem(MODE_KEY, mode); } catch { /* 無痕模式不記 */ } }, [mode]);
  const go = (m: 'learn' | 'research') => { history.replaceState(null, '', m === 'learn' ? `${location.pathname}?mode=learn` : `${location.pathname}?mode=research`); setMode(m); };
  return mode === 'learn' ? <LearnApp index={index} onResearch={() => go('research')} /> : <Main index={index} onLearn={() => go('learn')} />;
}

function Main({ index, onLearn }: { index: Index; onLearn: () => void }) {
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
    return cd ? cd.time.start : -490;
  });
  const [query, setQuery] = useState(() => params.get('q') ?? '');
  const [filters, setFilters] = useState<Filters>({ types: [], fields: [], civs: [] });
  const [stack, setStack] = useState<Panel[]>(() => {
    const id = params.get('card');
    const ch = params.get('chain');
    if (ch && [...index.chains, ...index.today.chains].some((c) => c.id === ch)) return [{ kind: 'list' }, { kind: 'chain', id: ch }];
    const td = params.get('today');
    if (td && index.today.chokepoints.some((c) => c.id === td)) return [{ kind: 'list' }, { kind: 'today', id: td }];
    return id && index.cards.some((c) => c.id === id) ? [{ kind: 'list' }, { kind: 'card', id }] : [{ kind: 'list' }];
  });
  const [chainT, setChainT] = useState(0);
  // 今日對照層開關：網址帶 ?today= 或打開今日項目時自動打開
  const [todayOn, setTodayOn] = useState(() => params.has('today') || (params.get('chain') ?? '').startsWith('today-'));
  const [mobileTab, setMobileTab] = useState<'list' | 'map' | 'match'>('list');
  const panel = stack[stack.length - 1];
  // 各區塊大小可拖曳調整（右欄寬、時間軸高、時間軸收合），記在這台瀏覽器；「⟲ 版面」恢復預設
  const { layout, set: setLayout, reset: resetLayout } = useLayout();
  const mainRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const tlRef = useRef<HTMLDivElement>(null);
  const tlOpen = layout.rTlOpen ?? true;
  const customized = layout.rPanel != null || layout.rTl != null;

  const byId = useMemo(() => new Map(index.cards.map((c) => [c.id, c])), [index]);
  const search = useMemo(() => createSearch(index.cards), [index]);
  const passFilter = useCallback((c: Card) =>
    (!filters.types.length || filters.types.includes(c.type)) &&
    (!filters.fields.length || [c.place.primary_field, ...c.place.secondary_fields].some((f) => filters.fields.includes(f))) &&
    (!filters.civs.length || c.civPaths.some((v) => filters.civs.some((f) => v === f || v.startsWith(f + '/')))), [filters]);
  const visible = useMemo(() => index.cards.filter(passFilter), [index, passFilter]);
  const result = useMemo(() => search(query), [search, query]);
  const hits = useMemo(() => result.hits.filter((h) => passFilter(h.card)), [result, passFilter]);

  const open = useCallback((p: Panel) => {
    setStack((s) => (s[s.length - 1].kind === p.kind && JSON.stringify(s[s.length - 1]) === JSON.stringify(p) ? s : [...s, p]));
    if (p.kind === 'match') setMobileTab('match');
    else if (isMobile && p.kind !== 'place') setMobileTab('list');
  }, [isMobile]);
  const openCard = useCallback((id: string) => {
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
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const home = () => setStack([{ kind: 'list' }]);

  const selectedCard = panel.kind === 'card' ? byId.get(panel.id) ?? null : null;
  const highlight = useMemo(() => {
    if (selectedCard) return { keys: selectedCard.place.locations.map((l) => l.key), routes: selectedCard.routes };
    if (panel.kind === 'place') return { keys: [panel.key], routes: [] };
    if (panel.kind === 'route') return { keys: [], routes: [panel.id] };
    return { keys: [], routes: [] };
  }, [selectedCard, panel]);

  const onQuery = (q: string) => { setQuery(q); if (panel.kind !== 'list') home(); if (isMobile) setMobileTab('list'); };

  const side = (() => {
    switch (panel.kind) {
      case 'card': return selectedCard && <CardDetail card={selectedCard} index={index} byId={byId} onOpen={openCard}
        onTag={(t) => open({ kind: 'match', tags: [t] })} onPlace={(key) => open({ kind: 'place', key })} onRoute={(id) => open({ kind: 'route', id })} onChain={openChain} onToday={openToday} />;
      case 'place': return <PlacePanel placeKey={panel.key} cards={index.cards} onOpen={openCard} />;
      case 'route': return <RoutePanel route={index.routes.find((r) => r.id === panel.id)!} cards={index.cards} onOpen={openCard} />;
      case 'chain': return activeChain && <ChainPanel chain={activeChain} card={byId.get(activeChain.card)} t={chainT} setT={setChainT} onOpen={openCard} byId={byId} />;
      case 'today': return activeToday && <TodayPanel point={activeToday} index={index} byId={byId} onOpen={openCard} onTag={(t) => open({ kind: 'match', tags: [t] })} onChain={openChain} />;
      case 'econ': return <EconPanel econ={index.econ} seriesId={panel.series} point={panel.point} onPick={openEcon} />;
      case 'match': return <StructureMatch index={index} initialTags={panel.tags} onOpen={openCard} onToday={openToday} onPlace={(key) => open({ kind: 'place', key })} />;
      default: return <ResultList query={query} result={result} hits={hits} cards={visible} year={year} onOpen={openCard} />;
    }
  })();

  const map = <MapView index={index} cards={visible} year={year} highlight={highlight}
    onPlace={(key) => { open({ kind: 'place', key }); if (isMobile) setMobileTab('list'); }}
    onRoute={(id) => { open({ kind: 'route', id }); if (isMobile) setMobileTab('list'); }} compact={isMobile}
    chain={activeChain ? { chain: activeChain, t: chainT } : null}
    todayOn={todayOn} setTodayOn={setTodayOn} onToday={(id) => { openToday(id); if (isMobile) setMobileTab('list'); }} todaySel={activeToday?.id ?? null} />;

  return (
    <div className={`app ${isMobile ? 'mobile' : 'desktop'}`}>
      <header className="top">
        <button className="brand" onClick={() => { home(); setQuery(''); }} title="回到首頁">歷史長河</button>
        <input className="search" type="search" value={query} onChange={(e) => onQuery(e.target.value)}
          placeholder={isMobile ? '搜尋卡片（可打錯字、簡體、英文）' : '搜尋：名稱、別名、古今地名、場域、文明、年份、結構標籤（可打錯字、簡體、英文）'} aria-label="搜尋" />
        {!isMobile && <button className={`btn ${panel.kind === 'match' ? 'on' : ''}`} onClick={() => open({ kind: 'match' })}>結構對照</button>}
        {!isMobile && customized && <button className="btn layout-reset" onClick={() => resetLayout(['rPanel', 'rTl'])} title="把地圖、卡片欄、時間軸的大小恢復預設">⟲ 版面</button>}
        <button className="btn learn-btn" onClick={onLearn} title="給國高中生的自主學習模式">學習模式</button>
        <a className="btn credits" href={`${import.meta.env.BASE_URL}credits.html`} target="_blank" rel="noopener" title="資料來源與授權">出處</a>
      </header>
      <FilterBar index={index} filters={filters} setFilters={setFilters} />
      {isMobile ? (
        <>
          <nav className="tabs">
            {(['list', 'map', 'match'] as const).map((t) => (
              <button key={t} className={mobileTab === t ? 'on' : ''} onClick={() => { setMobileTab(t); if (t === 'match' && panel.kind !== 'match') open({ kind: 'match' }); if (t === 'list' && panel.kind === 'match') back(); }}>
                {{ list: '清單', map: '地圖', match: '結構對照' }[t]}
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
        <main ref={mainRef} className={`d-main ${layout.rTl ? 'tl-sized' : ''} ${tlOpen ? '' : 'tl-closed'}`}
          style={{ gridTemplateColumns: `minmax(0, 1fr) 6px ${colSize(layout.rPanel, 'minmax(360px, 34%)')}`, gridTemplateRows: `minmax(0, 1fr) 6px ${tlOpen ? rowSize(layout.rTl, 'auto') : 'auto'}` }}>
          <div className="map-wrap">{map}</div>
          <Splitter dir="col" grow="neg" label="調整卡片欄寬度" min={280} max={() => (mainRef.current?.clientWidth ?? 1200) * 0.65}
            measure={() => panelRef.current?.getBoundingClientRect().width ?? 400} onChange={(px) => setLayout({ rPanel: px })} onReset={() => resetLayout(['rPanel'])} />
          <section ref={panelRef} className="panel">
            {stack.length > 1 && <div className="panel-nav"><button className="back" onClick={back}>← 返回</button><button className="back" onClick={home}>清單</button></div>}
            {side}
          </section>
          <Splitter dir="row" grow="neg" label="調整時間軸高度" min={60} max={() => (mainRef.current?.clientHeight ?? 800) * 0.55}
            measure={() => tlRef.current?.getBoundingClientRect().height ?? 200} onChange={(px) => setLayout({ rTl: px })} onReset={() => resetLayout(['rTl'])} />
          <div ref={tlRef} className="timeline-wrap">
            <button className="tl-toggle" onClick={() => setLayout({ rTlOpen: !tlOpen })} aria-expanded={tlOpen}>{tlOpen ? '▾ 收起時間軸' : '▸ 展開時間軸'}</button>
            {tlOpen && <Timeline cards={visible} allCards={index.cards} year={year} setYear={setYear}
              selectedId={selectedCard?.id ?? null} onOpen={openCard}
              econ={index.econ} onEcon={openEcon} econSel={panel.kind === 'econ' ? { series: panel.series, point: panel.point } : null} />}
          </div>
        </main>
      )}
    </div>
  );
}

function YearSlider({ year, setYear }: { year: number; setYear: (y: number) => void }) {
  return (
    <label className="year-slider">
      <span>年代 {year < 0 ? `前${-year}` : year}</span>
      <input type="range" min={MIN_YEAR} max={MAX_YEAR} step={1} value={year} onChange={(e) => setYear(Number(e.target.value) || 1)} />
    </label>
  );
}
