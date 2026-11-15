import { useEffect, useState } from 'react';

function useQuery(q: string) {
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return m;
}
export const useIsMobile = () => useQuery('(max-width: 768px)');
/** 平板直向（769–1100px 寬、高大於寬）：學習模式不用桌機三欄（閱讀欄只剩 400 多 px），改用手機那種單欄加分頁（地圖另一頁） */
export const useTabletPortrait = () => useQuery('(min-width: 769px) and (max-width: 1100px) and (orientation: portrait)');
