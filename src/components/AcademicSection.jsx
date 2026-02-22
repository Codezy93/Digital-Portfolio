"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import academics from "@/data/academics";

gsap.registerPlugin(ScrollTrigger);

export default function AcademicSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll(".academic-card");
    if (!cards?.length) return;

    cards.forEach((card) => {
      const image = card.querySelector(".academic-img");
      const content = card.querySelector(".academic-content");

      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Subtle parallax on the background image
      if (image) {
        gsap.fromTo(
          image,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 100%, #1e1b4b 0%, #0f0a1a 40%, #050208 100%)",
      }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl"
        style={{
          background: "radial-gradient(circle, #818cf8, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #c084fc, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-400/60 mb-2 font-mono">
            Where I&apos;ve studied
          </p>
          <h2
            className="text-4xl md:text-6xl font-extrabold font-mono tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, #a5b4fc 0%, #c084fc 50%, #f9a8d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Academics
          </h2>
        </div>

        {/* Academic cards */}
        <div className="space-y-8">
          {academics.map((school, index) => (
            <div
              key={index}
              className="academic-card relative rounded-xl overflow-hidden opacity-0"
            >
              {/* Background image with parallax */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={school.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="academic-img absolute inset-0 w-full h-full object-cover object-center scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
              </div>

              {/* Content */}
              <div className="academic-content relative z-10 flex flex-col sm:flex-row items-start gap-5 sm:gap-8 p-6 sm:p-8 md:p-10 min-h-[220px]">
                {/* Logo */}
                <img
                  src={school.logo}
                  alt={`${school.name} logo`}
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-contain bg-white/10 backdrop-blur-sm border border-white/15 p-2 shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                    {school.name}
                  </h3>
                  <p className="text-sm sm:text-base text-indigo-300/80 mt-1">
                    {school.degree}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs sm:text-sm text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/60" />
                      GPA: <span className="text-white font-medium">{school.grade}</span>
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mt-4 max-w-2xl">
                    {school.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}