import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SiteContainerProps {
  children: ReactNode;
  className?: string;
  /** "default" caps at the editorial content width; "full" stays edge-to-edge but keeps the gutter. */
  width?: "default" | "full";
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
}

/**
 * Horizontal rhythm primitive. Every top-level section should compose its
 * content through this instead of ad-hoc max-width or padding utilities,
 * so the outer margin stays consistent from 375px up to 1920px+.
 */
export function SiteContainer({
  children,
  className,
  width = "default",
  as: Component = "div",
}: SiteContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-gutter",
        width === "default" && "max-w-container",
        className,
      )}
    >
      {children}
    </Component>
  );
}
