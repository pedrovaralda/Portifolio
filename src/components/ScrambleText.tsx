"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>{}[]|/\\~^";

interface ScrambleTextProps {
  children: string;
  /** Duration of the scramble effect in ms */
  duration?: number;
  /** Stagger delay — later characters resolve later (ms per char) */
  stagger?: number;
  /** Extra className for the wrapper span */
  className?: string;
  /** Whether the scramble is active (tie to global glitch state) */
  scramble?: boolean;
}

/**
 * Renders text with a character-scramble animation when `children` changes.
 * Each character cycles through random glitch characters before resolving
 * to its final value, with a left-to-right stagger.
 */
export function ScrambleText({
  children,
  duration = 400,
  stagger = 12,
  className,
  scramble,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const prevTextRef = useRef(children);
  const rafRef = useRef<number | null>(null);
  const isFirstRender = useRef(true);

  const runScramble = useCallback(
    (from: string, to: string) => {
      const maxLen = Math.max(from.length, to.length);
      const startTime = performance.now();
      const totalDuration = duration + stagger * maxLen;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);

        let result = "";
        for (let i = 0; i < maxLen; i++) {
          // Each char has its own resolve time based on stagger
          const charResolveTime = duration * 0.3 + stagger * i;
          const charProgress = Math.min(elapsed / charResolveTime, 1);

          if (charProgress >= 1) {
            // Character has resolved — show final value
            result += to[i] ?? "";
          } else if (to[i] === " " || to[i] === "\n") {
            // Preserve whitespace
            result += to[i];
          } else {
            // Show random glitch character
            result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayText(to);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    },
    [duration, stagger]
  );

  useEffect(() => {
    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayText(children);
      prevTextRef.current = children;
      return;
    }

    // Only animate when text actually changes
    if (children !== prevTextRef.current) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      runScramble(prevTextRef.current, children);
      prevTextRef.current = children;
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [children, runScramble]);

  return <span className={className}>{displayText}</span>;
}
