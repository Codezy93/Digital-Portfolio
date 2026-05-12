export default function StatRow({ stats }) {
  return (
    <div className="stats-row">
      {stats.map(s => (
        <div key={s.l}>
          <div className="stat-v">{s.v}</div>
          <div className="stat-l">{s.l}</div>
        </div>
      ))}
    </div>
  );
}
