"use client";

import { useEffect, useRef } from "react";

/**
 * The Istanbul × Bali visual device: a single thin line connecting the two
 * city labels, with a small yellow marker at its midpoint — the meeting
 * point between the two energies. Grows once on scroll-in, same restrained
 * technique as the Manifesto's connecting line, never a persistent/looping
 * animation (this chapter is deliberately the calmer one).
 */
export function CityLine() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.style.transform = "scaleX(0)";
    el.style.transition = "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.style.transform = "scaleX(1)";
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div aria-hidden className="relative h-px w-full bg-line-soft">
      <div ref={lineRef} className="absolute inset-y-0 left-0 h-px w-full origin-left bg-kite" />
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kite" />
    </div>
  );
}
