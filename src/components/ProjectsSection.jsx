"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import projects from '@/data/projects';
import { DialogTitle } from '@radix-ui/react-dialog';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to(horizontalRef.current, {
        x: () => -(horizontalRef.current.scrollWidth - sectionRef.current.clientWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${horizontalRef.current.scrollWidth - sectionRef.current.clientWidth}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Reset x before refresh so measurements are correct
      ScrollTrigger.addEventListener('refreshInit', () => {
        gsap.set(horizontalRef.current, { x: 0 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] sm:min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-purple-950 px-3 sm:px-6 py-12 sm:py-16"
    >
      <h1 className="text-center font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-8 sm:mb-12 text-4xl sm:text-6xl lg:text-7xl font-extrabold">
        PROJECTS;
      </h1>

      <div
        ref={horizontalRef}
        className="flex w-max items-stretch sm:items-end space-x-4 sm:space-x-8 ml-2 sm:ml-6 pb-6 sm:pb-10 will-change-transform h-[calc(100%-10rem)] sm:h-[calc(100%-8rem)]"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative rounded-2xl border border-white/10 bg-white/5 shadow-xl transition-transform duration-300 hover:scale-105 overflow-hidden min-w-[85vw] sm:min-w-[380px] md:min-w-[425px] lg:min-w-[480px] max-w-[88vw] sm:max-w-[450px] h-[70vh] sm:h-[85%]"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-6">
              <div>
                <h2 className="text-white font-bold mb-2 text-2xl sm:text-3xl">{project.name}</h2>
                <p className="text-white text-sm sm:text-base leading-relaxed">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] sm:text-sm font-medium bg-white/70 border border-white/20 text-black/90 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full hover:bg-white/80 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-2 sm:gap-3">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-2">
                    View Demo
                  </Button>
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="text-xs sm:text-sm px-3 sm:px-4 py-2">GitHub</Button>
                </a>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 hover:text-white text-xs sm:text-sm px-3 sm:px-4 py-2"
                    >
                      View Info
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-3xl sm:max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-black border border-white/10 text-white rounded-xl shadow-2xl">
                    <DialogTitle className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 border-b border-white/20 pb-2">
                      {project.name}
                    </DialogTitle>
                    <div
                      className="prose prose-invert prose-img:rounded-lg prose-a:text-blue-400 prose-li:marker:text-blue-400 text-sm sm:text-base"
                      dangerouslySetInnerHTML={{ __html: project.htmlContent }}
                    />
                    <div className="mt-6 flex flex-wrap gap-2 sm:gap-4">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-xs sm:text-sm px-3 sm:px-4 py-2">
                          Live Demo
                        </Button>
                      </a>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" className="text-xs sm:text-sm px-3 sm:px-4 py-2">GitHub Repo</Button>
                      </a>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
