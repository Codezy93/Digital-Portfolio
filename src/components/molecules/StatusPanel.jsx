function jumpTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
}

export default function StatusPanel({ status }) {
  return (
    <aside className="status-panel">
      <div className="status-label mono">{status.label}</div>
      <div className="status-headline">
        {status.headline} <span className="serif" style={{ color: 'var(--accent)' }}>{status.headlineAccent}</span>
      </div>
      <div className="status-rows">
        {status.rows.map(r => (
          <div key={r.k} className="status-row">
            <span className="status-k mono">{r.k.toUpperCase()}</span>
            <span className="status-v">{r.v}</span>
          </div>
        ))}
      </div>
      <button className="cta-pri status-cta" onClick={() => jumpTo(status.cta.id)}>
        {status.cta.label} →
      </button>
    </aside>
  );
}
