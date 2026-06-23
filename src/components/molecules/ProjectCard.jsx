import ProjectThumb from '../atoms/ProjectThumb.jsx';
import SkillChip from '../atoms/SkillChip.jsx';

export default function ProjectCard({ project, onOpen }) {
  const links = project.details?.links || [];
  const githubHref = project.github || links.find(l => /github/i.test(l.label))?.href;
  const demoHref = project.demo || links.find(l => /demo|live|site/i.test(l.label))?.href;

  const stop = (e) => e.stopPropagation();

  return (
    <article className="project-card" onClick={() => onOpen(project)}>
      <div className="thumb-wrap">
        <div className="thumb-inner">
          <ProjectThumb src={project.thumb} alt={project.title} />
        </div>
        <div className="thumb-overlay" />
        <div className="thumb-num">({project.num}) / {project.year}</div>
        <div className="thumb-tag">{project.tag.toUpperCase()}</div>
      </div>
      <div className="project-body">
        <div className="project-row">
          <div className="project-title">{project.title}</div>
          <div className="project-case">CASE <span className="arrow">→</span></div>
        </div>
        <p className="project-blurb">{project.blurb}</p>
        <div className="chip-row">
          {project.stack.map(s => <SkillChip key={s} name={s} />)}
        </div>
        <div className="project-actions">
          {demoHref && (
            <a className="proj-btn proj-btn-pri" href={demoHref} target="_blank" rel="noreferrer" onClick={stop}>
              Demo <span aria-hidden>↗</span>
            </a>
          )}
          {githubHref && (
            <a className="proj-btn" href={githubHref} target="_blank" rel="noreferrer" onClick={stop}>
              GitHub <span aria-hidden>↗</span>
            </a>
          )}
          <button
            type="button"
            className="proj-btn"
            onClick={(e) => { stop(e); onOpen(project); }}
          >
            More info <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
