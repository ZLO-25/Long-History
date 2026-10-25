// 學習模式首頁：選一個「XX史」→ 選一個謎題 → 開始；也可以隨機來一題
import type { History, Index, Unit } from '../types';
import type { Progress } from './progress';
import { learnCards, unitsOf } from './util';

const GROUPS: [string, (h: History) => boolean][] = [
  ['臺灣', (h) => h.track === '臺灣'], ['東亞', (h) => h.track === '東亞'], ['世界', (h) => h.track === '世界' || h.track === '全部'], ['專題（跨地區）', (h) => h.track === '專題'],
];

export function LearnHome({ index, p, onHistory, onUnit, onRandom, onIntroSeen }: {
  index: Index; p: Progress; onHistory: (id: string) => void; onUnit: (id: string) => void; onRandom: () => void; onIntroSeen: () => void;
}) {
  const cards = learnCards(index);
  return (
    <div className="lhome">
      {!p.seenIntro && (
        <section className="intro">
          <h2>歡迎來到「歷史長河」自主學習模式</h2>
          <ol className="steps3">
            <li><b>選一個你想學的「XX史」</b><span>臺灣史、日本史、錢的歷史……不必照課本順序。</span></li>
            <li><b>挑一個好奇的謎題</b><span>每個單元從一個問題開始，不從年代和名詞開始。</span></li>
            <li><b>讀故事、看證據、自己判斷</b><span>卡住了有提示，答完馬上有解析，答案會帶你到下一個問題。</span></li>
          </ol>
          <button className="btn primary" onClick={onIntroSeen}>知道了</button>
        </section>
      )}
      <section>
        <h2>1. 你想學哪一種歷史？</h2>
        {GROUPS.map(([g, f]) => {
          const hs = index.histories.filter(f);
          return (
            <div key={g} className="hgroup">
              <h3>{g}</h3>
              <div className="htiles">
                {hs.map((h) => {
                  const us = unitsOf(index, h), n = cards.filter((c) => h.all || c.learn!.histories.includes(h.id)).length;
                  const done = us.filter((u) => p.units[u.id]?.done).length;
                  return (
                    <button key={h.id} className={`htile ${n === 0 ? 'empty' : ''}`} onClick={() => onHistory(h.id)}>
                      <b>{h.name}</b><span>{h.blurb}</span>
                      <small>{us.length} 個謎題・{n} 張卡{done ? `・完成 ${done}` : ''}{n === 0 ? '・內容還在補' : ''}</small>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        <details className="about-cat"><summary>為什麼要分成「XX史」？這樣分對嗎？</summary>
          <p>分類是人為的。同一件事常常同時屬於好幾個史：例如荷蘭人到臺灣，是臺灣史，也是歐洲擴張史和錢的歷史。從不同的史看，重點會不一樣，所以卡片上會寫「也可以從某某史的角度看」。</p>
          <p>時間軸分成「臺灣／東亞／世界」三條，也只是為了方便閱讀，不代表它們彼此無關。</p>
        </details>
      </section>
      <section>
        <h2>2. 或者，直接挑一個謎題</h2>
        <button className="btn primary" onClick={onRandom}>🎲 隨機一個謎題</button>
        <MysteryList units={index.units} p={p} onUnit={onUnit} />
      </section>
    </div>
  );
}

export function MysteryList({ units, p, onUnit }: { units: Unit[]; p: Progress; onUnit: (id: string) => void }) {
  return (
    <div className="mysteries">
      {units.map((u) => (
        <button key={u.id} className={`mystery ${p.units[u.id]?.done ? 'done' : ''}`} onClick={() => onUnit(u.id)}>
          <span className="q">❓ {u.mystery}</span>
          <span className="meta">{u.title}・約 {u.minutes} 分鐘{p.units[u.id]?.done ? '・🏅 已完成' : p.units[u.id]?.step ? `・進行到第 ${(p.units[u.id]!.step ?? 0) + 1} 步` : ''}</span>
        </button>
      ))}
    </div>
  );
}
