// 讀書專題（docs/dives.md 第七節）：把一本書（例如《人類大歷史》）的每一章變成一站。
// 每站四格：① 先想一想（可以先看證據卡）② 歷史證據（網站的卡）③ 書裡怎麼說（我們自己的話，標章）④ 另一種看法（標支持／補充／反對）。
// 書的論點只寫在這裡；卡片只當證據，卡片上的「哈拉瑞」欄只寫書裡直接談到的。
import { Fragment, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { scaleLog } from 'd3-scale';
import type { Card, Dive, DiveBook, DiveChapter } from '../types';
import { fmtYear, TYPE_COLOR, yr } from '../lib/format';
const TYPE_ZH: Record<string, string> = { war: '戰爭', commodity: '物資', event: '事件', building: '建築', tech: '技術', finance: '金融', social: '社會', person: '人物' };
import './dive-book.css';

// 深時間軸：用「距今幾年」取對數，越古越壓縮；250 萬年和最近 500 年都看得到
const NOW = 2030;
const bp = (y: number) => Math.max(5, NOW - y);
// 刻度直接寫給學生看的字；窄螢幕（手機）只留 min 以上重要度的刻度
const TICKS: { y: number; t: string; min: number }[] = [
  { y: -2498000, t: '250 萬年前', min: 0 }, { y: -998000, t: '100 萬年前', min: 2 }, { y: -298000, t: '30 萬年前', min: 1 },
  { y: -68000, t: '7 萬年前', min: -1 }, { y: -10000, t: '1.2 萬年前', min: 0 }, { y: -3000, t: '前 3000', min: 1 },
  { y: 1, t: '西元元年', min: 1 }, { y: 1500, t: '1500', min: 0 }, { y: 1900, t: '1900', min: 2 }, { y: 2000, t: '2000', min: 1 },
];
const PART_COLOR = ['#e8d9c4', '#dde8cf', '#d6e2ef', '#ecd8e2', '#e6e2d6'];
const NUM = '一二三四五六';
const partName = (i: number, no: number) => `第${NUM[i] ?? no}部`;
const textW = (s: string, cjk = 12, ascii = 7) => [...s].reduce((a, ch) => a + (/[\x00-\x7f]/.test(ch) ? ascii : cjk), 0);
/** 讓 SVG 的 <g> 也能用鍵盤按（Enter／空白鍵） */
const keyAct = (fn: () => void) => ({ role: 'button', tabIndex: 0, onKeyDown: (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } } });

