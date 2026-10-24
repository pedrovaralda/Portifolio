"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, PortfolioContent } from "@/types/portfolio";
import { contentByLocale } from "@/data/portfolio";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  content: PortfolioContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio_preferred_locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (savedLocale === "pt" || savedLocale === "en") {
        setLocaleState(savedLocale);
        document.documentElement.lang = savedLocale === "pt" ? "pt-BR" : "en-US";
      } else {
        // Detect browser language if no preference saved
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("pt")) {
          setLocaleState("pt");
          document.documentElement.lang = "pt-BR";
        } else {
          setLocaleState("en");
          document.documentElement.lang = "en-US";
        }
      }
    } catch {
      // localStorage may be disabled in private mode
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale === "pt" ? "pt-BR" : "en-US";
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLocale = () => {
    const next = locale === "pt" ? "en" : "pt";
    setLocale(next);
  };

  const content = contentByLocale[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, content }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
