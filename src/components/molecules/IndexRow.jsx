function jumpTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
}

export default function IndexRow({ n, t, m, id }) {
  return (
    <a className="index-row" onClick={() => jumpTo(id)}>
      <span className="index-n">({n})</span>
      <span className="index-t">{t}</span>
      <span className="index-m">{m}</span>
    </a>
  );
}
