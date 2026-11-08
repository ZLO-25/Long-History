// 別名：照知名度排好（最有名的在最前面），先盡量填滿兩行；兩行放不下的收在「更多」，使用者可以自己展開或收起
import { useLayoutEffect, useRef, useState } from 'react';

const SEP = '、';
const moreLabel = (n: number) => `…更多（${n}）▾`;

export function AliasList({ aliases }: { aliases: string[] }) {
  const [open, setOpen] = useState(false);
  const [fit, setFit] = useState(aliases.length);
  const box = useRef<HTMLSpanElement>(null);
  const meas = useRef<HTMLSpanElement>(null);

  // 用一個看不見、同寬同字型的量尺，找出「前 k 個別名＋『更多』按鈕」剛好不超過兩行的最大 k
  useLayoutEffect(() => {
    const el = box.current, m = meas.current;
    if (!el || !m) return;
    const calc = () => {
      const w = el.getBoundingClientRect().width;
      if (!w) return;
      m.style.width = `${w}px`;
      // 量尺裡的按鈕和真的一樣：12px、不換行
      const height = (t: string, label?: string) => {
        m.textContent = t;
        if (label) { const b = document.createElement('span'); b.className = 'm'; b.textContent = label; m.appendChild(b); }
        return m.getBoundingClientRect().height;
      };
      const max = height('字') * 2 + 2;
      if (height(aliases.join(SEP)) <= max) { setFit(aliases.length); return; }
      let lo = 1, hi = aliases.length - 1, best = 1;
      while (lo <= hi) {
        const k = (lo + hi) >> 1;
        if (height(aliases.slice(0, k).join(SEP) + SEP, moreLabel(aliases.length - k)) <= max) { best = k; lo = k + 1; } else hi = k - 1;
      }
      setFit(best);
    };
    const run = () => { calc(); m.textContent = ''; };
    run();
    const ro = new ResizeObserver(run);
    ro.observe(el);
    return () => ro.disconnect();
  }, [aliases]);

  if (!aliases.length) return <>—</>;
  const hidden = aliases.length - fit;
  return (
    <span className="aliases" ref={box}>
      {/* 效能：量尺包在 contain: strict 的盒子裡，量高度時瀏覽器只重排這個小盒子，不會整頁重排 */}
      <span className="aliases-measure-box" aria-hidden="true"><span className="aliases-measure" ref={meas} /></span>
      <span>{(open ? aliases : aliases.slice(0, fit)).join(SEP)}</span>
      {hidden > 0 && (
        <>
          {!open && SEP}
          <button type="button" className="link aliases-more" aria-expanded={open} onClick={() => setOpen(!open)}
            title={open ? '收起其他別名' : `還有 ${hidden} 個別名（含英文、相關人物與事件、簡體寫法）`}>
            {open ? '收起 ▴' : moreLabel(hidden)}
          </button>
        </>
      )}
    </span>
  );
}
