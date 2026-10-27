"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>{}[]|/\\~^";
const DEFAULT_BATCH_DURATION = 200;

interface ScrambleTextProps {
  children: string;
  /** Duration of the scramble effect in ms (default: 200ms for instantaneous batch) */
  duration?: number;
  /** Stagger is deprecated / ignored to ensure instant single-batch resolution */
  stagger?: number;
  /** Extra className for the wrapper span */
  className?: string;
  /** Optional manual trigger */
  scramble?: boolean;
}

/**
 * Renders text with an instantaneous batch scramble animation when `children` changes.
 * Rather than resolving phrase-by-phrase or character-by-character, all characters
 * across all elements scramble simultaneously and resolve together as a single batch.
 */
export function ScrambleText({
  children,
  duration = DEFAULT_BATCH_DURATION,
  className,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const prevTextRef = useRef(children);
  const rafRef = useRef<number | null>(null);
  const isFirstRender = useRef(true);

  const runBatchScramble = useCallback(
    (target: string) => {
      const startTime = performance.now();
      const targetLen = target.length;
      // Fixed unified duration for instant batch resolution
      const batchDuration = duration || DEFAULT_BATCH_DURATION;

      const tick = (now: number) => {
        const elapsed = now - startTime;

        if (elapsed >= batchDuration) {
          // Instantly snap to final text as a single batch
          setDisplayText(target);
          return;
        }

        // All characters scramble simultaneously
        let result = "";
        for (let i = 0; i < targetLen; i++) {
          const char = target[i];
          if (char === " " || char === "\n" || char === "\t" || char === "\r") {
            result += char;
          } else {
            result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
        }

        setDisplayText(result);
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    },
    [duration]
  );

  useEffect(() => {
    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayText(children);
      prevTextRef.current = children;
      return;
    }

    // When text changes, scramble all characters at once as a single batch
    if (children !== prevTextRef.current) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      runBatchScramble(children);
      prevTextRef.current = children;
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [children, runBatchScramble]);

  return <span className={className}>{displayText}</span>;
}
