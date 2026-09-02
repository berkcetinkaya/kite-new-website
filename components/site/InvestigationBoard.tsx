"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SiteContainer } from "@/components/ui";
import { cn } from "@/lib/cn";

interface AnswerSegment {
  text: string;
  accent?: boolean;
}

interface Question {
  number: string;
  question: string;
  answerLines: AnswerSegment[][];
  label: string;
}

interface InvestigationBoardProps {
  folioNumber: string;
  title: string;
  introLines: string[];
  investigationDetails: string[];
  questions: Question[];
  ending: Array<{ text: string; accent?: boolean }>;
  endingNote: string;
}

/** An answer line's fragments — plain text, with punchline fragments picked out in kite yellow. */
function AnswerLine({ segments }: { segments: AnswerSegment[] }) {
  return (
    <span className="block">
      {segments.map((segment, i) => (
        <span key={i} className={segment.accent ? "text-kite" : undefined}>
          {segment.text}
        </span>
      ))}
    </span>
  );
}

/**
 * "004 / Soruşturma" — the section's one deliberate tonal break: a black
 * interrogation board, not another editorial chapter. Two independent
 * pieces of state carry the desktop interaction — `hovered` previews
 * immediately and clears the moment the pointer leaves the list, `locked`
 * is what's left standing once it does. A click only ever updates `locked`;
 * it never fights the current hover. That reads as "hover to skim, click
 * to commit" without any extra bookkeeping. Mobile has no hover concept,
 * so it drives the same `locked` state directly as a one-open accordion.
 */
