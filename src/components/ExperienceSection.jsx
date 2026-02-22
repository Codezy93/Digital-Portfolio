"use client";

import React, { useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Clock, MapPin } from 'lucide-react';
import ChapterHeading from '@/components/ChapterHeading';
import experienceData from '@/data/experience';

const ParticleField = dynamic(
  () => import('@/components/three/ParticleField'),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const [selectedExp, setSelectedExp] = useState(null);

  const openDetails = useCallback((exp) => setSelectedExp(exp), []);
  const closeDetails = useCallback(() => setSelectedExp(null), []);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.exp-card');
    if (!cards?.length) return;

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="chapter-section py-24 md:py-32 px-6 md:px-12 lg:px-20 relative"
      style={{
        background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-surface) 50%, var(--bg-deep) 100%)',
      }}
    >
      <ParticleField />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ChapterHeading
          number="03"
          title="Into the Field"
          subtitle="Production deployments, real-time pipelines, and measurable impact — where research meets reality."
        />

        <div className="space-y-8">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="exp-card opacity-0 rounded-2xl border border-[var(--border-dim)] hover:border-[var(--border-accent)] p-8 md:p-10 transition-all duration-500 cursor-pointer group"
              style={{ background: 'var(--bg-card)' }}
              onClick={() => openDetails(exp)}
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Company logo */}
                {exp.logo && (
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-14 h-14 rounded-xl object-contain bg-white/5 border border-[var(--border-dim)] p-2 shrink-0"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    {exp.role}
                  </h3>
                  <p className="text-base text-[var(--accent-blue)] font-medium mt-1">
                    {exp.company}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-sm text-[var(--text-muted)]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] mt-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-3 py-1 rounded-md bg-[rgba(96,165,250,0.06)] border border-[var(--border-dim)] text-[var(--text-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View details hint */}
                  <p className="text-xs text-[var(--text-muted)] mt-5 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    Click to expand impact details →
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedExp} onOpenChange={closeDetails}>
        <DialogContent className="max-w-2xl bg-[var(--bg-card)] border-[var(--border-dim)] text-[var(--text-primary)] max-h-[80vh] overflow-y-auto">
          {selectedExp && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedExp.role}
                </DialogTitle>
                <DialogDescription className="text-[var(--accent-blue)]">
                  {selectedExp.company} · {selectedExp.duration}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 mt-4">
                {selectedExp.impact?.map((item, i) => (
                  <div key={i} className="border-l-2 border-[var(--accent-blue)] pl-4">
                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                      {item.imhead}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.imdesc}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}