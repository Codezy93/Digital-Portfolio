"use client";

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Briefcase, Code2, Clock, MapPin } from 'lucide-react';
import experienceData from '@/data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedExperience, setSelectedExperience] = useState(null);

  // GSAP Scroll Animation
  useGSAP(
    () => {
      gsap.fromTo(
        cardsRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-16 sm:py-20 px-3 sm:px-6 overflow-hidden bg-gradient-to-r from-slate-900 to-black"
    >
      <h1 className="mb-10 sm:mb-16 text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-center font-mono">
        EXPERIENCE;
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-center items-stretch max-w-6xl mx-auto">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="group relative w-full h-auto min-h-[18rem] sm:min-h-[24rem] rounded-xl"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 shadow-xl overflow-hidden" />

            <div className="relative p-4 sm:p-6 flex flex-col h-full justify-start">
              {/* Header */}
              <div>
                <div className="flex items-center mb-4">
                  <img
                    src={exp.logo}
                    alt={`${exp.company} Logo`}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover mr-3 sm:mr-4 ring-2 ring-white/30"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white leading-tight">{exp.company}</h2>
                    <p className="text-xs sm:text-sm text-gray-300">{exp.role}</p>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-gray-400">
                  <span className="flex items-center"><Clock size={12} className="mr-1" />{exp.duration}</span>
                  <span className="flex items-center"><MapPin size={12} className="mr-1" />{exp.location}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 text-white text-sm sm:text-base leading-relaxed">
                {exp.description}
              </div>

              {/* Technologies */}
              <div className="mt-4 sm:mt-6">
                <h4 className="font-medium text-xs sm:text-sm text-gray-300">Technologies</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] sm:text-xs font-medium text-white bg-white/10 rounded-md border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-4 sm:mt-auto">
                <button
                  onClick={() => setSelectedExperience(exp)}
                  className="mt-2 sm:mt-4 inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform transition-all group-hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dialog / Modal */}
      <Dialog open={!!selectedExperience} onOpenChange={() => setSelectedExperience(null)}>
        {selectedExperience && (
          <DialogContent className="w-[95vw] max-w-4xl sm:max-w-5xl lg:max-w-6xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                {selectedExperience.role}
              </DialogTitle>
              <div className="flex items-center mt-2">
                <img
                  src={selectedExperience.logo}
                  alt={`${selectedExperience.company} logo`}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 sm:mr-4 ring-2 ring-white/30"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">{selectedExperience.company}</h3>
                  <p className="text-xs sm:text-sm text-gray-300">{selectedExperience.duration}</p>
                </div>
              </div>
            </DialogHeader>
            <DialogDescription className="mt-1 text-sm sm:text-base text-gray-200 leading-relaxed">
              {selectedExperience.description}
            </DialogDescription>
            <div className="mt-4">
              <div className="flex flex-col gap-3">
                {(selectedExperience.impact || []).map(({ imhead, imdesc }, idx) => (
                  <div key={`Impact${idx}`}>
                    <p className="font-medium text-gray-300 text-sm sm:text-base">{imhead}</p>
                    <p className="text-xs sm:text-sm text-gray-300">{imdesc}</p>
                  </div>
                ))}
              </div>
              <h4 className="font-medium text-gray-300 mt-4 text-sm sm:text-base">Used Tech Stack:</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {(selectedExperience.technologies || []).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-medium bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white rounded-full border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
