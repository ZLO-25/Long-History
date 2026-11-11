// 卡片圖片（docs/card-fields.md「圖片」）：只放 Wikimedia Commons 上的公有領域／CC 作品，
// 每張都標作者、年代、收藏處與授權，點圖開 Commons 檔案頁。第一張直接顯示，其餘收在「更多圖片」。
import { useState } from 'react';
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

// 效能：圖還沒載入就照原圖比例留好位置（最高 300px、精簡版 200px，也不放大超過原圖），載入後版面不會往下跳
function Img({ im, max, title }: { im: CardImage; max: number; title?: string }) {
  const [bad, setBad] = useState(false);
  // 圖載不到（Commons 暫時擋掉或離線）：不顯示破圖圖示，改成一句說明＋原圖連結
  if (bad) return <a className="img-missing" href={im.page} target="_blank" rel="noreferrer">🖼 圖片暫時載不到。到 Wikimedia Commons 看「{im.title}」↗</a>;
  const box = im.w && im.h ? { aspectRatio: `${im.w} / ${im.h}`, width: `min(100%, ${Math.round((max * im.w) / im.h)}px, ${im.w}px)` } : undefined;
  return (
    <a href={im.page} target="_blank" rel="noreferrer" title={title} className={box ? 'sized' : undefined} style={box}>
      <img src={im.url} alt={im.title} loading="lazy" decoding="async" width={im.w} height={im.h} onError={() => setBad(true)} />
    </a>
  );
}

export function CardImages({ images, compact }: { images: CardImage[]; compact?: boolean }) {
  if (!images?.length) return null;
  const [first, ...rest] = images;
  return (
    <div className={`card-images ${compact ? 'compact' : ''}`}>
      <figure className="card-img">
        <Img im={first} max={compact ? 200 : 300} title="在 Wikimedia Commons 看原圖與授權" />
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
