export default function Ticker({ items }) {
  const Group = () => (
    <div className="ticker-group">
      {items.map((t, i) => (
        <span key={i} className="ticker-item">
          {t}<span className="ticker-mark">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="ticker-band">
      <div className="ticker-track mono">
        <Group /><Group />
      </div>
    </div>
  );
}
