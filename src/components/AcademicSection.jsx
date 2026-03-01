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
      className="chapter-section section-tone px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-18"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <ChapterHeading
          number="04"
          title="Academic Foundation"
          subtitle="Rigorous training that shaped my approach to machine learning, systems thinking, and practical problem-solving."
        />

        <div className="space-y-6">
          {academics.map((school, index) => (
            <article
              key={index}
              className="academic-card surface-card group relative overflow-hidden rounded-2xl opacity-0 transition-all duration-500"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={school.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-12 transition-opacity duration-700 group-hover:opacity-18"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d1523] via-[#0d1523]/90 to-transparent" />
              </div>

              <div className="relative z-10 flex flex-col items-start gap-6 p-8 sm:flex-row sm:gap-8 md:p-10">
                <img
                  src={school.logo}
                  alt={`${school.name} logo`}
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-16 shrink-0 rounded-xl border border-slate-200/20 bg-white/8 p-2 object-contain sm:h-20 sm:w-20"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold leading-tight text-slate-100 sm:text-2xl">
                    {school.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-cyan-100 sm:text-base">
                    {school.degree}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/35 bg-cyan-200/10 px-3 py-1.5 text-xs font-mono text-cyan-100">
                      GPA: {school.grade}
                    </span>
                  </div>

                  {school.description && (
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
                      {school.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-30" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
