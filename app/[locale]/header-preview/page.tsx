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
import { Measurement } from "@/components/site/Measurement";
import { Kite } from "@/components/site/Kite";
import { Thinking } from "@/components/site/Thinking";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

/**
 * Internal QA harness for Phase 2 (Header) through Phase 9 (Final CTA +
 * Footer). Not the homepage — sections below this are built and approved
 * separately.
 */
export default async function HeaderPreviewPage() {
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
        <Measurement />
        <Kite />
        <Thinking />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
