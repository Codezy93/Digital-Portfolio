import AccentHeading from '../atoms/AccentHeading.jsx';
import AnimatedReveal from '../molecules/AnimatedReveal.jsx';
import EducationItem from '../molecules/EducationItem.jsx';

export default function Education({ education }) {
  return (
    <section id={education.id} className="section bordered">
      <AnimatedReveal target=".section-head, .edu-card">
        <div className="section-head">
          <div>
            <div className="chapter mono">{education.chapter}</div>
            <AccentHeading heading={education.heading} />
          </div>
          <p className="section-sub section-head-sub">{education.sub}</p>
        </div>
        <div className="edu-grid">
          {education.items.map((e, i) => <EducationItem key={i} {...e} />)}
        </div>
      </AnimatedReveal>
    </section>
  );
}