export function InvestigationBoard({
  folioNumber,
  title,
  introLines,
  investigationDetails,
  questions,
  ending,
  endingNote,
}: InvestigationBoardProps) {
  const [locked, setLocked] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? locked;
  const activeQuestion = questions[active] ?? questions[0]!;
  const total = questions.length;
  const progress = total > 1 ? active / (total - 1) : 0;

  const [artworkRevealed, setArtworkRevealed] = useState(false);
  const artworkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = artworkRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setArtworkRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden bg-ink">
      {investigationDetails[0] && (
        <span
          aria-hidden
          className="absolute right-gutter top-lg hidden font-body text-[9px] uppercase tracking-widest text-[rgba(242,238,228,0.3)] xl:block"
        >
          {investigationDetails[0]}
        </span>
      )}
      <SiteContainer>
        <div className="py-2xl xl:py-3xl">
          <div className="flex items-baseline gap-sm">
            <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-paper-soft">
              {folioNumber}
            </span>
            <span className="font-body text-label font-semibold uppercase tracking-widest text-paper-soft">{title}</span>
          </div>

          <h2 className="mt-md max-w-[26ch] font-display text-display-md font-black uppercase leading-[1.08] text-paper xl:text-display-xl xl:leading-[1.12]">
            {introLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>

          {/* Desktop: question list + a panel that stays put while the active question changes. */}
          <div className="mt-lg hidden xl:grid xl:grid-cols-12 xl:gap-x-lg">
            <div className="xl:col-span-7" onMouseLeave={() => setHovered(null)}>
              <ul className="border-b border-[rgba(242,238,228,0.15)]">
                {questions.map((q, i) => {
                  const isActive = i === active;
                  return (
                    <li key={q.number} className="border-t border-[rgba(242,238,228,0.15)]">
                      <button
                        type="button"
                        onMouseEnter={() => setHovered(i)}
                        onClick={() => setLocked(i)}
                        className="group flex w-full items-baseline gap-md py-xs text-left"
                      >
                        <span
                          className={cn(
                            "font-body text-label font-semibold tabular-nums transition-editorial",
                            isActive ? "text-kite" : "text-[rgba(242,238,228,0.4)]",
                          )}
                        >
                          {q.number}
                        </span>
                        <span
                          className={cn(
                            "font-display text-display-sm font-black uppercase leading-none transition-editorial group-hover:translate-x-2",
                            isActive ? "text-kite" : "text-paper",
                          )}
                        >
                          {q.question}
                        </span>
                        {isActive && <span aria-hidden className="ml-auto h-px w-10 shrink-0 bg-kite" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
              {investigationDetails[1] && (
                <p aria-hidden className="mt-sm font-body text-[9px] uppercase tracking-widest text-[rgba(242,238,228,0.3)]">
                  {investigationDetails[1]}
                </p>
              )}
            </div>

            <div className="xl:col-span-5">
              <div className="sticky top-[calc(var(--header-h)+24px)]">
                <div key={activeQuestion.number} className="answer-reveal">
                  <span className="font-body text-[11px] font-semibold tabular-nums text-kite">
                    {activeQuestion.number} / {String(total).padStart(2, "0")}
                  </span>
                  <p className="mt-2xs font-body text-eyebrow font-semibold uppercase tracking-widest text-[rgba(242,238,228,0.6)]">
                    {activeQuestion.label}
                  </p>
                  <p className="mt-sm font-display text-display-sm font-black uppercase leading-[1.05] text-paper">
                    {activeQuestion.answerLines.map((segments, i) => (
                      <AnswerLine key={i} segments={segments} />
                    ))}
                  </p>
                </div>

                <div className="mt-xl flex items-center gap-xs">
                  <span className="font-body text-[10px] font-semibold tabular-nums text-kite">{activeQuestion.number}</span>
                  <span aria-hidden className="relative h-px flex-1 bg-[rgba(242,238,228,0.2)]">
                    <span
                      aria-hidden
                      className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-kite transition-editorial"
                      style={{ left: `${progress * 100}%` }}
                    />
                  </span>
                  <span className="font-body text-[10px] font-semibold tabular-nums text-[rgba(242,238,228,0.5)]">
                    {String(total).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: one-open accordion, no hover — question 01 open by default. */}
          <div className="mt-lg xl:hidden">
            <ul className="border-b border-[rgba(242,238,228,0.15)]">
              {questions.map((q, i) => {
                const isOpen = i === locked;
                return (
                  <li key={q.number} className="border-t border-[rgba(242,238,228,0.15)]">
                    <button
                      type="button"
                      onClick={() => setLocked(i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-baseline gap-sm py-sm text-left"
                    >
                      <span
                        className={cn(
                          "font-body text-label font-semibold tabular-nums",
                          isOpen ? "text-kite" : "text-[rgba(242,238,228,0.4)]",
                        )}
                      >
                        {q.number}
                      </span>
                      <span
                        className={cn(
                          "font-display text-display-sm font-black uppercase leading-none",
                          isOpen ? "text-kite" : "text-paper",
                        )}
                      >
                        {q.question}
                      </span>
                    </button>
                    <div
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    >
                      <div className="overflow-hidden">
                        <p className="pb-sm font-body text-eyebrow font-semibold uppercase tracking-widest text-[rgba(242,238,228,0.6)]">
                          {q.label}
                        </p>
                        <p className="pb-md font-display text-display-sm font-black uppercase leading-[1.1] text-paper">
                          {q.answerLines.map((segments, j) => (
                            <AnswerLine key={j} segments={segments} />
                          ))}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Closing frame: statement and note stay in their own left column (both
              anchored to xl:col-span-7 via explicit row placement) while the agent
              artwork occupies a tall right column that's free to bleed toward the
              section's true edge — reads as one asymmetric composition rather than
              a portrait dropped beside text. Explicit col/row placement (not DOM
              order) is what lets mobile stack as statement → artwork → note while
              desktop keeps the note directly under the statement. */}
          <div className="mt-2xl border-t border-[rgba(242,238,228,0.15)] pt-xl xl:mt-3xl">
            <div className="grid grid-cols-1 gap-y-lg xl:grid-cols-12 xl:gap-x-lg">
              <p className="font-display text-display-md font-black uppercase leading-[0.95] text-paper xl:col-span-6 xl:col-start-1 xl:row-start-1 xl:text-display-lg">
                {ending.map((segment, i) => (
                  <span key={i} className={cn("block", segment.accent && "text-kite")}>
                    {segment.text}
                  </span>
                ))}
              </p>

              <div
                ref={artworkRef}
                className="relative -mr-[calc(var(--space-gutter)+22vw)] h-[485px] sm:h-[595px] xl:col-span-6 xl:col-start-7 xl:row-span-2 xl:row-start-1 xl:h-full xl:min-h-[755px] xl:-mb-xl xl:-mr-[calc(var(--space-gutter)+16vw)] xl:-mt-lg"
              >
                {investigationDetails[2] && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 font-body text-[9px] uppercase tracking-widest text-[rgba(242,238,228,0.25)]"
                  >
                    {investigationDetails[2]}
                  </span>
                )}

                <div
                  className="absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    opacity: artworkRevealed ? 1 : 0,
                    transform: artworkRevealed ? "translateY(0)" : "translateY(16px)",
                  }}
                >
                  <Image
                    src="/brand/ajan.png"
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 64vw, 100vw"
                    className="object-contain object-right-bottom mix-blend-screen"
                  />
                </div>

                {/* The section's one restrained yellow detail — a tiny evidence
                    crosshair floating in the empty dark space beside the figure
                    (not on the face or coat), so it reads as a marker in the
                    scene rather than decoration on the illustration itself. */}
                <span aria-hidden className="absolute left-[8%] top-[16%] h-3 w-px bg-kite" />
                <span aria-hidden className="absolute left-[calc(8%-5px)] top-[calc(16%+5px)] h-px w-3 bg-kite" />
              </div>

              <p className="font-body text-[10px] uppercase tracking-widest text-[rgba(242,238,228,0.5)] xl:col-span-6 xl:col-start-1 xl:row-start-2">
                {endingNote}
              </p>
            </div>
          </div>
        </div>
      </SiteContainer>
    </div>
  );
}
