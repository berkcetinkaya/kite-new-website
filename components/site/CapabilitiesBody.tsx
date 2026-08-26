"use client";

import { useState } from "react";
import { EditorialGrid } from "@/components/ui";
import { CapabilityMap, CapabilityMapMobile } from "./CapabilityMap";
import { CapabilityIndex } from "./CapabilityIndex";

interface CapabilityItem {
  number: string;
  title: string;
  services: string[];
}

interface CapabilitiesBodyProps {
  supportingLines: string[];
  items: CapabilityItem[];
}

/**
 * Bridges hover state between the capability map and the accordion below —
 * they're visual siblings (the map sits beside the statement, the
 * accordion spans full width beneath both), so the shared "which row is
 * active" state has to live above both rather than in either one.
 */
export function CapabilitiesBody({ supportingLines, items }: CapabilitiesBodyProps) {
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  return (
    <>
      <EditorialGrid columns={{ base: 4, md: 6, xl: 12 }} className="items-start">
        <div className="col-span-4 md:col-span-6 xl:col-span-5">
          <h2 className="max-w-[24ch] font-display text-display-sm font-black uppercase leading-tight text-ink-soft">
            {supportingLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="col-span-4 mt-xl md:col-span-6 xl:col-span-7 xl:col-start-6 xl:mt-0">
          <CapabilityMap onActiveChange={setHighlightIndex} />
          <CapabilityMapMobile />
        </div>
      </EditorialGrid>

      <div className="mt-xl xl:mt-2xl">
        <CapabilityIndex items={items} highlightIndex={highlightIndex} />
      </div>
    </>
  );
}
