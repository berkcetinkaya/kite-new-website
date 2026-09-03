"use client";

import { useEffect, useRef, useState } from "react";
import { SiteContainer, LoopIcon } from "@/components/ui";
import { cn } from "@/lib/cn";

interface Stage {
  number: string;
  name: string;
  term: string;
  question: string;
  details: string[];
  outcome: string;
}

interface SystemCanvasProps {
  canvasDetails: string[];
  stages: Stage[];
  loopNote: string;
}

type Align = "left" | "center" | "right";
type LabelPos = "above" | "below";

/** Six hand-placed coordinates in a 0–100 × 0–100 space — a route with real
 * turns and elevation changes, not a circle. `align`/`labelPos` are picked
 * per node so labels never run off the canvas edge or collide with the
 * return sweep underneath. */
const NODES: Array<{ x: number; y: number; align: Align; labelPos: LabelPos }> = [
  { x: 8, y: 72, align: "left", labelPos: "above" },
  { x: 26, y: 28, align: "left", labelPos: "below" },
  { x: 44, y: 58, align: "center", labelPos: "above" },
  { x: 62, y: 20, align: "center", labelPos: "below" },
  { x: 80, y: 50, align: "right", labelPos: "above" },
  { x: 95, y: 14, align: "right", labelPos: "below" },
];

/** Segment `i` is the trajectory *leaving* stage `i` — segment 5 is the
 * return sweep leaving 06 (ÖĞREN) back down to 01 (ANLA), so hovering a
 * stage highlights exactly the path it produces, including the loop. */
const SEGMENTS = [
  "M 8 72 C 14 55, 20 38, 26 28",
  "M 26 28 C 32 38, 38 50, 44 58",
  "M 44 58 C 50 46, 56 30, 62 20",
  "M 62 20 C 68 30, 74 42, 80 50",
  "M 80 50 C 86 38, 91 24, 95 14",
  "M 95 14 C 99 60, 55 96, 8 72",
];

/**
 * The section's signature moment: a black "route map" rather than six
 * cards. Node markers are plain HTML circles (not SVG `<circle>`s) placed by
 * percentage over an SVG path overlay that runs `preserveAspectRatio="none"`
 * — the same split HeroArtwork.tsx uses for its kite string vs. kite mark,
 * for the same reason: a non-uniformly-scaled viewBox stretches curves
 * (fine, even desirable here) but would warp true circles into ellipses.
 *
 * One piece of state (`hovered`) drives the "alive" feel: it dims every
 * other segment/node/label slightly rather than hiding anything, per brief.
 * A second piece (`revealed`) is set once by an IntersectionObserver the
 * first time the canvas enters the viewport, and staggers each segment's
 * stroke-dashoffset transition (`.system-path` in globals.css) so the loop
 * draws itself 01→06 then back to 01, once, and stays drawn.
 */
