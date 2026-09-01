import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer, EditorialGrid } from "@/components/ui";
import { cn } from "@/lib/cn";
import { CityLine } from "./CityLine";

/**
 * "012 / Kite Hakkında" — the one deliberate breather in the page. After
 * eleven sections of system, process and measurement, this is a short,
 * human paragraph rather than another framework: one headline, two
 * sentences, and the Istanbul ↔ Bali motif (coordinates + a single thin
 * line) standing in for every "about us" cliché this chapter skips —
 * no team photo, no literal map, no service list.
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

        <div className="mt-lg max-w-[52ch] xl:mt-xl">
          {kite.aboutCopy.map((paragraph, i) => (
            <p key={i} className={cn("font-body text-body-lg text-ink-soft", i > 0 && "mt-sm")}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-3xl xl:mt-4xl">
          <p className="font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft">
            {kite.citiesLabel}
          </p>

          <EditorialGrid columns={{ base: 4, md: 6, xl: 12 }} className="mt-lg items-start xl:mt-xl">
            <div className="col-span-4 md:col-span-3 xl:col-span-4">
              <p className="font-display text-display-sm font-black uppercase leading-none text-ink">
                {kite.cities[0]?.name}
              </p>
              <p className="mt-2xs font-body text-body-sm text-ink-soft">{kite.cities[0]?.coordinates}</p>
              <div className="mt-md flex flex-col gap-1">
                {kite.cities[0]?.descriptors.map((d) => (
                  <span key={d} className="font-body text-body-md text-ink-soft">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-4 order-first mt-sm self-center md:order-none md:col-span-6 md:mt-0 xl:col-span-4">
              <CityLine />
              <p className="mt-xs text-center font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft">
                {kite.microAnnotation}
              </p>
            </div>

            <div className="col-span-4 md:col-span-3 xl:col-span-4 xl:text-right">
              <p className="font-display text-display-sm font-black uppercase leading-none text-ink">
                {kite.cities[1]?.name}
              </p>
              <p className="mt-2xs font-body text-body-sm text-ink-soft">{kite.cities[1]?.coordinates}</p>
              <div className="mt-md flex flex-col gap-1 xl:items-end">
                {kite.cities[1]?.descriptors.map((d) => (
                  <span key={d} className="font-body text-body-md text-ink-soft">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </EditorialGrid>
        </div>
      </SiteContainer>

      <div className="mt-2xl border-t border-line xl:mt-3xl">
        <SiteContainer className="flex items-center justify-between py-xs">
          <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
            {kite.nextSectionHint.number} / {kite.nextSectionHint.title}
          </span>
          <span aria-hidden className="text-ink-soft">
            ↓
          </span>
        </SiteContainer>
      </div>
    </section>
  );
}
