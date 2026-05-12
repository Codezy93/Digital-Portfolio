import SkillChip from '../atoms/SkillChip.jsx';

export default function ExperienceItem({ from, to, title, org, loc, blurb, stack }) {
  return (
    <article className="exp-row">
      <div>
        <div className="exp-when">{from.toUpperCase()} —<br/>{to.toUpperCase()}</div>
        <div className="exp-loc">{loc.toUpperCase()}</div>
      </div>
      <div>
        <div className="exp-title">{title}</div>
        <div className="exp-org serif">{org}</div>
        <p className="exp-blurb">{blurb}</p>
        <div className="chip-row">
          {stack.map(s => <SkillChip key={s} name={s} size="lg" />)}
        </div>
      </div>
    </article>
  );
}
