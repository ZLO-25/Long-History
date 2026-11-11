// 故事閱讀頁：每條故事線一篇 5–15 分鐘可以一口氣讀完的文章（docs/stories.md）。
// 全螢幕單欄、大字、寬行距；上方有進度條、剩餘時間、字級；每一節標出對應的站，可以打開卡片；出處是小數字，文末列全部來源。
// 研究模式與學習模式共用；全文打開才下載（public/data/stories/<id>.json）。
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Card, Index, StoryDoc, Storyline } from '../types';
import { fmtRange, TYPE_COLOR, TYPE_ICON } from '../lib/format';
import './story-reader.css';

const READ_KEY = 'history-river-stories-read';
const SIZE_KEY = 'history-river-story-size';
const CITE_KEY = 'history-river-story-cite';
const posKey = (id: string) => `story-pos-${id}`;

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

const SIZES = ['s', 'm', 'l'] as const;

export function StoryReader({ story, index, onClose, onOpen, canOpen, researchHref, onStory }: ReaderProps) {
  const [doc, setDoc] = useState<StoryDoc | null>(null);
  const [failed, setFailed] = useState(false);
  const [size, setSize] = useState(() => { const raw = lsGet(SIZE_KEY), v = Number(raw); return raw !== null && raw !== '' && v >= 0 && v <= 2 && Number.isInteger(v) ? v : 1; });
  const [cite, setCite] = useState(() => lsGet(CITE_KEY) !== '0');
  const [progress, setProgress] = useState(0);
  const [sec, setSec] = useState(0);
  const [resumed, setResumed] = useState(false);
  const [toc, setToc] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const byId = useMemo(() => new Map(index.cards.map((c) => [c.id, c])), [index]);
  const stopNo = useMemo(() => new Map(story.stops.map((x, i) => [x.id, i + 1])), [story]);

  useEffect(() => { let on = true; setDoc(null); setFailed(false); loadStory(story.id).then((d) => on && setDoc(d)).catch(() => on && setFailed(true)); return () => { on = false; }; }, [story.id]);

  // 讓外層寫網址時知道閱讀頁開著（子元件的 effect 先跑，外層才寫網址）
  useEffect(() => { activeRead = story.id; return () => { if (activeRead === story.id) activeRead = null; }; }, [story.id]);
  // 開著閱讀頁時：鎖住背景捲動、Esc 關閉、焦點留在閱讀頁裡
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); return; }
      if (e.key !== 'Tab' || !scroller.current) return;
      const f = [...scroller.current.querySelectorAll<HTMLElement>('button, a[href], summary, [tabindex="0"]')].filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey, true);
    return () => { document.removeEventListener('keydown', onKey, true); prev?.focus?.(); };
  }, [onClose]);

  // 回到上次讀到的地方（同一個分頁內；例如中途打開卡片再回來）
  useEffect(() => {
    if (!doc || !scroller.current) return;
    const top = Number(ssGet(posKey(story.id))?.split('|')[0]);
    if (top > 300) { scroller.current.scrollTop = top; setResumed(true); }
  }, [doc, story.id]);

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? Math.min(1, el.scrollTop / max) : 1;
    setProgress(p);
    const heads = [...el.querySelectorAll<HTMLElement>('.sr-sec')];
    let cur = 0;
    heads.forEach((h, i) => { if (h.getBoundingClientRect().top < window.innerHeight * 0.4) cur = i; });
    setSec(cur);
    ssSet(posKey(story.id), `${Math.round(el.scrollTop)}|${p.toFixed(3)}`);
    // 「記住這幾件事」進到畫面就算讀完（後面還有很長的來源清單，不能只看捲到底）
    const end = el.querySelector<HTMLElement>('.sr-end');
    if (p > 0.97 || (end && end.getBoundingClientRect().top < window.innerHeight * 0.75)) markRead(story.id);
  }, [story.id]);

  useEffect(() => {
    const el = scroller.current;
    if (!el || !doc) return;
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    el.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    on();
    return () => { cancelAnimationFrame(raf); el.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [doc, measure, size]);

  const jump = (i: number) => { setToc(false); scroller.current?.querySelectorAll<HTMLElement>('.sr-sec')[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const restart = () => { setResumed(false); scroller.current?.scrollTo({ top: 0 }); };
  const bump = (d: number) => setSize((v) => { const n = Math.max(0, Math.min(2, v + d)); lsSet(SIZE_KEY, String(n)); return n; });
  const toggleCite = () => setCite((v) => { lsSet(CITE_KEY, v ? '0' : '1'); return !v; });

  const left = doc ? Math.max(0, Math.ceil(doc.minutes * (1 - progress))) : 0;
  const all = index.storylines ?? [];
  const withStory = all.filter((x) => x.read);
  const next = withStory.length > 1 ? withStory[(withStory.findIndex((x) => x.id === story.id) + 1) % withStory.length] : undefined;
  const first = byId.get(story.stops[0].id), last = byId.get(story.stops[story.stops.length - 1].id);

  const stopChip = (id: string) => {
    const c = byId.get(id);
    if (!c) return null;
    const label = <><b className="sr-stop-n">{stopNo.get(id)}</b><span aria-hidden>{TYPE_ICON[c.type]}</span> {c.name}<small>{fmtRange(c.time.start, c.time.end)}</small></>;
    if (canOpen && !canOpen(c)) return researchHref ? <a key={id} className="sr-stop off" href={researchHref(id)} title="這張卡還不在學習模式，到研究模式看">{label}<small>↗</small></a> : <span key={id} className="sr-stop off">{label}</span>;
    return <button key={id} className="sr-stop" style={{ borderLeftColor: TYPE_COLOR[c.type] }} onClick={() => onOpen(id)} title="打開這張卡看完整內容與來源（之後可以回來接著讀）">{label}</button>;
  };

  return createPortal(
    <div className={`sr-overlay sr-size-${SIZES[size]} ${cite ? '' : 'sr-nocite'}`} role="dialog" aria-modal="true" aria-label={`故事：${story.title}`} ref={scroller}>
      <header className="sr-bar">
        <button ref={closeBtn} className="sr-close" onClick={onClose} aria-label="關閉故事，回到故事線">✕<span>關閉</span></button>
        <div className="sr-bar-mid" aria-live="off">
          <span className="sr-bar-title">{story.title}</span>
          {doc && <span className="sr-bar-meta">{progress > 0.97 ? '讀完了' : `第 ${sec + 1}／${doc.sections.length} 節・還剩約 ${left} 分鐘`}</span>}
        </div>
        <div className="sr-tools">
          {doc && <button className={`sr-tool ${toc ? 'on' : ''}`} onClick={() => setToc((v) => !v)} aria-expanded={toc} title="目錄">☰<span>目錄</span></button>}
          <button className={`sr-tool ${cite ? 'on' : ''}`} onClick={toggleCite} aria-pressed={cite} title={cite ? '隱藏出處的小數字' : '顯示出處的小數字'}>¹<span>出處</span></button>
          <button className="sr-tool" onClick={() => bump(-1)} disabled={size === 0} aria-label="字小一點" title="字小一點">A−</button>
          <button className="sr-tool" onClick={() => bump(1)} disabled={size === 2} aria-label="字大一點" title="字大一點">A＋</button>
        </div>
        <div className="sr-progress" role="progressbar" aria-label="閱讀進度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}><i style={{ transform: `scaleX(${progress})` }} /></div>
        {toc && doc && (
          <nav className="sr-toc" aria-label="目錄">
            <ol>{doc.sections.map((s, i) => <li key={i}><button className={i === sec ? 'here' : ''} onClick={() => jump(i)}>{s.title}</button></li>)}</ol>
          </nav>
        )}
      </header>

      <article className="sr-page">
        <p className="sr-kicker">故事線</p>
        <h1>{story.title}</h1>
        <p className="sr-question">{story.question}</p>
        <p className="sr-meta">
          {doc ? <>約 {doc.minutes} 分鐘・{doc.chars.toLocaleString()} 字・</> : null}{story.stops.length} 站{first && last && <>・{fmtRange(first.time.start, last.time.end)}</>}
        </p>
        {resumed && <p className="sr-resumed" role="status">已回到你上次讀到的地方。<button className="link" onClick={restart}>從頭讀</button></p>}
        {failed && <p className="sr-fail" role="alert">故事載入失敗，請檢查網路後再試一次。<button className="link" onClick={() => { setFailed(false); loadStory(story.id).then(setDoc).catch(() => setFailed(true)); }}>重試</button></p>}
        {!doc && !failed && <p className="muted" role="status">載入故事…</p>}

        {doc?.sections.map((s, i) => (
          <section key={i} className="sr-sec" aria-labelledby={`sr-h-${i}`}>
            <h2 id={`sr-h-${i}`}><span className="sr-sec-n" aria-hidden>{i + 1}</span>{s.title}</h2>
            {s.cards.length > 0 && <div className="sr-stops" aria-label="這一節講的站">{s.cards.map(stopChip)}</div>}
            {s.blocks.map((b, j) => b.kind === 'quote'
              ? <blockquote key={j}><Inline text={b.text} doc={doc} /></blockquote>
              : <p key={j}><Inline text={b.text} doc={doc} /></p>)}
          </section>
        ))}

        {doc && (
          <footer className="sr-end">
            <section className="sr-box remember" aria-labelledby="sr-remember">
              <h2 id="sr-remember">記住這幾件事</h2>
              <ol>{doc.remember.map((x, i) => <li key={i}>{x}</li>)}</ol>
            </section>
            <section className="sr-box think" aria-labelledby="sr-think">
              <h2 id="sr-think">想一想</h2>
              <ul>{doc.think.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </section>
            <p className="sr-note">故事只走了其中一條路：每一站通常還有別的原因和別的後果。想看每兩站之間的因果說明和來源，回到故事線一站一站看。</p>
            <div className="sr-actions">
              <button className="sr-act primary" onClick={onClose}>一站一站看因果 →</button>
              {next && onStory && next.id !== story.id && <button className="sr-act" onClick={() => { openReading(next.id); onStory(next.id); }}>下一個故事：{next.title}<small>約 {next.read!.minutes} 分鐘</small></button>}
            </div>
            <details className="sr-sources">
              <summary>這篇故事的出處（{doc.sources.length} 筆，都來自各站卡片上的來源）</summary>
              <ol>{doc.sources.map((x, i) => <li key={i}><a href={x.url} target="_blank" rel="noreferrer">{x.title}</a><small>（卡片「{x.cardName}」）</small></li>)}</ol>
            </details>
          </footer>
        )}
      </article>
    </div>,
    document.body,
  );
}
