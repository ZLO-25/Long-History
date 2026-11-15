// 第 4f 批新步驟（2026-11-15）：看地圖回答（mapq）、兩份史料對讀（sources2）、圖像史料（image）、換個案例試試（transfer）
// 進度鍵見 level.ts 檔頭。地圖只有 mapq 那一步才會用 React.lazy 載入（首頁與沒有 mapq 的課不下載地圖程式）。
import { Component, lazy, Suspense, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Card, Step } from '../types';
import { CardImages } from '../components/Images';
import { Choice, Hints, Short } from './Steps';
import type { Meta, Rec } from './level';
import './newsteps.css';

const MiniMap = lazy(() => import('../components/MiniMap'));
const L = 'ABCDEF';

/** 地圖元件載入失敗（離線、剛部署舊 chunk 不見了…）：通知外面退回按鈕版，不整理頁面 */
class MapBoundary extends Component<{ children: ReactNode; onFail: () => void }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  componentDidCatch() { this.props.onFail(); }
  render() { return this.state.err ? null : this.props.children; }
}

// 和 Choice 一樣的「兩次機會」：第一次選錯只提示、不公布；同一輪第二次選錯才公布正解；進度裡有紀錄就還原
function useTries(answer: number, rec?: Rec, onRec?: (r: Rec) => void) {
  const init = (): { wrongs: number[]; done: 'ok' | 'rev' | null; pick: number | null } => {
    if (rec && rec.n >= 1) {
      if (rec.l) return { wrongs: [], done: 'ok', pick: rec.p ?? answer };
      if (rec.n >= 2) return { wrongs: rec.p != null ? [rec.p] : [], done: 'rev', pick: rec.p ?? null };
      return { wrongs: rec.p != null ? [rec.p] : [], done: null, pick: rec.p ?? null };
    }
    return { wrongs: [], done: null, pick: null };
  };
  const [st, setSt] = useState(init);
  const recRef = useRef(rec);
  const choose = (i: number) => {
    const ok = i === answer, cur = recRef.current;
    const next: Rec = { f: cur ? cur.f : ok, l: ok, n: (cur?.n ?? 0) + 1, p: i };
    recRef.current = next; onRec?.(next);
    if (ok) setSt({ wrongs: st.wrongs, done: 'ok', pick: i });
    else if (st.wrongs.length >= 1) setSt({ wrongs: [...st.wrongs, i], done: 'rev', pick: i });
    else setSt({ wrongs: [i], done: null, pick: i });
  };
  const retry = () => setSt({ wrongs: [], done: null, pick: null });
  return { ...st, choose, retry };
}

// ---- 看地圖回答 ----
export function MapQ({ s, rec, onRec, after }: { s: Extract<Step, { type: 'mapq' }>; rec?: Rec; onRec?: (r: Rec) => void; after?: ReactNode }) {
  const { wrongs, done, pick, choose, retry } = useTries(s.answer, rec, onRec);
  const [mapFail, setMapFail] = useState(false);
  const pts = useMemo(() => s.places.map((p) => ({ lat: p.lat, lng: p.lng, label: p.label })), [s.places]);
  const hints = s.hints ?? [];
  const why = pick != null && pick !== s.answer ? s.why_wrong?.[pick] : null;
  const names = s.places.map((p, i) => `${L[i]}．${p.label}`).join('　');
  return (
    <div className="activity mapq">
      <div className="q">{s.question}</div>
      <p className="muted small">{mapFail ? '地圖現在載入不了（可能沒有網路），改用下面的按鈕作答。' : '點地圖上的點，或按下面的按鈕作答。'}</p>
      {!mapFail && (
        <MapBoundary onFail={() => setMapFail(true)}>
          <Suspense fallback={<div className="mq-skel" role="status">地圖載入中…</div>}>
            <MiniMap points={pts} done={!!done} wrongs={wrongs} right={done ? s.answer : null} picked={pick} disabled={!!done} onPick={choose} onFail={() => setMapFail(true)} />
          </Suspense>
        </MapBoundary>
      )}
      <div className="options mq-opts" role="radiogroup" aria-label="選一個點">
        {s.places.map((p, i) => (
          <button key={i} role="radio" aria-checked={pick === i} disabled={!!done || wrongs.includes(i)}
            className={`opt ${done && i === s.answer ? 'right' : ''} ${wrongs.includes(i) ? 'wrong' : ''} ${done === 'ok' && pick === i ? 'right' : ''}`}
            onClick={() => choose(i)}>
            <span className="opt-key">{L[i]}</span>{p.hint ?? `地圖上的 ${L[i]} 點`}{done ? <b>　（{p.label}）</b> : null}
          </button>
        ))}
      </div>
      {!done && wrongs.length === 0 && hints.length > 0 && <Hints hints={hints} />}
      {!done && wrongs.length > 0 && (
        <div className="feedback no" role="status">
          <b>✘ 不太對。</b>
          {why && <p>{why}</p>}
          <p>先不公布答案，再看一看地圖，換一個點試試。{hints.length > 0 ? '下面有提示，也可以回到卡片找線索。' : '也可以回到卡片找線索。'}</p>
          {after}
          {hints.length > 0 && <Hints key="h1" hints={hints} open={1} />}
        </div>
      )}
      {done && (
        <div className={`feedback ${done === 'ok' ? 'ok' : 'no'}`} role="status">
          <b>{done === 'ok' ? (wrongs.length ? '✔ 這次答對了！' : '✔ 答對了！') : `✘ 不太對。正確答案是 ${L[s.answer]}（${s.places[s.answer].label}）。`}</b>
          {done === 'rev' && why && <p>{why}</p>}
          <p>地圖上的點：{names}</p>
          <p>{s.explain}</p>{after}
          {done === 'rev' && <button className="btn sm" onClick={retry}>再試一次</button>}
        </div>
      )}
    </div>
  );
}

