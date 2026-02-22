"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, Github } from 'lucide-react';
import projects from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card');
    if (!cards?.length) return;

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
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
      className="relative w-full py-20 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 70% 100%, #1e1b4b 0%, #0f0a1a 40%, #050208 100%)',
      }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #c084fc, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-400/60 mb-2 font-mono">
            What I&apos;ve built
          </p>
          <h2
            className="text-4xl md:text-6xl font-extrabold font-mono tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #a5b4fc 0%, #c084fc 50%, #f9a8d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Projects
          </h2>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative rounded-xl overflow-hidden opacity-0"
            >
              {/* Background image with overlay */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
              </div>

              <div className="relative z-10 flex flex-col justify-end min-h-[380px] sm:min-h-[420px] p-6">
                {/* Title + description */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                  {project.name}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-medium text-slate-200 bg-white/[0.1] border border-white/[0.12] rounded-md backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="px-2.5 py-1 text-[11px] font-medium text-indigo-400/70">
                      +{project.techStack.length - 5}
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-500/30 border border-indigo-400/30 rounded-lg backdrop-blur-sm hover:bg-indigo-500/50 hover:border-indigo-400/50 transition-all duration-300">
                        <ExternalLink size={14} />
                        Demo
                      </button>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-white/[0.06] border border-white/[0.1] rounded-lg backdrop-blur-sm hover:bg-white/[0.12] hover:text-white transition-all duration-300">
                        <Github size={14} />
                        Code
                      </button>
                    </a>
                  )}

                  {/* Details modal */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300">
                        Details →
                      </button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0f0a1a]/95 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
                      <DialogTitle
                        className="text-2xl sm:text-3xl font-bold pb-3 border-b border-white/10"
                        style={{
                          background: 'linear-gradient(135deg, #a5b4fc, #c084fc)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {project.name}
                      </DialogTitle>

                      <div
                        className="mt-4 prose prose-invert prose-sm sm:prose-base prose-img:rounded-lg prose-a:text-indigo-400 prose-li:marker:text-indigo-400 max-w-none"
                        dangerouslySetInnerHTML={{ __html: project.htmlContent }}
                      />

                      {/* Full tech stack in modal */}
                      <div className="mt-6">
                        <h4 className="text-xs uppercase tracking-[0.2em] text-indigo-400/60 font-mono mb-3">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 text-xs font-medium bg-white/[0.06] border border-white/[0.08] text-slate-200 rounded-lg"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-white/10">
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <button className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-500/30 border border-indigo-400/30 rounded-lg hover:bg-indigo-500/50 transition-all duration-300">
                              <ExternalLink size={14} />
                              Live Demo
                            </button>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <button className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-300 bg-white/[0.06] border border-white/[0.1] rounded-lg hover:bg-white/[0.12] hover:text-white transition-all duration-300">
                              <Github size={14} />
                              GitHub Repo
                            </button>
                          </a>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}