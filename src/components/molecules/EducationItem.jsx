export default function EducationItem({ from, to, degree, org, loc, gpa }) {
  return (
    <article className="edu-card">
      <div className="edu-head">
        <div className="edu-when">{from}—{to} · {loc.toUpperCase()}</div>
        <div className="edu-gpa">GPA · {gpa}</div>
      </div>
      <div className="edu-degree">{degree}</div>
      <div className="edu-org serif">{org}</div>
    </article>
  );
}
