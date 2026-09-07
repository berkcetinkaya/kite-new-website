"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { META_PIXEL_ID, trackPageViewForRoute } from "@/lib/analytics/meta-pixel";

/**
 * Mounted from the root ([locale]) layout, so it loads for every locale
 * and route. That layout remounts whenever the locale segment itself
 * changes (TR <-> EN), which resets any component-local state here — the
 * route-vs-duplicate bookkeeping in trackPageViewForRoute is module-scoped
 * specifically so it survives that remount. The base snippet below tracks
 * the very first PageView itself.
 */
export function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageViewForRoute(pathname);
  }, [pathname]);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
