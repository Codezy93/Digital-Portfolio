"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChapterHeading from "@/components/ChapterHeading";
import academics from "@/data/academics";

gsap.registerPlugin(ScrollTrigger);

export default function AcademicSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll(".academic-card");
    if (!cards?.length) return;

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="academics"
      ref={sectionRef}
      className="chapter-section py-24 md:py-32 px-6 md:px-12 lg:px-20"
      style={{
        background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-surface) 50%, var(--bg-deep) 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <ChapterHeading
          number="04"
          title="The Foundation"
          subtitle="Where it all started — rigorous academics that shaped how I think about computation, data, and intelligence."
        />

        <div className="space-y-8">
          {academics.map((school, index) => (
            <div
              key={index}
              className="academic-card relative rounded-2xl overflow-hidden opacity-0 border border-[var(--border-dim)] hover:border-[var(--border-accent)] transition-all duration-500 group"
              style={{ background: 'var(--bg-card)' }}
            >
              {/* Background image overlay */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={school.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-110 opacity-10 group-hover:opacity-[0.15] transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card)]/90 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6 sm:gap-8 p-8 md:p-10">
                {/* Logo */}
                <img
                  src={school.logo}
                  alt={`${school.name} logo`}
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain bg-white/5 backdrop-blur-sm border border-[var(--border-dim)] p-2 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-tight">
                    {school.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--accent-blue)] mt-1 font-medium">
                    {school.degree}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <span className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-[rgba(96,165,250,0.08)] border border-[var(--border-accent)] text-[var(--accent-blue)]">
                      GPA: {school.grade}
                    </span>
                  </div>

                  {school.description && (
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-4 max-w-2xl">
                      {school.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)] to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}