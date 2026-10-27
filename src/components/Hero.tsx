"use client";

import React from "react";
import { Github, Linkedin, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CopyEmailButton } from "./CopyEmailButton";
import { ScrambleText } from "./ScrambleText";
import { ScrollReveal } from "./ScrollReveal";

function renderBioWithLinks(text: string) {
  const parts = text.split(/(@GrupoRiHappy)/g);
  return parts.map((part, index) => {
    if (part === "@GrupoRiHappy") {
      return (
        <a
          key={index}
          href="https://www.linkedin.com/company/grupo-ri-happy"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-zinc-100 hover:text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-200 transition-colors inline-flex items-center gap-0.5 group/rihappy"
        >
          <span>@GrupoRiHappy</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover/rihappy:text-zinc-200 inline" />
        </a>
      );
    }
    return <ScrambleText key={index}>{part}</ScrambleText>;
  });
}

export function Hero() {
  const { content } = useLanguage();
  const { hero, data } = content;
  const { personal, socials, fastFacts } = data;

  return (
    <section className="pt-10 pb-16 sm:pt-16 sm:pb-20 border-b border-zinc-850">
      {/* Availability Status Badge & Meta */}
      <ScrollReveal delay={0} className="flex items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <ScrambleText>{personal.availability.status}</ScrambleText>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-500">
          <MapPin className="w-3.5 h-3.5 text-zinc-600" />
          <ScrambleText>{personal.location}</ScrambleText>
          <span className="text-zinc-700">•</span>
          <Clock className="w-3.5 h-3.5 text-zinc-600" />
          <span>{personal.timeZone.split(" ")[0]}</span>
        </div>
      </ScrollReveal>

      {/* Main Headline & Intro */}
      <ScrollReveal delay={100} className="space-y-4 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 font-sans leading-[1.15]">
          <ScrambleText>{hero.headline}</ScrambleText>
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
          {renderBioWithLinks(personal.shortBio)}
        </p>
      </ScrollReveal>

      {/* Primary CTAs with Accessible Text Labels & Icons */}
      <ScrollReveal delay={180} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
        {/* GitHub Button CTA */}
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 text-sm font-medium text-zinc-100 transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          <Github className="w-4 h-4 text-zinc-300" />
          <span>
            <ScrambleText>{hero.githubLabel}</ScrambleText>
          </span>
          <span className="text-xs font-mono text-zinc-500">@pedrovaralda</span>
        </a>

        {/* LinkedIn Button CTA */}
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 text-sm font-medium text-zinc-100 transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          <Linkedin className="w-4 h-4 text-[#0a66c2]" />
          <span>
            <ScrambleText>{hero.linkedinLabel}</ScrambleText>
          </span>
          <span className="text-xs font-mono text-zinc-500">
            <ScrambleText>{hero.connectLabel}</ScrambleText>
          </span>
        </a>

        {/* Interactive Copy Email CTA */}
        <CopyEmailButton email={personal.email} />
      </ScrollReveal>

      {/* Fast Facts for Recruiters (Quick Assessment Grid) */}
      <div className="mt-12 pt-8 border-t border-zinc-900 grid grid-cols-2 md:grid-cols-4 gap-4">
        {fastFacts.map((fact, index) => (
          <ScrollReveal
            key={fact.label}
            delay={220 + index * 60}
            className="p-3.5 rounded-lg border border-zinc-900 bg-zinc-950/40 hover:border-zinc-800/80 transition-colors"
          >
            <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              <ScrambleText>{fact.label}</ScrambleText>
            </span>
            <span className="mt-1 block text-sm font-mono font-medium text-zinc-200">
              <ScrambleText>{fact.value}</ScrambleText>
            </span>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
