import CtaIcon from '../atoms/CtaIcon.jsx';

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
}

export default function HeroCta({ cta }) {
  const cls = cta.variant === 'primary' ? 'cta-pri' : 'cta-sec';
  if (cta.id) {
    return (
      <a className={cls} href={`#${cta.id}`} onClick={(e) => { e.preventDefault(); scrollTo(cta.id); }}>
        {cta.label} <CtaIcon kind={cta.icon} />
      </a>
    );
  }
  const ext = cta.href?.startsWith('http');
  return (
    <a className={cls} href={cta.href} target={ext ? '_blank' : undefined} rel={ext ? 'noreferrer' : undefined}>
      <CtaIcon kind={cta.icon} /> {cta.label}
    </a>
  );
}
