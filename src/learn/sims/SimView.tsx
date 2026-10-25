// 三個金融小模擬。都是「簡化模型」：用來感受機制，數字不是史實
import type { Index } from '../../types';
import { Debase } from './Debase';
import { BankRun } from './BankRun';
import { Bubble } from './Bubble';

export const SIMS: { id: 'debase' | 'bankrun' | 'bubble'; name: string; q: string; cards: string[] }[] = [
  { id: 'debase', name: '降低銀幣成色：劣幣驅逐良幣', q: '皇帝缺錢，把銀幣裡的銀偷偷減少，會發生什麼事？', cards: ['commodity-wuzhu-coin', 'event-wang-mang-reform', 'finance-ming-baochao', 'finance-taiwan-1949-currency', 'finance-gold-yuan-1948'] },
  { id: 'bankrun', name: '銀行擠兌', q: '一家好好的銀行，為什麼會被謠言弄垮？', cards: ['finance-great-depression', 'finance-2008-crisis', 'finance-tenth-credit-1985'] },
  { id: 'bubble', name: '泡沫的形成與破滅', q: '大家都在賺錢的時候，價格為什麼會衝上天又摔下來？', cards: ['finance-tulip-mania', 'finance-south-sea-bubble', 'finance-taiwan-stock-1990', 'finance-2008-crisis'] },
];

export function SimView({ id, index, onCard }: { id: string; index: Index; onCard: (id: string) => void }) {
  const sim = SIMS.find((s) => s.id === id);
  if (!sim) return null;
  const cards = sim.cards.map((c) => index.cards.find((x) => x.id === c)).filter((c) => c?.learn);
  return (
    <div className="sim">
      <h3>🧪 {sim.name}</h3>
      <p className="muted">{sim.q}</p>
      <p className="sim-warn">這是簡化模型：只保留一兩個最重要的機制，用來「感受」因果關係。圖上的數字是模型算的，不是歷史統計。</p>
      {id === 'debase' && <Debase />}
      {id === 'bankrun' && <BankRun />}
      {id === 'bubble' && <Bubble />}
      {cards.length > 0 && <div className="sim-cards"><b>歷史上真的發生過：</b>{cards.map((c) => <button key={c!.id} className="chip" onClick={() => onCard(c!.id)}>📖 {c!.name}</button>)}</div>}
    </div>
  );
}

// 共用的小折線圖
export function LineChart({ series, height = 180, yLabel, xLabel, marks = [] }: {
  series: { name: string; color: string; values: number[]; dash?: boolean }[]; height?: number; yLabel: string; xLabel: string; marks?: { x: number; label: string }[];
}) {
  const W = 560, H = height, P = { l: 44, r: 10, t: 10, b: 26 };
  const n = Math.max(...series.map((s) => s.values.length), 2);
  const max = Math.max(1, ...series.flatMap((s) => s.values)) * 1.1;
  const x = (i: number) => P.l + (i / (n - 1)) * (W - P.l - P.r);
  const y = (v: number) => H - P.b - (v / max) * (H - P.t - P.b);
  const ticks = [0, max / 2, max].map((v) => Math.round(v));
  return (
    <svg className="sim-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${yLabel}隨${xLabel}變化的圖`}>
      {ticks.map((t) => <g key={t}><line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} className="grid" /><text x={P.l - 4} y={y(t) + 4} textAnchor="end">{t}</text></g>)}
      <text x={P.l} y={H - 6} className="axl">{xLabel} →</text>
      <text x={4} y={12} className="axl">{yLabel}</text>
      {marks.map((m) => <g key={m.label}><line x1={x(m.x)} x2={x(m.x)} y1={P.t} y2={H - P.b} className="mark" /><text x={x(m.x) + 3} y={P.t + 10} className="axl">{m.label}</text></g>)}
      {series.map((s) => <polyline key={s.name} fill="none" stroke={s.color} strokeWidth={2.5} strokeDasharray={s.dash ? '5 4' : undefined}
        points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />)}
      {series.map((s, i) => <text key={s.name} x={W - P.r - 4} y={P.t + 12 + i * 14} textAnchor="end" fill={s.color} className="lg-t">— {s.name}</text>)}
    </svg>
  );
}
