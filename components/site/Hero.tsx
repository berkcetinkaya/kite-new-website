import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer, PrimaryButton, TextLink } from "@/components/ui";
import { cn } from "@/lib/cn";
import { HeroArtwork } from "./HeroArtwork";

/**
 * One deterministic desktop grid — left content / image / scroll rail as
 * three sibling columns, not three independently-sized wrappers — so the
 * headline top and the image top share a row start and the whole hero
 * reads as one composed rectangle instead of stacked blocks. The left
 * column is itself a second, smaller grid (001 index / headline, then
 * secondary statement / body+CTA) for the same reason.
 */
export async function Hero() {
  const dict = await getDictionary();
  const { hero, brand, kite } = dict;

  return (
    <section className="relative overflow-hidden bg-paper pt-sm xl:pt-md">
      <SiteContainer>
        <div className="flex flex-col gap-lg xl:grid xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)_auto] xl:items-start xl:gap-x-lg">
          <div>
            <div className="grid grid-cols-[auto_1fr] gap-x-xs xl:gap-x-sm">
              <div className="flex shrink-0 items-center gap-2xs pt-[0.25em]">
                <span className="font-display text-body-lg font-extrabold uppercase tabular-nums leading-none text-ink">
                  001
                </span>
                <span aria-hidden className="h-px w-6 bg-line" />
              </div>

              <h1 className="font-display text-[clamp(2.5rem,7vw,6.15rem)] font-black uppercase leading-[0.96] tracking-tight text-ink xl:leading-[1.02]">
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

            <div className="mt-[22px] border-t border-line pt-[22px] xl:mt-[24px] xl:pt-[24px]">
              <div className="grid grid-cols-1 gap-md xl:grid-cols-[42%_38%_1fr] xl:gap-x-lg xl:items-start">
                <p className="font-display text-[clamp(2rem,3.4vw,3.15rem)] font-black uppercase leading-[0.93] text-ink xl:leading-[0.97]">
                  {hero.secondaryStatement.map((line, i) => (
                    <span key={i} className={cn("block", line.accent && "text-kite")}>
                      {line.text}
                    </span>
                  ))}
                </p>

                <div className="xl:max-w-[270px]">
                  <div className="font-body text-[15px] leading-[1.48] text-ink-soft">
                    {hero.supportingCopy.map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2xs" : undefined}>
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="mt-[14px]">
                    <PrimaryButton href="#work" className="justify-center px-md py-[13px]">
                      {hero.secondaryCta}
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:min-w-0">
            <HeroArtwork
              agencyLine={`${brand.name} ${brand.agencyType}`}
              locationLine={brand.location}
              coordinates={[kite.cities[0]?.coordinates ?? "", kite.cities[1]?.coordinates ?? ""]}
              stampLines={hero.stampLines}
            />
          </div>

          <div className="hidden w-12 shrink-0 flex-col items-center justify-between py-2xs xl:flex xl:self-stretch">
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
      </SiteContainer>

      <div id="next-section-hint" className="mt-lg scroll-mt-[var(--header-h)] border-t border-line xl:mt-[28px]">
        <SiteContainer className="flex items-center justify-between py-[18px]">
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
