import AccentHeading from '../atoms/AccentHeading.jsx';
import AnimatedReveal from '../molecules/AnimatedReveal.jsx';
import ProjectCard from '../molecules/ProjectCard.jsx';
import CtaIcon from '../atoms/CtaIcon.jsx';

export default function Work({ work, onOpenProject }) {
  return (
    <section id={work.id} className="section">
      <AnimatedReveal target=".section-head, .project-card, .work-cta">
        <div className="section-head">
          <div>
            <div className="chapter mono">{work.chapter}</div>
            <AccentHeading heading={work.heading} />
          </div>
          <p className="section-sub section-head-sub">{work.sub}</p>
        </div>
        <div className="project-grid">
          {work.projects.map(p => (
            <ProjectCard key={p.id} project={p} onOpen={onOpenProject} />
          ))}
        </div>
        <div className="center-cta work-cta">
          <a className="cta-pri cta-large" href={work.ctaAll.href} target="_blank" rel="noreferrer">
            <CtaIcon kind={work.ctaAll.icon} size={15} />
            {work.ctaAll.label}
            <span className="cta-meta mono">{work.ctaAll.meta}</span>
            <span style={{ fontSize: 14 }}>↗</span>
          </a>
        </div>
      </AnimatedReveal>
    </section>
  );
}
