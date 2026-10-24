"use client";

import React from "react";
import { Sparkles, FolderGit2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function FeaturedProjects() {
  const { content } = useLanguage();
  const { projectsSection, data } = content;
  const { projects } = data;

  return (
    <section id="projects" className="py-16 sm:py-20 border-b border-zinc-850">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{projectsSection.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            {projectsSection.title}
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-zinc-500 max-w-sm">
          {projectsSection.subtitle}
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
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-750">
                  {project.category}
                </span>

                {project.featured && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400/90">
                    <Sparkles className="w-3 h-3" />
                    <span>{projectsSection.featuredBadge}</span>
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

            <div className="mt-6 pt-4 border-t border-zinc-850/80">
              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-850 text-zinc-300 border border-zinc-750"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
