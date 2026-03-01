import Link from 'next/link';
import Image from 'next/image';
import projects from '@/data/projects';
import { pageMetadata } from '@/lib/seo';
import { ExternalLink, Github } from 'lucide-react';

export const metadata = pageMetadata({
  title: 'All Projects',
  description: 'Complete list of AI/ML and product engineering projects by Viraj Paradkar.',
  path: '/projects',
  type: 'website',
});

export default function ProjectsPage() {
  return (
    <main className="section-tone min-h-screen px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow-label">Projects Archive</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.03em] text-slate-100 md:text-6xl">
              All Projects
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
              A complete view of projects across AI research, product engineering, and deployment-focused systems.
            </p>
          </div>

          <Link
            href="/#projects"
            className="w-fit rounded-md border border-slate-200/35 bg-slate-200/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-100 transition-all duration-300 hover:border-cyan-200/60 hover:text-cyan-100"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="surface-card overflow-hidden rounded-2xl">
              <div className="relative h-48 overflow-hidden border-b border-slate-200/10">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center opacity-75"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full bg-[radial-gradient(circle_at_22%_25%,rgba(125,211,252,0.2),transparent_40%),linear-gradient(140deg,#121c2d_0%,#090d14_100%)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1019] via-[#0b1019]/20 to-transparent" />

                <div className="absolute right-4 top-4 flex flex-wrap gap-2">
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
                <h2 className="text-xl font-bold leading-tight text-slate-50">
                  {project.name}
                </h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  {project.description}
                </p>

                <div
                  className="prose prose-invert prose-sm max-w-none prose-headings:font-bold prose-headings:text-slate-100 prose-li:text-slate-300 prose-p:leading-relaxed prose-p:text-slate-300 prose-strong:text-cyan-100"
                  dangerouslySetInnerHTML={{ __html: project.htmlContent }}
                />

                <div className="flex flex-wrap items-center gap-3 border-t border-slate-300/20 pt-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-slate-200/30 bg-slate-200/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-100 transition-colors hover:border-cyan-200/65 hover:text-cyan-100"
                    >
                      <Github className="h-4 w-4" />
                      Source
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-slate-200/30 bg-slate-200/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-100 transition-colors hover:border-cyan-200/65 hover:text-cyan-100"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
