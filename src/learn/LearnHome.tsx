// 學習模式首頁（2026-11 瘦身）：接著做 → 今天的複習（預留位置）→ 挑一課開始（6 課精選＋年級切換）→ 四個入口 → 講得深／還沒有的。
// 首頁只讀 home.json 就有的欄位：史的 h.n、主題的 t.nl、課的 u.nsteps／level／curriculum；完整資料（index.json）到了數字不變。
// 完整的課清單、XX史清單、課綱對照各是自己的頁（ListPages.tsx，延後載入）；故事線、深入專題、#標籤清單頁原本就有。
import { useState } from 'react';
import type { Index, Unit } from '../types';
import type { Progress } from './progress';
import { hasLevels, levelLabel, mustMin, pickUnits, type LevelPick } from './util';
import { levelText, unitLevel } from './level';
import { LLink } from './nav';
import { intent } from '../lib/detail';
import { homeReview } from './review';
import { preload } from '../chunks';
import './home-extra.css';
import './review.css';

export const HOME_PICKS = 6;
// 滑鼠移上去／聚焦／手指碰到入口時先載清單頁的程式（點下去通常已經到了）
const warm = { onPointerEnter: () => { preload.lists(); }, onFocus: () => { preload.lists(); }, onTouchStart: () => { preload.lists(); } };
const LEVEL_TABS: [LevelPick, string][] = [['all', '全部'], ['國中', '國中'], ['高中', '高中']];

