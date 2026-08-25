import { cn } from "@/lib/cn";

interface DividerProps {
  className?: string;
  variant?: "solid" | "soft";
}

export function Divider({ className, variant = "solid" }: DividerProps) {
  return (
    <hr
      className={cn(
        "h-px w-full border-0",
        variant === "solid" ? "bg-line" : "bg-line-soft",
        className,
      )}
    />
  );
}
