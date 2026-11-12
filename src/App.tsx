import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { setNameTable } from './lib/bilingual';
import type { Index } from './types';
import { FilterBar } from './components/FilterBar';
import { useIsMobile } from './lib/useIsMobile';
import { LearnApp } from './learn/LearnApp';
import { DockLayout, useDock } from './components/Dock';
import { useLayout, colSize } from './lib/layout';
import { SkipLink } from './components/SkipLink';
import { initStub, adoptCore, failCore, coreReady } from './lib/detail';
import { ResearchMain, preloadForUrl, warmUp, TL_H } from './chunks';
import { emptyPre, type Pre } from './research/pre';
import { Skel, CoreWait } from './ui';

// 首屏：home.json（小）和 index.json（卡片核心資料）同時抓。home.json 一到就畫學習首頁（骨架 index，coreReady:false），
// index.json 到了再無縫換成完整 index（App 不重新掛載，畫面狀態不丟）。src/lib/detail.ts 說明交接細節。
declare global { interface Window { __hrShell?: string; __hrCore?: Promise<any> } }
let booted = false;
const getJson = (f: string) => fetch(`${import.meta.env.BASE_URL}${f}`).then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); });
let homeP: Promise<any> | null = null, coreP: Promise<any> | null = null;
/** 開始抓 home.json 和 index.json（main.tsx 一執行就呼叫，不等 React 掛載）。
 *  index.html 只預載 home.json；index.json（約 560 KB）若和程式、css 同時下載，會把首屏要用的那幾十 KB 拖慢好幾倍，
 *  所以由 index.html 的小 script 在「程式下載完」的那一刻開始抓（window.__hrCore），沒跑成就在這裡抓。 */
export function startFetch() {
  homeP ??= getJson('home.json');
  // index.json 抓不到先等一下重試一次（手機網路切換很常見）
  coreP ??= (window.__hrCore ?? getJson('index.json')).catch(() => new Promise((r) => setTimeout(r, 2500)).then(() => getJson('index.json')));
}
function boot(set: Dispatch<SetStateAction<Index | null>>, fatal: (msg: string) => void) {
  if (booted) return; // StrictMode 的 effect 會跑兩次；只抓一次
  booted = true;
  startFetch();
  const base = import.meta.env.BASE_URL;
  const msg = '讀不到 public/index.json。請先執行 npm run build:index（npm run dev 會自動執行）。';
  let coreFailed = false, homeFailed = false, coreDone = false;
  homeP!.then((h) => {
    if (coreDone) return; // 完整資料已經先到（不太可能），不用骨架
    const s = initStub(h, base, set);
    set(coreFailed ? { ...s, coreFailed: true } : s);
  }).catch(() => { homeFailed = true; if (coreFailed) fatal(msg); });
  coreP!.then((ix: Index) => {
    coreDone = true;
    setNameTable(ix.names);
    set(adoptCore(ix, base, set));
    // 完整資料到了才開始在背景預載其他畫面的 chunk，不和 index.json 搶頻寬
    warmUp();
  }).catch(() => { coreFailed = true; if (homeFailed) fatal(msg); else failCore(set); });
}

export default function App() {
  const [index, setIndex] = useState<Index | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { boot(setIndex, setError); }, []);
  if (error) return <div className="fatal">{error}</div>;
  // home.json 還沒到：畫和 index.html 裡一模一樣的靜態骨架（main.tsx 把它的 HTML 存下來），換成真畫面時不閃
  if (!index) return <div className="sk-keep" dangerouslySetInnerHTML={{ __html: window.__hrShell ?? '' }} />;
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
  return mode === 'learn' ? <LearnApp index={index} onResearch={() => go('research')} /> : <ResearchApp index={index} onLearn={() => go('learn')} />;
}

// 研究模式：完整資料（卡片）到了才掛載 Main（它的程式也是延後載入的）。這之前先畫外殼：標題列、搜尋框、篩選列、各區塊的框；
// 外殼上打的搜尋字、點的篩選與入口（故事線、專題…）記在 pre，Main 掛載時接手。
function ResearchApp({ index, onLearn }: { index: Index; onLearn: () => void }) {
  const pre = useRef<Pre>(emptyPre()).current;
  // 程式（chunk）和資料（index.json）兩樣都到了才換成真正的研究模式；之前一直是同一個外殼元件，打字、焦點不會被打斷
  const [code, setCode] = useState<'wait' | 'ok' | 'failed'>('wait');
  useEffect(() => { let alive = true; ResearchMain.load().then(() => alive && setCode('ok'), () => alive && setCode('failed')); return () => { alive = false; }; }, []);
  if (!coreReady(index) || code === 'wait') return <ResearchShell index={index} pre={pre} onLearn={onLearn} />;
  // failed：照樣掛上去，讓它自己的「重試」錯誤框出面
  return <ResearchMain index={index} onLearn={onLearn} pre={pre} fallback={null} />;
}