// ---- 兩份史料對讀 ----
export function Sources2({ s, rec, onRec, after, openUnlocked, openSaved, onOpenSave, openMeta, onOpenMeta }: {
  s: Extract<Step, { type: 'sources2' }>; rec?: Rec; onRec?: (r: Rec) => void; after?: ReactNode;
  /** 選擇題做完（答對或已公布）才出現開放題 */
  openUnlocked: boolean; openSaved?: string; onOpenSave?: (t: string) => void; openMeta?: Meta; onOpenMeta?: (m: Meta) => void;
}) {
  return (
    <>
      <div className="s2-pair" role="group" aria-label="兩份史料，請對照著讀">
        {([s.a, s.b] as const).map((x, k) => (
          <figure key={k} className="primary big s2-src">
            <span className="s2-tag">史料 {k === 0 ? '甲' : '乙'}</span>
            <blockquote>{x.text}</blockquote>
            <figcaption>— {x.from}</figcaption>
          </figure>
        ))}
      </div>
      <p className="muted small">先各讀一遍：誰寫的？什麼時候寫的？再看兩份放在一起，有什麼一樣、有什麼不一樣。</p>
      <Choice q={s.question} options={s.options} answer={s.answer} explain={s.explain} hints={s.hints ?? []} after={after} whyWrong={s.why_wrong} rec={rec} onRec={onRec} />
      {typeof s.open === 'object' && openUnlocked && (
        <div className="critique"><p className="muted small">再寫一寫：</p>
          <Short q={s.open.question} model={s.open.model_answer} points={s.open.points} saved={openSaved} onSave={onOpenSave} meta={openMeta} onMeta={onOpenMeta} /></div>
      )}
    </>
  );
}

// ---- 圖像史料 ----
export function ImageQ({ s, card, rec, onRec, after }: { s: Extract<Step, { type: 'image' }>; card?: Card; rec?: Rec; onRec?: (r: Rec) => void; after?: ReactNode }) {
  const im = card?.images?.[s.idx ?? 0];
  return (
    <>
      {im ? <div className="im-step"><CardImages images={[im]} /></div> : <p className="muted">這張卡片沒有圖片可以看。</p>}
      {s.look && s.look.length > 0 && (
        <div className="im-look"><p><b>🔍 先看哪裡</b></p><ul>{s.look.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
      )}
      <Choice q={s.question} options={s.options} answer={s.answer} explain={s.explain} hints={s.hints ?? []} after={after} whyWrong={s.why_wrong} rec={rec} onRec={onRec} />
    </>
  );
}

// ---- 換個案例試試（遷移）----
export function Transfer({ s, after, saved, onSave, meta, onMeta }: {
  s: Extract<Step, { type: 'transfer' }>; after?: ReactNode; saved?: string; onSave?: (t: string) => void; meta?: Meta; onMeta?: (m: Meta) => void;
}) {
  return (
    <div className="transfer">
      <h3 className="tr-title">🧩 換個案例試試</h3>
      <p className="muted small">這題在看你能不能把剛學的想法用到新的地方。下面的情境是這一課前面沒有教過的，先想一想，用這一課學到的想法回答。</p>
      <blockquote className="tr-case"><span className="tr-tag">新案例</span>{s.case}</blockquote>
      <Short q={s.question} model={s.model_answer} points={s.points} hints={s.hint ? [s.hint] : undefined} saved={saved} onSave={onSave} meta={meta} onMeta={onMeta} after={after} />
    </div>
  );
}
