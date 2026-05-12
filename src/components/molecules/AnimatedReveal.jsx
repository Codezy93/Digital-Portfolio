import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AnimatedReveal({ children, y = 40, delay = 0, stagger = 0.08, target = '> *' }) {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(target);
    gsap.from(items, {
      y,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay,
      stagger,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}
