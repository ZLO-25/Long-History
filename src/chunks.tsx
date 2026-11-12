// 程式碼分割：首屏只載 React、外殼、學習首頁；其他畫面各自一個 chunk，用到才載。
// 沒有背景預載：只有 ① 畫面用到時載入 ② 網址是深連結時 preloadForUrl ③ 滑鼠／手指移向入口時 intent 預載。
// chunk：learn（單元播放器、學習卡、史頁面，幾乎每次都用，合成一個；學習時間軸在首頁就看得到，另外一個小 chunk）、misc（我的地圖、學習紀錄、模擬）、
// 以及真正大或少用的：地圖（Leaflet）、研究模式 Main、故事線、專題、人群、時間軸。
//
// 部署後舊頁面可能要一個已被刪掉的舊 chunk：載入失敗（vite:preloadError 或下面 lazyView 的 catch）就重新整理一次
// （30 秒內已經整理過就不再整理，改顯示錯誤框，避免無限重整）。
import { Component, createElement, lazy, Suspense, type ComponentType, type ReactNode } from 'react';
import { registerKeepRead } from './lib/storyLite';
import { Skel } from './ui';

type Mod<P> = { default: ComponentType<P> };
/** preload：背景預載，失敗不丟錯；load：同一個載入，失敗會 reject（呼叫端要知道成敗時用） */
export type LazyView<P> = ((props: P & { fallback?: ReactNode }) => JSX.Element) & { preload: () => Promise<unknown>; load: () => Promise<unknown> };

/** 時間軸骨架的高度（px）：和真的時間軸一樣高，載入完成時版面不跳（量測值） */
export const TL_H: { learn: number; research: string } = { learn: 203, research: '40vh' };

/** 載入 chunk 失敗（通常是剛部署、舊 chunk 已刪）：30 秒內沒整理過就整理一次，回傳 true；否則回傳 false，由呼叫端顯示錯誤框 */
function reloadOnce(): boolean {
  try {
    const t = Number(sessionStorage.getItem('hr-reload') ?? 0);
    if (Date.now() - t < 30000) return false;
    sessionStorage.setItem('hr-reload', String(Date.now()));
  } catch { return false; }
  location.reload();
  return true;
}
window.addEventListener('vite:preloadError', () => { reloadOnce(); });

class ChunkBoundary extends Component<{ children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  render() {
    if (!this.state.err) return this.props.children;
    // 瀏覽器（Chrome）會記住失敗的 import，原地重試沒有用；整理頁面才會重新抓
    return (
      <div className="chunk-err" role="alert">
        <p>這個畫面沒載入成功，可能是網路不穩，或網站剛更新。</p>
        <button className="btn" onClick={() => location.reload()}>重新整理頁面</button>
      </div>
    );
  }
}

function lazyView<P extends object>(load: () => Promise<Mod<P>>, defaultFallback: ReactNode = <Skel />): LazyView<P> {
  let p: Promise<Mod<P>> | null = null;
  // 同一個 chunk 只抓一次；失敗：整理頁面一次（reloadOnce），不能整理就把錯誤丟給錯誤框
  const get = () => (p ??= load().catch((e) => { p = null; if (reloadOnce()) return new Promise<Mod<P>>(() => {}); throw e; }));
  // lazy 元件全站共用一個：載入過一次之後再掛載不會再閃一下骨架
  let L: ReturnType<typeof lazy<ComponentType<P>>> | null = null;
  function View(props: P & { fallback?: ReactNode }) {
    const { fallback, ...rest } = props;
    const C = (L ??= lazy(get));
    return (
      <ChunkBoundary>
        <Suspense fallback={fallback ?? defaultFallback}>{createElement(C as ComponentType<any>, rest)}</Suspense>
      </ChunkBoundary>
    );
  }
  return Object.assign(View, { preload: () => get().catch(() => {}), load: () => get() });
}

// ---- 各個 chunk 的載入函式（同一個模組只 import 一次，多個元件共用）----
const mapMod = () => import('./components/MapView');
const storyMod = () => import('./components/Story').then(async (s) => { registerKeepRead((await import('./components/StoryReader')).keepRead); return s; });
const diveMod = () => import('./components/Dive');
const tlMod = () => import('./components/Timeline');
const learnMod = () => import('./learn/learnChunk');
const ltlMod = () => import('./learn/LearnTimeline');
const miscMod = () => import('./learn/miscChunk');
const peopleMod = () => import('./components/PeoplePanel');
const researchMod = () => import('./research/Main');

