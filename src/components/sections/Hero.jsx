import HeroMeta from '../molecules/HeroMeta.jsx';
import HeroBot from '../molecules/HeroBot.jsx';
import HeroCta from '../molecules/HeroCta.jsx';
import StatRow from '../molecules/StatRow.jsx';

export default function Hero({ hero, person, stats, modelUrl }) {
  return (
    <section id="home" className="hero">
      <HeroMeta
        availability={person.availability}
        location={person.location}
        tz={person.timezone}
        tzLabel={person.timezoneLabel}
      />

      <div className="hero-grid">
        <div>
          <div className="eyebrow mono">{hero.eyebrow}</div>
          <h1 className="hero-headline">
            {hero.headline.line1}<br/>
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.05em' }}>
              {hero.headline.line2}
              <span className="serif accent-dot">.</span>
            </span>
          </h1>
          <div className="hero-role">
            {hero.role.pre} <span className="accent">{hero.role.accent}</span>{hero.role.dot}
          </div>
          <p className="hero-intro">
            {hero.intro.before} <span className="serif" style={{ fontSize: '1.05em' }}>{hero.intro.highlight}</span>{hero.intro.after}
          </p>
          <div className="hero-ctas">
            {hero.ctas.map(c => <HeroCta key={c.label} cta={c} />)}
          </div>
        </div>

        <HeroBot url={modelUrl} skipStart={hero.modelSkipStart} />
      </div>

      <StatRow stats={stats} />
    </section>
  );
}
