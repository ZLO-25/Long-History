import { useLayoutEffect, useRef, useState } from 'react';
// 深入專題（data/dives/*.yaml）：把一段時代放大來看。
// 專題頁＝放大的時間範圍＋這段時代的卡片（分軌）＋人物（有人物卡才顯示）＋故事線＋主視覺（勢力圖／領土圖，文字由專題的 power_ui 決定）。
// 不另開網站、不改卡片格式：所有卡仍是普通卡片，專題只是把它們聚在一起（docs/dives.md）。
import type { Card, Dive, Index, PowerMap, PowerUi } from '../types';
import { cardEn } from '../lib/bilingual';
import { fmtRange, fmtYear, TYPE_COLOR, TYPE_ICON } from '../lib/format';
import './dive.css';
import { RelationGraph } from './RelationGraph';
import { BookView, DeepTimeline } from './DiveBook';
import { DiveCurve } from './DiveCurve';

export function findDive(index: Index, id: string): Dive | undefined {
  return (index.dives ?? []).find((d) => d.id === id);
}
/** 專題沒寫 power_ui 時的預設文字 */
export const DEFAULT_POWER_UI: PowerUi = { title: '勢力圖', subtitle: '誰在什麼時候最強', caveat: '', legend: '' };
/** 這個專題有沒有要畫的主視覺地圖（visual 是 power 且至少一張圖） */
export const hasPowerVisual = (d: Dive) => (d.visual ?? 'power') === 'power' && d.power_maps.length > 0;
const byIdOf = (index: Index) => new Map(index.cards.map((c) => [c.id, c]));

/** 讀書專題：地圖上一直亮著的路線（例如《人類大歷史》的智人擴散路線）＝專題卡片的史前遷徙路線 */
export function diveRoutes(index: Index, id: string): string[] {
  const d = findDive(index, id);
  if (!d?.book) return [];
  const m = byIdOf(index), mig = new Set(index.routes.filter((r) => r.kind === 'migration').map((r) => r.id));
  return [...new Set(d.cards.flatMap((cid) => m.get(cid)?.routes ?? []).filter((r) => mig.has(r)))];
}

/** 地圖上要標的點：專題的每張卡（人物除外）取第一個地點，編號＝依年代的順序 */
export function diveMarks(index: Index, id: string) {
  const d = findDive(index, id);
  if (!d) return [];
  const m = byIdOf(index);
  return d.cards.map((cid) => m.get(cid)).filter((c): c is Card => !!c && c.type !== 'person' && !!c.place.locations[0])
    // start：地圖依目前年代把還沒發生的卡調淡（讀書專題直接不畫，免得 7 萬年前出現羅馬）
    .map((c, i) => ({ key: c.place.locations[0].key, n: i + 1, name: c.name, en: cardEn(c), start: c.time.start, hideFuture: !!d.book }));
}

/** 打開專題時年代跳到哪：第一張勢力圖 → 專題指定的 focus_year → 專題起點 */
export function diveYear(d: Dive): number {
  return (hasPowerVisual(d) ? powerFor(d, d.range.start)?.year : undefined) ?? d.focus_year ?? d.range.start;
}
/** 史前按鈕要打開的專題：第一個從史前開始的專題（時間軸裝不下的卡都在那裡） */
export function prehistDive(index: Index): Dive | undefined {
  return (index.dives ?? []).find((d) => d.range.start < -800);
}

/** 目前年代該顯示哪一張勢力圖：不晚於該年的最近一張；都比該年晚就用第一張 */
export function powerFor(d: Dive, year: number): PowerMap | null {
  const s = [...d.power_maps].sort((a, b) => a.year - b.year);
  return s.filter((p) => p.year <= year).pop() ?? s[0] ?? null;
}

interface ViewProps {
  index: Index; id: string; year: number; setYear: (y: number) => void; currentId?: string | null;
  /** 勢力圖：目前打開哪一年（null＝關） */
  powerYear: number | null; setPowerYear: (y: number | null) => void;
  onOpen: (id: string) => void; onStory: (id: string) => void; onAll: () => void;
  unitHref?: (id: string) => string; onUnit?: (id: string) => void; onMap?: () => void;
  canOpen?: (c: Card) => boolean; researchHref?: (id: string) => string;
  /** 學習模式：單元排在最前面、勢力圖預設收合 */
  learn?: boolean;
  /** 畫面上真的有放大到這段年代的時間軸（只有研究模式桌機版有）才會寫「時間軸已放大」 */
  timelineZoomed?: boolean;
}

