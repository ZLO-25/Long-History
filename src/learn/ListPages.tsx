// 學習首頁各入口的清單頁（延後載入）：XX史清單、全部的課、課綱對照；以及課封面上的年級與課綱小欄（UnitMeta）。
// 這些頁都只用 home.json 就有的欄位（史的 h.n、課的 level／curriculum），不必等卡片資料；課綱條目文字另抓 data/curriculum.json（lib/curriculum.ts）。
import { useMemo, useState } from 'react';
import type { History, Index, Storyline, Unit } from '../types';
import type { Progress } from './progress';
import { LevelTag, MysteryList } from './LearnHome';
import { hasLevels, levelMatch, unitsOf, type LevelPick } from './util';
import { useCurriculum } from '../lib/curriculum';
import './home-extra.css';

const GROUPS: [string, (h: History) => boolean][] = [
  ['臺灣', (h) => h.track === '臺灣'], ['東亞', (h) => h.track === '東亞'], ['世界', (h) => h.track === '世界' || h.track === '全部'], ['跨地區主題', (h) => h.track === '專題'],
];
const REGIONS: [string, string][] = [['all', '全部地區'], ['臺灣', '臺灣'], ['東亞', '東亞'], ['世界', '世界'], ['專題', '跨地區主題']];
const LEVEL_TABS: [LevelPick, string][] = [['all', '全部'], ['國中', '國中'], ['高中', '高中']];

/** 依地區與主題：所有「XX史」。沒有任何課的排到最後 */
export function HistoriesPage({ index, p, onHistory }: { index: Index; p: Progress; onHistory: (id: string) => void }) {
  const info = (h: History) => ({ h, us: unitsOf(index, h), n: h.n ?? 0 });
  const all = index.histories.map(info);
  const tile = ({ h, us, n }: ReturnType<typeof info>) => {
    const done = us.filter((u) => p.units[u.id]?.done).length;
    return (
      <button key={h.id} className={`htile ${us.length === 0 ? 'empty' : ''}`} onClick={() => onHistory(h.id)}>
        <b>{h.name}</b><span>{h.blurb}</span>
        <small>{us.length === 0 ? (n > 0 ? '還沒有課，只有卡片' : '還沒有課，內容還在補') : `${us.length} 課・${n} 張卡${done ? `・完成 ${done}` : ''}`}</small>
      </button>
    );
  };
  const empty = all.filter((x) => x.us.length === 0);
  return (
    <div className="lists-page">
      <h2>依地區與主題</h2>
      <p className="muted">同一件事常常同時屬於好幾個「XX史」，例如荷蘭人到臺灣，是臺灣史，也是歐洲擴張史和錢的歷史。挑一個你有興趣的看。</p>
      {GROUPS.map(([g, f]) => {
        const hs = all.filter((x) => f(x.h) && x.us.length > 0);
        return hs.length ? <div key={g} className="hgroup"><h3>{g}</h3><div className="htiles">{hs.map(tile)}</div></div> : null;
      })}
      {empty.length > 0 && <div className="hgroup"><h3>還沒有課，只有卡片</h3><div className="htiles">{empty.map(tile)}</div></div>}
      <details className="about-cat"><summary>為什麼要分成「XX史」？這樣分對嗎？</summary>
        <p>分類是人為的。同一件事常常同時屬於好幾個史：例如荷蘭人到臺灣，是臺灣史，也是歐洲擴張史和錢的歷史。從不同的史看，重點會不一樣，所以卡片上會寫「也可以從某某史的角度看」。</p>
        <p>時間軸分成「臺灣／東亞／世界」三條，也只是為了方便閱讀，不代表它們彼此無關。</p>
      </details>
    </div>
  );
}

/** 看全部 N 課：可依地區、年級篩選 */
export function LessonsPage({ index, p, onUnit, onCurriculum, onExam }: { index: Index; p: Progress; onUnit: (id: string) => void; onCurriculum?: () => void; onExam?: () => void }) {
  const [region, setRegion] = useState('all');
  const [lv, setLv] = useState<LevelPick>('all');
  const any = hasLevels(index.units);
  const tracks = (u: Unit) => new Set(u.histories.map((x) => index.histories.find((h) => h.id === x || h.name === x)?.track === '全部' ? '世界' : index.histories.find((h) => h.id === x || h.name === x)?.track));
  const list = useMemo(() => index.units.filter((u) => (region === 'all' || tracks(u).has(region as History['track'])) && levelMatch(u, lv, any)), [index.units, region, lv]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="lists-page">
      <h2>全部 {index.units.length} 課</h2>
      <p className="muted">每一課從一個問題開始，必讀約 5–25 分鐘。{onCurriculum && <button className="link" onClick={onCurriculum}>想對照課綱？看課綱對照 →</button>}</p>
      {onExam && <p><button className="btn" onClick={onExam}>📝 段考複習</button> <span className="muted small">勾幾課，只出題，不用讀卡片</span></p>}
      <div className="filter-row"><span className="muted small">地區</span>
        <div className="seg" role="group" aria-label="地區">{REGIONS.map(([k, l]) => <button key={k} className={region === k ? 'on' : ''} aria-pressed={region === k} onClick={() => setRegion(k)}>{l}</button>)}</div></div>
      <div className="filter-row"><span className="muted small">年級</span>
        <div className="seg" role="group" aria-label="年級">{LEVEL_TABS.map(([k, l]) => <button key={k} className={lv === k ? 'on' : ''} aria-pressed={lv === k} onClick={() => setLv(k)}>{l}</button>)}</div></div>
      {lv !== 'all' && !any && <p className="muted small">年級標示還在整理，先顯示全部。</p>}
      <p className="muted small" aria-live="polite">{list.length} 課</p>
      {list.length ? <MysteryList units={list} p={p} onUnit={onUnit} /> : <p className="muted">這個組合還沒有課。換一個地區或年級試試。</p>}
    </div>
  );
}

