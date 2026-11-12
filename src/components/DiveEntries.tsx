// 專題入口卡片（從 index.dives 自動產生）：學習首頁、各史頁用；historyId 有給就只列屬於該史的專題。
// 獨立成一個小檔：學習首頁一開就要用，不能把整個 Dive.tsx（專題頁、書、曲線）拉進首屏程式
import type { Index } from '../types';
import { byIdOf, diveStat } from '../lib/dive';
import { fmtRange } from '../lib/format';
import '../learn/home-extra.css';

export function DiveEntries({ index, history, onDive, className }: { index: Index; history?: { id: string; name: string }; onDive: (id: string) => void; className?: string }) {
  const m = byIdOf(index);
  const list = (index.dives ?? []).filter((d) => !history || d.histories.some((x) => x === history.id || x === history.name));
  if (!list.length) return null;
  return (
    <ul className={`dive-entries ${className ?? ''}`}>
      {list.map((d) => {
        const st = diveStat(d, m), persons = st.persons;
        const us = d.units.map((uid) => (index.units ?? []).find((x) => x.id === uid)).filter((u): u is NonNullable<typeof u> => !!u);
        const mins = us.reduce((a, u) => a + u.minutes, 0);
        return (
          <li key={d.id}>
            <button className="di-item" onClick={() => onDive(d.id)}>
              <span className="di-tag">深入專題</span>
              <span className="di-title">{d.title}</span>
              <span className="di-q">❓ {d.question}</span>
              <span className="di-meta muted small">{fmtRange(d.range.start, d.range.end)}・{us.length ? `${us.length} 課・約 ${mins} 分鐘・` : ''}{st.cards - persons} 張卡{persons > 0 ? `、${persons} 位人物` : ''} →</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
