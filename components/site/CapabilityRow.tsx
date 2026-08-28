import { SiteContainer } from "@/components/ui";
import { cn } from "@/lib/cn";

interface CapabilityGroup {
  label?: string;
  items: string[];
}

interface CapabilitySecondary {
  label: string;
  items: string[];
  note?: string;
}

interface CapabilityItem {
  number: string;
  title: string;
  statement: Array<{ text: string; accent?: boolean }>;
  supportingCopy?: string;
  groups: CapabilityGroup[];
  secondary?: CapabilitySecondary;
}

export type CapabilityRowVariant = "standard" | "technical" | "statement-forward" | "data-grid";

/** A tick-marked "data rail" heading — used for both grouped-list labels and the secondary layer. */
function RailLabel({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <span className="mb-2xs flex items-center gap-2xs">
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-kite" />
      <span
        className={cn(
          "font-body text-eyebrow font-semibold uppercase tracking-widest",
          dark ? "text-paper-soft" : "text-ink-soft",
        )}
      >
        {children}
      </span>
    </span>
  );
}

const LEFT_SPAN: Record<CapabilityRowVariant, string> = {
  standard: "xl:col-span-3",
  technical: "xl:col-span-3",
  "statement-forward": "xl:col-span-3",
  "data-grid": "xl:col-span-3",
};

const MIDDLE_SPAN: Record<CapabilityRowVariant, string> = {
  standard: "xl:col-span-4",
  technical: "xl:col-span-4",
  "statement-forward": "xl:col-span-6",
  "data-grid": "xl:col-span-9",
};

const RIGHT_SPAN: Record<CapabilityRowVariant, string> = {
  standard: "xl:col-span-5",
  technical: "xl:col-span-5",
  "statement-forward": "xl:col-span-3",
  "data-grid": "",
};

/**
 * One discipline as an editorial "chapter". Four variants share the same
 * grid vocabulary (number/title zone, a border, then content) but shift
 * proportions and density so the five rows read as one system with
 * rhythm — not five repeats of one template:
 *  - standard (01): the base three-zone layout.
 *  - technical (02): same zones, denser tabular-styled measurement rail.
 *  - statement-forward (04): statement zone widens and scales up, list
 *    zone narrows to a single column — the statement gets real presence.
 *  - data-grid (05): statement runs full width above a four-column
 *    technical table (one column per group) instead of a stacked list —
 *    reads as a data interface, not another service list.
 * `dark` inverts row 03 only, per the approved black interruption; colors
 * branch as whole class strings rather than appended overrides (Tailwind's
 * cascade order can't be trusted to let an appended override win here).
 */
