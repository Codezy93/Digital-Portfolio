export default function AccentHeading({ heading }) {
  return (
    <h2 className="section-h2">
      {heading.pre} <span className="serif" style={{ color: 'var(--accent)' }}>{heading.accent}</span>{heading.post}
    </h2>
  );
}
