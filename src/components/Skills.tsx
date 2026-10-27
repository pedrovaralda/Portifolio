"use client";

import React from "react";
import { Cpu, Layers, Server, Cloud, Database } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TechIcons } from "./icons/TechIcons";
import { SkillItem } from "@/types/portfolio";
import { ScrambleText } from "./ScrambleText";

export function Skills() {
  const { content } = useLanguage();
  const { skillsSection, data } = content;
  const { skills } = data;

  const categories: SkillItem["category"][] = [
    "Frontend",
    "Backend",
    "Cloud & DevOps",
    "Databases & Tools",
  ];

  const categoryIcons: Record<
    SkillItem["category"],
    React.ComponentType<{ className?: string }>
  > = {
    Frontend: Layers,
    Backend: Server,
    "Cloud & DevOps": Cloud,
    "Databases & Tools": Database,
  };

  return (
    <section id="skills" className="py-16 sm:py-20 border-b border-zinc-850">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <ScrambleText>{skillsSection.badge}</ScrambleText>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            <ScrambleText>{skillsSection.title}</ScrambleText>
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-zinc-500 max-w-sm">
          <ScrambleText>{skillsSection.subtitle}</ScrambleText>
        </p>
      </div>

      {/* Grouped Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {categories.map((category) => {
          const groupSkills = skills.filter((s) => s.category === category);
          const MetaIcon = categoryIcons[category];
          const categoryTitle = skillsSection.categories[category];

          return (
            <div
              key={category}
              className="p-5 sm:p-6 rounded-xl border border-zinc-850 bg-zinc-900/30"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-zinc-850/80">
                <MetaIcon className="w-4 h-4 text-zinc-400" />
                <h3 className="text-sm font-mono font-semibold tracking-tight text-zinc-200">
                  <ScrambleText>{categoryTitle}</ScrambleText>
                </h3>
              </div>

              {/* Skills Icon Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {groupSkills.map((skill) => {
                  const IconComponent = TechIcons[skill.iconKey];

                  return (
                    <div
                      key={skill.name}
                      className="group relative flex items-center gap-2.5 p-2.5 rounded-lg border border-zinc-850 bg-zinc-900/60 hover:bg-zinc-850 hover:border-zinc-700 transition-all duration-150 cursor-default"
                    >
                      {/* Icon */}
                      <div className="w-5 h-5 shrink-0 flex items-center justify-center text-zinc-400 group-hover:text-zinc-100 transition-colors">
                        {IconComponent ? (
                          <IconComponent className="w-4 h-4" />
                        ) : (
                          <Cpu className="w-4 h-4" />
                        )}
                      </div>

                      {/* Name */}
                      <span className="text-xs font-mono font-medium text-zinc-300 group-hover:text-white transition-colors truncate">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
