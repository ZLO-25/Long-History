// 名稱中英並列：中文照常，英文小一號灰字（對照表見 data/labels/names-en.yaml）
import { biParts } from '../lib/bilingual';

export function Bi({ name }: { name: string }) {
  const { zh, en } = biParts(name);
  return <>{zh || en}{zh && en ? <span className="en"> {en}</span> : null}</>;
}
