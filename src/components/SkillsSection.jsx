'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import skills from '@/data/skills';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const categories = Object.keys(skills);

  // Staggered reveal per category as it enters viewport
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
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.03,
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
      ref={sectionRef}
      className="relative w-full py-20 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 20% 0%, #1e1b4b 0%, #0f0a1a 40%, #050208 100%)',
      }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.08] blur-3xl"
        style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-20 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #c084fc, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-400/60 mb-2 font-mono">
              What I work with
            </p>
            <h2
              className="text-4xl md:text-6xl font-extrabold font-mono tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #a5b4fc 0%, #c084fc 50%, #f9a8d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Skills
            </h2>
          </div>
          <Link
            href="/skills"
            className="flex items-center gap-2 text-sm font-mono text-indigo-300/70 hover:text-indigo-200 border border-indigo-500/25 hover:border-indigo-400/50 px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-indigo-500/10 w-fit"
          >
            Certifications
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* All categories laid out */}
        <div className="space-y-12">
          {categories.map((category) => {
            const entries = Object.entries(skills[category]);
            return (
              <div key={category} className="skill-group">
                {/* Category heading */}
                <div className="skill-heading flex items-center gap-4 mb-5">
                  <h3
                    className="text-lg md:text-xl font-bold font-mono shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {category}
                  </h3>
                  <span className="text-xs font-mono text-slate-600">
                    {entries.length}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/20 to-transparent" />
                </div>

                {/* Skill badges */}
                <div className="flex flex-wrap gap-3">
                  {entries.map(([skill, imageUrl]) => (
                    <span
                      key={skill}
                      className="skill-badge inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium
                        bg-white/[0.06] backdrop-blur-sm border border-white/[0.08]
                        text-slate-200 hover:bg-white/[0.12] hover:border-indigo-400/30
                        hover:shadow-lg hover:shadow-indigo-500/10
                        transition-all duration-300 cursor-default"
                    >
                      {imageUrl && (
                        <img
                          src={`/icons/${imageUrl}.svg`}
                          alt=""
                          className="w-5 h-5 shrink-0"
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