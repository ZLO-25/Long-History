// 戲劇 vs 史實（learn.pop_culture）：大河劇、遊戲、動漫常見但史料不支持的說法。
// 每條＝常見說法 → 史料怎麼說（附來源）。學習模式與研究模式共用；render 由呼叫端決定怎麼把 [sN] 變成可點來源。
import type { ReactNode } from 'react';
import type { Card } from '../types';
import './pop-culture.css';

export function PopCulture({ card: c, render, limit }: { card: Card; render: (text: string) => ReactNode; /** 只先顯示前幾條，其餘收進「看更多」（故事層用） */ limit?: number }) {
  const items = c.learn?.pop_culture ?? [];
  if (!items.length) return null;
  const row = (m: (typeof items)[number], i: number) => {
    const src = m.src ? ([] as string[]).concat(m.src as any).map((s) => `[${s}]`).join('') : '';
    const fact = /\[s\d+\]/.test(m.fact) ? m.fact : `${m.fact}${src}`;
    return <div key={i}><dt><span>{m.claim}</span></dt><dd>{render(fact)}</dd></div>;
  };
  return (
    <section className="pop-culture">
      <h3>戲劇 vs 史實<small className="muted">（遊戲、動漫、大河劇常這樣演；史料怎麼說）</small></h3>
      <dl>{items.slice(0, limit ?? items.length).map(row)}</dl>
      {limit != null && items.length > limit && <details><summary>看更多（還有 {items.length - limit} 條）</summary><dl>{items.slice(limit).map(row)}</dl></details>}
    </section>
  );
}
