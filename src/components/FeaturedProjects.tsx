import React from "react";
import { Github, ExternalLink, Sparkles, FolderGit2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export function FeaturedProjects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-16 sm:py-20 border-b border-zinc-850">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Selected Engineering Projects
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-zinc-500 max-w-sm">
          Architected for high throughput, type safety, and production resilience.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-xl border border-zinc-850 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-200"
          >
            <div>
              {/* Category and Featured Pill */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/60">
                  {project.category}
                </span>

                {project.featured && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400/90">
                    <Sparkles className="w-3 h-3" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <p className="mt-1 text-xs font-mono text-zinc-400">
                {project.tagline}
              </p>

              {/* Description */}
              <p className="mt-3.5 text-sm text-zinc-400 leading-relaxed">
                {project.description}
              </p>

              {/* Impact / Metric Banner */}
              {project.impactMetric && (
                <div className="mt-4 p-2.5 rounded-lg border border-zinc-800 bg-zinc-950/60 text-xs font-mono text-zinc-300 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">⚡</span>
                  <span className="text-zinc-300">{project.impactMetric}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-5 border-t border-zinc-850/80">
              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-850 text-zinc-300 border border-zinc-750"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 text-xs font-mono font-medium text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
                  aria-label={`View ${project.title} GitHub repository`}
                >
                  <Github className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200" />
                  <span>Source Code</span>
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 text-xs font-mono font-medium text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
