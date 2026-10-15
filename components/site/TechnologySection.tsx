import { SiteContainer } from "@/components/ui";
import type { TechnologySectionContent } from "@/lib/i18n/types";

/**
 * One capability on /technology (CRM & Sales Automation, AI Sales
 * Representative) as a plain editorial row — not CapabilityRow. The
 * explanation is a body-scale paragraph (`lead`), never a display-size
 * statement: that's what made the original version collide and feel
 * technical. The points list is a single readable column, not a
 * multi-column technical grid, so GA4/GTM-style density never creeps back
 * in and mobile gets the exact same reading shape as desktop, just
 * narrower.
 */
export function TechnologySection({ section }: { section: TechnologySectionContent }) {
  return (
    <div className="border-t border-line py-lg xl:py-xl">
      <SiteContainer>
        <div className="flex items-baseline gap-sm">
          <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-kite-dark">
            {section.number}
          </span>
          <h2 className="font-display text-display-sm font-black uppercase leading-none text-ink xl:text-display-md">
            {section.title}
          </h2>
        </div>

        <div className="mt-md grid grid-cols-1 gap-y-md xl:grid-cols-12 xl:gap-x-xl">
          <p className="max-w-[60ch] font-body text-body-lg text-ink-soft xl:col-span-7">
            {section.lead.map((segment, i) => (
              <span key={i} className={segment.accent ? "text-kite-dark" : undefined}>
                {segment.text}
              </span>
            ))}
          </p>

          <div className="xl:col-span-4 xl:col-start-9 xl:border-l xl:border-line-soft xl:pl-lg">
            <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft">
              {section.pointsLabel}
            </span>
            <ul className="mt-sm space-y-2xs">
              {section.points.map((point) => (
                <li key={point} className="flex gap-2xs border-t border-line-soft pt-2xs font-body text-body-sm text-ink">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-kite" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-sm font-body text-label italic text-ink-soft">{section.note}</p>
          </div>
        </div>
      </SiteContainer>
    </div>
  );
}