export function DeepTimeline({ dive, book, cards, year, setYear, onOpen, currentId, hl }: { dive: Dive; book: DiveBook; cards: Card[]; year: number; setYear: (y: number) => void; onOpen: (id: string) => void; currentId?: string | null; hl?: { no: number; ids: string[] } | null }) {
  // 用實際寬度畫（不縮放 viewBox），手機上字才不會縮到看不見
  const wrap = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(600);
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.floor(e.contentRect.width) - 2)));
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);
  const PAD = 14, AX = 22;
  const level = W >= 640 ? 2 : W >= 440 ? 1 : 0;
  const x = useMemo(() => scaleLog().domain([bp(dive.range.start), bp(dive.range.end)]).range([PAD, W - PAD]).clamp(true), [dive, W]);
  const hlSet = new Set(hl?.ids ?? []);
  // 卡片分列：起點排序，貪婪法放進不重疊的列；每條至少 14px 寬，手指點得到
  const MINW = W < 440 ? 16 : 12;
  const rows: { c: Card; x0: number; x1: number; row: number }[] = [];
  const ends: number[] = [];
  for (const c of [...cards].sort((a, b) => a.time.start - b.time.start)) {
    const x0 = Math.min(x(bp(c.time.start)), W - PAD - MINW), x1 = Math.max(x(bp(c.time.end)), x0 + MINW);
    let row = ends.findIndex((e) => e <= x0 - 3);
    if (row === -1) { row = ends.length; ends.push(x1); } else ends[row] = x1;
    rows.push({ c, x0, x1, row });
  }
  const RH = W < 440 ? 20 : 16, top = AX + 22, H = top + Math.max(1, ends.length) * RH + 20;
  const cx = x(bp(year));
  // 刻度字不重疊：先放重要的（min 小），和已放的字重疊就不放
  const ticks = (() => {
    const cand = TICKS.filter((t) => t.y >= dive.range.start && t.y <= dive.range.end)
      .map((t) => { const px = x(bp(t.y)), w = textW(t.t); const anchor: 'start' | 'end' | 'middle' = px - w / 2 < 2 ? 'start' : px + w / 2 > W - 2 ? 'end' : 'middle'; const a = anchor === 'start' ? px : anchor === 'end' ? px - w : px - w / 2; return { t, px, anchor, a, b: a + w }; });
    const placed: typeof cand = [];
    for (const c of [...cand].sort((p, q) => p.t.min - q.t.min)) if (c.t.min <= level && placed.every((p) => c.b + 6 < p.a || c.a > p.b + 6)) placed.push(c);
    return placed;
  })();
  // 紅線旁一定寫出目前年代（放在底部，不和刻度搶位置）
  const nowT = yr(year), nowW = textW(nowT, 12, 7);
  const nowAnchor: 'start' | 'end' = cx + nowW + 6 > W ? 'end' : 'start';
  const [picked, setPicked] = useState<Card | null>(null);
  const partYear = (i: number) => (i === 0 && dive.focus_year != null ? dive.focus_year : book.parts[i].from);
  return (
    <div className="deep-tl" ref={wrap}>
      <svg width={W} height={H} role="img" aria-label={`深時間軸：${fmtYear(dive.range.start)}到今天，越古越壓縮`}>
        {book.parts.map((p, i) => {
          const a = x(bp(p.from)), b = x(bp(p.to));
          const full = `${partName(i, p.no)} ${p.name}`, short = NUM[i] ?? String(p.no);
          const w = b - a - 6;
          const t = textW(full, 13, 8) <= w ? full : textW(p.name, 13, 8) + 18 <= w ? `${short} ${p.name}` : short;
          const go = () => setYear(partYear(i));
          return (
            <g key={p.no} className="dt-part" onClick={go} {...keyAct(go)} aria-label={`${full}（${p.span}），跳到這段年代`}>
              <rect x={a} y={AX} width={Math.max(2, b - a)} height={H - AX - 16} fill={PART_COLOR[i % PART_COLOR.length]} />
              <text x={a + 4} y={AX + 14} className="dt-part-label"><title>{full}</title>{t}</text>
            </g>
          );
        })}
        <line x1={PAD} x2={W - PAD} y1={AX} y2={AX} className="dt-axis" />
        {ticks.map(({ t, px, anchor }) => (
          <g key={t.y} transform={`translate(${px},0)`}>
            <line y1={AX - 5} y2={AX} className="dt-axis" />
            <text y={AX - 8} textAnchor={anchor} className="dt-tick">{t.t}</text>
          </g>
        ))}
        {rows.map(({ c, x0, x1, row }) => {
          const open = () => { setPicked(c); onOpen(c.id); };
          return (
            <g key={c.id} className={`dt-card ${currentId === c.id ? 'here' : ''} ${hlSet.has(c.id) ? 'hl' : hl ? 'dim' : ''}`} onClick={open} {...keyAct(open)} aria-label={`${c.name}（${yr(c.time.start)}）`}>
              <title>{`${c.name}（${yr(c.time.start)}${c.time.end !== c.time.start ? `–${yr(c.time.end)}` : ''}）`}</title>
              <rect x={x0} y={top + row * RH} width={x1 - x0} height={RH - 4} rx={4} fill={TYPE_COLOR[c.type]} />
            </g>
          );
        })}
        <line x1={cx} x2={cx} y1={AX - 4} y2={H - 16} className="dt-now" />
        <text x={nowAnchor === 'start' ? cx + 4 : cx - 4} y={H - 4} textAnchor={nowAnchor} className="dt-now-label">紅線：{nowT}</text>
      </svg>
      <ul className="dt-legend small" aria-label="書的四部分">
        {book.parts.map((p, i) => (
          <li key={p.no}><button className="link" onClick={() => setYear(partYear(i))}><i style={{ background: PART_COLOR[i % PART_COLOR.length] }} />{partName(i, p.no)} {p.name}<small className="muted">（{p.span}）</small></button></li>
        ))}
      </ul>
      <ul className="dt-legend dt-types small" aria-label="色條顏色＝卡的種類">{[...new Set(cards.map((c) => c.type))].map((t) => <li key={t}><i style={{ background: TYPE_COLOR[t] }} />{TYPE_ZH[t] ?? t}</li>)}</ul>
      <p className="small dt-picked" aria-live="polite">{picked ? <>剛才點的：<b>{picked.name}</b>（{yr(picked.time.start)}）</> : hl ? <>深色的條＝第 {hl.no} 站的證據卡；點一條就打開那張卡。</> : '點一條色條就打開那張卡。'}</p>
      <details className="small dt-help"><summary>這條時間軸怎麼看</summary>
        <p className="muted">越往左越古老、刻度越壓縮（距今年數取對數）：左半邊是幾百萬到一萬年前，右半邊才是有文字以後的五千年。色塊＝書的四部分（第一部從 250 萬年前的早期人類講起，認知革命約在 7 萬年前）；每一條＝一張卡，顏色是卡的種類（見下面色票）；紅線＝目前年代。地圖上的紫紅色虛線是史前遷徙的示意路線（只標有遺址根據的點，線不是實際走法）。</p>
      </details>
    </div>
  );
}

