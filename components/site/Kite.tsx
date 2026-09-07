import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer, EditorialGrid } from "@/components/ui";
import { cn } from "@/lib/cn";
import { CityLine } from "./CityLine";

/**
 * "012 / Kite Hakkında" — the one deliberate breather in the page, but not
 * a throwaway "about us": the Istanbul ↔ Bali split is the actual point,
 * argued in three moments (who we are, why the time-zone handoff is an
 * operational asset, and the follow-the-sun payoff) rather than asserted
 * once and left decorative. Each moment shares one rhythm — a thin top
 * rule, an eyebrow/short-statement column, then the body — so despite the
 * added copy this still reads as one section, not a stitched sequence.
 * The coordinates + connecting-line device from the original design closes
 * it out unchanged, just trimmed to a single marker per city.
 */
export async function Kite() {
  const dict = await getDictionary();
  const { kite } = dict;

  return (
    <section id="about" className="relative scroll-mt-[var(--header-h)] bg-paper py-2xl xl:py-4xl">
      <SiteContainer>
        <div className="flex items-baseline gap-sm">
          <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
            {kite.folioNumber}
          </span>
          <span className="font-body text-label font-semibold uppercase tracking-widest text-ink-soft">
            {kite.microLabel}
          </span>
        </div>

        <h2 className="mt-md max-w-[20ch] font-display text-display-lg font-black uppercase leading-[0.97] text-ink xl:mt-lg xl:text-display-2xl">
          {kite.primaryStatement.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-lg max-w-[56ch] xl:mt-xl">
          {kite.aboutCopy.map((paragraph, i) => (
            <p key={i} className={cn("font-body text-body-lg text-ink-soft", i > 0 && "mt-sm")}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Moment: the time-zone handoff as an operational asset, not trivia */}
        <div className="mt-3xl border-t border-line pt-xl xl:mt-4xl xl:pt-2xl">
          <div className="grid grid-cols-1 gap-y-md xl:grid-cols-12 xl:items-start xl:gap-x-lg">
            <div className="xl:col-span-3">
              <p className="font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft">
                {kite.timezoneLabel}
              </p>
              <p className="mt-sm max-w-[18ch] font-display text-display-sm font-black uppercase leading-[1.1] text-ink">
                {kite.timezoneStatement}
              </p>
            </div>

            <div className="xl:col-span-9 xl:border-l xl:border-line-soft xl:pl-lg">
              <div className="max-w-[54ch]">
                {kite.timezoneCopy.map((paragraph, i) => (
                  <p key={i} className={cn("font-body text-body-lg text-ink-soft", i > 0 && "mt-sm")}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <ul className="mt-lg max-w-[44ch] space-y-2xs xl:mt-xl">
                {kite.timezoneList.map((line) => (
                  <li key={line} className="border-t border-line-soft pt-2xs font-body text-body-md text-ink">
                    {line}
                  </li>
                ))}
              </ul>

              <p className="mt-lg max-w-[34ch] font-display text-display-sm font-black uppercase leading-[1.15] text-ink xl:mt-xl xl:text-display-md">
                {kite.advantageStatement.map((segment, i) => (
                  <span key={i} className={cn("block", segment.accent && "text-kite")}>
                    {segment.text}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Moment: the follow-the-sun payoff */}
        <div className="mt-3xl border-t border-line pt-xl xl:mt-4xl xl:pt-2xl">
          <div className="grid grid-cols-1 gap-y-md xl:grid-cols-12 xl:items-start xl:gap-x-lg">
            <div className="xl:col-span-3">
              <p className="font-body text-eyebrow font-semibold uppercase tracking-widest text-kite">{kite.sunLabel}</p>
            </div>

            <div className="xl:col-span-9 xl:border-l xl:border-line-soft xl:pl-lg">
              <div className="max-w-[54ch]">
                {kite.sunCopy.map((paragraph, i) => (
                  <p key={i} className={cn("font-body text-body-lg text-ink-soft", i > 0 && "mt-sm")}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <p className="mt-lg max-w-[34ch] font-display text-display-md font-black uppercase leading-[1.08] text-ink xl:mt-xl xl:text-display-lg">
                {kite.closingStatement.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Coordinates + connecting line — the original device, trimmed to one marker per city */}
        <div className="mt-3xl border-t border-line pt-xl xl:mt-4xl xl:pt-2xl">
          <EditorialGrid columns={{ base: 4, md: 6, xl: 12 }} className="items-start">
            <div className="col-span-4 md:col-span-3 xl:col-span-4">
              <p className="font-display text-display-sm font-black uppercase leading-none text-ink">{kite.cities[0]?.name}</p>
              <p className="mt-2xs font-body text-body-sm text-ink-soft">{kite.cities[0]?.coordinate}</p>
            </div>

            <div className="col-span-4 order-first mt-sm self-center md:order-none md:col-span-6 md:mt-0 xl:col-span-4">
              <CityLine />
              <p className="mt-xs text-center font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft">
                {kite.microAnnotation}
              </p>
            </div>

            <div className="col-span-4 md:col-span-3 xl:col-span-4 xl:text-right">
              <p className="font-display text-display-sm font-black uppercase leading-none text-ink">{kite.cities[1]?.name}</p>
              <p className="mt-2xs font-body text-body-sm text-ink-soft">{kite.cities[1]?.coordinate}</p>
            </div>
          </EditorialGrid>
        </div>
      </SiteContainer>
    </section>
  );
}
