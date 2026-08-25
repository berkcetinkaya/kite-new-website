import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer, EditorialGrid, SectionLabel, PrimaryButton, TextLink } from "@/components/ui";
import { WindPath } from "./WindPath";

export async function Hero() {
  const dict = await getDictionary();
  const { hero, brand } = dict;

  return (
    <section className="relative flex min-h-[85vh] flex-col overflow-hidden bg-paper pt-lg xl:pt-xl">
      <SiteContainer className="flex flex-1 flex-col">
        <SectionLabel number="001" title={hero.indexLabel} rule className="mb-lg xl:mb-2xl" />

        <div className="relative">
          <WindPath
            variant="desktop"
            className="pointer-events-none absolute -inset-x-gutter -top-md bottom-0 hidden xl:block"
          />

          <EditorialGrid columns={{ base: 4, md: 6, xl: 12 }} className="relative">
            <div className="col-span-4 md:col-span-6 xl:col-span-8">
              <h1 className="font-display text-display-2xl font-black uppercase leading-none text-ink">
                {hero.headline.map((line, i) => (
                  <span
                    key={i}
                    className="hero-line block"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    {line.map((segment, j) => (
                      <span key={j} className={segment.accent ? "text-kite" : undefined}>
                        {segment.text}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              <div className="mt-lg flex flex-wrap items-center gap-lg">
                <PrimaryButton href="#contact">{hero.primaryCta}</PrimaryButton>
                <TextLink
                  href="#next-section-hint"
                  arrowGlyph="↓"
                  arrowHoverClassName="group-hover:translate-y-0.5"
                >
                  {hero.secondaryCta}
                </TextLink>
              </div>
            </div>

            <div className="col-span-4 mt-xl md:col-span-6 xl:col-span-3 xl:col-start-10 xl:mt-2xs">
              <p
                lang="en"
                className="max-w-[26ch] border-l border-line pl-sm text-label font-semibold uppercase tracking-wide text-ink-soft xl:ml-auto xl:text-right xl:border-l-0 xl:border-r xl:pl-0 xl:pr-sm"
              >
                {brand.statement}
              </p>
            </div>
          </EditorialGrid>

          <WindPath
            variant="mobile"
            className="pointer-events-none mx-auto mt-xl h-[220px] max-w-[280px] xl:hidden"
          />
        </div>

        <div className="mt-2xl flex flex-col gap-sm pb-lg md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap items-center gap-x-sm gap-y-2xs font-body text-label font-semibold uppercase tracking-wide text-ink-soft">
            <span className="flex items-center gap-2xs">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-kite" />
              {brand.location}
            </span>
            <span>{brand.globalNote}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2xs font-body text-label font-semibold uppercase tracking-wide text-ink-soft">
            {hero.capabilities.map((capability, i) => (
              <span key={capability} className="flex items-center gap-2xs">
                {i > 0 && (
                  <span aria-hidden className="text-line">
                    /
                  </span>
                )}
                {capability}
              </span>
            ))}
          </div>

          <button
            type="button"
            className="group inline-flex w-fit items-center gap-2xs font-body text-label font-semibold uppercase tracking-wide text-ink-soft transition-editorial hover:text-ink"
          >
            <span className="relative">
              {hero.showreelLabel}
              <span
                aria-hidden
                className="absolute -bottom-[2px] left-0 h-px w-full origin-left scale-x-0 bg-kite-dark transition-editorial group-hover:scale-x-100"
              />
            </span>
            <span
              aria-hidden
              className="inline-block transition-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </button>
        </div>
      </SiteContainer>

      <div id="next-section-hint" className="border-t border-line">
        <SiteContainer className="flex items-center justify-between py-xs">
          <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
            {hero.nextSectionHint.number} / {hero.nextSectionHint.title}
          </span>
          <span aria-hidden className="text-ink-soft">
            ↓
          </span>
        </SiteContainer>
      </div>
    </section>
  );
}
