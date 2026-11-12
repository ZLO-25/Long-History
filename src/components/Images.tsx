// 卡片圖片（docs/card-fields.md「圖片」）：只放 Wikimedia Commons 上的公有領域／CC 作品，
// 每張都標作者、年代、收藏處與授權，點圖在網站內放大（燈箱），燈箱裡的連結再開 Commons 檔案頁。第一張直接顯示，其餘收在「更多圖片」。
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CardImage } from '../types';
import './images.css';

// 授權只顯示學生看得懂的短名稱（公有領域／CC0／CC BY-SA 4.0）；查核日期與 Commons 模板代號留在滑鼠提示與 docs 的查核紀錄
const licenseShort = (s: string) => s.replace(/[（(].*$/, '').trim().replace(/^Public domain$/i, '公有領域') + (/署名/.test(s) ? '，使用時須標示作者' : '');

function Credit({ im }: { im: CardImage }) {
  return (
    <figcaption>
      <span className="img-caption">{im.caption}</span>
      <span className="img-credit muted small">{im.title}・{im.creator}・{im.year}{im.holder ? `・${im.holder}` : ''}・<span className="img-src" title={im.license}><a href={im.page} target="_blank" rel="noreferrer">Wikimedia Commons ↗</a>（{licenseShort(im.license)}）</span></span>
    </figcaption>
  );
}

// 放大用的網址：Commons 縮圖網址（.../NNNpx-檔名）改要 1600px（不超過原圖寬）；其他網址照用
const bigUrl = (im: CardImage) => {
  const m = im.url.match(/\/(\d+)px-([^/]+)$/);
  if (!m) return im.url;
  const want = Math.min(1600, im.w || 1600);
  return want > Number(m[1]) ? im.url.replace(/\/\d+px-([^/]+)$/, `/${want}px-$1`) : im.url;
};

// 燈箱：整個畫面的深色底，圖盡量放大，下面是說明與出處；Esc／點背景／關閉鈕都能關，打開時焦點在關閉鈕
function Lightbox({ im, onClose }: { im: CardImage; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [src, setSrc] = useState(() => bigUrl(im));
  const closeFn = useRef(onClose);
  closeFn.current = onClose;
  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // window 的捕獲階段最先收到鍵盤事件：燈箱開著時，Esc 只關燈箱，故事閱讀頁的 Esc／方向鍵／空白鍵不會同時動作
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); closeFn.current(); return; }
      if (e.key === 'Tab') {
        const els = Array.from(document.querySelectorAll<HTMLElement>('.img-lb button, .img-lb a[href]'));
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1], cur = document.activeElement;
        if (!els.includes(cur as HTMLElement)) { e.preventDefault(); first.focus(); }
        else if (e.shiftKey && cur === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
        e.stopImmediatePropagation();
        return;
      }
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) e.stopImmediatePropagation();
    };
    window.addEventListener('keydown', onKey, true);
    return () => { window.removeEventListener('keydown', onKey, true); document.body.style.overflow = prev; };
  }, []);
  return createPortal(
    <div className="img-lb" role="dialog" aria-modal="true" aria-label={`放大圖片：${im.title}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button ref={closeRef} type="button" className="img-lb-close" onClick={onClose}>✕ 關閉</button>
      <div className="img-lb-body" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <img src={src} alt={im.title} onError={() => { if (src !== im.url) setSrc(im.url); }} />
        <div className="img-lb-cap"><Credit im={im} /></div>
      </div>
    </div>,
    document.body,
  );
}

// 效能：圖還沒載入就照原圖比例留好位置（最高 300px、精簡版 200px，也不放大超過原圖），載入後版面不會往下跳
function Img({ im, max }: { im: CardImage; max: number }) {
  const [bad, setBad] = useState(false);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  // 圖載不到（Commons 暫時擋掉或離線）：不顯示破圖圖示，改成一句說明＋原圖連結
  if (bad) return <a className="img-missing" href={im.page} target="_blank" rel="noreferrer">🖼 圖片暫時載不到。到 Wikimedia Commons 看「{im.title}」↗</a>;
  const box = im.w && im.h ? { aspectRatio: `${im.w} / ${im.h}`, width: `min(100%, ${Math.round((max * im.w) / im.h)}px, ${im.w}px)` } : undefined;
  const close = () => { setOpen(false); requestAnimationFrame(() => trigger.current?.focus()); };
  return (
    <>
      <button ref={trigger} type="button" title="點一下放大" aria-haspopup="dialog" className={`img-trigger${box ? ' sized' : ''}`} style={box} onClick={() => setOpen(true)}>
        <img src={im.url} alt={im.title} loading="lazy" decoding="async" width={im.w} height={im.h} onError={() => setBad(true)} />
      </button>
      {open && <Lightbox im={im} onClose={close} />}
    </>
  );
}

export function CardImages({ images, compact }: { images: CardImage[]; compact?: boolean }) {
  if (!images?.length) return null;
  const [first, ...rest] = images;
  return (
    <div className={`card-images ${compact ? 'compact' : ''}`}>
      <figure className="card-img">
        <Img im={first} max={compact ? 200 : 300} />
        <Credit im={first} />
      </figure>
      {rest.length > 0 && (
        <details className="more-images">
          <summary>更多圖片（{rest.length}）</summary>
          {rest.map((im) => (
            <figure key={im.url} className="card-img">
              <Img im={im} max={compact ? 200 : 300} />
              <Credit im={im} />
            </figure>
          ))}
        </details>
      )}
    </div>
  );
}