// 類型沿用原元件的 props（用 ComponentProps 取），所以呼叫端的型別檢查和直接 import 一樣嚴
type P<T extends ComponentType<any>> = import('react').ComponentProps<T>;
export const MapView = lazyView<P<typeof import('./components/MapView').MapView>>(() => mapMod().then((m) => ({ default: m.MapView })), <div className="map-skel" />);
export const Timeline = lazyView<P<typeof import('./components/Timeline').Timeline>>(() => tlMod().then((m) => ({ default: m.Timeline })), <Skel h={TL_H.research} />);
export const LearnTimeline = lazyView<P<typeof import('./learn/LearnTimeline').LearnTimeline>>(() => ltlMod().then((m) => ({ default: m.LearnTimeline })), <Skel h={TL_H.learn} />);
export const UnitPlayer = lazyView<P<typeof import('./learn/learnChunk').UnitPlayer>>(() => learnMod().then((m) => ({ default: m.UnitPlayer })));
export const LearnCard = lazyView<P<typeof import('./learn/learnChunk').LearnCard>>(() => learnMod().then((m) => ({ default: m.LearnCard })));
export const HistoryPage = lazyView<P<typeof import('./learn/learnChunk').HistoryPage>>(() => learnMod().then((m) => ({ default: m.HistoryPage })));
export const MyMap = lazyView<P<typeof import('./learn/miscChunk').MyMap>>(() => miscMod().then((m) => ({ default: m.MyMap })));
export const LearnRecord = lazyView<P<typeof import('./learn/miscChunk').LearnRecord>>(() => miscMod().then((m) => ({ default: m.LearnRecord })));
export const SimView = lazyView<P<typeof import('./learn/miscChunk').SimView>>(() => miscMod().then((m) => ({ default: m.SimView })));
export const PeoplePanel = lazyView<P<typeof import('./components/PeoplePanel').PeoplePanel>>(() => peopleMod().then((m) => ({ default: m.PeoplePanel })));
export const StorylineView = lazyView<P<typeof import('./components/Story').StorylineView>>(() => storyMod().then((m) => ({ default: m.StorylineView })));
export const StorylineIndex = lazyView<P<typeof import('./components/Story').StorylineIndex>>(() => storyMod().then((m) => ({ default: m.StorylineIndex })));
export const DiveView = lazyView<P<typeof import('./components/Dive').DiveView>>(() => diveMod().then((m) => ({ default: m.DiveView })));
export const DiveIndex = lazyView<P<typeof import('./components/Dive').DiveIndex>>(() => diveMod().then((m) => ({ default: m.DiveIndex })));
export const ResearchMain = lazyView<P<typeof import('./research/Main').Main>>(() => researchMod().then((m) => ({ default: m.Main })), null);

// ---- 預載 ----
export const preload = {
  unit: () => learnMod().catch(() => {}),
  card: () => learnMod().catch(() => {}),
  map: () => mapMod().catch(() => {}),
  timeline: () => tlMod().catch(() => {}),
  research: () => researchMod().catch(() => {}),
  story: () => storyMod().catch(() => {}),
  dive: () => diveMod().catch(() => {}),
  history: () => learnMod().catch(() => {}),
  people: () => peopleMod().catch(() => {}),
  misc: () => miscMod().catch(() => {}),
};

/** 網址是深連結時，這個畫面需要的 chunk（和資料同時開始載，不等首頁畫完） */
export function preloadForUrl(search = location.search) {
  const q = new URLSearchParams(search);
  const n = [...q.keys()].filter((k) => k !== 'perf').length;
  const research = q.get('mode') === 'research' || (q.get('mode') !== 'learn' && n > 0) || (!n && localStorageMode() === 'research');
  const jobs: (() => unknown)[] = [];
  if (research) jobs.push(preload.research);
  else if (q.get('unit')) jobs.push(preload.unit);
  else if (q.get('card')) jobs.push(preload.card);
  else if (q.get('history')) jobs.push(preload.history);
  if (q.get('story') || q.get('view') === 'stories') jobs.push(preload.story);
  if (q.get('dive') || q.get('view') === 'dives') jobs.push(preload.dive);
  if (q.get('peoples')) jobs.push(preload.people);
  if (q.get('sim') || q.get('view') === 'mymap' || q.get('view') === 'record') jobs.push(preload.misc);
  // 研究模式一定要用時間軸（D3，很小）；地圖（Leaflet，較大）等地圖元件掛上時才載
  if (research) jobs.push(preload.timeline);
  jobs.forEach((f) => f());
}
function localStorageMode() { try { return window.localStorage.getItem('history-river-mode'); } catch { return null; } }
