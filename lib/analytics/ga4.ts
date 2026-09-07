/** Public by design — GA4 measurement IDs ship in client-side script, not a secret. */
export const GA4_MEASUREMENT_ID = "G-EVXN225FRZ";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function callGtag(...args: unknown[]): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

/**
 * Module-scoped for the same reason as the Meta Pixel's equivalent: the
 * [locale] segment's layout — where this pixel mounts — remounts on a
 * TR/EN switch since the dynamic segment value itself changes, which would
 * reset a component-local ref. A plain module variable survives that
 * remount for as long as the page is alive, and only resets on an actual
 * full reload — exactly when gtag's own initial page_view needs it to.
 */
let lastTrackedPathname: string | null = null;

/**
 * Call on mount and on every pathname change. The base gtag config call
 * already sends the initial page_view, so the first observation for a
 * given page life only records the pathname without re-sending it; only
 * an actual change fires a new page_view.
 */
export function trackPageViewForRoute(pathname: string): void {
  if (lastTrackedPathname === null) {
    lastTrackedPathname = pathname;
    return;
  }
  if (lastTrackedPathname === pathname) return;
  lastTrackedPathname = pathname;
  callGtag("event", "page_view", {
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

interface LeadContext {
  /** Site locale ("tr" | "en") — not personal data. */
  language?: string;
  /** Labels from the contact form's "what do you need" checklist. */
  services?: string[];
}

/**
 * Fire only after a contact-form submission's API response confirms
 * success. Never pass name/email/phone/company/message here — GA4 should
 * only see non-sensitive context about the lead, not its content.
 */
export function trackLead(context: LeadContext = {}): void {
  const params: Record<string, string> = {};
  if (context.language) params.language = context.language;
  if (context.services && context.services.length > 0) params.selected_services = context.services.join(", ");
  callGtag("event", "generate_lead", params);
}
