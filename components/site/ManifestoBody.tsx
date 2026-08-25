"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Segment = { text: string; accent?: boolean };

interface ManifestoBodyProps {
  statement1: { desktop: string[]; mobile: string[] };
  statement2: {
    desktop: Segment[][];
    mobile: Segment[][];
  };
}

/**
 * Reveals a block once it scrolls into view — opacity/translate only, never
 * touching text content or DOM order, so with no JS (or reduced motion) the
 * element is simply visible from the start. This is deliberately not a
 * sticky/pinned scroll sequence: normal scrolling is never intercepted.
 */
function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function useLineReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.style.transform = "rotate(-7deg) scaleX(0)";
    el.style.transition = "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.style.transform = "rotate(-7deg) scaleX(1)";
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function ManifestoBody({ statement1, statement2 }: ManifestoBodyProps) {
  const s1Ref = useRevealOnScroll<HTMLParagraphElement>();
  const lineRef = useLineReveal();
  const s2Ref = useRevealOnScroll<HTMLParagraphElement>();

  return (
    <>
      <p
        ref={s1Ref}
        className="max-w-[22ch] font-display text-display-xl font-black uppercase leading-[0.95] text-paper xl:max-w-[16ch] xl:text-display-2xl"
      >
        {statement1.mobile.map((line, i) => (
          <span key={i} className="block xl:hidden">
            {line}
          </span>
        ))}
        {statement1.desktop.map((line, i) => (
          <span key={i} className="hidden xl:block">
            {line}
          </span>
        ))}
      </p>

      <div
        ref={lineRef}
        aria-hidden
        className="my-xl h-[2px] w-28 origin-left bg-kite xl:my-2xl xl:w-48"
      />

      <p
        ref={s2Ref}
        className="max-w-[22ch] font-display text-display-xl font-black uppercase leading-[0.95] text-paper xl:ml-[28%] xl:max-w-[18ch] xl:text-display-2xl"
      >
        {statement2.mobile.map((line, i) => (
          <span key={i} className="block xl:hidden">
            {line.map((segment, j) => (
              <span key={j} className={cn(segment.accent && "text-kite")}>
                {segment.text}
              </span>
            ))}
          </span>
        ))}
        {statement2.desktop.map((line, i) => (
          <span key={i} className="hidden xl:block">
            {line.map((segment, j) => (
              <span key={j} className={cn(segment.accent && "text-kite")}>
                {segment.text}
              </span>
            ))}
          </span>
        ))}
      </p>
    </>
  );
}
