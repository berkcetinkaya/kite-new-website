import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { SelectedWork } from "@/components/site/SelectedWork";
import { Capabilities } from "@/components/site/Capabilities";
import { Diagnosis } from "@/components/site/Diagnosis";
import { System } from "@/components/site/System";
import { FirstMonth } from "@/components/site/FirstMonth";
import { CaseStudies } from "@/components/site/CaseStudies";
import { Collaboration } from "@/components/site/Collaboration";
import { Principles } from "@/components/site/Principles";
import { Kite } from "@/components/site/Kite";
import { Thinking } from "@/components/site/Thinking";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

/**
 * Overrides the layout's default metadata (still the design-system preview's
 * title/description) with the real homepage's — composed only from copy
 * already approved and rendered elsewhere on the page (brand name, agency
 * type, statement), not new marketing copy.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { brand } = await getDictionary();

  return {
    title: `${brand.name} ${brand.agencyType}`,
    description: brand.statement,
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
        <Diagnosis />
        <System />
        <FirstMonth />
        <CaseStudies />
        <Collaboration />
        <Principles />
        <Kite />
        <Thinking />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
