"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowIcon } from "@/components/ui";
import { cn } from "@/lib/cn";

interface OverlayTopic {
  number: string;
  label: string;
}

interface EditorialOverlayProps {
  /** Reused as the trigger's own text, the dialog's aria-label, and the chrome's header kicker. */
  label: string;
  closeLabel: string;
  /** Internal 01–04 nav. Pass an empty array for a single-panel overlay — the nav row simply won't render. */
  topics: OverlayTopic[];
  /** Same length as topics (or a single element when topics is empty) — pre-rendered server content, never re-fetched. */
  panels: ReactNode[];
  /**
   * Full layout for the trigger `<button>`, including display/flex
   * utilities — the component itself contributes no layout classes so two
   * very different trigger shapes (ApproachEntry's inline label+arrow,
   * SelectedWork's full-width title+support+arrow row) can share one
   * implementation without fighting each other's classes.
   */
  triggerClassName?: string;
  arrowClassName?: string;
  /**
   * Optional short action word (e.g. "KEŞFET") rendered inside the trigger
   * next to the arrow — part of the same clickable button, never a
   * separate element. Omitted by default so existing callers (ApproachEntry)
   * render exactly as before.
   */
  actionLabel?: string;
  /** Optional short line under `label`, e.g. "Discover the thinking behind the projects." */
  description?: string;
}

/**
 * A temporary full-screen "second editorial layer" — not a modal card, not
 * an accordion, not a dropdown. Reused for both the homepage's Approach
 * overlay (four topics: Diagnosis / System / First 30 Days / Measurement)
 * and Selected Work's case-study deep-dive (a single panel, no topic nav).
 *
 * Panels are handed in already server-rendered by the caller — this
 * component only ever toggles which one is visible via a plain class, so
 * no section's content is duplicated, rewritten, or re-fetched.
 *
 * The panel is portaled to <body> so it sits as a sibling of <header>,
 * <main id="content"> and <footer> — each of which is marked `inert` while
 * open. That both blocks background interaction and gives keyboard focus a
 * real trap for free (Tab simply cannot reach an inert subtree), the same
 * technique already proven in MobileNav. Body scroll is locked the same
 * way MobileNav locks it (`body.style.overflow = "hidden"`), which is also
 * why closing restores the exact scroll position: the page underneath
 * never actually moves, it's just paused.
 */
export function EditorialOverlay({
  label,
  closeLabel,
  topics,
  panels,
  triggerClassName,
  arrowClassName = "text-kite",
  actionLabel,
  description,
}: EditorialOverlayProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const header = document.querySelector("header");
    const main = document.getElementById("content");
    const footer = document.querySelector("footer");
    header?.setAttribute("inert", "");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      header?.removeAttribute("inert");
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: 0 });
  }, [active]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setActive(0);
          setOpen(true);
        }}
        className={cn(
          "group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kite-dark",
          triggerClassName,
        )}
      >
        <span className="flex min-w-0 flex-1 flex-col items-start gap-3xs">
          <span>{label}</span>
          {description && (
            <span className="font-body text-body-sm font-normal normal-case tracking-normal text-current opacity-60">
              {description}
            </span>
          )}
        </span>
        <span className="flex shrink-0 items-center gap-sm">
          {actionLabel && (
            <span className="flex items-center gap-2xs font-body text-[11px] font-semibold uppercase tracking-widest">
              <span className="hidden h-px w-lg bg-current opacity-30 sm:block" aria-hidden />
              {actionLabel}
            </span>
          )}
          <span
            aria-hidden
            className={cn(
              "inline-block transition-editorial group-hover:translate-x-1 group-hover:-translate-y-1",
              arrowClassName,
            )}
          >
            <ArrowIcon />
          </span>
        </span>
      </button>

      {open &&
        createPortal(
          <div role="dialog" aria-modal="true" aria-label={label} className="fixed inset-0 z-[200] flex flex-col bg-ink">
            <div className="flex items-center justify-between border-b border-[rgba(242,238,228,0.15)] px-gutter py-sm">
              <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-paper-soft">
                {label}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="group flex items-center gap-2xs font-body text-label font-semibold uppercase tracking-wide text-paper transition-editorial hover:text-kite"
              >
                {closeLabel}
                <span aria-hidden>✕</span>
              </button>
            </div>

            {topics.length > 1 && (
              <nav className="flex gap-x-lg overflow-x-auto border-b border-[rgba(242,238,228,0.15)] px-gutter">
                {topics.map((topic, i) => (
                  <button
                    key={topic.number}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={i === active}
                    className={cn(
                      "flex shrink-0 items-baseline gap-2xs border-b-2 py-sm font-body text-label font-semibold uppercase tracking-wide transition-editorial",
                      i === active ? "border-kite text-paper" : "border-transparent text-paper-soft hover:text-paper",
                    )}
                  >
                    <span className="tabular-nums text-kite">{topic.number}</span>
                    {topic.label}
                  </button>
                ))}
              </nav>
            )}

            <div ref={scrollAreaRef} className="flex-1 overflow-y-auto bg-paper">
              {panels.map((panel, i) => (
                <div key={i} className={i === active ? "block" : "hidden"}>
                  {panel}
                </div>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
