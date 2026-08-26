import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer, PrimaryButton, TextLink } from "@/components/ui";
import { cn } from "@/lib/cn";
import { HeroArtwork } from "./HeroArtwork";

export async function Hero() {
  const dict = await getDictionary();
  const { hero, brand, kite } = dict;

  return (
    <section className="relative overflow-hidden bg-paper pt-md xl:pt-lg">
      <SiteContainer>
        <div className="flex flex-col gap-lg xl:grid xl:grid-cols-12 xl:gap-x-md xl:gap-y-xl">
          <div className="xl:col-span-7">
            <div className="flex items-start gap-xs xl:gap-sm">
              <div className="flex shrink-0 items-center gap-2xs pt-[0.3em]">
                <span className="font-display text-body-lg font-extrabold uppercase tabular-nums leading-none text-ink">
                  001
                </span>
                <span aria-hidden className="h-px w-6 bg-line" />
              </div>

              <h1 className="font-display text-display-2xl font-black uppercase leading-[0.92] text-ink">
                {hero.headline.map((line, i) => (
                  <span key={i} className="hero-line block" style={{ animationDelay: `${i * 90}ms` }}>
                    {line.map((segment, j) => (
                      <span key={j} className={segment.accent ? "text-kite" : undefined}>
                        {segment.text}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          <div className="flex items-stretch gap-xs xl:col-span-5 xl:col-start-8 xl:row-span-2">
            <div className="min-w-0 flex-1">
              <HeroArtwork
                agencyLine={`${brand.name} ${brand.agencyType}`}
                locationLine={brand.location}
                coordinates={[kite.cities[0]?.coordinates ?? "", kite.cities[1]?.coordinates ?? ""]}
                stampLines={hero.stampLines}
              />
            </div>

            <div className="hidden w-6 shrink-0 flex-col items-center justify-between py-xs xl:flex">
              <span
                aria-hidden
                className="font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft"
                style={{ writingMode: "vertical-rl" }}
              >
                {hero.scrollLabel}
              </span>
              <span aria-hidden className="my-2xs w-px flex-1 bg-line" />
              <span aria-hidden className="text-ink-soft">
                ↓
              </span>
            </div>
          </div>

          <div className="xl:col-span-7">
            <div className="border-t border-line pt-lg xl:pt-xl">
              <div className="grid grid-cols-1 gap-md sm:grid-cols-2 sm:gap-lg">
                <p className="font-display text-display-md font-black uppercase leading-[0.95] text-ink">
                  {hero.secondaryStatement.map((line, i) => (
                    <span key={i} className={cn("block", line.accent && "text-kite")}>
                      {line.text}
                    </span>
                  ))}
                </p>

                <div>
                  <div className="font-body text-body-md text-ink-soft">
                    {hero.supportingCopy.map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2xs" : undefined}>
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="mt-sm">
                    <PrimaryButton href="#work">{hero.secondaryCta}</PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SiteContainer>

      <div id="next-section-hint" className="mt-lg scroll-mt-[var(--header-h)] border-t border-line xl:mt-xl">
        <SiteContainer className="flex items-center justify-between py-xs">
          <span className="flex items-baseline gap-sm">
            <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
              {hero.nextSectionHint.number}
            </span>
            <span className="font-body text-label font-semibold uppercase tracking-wide text-ink-soft">
              {hero.nextSectionHint.title}
            </span>
          </span>
          <TextLink href="#work">{hero.nextSectionHint.viewAllLabel}</TextLink>
        </SiteContainer>
      </div>
    </section>
  );
}
