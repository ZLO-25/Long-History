// 故事閱讀頁：每條故事線一篇 5–25 分鐘可以一口氣讀完的文章（docs/stories.md）。
// 預設「下拉」：一頁往下滑，寬螢幕右邊固定列出每一節的大標（目前讀到的那節會亮起）；「Aa 顯示」可以改成「翻頁」（像書一樣一頁一頁翻）。
// 上方有進度條、剩餘時間、目錄、顯示設定（下拉／翻頁、字級、出處）；每節結尾有「記住」一句話，文末有「考考自己」。
// 研究模式與學習模式共用；全文打開才下載（public/data/stories/<id>.json）。
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Card, Index, StoryDoc, Storyline } from '../types';
import { fmtRange, TYPE_COLOR, TYPE_ICON } from '../lib/format';
import './story-reader.css';

const READ_KEY = 'history-river-stories-read';
const SIZE_KEY = 'history-river-story-size';
const CITE_KEY = 'history-river-story-cite';
const MODE_KEY = 'history-river-story-mode-v2';
const HINT_KEY = 'history-river-story-hint';
// 存「讀到第幾個區塊｜進度 0–1」；翻頁與捲動共用，換模式、換字級、轉螢幕都回得到同一段
const posKey = (id: string) => `story-at-${id}`;

const lsGet = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* 無痕模式 */ } };
const ssGet = (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } };
const ssSet = (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* 無痕模式 */ } };

/** 讀完的故事 id */
export function readStories(): Set<string> {
  try { const v = JSON.parse(lsGet(READ_KEY) ?? '[]'); return new Set(Array.isArray(v) ? v : []); } catch { return new Set(); }
}
const markRead = (id: string) => { const s = readStories(); if (!s.has(id)) { s.add(id); lsSet(READ_KEY, JSON.stringify([...s])); } };
/** 這次工作階段讀到哪裡（0–1）；沒讀過是 0 */
export const storyProgress = (id: string) => { const v = Number(ssGet(posKey(id))?.split('|')[1]); return Number.isFinite(v) ? v : 0; };

/** 網址是不是正開著這篇故事的閱讀頁（?story=…&read=1） */
let activeRead: string | null = null;
export const keepRead = (id: string) => { const q = new URLSearchParams(location.search); return activeRead === id || (q.get('story') === id && q.get('read') === '1'); };
/** 「下一個故事」：換到另一條故事線時直接進閱讀頁 */
let pendingRead: string | null = null;
export const openReading = (id: string) => { pendingRead = id; };
export const wantsRead = (id: string) => { const v = keepRead(id) || pendingRead === id; if (pendingRead === id) pendingRead = null; return v; };
export const setReadParam = (on: boolean) => {
  const q = new URLSearchParams(location.search);
  if (on) q.set('read', '1'); else q.delete('read');
  history.replaceState(null, '', `${location.pathname}?${q}`);
};

const cache = new Map<string, Promise<StoryDoc>>();
const loadStory = (id: string) => {
  if (!cache.has(id)) {
    const p = fetch(`${import.meta.env.BASE_URL}data/stories/${id}.json`).then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json() as Promise<StoryDoc>; });
    p.catch(() => cache.delete(id));
    cache.set(id, p);
  }
  return cache.get(id)!;
};

/** 入口旁的小字：📖 約 N 分鐘（讀完打勾） */
export function ReadBadge({ s }: { s: Storyline }) {
  if (!s.read) return null;
  const done = readStories().has(s.id);
  return <span className={`sr-badge ${done ? 'done' : ''}`}>{done ? '✓ 讀過' : '📖 故事'}・約 {s.read.minutes} 分鐘</span>;
}

/** 內文：**粗體** 是關鍵詞；[^n] 是第 n 筆來源 */
function Inline({ text, doc }: { text: string; doc: StoryDoc }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\^\d+\])/).filter(Boolean);
  return <>{parts.map((p, i) => {
    if (p.startsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
    const m = p.match(/^\[\^(\d+)\]$/);
    if (m) {
      const src = doc.sources[Number(m[1]) - 1];
      if (!src) return null;
      return <sup key={i} className="sr-cite"><a href={src.url} target="_blank" rel="noreferrer" title={`來源 ${m[1]}：${src.title}（卡片「${src.cardName}」）`} aria-label={`來源 ${m[1]}`}>{m[1]}</a></sup>;
    }
    return <span key={i}>{p}</span>;
  })}</>;
}

