// 地圖名稱中英對照：讀 data/labels/ 的對照表，給 build-index 用
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { ROOT } from './cards.ts';

const read = (f: string) => YAML.parse(fs.readFileSync(path.join(ROOT, 'data/labels', f), 'utf8')) ?? {};

/** 本站地名的中英對照（中文→英文、拉丁文→中文） */
export function loadNameTable(): { en: Record<string, string>; zh: Record<string, string> } {
  const t = read('names-en.yaml');
  return { en: t.en ?? {}, zh: t.zh ?? {} };
}

// 古代疆域的政權名稱：查不到中文時，依位置給一個說明性的中文
const POLITY: Record<string, string> = read('polities-zh.yaml');
const bboxCenter = (geom: any): [number, number] => {
  let x0 = 180, x1 = -180, y0 = 90, y1 = -90;
  const walk = (c: any) => {
    if (typeof c[0] === 'number') { x0 = Math.min(x0, c[0]); x1 = Math.max(x1, c[0]); y0 = Math.min(y0, c[1]); y1 = Math.max(y1, c[1]); }
    else c.forEach(walk);
  };
  walk(geom.coordinates);
  return [(x0 + x1) / 2, (y0 + y1) / 2];
};
export function polityZh(name: string, geom: any): string {
  if (POLITY[name]) return POLITY[name];
  const [lng, lat] = bboxCenter(geom);
  if (lng >= 110 && lng <= 156 && lat >= -45 && lat <= -9) return '澳洲原住民族群';
  if (lng >= -170 && lng <= -50 && lat >= 14) return '北美原住民族群';
  if (lng >= -92 && lng <= -30 && lat < 14) return '南美原住民族群';
  return '（暫無通用中文譯名）';
}
