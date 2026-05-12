import AccentHeading from '../atoms/AccentHeading.jsx';
import AnimatedReveal from '../molecules/AnimatedReveal.jsx';
import StackGroup from '../molecules/StackGroup.jsx';
import CtaIcon from '../atoms/CtaIcon.jsx';

export default function Stack({ stack }) {
  return (
    <section id={stack.id} className="section bordered">
      <AnimatedReveal target=".section-head, .stack-group, .stack-cta">
        <div className="section-head">
          <div>
            <div className="chapter mono">{stack.chapter}</div>
            <AccentHeading heading={stack.heading} />
          </div>
          <p className="section-sub section-head-sub">{stack.sub}</p>
        </div>
        <div className="stack-grid">
          {stack.groups.map(g => <StackGroup key={g.group} {...g} />)}
        </div>
        <div className="center-cta stack-cta">
          <a className="cta-pri cta-large" href={stack.ctaAll.href} target="_blank" rel="noreferrer">
            <CtaIcon kind={stack.ctaAll.icon} size={15} />
            {stack.ctaAll.label}
            <span className="cta-meta mono">{stack.ctaAll.meta}</span>
            <span style={{ fontSize: 14 }}>↗</span>
          </a>
        </div>
      </AnimatedReveal>
    </section>
  );
}
