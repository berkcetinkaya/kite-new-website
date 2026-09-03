import { SiteContainer, ArrowIcon } from "@/components/ui";
import { cn } from "@/lib/cn";

interface Segment {
  text: string;
  accent?: boolean;
}

interface Problem {
  number: string;
  label?: string;
  statement: Segment[][];
  secondaryLine?: string;
  causes?: string[];
  stages?: string[];
  diagnosticQuestions?: string[];
  supportingLines?: string[];
  systemLine?: string[];
  conclusion: Segment[][];
}

export type DiagnosisRowVariant = "classic" | "stages" | "funnel" | "scaled" | "technical" | "finale";

/** Segmented lines — plain text, with a punch fragment picked out in kite yellow. Shared by `statement` and `conclusion`. */
function SegmentedLines({ lines }: { lines: Segment[][] }) {
  return (
    <>
      {lines.map((segments, i) => (
        <span key={i} className="block">
          {segments.map((segment, j) => (
            <span key={j} className={segment.accent ? "text-kite" : undefined}>
              {segment.text}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

/** The row's signal mark: a short yellow segment that advances into the rule on hover — same motif as CapabilityRow. */
function SignalMark() {
  return (
    <span aria-hidden className="flex h-px w-10 items-center">
      <span className="h-[2px] w-4 shrink-0 bg-kite transition-editorial group-hover:w-8" />
      <span className="h-px flex-1 bg-line" />
    </span>
  );
}

/**
 * One diagnosis "case file". Six rows share a grid vocabulary (number +
 * statement / secondary + conclusion / causes) but the `variant` prop gives
 * each its own controlled deviation so the section reads as six distinct
 * diagnoses, not six repeats of one card:
 *  - classic (01): the base three-zone layout.
 *  - stages (02): DİKKAT → İLGİ → AKSİYON becomes a visible stage line.
 *  - funnel (03): a narrowing bar set stands in for the traffic → conversion drop-off.
 *  - scaled (04): the conclusion jumps to display scale — the section's one deliberate emphasis before the finale.
 *  - technical (05): the right column becomes a dense data rail — sources, then diagnostic questions.
 *  - finale (06): abandons the three-column grid for a full-width close, statement plain, all the
 *    yellow saved for a full-bleed band around the conclusion — the section's one designed contrast.
 */
export function DiagnosisRow({ problem, variant }: { problem: Problem; variant: DiagnosisRowVariant }) {
  if (variant === "finale") {
    return (
      <div className="group relative border-t border-line bg-paper">
        <SiteContainer>
          <div className="py-lg xl:py-2xl">
            <div className="flex items-baseline gap-sm">
              <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-kite">
                {problem.number}
              </span>
              <SignalMark />
            </div>

            <h3 className="mt-sm max-w-[24ch] font-display text-display-md font-black uppercase leading-[1.05] text-ink xl:text-display-lg">
              <SegmentedLines lines={problem.statement} />
            </h3>

            <div className="mt-lg grid grid-cols-1 gap-y-md xl:grid-cols-12 xl:items-end xl:gap-x-lg">
              {problem.supportingLines && (
                <div className="xl:col-span-5">
                  {problem.supportingLines.map((line, i, arr) => (
                    <p
                      key={i}
                      className={cn(
                        "font-body text-body-md text-ink-soft",
                        i === arr.length - 1 && "mt-sm font-semibold text-ink",
                      )}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {problem.systemLine && (
                <div className="xl:col-span-7">
                  <div className="relative pb-sm">
                    <div className="flex flex-wrap items-center gap-x-lg gap-y-xs xl:justify-between">
                      {problem.systemLine.map((token, i) => (
                        <div key={token} className="flex items-baseline gap-2xs">
                          <span className="font-body text-[11px] font-semibold tabular-nums text-kite">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-body text-label font-semibold uppercase tracking-[0.2em] text-ink">
                            {token}
                          </span>
                        </div>
                      ))}
                    </div>
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-kite" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </SiteContainer>

        <div className="bg-kite py-xl xl:py-2xl">
          <SiteContainer>
            <p className="max-w-[22ch] font-display text-display-md font-black uppercase leading-[1.02] text-ink xl:max-w-[30ch] xl:text-display-xl">
              <SegmentedLines lines={problem.conclusion} />
            </p>
          </SiteContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative border-t border-line">
      <SiteContainer>
        <div className="grid grid-cols-1 gap-y-md py-lg xl:grid-cols-12 xl:items-start xl:gap-x-lg xl:py-xl">
          {/* LEFT: number + statement */}
          <div className="xl:col-span-4">
            <div className="flex items-baseline gap-sm">
              <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-kite">
                {problem.number}
              </span>
              <SignalMark />
              {problem.label && (
                <span className="ml-auto font-body text-[10px] font-semibold uppercase tracking-widest text-ink-soft">
                  {problem.label}
                </span>
              )}
            </div>
            <h3 className="mt-sm font-display text-display-md font-black uppercase leading-[1.04] text-ink xl:text-display-lg">
              <SegmentedLines lines={problem.statement} />
            </h3>
          </div>

          {/* CENTER: secondary line + conclusion (+ per-variant extras) */}
          <div className="xl:col-span-4 xl:border-l xl:border-line-soft xl:pl-lg">
            {problem.secondaryLine && <p className="font-body text-body-md text-ink-soft">{problem.secondaryLine}</p>}

            {variant === "stages" && problem.stages && (
              <div className="mt-md flex flex-wrap items-baseline gap-x-2xs gap-y-2xs font-display text-display-sm font-black uppercase leading-none text-ink">
                {problem.stages.map((stage, i, arr) => (
                  <span key={stage} className="flex items-baseline gap-2xs">
                    {i > 0 && (
                      <span aria-hidden className="text-body-md text-ink-soft">
                        <ArrowIcon direction="right" />
                      </span>
                    )}
                    <span className={i === arr.length - 1 ? "border-b-2 border-kite pb-[2px]" : undefined}>
                      {stage}
                    </span>
                  </span>
                ))}
              </div>
            )}

            {variant === "funnel" && (
              <div aria-hidden className="mt-md flex items-end gap-[3px]">
                <span className="h-1 w-20 bg-ink-soft" />
                <span className="h-1 w-11 bg-line" />
                <span className="h-1.5 w-5 bg-kite" />
              </div>
            )}

            <p
              className={cn(
                "font-display font-black uppercase text-ink",
                variant === "scaled"
                  ? "mt-md text-display-sm leading-[1.08] xl:text-display-md"
                  : "mt-md text-body-lg leading-[1.2]",
              )}
            >
              <SegmentedLines lines={problem.conclusion} />
            </p>
          </div>

          {/* RIGHT: causes / diagnostic terms */}
          <div className="xl:col-span-4 xl:border-l xl:border-line-soft xl:pl-lg">
            {variant === "technical" ? (
              <div className="space-y-md">
                <ul className="space-y-2xs">
                  {problem.causes?.map((source, i) => (
                    <li
                      key={source}
                      className="flex items-baseline justify-between gap-sm border-t border-line-soft pt-3xs font-body text-label tabular-nums text-ink transition-editorial hover:text-kite"
                    >
                      <span>{source}</span>
                      <span aria-hidden className="text-[10px] text-ink-soft">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  ))}
                </ul>
                {problem.diagnosticQuestions && (
                  <ul className="space-y-2xs border-t border-line pt-sm">
                    {problem.diagnosticQuestions.map((question) => (
                      <li key={question} className="font-body text-label italic text-ink-soft">
                        {question}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <ul className="grid grid-cols-2 gap-x-md gap-y-2xs">
                {problem.causes?.map((cause) => (
                  <li
                    key={cause}
                    className="border-t border-line-soft pt-3xs font-body text-label text-ink transition-editorial hover:text-kite"
                  >
                    {cause}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </SiteContainer>
    </div>
  );
}
