"use client";

import React from "react";
import { Github, Linkedin, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CopyEmailButton } from "./CopyEmailButton";

export function Hero() {
  const { content } = useLanguage();
  const { hero, data } = content;
  const { personal, socials, fastFacts } = data;

  return (
    <section className="pt-10 pb-16 sm:pt-16 sm:pb-20 border-b border-zinc-850">
      {/* Availability Status Badge */}
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{personal.availability.status}</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-500">
          <MapPin className="w-3.5 h-3.5 text-zinc-600" />
          <span>{personal.location}</span>
          <span className="text-zinc-700">•</span>
          <Clock className="w-3.5 h-3.5 text-zinc-600" />
          <span>{personal.timeZone.split(" ")[0]}</span>
        </div>
      </div>

      {/* Main Headline & Intro */}
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 font-sans leading-[1.15]">
          {hero.headline}
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
          {personal.shortBio}
        </p>
      </div>

      {/* Primary CTAs with Accessible Text Labels & Icons */}
      <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
        {/* GitHub Button CTA */}
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 text-sm font-medium text-zinc-100 transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          <Github className="w-4 h-4 text-zinc-300" />
          <span>{hero.githubLabel}</span>
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
          <span>{hero.linkedinLabel}</span>
          <span className="text-xs font-mono text-zinc-500">{hero.connectLabel}</span>
        </a>

        {/* Interactive Copy Email CTA */}
        <CopyEmailButton email={personal.email} />
      </div>

      {/* Fast Facts for Recruiters (Quick Assessment Grid) */}
      <div className="mt-12 pt-8 border-t border-zinc-900 grid grid-cols-2 md:grid-cols-4 gap-4">
        {fastFacts.map((fact) => (
          <div
            key={fact.label}
            className="p-3.5 rounded-lg border border-zinc-900 bg-zinc-950/40 hover:border-zinc-800/80 transition-colors"
          >
            <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              {fact.label}
            </span>
            <span className="mt-1 block text-sm font-mono font-medium text-zinc-200">
              {fact.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
