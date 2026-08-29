import { SiteContainer } from "@/components/ui";
import { cn } from "@/lib/cn";

interface Segment {
  text: string;
  accent?: boolean;
}

interface Model {
  number: string;
  title: string;
  description: string;
  bestFor: string[];
  scope: string[];
  workingModel: string;
  smallLine: Segment[];
  priority?: boolean;
  dark?: boolean;
}

/**
 * One collaboration model as an editorial index row — never a pricing card.
 * LEFT rail carries just the number; CENTER carries the title/description;
 * RIGHT carries who it's for, scope and the working model; the small line
 * closes it out. Desktop wants the small line directly under the
 * description (in the center column) while the right column spans both
 * rows beside it — but the brief's mobile order puts the small line dead
 * last, after working model. Explicit `xl:col-start`/`xl:row-start`
 * placement resolves both at once: DOM order matches the mobile reading
 * order exactly, and desktop's visual position is set independently of
 * that order rather than fighting it.
 * All hover behavior (number turning yellow, the signal rule extending,
 * scope terms sharpening) is plain CSS `group`/`group-hover` — no JS state,
 * same discipline as CapabilityRow and DiagnosisRow.
 */
export function CollaborationModel({
  model,
  isLast,
  priorityLabel,
  bestForLabel,
  scopeLabel,
  workingModelLabel,
}: {
  model: Model;
  isLast: boolean;
  priorityLabel: string;
  bestForLabel: string;
  scopeLabel: string;
  workingModelLabel: string;
}) {
  const { dark, priority } = model;

  return (
    <div className={cn("group relative border-t border-line", dark && "bg-ink", isLast && "border-b")}>
      <SiteContainer>
        <div className="grid grid-cols-1 gap-y-md py-lg xl:grid-cols-12 xl:items-start xl:gap-x-lg xl:py-xl">
          <div className="xl:col-start-1 xl:col-span-2 xl:row-start-1 xl:row-span-2">
            <span
              className={cn(
                "font-display text-display-md font-extrabold uppercase tabular-nums leading-none transition-editorial",
                dark ? "text-paper-soft group-hover:text-kite" : "text-ink-soft group-hover:text-kite",
              )}
            >
              {model.number}
            </span>
            <span aria-hidden className="mt-sm flex h-px items-center">
              <span
                className={cn(
                  "h-[2px] shrink-0 bg-kite transition-editorial group-hover:w-16",
                  priority ? "w-12" : "w-6",
                )}
              />
              <span className={cn("h-px flex-1", dark ? "bg-[rgba(242,238,228,0.16)]" : "bg-line")} />
            </span>
            {priority && (
              <span className="mt-xs block font-body text-[9px] font-semibold uppercase tracking-widest text-kite">
                {priorityLabel}
              </span>
            )}
          </div>

          <div className="xl:col-start-3 xl:col-span-5 xl:row-start-1">
            <h3
              className={cn(
                "font-display font-black uppercase leading-[1.02]",
                priority ? "text-display-lg xl:text-display-xl" : "text-display-md xl:text-display-lg",
                dark ? "text-paper" : "text-ink",
              )}
            >
              {model.title}
            </h3>
            <p className={cn("mt-sm max-w-[46ch] font-body text-body-md", dark ? "text-paper-soft" : "text-ink-soft")}>
              {model.description}
            </p>
          </div>

          <div
            className={cn(
              "xl:col-start-8 xl:col-span-5 xl:row-start-1 xl:row-span-2 xl:border-l xl:pl-lg",
              dark ? "xl:border-[rgba(242,238,228,0.16)]" : "xl:border-line-soft",
            )}
          >
            <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-kite">{bestForLabel}</span>
            <ul className={cn("mt-2xs space-y-2xs font-body text-label", dark ? "text-paper-soft" : "text-ink-soft")}>
              {model.bestFor.map((item) => (
                <li key={item} className={cn("border-t pt-3xs", dark ? "border-[rgba(242,238,228,0.16)]" : "border-line-soft")}>
                  {item}
                </li>
              ))}
            </ul>

            <span className="mt-md block font-body text-[10px] font-semibold uppercase tracking-widest text-kite">{scopeLabel}</span>
            <ul
              className={cn(
                "mt-2xs grid grid-cols-2 gap-x-md gap-y-2xs transition-editorial",
                dark ? "text-paper-soft group-hover:text-paper" : "text-ink-soft group-hover:text-ink",
              )}
            >
              {model.scope.map((item) => (
                <li key={item} className={cn("border-t pt-3xs font-body text-label", dark ? "border-[rgba(242,238,228,0.16)]" : "border-line-soft")}>
                  {item}
                </li>
              ))}
            </ul>

            <div className={cn("mt-md border-t pt-sm", dark ? "border-[rgba(242,238,228,0.16)]" : "border-line")}>
              <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-kite">{workingModelLabel}</span>
              <p
                className={cn(
                  "mt-3xs font-display font-black uppercase leading-none transition-editorial group-hover:tracking-wide",
                  "text-body-lg",
                  dark ? "text-paper" : "text-ink",
                )}
              >
                {model.workingModel}
              </p>
            </div>
          </div>

          <p
            className={cn(
              "font-display text-body-lg font-black uppercase leading-[1.15] xl:col-start-3 xl:col-span-5 xl:row-start-2",
              dark ? "text-paper" : "text-ink",
            )}
          >
            {model.smallLine.map((segment, i) => (
              <span key={i} className={cn("block", segment.accent && "text-kite")}>
                {segment.text}
              </span>
            ))}
          </p>
        </div>
      </SiteContainer>
    </div>
  );
}
