import AccentHeading from '../atoms/AccentHeading.jsx';
import AnimatedReveal from '../molecules/AnimatedReveal.jsx';
import ExperienceItem from '../molecules/ExperienceItem.jsx';

export default function Experience({ experience }) {
  return (
    <section id={experience.id} className="section bordered">
      <AnimatedReveal target=".section-head, .exp-row">
        <div className="section-head">
          <div>
            <div className="chapter mono">{experience.chapter}</div>
            <AccentHeading heading={experience.heading} />
          </div>
          <p className="section-sub section-head-sub">{experience.sub}</p>
        </div>
        {experience.items.map((e, i) => <ExperienceItem key={i} {...e} />)}
      </AnimatedReveal>
    </section>
  );
}
