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
  triggerClassName?: string;
  arrowClassName?: string;
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
        className={cn("group inline-flex items-center gap-sm", triggerClassName)}
      >
        <span>{label}</span>
        <span
          aria-hidden
          className={cn("inline-block transition-editorial group-hover:translate-x-1 group-hover:-translate-y-1", arrowClassName)}
        >
          <ArrowIcon />
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
