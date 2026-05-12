import { useEffect, useState } from 'react';

function useClock(tz) {
  const [s, setS] = useState('');
  useEffect(() => {
    const tick = () => {
      const t = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(new Date());
      setS(t);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [tz]);
  return s;
}

export default function HeroMeta({ availability, location, tz, tzLabel }) {
  const t = useClock(tz);
  return (
    <div className="hero-meta mono">
      <div>
        <div><span className="pulse" />{availability}</div>
        <div style={{ color: 'var(--mute2)' }}>{location.toUpperCase()}</div>
      </div>
      <div className="hero-meta-mid">
        <div>{tzLabel} {t}</div>
        <div>—</div>
      </div>
      <div className="hero-meta-right">
        <div>(01) PORTFOLIO — 2026</div>
        <div>SCROLL TO CONTINUE ↓</div>
      </div>
    </div>
  );
}
