import Image from "next/image";
import { SiteContainer, ArrowIcon, LoopIcon } from "@/components/ui";
import { cn } from "@/lib/cn";

interface Segment {
  text: string;
  accent?: boolean;
}

interface CaseStudy {
  number: string;
  client: string;
  category: string;
  statement: Segment[];
  context: string;
  scope: string[];
  workItems: string[];
  systemSequence: string[];
  systemJoiner: "arrow" | "plus";
  systemLoop?: boolean;
  smallLine?: Segment[];
  closingLine?: Segment[];
  ongoing?: boolean;
  dark?: boolean;
  imageAlign: "left" | "right";
  photo?: { src: string; alt: string };
}

/** Small L-shaped crop-guide marks at an image's four corners — a technical index signal, not a frame. */
function CropGuides() {
  const base = "absolute h-3 w-3 border-kite";
  return (
    <>
      <span aria-hidden className={cn(base, "left-2 top-2 border-l border-t")} />
      <span aria-hidden className={cn(base, "right-2 top-2 border-r border-t")} />
      <span aria-hidden className={cn(base, "bottom-2 left-2 border-b border-l")} />
      <span aria-hidden className={cn(base, "bottom-2 right-2 border-b border-r")} />
    </>
  );
}

/**
 * One case as a full editorial feature — never a card. Ecru renders `dark`
 * (the section's one black case), so every text color below branches as a
 * whole class string rather than an appended override, same discipline as
 * CapabilityRow's `dark` prop. `study.photo` is real campaign photography
 * for that client — never a diagram, screenshot, or stock image — shown
 * full-width at its native 1672:941 ratio (both current photos share that
 * ratio) so nothing gets cropped into a portrait box it wasn't shot for.
 * Falls back to the same dark gradient placeholder WorkGrid.tsx uses when a
 * case doesn't have a photo yet. The two text columns below it swap order
 * per `imageAlign` ("left" leads with the statement/context column) purely
 * to keep some rhythm between cases now that the photo itself is full width.
 */