export function LearnHome({ index, p, onUnit, onRandom, onIntroSeen, onRecord, onHistories, onLessons, onStories, onDives, onTopics, onCurriculum, onReview, onExam }: {
  index: Index; p: Progress; onUnit: (id: string) => void; onRandom: () => void; onIntroSeen: () => void; onRecord?: () => void;
  onHistories?: () => void; onLessons?: () => void; onStories?: () => void; onDives?: () => void; onTopics?: () => void; onCurriculum?: () => void; onReview?: () => void; onExam?: () => void;
}) {
  const [pick, setPick] = useState<LevelPick>('all');
  // 上次做到一半的課：依最近活動時間（lastAt）選，同一天再看步數
  const resume = index.units.map((u) => [u, p.units[u.id]] as const).filter(([, x]) => x && !x.done && x.step > 0)
    .sort((a, b) => (b[1]!.lastAt ?? '').localeCompare(a[1]!.lastAt ?? '') || b[1]!.step - a[1]!.step)[0];
  const doneN = index.units.filter((u) => p.units[u.id]?.done).length;
  const picks = pickUnits(index.units, (id) => !!p.units[id]?.done, pick, HOME_PICKS);
  const levels = hasLevels(index.units);
  const rv = homeReview(p); // 只靠 localStorage 的進度算，不需要題目內容
  const nTopics = (index.topicLayers ?? []).reduce((k, l) => k + l.topics.length, 0);
  const nStories = (index.storylines ?? []).length, nDives = (index.dives ?? []).length;
  const nHist = index.histories.filter((h) => index.units.some((u) => u.histories.some((x) => x === h.id || x === h.name)) || (h.n ?? 0) > 0).length;
  return (
    <div className="lhome">
      {!p.seenIntro && (
        <details className="intro" open onToggle={(e) => { if (!e.currentTarget.open) onIntroSeen(); }}>
          <summary>歡迎來到「歷史長河」自主學習模式</summary>
          <ol className="steps3">
            <li><b>挑一課</b><span>每一課從一個問題開始，不從年代和名詞開始。不必照課本順序。</span></li>
            <li><b>讀故事、看證據、自己判斷</b><span>卡住了有提示，答完馬上有解析，答案會帶你到下一個問題。</span></li>
          </ol>
          <button className="btn primary" onClick={onIntroSeen}>知道了</button>
        </details>
      )}
      {resume && (
        <section className="resume">
          <div><small>接著做</small><b>❓ {resume[0].mystery}</b><span className="muted">{resume[0].title}・第 {resume[1]!.step + 1}／{resume[0].nsteps ?? resume[0].steps.length} 步</span></div>
          <div className="resume-act">
            <button className="btn primary" onClick={() => onUnit(resume[0].id)} {...intent('unit', resume[0].id, preload.unit)}>接著做 →</button>
            {onRecord && <button className="link small" onClick={onRecord}>這不是我？</button>}
          </div>
        </section>
      )}
      {doneN > 0 && <p className="muted small">你已走完 {doneN}／{index.units.length} 課{(() => { const c = { mastered: 0, done: 0, walked: 0 }; index.units.forEach((u) => { const l = unitLevel(u, p.units[u.id]); if (l) c[l]++; }); return `（${levelText('mastered')} ${c.mastered}、${levelText('done')} ${c.done}、${levelText('walked')} ${c.walked}）`; })()}。{onRecord && <button className="link" onClick={onRecord}>看學習紀錄 →</button>}</p>}
      <div id="home-review-slot">
        {onReview && rv.any && (rv.due > 0 || rv.legacy > 0 ? (
          <section className="home-review" aria-label="今天的 3 分鐘複習">
            <div><small>🔁 間隔複習</small>
              <b>{rv.due > 0 ? `今天的 3 分鐘複習：${rv.due} 題` : `有 ${rv.legacy} 課該複習了`}</b>
              <span className="muted">{rv.doneToday ? `今天已經做了 ${rv.doneToday.n} 題（答對 ${rv.doneToday.right}）。` : ''}{rv.due > 0 && rv.legacy > 0 ? `另外有 ${rv.legacy} 課該複習了。` : '做過的課，隔天、第 3、7、21 天各回來一次。'}</span></div>
            <div className="resume-act">
              <button className="btn primary" onClick={onReview}>{rv.doneToday ? '繼續複習 →' : '開始複習 →'}</button>
              {onExam && <button className="link small" onClick={onExam}>📝 段考複習</button>}
            </div>
          </section>
        ) : rv.doneToday ? (
          <p className="home-review-done muted small">今天複習完了 ✓（答對 {rv.doneToday.right}／{rv.doneToday.n}）。{onExam && <> <button className="link" onClick={onExam}>📝 段考複習</button></>}</p>
        ) : (
          <p className="home-review-done muted small">今天沒有要複習的，明天再來。{onExam && <> <button className="link" onClick={onExam}>📝 段考複習</button></>}</p>
        ))}
      </div>
      <section className="home-pick">
        <h2>挑一課開始</h2>
        <div className="seg" role="group" aria-label="年級">
          {LEVEL_TABS.map(([k, l]) => <button key={k} className={pick === k ? 'on' : ''} aria-pressed={pick === k} onClick={() => setPick(k)}>{l}</button>)}
        </div>
        {pick !== 'all' && !levels && <p className="muted small">年級標示還在整理，先顯示全部。</p>}
        <MysteryList units={picks} p={p} onUnit={onUnit} />
        <div className="pick-more">
          <button className="btn" onClick={onRandom}>🎲 隨機一課</button>
          {onLessons && <button className="btn" onClick={onLessons} {...warm}>看全部 {index.units.length} 課 →</button>}
        </div>
      </section>
      <section className="home-entries">
        <h2>或者，換個方式找</h2>
        <div className="entries">
          {onHistories && <button className="entry" onClick={onHistories} {...warm}><b>🧭 依地區與主題</b><span>臺灣史、日本史、錢的歷史……共 {nHist} 種「XX史」</span></button>}
          {onStories && nStories > 0 && <button className="entry" onClick={onStories}><b>📖 讀故事</b><span>{nStories} 條故事線，每條一篇故事，讀完一站一站看因果</span></button>}
          {onDives && nDives > 0 && <button className="entry" onClick={onDives}><b>🔍 深入專題</b><span>{nDives} 個：花幾課，把一段歷史看透</span></button>}
          {onTopics && <button className="entry" onClick={onTopics}><b>#標籤</b><span>{nTopics} 個標籤，看同一件事物從古到今的路徑</span></button>}
        </div>
      </section>
      <details className="method-box">
        <summary>📜 為什麼要學歷史？這裡的課怎麼帶你讀</summary>
        <ol className="steps3">
          <li><b>先有問題</b><span>每一課從一個謎題（開頭的那個問題）開始。不是先背年代，而是先好奇「為什麼會這樣」。</span></li>
          <li><b>把自己放進去</b><span>做決定的那一步，先別看選項，寫下「如果我是他，只知道這些，我會怎麼做」。</span></li>
          <li><b>看成敗，也看代價</b><span>再看他實際怎麼做、後來怎樣、代價由誰付。盛的時候找衰的種子，衰的時候找轉機。</span></li>
          <li><b>回到自己</b><span>最後問：這段經驗，對我自己的選擇有什麼用？沒有標準答案。</span></li>
        </ol>
        <p className="muted small">這四步參考臺大歷史系呂世浩老師公開談過的讀史方法：「古人的歷史是拿來用的」（<a href="http://tedxtaipei.com/talks/2014-shih-hao-lu/" target="_blank" rel="noreferrer">TEDxTaipei 演講介紹</a>）；讀史要「觀史如身在其中……必掩卷自思，使我遇此等事，當作何處之」（他引宋代呂祖謙，<a href="https://www.5070.com.tw/i5070/userfiles/evtrpt/3cp/201406112.pdf" target="_blank" rel="noreferrer">〈《史記》中的智慧〉文稿</a>）；他也提醒思辨根本沒有「標準答案」，「不要把老師的答案當成是『標準答案』」（<a href="https://www.coursera.org/learn/qin-shi-huang" target="_blank" rel="noreferrer">Coursera 秦始皇課程介紹</a>）。把這些話整理成四個步驟，是本站自己的設計，不代表呂老師本人的課程安排。</p>
      </details>
      {index.coverage && (
        <section className="coverage">
          <h3>{index.coverage.title}</h3>
          <p className="muted small">目前共 {index.coverage.totals.units} 課、{index.coverage.totals.cards} 張學習卡、{index.coverage.totals.dives} 個深入專題、{index.coverage.totals.storylines} 條故事線。</p>
          <p><b>講得比較深：</b>{index.coverage.deep.map((d) => `${d.label}（${d.units} 課、${d.cards} 張卡${d.dives ? `、${d.dives} 個深入專題` : ''}）`).join('、')}。</p>
          <p><b>還沒有或很少（正在補）：</b>{index.coverage.gaps.map((g) => `${g.label}（${g.units ? `${g.units} 課` : '沒有課'}、${g.cards} 張卡）`).join('、')}。</p>
        <p className="muted small">{index.coverage.note}{onCurriculum && <> 想知道哪些課綱條目已經有對應的課？<button className="link" onClick={onCurriculum}>看課綱對照 →</button></>}</p>
        <p className="muted small">老師想派作業？每一課封面可以印學習單，學生做完可以產生分享碼。<LLink className="link" q={{ view: 'teacher' }}>👩‍🏫 老師檢視 →</LLink></p>
        </section>
      )}
    </div>
  );
}

/** 年級小標（國中／高中／國高中皆可）；沒有資料就不顯示 */
export const LevelTag = ({ level }: { level?: string }) => (level ? <span className={`lv-tag lv-${level === '皆可' ? 'any' : level === '國中' ? 'jr' : 'sr'}`}>{levelLabel(level)}</span> : null);

export function MysteryList({ units, p, onUnit }: { units: Unit[]; p: Progress; onUnit: (id: string) => void }) {
  return (
    <div className="mysteries">
      {units.map((u) => (
        <button key={u.id} className={`mystery ${p.units[u.id]?.done ? 'done' : ''}`} onClick={() => onUnit(u.id)} {...intent('unit', u.id, preload.unit)}>
          <span className="q">❓ {u.mystery}</span>
          <span className="meta">{u.level && <><LevelTag level={u.level} />・</>}{u.title}・必讀約 {mustMin(u)} 分鐘{p.units[u.id]?.done ? `・${levelText(unitLevel(u, p.units[u.id]) ?? 'walked')}` : p.units[u.id]?.step ? `・進行到第 ${(p.units[u.id]!.step ?? 0) + 1} 步` : ''}</span>
        </button>
      ))}
    </div>
  );
}

