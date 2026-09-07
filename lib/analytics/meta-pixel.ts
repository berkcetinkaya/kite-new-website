/** Public by design — Meta Pixel IDs ship in client-side script, not a secret. */
export const META_PIXEL_ID = "2521875191676740";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function callFbq(...args: unknown[]): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

/**
 * Module-scoped (not component-scoped) on purpose: the [locale] segment's
 * layout — where the pixel mounts — remounts on a TR/EN switch since the
 * dynamic segment value itself changes, which would reset a component-local
 * ref and either double-fire or swallow the route's PageView. A plain
 * module variable survives that remount for as long as the page itself is
 * alive, and only resets on an actual full reload — exactly when the base
 * snippet's own PageView call needs it to.
 */
let lastTrackedPathname: string | null = null;

/**
 * Call on mount and on every pathname change. The base snippet's own
 * `fbq('track', 'PageView')` already covers the very first load, so the
 * first observation for a given page life only records the pathname
 * without re-tracking it; only an actual change fires a new PageView.
 */
export function trackPageViewForRoute(pathname: string): void {
  if (lastTrackedPathname === null) {
    lastTrackedPathname = pathname;
    return;
  }
  if (lastTrackedPathname === pathname) return;
  lastTrackedPathname = pathname;
  callFbq("track", "PageView");
}

/** Fire only after a contact-form submission's API response confirms success. */
export function trackLead(): void {
  callFbq("track", "Lead");
}
