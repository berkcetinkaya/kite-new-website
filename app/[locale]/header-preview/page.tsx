import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { SelectedWork } from "@/components/site/SelectedWork";
import { Capabilities } from "@/components/site/Capabilities";
import { Manifesto } from "@/components/site/Manifesto";
import { Kite } from "@/components/site/Kite";
import { Thinking } from "@/components/site/Thinking";

/**
 * Internal QA harness for Phase 2 (Header) through Phase 8 (Thinking).
 * Not the homepage — sections below this are built and approved
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
        <Manifesto />
        <Kite />
        <Thinking />
      </main>
    </>
  );
}
