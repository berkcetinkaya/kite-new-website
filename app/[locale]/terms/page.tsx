import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LegalPage } from "@/components/site/LegalPage";

export async function generateMetadata(): Promise<Metadata> {
  const { legal, brand } = await getDictionary();

  return {
    title: `${legal.terms.title} — ${brand.name} ${brand.agencyType}`,
    description: legal.terms.intro,
  };
}

export default async function TermsPage() {
  const locale = await getLocale();
  const { legal } = await getDictionary();
  const lastUpdatedDate = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <>
      <Header />
      <main id="content">
        <LegalPage
          document={legal.terms}
          homeHref={`/${locale}`}
          backToHome={legal.backToHome}
          lastUpdatedLabel={legal.lastUpdatedLabel}
          lastUpdatedDate={lastUpdatedDate}
        />
      </main>
      <Footer />
    </>
  );
}
