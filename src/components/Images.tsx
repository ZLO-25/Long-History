// 卡片圖片（docs/card-fields.md「圖片」）：只放 Wikimedia Commons 上的公有領域／CC 作品，
// 每張都標作者、年代、收藏處與授權，點圖開 Commons 檔案頁。第一張直接顯示，其餘收在「更多圖片」。
import type { CardImage } from '../types';
import './images.css';

function Credit({ im }: { im: CardImage }) {
  return (
    <figcaption>
      <span className="img-caption">{im.caption}</span>
      <span className="img-credit muted small">{im.title}・{im.creator}・{im.year}{im.holder ? `・${im.holder}` : ''}・<a href={im.page} target="_blank" rel="noreferrer">Wikimedia Commons</a>（{im.license}）</span>
    </figcaption>
  );
}

export function CardImages({ images, compact }: { images: CardImage[]; compact?: boolean }) {
  if (!images?.length) return null;
  const [first, ...rest] = images;
  return (
    <div className={`card-images ${compact ? 'compact' : ''}`}>
      <figure className="card-img">
        <a href={first.page} target="_blank" rel="noreferrer" title="在 Wikimedia Commons 看原圖與授權"><img src={first.url} alt={first.title} loading="lazy" /></a>
        <Credit im={first} />
      </figure>
      {rest.length > 0 && (
        <details className="more-images">
          <summary>更多圖片（{rest.length}）</summary>
          {rest.map((im) => (
            <figure key={im.url} className="card-img">
              <a href={im.page} target="_blank" rel="noreferrer"><img src={im.url} alt={im.title} loading="lazy" /></a>
              <Credit im={im} />
            </figure>
          ))}
        </details>
      )}
    </div>
  );
}
