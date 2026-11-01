// 學習模式首頁：選一個「XX史」→ 選一個謎題 → 開始；也可以隨機來一題
import type { History, Index, Unit } from '../types';
import type { Progress } from './progress';
import { learnCards, unitsOf } from './util';

const GROUPS: [string, (h: History) => boolean][] = [
  ['臺灣', (h) => h.track === '臺灣'], ['東亞', (h) => h.track === '東亞'], ['世界', (h) => h.track === '世界' || h.track === '全部'], ['專題（跨地區）', (h) => h.track === '專題'],
];

export function LearnHome({ index, p, onHistory, onUnit, onRandom, onIntroSeen, onRecord }: {
  index: Index; p: Progress; onHistory: (id: string) => void; onUnit: (id: string) => void; onRandom: () => void; onIntroSeen: () => void; onRecord?: () => void;
}) {
  const cards = learnCards(index);
  // 上次做到一半的單元：放在最上面，一鍵接著做
  const resume = index.units.map((u) => [u, p.units[u.id]] as const).filter(([, x]) => x && !x.done && x.step > 0).sort((a, b) => (b[1]!.step) - (a[1]!.step))[0];
  const doneN = index.units.filter((u) => p.units[u.id]?.done).length;
  return (
    <div className="lhome">
      {resume && (
        <section className="resume">
          <div><small>上次做到一半</small><b>❓ {resume[0].mystery}</b><span className="muted">{resume[0].title}・第 {resume[1]!.step + 1}／{resume[0].steps.length} 步</span></div>
          <button className="btn primary" onClick={() => onUnit(resume[0].id)}>接著做 →</button>
        </section>
      )}
      {(doneN > 0 || resume) && <p className="muted small">你已完成 {doneN}／{index.units.length} 個單元。{onRecord && <button className="link" onClick={onRecord}>看學習紀錄 →</button>}</p>}
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
      <details className="method-box">
        <summary>📜 為什麼要學歷史？這裡的單元怎麼帶你讀</summary>
        <ol className="steps3">
          <li><b>先有問題</b><span>每個單元從一個謎題開始。不是先背年代，而是先好奇「為什麼會這樣」。</span></li>
          <li><b>把自己放進去</b><span>做決定的那一步，先別看選項，寫下「如果我是他，只知道這些，我會怎麼做」。</span></li>
          <li><b>看成敗，也看代價</b><span>再看他實際怎麼做、後來怎樣、代價由誰付。盛的時候找衰的種子，衰的時候找轉機。</span></li>
          <li><b>回到自己</b><span>最後問：這段經驗，對我自己的選擇有什麼用？沒有標準答案。</span></li>
        </ol>
        <p className="muted small">這四步參考臺大歷史系呂世浩老師公開談過的讀史方法：「古人的歷史是拿來用的」（<a href="http://tedxtaipei.com/talks/2014-shih-hao-lu/" target="_blank" rel="noreferrer">TEDxTaipei 演講介紹</a>）；讀史要「觀史如身在其中……必掩卷自思，使我遇此等事，當作何處之」（他引宋代呂祖謙，<a href="https://www.5070.com.tw/i5070/userfiles/evtrpt/3cp/201406112.pdf" target="_blank" rel="noreferrer">〈《史記》中的智慧〉文稿</a>）；他也提醒思辨根本沒有「標準答案」，「不要把老師的答案當成是『標準答案』」（<a href="https://www.coursera.org/learn/qin-shi-huang" target="_blank" rel="noreferrer">Coursera 秦始皇課程介紹</a>）。把這些話整理成四個步驟，是本站自己的設計，不代表呂老師本人的課程安排。</p>
      </details>
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
