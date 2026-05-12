export default function Serif({ children, color, style }) {
  return <span className="serif" style={{ color, ...style }}>{children}</span>;
}
