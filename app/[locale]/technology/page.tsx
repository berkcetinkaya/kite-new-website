import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TechnologySection } from "@/components/site/TechnologySection";
import { ManagedGrowthBlock } from "@/components/site/ManagedGrowthBlock";
import { SiteContainer, PrimaryButton } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const { technology } = await getDictionary();

  return {
    title: technology.meta.title,
    description: technology.meta.description,
  };
}

/**
 * The deep-dive the homepage spotlight points to. CRM & Sales Automation
 * and AI Sales Representative render through TechnologySection, and
 * Managed Growth through ManagedGrowthBlock — page-specific components,
 * not CapabilityRow/CollaborationModel. Both of those were built for the
 * homepage's denser disciplines and collaboration models; forced onto this
 * page's longer, business-language copy they produced an oversized
 * display headline colliding with its column and a feature-comparison
 * read for Managed Growth. The content itself still lives in the
 * dictionary's `technology` block, written in plain business language —
 * CRM's technical groups (GA4, GTM, Meta Pixel, lifecycle, reporting) stay
 * exactly where they already were, in capabilities.items[4], unrendered
 * on this page.
 */
export default async function TechnologyPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const { technology } = dict;

  return (
    <>
      <Header />
      <main id="content">
        <section className="bg-paper pt-xl xl:pt-2xl">
          <SiteContainer>
            <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-ink-soft">
              {technology.eyebrow}
            </span>
            <h1 className="mt-sm max-w-[20ch] font-display text-display-lg font-black uppercase leading-[0.97] text-ink xl:text-display-2xl">
              {technology.heroStatement.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-md max-w-[56ch] font-body text-body-lg text-ink-soft">{technology.heroSupport}</p>
          </SiteContainer>
        </section>

        <div className="mt-xl xl:mt-2xl">
          <TechnologySection section={technology.sections.crm} />
          <TechnologySection section={technology.sections.aiSalesRep} />
          <ManagedGrowthBlock content={technology.managedGrowth} />
        </div>

        <section className="border-t border-line bg-paper py-xl xl:py-2xl">
          <SiteContainer className="flex flex-col items-start gap-lg xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-[48ch]">
              <h2 className="font-display text-display-sm font-black uppercase leading-[1.08] text-ink xl:text-display-md">
                {technology.closingHeadline.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mt-sm max-w-[44ch] font-body text-body-md text-ink-soft">{technology.closingSupport}</p>
            </div>
            <PrimaryButton href={`/${locale}?needs=crm,ai-sales#contact`} className="shrink-0">
              {technology.ctaLabel}
            </PrimaryButton>
          </SiteContainer>
        </section>
      </main>
      <Footer />
    </>
  );
}