export function DiveView({ index, id, year, setYear, currentId, powerYear, setPowerYear, onOpen, onStory, onAll, unitHref, onUnit, onMap, canOpen, researchHref, learn, timelineZoomed }: ViewProps) {
  // 從專題點進卡片再按「返回」時，專題頁會重新掛載：打開的站和捲動位置記在 sessionStorage，回來時還原
  const posKey = `dive-pos-${id}${learn ? '-learn' : ''}`;
  const saved = (() => { try { return JSON.parse(sessionStorage.getItem(posKey) ?? 'null') as { ch: number | null; scroll: number } | null; } catch { return null; } })();
  const [openCh, setOpenChState] = useState<number | null>(() => saved ? saved.ch : findDive(index, id)?.book?.chapters[0]?.no ?? null);
  const rootRef = useRef<HTMLDivElement>(null);
  const scroller = () => { let e = rootRef.current?.parentElement ?? null; while (e) { const oy = getComputedStyle(e).overflowY; if ((oy === 'auto' || oy === 'scroll') && e.scrollHeight > e.clientHeight) return e; e = e.parentElement; } return document.scrollingElement as HTMLElement | null; };
  const lastScroll = useRef(saved?.scroll ?? 0);
  const savePos = (ch: number | null) => { try { sessionStorage.setItem(posKey, JSON.stringify({ ch, scroll: lastScroll.current })); } catch { /* 無痕模式 */ } };
  const setOpenCh = (ch: number | null) => { setOpenChState(ch); savePos(ch); };
  const chRef = useRef(openCh); chRef.current = openCh;
  useLayoutEffect(() => {
    const s = scroller();
    if (s && saved?.scroll) s.scrollTop = saved.scroll;
    // 捲動時記下位置（點卡片時有些版面會先捲回頂端，所以不能等卸載時才量）
    const tgt: HTMLElement | Window | null = s === document.scrollingElement ? window : s;
    const onScroll = () => { lastScroll.current = s?.scrollTop ?? 0; };
    tgt?.addEventListener('scroll', onScroll, { passive: true });
    return () => { tgt?.removeEventListener('scroll', onScroll); savePos(chRef.current); };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  const d = findDive(index, id);
  if (!d) return <div className="dive-view"><p>找不到這個專題。</p><button className="link" onClick={onAll}>看全部專題</button></div>;
  const m = byIdOf(index);
  const ui: PowerUi = d.power_ui ?? DEFAULT_POWER_UI;
  const cards = d.cards.map((x) => m.get(x)).filter((c): c is Card => !!c);
  const persons = cards.filter((c) => c.type === 'person');
  const events = cards.filter((c) => c.type !== 'person');
  const marks = new Map(diveMarks(index, id).map((x) => [x.name, x.n]));
  const laneOf = (c: Card) => d.lanes.find((l) => l.types.includes(c.type))?.name ?? '其他';
  const lanes = [...d.lanes.map((l) => l.name), '其他'].map((name) => ({ name, cards: events.filter((c) => laneOf(c) === name) })).filter((l) => l.cards.length);
  const power = powerYear != null ? d.power_maps.find((p) => p.year === powerYear) ?? null : null;
  const cardBtn = (c: Card, n?: number) => {
    const inYear = c.time.start <= year && year <= c.time.end;
    const label = <>{n != null && <span className="dv-n">{n}</span>}<span aria-hidden className="dv-icon" style={{ color: TYPE_COLOR[c.type] }}>{TYPE_ICON[c.type]}</span><span className="dv-name">{c.name.replace(/（\d.*）$/, '')}</span><small className="dv-year">{c.type === 'person' ? `${fmtYear(c.time.start)}–${fmtYear(c.time.end)}` : fmtRange(c.time.start, c.time.end)}</small></>;
    const cls = `dv-card ${currentId === c.id ? 'here' : ''} ${inYear ? 'in-year' : ''}`;
    if (canOpen && !canOpen(c)) return researchHref ? <a key={c.id} className={`${cls} off`} href={researchHref(c.id)} title="這張卡還不在學習模式，到研究模式看">{label}</a> : <span key={c.id} className={`${cls} off`}>{label}</span>;
    return <button key={c.id} className={cls} style={{ borderLeftColor: TYPE_COLOR[c.type] }} onClick={() => onOpen(c.id)}>{label}</button>;
  };
  const pickYear = (y: number) => { setPowerYear(y); if (year < y - 3 || year > y + 3) setYear(y); };
  const goto = (sid: string) => document.getElementById(`${sid}-${d.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const unitList = d.units.map((uid) => (index.units ?? []).find((x) => x.id === uid)).filter((u): u is NonNullable<typeof u> => !!u);
  const storyList = d.storylines.map((sid) => (index.storylines ?? []).find((x) => x.id === sid)).filter((x): x is NonNullable<typeof x> => !!x);
  const unitBtn = (u: typeof unitList[number], i: number) => {
    const start = learn && i === 0;
    const lbl = <>{start && <b className="dv-start">從這裡開始</b>}<span>{unitList.length > 1 && <>第 {i + 1} 課・</>}《{u.title}》</span><small>{u.minutes} 分鐘</small></>;
    const cls = `dv-story unit ${start ? 'start' : ''}`;
    return onUnit ? <button key={u.id} className={cls} onClick={() => onUnit(u.id)}>{lbl}</button> : unitHref ? <a key={u.id} className={cls} href={unitHref(u.id)}>{lbl}</a> : null;
  };
  const readSec = (storyList.length > 0 || unitList.length > 0) && (
    <section className="dv-sec dv-read" id={`dv-read-${d.id}`}>
      <h3>{learn ? '學習單元（照順序讀）' : '照順序讀'}<small className="muted">{learn ? '有問題、有決策題的導讀，從第 1 課開始' : '故事線＝沿著前因後果走；學習單元＝有問題、有決策題的導讀'}</small></h3>
      {unitList.length > 0 && <div className="dv-chips">{unitList.map(unitBtn)}</div>}
      {storyList.length > 0 && <>
        {learn && unitList.length > 0 && <h4 className="dv-sub">想沿著前因後果走：故事線</h4>}
        <div className="dv-chips">{storyList.map((s) => <button key={s.id} className="dv-story" onClick={() => onStory(s.id)}>故事線《{s.title}》<small>{s.stops.length} 站{s.read && `・📖 故事約 ${s.read.minutes} 分鐘`}</small></button>)}</div>
      </>}
    </section>
  );
  const sorted = [...d.power_maps].sort((a, b) => a.year - b.year);
  // 圖例：有卡片連結的主要區塊先列，補到 8 列；其餘收進「其餘 N 個較小的區塊」
  const legendOf = (pw: PowerMap) => { const main = pw.powers.filter((p) => p.card && m.get(p.card)); const rest = pw.powers.filter((p) => !main.includes(p)); const head = [...main, ...rest.slice(0, Math.max(0, 8 - main.length))]; return { head: pw.powers.filter((p) => head.includes(p)), more: pw.powers.filter((p) => !head.includes(p)) }; };
  const legendLi = (p: PowerMap['powers'][number]) => (
    <li key={p.name}><i style={{ background: p.color }} />
      <div className="dv-lg-t">{p.card && m.get(p.card) ? <button className="link" onClick={() => onOpen(p.card!)}>{p.name}</button> : <span>{p.name}</span>}
        <small className="muted">{ui.legend ? `${ui.legend}：` : ''}{p.provinces}</small></div>
    </li>
  );
  const lg = power ? legendOf(power) : null;
  const powerSec = hasPowerVisual(d) && (
    <details className="dv-sec dv-power" id={`dv-power-${d.id}`} open={!learn}>
      <summary><h3>{ui.title}<small className="muted">{ui.subtitle}{power ? `（目前：${fmtYear(power.year)} 年）` : ''}</small></h3></summary>
      <div className="dv-chips">
        <button className={`chip ${powerYear == null ? 'on' : ''}`} onClick={() => setPowerYear(null)}>關</button>
        {sorted.map((p) => <button key={p.year} className={`chip ${powerYear === p.year ? 'on' : ''}`} onClick={() => pickYear(p.year)} title={p.title}>{fmtYear(p.year)} 年</button>)}
        {onMap && power && <button className="chip dv-tomap" onClick={onMap}>🗺 到地圖看 {fmtYear(power.year)} 年</button>}
      </div>
      {power && lg && (
        <div className="dv-power-info">
          <b>{power.title}</b>
          <p className="small">{power.note}</p>
          <ul className="dv-legend">{lg.head.map(legendLi)}</ul>
          {lg.more.length > 0 && <details className="small dv-more"><summary>其餘 {lg.more.length} 個較小的區塊</summary><ul className="dv-legend">{lg.more.map(legendLi)}</ul></details>}
          <details className="small"><summary>這張圖怎麼畫的、根據什麼</summary>
            {ui.caveat && <p className="muted">{ui.caveat}</p>}
            <ol className="sources">{power.sources.map((s, i) => <li key={i}><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a><span className="muted small">（查閱 {s.accessed}）</span></li>)}</ol>
          </details>
        </div>
      )}
    </details>
  );
  const curveSec = d.visual === 'curve' && d.curves && (
    <details className="dv-sec dv-power dv-curve-sec" id={`dv-power-${d.id}`} open={!learn}>
      <summary><h3>{d.curves.title}<small className="muted">{d.curves.subtitle}</small></h3></summary>
      <DiveCurve curves={d.curves} range={d.range} year={year} setYear={setYear} onOpen={onOpen} byId={m} />
    </details>
  );
  const personSec = persons.length > 0 && (
    <section className="dv-sec" id={`dv-persons-${d.id}`}>
      <h3>人物<small className="muted">點開看他的一生、他當時的選擇、別人怎麼看他</small></h3>
      <RelationGraph index={index} persons={persons} year={year} onOpen={onOpen} currentId={currentId} years={sorted.map((p) => p.year)} onYear={d.power_maps.length ? pickYear : setYear} />
      <details className="dv-plist"><summary>{persons.length} 位人物清單</summary><div className="dv-list grid">{persons.map((c) => cardBtn(c))}</div></details>
    </section>
  );
  const cardSec = (
    <section className="dv-sec" id={`dv-cards-${d.id}`}>
      <h3>這段時代的卡片<small className="muted">依年代排；編號和地圖上的一樣</small></h3>
      {lanes.map((l) => (
        <div key={l.name} className="dv-lane">
          <h4>{l.name}</h4>
          <div className="dv-list">{l.cards.map((c) => cardBtn(c, marks.get(c.name)))}</div>
        </div>
      ))}
    </section>
  );
  const anchors: [string, string, boolean][] = [['dv-read', learn ? '學習單元' : '照順序讀', !!readSec], ['dv-power', d.curves && d.visual === 'curve' ? d.curves.title : ui.title, !!(powerSec || curveSec)], ['dv-persons', '人物', !!personSec], ['dv-cards', '卡片', true]];
  const bookAnchors: [string, string, boolean][] = d.book ? [['dv-deep', '深時間軸', true], ['dv-book', `照書讀 ${d.book.chapters.length} 站`, true]] : [];
  const ordered = [...bookAnchors, ...(learn || d.book ? anchors : [anchors[1], anchors[2], anchors[3], anchors[0]])];
  return (
    <div className="dive-view" ref={rootRef}>
      <nav className="dv-crumb" aria-label="麵包屑"><button className="link" onClick={onAll}>深入專題</button> <span aria-hidden>›</span> <span>{d.title}</span></nav>
      <h2>{d.title}</h2>
      <p className="dv-q">❓ {d.question}</p>
      {d.blurb && <p className="dv-blurb">{d.blurb}</p>}
      <p className="muted small">{fmtRange(d.range.start, d.range.end)}・{events.length} 張卡{persons.length > 0 && `、${persons.length} 位人物`}{d.range.start < -800 ? '・年代太長，大時間軸放不下，看下面的深時間軸' : timelineZoomed ? '・時間軸已放大到這段年代' : ''}{onMap && <>・<button className="link" onClick={onMap}>在地圖上看</button></>}</p>
      <nav className="dv-anchors" aria-label="專題頁內導覽">{ordered.filter((x) => x[2]).map(([k, label]) => <button key={k} className="chip" onClick={() => goto(k)}>{label}</button>)}</nav>
      {d.book && (
        <section className="dv-sec" id={`dv-deep-${d.id}`}>
          <h3>深時間軸<small className="muted">{fmtRange(d.range.start, d.range.end)}</small></h3>
          <DeepTimeline dive={d} book={d.book} cards={events} year={year} setYear={setYear} onOpen={onOpen} currentId={currentId} hl={openCh != null ? { no: openCh, ids: d.book.chapters.find((c) => c.no === openCh)?.cards ?? [] } : null} />
        </section>
      )}
      {d.book && <BookView dive={d} book={d.book} byId={m} cardBtn={(c) => cardBtn(c, marks.get(c.name))} open={openCh} setOpen={setOpenCh} unitBtn={(uid) => { const i = unitList.findIndex((u) => u.id === uid); return i >= 0 ? unitBtn(unitList[i], i) : null; }} />}

      {learn || d.book ? <>{readSec}{powerSec}{curveSec}{personSec}{cardSec}</> : <>{powerSec}{curveSec}{personSec}{cardSec}{readSec}</>}
      <p className="dv-note muted small">專題只是把這段時代的卡片聚在一起放大看；每張卡仍然在整條長河、地圖和主題標籤裡，可以隨時跳出去比較別的時代。</p>
    </div>
  );
}

export function DiveIndex({ index, onDive }: { index: Index; onDive: (id: string) => void }) {
  const m = byIdOf(index);
  return (
    <div className="dive-index">
      <h2>深入專題</h2>
      <p className="muted">把一段時代放大來看：地圖怎麼變、關鍵的決定是什麼、這段歷史和世界有什麼關係。</p>
      <ul>
        {(index.dives ?? []).map((d) => {
          const persons = d.cards.filter((id) => m.get(id)?.type === 'person').length;
          return (
            <li key={d.id}>
              <button className="di-item" onClick={() => onDive(d.id)}>
                <span className="di-title">{d.title}</span>
                <span className="di-q">{d.question}</span>
                <span className="di-meta muted small">{fmtRange(d.range.start, d.range.end)}・{d.cards.length - persons} 張卡{persons > 0 ? `、${persons} 位人物` : ''}{hasPowerVisual(d) ? `・${d.power_maps.length} 張${(d.power_ui ?? DEFAULT_POWER_UI).title}` : ''}{d.visual === 'curve' && d.curves ? `・${d.curves.series.length} 條經濟曲線` : ''}{d.book ? `・照書讀 ${d.book.chapters.length} 站` : ''}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** 專題入口卡片（從 index.dives 自動產生）：學習首頁、各史頁用；historyId 有給就只列屬於該史的專題 */
export function DiveEntries({ index, history, onDive, className }: { index: Index; history?: { id: string; name: string }; onDive: (id: string) => void; className?: string }) {
  const m = byIdOf(index);
  const list = (index.dives ?? []).filter((d) => !history || d.histories.some((x) => x === history.id || x === history.name));
  if (!list.length) return null;
  return (
    <ul className={`dive-entries ${className ?? ''}`}>
      {list.map((d) => {
        const persons = d.cards.filter((id) => m.get(id)?.type === 'person').length;
        const us = d.units.map((uid) => (index.units ?? []).find((x) => x.id === uid)).filter((u): u is NonNullable<typeof u> => !!u);
        const mins = us.reduce((a, u) => a + u.minutes, 0);
        return (
          <li key={d.id}>
            <button className="di-item" onClick={() => onDive(d.id)}>
              <span className="di-tag">深入專題</span>
              <span className="di-title">{d.title}</span>
              <span className="di-q">❓ {d.question}</span>
              <span className="di-meta muted small">{fmtRange(d.range.start, d.range.end)}・{us.length ? `${us.length} 課・約 ${mins} 分鐘・` : ''}{d.cards.length - persons} 張卡{persons > 0 ? `、${persons} 位人物` : ''} →</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
