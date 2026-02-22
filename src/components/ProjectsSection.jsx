"use client";

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
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
      className="chapter-section py-24 md:py-32 px-6 md:px-12 lg:px-20 relative"
      style={{
        background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-surface) 50%, var(--bg-deep) 100%)',
      }}
    >
      <DataFlowScene />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ChapterHeading
          number="02"
          title="The Work"
          subtitle="Selected projects — each one a real problem tackled with AI, from concept through deployment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Dialog key={project.id}>
              <DialogTrigger asChild>
                <div
                  className="project-card opacity-0 rounded-2xl border border-[var(--border-dim)] hover:border-[var(--border-accent)] overflow-hidden transition-all duration-500 cursor-pointer group"
                  style={{ background: 'var(--bg-card)' }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--bg-surface)] via-[rgba(96,165,250,0.05)] to-[var(--bg-deep)]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />

                    {/* Floating tag */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[var(--text-secondary)] border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      {project.githubUrl && (
                        <span className="text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors">
                          <Github className="w-4 h-4" />
                        </span>
                      )}
                      {project.demoUrl && (
                        <span className="text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      )}
                      <span className="ml-auto text-[10px] font-mono text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                        Click for details →
                      </span>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-2xl bg-[var(--bg-card)] border-[var(--border-dim)] text-[var(--text-primary)] max-h-[80vh] overflow-y-auto">
                <DialogTitle className="text-2xl font-bold mb-2">
                  {project.name}
                </DialogTitle>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-3 py-1 rounded-md bg-[rgba(96,165,250,0.06)] border border-[var(--border-dim)] text-[var(--accent-blue)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* HTML content */}
                <div
                  className="prose prose-invert prose-sm max-w-none
                    prose-headings:text-[var(--text-primary)] prose-headings:font-bold
                    prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
                    prose-li:text-[var(--text-secondary)]
                    prose-strong:text-[var(--accent-blue)]"
                  dangerouslySetInnerHTML={{ __html: project.htmlContent }}
                />

                {/* Links */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[var(--border-dim)]">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
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