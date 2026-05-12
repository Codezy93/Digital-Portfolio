import AnimatedReveal from '../molecules/AnimatedReveal.jsx';
import ElsewhereLink from '../molecules/ElsewhereLink.jsx';

export default function Contact({ contact }) {
  const h = contact.heading;
  return (
    <section id={contact.id} className="section bordered" style={{ paddingBottom: 80 }}>
      <AnimatedReveal target=".chapter, .contact-headline, .contact-email, .elsewhere-l, .elsewhere-row">
        <div className="chapter mono">{contact.chapter}</div>
        <h2 className="contact-headline">
          {h.line1Pre} <span className="serif" style={{ color: 'var(--accent)' }}>{h.line1Accent}</span><br/>
          {h.line2}<br/>
          {h.line3}<span style={{ color: 'var(--accent)' }}>{h.dot}</span>
        </h2>
        <div className="contact-grid">
          <a className="contact-email" href={`mailto:${contact.email}`}>
            <div className="contact-email-l">{contact.emailLabel}</div>
            <div className="contact-email-v">
              {contact.email.split('@')[0]}<span className="at">@</span>{contact.email.split('@')[1]}
            </div>
          </a>
          <div>
            <div className="elsewhere-l">{contact.elsewhereLabel}</div>
            {contact.elsewhere.map(x => <ElsewhereLink key={x.k} {...x} />)}
          </div>
        </div>
      </AnimatedReveal>
    </section>
  );
}
