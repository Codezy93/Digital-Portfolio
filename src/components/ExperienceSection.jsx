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
      className="chapter-section section-tone relative px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <ParticleField />

      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <ChapterHeading
          number="03"
          title="Experience"
          subtitle="Production deployments, real-time pipelines, and measurable outcomes where research ideas become reliable software."
        />

        <div className="space-y-6">
          {experienceData.map((exp) => (
            <article
              key={exp.id}
              className="exp-card surface-card group cursor-pointer rounded-2xl p-7 opacity-0 transition-all duration-500 md:p-9"
              onClick={() => openDetails(exp)}
            >
              <div className="flex flex-col items-start gap-6 sm:flex-row">
                {exp.logo && (
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="h-14 w-14 shrink-0 rounded-xl border border-slate-200/20 bg-white/8 p-2 object-contain"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-slate-100 sm:text-2xl">
                    {exp.role}
                  </h3>
                  <p className="mt-1 text-base font-medium text-cyan-100">
                    {exp.company}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </span>
                  </div>

                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
                    {exp.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-slate-200/20 bg-slate-200/10 px-3 py-1 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400 transition-colors duration-300 group-hover:text-slate-200">
                    Open impact breakdown
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedExp} onOpenChange={(open) => !open && closeDetails()}>
        <DialogContent className="max-h-[82vh] max-w-2xl overflow-y-auto rounded-2xl border-slate-300/20 bg-slate-900/85 text-slate-100 backdrop-blur-md">
          {selectedExp && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedExp.role}
                </DialogTitle>
                <DialogDescription className="text-cyan-100">
                  {selectedExp.company} - {selectedExp.duration}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-5">
                {selectedExp.impact?.map((item, i) => (
                  <div key={i} className="border-l-2 border-cyan-200/70 pl-4">
                    <h4 className="mb-1 text-sm font-bold text-slate-100">
                      {item.imhead}
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-300">
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
