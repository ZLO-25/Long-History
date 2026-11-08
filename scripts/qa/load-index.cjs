// QA 共用：抓 index.json 並併入卡片長內文 index-detail.json（和網頁 src/App.tsx mergeDetail 相同）
module.exports = async function loadIndex(base) {
  const [ix, d] = await Promise.all(['index.json', 'index-detail.json'].map(async (f) => (await fetch(base + f)).json()));
  ix.cards = ix.cards.map((c) => {
    const x = d.cards[c.id];
    if (!x) return c;
    const { learn, ...rest } = x;
    return { ...c, ...rest, learn: c.learn ? { ...c.learn, ...learn } : null };
  });
  return ix;
};
