import { SiteContainer } from "@/components/ui";

interface Segment {
  text: string;
  accent?: boolean;
}

interface ManagedGrowthContent {
  number: string;
  title: string;
  lead: Segment[];
  workingModelLabel: string;
  workingModel: string;
}

/**
 * KITE Managed Growth, as a professional operating-model statement — not
 * CollaborationModel's bestFor/scope/workingModel comparison grid, which
 * read as a pricing/feature table, and not a punchy close either: the
 * approved copy already states scope in prose, so there's nothing left to
 * repeat in a points list or a closing one-liner. The subtle `bg-paper-dim`
 * tint plus a kite-yellow top rule (every other divider on this page is
 * plain `border-line`) is this section's one visual distinction — still
 * off-white/black/yellow, no new shape or graphic device.
 */
export function ManagedGrowthBlock({ content }: { content: ManagedGrowthContent }) {
  return (
    <div className="border-t-2 border-kite bg-paper-dim py-xl xl:py-2xl">
      <SiteContainer>
        <div className="flex items-baseline gap-sm">
          <span className="font-display text-display-sm font-extrabold leading-none text-kite-dark">{content.number}</span>
          <h2 className="font-display text-display-sm font-black uppercase leading-none text-ink xl:text-display-md">
            {content.title}
          </h2>
        </div>

        <p className="mt-lg max-w-[64ch] font-body text-body-lg text-ink-soft">
          {content.lead.map((segment, i) => (
            <span key={i} className={segment.accent ? "text-kite-dark" : undefined}>
              {segment.text}
            </span>
          ))}
        </p>

        <div className="mt-lg border-t border-line-soft pt-md">
          <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-kite-dark">
            {content.workingModelLabel}
          </span>
          <p className="mt-3xs font-display text-body-lg font-black uppercase leading-none text-ink">
            {content.workingModel}
          </p>
        </div>
      </SiteContainer>
    </div>
  );
}
