'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ChapterHeading from '@/components/ChapterHeading';
import skills from '@/data/skills';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const categories = Object.keys(skills);

  useGSAP(() => {
    const groups = sectionRef.current?.querySelectorAll('.skill-group');
    if (!groups?.length) return;

    groups.forEach((group) => {
      const badges = group.querySelectorAll('.skill-badge');
      const heading = group.querySelector('.skill-heading');

      gsap.fromTo(
        heading,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        badges,
        { opacity: 0, y: 12, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.025,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="chapter-section section-tone px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ChapterHeading
          number="01"
          title="The Toolkit"
          subtitle="A focused set of technologies selected for depth, reliability, and measurable production impact."
        />

        <div className="space-y-8">
          {categories.map((category) => {
            const entries = Object.entries(skills[category]).filter(
              ([skill]) => skill !== ''
            );
            if (entries.length === 0) return null;

            return (
              <div key={category} className="skill-group surface-card rounded-2xl p-6 md:p-8">
                <div className="skill-heading mb-5 flex items-center gap-4 opacity-0">
                  <h3 className="shrink-0 text-sm font-bold font-mono uppercase tracking-[0.18em] text-slate-200 md:text-base">
                    {category}
                  </h3>
                  <span className="rounded-full border border-slate-300/20 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                    {entries.length}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-slate-300/25 to-transparent" />
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {entries.map(([skill, imageUrl]) => (
                    <span
                      key={skill}
                      className="skill-badge inline-flex cursor-default items-center gap-2.5 rounded-lg border border-slate-300/15 bg-slate-200/10 px-4 py-2.5 text-sm font-medium text-slate-300 opacity-0 transition-all duration-300 hover:border-cyan-200/45 hover:bg-cyan-200/10 hover:text-slate-100 hover:shadow-[0_8px_25px_rgba(56,189,248,0.2)]"
                    >
                      {imageUrl && (
                        <img
                          src={`/icons/${imageUrl}.svg`}
                          alt={skill}
                          className="h-4 w-4 shrink-0 opacity-80"
                          loading="lazy"
                        />
                      )}
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
