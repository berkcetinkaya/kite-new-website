import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer, EditorialGrid } from "@/components/ui";
import { cn } from "@/lib/cn";
import { CityLine } from "./CityLine";
import { ProcessSequence } from "./ProcessSequence";

/**
 * Manifesto's own bottom hint ("005 / KITE") is this chapter's opening
 * marker. A quiet folio number still appears at the very top — same
 * reasoning as Manifesto's own folio mark: this is a genuine background
 * change (black → paper), so a small page-folio reads as a new spread
 * rather than a duplicated intro.
 */
export async function Kite() {
  const dict = await getDictionary();
  const { kite, brand } = dict;

  return (
    <section id="about" className="relative scroll-mt-[var(--header-h)] bg-paper pt-xl xl:pt-2xl">
      <SiteContainer>
        <div className="flex items-center justify-between">
          <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft">
            {kite.folioNumber}
          </span>
          <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft">
            {kite.microLabel}
          </span>
        </div>

        <h2 className="mt-2xl font-display text-display-2xl font-black uppercase leading-none text-ink xl:mt-4xl">
          {brand.name}
        </h2>

        <p className="mt-lg max-w-[20ch] font-display text-display-lg font-black uppercase leading-[0.97] text-ink xl:mt-xl xl:text-display-xl">
          {kite.primaryStatement.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>

        <p className="mt-lg font-display text-display-md font-black uppercase leading-none text-ink xl:ml-[24%] xl:mt-xl xl:text-display-lg">
          {kite.citiesLabel}
        </p>

        <div className="mt-2xl xl:mt-3xl">
          <EditorialGrid columns={{ base: 4, md: 6, xl: 12 }} className="items-start">
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

        <div className="mt-2xl max-w-[52ch] xl:mt-3xl xl:max-w-[46ch]">
          {kite.aboutCopy.map((paragraph, i) => (
            <p key={i} className={cn("text-body-lg text-ink-soft", i > 0 && "mt-sm")}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-2xl border-t border-line pt-xl xl:mt-3xl xl:pt-2xl">
          <ProcessSequence stages={kite.process} label={kite.processLabel} />
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
