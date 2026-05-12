import SkillIcon, { prettyName } from './SkillIcon.jsx';

export default function SkillChip({ name, size = 'sm' }) {
  const cls = size === 'lg' ? 'chip chip-lg' : 'chip';
  return (
    <span className={cls}>
      <SkillIcon name={name} size={size === 'lg' ? 16 : 13} />
      <span>{prettyName(name)}</span>
    </span>
  );
}