export function SystemCanvas({ canvasDetails, stages, loopNote }: SystemCanvasProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-ink">
      {canvasDetails[0] && (
        <span
          aria-hidden
          className="absolute left-gutter top-lg hidden font-body text-[9px] uppercase tracking-widest text-[rgba(242,238,228,0.3)] xl:block"
        >
          {canvasDetails[0]}
        </span>
      )}
      {canvasDetails[1] && (
        <span
          aria-hidden
          className="absolute bottom-lg right-gutter hidden font-body text-[9px] uppercase tracking-widest text-[rgba(242,238,228,0.3)] xl:block"
        >
          {canvasDetails[1]}
        </span>
      )}

      {/* Desktop: technical route map */}
      <div ref={canvasRef} className="hidden py-3xl xl:block">
        <SiteContainer>
          <div className="relative min-h-[560px] w-full 3xl:min-h-[640px]">
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <line x1={0} y1={25} x2={100} y2={25} stroke="var(--color-line-inverse)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
              <line x1={0} y1={50} x2={100} y2={50} stroke="var(--color-line-inverse)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
              <line x1={0} y1={75} x2={100} y2={75} stroke="var(--color-line-inverse)" strokeWidth={1} vectorEffect="non-scaling-stroke" />

              {SEGMENTS.map((d, i) => {
                const isReturn = i === SEGMENTS.length - 1;
                const isActive = hovered === i;
                const isDimmed = hovered !== null && !isActive;
                const restWidth = isReturn ? 2.2 : 1.6;
                const activeWidth = isReturn ? 3.2 : 2.6;
                return (
                  <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="var(--color-kite-yellow)"
                    strokeWidth={isActive ? activeWidth : restWidth}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    pathLength={1}
                    className="system-path"
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: revealed ? 0 : 1,
                      transitionDelay: `${i * 190}ms`,
                      opacity: isDimmed ? 0.35 : 1,
                    }}
                  />
                );
              })}
            </svg>

            {/* Small loop glyph sitting on the return sweep's midpoint — the curve
                itself is bold and continuous already, this just makes the "it
                comes back" reading unmissable at a glance. */}
            <span
              aria-hidden
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 font-body text-[15px] font-semibold text-kite transition-editorial",
                hovered !== null && hovered !== SEGMENTS.length - 1 && "opacity-35",
              )}
              style={{ left: "71%", top: "69%" }}
            >
              <LoopIcon />
            </span>

            {NODES.map((node, i) => {
              const stage = stages[i];
              if (!stage) return null;
              const isActive = hovered === i;
              const isDimmed = hovered !== null && !isActive;

              return (
                <div key={stage.number} aria-hidden={false}>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-kite transition-editorial",
                      isActive ? "scale-125 bg-kite" : "bg-ink",
                      isDimmed && "opacity-50",
                    )}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  />
                  <button
                    type="button"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "absolute w-[168px] transition-editorial 3xl:w-[200px]",
                      node.align === "left" && "text-left",
                      node.align === "center" && "-translate-x-1/2 text-center",
                      node.align === "right" && "-translate-x-full text-right",
                      node.labelPos === "above" ? "-translate-y-[calc(100%+14px)]" : "translate-y-[14px]",
                      isDimmed && "opacity-45",
                    )}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <span
                      className="flex items-baseline gap-2xs"
                      style={{
                        justifyContent: node.align === "right" ? "flex-end" : node.align === "center" ? "center" : "flex-start",
                      }}
                    >
                      <span className="font-body text-[11px] font-semibold tabular-nums text-kite">{stage.number}</span>
                      <span className="font-display text-body-lg font-black uppercase leading-none text-paper">{stage.name}</span>
                    </span>
                    <span className="mt-3xs block font-body text-[9px] font-semibold uppercase tracking-widest text-[rgba(239,176,4,0.75)]">
                      {stage.term}
                    </span>
                    <p className={cn("mt-2xs font-body text-[13px] leading-snug transition-editorial", isActive ? "text-paper" : "text-paper-soft")}>
                      {stage.question}
                    </p>
                    <p
                      className={cn(
                        "mt-2xs font-body text-[10px] leading-snug transition-editorial",
                        isActive ? "text-[rgba(242,238,228,0.65)]" : "text-[rgba(242,238,228,0.32)]",
                      )}
                    >
                      {stage.details.join(" · ")}
                    </p>
                    <p
                      className={cn(
                        "mt-2xs font-body text-[10px] font-semibold uppercase tracking-wide transition-editorial",
                        isActive ? "text-kite" : "text-[rgba(239,176,4,0.55)]",
                      )}
                    >
                      {stage.outcome}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </SiteContainer>
      </div>

      {/* Mobile: vertical trajectory — one continuous yellow line, six stops, loop noted at the end. */}
      <div className="py-2xl xl:hidden">
        <SiteContainer>
          <div className="relative pl-lg">
            <span aria-hidden className="absolute bottom-0 left-[5px] top-[6px] w-[2px] bg-kite" />
            <div className="space-y-xl">
              {stages.map((stage) => (
                <div key={stage.number} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-lg top-[6px] h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-kite bg-ink"
                  />
                  <div className="flex items-baseline gap-sm">
                    <span className="font-body text-[11px] font-semibold tabular-nums text-kite">{stage.number}</span>
                    <span className="font-display text-display-sm font-black uppercase leading-none text-paper">{stage.name}</span>
                  </div>
                  <span className="mt-3xs block font-body text-[9px] font-semibold uppercase tracking-widest text-[rgba(239,176,4,0.75)]">
                    {stage.term}
                  </span>
                  <p className="mt-2xs font-body text-body-sm text-paper-soft">{stage.question}</p>
                  <p className="mt-2xs font-body text-[11px] leading-snug text-[rgba(242,238,228,0.4)]">{stage.details.join(" · ")}</p>
                  <p className="mt-xs font-body text-[11px] font-semibold uppercase tracking-wide text-kite">{stage.outcome}</p>
                </div>
              ))}
            </div>
            <div className="relative mt-lg">
              <span aria-hidden className="absolute -left-lg top-[6px] h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-kite bg-kite" />
              <p className="flex items-center gap-2xs font-body text-[11px] font-semibold uppercase tracking-widest text-kite">
                <LoopIcon aria-hidden />
                {loopNote}
              </p>
            </div>
          </div>
        </SiteContainer>
      </div>
    </div>
  );
}
