"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Terminal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrambleText } from "./ScrambleText";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { content } = useLanguage();
  const { footer, data } = content;
  const { personal, socials } = data;

  return (
    <footer className="border-t border-zinc-900 py-10 mt-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-zinc-600" />
          <span>
            © {currentYear} {personal.name}. <ScrambleText>{footer.builtWith}</ScrambleText>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            LinkedIn
          </a>
          <Link
            href="#"
            className="inline-flex items-center gap-1 hover:text-zinc-300 transition-colors pl-2 border-l border-zinc-850"
            aria-label={footer.backToTop}
          >
            <span>
              <ScrambleText>{footer.backToTop}</ScrambleText>
            </span>
            <ArrowUp className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
