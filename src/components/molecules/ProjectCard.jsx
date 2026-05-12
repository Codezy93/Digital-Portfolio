import ProjectThumb from '../atoms/ProjectThumb.jsx';
import SkillChip from '../atoms/SkillChip.jsx';

export default function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card" onClick={() => onOpen(project)}>
      <div className="thumb-wrap">
        <div className="thumb-inner">
          <ProjectThumb kind={project.thumb} />
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
      </div>
    </article>
  );
}
