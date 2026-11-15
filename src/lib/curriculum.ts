// 課綱條目清單（data/curriculum.yaml → public/data/curriculum.json）。只有「課綱對照」頁與課的封面用，打開才抓，不放進 home.json
import { useEffect, useState } from 'react';
import type { CurriculumItem } from '../types';

let cache: Promise<CurriculumItem[]> | null = null;
export function loadCurriculum(): Promise<CurriculumItem[]> {
  cache ??= fetch(`${import.meta.env.BASE_URL}data/curriculum.json`)
    .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
    .then((d) => (Array.isArray(d?.items) ? (d.items as CurriculumItem[]) : []))
    .catch((e) => { cache = null; throw e; });
  return cache;
}

/** items：null＝還在抓；failed＝抓不到（頁面照樣能用，只是看不到條目文字） */
export function useCurriculum(enabled = true) {
  const [items, setItems] = useState<CurriculumItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    let live = true;
    loadCurriculum().then((x) => live && setItems(x), () => live && setFailed(true));
    return () => { live = false; };
  }, [enabled]);
  return { items, failed };
}
