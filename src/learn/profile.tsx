// 姓名／班級／座號：學生自己填，只存這台瀏覽器（progress.profile）；列印、匯出、分享碼都會帶
import type { Progress } from './progress';

export function ProfileFields({ p, update }: { p: Progress; update: (f: (p: Progress) => Progress) => void }) {
  const w = p.profile ?? {};
  const set = (k: 'name' | 'cls' | 'no', v: string) => update((o) => ({ ...o, profile: { ...o.profile, [k]: v } }));
  return (
    <div className="profile-fields no-print">
      <label>姓名<input type="text" value={w.name ?? ''} onChange={(e) => set('name', e.target.value)} autoComplete="off" maxLength={20} /></label>
      <label>班級<input type="text" value={w.cls ?? ''} onChange={(e) => set('cls', e.target.value)} autoComplete="off" maxLength={12} placeholder="例：801" /></label>
      <label>座號<input type="text" inputMode="numeric" value={w.no ?? ''} onChange={(e) => set('no', e.target.value)} autoComplete="off" maxLength={4} /></label>
    </div>
  );
}
/** 列印時顯示的一行（輸入框列印不好看） */
export const ProfileLine = ({ p }: { p: Progress }) => (
  <p className="profile-line">姓名：<u>{p.profile?.name || '　　　　'}</u>　班級：<u>{p.profile?.cls || '　　　'}</u>　座號：<u>{p.profile?.no || '　　'}</u></p>
);
