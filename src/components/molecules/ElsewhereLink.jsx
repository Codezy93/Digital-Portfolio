export default function ElsewhereLink({ k, v, h }) {
  return (
    <a className="elsewhere-row" href={h} target="_blank" rel="noreferrer">
      <span className="elsewhere-k">{k}</span>
      <span className="elsewhere-v">@{v} ↗</span>
    </a>
  );
}
