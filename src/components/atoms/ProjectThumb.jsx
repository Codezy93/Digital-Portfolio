import { useEffect, useRef } from 'react';

export default function ProjectThumb({ kind }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const draw = (W, H) => {
      ctx.fillStyle = '#0a0805';
      ctx.fillRect(0, 0, W, H);

      if (kind === 'sentiment') {
        ctx.strokeStyle = 'rgba(232,116,62,0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i <= W; i += 4) {
          const y = H * 0.6 + Math.sin(i * 0.02) * 14 + Math.sin(i * 0.05) * 8;
          if (i === 0) ctx.moveTo(i, y); else ctx.lineTo(i, y);
        }
        ctx.stroke();
        for (let i = 30; i < W - 30; i += 14) {
          const up = Math.random() > 0.45;
          const h = 10 + Math.random() * 40;
          const y = H * 0.45 - h / 2;
          ctx.fillStyle = up ? 'rgba(107,196,107,0.65)' : 'rgba(216,80,90,0.6)';
          ctx.fillRect(i, y, 5, h);
          ctx.strokeStyle = ctx.fillStyle;
          ctx.beginPath();
          ctx.moveTo(i + 2.5, y - 6);
          ctx.lineTo(i + 2.5, y + h + 6);
          ctx.stroke();
        }
      } else if (kind === 'bloom') {
        const g = ctx.createRadialGradient(W * 0.5, H * 0.55, 10, W * 0.5, H * 0.55, W * 0.6);
        g.addColorStop(0, 'rgba(244,175,120,0.45)');
        g.addColorStop(0.4, 'rgba(232,116,62,0.15)');
        g.addColorStop(1, 'rgba(10,8,5,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        for (let i = 0; i < 120; i++) {
          const r = Math.random() * W * 0.4;
          const a = Math.random() * Math.PI * 2;
          const x = W * 0.5 + Math.cos(a) * r;
          const y = H * 0.55 + Math.sin(a) * r * 0.6;
          ctx.fillStyle = `rgba(239,231,216,${0.2 + Math.random() * 0.5})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.6 + Math.random() * 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (kind === 'vision') {
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        for (let x = 0; x < W; x += 20) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let y = 0; y < H; y += 20) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
        const boxes = [
          { x: 40, y: 30, w: 90, h: 80, c: '#c25a23', l: 'lesion 0.94' },
          { x: 150, y: 70, w: 70, h: 50, c: '#6bc46b', l: 'tissue 0.81' },
          { x: 250, y: 40, w: 100, h: 100, c: '#c25a23', l: 'lesion 0.88' },
        ];
        for (const b of boxes) {
          ctx.strokeStyle = b.c;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(b.x, b.y, b.w, b.h);
          ctx.fillStyle = b.c;
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillRect(b.x, b.y - 14, ctx.measureText(b.l).width + 10, 14);
          ctx.fillStyle = '#0a0805';
          ctx.fillText(b.l, b.x + 5, b.y - 4);
        }
      } else if (kind === 'waves') {
        for (let row = 0; row < 40; row++) {
          ctx.beginPath();
          for (let i = 0; i <= W; i += 3) {
            const amp = 2 + Math.sin(i * 0.02 + row * 0.3) * 5 + Math.sin(i * 0.06 + row) * 3;
            const y = row * 4 + 8 + Math.sin(i * 0.04 + row * 0.7) * amp * 0.4;
            if (i === 0) ctx.moveTo(i, y); else ctx.lineTo(i, y);
          }
          const alpha = 0.15 + (row % 6 === 0 ? 0.5 : 0);
          ctx.strokeStyle = row % 6 === 0 ? `rgba(232,116,62,${alpha})` : `rgba(239,231,216,${alpha * 0.7})`;
          ctx.lineWidth = row % 6 === 0 ? 1.2 : 0.6;
          ctx.stroke();
        }
      }
    };

    const resize = () => {
      const r = c.parentElement.getBoundingClientRect();
      c.width = r.width * dpr;
      c.height = r.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      c.style.width = r.width + 'px';
      c.style.height = r.height + 'px';
      draw(r.width, r.height);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [kind]);

  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
