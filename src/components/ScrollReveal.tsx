"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in milliseconds before animating in */
  delay?: number;
  /** Distance in pixels to slide up from (default: 16) */
  distance?: number;
  /** Animation duration in milliseconds (default: 450) */
  duration?: number;
  /** Custom element tag */
  as?: React.ElementType;
}

/**
 * Lightweight GPU-accelerated scroll-reveal component.
 * Uses native IntersectionObserver to animate content into view once as the user scrolls down.
 * Supports staggered children and respects `prefers-reduced-motion`.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 18,
  duration = 450,
  as: Component = "div",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately show if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.08,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transform: isVisible ? "none" : `translateY(${distance}px)`,
        opacity: isVisible ? 1 : 0,
        transitionProperty: "transform, opacity",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={cn("will-change-[transform,opacity]", className)}
    >
      {children}
    </Component>
  );
}
