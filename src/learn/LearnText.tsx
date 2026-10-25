// 學習模式的文字：段落、清單、粗體；[s1] 代號不夾在句子裡，改成段末一個小圖示，點開才看來源（附來源分級）；
// 名詞（key_terms、結構標籤）用虛線底線標出，點一下看白話解釋與生活例子
import { Fragment, useState, type ReactNode } from 'react';
import type { Source } from '../types';
import { tierOrder } from './util';

export interface Term { term: string; plain: string; example: string }

function inline(text: string, terms: Term[], onTerm: (t: Term) => void, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  // 先切粗體，再在一般文字裡找名詞（每段只標第一次出現）
  const used = new Set<string>();
  const parts = text.split(/(\*\*.+?\*\*)/g);
  parts.forEach((part, pi) => {
    const bold = /^\*\*(.+)\*\*$/.exec(part);
    const s = bold ? bold[1] : part;
    const sorted = [...terms].sort((a, b) => b.term.length - a.term.length);
    const nodes: ReactNode[] = [];
    let rest = s, i = 0;
    while (rest) {
      let hit: { t: Term; at: number } | null = null;
      for (const t of sorted) {
        if (used.has(t.term)) continue;
        const at = rest.indexOf(t.term);
        if (at >= 0 && (!hit || at < hit.at)) hit = { t, at };
      }
      if (!hit) { nodes.push(rest); break; }
      if (hit.at > 0) nodes.push(rest.slice(0, hit.at));
      used.add(hit.t.term);
      const t = hit.t;
      nodes.push(<button key={`${key}-${pi}-${i++}`} className="term" onClick={() => onTerm(t)} title={t.plain}>{t.term}</button>);
      rest = rest.slice(hit.at + t.term.length);
    }
    out.push(bold ? <strong key={`${key}-b${pi}`}>{nodes}</strong> : <Fragment key={`${key}-t${pi}`}>{nodes}</Fragment>);
  });
  return out;
}

export function SourceList({ ids, sources }: { ids: string[]; sources: Source[] }) {
  const list = ids.map((id) => sources.find((s) => s.id === id)).filter((s): s is Source => !!s).sort(tierOrder);
  return (
    <ul className="para-src">
      {list.map((s) => (
        <li key={s.id}><span className={`tier tier-${s.tier}`}>{s.tier}{s.tier_guess ? '（推測）' : ''}</span>
          <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>
      ))}
    </ul>
  );
}

function Para({ children, refs, sources }: { children: ReactNode; refs: string[]; sources: Source[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lpara">
      <p>{children}{refs.length > 0 && <button className={`src-btn ${open ? 'on' : ''}`} onClick={() => setOpen(!open)} aria-label={`來源 ${refs.length} 筆`} title="看這段的來源">ⓘ{refs.length}</button>}</p>
      {open && <SourceList ids={refs} sources={sources} />}
    </div>
  );
}

const REF = /\[(s\d+)\]/g;
export function LearnText({ text, sources, terms = [], onTerm = () => {} }: { text: string; sources: Source[]; terms?: Term[]; onTerm?: (t: Term) => void }) {
  const blocks = String(text ?? '').split(/\n\s*\n|\n(?=\*\*)/).filter((b) => b.trim());
  return (
    <>
      {blocks.map((b, bi) => {
        const refs = [...new Set([...b.matchAll(REF)].map((m) => m[1]))];
        const clean = b.replace(REF, '').replace(/[ \t]+\n/g, '\n').trim();
        const lines = clean.split('\n').filter((l) => l.trim());
        if (lines.length && lines.every((l) => /^\s*[-*]\s+/.test(l)))
          return <div key={bi} className="lpara"><ul>{lines.map((l, li) => <li key={li}>{inline(l.replace(/^\s*[-*]\s+/, ''), terms, onTerm, `${bi}-${li}`)}</li>)}</ul>{refs.length > 0 && <Para refs={refs} sources={sources}>{null}</Para>}</div>;
        return <Para key={bi} refs={refs} sources={sources}>{lines.map((l, li) => <Fragment key={li}>{li > 0 && <br />}{inline(l, terms, onTerm, `${bi}-${li}`)}</Fragment>)}</Para>;
      })}
    </>
  );
}

// 名詞白話小卡
export function TermPop({ term, onClose }: { term: Term | null; onClose: () => void }) {
  if (!term) return null;
  return (
    <div className="term-pop" role="dialog" aria-label={`名詞：${term.term}`}>
      <button className="x" onClick={onClose} aria-label="關閉">×</button>
      <b>{term.term}</b>
      <p>{term.plain}</p>
      <p className="ex">生活例子：{term.example}</p>
    </div>
  );
}
