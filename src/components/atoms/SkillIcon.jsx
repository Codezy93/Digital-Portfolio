const ICONS = {
  Python: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s} fill="none">
      <path d="M15.9 2c-3.5 0-3.3 1.5-3.3 1.5v1.6h3.4v.5H10s-2.3-.3-2.3 3.3c0 3.6 2 3.5 2 3.5h1.3v-1.7s-.1-2 2-2h3.4s1.9 0 1.9-1.8V4c0-.1 0-2-2.5-2zm-1.9 1.1c.3 0 .6.3.6.6s-.3.7-.6.7-.7-.3-.7-.7.3-.6.7-.6z" fill="#3776AB"/>
      <path d="M16.1 30c3.5 0 3.3-1.5 3.3-1.5v-1.6H16v-.5h6s2.3.3 2.3-3.3c0-3.6-2-3.5-2-3.5h-1.3v1.7s.1 2-2 2h-3.4s-1.9 0-1.9 1.8V28c0 .1 0 2 2.5 2zm1.9-1.1c-.3 0-.6-.3-.6-.6s.3-.7.6-.7.7.3.7.7-.3.6-.7.6z" fill="#FFD43B"/>
    </svg>
  ),
  PyTorch: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <circle cx="20" cy="9" r="1.6" fill="#EE4C2C"/>
      <path d="M16 4l-7 7a9.9 9.9 0 1 0 14 0L16 4zm0 3.8l4.9 4.9a7 7 0 1 1-9.9 0L16 7.8z" fill="#EE4C2C"/>
    </svg>
  ),
  TensorFlow: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M16 3L4 9v14l5 3V13l7-4v-6z" fill="#FF6F00"/>
      <path d="M16 3v6l7 4v8l-4 2v5l9-5V9L16 3z" fill="#FF9E40"/>
      <path d="M12 16v7l4 2v-6l4-2v-5l-8 4z" fill="#FFA726"/>
    </svg>
  ),
  Keras: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <rect x="2" y="2" width="28" height="28" rx="4" fill="#D00000"/>
      <path d="M9 9v14h3v-5l2-2 4 7h4l-6-9 6-5h-4l-6 5V9H9z" fill="#fff"/>
    </svg>
  ),
  JAX: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M16 4l10 6v12l-10 6-10-6V10l10-6z" fill="none" stroke="#5E35B1" strokeWidth="1.5"/>
      <text x="16" y="20" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5E35B1" fontFamily="monospace">JAX</text>
    </svg>
  ),
  Scikit: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <circle cx="16" cy="16" r="12" fill="#F7931E"/>
      <circle cx="11" cy="13" r="2" fill="#fff"/><circle cx="20" cy="12" r="1.5" fill="#fff"/>
      <circle cx="22" cy="19" r="2" fill="#fff"/><circle cx="13" cy="21" r="1.5" fill="#fff"/>
    </svg>
  ),
  Pandas: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <rect x="6" y="4" width="4" height="24" fill="#130754"/>
      <rect x="6" y="10" width="4" height="6" fill="#E70488"/>
      <rect x="14" y="4" width="4" height="24" fill="#130754"/>
      <rect x="22" y="4" width="4" height="24" fill="#FFCA00"/>
    </svg>
  ),
  NumPy: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M16 3l12 7v12l-12 7L4 22V10l12-7z" fill="none" stroke="#4DABCF" strokeWidth="1.2"/>
    </svg>
  ),
  OpenCV: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <circle cx="10" cy="9" r="4" fill="#FF1818"/>
      <circle cx="22" cy="9" r="4" fill="#5FFA68"/>
      <circle cx="16" cy="22" r="4" fill="#2A78DB"/>
    </svg>
  ),
  Flask: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M13 4h6v6l5 14c1 3-1 4-3 4H13c-2 0-4-1-3-4l5-14V4z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Django: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <rect x="4" y="4" width="24" height="24" rx="2" fill="#092E20"/>
      <text x="16" y="21" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="serif">dj</text>
    </svg>
  ),
  ReactJs: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <circle cx="16" cy="16" r="2" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1.2" fill="none">
        <ellipse cx="16" cy="16" rx="11" ry="4"/>
        <ellipse cx="16" cy="16" rx="11" ry="4" transform="rotate(60 16 16)"/>
        <ellipse cx="16" cy="16" rx="11" ry="4" transform="rotate(120 16 16)"/>
      </g>
    </svg>
  ),
  NextJS: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <circle cx="16" cy="16" r="13" fill="#000"/>
      <path d="M11 10v12M11 10l9.5 12M21 10v9" stroke="#fff" strokeWidth="1.5"/>
    </svg>
  ),
  Node: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M16 2L3 9v14l13 7 13-7V9L16 2z" fill="#539E43"/>
      <text x="16" y="21" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="monospace">JS</text>
    </svg>
  ),
  Streamlit: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M4 10l12 6 12-6-12 16L4 10z" fill="#FF4B4B"/>
    </svg>
  ),
  Electron: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <circle cx="16" cy="16" r="3" fill="#2B2E4A"/>
      <g stroke="#2B2E4A" strokeWidth="1.2" fill="none">
        <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(30 16 16)"/>
        <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(90 16 16)"/>
        <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(150 16 16)"/>
      </g>
    </svg>
  ),
  AWS: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <text x="16" y="14" textAnchor="middle" fontSize="9" fontWeight="800" fill="#232F3E">aws</text>
      <path d="M5 21c6 2 16 2 22 0" stroke="#FF9900" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  Docker: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <g fill="#0DB7ED">
        <rect x="3" y="14" width="4" height="4"/><rect x="8" y="14" width="4" height="4"/>
        <rect x="13" y="14" width="4" height="4"/><rect x="8" y="9" width="4" height="4"/>
        <rect x="13" y="9" width="4" height="4"/><rect x="13" y="4" width="4" height="4"/>
      </g>
    </svg>
  ),
  Git: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M29.5 14.6L17.4 2.5c-.7-.7-1.8-.7-2.5 0l-2.5 2.5 3.2 3.2c.8-.3 1.7 0 2.3.5.6.6.8 1.5.5 2.3l3.1 3.1c.8-.3 1.7 0 2.3.5.9.9.9 2.3 0 3.2-.9.9-2.3.9-3.2 0-.6-.6-.8-1.6-.5-2.4l-2.9-2.9v7.6c.2.1.4.3.6.4.9.9.9 2.3 0 3.2-.9.9-2.3.9-3.2 0-.9-.9-.9-2.3 0-3.2.2-.2.5-.4.7-.5v-7.7c-.3-.1-.5-.3-.7-.5-.6-.6-.8-1.6-.5-2.4l-3.1-3.1L2.5 15c-.7.7-.7 1.8 0 2.5l12.1 12.1c.7.7 1.8.7 2.5 0l12.4-12.5c.7-.6.7-1.7 0-2.4z" fill="#F05032"/>
    </svg>
  ),
  GitHub: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M16 2C8 2 2 8 2 16c0 6 4 11 10 13v-5c-4 1-5-2-5-2-1-2-2-2-2-2-1-1 0-1 0-1 2 0 3 2 3 2 2 3 5 2 6 2 0-2 1-2 2-3-3 0-6-2-6-6 0-2 0-3 1-4 0-1 0-3 0-3s2 0 4 1c2-1 4-1 4-1s0 2 0 3c1 1 1 2 1 4 0 4-3 6-6 6 1 1 2 2 2 4v6c5-2 10-8 10-13 0-8-6-14-14-14z" fill="#181717"/>
    </svg>
  ),
  MongoDB: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M16 2c1 4 8 10 8 17 0 5-4 10-8 11-4-1-8-6-8-11 0-7 7-13 8-17z" fill="#47A248"/>
    </svg>
  ),
  MySQL: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <ellipse cx="12" cy="11" rx="7" ry="4" fill="none" stroke="#F29111" strokeWidth="1.2"/>
      <path d="M3 22c3-2 8-3 14-3 3 0 6 1 8 2l-2 3c-2-1-4-2-8-2-6 0-10 2-12 3v-3z" fill="#00758F"/>
    </svg>
  ),
  PostgreSQL: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <ellipse cx="16" cy="16" rx="13" ry="13" fill="#336791"/>
      <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" fontFamily="serif">P</text>
    </svg>
  ),
  Firebase: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M6 24L11 4l4 9-9 11zM15 13l3 5-12 6 9-11zM22 6l4 18L6 24 22 6z" fill="#FFA000"/>
    </svg>
  ),
  Cassandra: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <circle cx="16" cy="16" r="12" fill="#1287B1"/>
    </svg>
  ),
  Linux: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <ellipse cx="16" cy="22" rx="8" ry="6" fill="#000"/>
      <circle cx="13" cy="14" r="2" fill="#fff"/><circle cx="19" cy="14" r="2" fill="#fff"/>
    </svg>
  ),
  Java: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M14 4s-3 6 2 9c-4 2-5 6 0 8" fill="none" stroke="#EA2D2E" strokeWidth="1.3"/>
      <path d="M8 22c3 2 14 2 16 0" stroke="#0074BD" strokeWidth="1.3" fill="none"/>
    </svg>
  ),
  Cpp: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M16 3l12 7v12l-12 7-12-7V10l12-7z" fill="#00599C"/>
      <text x="16" y="21" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">C++</text>
    </svg>
  ),
  JS: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <rect x="3" y="3" width="26" height="26" fill="#F7DF1E"/>
      <text x="17" y="25" textAnchor="middle" fontSize="12" fontWeight="800" fill="#000">JS</text>
    </svg>
  ),
  HTML: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M4 3l2 26 10 3 10-3 2-26H4z" fill="#E34F26"/>
      <path d="M16 6v23l8-2 2-21H16z" fill="#EF652A"/>
    </svg>
  ),
  LangChain: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <circle cx="11" cy="11" r="5" fill="none" stroke="#1C3C3C" strokeWidth="2"/>
      <circle cx="21" cy="21" r="5" fill="none" stroke="#1C3C3C" strokeWidth="2"/>
      <path d="M14 14l4 4" stroke="#1C3C3C" strokeWidth="2"/>
    </svg>
  ),
  Transformers: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <text x="16" y="24" textAnchor="middle" fontSize="22">🤗</text>
    </svg>
  ),
  Matplotlib: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <circle cx="16" cy="16" r="13" fill="#fff" stroke="currentColor" strokeWidth="1"/>
      <circle cx="16" cy="16" r="5" fill="none" stroke="#11557C" strokeWidth="1.3"/>
    </svg>
  ),
  Tailwind: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M10 12c2-4 5-5 9-4 3 1 4 3 5 5-2-2-5-3-8-1-2 1-3 4-5 5s-5 0-7-2c2 1 4 1 6-3z" fill="#06B6D4"/>
    </svg>
  ),
  Selenium: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <circle cx="16" cy="16" r="13" fill="#43B02A"/>
      <text x="16" y="22" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">S</text>
    </svg>
  ),
  Bash: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <rect x="3" y="6" width="26" height="20" rx="2" fill="#4EAA25"/>
      <path d="M8 13l4 3-4 3M14 20h6" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  Figma: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M12 4h4v8h-4a4 4 0 010-8z" fill="#F24E1E"/>
      <path d="M16 4h4a4 4 0 010 8h-4V4z" fill="#FF7262"/>
      <path d="M12 12h4v8h-4a4 4 0 010-8z" fill="#A259FF"/>
      <circle cx="20" cy="16" r="4" fill="#1ABCFE"/>
      <path d="M12 20h4v4a4 4 0 01-4-4z" fill="#0ACF83"/>
    </svg>
  ),
  Jupyter: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <circle cx="24" cy="26" r="2.5" fill="#F37626"/>
      <path d="M6 15c2 4 7 7 11 7s8-3 9-7c-2 5-6 8-10 8s-8-3-10-8z" fill="#F37626"/>
      <path d="M6 17c2-4 7-7 11-7s8 3 9 7c-2-5-6-8-10-8s-8 3-10 8z" fill="#F37626"/>
    </svg>
  ),
  Postman: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <circle cx="16" cy="16" r="13" fill="#FF6C37"/>
    </svg>
  ),
  Grafana: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s}>
      <path d="M16 3c7 0 13 6 13 13a13 13 0 11-13-13z" fill="#F46800"/>
      <circle cx="16" cy="16" r="4" fill="#fff"/>
    </svg>
  ),
  VectorDB: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s} stroke="currentColor" strokeWidth="1.3" fill="none">
      <ellipse cx="16" cy="8" rx="10" ry="3"/>
      <path d="M6 8v16c0 2 4 3 10 3s10-1 10-3V8"/>
      <path d="M6 16c0 2 4 3 10 3s10-1 10-3"/>
    </svg>
  ),
  Default: (s) => (
    <svg viewBox="0 0 32 32" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="6" y="6" width="20" height="20" rx="2"/>
      <path d="M11 16h10M16 11v10"/>
    </svg>
  ),
};

const ALIASES = { react: 'ReactJs', reactjs: 'ReactJs' };

export default function SkillIcon({ name, size = 16 }) {
  const norm = String(name).toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = ALIASES[norm] || name;
  const key = Object.keys(ICONS).find(
    k => k.toLowerCase().replace(/[^a-z0-9]/g, '') === String(target).toLowerCase().replace(/[^a-z0-9]/g, '')
  );
  const Cmp = ICONS[key] || ICONS.Default;
  return Cmp(size);
}

export function prettyName(name) {
  return name.replace('Cpp', 'C++').replace('NextJS', 'Next.js').replace('VectorDB', 'Vector DB').replace('JS', 'JavaScript').replace('ReactJs', 'React');
}
