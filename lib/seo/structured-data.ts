import { SITE_URL } from "./site";

/**
 * Organization + WebSite JSON-LD, grounded only in facts that actually
 * exist elsewhere in the codebase (Footer's Instagram link, the published
 * contact email, the logo already served as the site icon) — no address,
 * ratings, reviews, or credentials, since none of those are real/verified.
 * Rendered once, site-wide, from the root locale layout.
 */
export function siteJsonLdGraph() {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "KITE Growth Agency",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/kite-logo.png`,
    email: "hello@kitegrowth.com",
    sameAs: ["https://www.instagram.com/kitegrowth"],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "KITE Growth Agency",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };
}
