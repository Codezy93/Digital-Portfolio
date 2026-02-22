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
      className="chapter-section py-24 md:py-32 px-6 md:px-12 lg:px-20"
      style={{
        background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-surface) 50%, var(--bg-deep) 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <ChapterHeading
          number="01"
          title="The Toolkit"
          subtitle="A curated set of technologies, frameworks, and paradigms — selected not for breadth, but for depth and production impact."
        />

        <div className="space-y-12">
          {categories.map((category) => {
            const entries = Object.entries(skills[category]).filter(
              ([skill]) => skill !== ''
            );
            if (entries.length === 0) return null;

            return (
              <div key={category} className="skill-group">
                {/* Category heading */}
                <div className="skill-heading flex items-center gap-4 mb-5 opacity-0">
                  <h3 className="text-sm md:text-base font-bold font-mono uppercase tracking-wider text-[var(--text-secondary)] shrink-0">
                    {category}
                  </h3>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] px-2 py-0.5 rounded-full border border-[var(--border-dim)]">
                    {entries.length}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[var(--border-dim)] to-transparent" />
                </div>

                {/* Skill badges */}
                <div className="flex flex-wrap gap-2.5">
                  {entries.map(([skill, imageUrl]) => (
                    <span
                      key={skill}
                      className="skill-badge inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium
                        bg-[var(--bg-card)] border border-[var(--border-dim)]
                        text-[var(--text-secondary)]
                        hover:bg-[rgba(96,165,250,0.06)] hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]
                        hover:shadow-[0_0_15px_var(--glow-blue)]
                        transition-all duration-300 cursor-default opacity-0"
                    >
                      {imageUrl && (
                        <img
                          src={`/icons/${imageUrl}.svg`}
                          alt={skill}
                          className="w-4 h-4 shrink-0 opacity-70"
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