export function CapabilityRow({
  item,
  index,
  total,
  dark = false,
  variant = "standard",
}: {
  item: CapabilityItem;
  index: number;
  total: number;
  dark?: boolean;
  variant?: CapabilityRowVariant;
}) {
  const isDataGrid = variant === "data-grid";
  const isTechnical = variant === "technical";
  const isStatementForward = variant === "statement-forward";

  return (
    <div
      className={cn(
        "group relative border-t transition-editorial",
        dark ? "border-line bg-ink hover:bg-[#141414]" : "border-line hover:bg-ink/[0.02]",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute right-gutter top-lg hidden font-body text-[10px] font-semibold uppercase tracking-widest xl:top-xl xl:block",
          dark ? "text-[rgba(242,238,228,0.6)]" : "text-[rgba(11,11,11,0.6)]",
        )}
      >
        İDX · {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>

      <SiteContainer>
        <div className={cn("grid grid-cols-1 gap-y-md py-md xl:grid-cols-12 xl:gap-x-lg xl:items-start xl:py-lg")}>
          <div className={LEFT_SPAN[variant]}>
            <div className="flex items-baseline gap-sm">
              <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-kite">
                {item.number}
              </span>
              {/* The row's signal mark: a short active (yellow) segment entering
                  a longer inactive rule — reads as direction, and on hover the
                  active segment advances further into the rule. */}
              <span aria-hidden className="flex h-px w-10 items-center">
                <span className="h-[2px] w-4 shrink-0 bg-kite transition-editorial group-hover:w-8" />
                <span className={cn("h-px flex-1", dark ? "bg-paper/30" : "bg-line")} />
              </span>
            </div>
            <h3
              className={cn(
                "mt-sm font-display text-display-md font-black uppercase leading-[0.92] xl:text-display-lg",
                dark ? "text-paper" : "text-ink",
              )}
            >
              {item.title}
            </h3>
          </div>

          <div
            className={cn(
              MIDDLE_SPAN[variant],
              "xl:border-l xl:pl-lg",
              dark ? "xl:border-paper/15" : "xl:border-line-soft",
            )}
          >
            <p
              className={cn(
                "font-display font-black uppercase text-ink",
                dark && "text-paper",
                isStatementForward
                  ? "text-display-md leading-[0.95] xl:max-w-[34ch] xl:text-display-xl"
                  : "text-display-sm leading-[1.08] xl:max-w-[24ch]",
              )}
            >
              {item.statement.map((segment, i) => (
                <span key={i} className={segment.accent ? "text-kite" : undefined}>
                  {segment.text}
                </span>
              ))}
            </p>
            {item.supportingCopy && (
              <p
                className={cn(
                  "mt-sm font-body text-body-md xl:max-w-[38ch]",
                  dark ? "text-paper-soft" : "text-ink-soft",
                )}
              >
                {item.supportingCopy}
              </p>
            )}

            {isDataGrid && (
              <div className={cn("mt-lg grid grid-cols-2 gap-md xl:grid-cols-4 xl:divide-x xl:divide-line-soft")}>
                {item.groups.map((group, gi) => (
                  <div key={group.label ?? gi} className="xl:pl-md xl:first:pl-0">
                    {group.label && <RailLabel dark={dark}>{group.label}</RailLabel>}
                    <ul className="space-y-2xs">
                      {group.items.map((service) => (
                        <li
                          key={service}
                          className={cn(
                            "border-t pt-3xs font-body text-label tabular-nums",
                            dark ? "border-paper/15 text-paper" : "border-line-soft text-ink",
                          )}
                        >
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!isDataGrid && (
            <div
              className={cn(
                RIGHT_SPAN[variant],
                "xl:border-l xl:pl-lg",
                dark ? "xl:border-paper/15" : "xl:border-line-soft",
              )}
            >
              <div className="space-y-md">
                {item.groups.map((group, gi) => (
                  <div key={group.label ?? gi}>
                    {group.label && <RailLabel dark={dark}>{group.label}</RailLabel>}
                    <ul
                      className={cn(
                        "grid gap-x-md gap-y-2xs",
                        isStatementForward ? "grid-cols-1" : "grid-cols-2",
                      )}
                    >
                      {group.items.map((service) => (
                        <li
                          key={service}
                          className={cn(
                            "border-t pt-3xs font-body text-label",
                            dark ? "border-paper/15 text-paper" : "border-line-soft text-ink",
                          )}
                        >
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {item.secondary && (
                <div
                  className={cn(
                    "mt-md border-t pt-sm xl:mt-lg",
                    dark ? "border-paper/25" : "border-line",
                    isTechnical && !dark && "bg-paper-dim/50 px-sm py-sm",
                  )}
                >
                  <RailLabel dark={dark}>{item.secondary.label}</RailLabel>
                  <ul
                    className={cn(
                      "flex flex-wrap font-body text-label",
                      isTechnical && "tabular-nums",
                      dark ? "text-paper-soft" : "text-ink-soft",
                    )}
                  >
                    {item.secondary.items.map((entry, i) => (
                      <li
                        key={entry}
                        className={cn(
                          "px-2xs first:pl-0",
                          i > 0 && (dark ? "border-l border-paper/20" : "border-l border-line-soft"),
                        )}
                      >
                        {entry}
                      </li>
                    ))}
                  </ul>
                  {item.secondary.note && (
                    <p
                      className={cn(
                        "mt-xs max-w-[42ch] font-body text-label italic",
                        dark ? "text-paper-soft" : "text-ink-soft",
                      )}
                    >
                      {item.secondary.note}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </SiteContainer>
    </div>
  );
}
