// 戲劇 vs 史實（learn.pop_culture）：大河劇、遊戲、動漫常見但史料不支持的說法。
// 每條＝常見說法 → 史料怎麼說（附來源）。學習模式與研究模式共用；render 由呼叫端決定怎麼把 [sN] 變成可點來源。
import type { ReactNode } from 'react';
import type { Card } from '../types';

export function PopCulture({ card: c, render }: { card: Card; render: (text: string) => ReactNode }) {
  const items = c.learn?.pop_culture ?? [];
  if (!items.length) return null;
  return (
    <section className="pop-culture">
      <h3>戲劇 vs 史實<small className="muted">（遊戲、動漫、大河劇常這樣演；史料怎麼說）</small></h3>
      <dl>
        {items.map((m, i) => {
          const src = m.src ? ([] as string[]).concat(m.src as any).map((s) => `[${s}]`).join('') : '';
          const fact = /\[s\d+\]/.test(m.fact) ? m.fact : `${m.fact}${src}`;
          return <div key={i}><dt>{m.claim}</dt><dd>{render(fact)}</dd></div>;
        })}
      </dl>
    </section>
  );
}
