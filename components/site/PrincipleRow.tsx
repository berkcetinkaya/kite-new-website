import { SiteContainer } from "@/components/ui";
import { cn } from "@/lib/cn";

interface Segment {
  text: string;
  accent?: boolean;
}

interface Principle {
  number: string;
  statement: Segment[][];
  supportingCopy: string;
  technicalLabel: string;
  tinyLine?: string[];
  variant: "A" | "B" | "C";
  dark?: boolean;
}

/** Segmented statement lines — plain text, with the principle's one accented fragment in kite yellow. */
function Statement({ lines, className }: { lines: Segment[][]; className?: string }) {
  return (
    <p className={className}>
      {lines.map((segments, i) => (
        <span key={i} className="block">
          {segments.map((segment, j) => (
            <span key={j} className={segment.accent ? "text-kite" : undefined}>
              {segment.text}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}

/**
 * One editorial principle. Three controlled treatments keep eight rows from
 * reading as eight identical rectangles:
 *  - A: number/label rail, large left-aligned statement, supporting copy in its own right-hand column.
 *  - B: the statement runs nearly full width; supporting copy sits below it in a narrower measure instead of beside it.
 *  - C: dark inversion (principles 01 and 04 only) — same left-aligned shape as A, larger type, off-white on black.
 * All hover behavior is plain CSS `group`/`group-hover` — no JS state.
 */
export function PrincipleRow({ item, total, isLast }: { item: Principle; total: number; isLast: boolean }) {
  const { dark, variant } = item;
  const paletteText = dark ? "text-paper" : "text-ink";
  const paletteSoft = dark ? "text-paper-soft" : "text-ink-soft";
  const paletteRule = dark ? "border-[rgba(242,238,228,0.16)]" : "border-line-soft";

  return (
    <div className={cn("group relative border-t border-line", dark && "bg-ink", isLast && "border-b")}>
      <SiteContainer>
        <div className={cn("grid grid-cols-1 gap-y-md py-lg xl:grid-cols-12 xl:items-start xl:gap-x-lg", variant === "C" ? "xl:py-2xl" : "xl:py-xl")}>
          <div className="xl:col-span-2">
            <span
              className={cn(
                "font-display text-display-md font-extrabold uppercase tabular-nums leading-none transition-editorial",
                dark ? "text-paper-soft group-hover:text-kite" : "text-ink-soft group-hover:text-kite",
              )}
            >
              {item.number}
            </span>
            <span aria-hidden className="mt-sm flex h-px items-center">
              <span className="h-[2px] w-6 shrink-0 bg-kite transition-editorial group-hover:w-12" />
              <span className={cn("h-px flex-1", dark ? "bg-[rgba(242,238,228,0.16)]" : "bg-line")} />
            </span>
            <span
              className={cn(
                "mt-xs block font-body text-[9px] font-semibold uppercase tracking-widest transition-editorial group-hover:opacity-100",
                dark ? "text-[rgba(239,176,4,0.7)]" : "text-kite-dark",
                "opacity-70",
              )}
            >
              {item.technicalLabel}
            </span>
            {dark && (
              <span className="mt-3xs block font-body text-[9px] uppercase tracking-widest text-[rgba(242,238,228,0.3)]">
                {item.number} / {String(total).padStart(2, "0")}
              </span>
            )}
          </div>

          {variant === "B" ? (
            <div className="xl:col-span-10">
              <Statement
                lines={item.statement}
                className={cn("font-display font-black uppercase leading-[1.1]", "text-display-md xl:text-display-xl", paletteText)}
              />
              <div className="mt-lg max-w-[46ch] xl:pl-lg">
                <p className={cn("font-body text-body-md", paletteSoft)}>{item.supportingCopy}</p>
                {item.tinyLine && (
                  <p className={cn("mt-sm border-t pt-sm font-body text-label italic", paletteRule, paletteSoft)}>
                    {item.tinyLine.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="xl:col-span-6">
                <Statement
                  lines={item.statement}
                  className={cn(
                    "font-display font-black uppercase leading-[1.08]",
                    variant === "C" ? "text-display-lg xl:text-display-2xl" : "text-display-md xl:text-display-lg",
                    paletteText,
                  )}
                />
              </div>
              <div className={cn("xl:col-span-4 xl:border-l xl:pl-lg", paletteRule)}>
                <p className={cn("font-body text-body-md", paletteSoft)}>{item.supportingCopy}</p>
                {item.tinyLine && (
                  <p className={cn("mt-sm border-t pt-sm font-body text-label italic", paletteRule, paletteSoft)}>
                    {item.tinyLine.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </SiteContainer>
    </div>
  );
}
