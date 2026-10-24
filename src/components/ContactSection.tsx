import React from "react";
import { Mail, Github, Linkedin, ArrowUpRight, MessageSquare, Clock } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { CopyEmailButton } from "./CopyEmailButton";

export function ContactSection() {
  const { personal, socials } = portfolioData;

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="p-8 sm:p-10 rounded-2xl border border-zinc-850 bg-zinc-900/40 relative overflow-hidden">
        {/* Subtle decorative dot pattern */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Direct Channel</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Let&apos;s build something impactful.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            I am currently open to senior engineering roles, high-impact distributed systems
            challenges, and technical consulting. Whether you have an open position or want to
            discuss architectural trade-offs, my inbox is open.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{personal.timeZone}</span>
            <span className="text-zinc-700">•</span>
            <span>Typical response: &lt; 24h</span>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              <Mail className="w-4 h-4 text-zinc-950" />
              <span>Send Email</span>
            </a>

            <CopyEmailButton email={personal.email} variant="pill" />

            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>

            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
