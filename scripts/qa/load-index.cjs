// QA 共用：抓 index.json 並併入卡片長內文 index-detail.json（和網頁 src/lib/detail.ts mergeDetail 相同；detail 檔裡每張卡除了 learn 以外的欄位都直接覆蓋到卡片上，所以新增欄位不用改這裡）
module.exports = async function loadIndex(base) {
  const [ix, d] = await Promise.all(['index.json', 'index-detail.json'].map(async (f) => (await fetch(base + f)).json()));
  ix.cards = ix.cards.map((c) => {
    const x = d.cards[c.id];
    if (!x) return c;
    const { learn, ...rest } = x;
    const role = (r) => (rest.sections || []).find((x) => x.role === r)?.text ?? '';
    return { ...c, ...rest, today_hook: role('today_hook'), non_analogous: role('non_analogous'), learn: c.learn ? { ...c.learn, ...learn } : null };
  });
  ix.units = (ix.units || []).map((u) => ({ ...u, ...((d.units || {})[u.id] || {}) }));
  return ix;
};
