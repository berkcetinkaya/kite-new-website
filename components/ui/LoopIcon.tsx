import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Thin geometric loop/return glyph — an open circular arc with a small
 * arrowhead at its tail. Replaces the Unicode ↺ character, which is prone
 * to rendering as a colored emoji icon on mobile.
 */
export function LoopIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("inline-block shrink-0", className)}
      {...props}
    >
      <path d="M3.5 12a8.5 8.5 0 1 0 2.47-6" />
      <path d="M3.5 4v4.5h4.5" />
    </svg>
  );
}
