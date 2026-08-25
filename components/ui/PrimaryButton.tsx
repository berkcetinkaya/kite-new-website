import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PrimaryButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  className?: string;
  arrow?: boolean;
  target?: string;
  rel?: string;
}

const baseClass =
  "group inline-flex items-center gap-2xs border border-line bg-kite px-md py-xs font-body text-label font-semibold uppercase tracking-wide text-ink transition-editorial hover:bg-ink hover:text-paper";

const arrowClass =
  "inline-block transition-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5";

/**
 * Primary CTA: kite-yellow fill, sharp corners, ↗ arrow. Use for the single
 * most important action in a given context — it should not appear more
 * than once or twice per section.
 */
export function PrimaryButton({
  children,
  href,
  onClick,
  type = "button",
  className,
  arrow = true,
  target,
  rel,
}: PrimaryButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span aria-hidden className={arrowClass}>
          ↗
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={cn(baseClass, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cn(baseClass, className)}>
      {content}
    </button>
  );
}
