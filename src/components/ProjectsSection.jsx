"use client";

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, Github } from 'lucide-react';
import ChapterHeading from '@/components/ChapterHeading';
import projects from '@/data/projects';

const DataFlowScene = dynamic(
  () => import('@/components/three/DataFlowScene'),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card');
    if (!cards?.length) return;

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="chapter-section section-tone relative px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <DataFlowScene />

      <div
        className="absolute inset-0 pointer-events-none opacity-22"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ChapterHeading
          number="02"
          title="Selected Work"
          subtitle="Production-focused projects where model quality, system reliability, and product usefulness are all first-class constraints."
        />

        <div className="mb-6 flex justify-end">
          <Link
            href="/projects"
            className="rounded-md border border-slate-200/35 bg-slate-200/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-100 transition-all duration-300 hover:border-cyan-200/60 hover:text-cyan-100"
          >
            See All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Dialog key={project.id}>
              <DialogTrigger asChild>
                <article className="project-card surface-card group cursor-pointer overflow-hidden rounded-2xl opacity-0 transition-all duration-500">
                  <div className="relative h-48 overflow-hidden border-b border-slate-200/10">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="h-full w-full object-cover object-center opacity-65 transition-all duration-700 group-hover:scale-105 group-hover:opacity-82"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-[radial-gradient(circle_at_22%_25%,rgba(125,211,252,0.2),transparent_40%),linear-gradient(140deg,#121c2d_0%,#090d14_100%)]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1019] via-[#0b1019]/20 to-transparent" />

                    <div className="absolute right-4 top-4 flex gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-slate-200/20 bg-slate-200/10 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.08em] text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 p-6">
                    <h3 className="text-lg font-bold leading-tight text-slate-50 transition-colors duration-300 group-hover:text-cyan-100">
                      {project.name}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-slate-300">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <span className="text-slate-400 transition-colors duration-300 group-hover:text-cyan-200">
                          <Github className="h-4 w-4" />
                        </span>
                      )}
                      {project.demoUrl && (
                        <span className="text-slate-400 transition-colors duration-300 group-hover:text-cyan-200">
                          <ExternalLink className="h-4 w-4" />
                        </span>
                      )}
                      <span className="ml-auto text-[10px] font-mono uppercase tracking-[0.14em] text-slate-400 transition-colors duration-300 group-hover:text-slate-200">
                        Open case study
                      </span>
                    </div>
                  </div>
                </article>
              </DialogTrigger>

              <DialogContent className="max-h-[82vh] max-w-2xl overflow-y-auto rounded-2xl border-slate-300/20 bg-slate-900/85 text-slate-100 backdrop-blur-md">
                <DialogTitle className="mb-2 text-2xl font-bold">
                  {project.name}
                </DialogTitle>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200/20 bg-cyan-200/8 px-3 py-1 text-[11px] font-mono text-cyan-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div
                  className="prose prose-invert prose-sm max-w-none prose-headings:font-bold prose-headings:text-slate-100 prose-li:text-slate-300 prose-p:leading-relaxed prose-p:text-slate-300 prose-strong:text-cyan-100"
                  dangerouslySetInnerHTML={{ __html: project.htmlContent }}
                />

                <div className="mt-6 flex items-center gap-4 border-t border-slate-300/20 pt-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-100"
                    >
                      <Github className="h-4 w-4" />
                      Source Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-100"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
