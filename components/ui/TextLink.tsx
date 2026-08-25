import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TextLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  arrow?: boolean;
  /** Defaults to "↗". Override for directional variants, e.g. "↓" for a scroll-hint link. */
  arrowGlyph?: string;
  /** Hover drift direction for the arrow — should match arrowGlyph's direction. */
  arrowHoverClassName?: string;
  target?: string;
  rel?: string;
}

/**
 * Secondary CTA: transparent, text-based, restrained underline that draws
 * in on hover plus the ↗ arrow drift. No pill, no fill.
 */
export function TextLink({
  children,
  href,
  className,
  arrow = true,
  arrowGlyph = "↗",
  arrowHoverClassName = "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  target,
  rel,
}: TextLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "group inline-flex items-center gap-2xs font-body text-label font-semibold uppercase tracking-wide text-ink",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-[2px] left-0 h-px w-full origin-left scale-x-0 bg-kite-dark transition-editorial group-hover:scale-x-100"
        />
      </span>
      {arrow && (
        <span aria-hidden className={cn("inline-block transition-editorial", arrowHoverClassName)}>
          {arrowGlyph}
        </span>
      )}
    </Link>
  );
}