export function CaseStudyFeature({
  labels,
  study,
  total,
}: {
  labels: { scope: string; context: string; work: string; system: string; ongoing: string };
  study: CaseStudy;
  total: number;
}) {
  const { dark } = study;
  const leadFirst = study.imageAlign === "left";

  return (
    <div className={cn("group relative border-t border-line", dark && "bg-ink")}>
      <SiteContainer>
        <div
          className={cn(
            "flex items-end justify-between gap-md border-b py-lg",
            dark ? "border-[rgba(242,238,228,0.16)]" : "border-line",
          )}
        >
          <div className="flex items-baseline gap-sm">
            <span className="font-body text-[11px] font-semibold uppercase tabular-nums tracking-widest text-kite">
              {study.number} / {String(total).padStart(2, "0")}
            </span>
            <h3
              className={cn(
                "font-display text-display-lg font-black uppercase leading-none xl:text-display-2xl",
                dark ? "text-paper" : "text-ink",
              )}
            >
              {study.client}
            </h3>
          </div>
          <span
            className={cn(
              "font-body text-label font-semibold uppercase tracking-wide",
              dark ? "text-paper-soft" : "text-ink-soft",
            )}
          >
            {study.category}
          </span>
        </div>

        <div className="py-xl xl:py-2xl">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1672 / 941" }}>
            {study.photo ? (
              <Image
                src={study.photo.src}
                alt={study.photo.alt}
                fill
                sizes="(min-width: 1536px) 1520px, 100vw"
                className="object-cover"
                priority={false}
              />
            ) : (
              <div className="paper-texture-dark absolute inset-0 bg-gradient-to-br from-[#232323] via-ink to-black" />
            )}
            <CropGuides />
            {study.ongoing && (
              <span className="absolute bottom-2xs left-2 flex items-center gap-2xs bg-ink px-2xs py-3xs font-body text-[9px] font-semibold uppercase tracking-widest text-paper">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-kite" />
                {labels.ongoing}
              </span>
            )}
          </div>

          <div className="mt-lg grid grid-cols-1 gap-y-lg xl:mt-xl xl:grid-cols-12 xl:gap-x-xl">
            <div className={cn("xl:col-span-5", leadFirst ? "xl:order-1" : "xl:order-2")}>
              <p
                className={cn(
                  "font-display text-display-sm font-black uppercase leading-[1.08] xl:text-display-md",
                  dark ? "text-paper" : "text-ink",
                )}
              >
                {study.statement.map((segment, i) => (
                  <span key={i} className={cn("block", segment.accent && "text-kite")}>
                    {segment.text}
                  </span>
                ))}
              </p>

              <div className={cn("mt-lg border-t pt-sm", dark ? "border-[rgba(242,238,228,0.16)]" : "border-line-soft")}>
                <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-kite">{labels.context}</span>
                <p className={cn("mt-2xs font-body text-body-md", dark ? "text-paper-soft" : "text-ink-soft")}>{study.context}</p>
              </div>
            </div>

            <div className={cn("xl:col-span-7", leadFirst ? "xl:order-2" : "xl:order-1")}>
            <div className={cn("mt-lg border-t pt-sm xl:mt-0", dark ? "border-[rgba(242,238,228,0.16)]" : "border-line-soft")}>
              <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-kite">{labels.scope}</span>
              <ul
                className={cn(
                  "mt-2xs grid grid-cols-2 gap-x-md gap-y-2xs transition-editorial",
                  dark ? "text-paper-soft group-hover:text-paper" : "text-ink-soft group-hover:text-ink",
                )}
              >
                {study.scope.map((item) => (
                  <li
                    key={item}
                    className={cn("border-t pt-3xs font-body text-label", dark ? "border-[rgba(242,238,228,0.16)]" : "border-line-soft")}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={cn("mt-md border-t pt-sm", dark ? "border-[rgba(242,238,228,0.16)]" : "border-line-soft")}>
              <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-kite">{labels.work}</span>
              <ul
                className={cn(
                  "mt-2xs grid grid-cols-2 gap-x-md gap-y-2xs transition-editorial",
                  dark ? "text-paper-soft group-hover:text-paper" : "text-ink-soft group-hover:text-ink",
                )}
              >
                {study.workItems.map((item) => (
                  <li
                    key={item}
                    className={cn("border-t pt-3xs font-body text-label", dark ? "border-[rgba(242,238,228,0.16)]" : "border-line-soft")}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={cn("mt-lg border-t pt-sm", dark ? "border-[rgba(242,238,228,0.16)]" : "border-line-soft")}>
              <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-kite">{labels.system}</span>
              <div
                className={cn(
                  "mt-2xs flex flex-wrap items-baseline gap-x-2xs gap-y-3xs font-body text-label font-semibold uppercase tracking-wide",
                  dark ? "text-paper" : "text-ink",
                )}
              >
                {study.systemSequence.map((step, i, arr) => (
                  <span key={step} className="flex items-baseline gap-2xs">
                    {i > 0 && (
                      <span aria-hidden className={dark ? "text-[rgba(242,238,228,0.4)]" : "text-ink-soft"}>
                        {study.systemJoiner === "plus" ? "+" : <ArrowIcon direction="right" />}
                      </span>
                    )}
                    <span>{step}</span>
                  </span>
                ))}
                {study.systemLoop && (
                  <span aria-hidden className="text-kite">
                    <LoopIcon />
                  </span>
                )}
              </div>
            </div>

            {study.smallLine && (
              <p
                className={cn(
                  "mt-lg font-display text-body-lg font-black uppercase leading-[1.15]",
                  dark ? "text-paper" : "text-ink",
                )}
              >
                {study.smallLine.map((segment, i) => (
                  <span key={i} className={cn("block", segment.accent && "text-kite")}>
                    {segment.text}
                  </span>
                ))}
              </p>
            )}

            {study.closingLine && (
              <p
                className={cn(
                  "mt-lg font-display text-body-lg font-black uppercase leading-[1.15]",
                  dark ? "text-paper" : "text-ink",
                )}
              >
                {study.closingLine.map((segment, i) => (
                  <span key={i} className={cn("block", segment.accent && "text-kite")}>
                    {segment.text}
                  </span>
                ))}
              </p>
            )}
            </div>
          </div>
        </div>
      </SiteContainer>
    </div>
  );
}
