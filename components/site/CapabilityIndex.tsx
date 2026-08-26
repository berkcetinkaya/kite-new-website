"use client";

import { useState } from "react";
import { EditorialGrid } from "@/components/ui";
import { cn } from "@/lib/cn";

interface CapabilityItem {
  number: string;
  title: string;
  services: string[];
}

interface CapabilityIndexProps {
  items: CapabilityItem[];
  /** Row to visually nudge in response to hovering the capability map above — never auto-opens it. */
  highlightIndex?: number | null;
}

function ToggleIndicator({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative flex h-8 w-8 shrink-0 items-center justify-center border transition-editorial xl:h-10 xl:w-10",
        open ? "border-kite" : "border-line",
      )}
    >
      <span
        className={cn(
          "absolute h-px w-4 bg-ink transition-editorial xl:w-5",
          open ? "rotate-45" : "rotate-0",
        )}
      />
      <span
        className={cn(
          "absolute h-px w-4 bg-ink transition-editorial xl:w-5",
          open ? "-rotate-45" : "rotate-90",
        )}
      />
    </span>
  );
}

export function CapabilityIndex({ items, highlightIndex = null }: CapabilityIndexProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const isHighlighted = !isOpen && highlightIndex === i;
        const panelId = `capability-panel-${item.number}`;

        return (
          <li
            key={item.number}
            className={cn(
              "border-t border-line last:border-b transition-editorial",
              isHighlighted && "bg-paper-dim",
            )}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex((prev) => (prev === i ? null : i))}
                className="group flex w-full items-center justify-between gap-md py-md text-left transition-editorial xl:py-lg"
              >
                <div className="flex items-baseline gap-sm xl:gap-lg">
                  <span
                    className={cn(
                      "font-display text-display-sm font-extrabold uppercase tabular-nums leading-none transition-editorial",
                      isOpen || isHighlighted ? "text-kite-dark" : "text-ink-soft group-hover:text-kite-dark",
                    )}
                  >
                    {item.number}
                  </span>
                  <span
                    className={cn(
                      "font-display text-display-lg font-black uppercase leading-none text-ink transition-editorial group-hover:translate-x-2 xl:text-display-xl",
                      isHighlighted && "translate-x-2",
                    )}
                  >
                    {item.title}
                  </span>
                </div>
                <ToggleIndicator open={isOpen} />
              </button>
            </h3>

            <div
              id={panelId}
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="grid"
            >
              <div className="overflow-hidden">
                <span
                  aria-hidden
                  className={cn(
                    "block h-[2px] w-full origin-left bg-kite transition-editorial xl:max-w-[60%]",
                    isOpen ? "scale-x-100" : "scale-x-0",
                  )}
                />
                <EditorialGrid columns={{ base: 1, md: 2, xl: 2 }} className="gap-x-lg gap-y-0 pb-lg pt-sm xl:max-w-[70%] xl:pb-xl">
                  {item.services.map((service) => (
                    <span
                      key={service}
                      className="border-t border-line-soft py-xs font-body text-body-md text-ink"
                    >
                      {service}
                    </span>
                  ))}
                </EditorialGrid>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