interface ReaderProps {
  story: Storyline; index: Index;
  onClose: () => void;
  /** 打開某一站的卡片（會離開閱讀頁；回來時接著讀） */
  onOpen: (id: string) => void;
  canOpen?: (c: Card) => boolean;
  researchHref?: (id: string) => string;
  onStory?: (id: string) => void;
}

const SIZES = ['s', 'm', 'l', 'xl'] as const;
const SIZE_NAME = ['小', '中', '大', '特大'];
const year = (y: number) => (y < 0 ? `前 ${-y}` : `${y}`);

export function StoryReader({ story, index, onClose, onOpen, canOpen, researchHref, onStory }: ReaderProps) {
  const [doc, setDoc] = useState<StoryDoc | null>(null);
  const [failed, setFailed] = useState(false);
  const [size, setSize] = useState(() => { const raw = lsGet(SIZE_KEY), v = Number(raw); return raw !== null && raw !== '' && v >= 0 && v <= 3 && Number.isInteger(v) ? v : 1; });
  const [cite, setCite] = useState(() => lsGet(CITE_KEY) !== '0');
  const [paged, setPaged] = useState(() => lsGet(MODE_KEY) === 'page');
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [sec, setSec] = useState(0);
  const [resumed, setResumed] = useState(false);
  const [menu, setMenu] = useState<'' | 'toc' | 'view'>('');
  const [hint, setHint] = useState(() => lsGet(HINT_KEY) !== '1');
  const [shown, setShown] = useState<Set<number>>(() => new Set());
  const [srcOpen, setSrcOpen] = useState(false);
  // 翻頁：目前第幾頁、共幾頁、一頁的位移（欄寬＋欄距）
  const [pg, setPg] = useState({ page: 0, pages: 1, step: 0 });
  const pgRef = useRef(pg);
  const overlay = useRef<HTMLDivElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const pageEl = useRef<HTMLElement>(null);
  /** 目前畫面上第一個區塊（[data-b] 的順序）；重新排版後回到它 */
  const anchor = useRef(0);
  const restored = useRef(false);
  const byId = useMemo(() => new Map(index.cards.map((c) => [c.id, c])), [index]);
  const stopNo = useMemo(() => new Map(story.stops.map((x, i) => [x.id, i + 1])), [story]);

  useEffect(() => { let on = true; setDoc(null); setFailed(false); restored.current = false; anchor.current = 0; setShown(new Set()); setSrcOpen(false); setResumed(false); loadStory(story.id).then((d) => on && setDoc(d)).catch(() => on && setFailed(true)); return () => { on = false; }; }, [story.id]);

  // 讓外層寫網址時知道閱讀頁開著（子元件的 effect 先跑，外層才寫網址）
  useEffect(() => { activeRead = story.id; return () => { if (activeRead === story.id) activeRead = null; }; }, [story.id]);

  const blocks = () => [...(pageEl.current?.querySelectorAll<HTMLElement>('[data-b]') ?? [])];
  const save = (p: number) => ssSet(posKey(story.id), `${anchor.current}|${p.toFixed(3)}`);

  // ---------- 翻頁 ----------
  /** 某個元素在第幾頁（用它和整篇文章左緣的距離算；位移動畫中也算得準） */
  const pageOf = (el: Element, step: number) => {
    const base = pageEl.current!.getBoundingClientRect().left;
    return Math.max(0, Math.floor((el.getBoundingClientRect().left - base + 2) / step));
  };
  const settle = useCallback((page: number, pages: number, step: number, keepAnchor = false) => {
    const el = pageEl.current;
    if (!el) return;
    const p = Math.max(0, Math.min(pages - 1, page));
    pgRef.current = { page: p, pages, step };
    setPg(pgRef.current);
    const bs = blocks();
    if (!keepAnchor) { let a = 0; bs.forEach((b, i) => { if (pageOf(b, step) <= p) a = i; }); anchor.current = a; }
    let cur = 0;
    el.querySelectorAll<HTMLElement>('.sr-sec').forEach((h, i) => { if (pageOf(h, step) <= p) cur = i; });
    setSec(cur);
    const end = el.querySelector('.sr-end');
    const endPage = end ? pageOf(end, step) : pages - 1;
    const isDone = p >= endPage;
    const prog = endPage > 0 ? Math.min(1, p / endPage) : 1;
    setProgress(prog); setDone(isDone);
    save(prog);
    if (isDone) markRead(story.id);
  }, [story.id]);

  /** 重新量頁數，並回到原本讀到的那一段 */
  const relayout = useCallback(() => {
    const el = pageEl.current;
    if (!el || !paged) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = el.getBoundingClientRect().width + gap;
    if (step <= 0) return;
    const pages = Math.max(1, Math.round((el.scrollWidth + gap) / step));
    const b = blocks()[anchor.current];
    settle(b ? pageOf(b, step) : 0, pages, step, true);
  }, [paged, settle]);

  const go = useCallback((page: number) => {
    setMenu('');
    if (hint) { setHint(false); lsSet(HINT_KEY, '1'); }
    const cur = pgRef.current;
    if (cur.step > 0) settle(page, cur.pages, cur.step);
  }, [settle, hint]);
  const turn = useCallback((d: number) => go(pgRef.current.page + d), [go]);

  // ---------- 捲動 ----------
  const measure = useCallback(() => {
    const v = view.current, el = pageEl.current;
    if (!v || !el || paged) return;
    const max = v.scrollHeight - v.clientHeight;
    const top = v.getBoundingClientRect().top;
    const end = el.querySelector<HTMLElement>('.sr-end');
    // 進度以「記住這幾件事」為終點（後面還有很長的來源清單）
    const endAt = end ? Math.max(1, end.getBoundingClientRect().top - top + v.scrollTop - v.clientHeight * 0.6) : max;
    const p = max > 0 ? Math.min(1, v.scrollTop / Math.min(max, endAt)) : 1;
    let cur = 0;
    el.querySelectorAll<HTMLElement>('.sr-sec').forEach((h, i) => { if (h.getBoundingClientRect().top < top + v.clientHeight * 0.4) cur = i; });
    let a = 0;
    blocks().forEach((b, i) => { if (b.getBoundingClientRect().top <= top + 24) a = i; });
    anchor.current = a;
    setSec(cur); setProgress(p); setDone(p >= 0.999);
    save(p);
    if (p >= 0.999) markRead(story.id);
  }, [paged, story.id]);

  // 排版：內容、字級、出處、模式、展開答案或來源改變時重排；第一次排好後回到上次讀到的地方
  useLayoutEffect(() => {
    if (!doc || !pageEl.current || !view.current) return;
    if (!restored.current) {
      restored.current = true;
      const a = Number(ssGet(posKey(story.id))?.split('|')[0]);
      if (Number.isInteger(a) && a > 3) { anchor.current = a; setResumed(true); }
    }
    if (paged) { view.current.scrollTop = 0; relayout(); }
    else { const b = blocks()[anchor.current]; if (b && anchor.current > 0) b.scrollIntoView({ block: 'start' }); measure(); }
  }, [doc, size, cite, paged, shown, srcOpen, relayout, measure, story.id]);

  useEffect(() => {
    const v = view.current;
    if (!v || !doc) return;
    let raf = 0;
    if (paged) {
      const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(relayout); };
      const ro = new ResizeObserver(on); ro.observe(v);
      // 焦點跑到別頁的連結時，瀏覽器會自己橫向捲動：拉回來，改成翻到那一頁
      const fix = () => { if (v.scrollLeft || v.scrollTop) { v.scrollLeft = 0; v.scrollTop = 0; } };
      const onFocus = (e: FocusEvent) => { fix(); const t = e.target as Element, cur = pgRef.current; if (cur.step > 0 && pageEl.current?.contains(t)) { const p = pageOf(t, cur.step); if (p !== cur.page) settle(p, cur.pages, cur.step); } };
      v.addEventListener('scroll', fix); v.addEventListener('focusin', onFocus);
      document.fonts?.ready.then(on).catch(() => {});
      return () => { cancelAnimationFrame(raf); ro.disconnect(); v.removeEventListener('scroll', fix); v.removeEventListener('focusin', onFocus); };
    }
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    v.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { cancelAnimationFrame(raf); v.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [doc, paged, relayout, measure, settle]);

  // 鍵盤：Esc 關閉；翻頁模式用 ← → 空白鍵 PageUp/PageDown；焦點留在閱讀頁裡
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    view.current?.focus({ preventScroll: true });
    return () => { prev?.focus?.(); };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); if (menu) setMenu(''); else onClose(); return; }
      const root = overlay.current;
      if (!root) return;
      if (e.key === 'Tab') {
        const f = [...root.querySelectorAll<HTMLElement>('button, a[href], summary, [tabindex="0"]')].filter((x) => x.offsetParent !== null && !(x as HTMLButtonElement).disabled);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === view.current)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        return;
      }
      if (!paged || e.altKey || e.ctrlKey || e.metaKey) return;
      const onControl = !!(e.target as Element)?.closest?.('button, a, summary, input, select, textarea');
      const k = e.key;
      if (k === 'ArrowRight' || k === 'PageDown' || (k === ' ' && !e.shiftKey && !onControl)) { e.preventDefault(); turn(1); }
      else if (k === 'ArrowLeft' || k === 'PageUp' || (k === ' ' && e.shiftKey && !onControl)) { e.preventDefault(); turn(-1); }
      else if (k === 'Home') { e.preventDefault(); go(0); }
      else if (k === 'End') { e.preventDefault(); go(1e6); }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [onClose, paged, turn, go, menu]);

  // 滑鼠滾輪、觸控：翻頁模式下滾一下翻一頁；手機左右滑，或點畫面左右兩側
  useEffect(() => {
    const v = view.current;
    if (!v || !paged || !doc) return;
    let acc = 0, lock = 0, sx = 0, sy = 0, st = 0;
    const wheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      const now = Date.now();
      if (now < lock) return;
      const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      acc += d;
      if (Math.abs(acc) > 40) { turn(acc > 0 ? 1 : -1); acc = 0; lock = now + 380; }
    };
    const ts = (e: TouchEvent) => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; st = Date.now(); };
    const te = (e: TouchEvent) => {
      const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) { turn(dx < 0 ? 1 : -1); return; }
      if (Math.abs(dx) > 10 || Math.abs(dy) > 10 || Date.now() - st > 350) return;
      if ((e.target as Element).closest('a, button, summary, .sr-recall-a')) return;
      if (window.getSelection()?.toString()) return;
      const r = v.getBoundingClientRect(), x = (t.clientX - r.left) / r.width;
      if (x > 0.62) turn(1); else if (x < 0.3) turn(-1);
    };
    v.addEventListener('wheel', wheel, { passive: false });
    v.addEventListener('touchstart', ts, { passive: true });
    v.addEventListener('touchend', te, { passive: true });
    return () => { v.removeEventListener('wheel', wheel); v.removeEventListener('touchstart', ts); v.removeEventListener('touchend', te); };
  }, [paged, doc, turn]);

  const jumpTo = (el: Element | null | undefined) => {
    setMenu('');
    if (!el) return;
    if (paged) { if (pg.step > 0) settle(pageOf(el, pg.step), pg.pages, pg.step); } else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const jump = (i: number) => jumpTo(pageEl.current?.querySelectorAll('.sr-sec')[i]);
  const restart = () => { setResumed(false); if (paged) go(0); else view.current?.scrollTo({ top: 0 }); };
  const bump = (d: number) => setSize((v) => { const n = Math.max(0, Math.min(SIZES.length - 1, v + d)); lsSet(SIZE_KEY, String(n)); return n; });
  const toggleCite = () => setCite((v) => { lsSet(CITE_KEY, v ? '0' : '1'); return !v; });
  const setMode = (p: boolean) => { lsSet(MODE_KEY, p ? 'page' : 'scroll'); setPaged(p); };
  const reveal = (i: number) => setShown((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; });

  const left = doc ? Math.max(1, Math.ceil(doc.minutes * (1 - progress))) : 0;
  const all = index.storylines ?? [];
  const withStory = all.filter((x) => x.read);
  const next = withStory.length > 1 ? withStory[(withStory.findIndex((x) => x.id === story.id) + 1) % withStory.length] : undefined;
  const first = byId.get(story.stops[0].id), last = byId.get(story.stops[story.stops.length - 1].id);
  const secOf = (id: string) => doc?.sections.findIndex((s) => s.cards.includes(id)) ?? -1;

  const stopChip = (id: string) => {
    const c = byId.get(id);
    if (!c) return null;
    const label = <><b className="sr-stop-n">{stopNo.get(id)}</b><span aria-hidden>{TYPE_ICON[c.type]}</span> {c.name}<small>{fmtRange(c.time.start, c.time.end)}</small></>;
    if (canOpen && !canOpen(c)) return researchHref ? <a key={id} className="sr-stop off" href={researchHref(id)} title="這張卡還不在學習模式，到研究模式看">{label}<small>↗</small></a> : <span key={id} className="sr-stop off">{label}</span>;
    return <button key={id} className="sr-stop" style={{ borderLeftColor: TYPE_COLOR[c.type] }} onClick={() => onOpen(id)} title="打開這張卡看完整內容與來源（之後可以回來接著讀）">{label}</button>;
  };

  const lastPage = pg.page >= pg.pages - 1;
  const coarse = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
  const article = (
    <article className="sr-page" ref={pageEl} style={paged ? { transform: `translate3d(${-pg.page * pg.step}px,0,0)` } : undefined}>
      <div className="sr-head" data-b="">
        <p className="sr-kicker">故事線</p>
        <h1>{story.title}</h1>
        <p className="sr-question">{story.question}</p>
        <p className="sr-meta">
          {doc ? <>約 {doc.minutes} 分鐘・{doc.chars.toLocaleString()} 字・</> : null}{story.stops.length} 站{first && last && <>・{fmtRange(first.time.start, last.time.end)}</>}
        </p>
        {resumed && <p className="sr-resumed" role="status">已回到你上次讀到的地方。<button className="link" onClick={restart}>從頭讀</button></p>}
        {failed && <p className="sr-fail" role="alert">故事載入失敗，請檢查網路後再試一次。<button className="link" onClick={() => { setFailed(false); loadStory(story.id).then(setDoc).catch(() => setFailed(true)); }}>重試</button></p>}
        {!doc && !failed && <p className="muted" role="status">載入故事…</p>}
        {doc && (
          <nav className="sr-route" aria-label="這篇故事會走過的站">
            <b>這篇故事會走過</b>
            <ol>{story.stops.map((x, i) => { const c = byId.get(x.id); if (!c) return null; const at = secOf(x.id); return <li key={x.id}><button onClick={() => at >= 0 && jump(at)} title={`跳到「${doc.sections[at]?.title ?? ''}」`}><i>{i + 1}</i>{c.name}<small>{year(c.time.start)}</small></button></li>; })}</ol>
          </nav>
        )}
      </div>

      {doc?.sections.map((s, i) => (
        <section key={i} className="sr-sec" aria-labelledby={`sr-h-${i}`}>
          <h2 id={`sr-h-${i}`} data-b=""><span className="sr-sec-n" aria-hidden>{i + 1}</span>{s.title}</h2>
          {s.cards.length > 0 && <div className="sr-stops" aria-label="這一節講的站">{s.cards.map(stopChip)}</div>}
          {s.blocks.map((b, j) => b.kind === 'quote'
            ? <blockquote key={j} data-b=""><Inline text={b.text} doc={doc} /></blockquote>
            : b.kind === 'key'
              ? <p key={j} className="sr-key" data-b=""><b>記住</b><span><Inline text={b.text} doc={doc} /></span></p>
              : <p key={j} data-b=""><Inline text={b.text} doc={doc} /></p>)}
        </section>
      ))}

      {doc && (
        <footer className="sr-end">
          {!!doc.recall?.length && (
            <section className="sr-box recall" aria-labelledby="sr-recall" data-b="">
              <h2 id="sr-recall">考考自己</h2>
              <p className="sr-box-how">先不要往回翻，在心裡回答，再點開看答案。自己想過一次，比再讀一遍記得久。</p>
              <ol>{doc.recall.map((x, i) => (
                <li key={i}>
                  <span className="sr-recall-q">{x.q}</span>
                  {shown.has(i)
                    ? <span className="sr-recall-a" role="status">{x.a}</span>
                    : <button className="sr-recall-btn" onClick={() => reveal(i)}>想好了，看答案</button>}
                </li>
              ))}</ol>
            </section>
          )}
          <section className="sr-box remember" aria-labelledby="sr-remember" data-b="">
            <h2 id="sr-remember">記住這幾件事</h2>
            <ol>{doc.remember.map((x, i) => <li key={i}>{x}</li>)}</ol>
          </section>
          <section className="sr-box think" aria-labelledby="sr-think" data-b="">
            <h2 id="sr-think">想一想</h2>
            <ul>{doc.think.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </section>
          <div className="sr-tail" data-b="">
            <p className="sr-note">故事只走了其中一條路：每一站通常還有別的原因和別的後果。想看每兩站之間的因果說明和來源，回到故事線一站一站看。</p>
            <div className="sr-actions">
              <button className="sr-act primary" onClick={onClose}>一站一站看因果 →</button>
              {next && onStory && next.id !== story.id && <button className="sr-act" onClick={() => { openReading(next.id); onStory(next.id); }}>下一個故事：{next.title}<small>約 {next.read!.minutes} 分鐘</small></button>}
            </div>
            <button className="sr-sources-btn" aria-expanded={srcOpen} onClick={() => setSrcOpen((v) => !v)}>{srcOpen ? '▾' : '▸'} 這篇故事的出處（{doc.sources.length} 筆，都來自各站卡片上的來源）</button>
          </div>
          {srcOpen && <ol className="sr-sources">{doc.sources.map((x, i) => <li key={i}><a href={x.url} target="_blank" rel="noreferrer">{x.title}</a><small>（卡片「{x.cardName}」）</small></li>)}</ol>}
        </footer>
      )}
    </article>
  );
  return createPortal(
    <div className={`sr-overlay sr-size-${SIZES[size]} ${cite ? '' : 'sr-nocite'} ${paged ? 'sr-paged' : 'sr-scroll'}`} role="dialog" aria-modal="true" aria-label={`故事：${story.title}`} ref={overlay}>
      <header className="sr-bar">
        <button className="sr-close" onClick={onClose} aria-label="關閉故事，回到故事線">✕<span>關閉</span></button>
        <div className="sr-bar-mid" aria-live="off">
          <span className="sr-bar-title">{story.title}</span>
          {doc && <span className="sr-bar-meta">{done ? '讀完了' : `第 ${sec + 1}／${doc.sections.length} 節・還剩約 ${left} 分鐘`}</span>}
        </div>
        <div className="sr-tools">
          {doc && <button className={`sr-tool ${menu === 'toc' ? 'on' : ''}`} onClick={() => setMenu((v) => (v === 'toc' ? '' : 'toc'))} aria-expanded={menu === 'toc'} aria-controls="sr-toc" title="目錄">☰<span>目錄</span></button>}
          <button className={`sr-tool ${menu === 'view' ? 'on' : ''}`} onClick={() => setMenu((v) => (v === 'view' ? '' : 'view'))} aria-expanded={menu === 'view'} aria-controls="sr-view-menu" title="顯示設定：下拉或翻頁、字級、出處">Aa<span>顯示</span></button>
        </div>
        <div className="sr-progress" role="progressbar" aria-label="閱讀進度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}><i style={{ transform: `scaleX(${progress})` }} /></div>
        {menu === 'toc' && doc && (
          <nav className="sr-pop sr-toc" id="sr-toc" aria-label="目錄">
            <ol>{doc.sections.map((s, i) => <li key={i}><button className={i === sec ? 'here' : ''} onClick={() => jump(i)}>{s.title}</button></li>)}</ol>
            <button className="sr-toc-end" onClick={() => jumpTo(pageEl.current?.querySelector('.sr-end'))}>考考自己・記住這幾件事</button>
          </nav>
        )}
        {menu === 'view' && (
          <div className="sr-pop sr-view-menu" id="sr-view-menu" role="group" aria-label="顯示設定">
            <div className="sr-opt"><span>閱讀方式</span>
              <div className="sr-seg" role="group" aria-label="閱讀方式">
                <button className={!paged ? 'on' : ''} aria-pressed={!paged} onClick={() => setMode(false)}>下拉</button>
                <button className={paged ? 'on' : ''} aria-pressed={paged} onClick={() => setMode(true)}>翻頁</button>
              </div>
            </div>
            <div className="sr-opt"><span>字級<small>{SIZE_NAME[size]}</small></span>
              <div className="sr-seg">
                <button onClick={() => bump(-1)} disabled={size === 0} aria-label="字小一點">A−</button>
                <button onClick={() => bump(1)} disabled={size === SIZES.length - 1} aria-label="字大一點">A＋</button>
              </div>
            </div>
            <div className="sr-opt"><span>出處小數字</span>
              <div className="sr-seg">
                <button className={cite ? 'on' : ''} aria-pressed={cite} aria-label="顯示出處的小數字" onClick={() => { if (!cite) toggleCite(); }}>顯示</button>
                <button className={!cite ? 'on' : ''} aria-pressed={!cite} aria-label="隱藏出處的小數字" onClick={() => { if (cite) toggleCite(); }}>隱藏</button>
              </div>
            </div>
            <p className="sr-opt-tip">{paged ? '翻頁：按 → 或空白鍵、滾滑鼠、點「下一頁」；手機可以左右滑或點畫面右側。' : '下拉：像一般網頁一樣往下滑；寬螢幕右邊有大標，點一下就跳到那一節。'}</p>
          </div>
        )}
      </header>

      <div className="sr-view" ref={view} tabIndex={-1} onClick={() => menu && setMenu('')}>
        {paged ? article : (
          <div className="sr-wrap">
            {article}
            {doc && (
              <aside className="sr-side" aria-label="這篇故事的大標">
                <p className="sr-side-left">{done ? '讀完了' : `還剩約 ${left} 分鐘`}</p>
                <h2 className="sr-side-h">這篇故事</h2>
                <ol>
                  {doc.sections.map((x, i) => (
                    <li key={i}><button className={`${i === sec && !done ? 'here' : ''} ${i < sec || done ? 'past' : ''}`} aria-current={i === sec && !done ? 'true' : undefined} onClick={() => jump(i)}><span className="sr-side-n" aria-hidden>{i + 1}</span><span>{x.title}</span></button></li>
                  ))}
                  <li><button className={`end ${done ? 'here' : ''}`} aria-current={done ? 'true' : undefined} onClick={() => jumpTo(pageEl.current?.querySelector('.sr-end'))}><span className="sr-side-n" aria-hidden>考</span><span>考考自己・記住這幾件事</span></button></li>
                </ol>
              </aside>
            )}
          </div>
        )}
      </div>

      {paged && doc && (
        <footer className="sr-pager">
          <button className="sr-turn" onClick={() => turn(-1)} disabled={pg.page === 0} aria-label="上一頁">‹<span>上一頁</span></button>
          <span className="sr-pageno" aria-live="polite">第 {pg.page + 1}／{pg.pages} 頁{hint && pg.page === 0 && <small>{coarse ? '左右滑，或點畫面右側翻頁' : '按 → 或空白鍵翻頁'}</small>}</span>
          <button className="sr-turn next" onClick={() => turn(1)} disabled={lastPage} aria-label="下一頁"><span>下一頁</span>›</button>
        </footer>
      )}
    </div>,
    document.body,
  );
}
