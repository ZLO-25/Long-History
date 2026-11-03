// 圖片暫存工具：把卡片 frontmatter 的 images 區塊抽出到 data/pending-images.yaml（或放回去）。
// 用途：寫卡時環境打不開 Wikimedia Commons、授權沒查證，先不上線；查證完再放回。
//   npx tsx scripts/images-pending.ts strip            抽出全部卡片的 images → data/pending-images.yaml
//   npx tsx scripts/images-pending.ts restore [id…]    放回（不給 id 就全部放回），放回後從暫存檔移除
// 區塊以文字原樣搬動（不經 YAML 重排），所以註解、引號都保留。
import fs from 'node:fs';
import path from 'node:path';

const PENDING = 'data/pending-images.yaml';
const cmd = process.argv[2];
const onlyIds = process.argv.slice(3);

const cardFiles = fs.readdirSync('cards').flatMap((d) => {
  const dir = path.join('cards', d);
  return fs.statSync(dir).isDirectory() ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => path.join(dir, f)) : [];
});

function split(text: string) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/.exec(text);
  if (!m) throw new Error('沒有 frontmatter');
  return { fm: m[1], rest: text.slice(m[0].length), nl: m[2] || '\n' };
}
function idOf(fm: string) { return /^id:\s*(\S+)/m.exec(fm)?.[1]; }

// 把 frontmatter 切成「頂層鍵區塊」陣列，每塊＝頂層鍵那行＋後面縮排／空行
function blocks(fm: string): string[][] {
  const out: string[][] = [];
  for (const line of fm.split('\n')) {
    if (/^[A-Za-z_][\w-]*:/.test(line) || out.length === 0) out.push([line]);
    else out[out.length - 1].push(line);
  }
  return out;
}

function readPending(): Record<string, string> {
  if (!fs.existsSync(PENDING)) return {};
  const txt = fs.readFileSync(PENDING, 'utf8');
  const res: Record<string, string> = {};
  const re = /^# @card (\S+)\n([\s\S]*?)(?=^# @card |\s*$(?![\s\S]))/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(txt))) res[m[1]] = m[2].replace(/\n+$/, '');
  return res;
}
function writePending(p: Record<string, string>) {
  const ids = Object.keys(p).sort();
  if (!ids.length) { if (fs.existsSync(PENDING)) fs.unlinkSync(PENDING); return; }
  const head = '# 暫存的卡片圖片（授權尚未查證，先不上線）。\n# 查證方式：打開每筆 page 的 Commons 檔案頁，確認授權是 Public domain／CC0／CC BY，再把 license 改成實際字樣，\n# 然後 `npx tsx scripts/images-pending.ts restore <card-id>` 放回卡片。\n# 格式：每段以「# @card <id>」開頭，內容就是該卡 frontmatter 的 images 區塊原文。\n\n';
  fs.writeFileSync(PENDING, head + ids.map((id) => `# @card ${id}\n${p[id]}\n`).join('\n'));
}

if (cmd === 'strip') {
  const pending = readPending();
  let n = 0;
  for (const f of cardFiles) {
    const text = fs.readFileSync(f, 'utf8');
    const { fm, rest, nl } = split(text);
    const id = idOf(fm); if (!id) continue;
    if (onlyIds.length && !onlyIds.includes(id)) continue;
    const bl = blocks(fm);
    const i = bl.findIndex((b) => /^images:/.test(b[0]));
    if (i < 0) continue;
    const img = bl.splice(i, 1)[0];
    while (img.length && img[img.length - 1].trim() === '') img.pop();
    pending[id] = img.join('\n');
    fs.writeFileSync(f, `---${nl}${bl.map((b) => b.join('\n')).join('\n')}${nl}---${nl}${rest}`);
    n++;
  }
  writePending(pending);
  console.log(`抽出 ${n} 張卡的 images → ${PENDING}（共暫存 ${Object.keys(pending).length} 張）`);
} else if (cmd === 'restore') {
  const pending = readPending();
  const ids = onlyIds.length ? onlyIds : Object.keys(pending);
  let n = 0;
  for (const id of ids) {
    if (!pending[id]) { console.warn(`暫存檔沒有 ${id}`); continue; }
    const f = cardFiles.find((x) => idOf(split(fs.readFileSync(x, 'utf8')).fm) === id);
    if (!f) { console.warn(`找不到卡片 ${id}`); continue; }
    const text = fs.readFileSync(f, 'utf8');
    const { fm, rest, nl } = split(text);
    const bl = blocks(fm);
    if (bl.some((b) => /^images:/.test(b[0]))) { console.warn(`${id} 已經有 images，略過`); continue; }
    // 放在 importance 之前（沒有就放 learn 之前，再沒有就放最後）
    let at = bl.findIndex((b) => /^importance:/.test(b[0]));
    if (at < 0) at = bl.findIndex((b) => /^learn:/.test(b[0]));
    if (at < 0) at = bl.length;
    bl.splice(at, 0, pending[id].split('\n'));
    fs.writeFileSync(f, `---${nl}${bl.map((b) => b.join('\n')).join('\n')}${nl}---${nl}${rest}`);
    delete pending[id]; n++;
  }
  writePending(pending);
  console.log(`放回 ${n} 張卡的 images；暫存檔剩 ${Object.keys(pending).length} 張`);
} else {
  console.log('用法：npx tsx scripts/images-pending.ts strip | restore [id…]');
  process.exit(1);
}
