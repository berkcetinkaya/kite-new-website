import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Which edges carry the editorial hairline rule. */
  border?: "top" | "bottom" | "both" | "none";
  /** Vertical pacing — "loose" is for sections that should breathe. */
  spacing?: "compact" | "default" | "loose";
  background?: "paper" | "paper-dim" | "ink";
}

const spacingClass: Record<NonNullable<SectionProps["spacing"]>, string> = {
  compact: "py-lg",
  default: "py-xl",
  loose: "py-3xl",
};

const backgroundClass: Record<NonNullable<SectionProps["background"]>, string> = {
  paper: "bg-paper text-ink",
  "paper-dim": "bg-paper-dim text-ink",
  ink: "bg-ink text-paper",
};

/**
 * Vertical rhythm primitive for full-bleed homepage sections. Deliberately
 * does not impose an inner grid — pair with SiteContainer / EditorialGrid
 * inside for the horizontal composition, since not every future section
 * should share the same column structure.
 */
export function Section({
  children,
  className,
  id,
  border = "top",
  spacing = "default",
  background = "paper",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        spacingClass[spacing],
        backgroundClass[background],
        (border === "top" || border === "both") && "border-t",
        (border === "bottom" || border === "both") && "border-b",
        className,
      )}
    >
      {children}
    </section>
  );
}
