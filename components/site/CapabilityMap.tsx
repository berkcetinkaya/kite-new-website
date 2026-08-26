"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface Node {
  label: string;
  x: number;
  y: number;
  accordionIndex: number;
  /** Which side of the dot the label sits on, so text never overlaps its own marker. */
  labelSide: "above" | "below";
}

/** Coordinates are percentages of the canvas — deliberately hand-plotted, not a symmetric wheel. */
const NODES: Node[] = [
  { label: "STRATEJİ", x: 30, y: 14, accordionIndex: 0, labelSide: "above" },
  { label: "KREATİF", x: 57, y: 6, accordionIndex: 0, labelSide: "above" },
  { label: "MEDYA", x: 83, y: 24, accordionIndex: 1, labelSide: "above" },
  { label: "WEB", x: 89, y: 60, accordionIndex: 2, labelSide: "below" },
  { label: "AI", x: 60, y: 88, accordionIndex: 3, labelSide: "below" },
  { label: "CRM", x: 27, y: 80, accordionIndex: 4, labelSide: "below" },
];

const CENTER = { x: 7, y: 47 };

/** viewBox matches the canvas's own aspect ratio (3:2) so circles and the
 * rotated marker square never get stretched into ellipses/rectangles. */
const VB_W = 150;
const VB_H = 100;
const toVbX = (pct: number) => (pct / 100) * VB_W;
const toVbY = (pct: number) => (pct / 100) * VB_H;

interface CapabilityMapProps {
  onActiveChange?: (accordionIndex: number | null) => void;
}

/**
 * Editorial capability map: a restrained hub-and-spoke system diagram, not
 * an infographic or network-viz widget. Thin black spokes tie every
 * discipline back to a small kite-outline index marker; one continuous
 * yellow line threads through the disciplines in the same order as the
 * accordion below, visualizing "many disciplines, one growth system."
 * Hover/focus on a label nudges its own spoke and dot, and (via
 * onActiveChange) the matching accordion row — never auto-opens it.
 */
export function CapabilityMap({ onActiveChange }: CapabilityMapProps) {
  const [active, setActive] = useState<number | null>(null);

  function setActiveNode(index: number | null) {
    setActive(index);
    onActiveChange?.(index !== null ? (NODES[index]?.accordionIndex ?? null) : null);
  }

  const pathD = `M ${NODES.map((n) => `${toVbX(n.x)} ${toVbY(n.y)}`).join(" L ")}`;

  return (
    <div className="relative hidden aspect-[3/2] w-full xl:block">
      <svg
        aria-hidden
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {NODES.map((n, i) => (
          <line
            key={`spoke-${n.label}`}
            x1={toVbX(CENTER.x)}
            y1={toVbY(CENTER.y)}
            x2={toVbX(n.x)}
            y2={toVbY(n.y)}
            stroke="var(--color-ink)"
            strokeWidth={active === i ? 0.9 : 0.5}
            vectorEffect="non-scaling-stroke"
            opacity={active === null || active === i ? 0.55 : 0.22}
            className="transition-editorial"
          />
        ))}

        <path
          d={pathD}
          fill="none"
          stroke="var(--color-kite-yellow)"
          strokeWidth={0.8}
          vectorEffect="non-scaling-stroke"
          opacity={0.85}
        />

        <g transform={`translate(${toVbX(CENTER.x)} ${toVbY(CENTER.y)}) rotate(45)`}>
          <rect
            x={-4}
            y={-4}
            width={8}
            height={8}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth={0.9}
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {NODES.map((n, i) => (
          <circle
            key={`dot-${n.label}`}
            cx={toVbX(n.x)}
            cy={toVbY(n.y)}
            r={active === i ? 2.2 : 1.5}
            fill={active === i ? "var(--color-kite-yellow)" : "var(--color-ink)"}
            className="transition-editorial"
          />
        ))}
      </svg>

      {NODES.map((n, i) => (
        <button
          key={n.label}
          type="button"
          onMouseEnter={() => setActiveNode(i)}
          onMouseLeave={() => setActiveNode(null)}
          onFocus={() => setActiveNode(i)}
          onBlur={() => setActiveNode(null)}
          className={cn(
            "absolute -translate-x-1/2 whitespace-nowrap font-body text-label font-semibold uppercase tracking-wide transition-editorial",
            n.labelSide === "above" ? "-translate-y-[calc(100%+10px)]" : "translate-y-[10px]",
            active === i ? "text-kite-dark" : "text-ink",
          )}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          {n.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Mobile/tablet replacement for the full map — a full node-and-line
 * diagram gets cramped below xl, so this is a compact static index instead:
 * one thin rule, six small ticks, no interactivity (touch has no hover).
 */
export function CapabilityMapMobile() {
  return (
    <ul className="border-l border-line xl:hidden">
      {NODES.map((n) => (
        <li key={n.label} className="relative py-3xs pl-md">
          <span aria-hidden className="absolute left-[-3px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 bg-kite" />
          <span className="font-body text-label font-semibold uppercase tracking-wide text-ink">{n.label}</span>
        </li>
      ))}
    </ul>
  );
}
