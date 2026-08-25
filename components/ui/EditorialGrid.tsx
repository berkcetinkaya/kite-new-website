import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ColCount = 1 | 2 | 3 | 4 | 6 | 12;

interface EditorialGridProps {
  children: ReactNode;
  className?: string;
  /** Column count per breakpoint band. Not every section needs the same grid. */
  columns?: { base?: ColCount; md?: ColCount; xl?: ColCount };
}

// Tailwind's class scanner needs literal strings, not runtime-built ones —
// hence the explicit lookup tables instead of `grid-cols-${n}`.
const baseColsMap: Record<ColCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const mdColsMap: Record<ColCount, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

const xlColsMap: Record<ColCount, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  6: "xl:grid-cols-6",
  12: "xl:grid-cols-12",
};

/**
 * Flexible modular grid. Defaults to a 4-column mobile / 6-column tablet /
 * 12-column desktop rhythm; override per-section rather than forcing every
 * future module into the same structure.
 */
export function EditorialGrid({
  children,
  className,
  columns = { base: 4, md: 6, xl: 12 },
}: EditorialGridProps) {
  return (
    <div
      className={cn(
        "grid gap-sm",
        columns.base && baseColsMap[columns.base],
        columns.md && mdColsMap[columns.md],
        columns.xl && xlColsMap[columns.xl],
        className,
      )}
    >
      {children}
    </div>
  );
}
