"use client";

import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Experience() {
  const { content } = useLanguage();
  const { experienceSection, data } = content;
  const { experience } = data;

  return (
    <section id="experience" className="py-16 sm:py-20 border-b border-zinc-850">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{experienceSection.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            {experienceSection.title}
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-zinc-500 max-w-sm">
          {experienceSection.subtitle}
        </p>
      </div>

      {/* Vertical Timeline / Structured List */}
      <div className="relative pl-6 sm:pl-8 border-l border-zinc-800 space-y-12">
        {experience.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-950 bg-zinc-700 group-hover:bg-zinc-300 transition-colors" />

            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
                  {item.role}
                </h3>
                <div className="text-sm font-mono text-zinc-300 flex items-center gap-2 mt-0.5">
                  <span className="font-medium text-zinc-200">{item.company}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                    <MapPin className="w-3 h-3" />
                    {item.location} ({item.workType})
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 sm:text-right mt-1 sm:mt-0">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{item.period}</span>
              </div>
            </div>

            {/* Bullet points with quantifiable achievements */}
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              {item.description.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-zinc-600 mt-1 select-none font-mono text-xs">▸</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Key Technologies used */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-zinc-500 mr-1">
                {experienceSection.stackLabel}
              </span>
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
