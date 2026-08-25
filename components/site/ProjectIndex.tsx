"use client";

import { useEffect, useRef, useState } from "react";
import { EditorialGrid } from "@/components/ui";
import { cn } from "@/lib/cn";

interface Project {
  number: string;
  name: string;
  services: string[];
  ongoing?: boolean;
  featured?: boolean;
  href?: string;
}

interface ProjectIndexProps {
  projects: Project[];
  featuredLabel: string;
  statusOngoing: string;
}

const PREVIEW_WIDTH = 210;
const PREVIEW_HEIGHT = 160;
const PREVIEW_GAP = 24;
const PREVIEW_OFFSET_X = 40;
const PREVIEW_MIN_TOP = 96;

/**
 * The preview's vertical position is anchored to just above the active
 * row's own top edge — not to the cursor's Y — so it never overlaps that
 * row's name regardless of row height (the featured row runs much taller
 * than the rest). Horizontally it still tracks the cursor for the "follows
 * the pointer" feel the row height doesn't put at risk.
 */
function previewTargetFor(rect: DOMRect, clientX: number): { x: number; y: number } {
  return {
    x: clientX + PREVIEW_OFFSET_X,
    y: Math.max(rect.top - PREVIEW_HEIGHT - PREVIEW_GAP, PREVIEW_MIN_TOP),
  };
}

export function ProjectIndex({ projects, featuredLabel, statusOngoing }: ProjectIndexProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [canPreview, setCanPreview] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const reduceMotion = useRef(false);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(min-width: 1280px)");

    function update() {
      setCanPreview(hoverQuery.matches && widthQuery.matches);
      reduceMotion.current = motionQuery.matches;
    }
    update();
    hoverQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    widthQuery.addEventListener("change", update);
    return () => {
      hoverQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
      widthQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!canPreview) return;
    let raf = requestAnimationFrame(frame);
    function frame() {
      const lerp = reduceMotion.current ? 1 : 0.18;
      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      raf = requestAnimationFrame(frame);
    }
    return () => cancelAnimationFrame(raf);
  }, [canPreview]);

  function handleRowEnter(index: number, event: React.MouseEvent<HTMLElement>) {
    setActiveIndex(index);
    target.current = previewTargetFor(event.currentTarget.getBoundingClientRect(), event.clientX);
  }

  function handleRowMouseMove(event: React.MouseEvent<HTMLElement>) {
    target.current.x = event.clientX + PREVIEW_OFFSET_X;
  }

  function handleRowFocus(index: number, el: HTMLElement) {
    setActiveIndex(index);
    const rect = el.getBoundingClientRect();
    const point = previewTargetFor(rect, rect.right - 80 - PREVIEW_OFFSET_X);
    target.current = point;
    current.current = point;
  }

  const active = activeIndex !== null ? projects[activeIndex] : undefined;

  return (
    <div className="relative">
      <ul>
        {projects.map((project, i) => (
          <li key={project.number} className="border-t border-line last:border-b">
            <button
              type="button"
              onMouseEnter={(e) => handleRowEnter(i, e)}
              onMouseMove={canPreview ? handleRowMouseMove : undefined}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={(e) => handleRowFocus(i, e.currentTarget)}
              onBlur={() => setActiveIndex(null)}
              className={cn(
                "group block w-full text-left transition-editorial",
                project.featured ? "py-lg xl:py-xl" : "py-md xl:py-lg",
              )}
            >
              <EditorialGrid columns={{ base: 4, md: 6, xl: 12 }} className="items-start">
                <div className="col-span-2 flex items-center gap-xs md:col-span-2 xl:col-span-1 xl:block">
                  <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft transition-editorial group-hover:text-ink group-focus-visible:text-ink">
                    {project.number}
                  </span>
                  {project.featured && (
                    <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-kite-dark xl:mt-2xs xl:block">
                      {featuredLabel}
                    </span>
                  )}
                </div>

                <div className="col-span-4 mt-2xs md:col-span-6 xl:col-span-8 xl:mt-0">
                  <span
                    className={cn(
                      "block font-display font-black uppercase leading-none text-ink transition-editorial group-hover:translate-x-2 group-focus-visible:translate-x-2",
                      project.featured
                        ? "text-display-xl xl:text-display-2xl"
                        : "text-display-lg xl:text-display-xl",
                    )}
                  >
                    {project.name}
                  </span>
                  <div className="mt-sm flex flex-wrap items-center gap-x-2xs gap-y-3xs font-body text-label font-semibold uppercase tracking-wide text-ink-soft">
                    {project.services.map((service, si) => (
                      <span key={service} className="flex items-center gap-2xs">
                        {si > 0 && (
                          <span aria-hidden className="text-line">
                            /
                          </span>
                        )}
                        {service}
                      </span>
                    ))}
                    {project.ongoing && (
                      <span className="ml-xs flex items-center gap-2xs text-ink">
                        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-kite" />
                        {statusOngoing}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-span-4 mt-sm flex items-center md:col-span-6 xl:col-span-3 xl:mt-0 xl:justify-end xl:self-center">
                  <span
                    aria-hidden
                    className="font-display text-display-sm text-ink transition-editorial group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 xl:text-display-md"
                  >
                    ↗
                  </span>
                </div>
              </EditorialGrid>
            </button>
          </li>
        ))}
      </ul>

      {canPreview && (
        <div
          ref={previewRef}
          aria-hidden
          style={{ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
          className={cn(
            "pointer-events-none fixed left-0 top-0 z-40 flex flex-col justify-between border border-line bg-ink p-sm transition-opacity duration-200",
            active ? "opacity-100" : "opacity-0",
          )}
        >
          {active && (
            <>
              <span className="font-display text-display-md font-black leading-none text-kite">
                {active.number}
              </span>
              <span className="font-body text-label font-semibold uppercase tracking-wide text-paper">
                {active.name}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
