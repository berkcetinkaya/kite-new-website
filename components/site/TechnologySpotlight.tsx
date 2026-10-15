import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { SiteContainer, TextLink } from "@/components/ui";

/**
 * The approved "Technology Spotlight" — one compact editorial row between
 * Capabilities and ApproachEntry, not a feature section. Deliberately
 * reuses PrincipleRow's bordered 12-col grammar (number-less eyebrow rail /
 * headline / bordered copy column) rather than inventing a new layout, and
 * stays on the paper surface — no dark inversion — so it reads as part of
 * the Capabilities chapter it follows rather than a second ApproachEntry.
 * Padding is intentionally tighter than PrincipleRow's own rows: this is a
 * single statement, not a chapter, and must not read as "more page."
 */
export async function TechnologySpotlight() {
  const dict = await getDictionary();
  const { techSpotlight } = dict;
  const locale = await getLocale();

  return (
    <div className="relative border-t border-b border-line bg-paper">
      <SiteContainer>
        <div className="grid grid-cols-1 gap-y-sm py-md xl:grid-cols-12 xl:items-start xl:gap-x-lg xl:py-lg">
          <div className="xl:col-span-2">
            <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-ink-soft">
              {techSpotlight.eyebrow}
            </span>
            <span aria-hidden className="mt-sm flex h-px items-center">
              <span className="h-[2px] w-6 shrink-0 bg-kite" />
              <span className="h-px flex-1 bg-line" />
            </span>
          </div>

          <div className="xl:col-span-6">
            <h2 className="font-display text-display-md font-black uppercase leading-[1.02] text-ink xl:text-display-lg">
              {techSpotlight.headline.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div className="mt-xs xl:col-span-4 xl:mt-0 xl:border-l xl:border-line-soft xl:pl-lg">
            <p className="max-w-[40ch] font-body text-body-md text-ink-soft">{techSpotlight.supportingCopy}</p>

            <p className="mt-sm flex flex-wrap items-center gap-x-2xs gap-y-3xs font-body text-[10px] font-semibold uppercase tracking-widest text-kite-dark">
              {techSpotlight.keywords.map((keyword, i) => (
                <span key={keyword} className="flex items-center gap-2xs">
                  {i > 0 && <span aria-hidden className="text-ink-soft">·</span>}
                  {keyword}
                </span>
              ))}
            </p>

            <div className="mt-sm border-t border-line-soft pt-sm">
              <TextLink href={`/${locale}/technology`}>{techSpotlight.ctaLabel}</TextLink>
            </div>
          </div>
        </div>
      </SiteContainer>
    </div>
  );
}
