"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Full-page glitch overlay that fires a brief VHS-style distortion
 * every time the locale changes. Pure CSS animation — no layout shift.
 */
export function GlitchOverlay() {
  const { locale } = useLanguage();
  const [glitching, setGlitching] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Track that initial mount is done so we don't flash on first load
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setGlitching(true);
    const timer = setTimeout(() => setGlitching(false), 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  if (!glitching) return null;

  return (
    <div
      className="glitch-overlay"
      aria-hidden="true"
    />
  );
}
