import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { localizedAlternates } from "@/lib/seo/site";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { SelectedWork } from "@/components/site/SelectedWork";
import { Capabilities } from "@/components/site/Capabilities";
import { TechnologySpotlight } from "@/components/site/TechnologySpotlight";
import { ApproachEntry } from "@/components/site/ApproachEntry";
import { Kite } from "@/components/site/Kite";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

/**
 * Overrides the layout's default metadata (still the design-system preview's
 * title/description) with the real homepage's — `homeMeta` covers the five
 * capability areas (performance marketing, creative, web, CRM, AI sales
 * tech) rather than just the brand tagline, since the bare brand name alone
 * can't compete for anything beyond a branded search. OG/Twitter reuse the
 * same title/description and the existing logo asset — see the SEO audit
 * for why a dedicated 1200×630 social card is recommended but not invented
 * here.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { homeMeta } = await getDictionary();
  const locale = await getLocale();
  const alternates = localizedAlternates(locale);

  return {
    title: homeMeta.title,
    description: homeMeta.description,
    alternates,
    openGraph: {
      title: homeMeta.title,
      description: homeMeta.description,
      url: alternates.canonical,
      siteName: "KITE Growth Agency",
      images: [{ url: "/brand/kite-logo.png", width: 1024, height: 1024, alt: "KITE Growth Agency" }],
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: homeMeta.title,
      description: homeMeta.description,
      images: ["/brand/kite-logo.png"],
    },
  };
}

export default async function HomePage() {
  return (
    <>
      <Header />
      <main id="content">
        <Hero />
        <SelectedWork />
        <Capabilities />
        <TechnologySpotlight />
        <ApproachEntry />
        <Kite />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
