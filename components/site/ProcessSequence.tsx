"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

interface Stage {
  number: string;
  title: string;
}

interface ProcessSequenceProps {
  stages: Stage[];
  label: string;
}

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Five-stage editorial sequence, not a diagram: on desktop each stage gets
 * its own short horizontal tick that fills in turn; on mobile a vertical
 * line connects the dots top to bottom. Triggers once via IntersectionObserver
 * and never repeats — a quieter echo of the wind/direction motif, not a
 * process wizard.
 */
export function ProcessSequence({ stages, label }: ProcessSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const active = started || reduceMotion;

  useEffect(() => {
    if (reduceMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div ref={containerRef}>
      <p className="font-body text-label font-semibold uppercase tracking-wide text-ink-soft">{label}</p>

      <div className="mt-md flex flex-col gap-lg xl:mt-lg xl:flex-row xl:gap-0">
        {stages.map((stage, i) => (
          <div key={stage.number} className="flex gap-sm xl:flex-1 xl:flex-col xl:gap-sm xl:pr-md">
            <div className="hidden xl:block">
              <div className="relative h-px w-full bg-line-soft">
                <div
                  className="absolute inset-y-0 left-0 h-px origin-left bg-kite transition-editorial"
                  style={{
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                    transitionDuration: "600ms",
                    transitionDelay: active ? `${i * 140}ms` : "0ms",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col items-center xl:hidden">
              <span
                className={cn(
                  "h-2 w-2 shrink-0 rounded-full transition-editorial",
                  active ? "bg-kite" : "bg-line-soft",
                )}
                style={{ transitionDelay: active ? `${i * 140}ms` : "0ms" }}
              />
              {i < stages.length - 1 && <span className="mt-2xs w-px flex-1 bg-line-soft" />}
            </div>

            <div
              className="pb-lg transition-editorial xl:pb-0"
              style={{
                opacity: active ? 1 : 0.4,
                transitionDelay: active ? `${i * 140}ms` : "0ms",
              }}
            >
              <span className="block font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
                {stage.number}
              </span>
              <span className="mt-2xs block font-display text-display-sm font-black uppercase leading-none text-ink xl:text-display-md">
                {stage.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
