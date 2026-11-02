// 別名：先顯示主要的 2～3 個，其他收在「顯示更多」，使用者可以自己展開或收起
import { useState } from 'react';

export function AliasList({ aliases, main }: { aliases: string[]; main?: string[] }) {
  const [open, setOpen] = useState(false);
  const first = main && main.length ? main : aliases;
  const rest = aliases.filter((a) => !first.includes(a));
  if (!rest.length) return <>{first.join('、')}</>;
  return (
    <span className="aliases">
      <span>{first.join('、')}</span>
      {open && <span className="aliases-rest">、{rest.join('、')}</span>}
      <button type="button" className="link aliases-more" aria-expanded={open} onClick={() => setOpen(!open)}
        title={open ? '收起其他別名' : `還有 ${rest.length} 個別名（含簡體、英文、相關人物與事件）`}>
        {open ? '收起 ▴' : `…顯示更多（${rest.length}）▾`}
      </button>
    </span>
  );
}
