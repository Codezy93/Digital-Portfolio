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
            <p className="ch-animate text-xs uppercase tracking-[0.35em] text-[var(--accent-blue)] font-mono mb-3 opacity-70">
                Chapter {number}
            </p>
            <h2
                className="ch-animate text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
                style={{
                    background: 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                {title}
            </h2>
            {subtitle && (
                <p className="ch-animate text-base md:text-lg text-[var(--text-secondary)] mt-4 max-w-2xl font-light">
                    {subtitle}
                </p>
            )}
            <div className="ch-animate glow-line w-24 mt-6" />
        </div>
    );
}
