import IndexRow from '../molecules/IndexRow.jsx';
import StatusPanel from '../molecules/StatusPanel.jsx';

export default function IndexBand({ index }) {
  return (
    <section id="index" className="index-band">
      <div className="index-grid">
        <div className="index-list">
          {index.items.map(it => <IndexRow key={it.n} {...it} />)}
        </div>
        <StatusPanel status={index.status} />
      </div>
    </section>
  );
}