/** 點上標：打開下面的來源清單並捲到那一筆（不改網址，網站用 ?query 記狀態） */
function goRef(e: React.MouseEvent, id: string) {
  e.preventDefault();
  const li = document.getElementById(id);
  const det = li?.closest('details');
  if (det) det.open = true;
  li?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  li?.classList.add('flash'); setTimeout(() => li?.classList.remove('flash'), 1500);
}
type SrcMap = Map<string, { title: string; tier?: string }>;
const Ref = ({ id, prefix, src }: { id: string; prefix: string; src: SrcMap }) => {
  const s = src.get(id);
  return <sup><a href={`#${prefix}-${id}`} className="bk-ref" title={s ? `來源 ${id.slice(1)}：${s.title}${s.tier ? `（${s.tier}）` : ''}` : undefined} onClick={(e) => goRef(e, `${prefix}-${id}`)}>[{id.slice(1)}]</a></sup>;
};
/** 把 [b3] 變成上標連結，連到下面的來源清單 */
function withRefs(text: string, prefix: string, src: SrcMap): ReactNode {
  const parts = text.split(/(\[b\d+\])/g);
  return parts.map((p, i) => {
    const m = p.match(/^\[(b\d+)\]$/);
    return m ? <Ref key={i} id={m[1]} prefix={prefix} src={src} /> : <Fragment key={i}>{p}</Fragment>;
  });
}
const STANCE_CLS: Record<string, string> = { 支持: 'pro', 補充: 'add', 反對: 'con' };
const REVEAL_KEY = 'history-river-book-revealed-v1';
const loadRevealed = (id: string): Set<number> => { try { return new Set(JSON.parse(localStorage.getItem(REVEAL_KEY) ?? '{}')[id] ?? []); } catch { return new Set(); } };
const saveRevealed = (id: string, s: Set<number>) => { try { const all = JSON.parse(localStorage.getItem(REVEAL_KEY) ?? '{}'); all[id] = [...s]; localStorage.setItem(REVEAL_KEY, JSON.stringify(all)); } catch { /* 私密視窗：不記也能用 */ } };

