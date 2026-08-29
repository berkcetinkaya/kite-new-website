"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface Phase {
  number: string;
  timeLabel: string;
  title: string;
  statement: string;
  areasLabel?: string;
  areas?: string[];
  outputLabel?: string;
  output?: string;
  note?: string;
  microLabel?: string;
}

/**
 * One entry on the master timeline (phases 01–03; phase 04 is structurally
 * different and rendered separately in FirstMonth.tsx). The vertical kite
 * line and every phase's marker share one coordinate: both sit at the same
 * fixed offset inside the shared `relative` wrapper the parent renders them
 * in, so the line reads as one continuous rail regardless of how tall any
 * given phase's content runs. `hovered` only ever affects this one row —
 * "the timeline gains contrast" reads as each row independently sharpening
 * on its own hover, not one shared state across rows.
 */
export function FirstMonthPhase({ phase, isLast }: { phase: Phase; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn("group relative border-t border-line", isLast && "border-b")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        aria-hidden
        className={cn(
          "absolute -left-lg top-xl h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-kite bg-paper transition-editorial",
          hovered && "scale-125 bg-kite",
        )}
      />

      <div className="grid grid-cols-1 gap-y-md py-lg xl:grid-cols-12 xl:items-start xl:gap-x-lg xl:py-xl">
        <div className="xl:col-span-3">
          <span className="font-body text-[11px] font-semibold uppercase tracking-widest text-kite">{phase.timeLabel}</span>
          <div className="mt-2xs flex items-baseline gap-sm">
            <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
              {phase.number}
            </span>
            {phase.microLabel && (
              <span className="font-body text-[9px] font-semibold uppercase tracking-widest text-ink-soft">
                {phase.microLabel}
              </span>
            )}
          </div>
        </div>

        <div className="xl:col-span-4 xl:border-l xl:border-line-soft xl:pl-lg">
          <h3 className="font-display text-display-sm font-black uppercase leading-[1.05] text-ink xl:text-display-md">
            {phase.title}
          </h3>
          <p className="mt-sm font-body text-body-md text-ink-soft">{phase.statement}</p>
        </div>

        <div className="xl:col-span-5 xl:border-l xl:border-line-soft xl:pl-lg">
          {phase.areas && (
            <>
              {phase.areasLabel && (
                <span className="flex items-center gap-2xs">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-kite" />
                  <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft">
                    {phase.areasLabel}
                  </span>
                </span>
              )}
              <ul
                className={cn(
                  "mt-2xs grid grid-cols-2 gap-x-md gap-y-2xs transition-editorial",
                  hovered ? "text-ink" : "text-ink-soft",
                )}
              >
                {phase.areas.map((area) => (
                  <li key={area} className="border-t border-line-soft pt-3xs font-body text-label">
                    {area}
                  </li>
                ))}
              </ul>
            </>
          )}

          {phase.output && (
            <div className="mt-md border-t border-line pt-sm xl:mt-lg">
              {phase.outputLabel && (
                <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-kite">
                  {phase.outputLabel}
                </span>
              )}
              <p className="mt-3xs font-display text-body-lg font-black uppercase leading-[1.1] text-ink">{phase.output}</p>
              {phase.note && <p className="mt-2xs max-w-[42ch] font-body text-label italic text-ink-soft">{phase.note}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
