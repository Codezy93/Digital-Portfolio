"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import academics from "@/data/academics";

gsap.registerPlugin(ScrollTrigger);

export default function AcademicSection() {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const infoRefs = useRef([]);
  const logoRefs = useRef([]);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray(".panel");

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers: false,
          onToggle: (self) => {
            if (self.isActive && self.direction === 1) {
              setActiveIndex(i);
            } else if (self.isActive && self.direction === -1) {
              setActiveIndex(i);
            }
          },
        });

        const image = imageRefs.current[i];
        const info = infoRefs.current[i];
        const logo = logoRefs.current[i];

        // Zoom in animation
        gsap.fromTo(
          image,
          { scale: 0.6, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: panel,
              start: "top center",
              end: "center center",
              scrub: true,
              immediateRender: false,
            },
          }
        );

        // Zoom out animation
        gsap.fromTo(
          image,
          { scale: 1, opacity: 1 },
          {
            scale: 0.6,
            opacity: 0.6,
            scrollTrigger: {
              trigger: panel,
              start: "center center",
              end: "bottom center",
              scrub: true,
              immediateRender: false,
            },
          }
        );

        // Info fade in/out
        gsap.fromTo(
          info,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: panel,
              start: "center-=10% center",
              end: "center+=10% center",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Logo fade in/out
        gsap.fromTo(
          logo,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: panel,
              start: "center-=15% center",
              end: "center+=15% center",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-full overflow-hidden bg-gradient-to-r from-slate-900 to-black text-white"
    >
      <div ref={containerRef} className="h-full">
        {academics.map((school, index) => (
          <div
            key={index}
            className="panel relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-3 sm:px-6 lg:px-8"
          >
            {/* Background Image */}
            <img
              ref={(el) => (imageRefs.current[index] = el)}
              src={school.image}
              alt={school.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full select-none object-cover object-center filter brightness-75 contrast-110 pointer-events-none z-0"
            />

            {/* Title Card */}
            <div
              ref={(el) => (infoRefs.current[index] = el)}
              className="info-container absolute bottom-6 left-1/2 z-10 w-[92%] max-w-4xl -translate-x-1/2 rounded-xl border border-white/20 bg-black/35 p-4 shadow-lg backdrop-blur-md opacity-0 sm:bottom-14 sm:p-6"
            >
              <h2 className="text-xl font-bold sm:text-3xl md:text-4xl">{school.name}</h2>
              <p className="mt-1 text-base text-gray-200 sm:text-lg">{school.degree}</p>
              <p className="mt-2 text-sm sm:text-base">
                🎓 Grade: <span className="font-semibold">{school.grade}</span>
              </p>
              <p className="mt-3 text-xs text-gray-300 sm:text-sm md:text-base">{school.description}</p>
            </div>

            {/* Logo */}
            <img
              ref={(el) => (logoRefs.current[index] = el)}
              className="logo absolute left-1/2 top-6 z-10 h-14 w-14 -translate-x-1/2 rounded-full border border-white/30 bg-white/20 p-2 object-contain shadow-lg backdrop-blur-sm opacity-0 sm:top-[18%] sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
              src={school.logo}
              alt={`${school.name} logo`}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
