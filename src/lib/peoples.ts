// 人群圖層的資料（public/data/peoples*.json，由 scripts/lib/peoples.ts 產生）：打開圖層時才下載
import type { Source } from '../types';

export interface PItem { t: string; p?: number; v?: string }
export interface PFamily { id: string; zh: string; en: string; color: string; note: string; hatch?: boolean }
export interface PCountry { zh: string; fam: string; groups: PItem[]; gy: string; method: string; methodKey: string; langs: PItem[]; ly: string; note: string; src: string }
export interface PTribe { id: string; zh: string; en: string; lat?: number; lng?: number; pop?: string; since?: string; schematic?: boolean; src?: string[] }
export interface PTaiwan {
  data_as_of: string; sources: Source[];
  groups: { zh: string; value: string; note: string; src: string[] }[];
  contrast: { title: string; text: string; src: string[] }; top3: { text: string; src: string[] };
  tribes: PTribe[]; plains: PTribe[]; plains_note: string; plains_src: string[];
}
export interface Peoples {
  factbook: { title: string; mirror: string; mirror_date: string; license: string };
  glottolog: string; families: PFamily[]; countries: Record<string, PCountry>; taiwan: PTaiwan;
}
/** 語言點：[名稱, 緯度, 經度, 語系, Glottocode] */
export type PLang = [string, number, number, string, string];

const base = () => import.meta.env.BASE_URL;
let pData: Promise<Peoples> | null = null;
let pGeo: Promise<any> | null = null;
let pLangs: Promise<PLang[]> | null = null;
export const loadPeoples = () => (pData ??= fetch(`${base()}data/peoples.json`).then((r) => r.json()));
export const loadPeopleGeo = () => (pGeo ??= fetch(`${base()}data/peoples-countries.geojson`).then((r) => r.json()));
export const loadPeopleLangs = () => (pLangs ??= fetch(`${base()}data/peoples-langs.json`).then((r) => r.json()).then((j) => j.languages));

/** 人群圖層的面板：'intro' 說明＋圖例、'about' 為什麼不畫人種、其他＝Natural Earth 國名（例如 'Taiwan'） */
export const PEOPLE_INTRO = 'intro';
export const PEOPLE_ABOUT = 'about';
