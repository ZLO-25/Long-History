// 時間軸上方的「全部／上古／中古…」切換列：目前看的時代會亮起來；自己縮放、拖曳後就都不亮，改顯示「自訂範圍」與畫面上的起訖年
import { ERAS } from '../lib/timeScale';
import { fmtYear } from '../lib/format';

/** active：'all'＝全部、時代名稱＝那個時代、null＝使用者自己縮放過 */
export function EraBar({ active, range, onAll, onEra }: {
  active: string | null; range: [number, number];
  onAll: () => void; onEra: (name: string, a: number, b: number) => void;
}) {
  const label = active === 'all' ? '全部年代' : active ?? '自訂範圍';
  return (
    <span className="era-bar">
      <span className="era-seg" role="group" aria-label="切換時代">
        <button className={active === 'all' ? 'on' : ''} aria-pressed={active === 'all'} onClick={onAll}>全部</button>
        {ERAS.map((e) => (
          <button key={e.name} className={active === e.name ? 'on' : ''} aria-pressed={active === e.name}
            title={`${fmtYear(e.a)}–${fmtYear(e.b)} 年`} onClick={() => onEra(e.name, e.a, e.b)}>{e.name}</button>
        ))}
      </span>
      <span className={`era-range ${active ? '' : 'custom'}`} aria-live="polite">
        正在看：<b>{label}</b>（{fmtYear(range[0])}–{fmtYear(range[1])} 年）
      </span>
    </span>
  );
}
