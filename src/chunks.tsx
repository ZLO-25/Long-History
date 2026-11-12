// 程式碼分割（首屏效能）：首屏只載 React、外殼、學習首頁；其他畫面（研究模式、地圖 Leaflet、時間軸 D3、單元、卡片、
// 故事線、專題、人群…）各自一個 chunk，點到才載，或在首屏之後的閒置時間依優先順序預載（warmUp）。
//
// 用法：<UnitPlayer {...props} />；元件自己帶 Suspense（fallback 預設是版面穩定的灰色骨架，也可以用 fallback 屬性換掉）
// 和錯誤框（chunk 抓失敗：先自動重試一次，還是失敗就顯示「重試」按鈕，不會整片空白）。
// UnitPlayer.preload() 可以提前載入（滑鼠移上去、網址是深連結時）。
import { Component, createElement, lazy, Suspense, useMemo, useState, type ComponentType, type ReactNode } from 'react';
import { registerKeepRead } from './lib/storyLite';
import { Skel } from './ui';

type Mod<P> = { default: ComponentType<P> };
/** preload：背景預載，失敗不丟錯；load：同一個載入，失敗會 reject（呼叫端要知道成敗時用） */
export type LazyView<P> = ((props: P & { fallback?: ReactNode }) => JSX.Element) & { preload: () => Promise<unknown>; load: () => Promise<unknown> };

/** 時間軸骨架的高度（px）：和真的時間軸一樣高，載入完成時版面不跳（量測值） */
export const TL_H: { learn: number; research: string } = { learn: 203, research: '40vh' };

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** 載入一個 chunk，失敗會補救：① 等半秒再試；② 瀏覽器（Chrome）會把「失敗的 import」記住、同一個網址不會再發請求，
 *  所以第二次還失敗時，從錯誤訊息取出網址、加 ?retry= 換一個網址重抓（chunk 的匯出名稱不變，呼叫端照用）；都不行才丟錯給錯誤框 */
