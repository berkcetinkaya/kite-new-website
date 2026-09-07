"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { GA4_MEASUREMENT_ID, trackPageViewForRoute } from "@/lib/analytics/ga4";

/**
 * Mounted from the root ([locale]) layout, alongside MetaPixel — same
 * mount point, same remount-on-locale-switch caveat, same fix (route
 * dedup bookkeeping lives in the ga4 module, not component state). The
 * base gtag config call tracks the very first page_view itself.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageViewForRoute(pathname);
  }, [pathname]);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