type RPanel = 'map' | 'side' | 'tl';
const R_PANELS: readonly RPanel[] = ['map', 'side', 'tl'];

/** 研究模式的外殼：版面與 research/Main.tsx 相同（同一個 DockLayout、同一份使用者調過的區塊大小），所以 Main 掛上來時不跳 */
function ResearchShell({ index, pre, onLearn }: { index: Index; pre: Pre; onLearn: () => void }) {
  const isMobile = useIsMobile();
  const L = useLayout();
  const dock = useDock('r', R_PANELS, L);
  const tlOpen = L.layout.rTlOpen ?? true;
  const tlInC = dock.order[2] === 'tl' && !dock.float.tl && !dock.wins.tl;
  const [query, setQuery] = useState(pre.query);
  const [filters, setFilters] = useState(pre.filters);
  const [want, setWant] = useState(pre.panel?.kind ?? null);
  const pick = (kind: NonNullable<Pre['panel']>['kind']) => { pre.panel = { kind }; setWant(kind); };
  const side = index.coreFailed ? <CoreWait index={index} /> : <div className="core-wait"><p className="muted loading-detail">載入中…</p><Skel h={160} label="載入卡片資料" /></div>;
  const on = (k: string[]) => (want && k.includes(want) ? 'on' : '');
  return (
    <div className={`app ${isMobile ? 'mobile' : 'desktop'}`}>
      <SkipLink sel=".panel" />
      <header className="top">
        <button className="brand" onClick={() => { setQuery(''); pre.query = ''; pre.panel = null; setWant(null); }} title="回到首頁">歷史長河</button>
        <input className="search" type="search" value={query} onChange={(e) => { setQuery(e.target.value); pre.query = e.target.value; }} onFocus={() => { pre.focus = true; }} onBlur={() => { pre.focus = false; }}
          placeholder={isMobile ? '搜尋卡片（可打錯字、簡體、英文）' : '搜尋：名稱、別名、古今地名、場域、文明、年份、結構標籤（可打錯字、簡體、英文）'} aria-label="搜尋" />
        {!isMobile && index.storylines.length > 0 && <button className={`btn ${on(['stories'])}`} onClick={() => pick('stories')} title="沿著前因 → 後果，把不同時代的事件接成一條路">故事線</button>}
        {!isMobile && index.dives && index.dives.length > 0 && <button className={`btn ${on(['dives'])}`} onClick={() => pick('dives')} title="把一段時代放大來看：地圖、卡片、故事線">專題</button>}
        {!isMobile && <button className={`btn ${on(['topics'])}`} onClick={() => pick('topics')} title="依主題把卡片串成歷史路徑，例如 #交易所">主題標籤</button>}
        {!isMobile && <button className={`btn ${on(['match'])}`} onClick={() => pick('match')}>結構對照</button>}
        <button className="btn learn-btn" onClick={onLearn} title="給國高中生的自主學習模式">學習模式</button>
        <a className="btn credits" href={`${import.meta.env.BASE_URL}credits.html`} target="_blank" rel="noopener" title="資料來源與授權">出處</a>
      </header>
      <FilterBar index={index} filters={filters} setFilters={(f) => { setFilters(f); pre.filters = f; }} />
      {isMobile ? (
        <>
          <nav className="tabs">
            {(['list', 'map', 'topics', 'match'] as const).map((t) => (
              <button key={t} className={t === 'list' ? 'on' : ''} onClick={() => { if (t === 'topics') pick('stories'); else if (t === 'match') pick('match'); }}>
                {{ list: '清單', map: '地圖', topics: '故事／主題', match: '結構對照' }[t]}
              </button>
            ))}
          </nav>
          <main className="m-main"><section className="panel">{side}</section></main>
        </>
      ) : (
        <DockLayout dock={dock} mainClass={`d-main ${tlOpen ? '' : 'tl-closed'}`}
          panels={{
            map: { title: '地圖', cls: 'map-wrap', node: <div className="map-skel" /> },
            side: { title: '卡片清單', cls: 'panel', node: side },
            tl: { title: '時間軸', cls: 'timeline-wrap', extra: tlInC && <button className="tl-toggle" onClick={() => L.set({ rTlOpen: !tlOpen })} aria-expanded={tlOpen}>{tlOpen ? '▾ 收起' : '▸ 展開'}</button>,
              node: (tlOpen || !tlInC) && <Skel h={TL_H.research} label="時間軸載入中" /> },
          }}
          colA={() => 'minmax(0, 1fr)'} colB={(px) => colSize(px, 'minmax(360px, 34%)')} colSized="b" colMin={280} colMaxPct={65}
          rowCDefault={(id) => (id === 'tl' ? 'auto' : '38%')} cCollapsed={(id) => id === 'tl' && !tlOpen}
          popRoot={{ className: 'app desktop popout' }} />
      )}
    </div>
  );
}


