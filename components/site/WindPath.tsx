"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface Point {
  x: number;
  y: number;
}

function buildPath(start: Point, c1: Point, c2: Point, end: Point): string {
  return `M ${start.x} ${start.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${end.x} ${end.y}`;
}

const DESKTOP_VIEWBOX = "0 0 1000 600";
const DESKTOP_START: Point = { x: 30, y: 520 };
const DESKTOP_END: Point = { x: 920, y: 90 };
const DESKTOP_C1: Point = { x: 300, y: 470 };
const DESKTOP_C2: Point = { x: 640, y: 160 };

const MOBILE_VIEWBOX = "0 0 400 520";
const MOBILE_START: Point = { x: 30, y: 460 };
const MOBILE_END: Point = { x: 340, y: 60 };
const MOBILE_C1: Point = { x: 120, y: 300 };
const MOBILE_C2: Point = { x: 250, y: 160 };

/**
 * A single thin curved path evoking a kite's tail/trajectory, ending in a
 * minimal abstract kite outline — not the logo, not an illustration.
 *
 * Desktop: the curve eases toward the pointer position with a slow lerp
 * (air-pressure feel, not 1:1 following), and only when the pointer is fine
 * and the visitor hasn't asked for reduced motion.
 *
 * Mobile: static geometry with a very small ambient CSS sway — no pointer
 * tracking on touch devices at all.
 */
export function WindPath({ variant, className }: { variant: "desktop" | "mobile"; className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== "desktop") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) return;

    let target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;

    function onPointerMove(event: PointerEvent) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      target = { x: Math.max(-1, Math.min(1, nx)), y: Math.max(-1, Math.min(1, ny)) };
    }

    function frame() {
      current.x += (target.x - current.x) * 0.045;
      current.y += (target.y - current.y) * 0.045;

      const c1: Point = {
        x: DESKTOP_C1.x + current.x * 40 - current.y * 18,
        y: DESKTOP_C1.y + current.y * 26 + current.x * 10,
      };
      const c2: Point = {
        x: DESKTOP_C2.x + current.x * 22 + current.y * 24,
        y: DESKTOP_C2.y + current.y * 34 - current.x * 14,
      };

      pathRef.current?.setAttribute("d", buildPath(DESKTOP_START, c1, c2, DESKTOP_END));
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("pointermove", onPointerMove);
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, [variant]);

  const isDesktop = variant === "desktop";
  const viewBox = isDesktop ? DESKTOP_VIEWBOX : MOBILE_VIEWBOX;
  const start = isDesktop ? DESKTOP_START : MOBILE_START;
  const c1 = isDesktop ? DESKTOP_C1 : MOBILE_C1;
  const c2 = isDesktop ? DESKTOP_C2 : MOBILE_C2;
  const end = isDesktop ? DESKTOP_END : MOBILE_END;

  return (
    <div ref={containerRef} aria-hidden className={cn("pointer-events-none", className)}>
      <svg viewBox={viewBox} className="h-full w-full" fill="none">
        <g className={isDesktop ? undefined : "wind-path-ambient"}>
          <path
            ref={pathRef}
            d={buildPath(start, c1, c2, end)}
            stroke="var(--color-ink)"
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={0.5}
          />
          <g transform={`translate(${end.x} ${end.y}) rotate(18)`} opacity={0.75}>
            <rect x={-12} y={-12} width={24} height={24} stroke="var(--color-ink)" strokeWidth={1.25} />
            <line x1={-12} y1={0} x2={12} y2={0} stroke="var(--color-ink)" strokeWidth={1} />
            <line x1={0} y1={-12} x2={0} y2={12} stroke="var(--color-ink)" strokeWidth={1} />
          </g>
        </g>
      </svg>
    </div>
  );
}
