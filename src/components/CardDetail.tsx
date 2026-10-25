// 卡片詳情：分區顯示欄位、來源可點擊、連結與被引用、完整度、查證狀態
import type { Card, Index } from '../types';
import { Markdown } from '../lib/markdown';
import { Counterparts } from './Counterparts';
import { TodayRefs } from './TodayPanel';
import { fmtRange, PRECISION_LABEL, TYPE_COLOR, TYPE_ICON } from '../lib/format';

interface Props {
  card: Card; index: Index; byId: Map<string, Card>;
  onOpen: (id: string) => void; onTag: (t: string) => void; onPlace: (key: string) => void; onRoute: (id: string) => void; onChain?: (id: string) => void; onToday?: (id: string) => void;
}
const LEVEL = { core: '核心', deep: '深入', optional: '選填' };
const VERIF_CLASS: Record<string, string> = { '交叉確認': 'ok', 'AI草稿': 'draft', '爭議': 'dispute' };

export function CardDetail({ card: c, index, byId, onOpen, onTag, onPlace, onRoute, onChain, onToday }: Props) {
  const chains = (index.chains ?? []).filter((x) => x.card === c.id);
  const fws = index.frameworks.filter((f) => c.frameworks.includes(f.id));
  return (
    <article className="card-detail">
      <div className="cd-head" style={{ borderColor: TYPE_COLOR[c.type] }}>
        <span className="type-badge" style={{ background: TYPE_COLOR[c.type] }}>{TYPE_ICON[c.type]} {c.typeLabel}</span>
        <h2>{c.name}</h2>
        <div className="cd-meta">
          <span>{fmtRange(c.time.start, c.time.end)}（{PRECISION_LABEL[c.time.precision]}）</span>
          <span className={`verif ${VERIF_CLASS[c.verification] ?? ''}`}>{c.verification}</span>
          {c.summary_card && <span className="verif">摘要卡</span>}
        </div>
        <div className="completeness" title="已填欄位 ÷ 該類型全部欄位">
          <div className="bar"><div style={{ width: `${c.completeness}%` }} /></div>
          <span>完整度 {c.completeness}%</span>
        </div>
        <div className="summary-line">{c.summary_line}</div>
      </div>

      <section className="cd-sec">
        <h3>基本資料</h3>
        <dl className="kv">
          <dt>別名</dt><dd>{c.aliases.join('、')}</dd>
          <dt>文明</dt><dd>{c.civilization.join('、')}</dd>
          <dt>場域</dt><dd><b>{c.place.primary_field}</b>{c.place.secondary_fields.length > 0 && `（次：${c.place.secondary_fields.join('、')}）`}</dd>
          <dt>地點</dt>
          <dd>
            <ul className="locs">
              {c.place.locations.map((l) => (
                <li key={l.key}>
                  <button className="link" onClick={() => onPlace(l.key)}>{l.name_ancient}</button>
                  <span className="muted">（今 {l.name_modern}）</span>
                  {l.role && <span> — {l.role}</span>}
                  {l.precision !== 'exact' && <span className="tag-muted">{PRECISION_LABEL[l.precision]}</span>}
                  {l.pleiades_id && <a className="muted small" href={`https://pleiades.stoa.org/places/${l.pleiades_id}`} target="_blank" rel="noreferrer"> Pleiades</a>}
                </li>
              ))}
            </ul>
          </dd>
          {c.routes.length > 0 && <><dt>路線</dt><dd>{c.routes.map((id) => {
            const r = index.routes.find((x) => x.id === id);
            return <button key={id} className="chip" onClick={() => onRoute(id)}>{r?.name ?? id}</button>;
          })}</dd></>}
          {chains.length > 0 && <><dt>物資鏈</dt><dd>{chains.map((x) =>
            <button key={x.id} className="btn sm primary chain-btn" onClick={() => onChain?.(x.id)}>▶ 播放物資鏈：{x.name}</button>)}</dd></>}
          <dt>結構標籤</dt>
          <dd>{c.structure_tags.map((t) => <button key={t} className="chip tag" onClick={() => onTag(t)} title="用這個標籤做結構對照">{t}</button>)}</dd>
        </dl>
      </section>

      {c.sections.map((s) => (
        <section key={s.code} className={`cd-sec ${s.text ? '' : 'empty'}`}>
          <h3><span className="code">{s.code}</span>{s.title}<span className={`lvl lvl-${s.level}`}>{LEVEL[s.level]}</span></h3>
          {!s.text ? <p className="muted">（未填）</p> : s.role === 'lens' && s.sub ? (
            <div className="lens">
              <p className="lens-status">⚠ {c.lens_status}</p>
              {['李彔', '哈拉瑞'].map((k) => (
                <div key={k} className="lens-col"><h4>{k}</h4><Markdown text={s.sub![k]?.text ?? '（未填）'} sources={c.sources} /></div>
              ))}
            </div>
          ) : <Markdown text={s.text} sources={c.sources} />}
        </section>
      ))}

      <Counterparts card={c} byId={byId} onOpen={onOpen} />
      <TodayRefs card={c} index={index} onToday={(id) => onToday?.(id)} onChain={(id) => onChain?.(id)} />

      {fws.map((f) => (
        <section key={f.id} className="cd-sec framework">
          <h3>框架提醒：{f.name}</h3>
          <Markdown text={f.summary} sources={f.sources} />
          <p><b>主要批評</b></p>
          <ul>{f.critiques.map((cr, i) => <li key={i}><Markdown text={cr.text} sources={f.sources} /></li>)}</ul>
        </section>
      ))}

      <section className="cd-sec">
        <h3>卡片連結</h3>
        <LinkList title="連結到" ids={c.links} byId={byId} onOpen={onOpen} />
        <LinkList title="被誰引用" ids={c.backlinks} byId={byId} onOpen={onOpen} />
      </section>

      <section className="cd-sec">
        <h3>來源（{c.sources.length}）</h3>
        <ol className="sources">
          {c.sources.map((s) => (
            <li key={s.id} id={`${c.id}-${s.id}`}>
              <span className="code">{s.id}</span>
              <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a>
              <span className="muted small">（查閱 {s.accessed}）</span>
            </li>
          ))}
        </ol>
      </section>

      {(c.issues.length > 0 || c.unknownFields.length > 0) && (
        <section className="cd-sec issues">
          <h3>資料狀態</h3>
          {c.unknownFields.length > 0 && <p>查不到或僅能估計的欄位：{c.unknownFields.join('、')}</p>}
          <ul>{c.issues.map((i, k) => <li key={k} className={i.level}>{i.level === 'error' ? '錯誤' : '警告'}：{i.msg}</li>)}</ul>
        </section>
      )}
      <p className="muted small file">檔案：{c.file}</p>
    </article>
  );
}

function LinkList({ title, ids, byId, onOpen }: { title: string; ids: string[]; byId: Map<string, Card>; onOpen: (id: string) => void }) {
  return (
    <div className="linklist">
      <span className="muted">{title}：</span>
      {ids.length === 0 ? <span className="muted">無</span> : ids.map((id) => {
        const t = byId.get(id);
        return <button key={id} className="chip" style={{ borderColor: t ? TYPE_COLOR[t.type] : undefined }} onClick={() => onOpen(id)}>{t?.name ?? id}</button>;
      })}
    </div>
  );
}
