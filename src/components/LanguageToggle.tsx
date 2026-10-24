"use client";

import React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
  variant?: "pill" | "compact";
}

export function LanguageToggle({ className, variant = "pill" }: LanguageToggleProps) {
  const { locale, setLocale, toggleLocale } = useLanguage();

  if (variant === "compact") {
    return (
      <button
        onClick={toggleLocale}
        title={locale === "pt" ? "Switch to English (US)" : "Mudar para Português (Brasil)"}
        aria-label={locale === "pt" ? "Switch to English" : "Mudar para Português"}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-850 hover:border-zinc-700 text-xs font-mono text-zinc-300 transition-all duration-150 active:scale-[0.97]",
          className
        )}
      >
        <Languages className="w-3.5 h-3.5 text-zinc-400" />
        <span className="font-semibold text-zinc-200 uppercase">{locale}</span>
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={cn(
        "inline-flex items-center p-0.5 rounded-lg border border-zinc-800 bg-zinc-900/90 text-xs font-mono select-none",
        className
      )}
    >
      <div className="flex items-center pl-2 pr-1 text-zinc-500">
        <Languages className="w-3.5 h-3.5 text-zinc-400" />
      </div>

      <button
        type="button"
        onClick={() => setLocale("pt")}
        aria-pressed={locale === "pt"}
        title="Português (Brasil)"
        className={cn(
          "px-2 py-1 rounded-md transition-all duration-150 font-medium",
          locale === "pt"
            ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60 font-semibold"
            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850/50"
        )}
      >
        PT-BR
      </button>

      <span className="text-zinc-700 mx-0.5 select-none">/</span>

      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        title="English (US)"
        className={cn(
          "px-2 py-1 rounded-md transition-all duration-150 font-medium",
          locale === "en"
            ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60 font-semibold"
            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850/50"
        )}
      >
        EN
      </button>
    </div>
  );
}
