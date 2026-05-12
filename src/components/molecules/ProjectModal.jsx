import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import SkillChip from '../atoms/SkillChip.jsx';

function CaseSection({ index, heading, body }) {
  return (
    <section className="case-section">
      <div className="case-section-h">{String(index).padStart(2, '0')} · {heading.toUpperCase()}</div>
      <p>{body}</p>
    </section>
  );
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);

  if (!project) return null;
  const d = project.details || {};
  const meta = [
    { k: 'Role', v: d.role },
    { k: 'Team', v: d.team },
    { k: 'Duration', v: d.duration },
    { k: 'Year', v: project.year },
  ].filter(x => x.v);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header className="modal-head">
          <span className="modal-eyebrow">CASE STUDY · {project.tag.toUpperCase()}</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>
        <div className="modal-body">
          <h2>{project.title}</h2>
          <p className="modal-blurb">{project.blurb}</p>

          <div className="meta-grid">
            {meta.map(m => (
              <div key={m.k} className="meta-block">
                <div className="meta-k">{m.k}</div>
                <div className="meta-v">{m.v}</div>
              </div>
            ))}
          </div>

          {d.problem && <CaseSection index={1} heading="Problem" body={d.problem} />}
          {d.approach && <CaseSection index={2} heading="Approach" body={d.approach} />}
          {d.results && <CaseSection index={3} heading="Result" body={d.results} />}

          <div className="modal-stack">
            <div className="meta-k">STACK</div>
            <div className="chip-row" style={{ marginTop: 8 }}>
              {project.stack.map(s => <SkillChip key={s} name={s} size="lg" />)}
            </div>
          </div>

          {d.links?.length > 0 && (
            <div className="modal-links">
              {d.links.map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
