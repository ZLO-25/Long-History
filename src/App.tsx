import { useEffect, useMemo, useState, useCallback } from 'react';
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
    fetch('/index.json').then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(setIndex).catch(() => setError('讀不到 public/index.json。請先執行 npm run build:index（npm run dev 會自動執行）。'));
  }, []);
  if (error) return <div className="fatal">{error}</div>;
  if (!index) return <div className="fatal">載入中…</div>;
  return <Main index={index} />;
}

function Main({ index }: { index: Index }) {
  const isMobile = useIsMobile();
  // 網址參數：?year=100 指定年份、?card=war-peloponnesian 直接開卡、?chain=chain-silk 直接播物資鏈、?q=羅馬 預填搜尋
  const params = useMemo(() => new URLSearchParams(location.search), []);
  const [year, setYear] = useState(() => {
    const y = Number(params.get('year'));
    if (Number.isFinite(y) && params.has('year')) return y;
    const ch = index.chains.find((c) => c.id === params.get('chain'));
    return ch ? ch.start : -490;
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

  const byId = useMemo(() => new Map(index.cards.map((c) => [c.id, c])), [index]);
  const search = useMemo(() => createSearch(index.cards), [index]);
  const passFilter = useCallback((c: Card) =>
    (!filters.types.length || filters.types.includes(c.type)) &&
    (!filters.fields.length || [c.place.primary_field, ...c.place.secondary_fields].some((f) => filters.fields.includes(f))) &&
    (!filters.civs.length || c.civilization.some((v) => filters.civs.includes(v))), [filters]);
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
          placeholder="搜尋：名稱、別名、古今地名、場域、文明、年份、結構標籤（可打錯字、簡體、英文）" aria-label="搜尋" />
        {!isMobile && <button className={`btn ${panel.kind === 'match' ? 'on' : ''}`} onClick={() => open({ kind: 'match' })}>結構對照</button>}
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
        <main className="d-main">
          <div className="map-wrap">{map}</div>
          <section className="panel">
            {stack.length > 1 && <div className="panel-nav"><button className="back" onClick={back}>← 返回</button><button className="back" onClick={home}>清單</button></div>}
            {side}
          </section>
          <div className="timeline-wrap">
            <Timeline cards={visible} allCards={index.cards} year={year} setYear={setYear}
              selectedId={selectedCard?.id ?? null} onOpen={openCard}
              econ={index.econ} onEcon={openEcon} econSel={panel.kind === 'econ' ? { series: panel.series, point: panel.point } : null} />
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
      <input type="range" min={-800} max={500} step={1} value={year} onChange={(e) => setYear(Number(e.target.value) || 1)} />
    </label>
  );
}