type Linked = { kind: 'unit' | 'story'; id: string; title: string; level?: string };

/** 課綱對照：依國中／高中、主題分組列出每個條目，底下列對應的課與故事 */
export function CurriculumPage({ index, onUnit, onStory }: { index: Index; onUnit: (id: string) => void; onStory?: (id: string) => void }) {
  const { items, failed } = useCurriculum();
  const byCode = useMemo(() => {
    const m = new Map<string, Linked[]>();
    const add = (code: string, x: Linked) => m.set(code, [...(m.get(code) ?? []), x]);
    index.units.forEach((u) => (u.curriculum ?? []).forEach((c) => add(c, { kind: 'unit', id: u.id, title: u.mystery, level: u.level })));
    (index.storylines ?? []).forEach((s: Storyline) => (s.curriculum ?? []).forEach((c) => add(c, { kind: 'story', id: s.id, title: s.title, level: s.level })));
    return m;
  }, [index.units, index.storylines]);
  return (
    <div className="lists-page curriculum-page">
      <h2>課綱對照</h2>
      <p className="muted">這一頁把十二年國教歷史課綱的學習內容條目，對到這個網站裡可以讀的課和故事。沒有對應內容的條目標「還沒有」，表示這個網站還沒講到，請以課本和老師為準。</p>
      {!items && !failed && <p className="muted">載入中…</p>}
      {failed && <p className="muted">課綱條目沒載入成功，請稍後再試。</p>}
      {items && items.length === 0 && <p className="muted cur-wip">整理中：課綱條目還在整理，整理好之後這裡會依國中、高中與主題列出每個條目，以及可以對照的課和故事。</p>}
      {items && items.length > 0 && (['國中', '高中'] as const).map((stage) => {
        const its = items.filter((x) => x.stage === stage);
        if (!its.length) return null;
        const themes = [...new Set(its.map((x) => x.theme))];
        return (
          <section key={stage} className="cur-stage">
            <h3>{stage}</h3>
            {themes.map((th) => (
              <div key={th} className="cur-theme">
                <h4>{th}</h4>
                {its.filter((x) => x.theme === th).map((it) => {
                  const ls = byCode.get(it.code) ?? [];
                  return (
                    <div key={it.code} className={`cur-item ${ls.length ? '' : 'none'}`}>
                      <p><span className="code">{it.code}</span> {it.text}</p>
                      {ls.length ? (
                        <ul>{ls.map((l) => <li key={l.kind + l.id}><button className="link" onClick={() => (l.kind === 'unit' ? onUnit(l.id) : onStory?.(l.id))}>{l.kind === 'unit' ? '課' : '故事'}：{l.title}</button>{l.level && <> <LevelTag level={l.level} /></>}</li>)}</ul>
                      ) : <p className="muted small">還沒有</p>}
                    </div>
                  );
                })}
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}

/** 課封面上方的小欄：年級小標＋可收合的「對應課綱」（代碼＋條目文字）。沒有 level 也沒有 curriculum 就什麼都不畫 */
export function UnitMeta({ unit }: { unit: Pick<Unit, 'level' | 'curriculum'> }) {
  const codes = unit.curriculum ?? [];
  const { items } = useCurriculum(codes.length > 0);
  if (!unit.level && !codes.length) return null;
  return (
    <div className="unit-meta">
      {unit.level && <p className="small"><LevelTag level={unit.level} /></p>}
      {codes.length > 0 && (
        <details className="unit-curriculum">
          <summary>對應課綱（{codes.length} 條）</summary>
          <ul>{codes.map((c) => <li key={c}><span className="code">{c}</span> {items?.find((x) => x.code === c)?.text ?? (items ? '' : '…')}</li>)}</ul>
        </details>
      )}
    </div>
  );
}
