'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ChapterHeading({ number, title, subtitle }) {
    const ref = useRef(null);

    useGSAP(() => {
        const el = ref.current;
        if (!el) return;

        const items = el.querySelectorAll('.ch-animate');
        gsap.fromTo(
            items,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, { scope: ref });

    return (
        <div ref={ref} className="mb-16 md:mb-20">
            <p className="ch-animate eyebrow-label mb-4">
                Chapter {number}
            </p>
            <h2 className="ch-animate max-w-4xl text-[clamp(2.2rem,6.3vw,5.3rem)] font-black leading-[0.95] tracking-[-0.03em] text-slate-100">
                {title}
            </h2>
            {subtitle && (
                <p className="ch-animate mt-4 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
                    {subtitle}
                </p>
            )}
            <div className="ch-animate mt-6 glow-line w-28" />
        </div>
    );
}
