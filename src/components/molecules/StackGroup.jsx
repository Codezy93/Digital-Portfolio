import SkillChip from '../atoms/SkillChip.jsx';

export default function StackGroup({ group, items }) {
  return (
    <div className="stack-group">
      <div className="stack-group-h">
        <div className="stack-group-name">{group.toUpperCase()}</div>
        <div className="stack-group-n">{String(items.length).padStart(2, '0')}</div>
      </div>
      <div className="chip-row">
        {items.map(i => <SkillChip key={i} name={i} size="lg" />)}
      </div>
    </div>
  );
}