async function robust<T>(load: () => Promise<T>): Promise<T> {
  try { return await load(); } catch {
    await sleep(500);
    try { return await load(); } catch (e2) {
      const u = /https?:\/\/[^\s'"]+?\.js/.exec(String((e2 as Error)?.message))?.[0];
      if (!u) throw e2;
      return (await import(/* @vite-ignore */ `${u}?retry=${Date.now()}`)) as T;
    }
  }
}

class ChunkBoundary extends Component<{ onRetry: () => void; children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  render() {
    if (!this.state.err) return this.props.children;
    return (
      <div className="chunk-err" role="alert">
        <p>這個畫面沒載入成功，可能是網路不穩。</p>
        <button className="btn" onClick={() => { this.setState({ err: false }); this.props.onRetry(); }}>重試</button>
        {' '}<button className="btn" onClick={() => location.reload()}>重新整理頁面</button>
      </div>
    );
  }
}

function lazyView<P extends object>(load: () => Promise<Mod<P>>, defaultFallback: ReactNode = <Skel />): LazyView<P> {
  let p: Promise<Mod<P>> | null = null;
  // 同一個 chunk 只抓一次；失敗先等半秒自動重試一次，再失敗就把錯誤丟給錯誤框（並清掉快取，下次按「重試」會重抓）
  const get = () => (p ??= load().catch((e) => { p = null; throw e; }));
  // lazy 元件全站共用一個：載入過一次之後再掛載不會再閃一下骨架。失敗後按「重試」才換一個新的
  let L: ReturnType<typeof lazy<ComponentType<P>>> | null = null;
  function View(props: P & { fallback?: ReactNode }) {
    const { fallback, ...rest } = props;
    const [n, setN] = useState(0);
    const C = useMemo(() => (L ??= lazy(get)), [n]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
      <ChunkBoundary key={n} onRetry={() => { L = null; p = null; setN((k) => k + 1); }}>
        <Suspense fallback={fallback ?? defaultFallback}>{createElement(C as ComponentType<any>, rest)}</Suspense>
      </ChunkBoundary>
    );
  }
  return Object.assign(View, { preload: () => get().catch(() => {}), load: () => get() });
}

// ---- 各個 chunk 的載入函式（同一個模組只 import 一次，多個元件共用）----
const mapMod = () => robust(() => import('./components/MapView'));
const storyMod = () => robust(() => import('./components/Story')).then(async (s) => { registerKeepRead((await robust(() => import('./components/StoryReader'))).keepRead); return s; });
const diveMod = () => robust(() => import('./components/Dive'));
const tlMod = () => robust(() => import('./components/Timeline'));
const ltlMod = () => robust(() => import('./learn/LearnTimeline'));
const playerMod = () => robust(() => import('./learn/UnitPlayer'));
const cardMod = () => robust(() => import('./learn/LearnCard'));
const histMod = () => robust(() => import('./learn/HistoryPage'));
const myMapMod = () => robust(() => import('./learn/MyMap'));
const recordMod = () => robust(() => import('./learn/LearnRecord'));
const simMod = () => robust(() => import('./learn/sims/SimView'));
const peopleMod = () => robust(() => import('./components/PeoplePanel'));
const researchMod = () => robust(() => import('./research/Main'));

// 類型沿用原元件的 props（用 ComponentProps 取），所以呼叫端的型別檢查和直接 import 一樣嚴
type P<T extends ComponentType<any>> = import('react').ComponentProps<T>;
export const MapView = lazyView<P<typeof import('./components/MapView').MapView>>(() => mapMod().then((m) => ({ default: m.MapView })), <div className="map-skel" />);
export const Timeline = lazyView<P<typeof import('./components/Timeline').Timeline>>(() => tlMod().then((m) => ({ default: m.Timeline })), <Skel h={TL_H.research} />);
export const LearnTimeline = lazyView<P<typeof import('./learn/LearnTimeline').LearnTimeline>>(() => ltlMod().then((m) => ({ default: m.LearnTimeline })), <Skel h={TL_H.learn} />);
export const UnitPlayer = lazyView<P<typeof import('./learn/UnitPlayer').UnitPlayer>>(() => playerMod().then((m) => ({ default: m.UnitPlayer })));
export const LearnCard = lazyView<P<typeof import('./learn/LearnCard').LearnCard>>(() => cardMod().then((m) => ({ default: m.LearnCard })));
export const HistoryPage = lazyView<P<typeof import('./learn/HistoryPage').HistoryPage>>(() => histMod().then((m) => ({ default: m.HistoryPage })));
export const MyMap = lazyView<P<typeof import('./learn/MyMap').MyMap>>(() => myMapMod().then((m) => ({ default: m.MyMap })));
export const LearnRecord = lazyView<P<typeof import('./learn/LearnRecord').LearnRecord>>(() => recordMod().then((m) => ({ default: m.LearnRecord })));
export const SimView = lazyView<P<typeof import('./learn/sims/SimView').SimView>>(() => simMod().then((m) => ({ default: m.SimView })));
export const PeoplePanel = lazyView<P<typeof import('./components/PeoplePanel').PeoplePanel>>(() => peopleMod().then((m) => ({ default: m.PeoplePanel })));
export const StorylineView = lazyView<P<typeof import('./components/Story').StorylineView>>(() => storyMod().then((m) => ({ default: m.StorylineView })));
export const StorylineIndex = lazyView<P<typeof import('./components/Story').StorylineIndex>>(() => storyMod().then((m) => ({ default: m.StorylineIndex })));
export const DiveView = lazyView<P<typeof import('./components/Dive').DiveView>>(() => diveMod().then((m) => ({ default: m.DiveView })));
export const DiveIndex = lazyView<P<typeof import('./components/Dive').DiveIndex>>(() => diveMod().then((m) => ({ default: m.DiveIndex })));
export const ResearchMain = lazyView<P<typeof import('./research/Main').Main>>(() => researchMod().then((m) => ({ default: m.Main })), null);

// ---- 預載 ----
export const preload = {
  unit: () => Promise.all([playerMod(), cardMod()]).catch(() => {}),
  card: () => cardMod().catch(() => {}),
  map: () => mapMod().catch(() => {}),
  timeline: () => Promise.all([ltlMod(), tlMod()]).catch(() => {}),
  research: () => researchMod().catch(() => {}),
  story: () => storyMod().catch(() => {}),
  dive: () => diveMod().catch(() => {}),
  history: () => histMod().catch(() => {}),
  people: () => peopleMod().catch(() => {}),
  misc: () => Promise.all([myMapMod(), recordMod(), simMod()]).catch(() => {}),
};

/** 網址是深連結時，這個畫面需要的 chunk（和資料同時開始載，不等首頁畫完） */
export function preloadForUrl(search = location.search) {
  const q = new URLSearchParams(search);
  const research = q.get('mode') === 'research' || (q.get('mode') !== 'learn' && [...q.keys()].length > 0) || (![...q.keys()].length && localStorageMode() === 'research');
  const jobs: (() => unknown)[] = [];
  if (research) jobs.push(preload.research);
  else if (q.get('unit')) jobs.push(preload.unit);
  else if (q.get('card')) jobs.push(preload.card);
  else if (q.get('history')) jobs.push(preload.history);
  if (q.get('story') || q.get('view') === 'stories') jobs.push(preload.story);
  if (q.get('dive') || q.get('view') === 'dives') jobs.push(preload.dive);
  if (q.get('peoples')) jobs.push(preload.people);
  if (q.get('sim') || q.get('view') === 'mymap' || q.get('view') === 'record') jobs.push(preload.misc);
  // 研究模式一定要用時間軸（D3，很小）；地圖（Leaflet，較大）等完整資料到了之後由 warmUp 接著載，免得和 index.json 搶頻寬
  if (research) jobs.push(preload.timeline);
  jobs.forEach((f) => f());
}
function localStorageMode() { try { return window.localStorage.getItem('history-river-mode'); } catch { return null; } }

let warmed = false;
/** 首屏畫完、完整資料到了之後，在背景依常用程度預載其他 chunk（單元播放器與卡片 → 地圖與時間軸 → 研究模式 → 故事線 → 專題…）。
 *  一次一個、每個之間等瀏覽器閒置，不和 index.json 搶頻寬（呼叫端：App 在 index.json 到了之後才叫） */
export function warmUp() {
  if (warmed) return;
  warmed = true;
  const order = [preload.unit, preload.map, preload.timeline, preload.history, preload.research, preload.story, preload.dive, preload.people, preload.misc];
  const idle = (f: () => void) => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(f, { timeout: 2500 }) : setTimeout(f, 300));
  const next = (i: number) => { if (i >= order.length) return; idle(() => { Promise.resolve(order[i]()).finally(() => next(i + 1)); }); };
  next(0);
}
