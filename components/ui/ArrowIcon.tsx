import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

interface ArrowIconProps extends Omit<SVGProps<SVGSVGElement>, "className"> {
  /** Rotates the base up-right glyph. Defaults to up-right (replaces ↗). */
  direction?: "up-right" | "right" | "down";
  className?: string;
}

const rotationByDirection: Record<NonNullable<ArrowIconProps["direction"]>, string> = {
  "up-right": "rotate-0",
  right: "rotate-45",
  down: "rotate-[135deg]",
};

/**
 * Thin geometric arrow, drawn as SVG so it never falls back to a colored
 * emoji glyph on mobile (the failure mode of the Unicode ↗/→/↓ characters
 * it replaces). Sized to 1em so it inherits the ambient font size exactly
 * like the character did; direction rotates one up-right path rather than
 * drawing three separate shapes.
 */
export function ArrowIcon({ direction = "up-right", className, ...props }: ArrowIconProps) {
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
      className={cn("inline-block shrink-0", rotationByDirection[direction], className)}
      {...props}
    >
      <path d="M6 18L18 6M11 6H18V13" />
    </svg>
  );
}
