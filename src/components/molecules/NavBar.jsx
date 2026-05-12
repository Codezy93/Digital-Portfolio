import { useEffect, useState } from 'react';

function jumpTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
}

export default function NavBar({ logo, name, kicker, links, cta }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(links[0]?.id);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let cur = links[0]?.id;
      for (const l of links) {
        const s = document.getElementById(l.id);
        if (s && s.offsetTop - 160 <= window.scrollY) cur = l.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [links]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <div className="navbar-brand">
          <svg width="28" height="28" viewBox="0 0 28 28">
            <rect width="28" height="28" rx="4" fill="#0a0e14"/>
            <text x="14" y="20" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fafbfc" fontFamily="Inter Tight, sans-serif">{logo}</text>
          </svg>
          <div className="navbar-brand-name">
            <div className="n">{name}</div>
            <div className="k">{kicker}</div>
          </div>
        </div>
        <div className="navbar-spacer" />
        <div className="navbar-links">
          {links.map(l => (
            <a key={l.id} className={active === l.id ? 'active' : ''} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); jumpTo(l.id); }}>{l.label}</a>
          ))}
        </div>
        <a className="navbar-cta" href={cta.href} target="_blank" rel="noreferrer">{cta.label} →</a>
      </div>
    </nav>
  );
}
