"use client";

import React, { useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Clock, MapPin } from 'lucide-react';
import experienceData from '@/data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Stable ref callback — avoids stale array entries on re-render
  const setCardRef = useCallback((el, index) => {
    if (el) cardsRef.current[index] = el;
  }, []);

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 80% 0%, #1e1b4b 0%, #0f0a1a 40%, #050208 100%)',
      }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #c084fc, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-400/60 mb-2 font-mono">
            Where I&apos;ve worked
          </p>
          <h2
            className="text-4xl md:text-6xl font-extrabold font-mono tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #a5b4fc 0%, #c084fc 50%, #f9a8d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Experience
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {experienceData.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => setCardRef(el, index)}
              onClick={() => setSelectedExperience(exp)}
              className="group relative w-full rounded-xl cursor-pointer opacity-0"
              /* opacity-0 so GSAP controls initial state — no flash of content */
            >
              {/* Card background */}
              <div className="absolute inset-0 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-indigo-400/25 group-hover:shadow-lg group-hover:shadow-indigo-500/10" />

              <div className="relative p-5 sm:p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center mb-4">
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-10 h-10 rounded-full object-cover mr-4 ring-2 ring-white/10"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white leading-tight truncate">
                      {exp.company}
                    </h3>
                    <p className="text-sm text-indigo-300/80">{exp.role}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {exp.location}
                  </span>
                </div>

                {/* Description — clamp to 3 lines on card */}
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-5">
                  {exp.description}
                </p>

                {/* Technologies */}
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.slice(0, 6).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-white/[0.06] border border-white/[0.08] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.technologies.length > 6 && (
                      <span className="px-2.5 py-1 text-[11px] font-medium text-indigo-400/70">
                        +{exp.technologies.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Subtle "click to expand" indicator */}
                <div className="absolute bottom-5 right-5 text-[10px] text-slate-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click for details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <Dialog open={!!selectedExperience} onOpenChange={() => setSelectedExperience(null)}>
        {selectedExperience && (
          <DialogContent className="w-[95vw] max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0f0a1a]/95 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
            <DialogHeader>
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={selectedExperience.logo}
                  alt={`${selectedExperience.company} logo`}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <DialogTitle
                    className="text-xl sm:text-2xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #a5b4fc, #c084fc)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {selectedExperience.role}
                  </DialogTitle>
                  <p className="text-sm text-slate-400">
                    {selectedExperience.company} · {selectedExperience.duration}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <DialogDescription className="text-sm sm:text-base text-slate-300 leading-relaxed mt-2">
              {selectedExperience.description}
            </DialogDescription>

            {/* Impact items */}
            {selectedExperience.impact?.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] text-indigo-400/60 font-mono">
                  Key Impact
                </h4>
                {selectedExperience.impact.map(({ imhead, imdesc }, idx) => (
                  <div key={idx} className="pl-4 border-l-2 border-indigo-500/30">
                    <p className="font-medium text-sm text-white">{imhead}</p>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{imdesc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tech stack */}
            {selectedExperience.technologies?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-[0.2em] text-indigo-400/60 font-mono mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs font-medium bg-white/[0.06] border border-white/[0.08] text-slate-200 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}