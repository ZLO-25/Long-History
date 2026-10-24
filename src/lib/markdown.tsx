// 極簡 Markdown：段落、清單、粗體，以及把 [s1] 轉成可點擊的來源連結
import { Fragment, type ReactNode } from 'react';
import type { Source } from '../types';

function inline(text: string, sources: Source[], keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(s\d+)\]/g;
  let last = 0; let m: RegExpExecArray | null; let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={`${keyBase}b${i++}`}>{m[1]}</strong>);
    else {
      const s = sources.find((x) => x.id === m![2]);
      out.push(s
        ? <a key={`${keyBase}r${i++}`} className="ref" href={s.url} target="_blank" rel="noreferrer" title={s.title}>[{s.id}]</a>
        : <span key={`${keyBase}r${i++}`} className="ref missing">[{m[2]}?]</span>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ text, sources }: { text: string; sources: Source[] }) {
  const blocks = text.split(/\n\s*\n/);
  return (
    <>
      {blocks.map((b, bi) => {
        const lines = b.split('\n').filter((l) => l.trim());
        if (lines.length && lines.every((l) => /^\s*[-*]\s+/.test(l)))
          return <ul key={bi}>{lines.map((l, li) => <li key={li}>{inline(l.replace(/^\s*[-*]\s+/, ''), sources, `${bi}-${li}`)}</li>)}</ul>;
        return <p key={bi}>{lines.map((l, li) => <Fragment key={li}>{li > 0 && <br />}{inline(l, sources, `${bi}-${li}`)}</Fragment>)}</p>;
      })}
    </>
  );
}

// 匯出 Markdown 時把 [s1] 換成 [s1](url)
export const linkRefs = (text: string, sources: Source[]) =>
  text.replace(/\[(s\d+)\]/g, (all, id) => { const s = sources.find((x) => x.id === id); return s ? `[${id}](${s.url})` : all; });