export function BookView({ dive, book, byId, cardBtn, open, setOpen, unitBtn }: { dive: Dive; book: DiveBook; byId: Map<string, Card>; cardBtn: (c: Card) => ReactNode; open: number | null; setOpen: (n: number | null) => void; unitBtn?: (id: string) => ReactNode }) {
  const [shown, setShownState] = useState<Set<number>>(() => loadRevealed(dive.id));
  const setShown = (s: Set<number>) => { setShownState(s); saveRevealed(dive.id, s); };
  const pre = `bk-${dive.id}`;
  const src: SrcMap = useMemo(() => new Map(book.sources.map((s) => [s.id, s])), [book]);
  const jump = (no: number) => { setOpen(no); requestAnimationFrame(() => document.getElementById(`${pre}-ch${no}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })); };
  const station = (c: DiveChapter) => {
    const ev = c.cards.map((id) => byId.get(id)).filter((x): x is Card => !!x);
    const revealed = shown.has(c.no) || !c.think;
    return (
      <details key={c.no} id={`${pre}-ch${c.no}`} className={`bk-ch ${c.core ? 'core' : ''}`} open={open === c.no} onToggle={(e) => { if ((e.target as HTMLDetailsElement).open) setOpen(c.no); else if (open === c.no) setOpen(null); }}>
        <summary><span className="bk-no">{c.no}</span><span className="bk-title">{c.title}</span>
          <small className="muted">第 {c.no} 章{c.zh ? `〈${c.zh}〉` : ''}{c.en && <span className="bk-en">{c.zh ? ' ' : '・'}{c.en}</span>}{c.minutes ? `・約 ${c.minutes} 分鐘` : ''}</small>{c.core && <span className="bk-core">課堂核心站</span>}</summary>
        <div className="bk-body">
          {c.think && (
            <div className="bk-cell bk-think">
              <h5>① 先想一想<small className="muted">（先別看書怎麼說，可以先翻下面的證據卡，自己想 1 分鐘）</small></h5>
              <p>{c.think}</p>
            </div>
          )}
          <div className="bk-cell">
            <h5>{c.think ? '②' : '①'} 歷史證據<small className="muted">（點開卡片，看事實和來源）</small></h5>
            {ev.length ? <ul className="bk-ev">{ev.map((x) => <li key={x.id}>{cardBtn(x)}{c.card_notes?.[x.id] && <span className="small bk-why">{c.card_notes[x.id]}</span>}</li>)}</ul>
              : <p className="muted small">這一章談的是想法或未來，網站沒有可以當證據的歷史卡；可以當討論題。</p>}
          </div>
          {!revealed && <button className="btn bk-reveal" onClick={() => setShown(new Set([...shown, c.no]))}>想好了，看書怎麼說和另一種看法</button>}
          {revealed && <>
            <div className="bk-cell bk-claim">
              <h5>{c.think ? '③' : '②'} 書裡怎麼說<small className="muted">（本站用自己的話摘要，不是原文）</small></h5>
              <p>{withRefs(c.claim, pre, src)}</p>
            </div>
            <div className="bk-cell bk-debate">
              <h5>{c.think ? '④' : '③'} 另一種看法<small className="muted">（標籤＝和書的說法是什麼關係）</small></h5>
              {c.debate.length ? <ul>{c.debate.map((d, i) => <li key={i}>{d.stance && <span className={`bk-stance ${STANCE_CLS[d.stance] ?? ''}`}>{d.stance}</span>}<b>{d.who}</b>：{withRefs(d.text, pre, src)}{!/\[b\d+\]/.test(d.text) && d.src.map((s) => <Ref key={s} id={s} prefix={pre} src={src} />)}</li>)}</ul>
                : <p className="muted small">這一章的不同看法還在整理中。</p>}
              <p className="small bk-judge">換你判斷：書的說法<b>站得住／部分站得住／站不住</b>？用一張證據卡說出理由。</p>
            </div>
          </>}
        </div>
      </details>
    );
  };
  return (
    <section className="dv-sec bk" id={`dv-book-${dive.id}`}>
      <h3>照書讀：{book.chapters.length} 站<small className="muted">每章一站：先想一想 → 看證據 → 書裡怎麼說 → 另一種看法</small></h3>
      {book.note && <p className="small bk-note">{book.note}</p>}
      <nav className="bk-jump" aria-label="跳到第幾站">
        {book.chapters.map((c) => <button key={c.no} className={`chip ${open === c.no ? 'on' : ''} ${c.core ? 'core' : ''}`} onClick={() => jump(c.no)} title={`${c.no}. ${c.title}${c.zh ? `（第 ${c.no} 章〈${c.zh}〉）` : ''}${c.core ? '（課堂核心站）' : ''}`}>{c.no}</button>)}
        {book.chapters.some((c) => c.core) && <small className="muted">粗框＝課堂核心站</small>}
      </nav>
      {book.parts.map((p, i) => {
        const chs = book.chapters.filter((c) => c.part === p.no);
        return (
          <div key={p.no} className="bk-part">
            <h4 style={{ borderLeftColor: PART_COLOR[i % PART_COLOR.length] }}>{partName(i, p.no)}　{p.name}<small className="muted">{p.span}</small></h4>
            {p.blurb && <p className="small bk-blurb">{p.blurb}</p>}
            {p.unit && unitBtn && <div className="bk-unit small">這一部有學習單元：{unitBtn(p.unit)}</div>}
            {chs.map(station)}
          </div>
        );
      })}
      <details className="small bk-sources"><summary>「書裡怎麼說」與「另一種看法」的來源（{book.sources.length}）</summary>
        <ol>{book.sources.map((s) => <li key={s.id} id={`${pre}-${s.id}`}><b>[{s.id.slice(1)}]</b> <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a>{s.tier && <span className="muted">（{s.tier}）</span>}<span className="muted">・查閱 {s.accessed}</span></li>)}</ol>
      </details>
    </section>
  );
}
