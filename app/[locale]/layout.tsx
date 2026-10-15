import type { Metadata } from "next";
import { Big_Shoulders, Inter } from "next/font/google";
import "../globals.css";
import { locales } from "@/lib/i18n/locales";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SITE_URL } from "@/lib/seo/site";
import { siteJsonLdGraph } from "@/lib/seo/structured-data";

const displayFont = Big_Shoulders({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: "/brand/kite-logo.png",
    },
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="paper-texture">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLdGraph()) }} />
        <MetaPixel />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
