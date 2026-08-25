import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EditorialFrameProps {
  children: ReactNode;
  className?: string;
  caption?: ReactNode;
  captionVariant?: "solid" | "dashed";
}

/**
 * Sharp-cornered editorial border used to frame photography, project
 * modules and other media. Optional caption box mirrors the reference's
 * small bordered label overlaid on the hero photograph.
 */
export function EditorialFrame({
  children,
  className,
  caption,
  captionVariant = "dashed",
}: EditorialFrameProps) {
  return (
    <div className={cn("relative border border-line", className)}>
      {children}
      {caption && (
        <div
          className={cn(
            "absolute left-sm top-sm max-w-[70%] border bg-paper px-xs py-2xs font-body text-eyebrow uppercase tracking-wide text-ink",
            captionVariant === "dashed" ? "border-dashed border-line" : "border-line",
          )}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
