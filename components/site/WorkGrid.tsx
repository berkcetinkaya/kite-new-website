import { cn } from "@/lib/cn";

interface Project {
  number: string;
  name: string;
  services: string[];
  ongoing?: boolean;
  featured?: boolean;
}

interface WorkGridProps {
  projects: Project[];
  featuredLabel: string;
  statusOngoing: string;
}

/**
 * A contact-sheet / portfolio-index grid, not a card grid: zero border
 * radius, no shadow, no card padding — each panel is a flush rectangular
 * frame with the project number in yellow, a large condensed title, its
 * real services list, and a small yellow arrow tucked in the corner. Five
 * real projects don't divide evenly into the mockup's 4-across layout, so
 * the first three share a 3-wide row and the last two share a 2-wide row
 * beneath it (both built on the same 6-column track for shared alignment).
 * No real project photography exists yet, so each panel uses a plain dark
 * (ink) field instead of inventing stock imagery.
 */
export function WorkGrid({ projects, featuredLabel, statusOngoing }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 xl:grid-cols-6">
      {projects.map((project, i) => (
        <button
          key={project.number}
          type="button"
          className={cn(
            "group relative flex aspect-[16/10] flex-col justify-end bg-ink p-sm text-left transition-editorial hover:bg-ink/90",
            i < 3 ? "xl:col-span-2" : "xl:col-span-3",
          )}
        >
          <div className="flex items-center gap-xs">
            <span className="font-display text-label font-semibold uppercase tabular-nums leading-none text-kite">
              {project.number}
            </span>
            {project.featured && (
              <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-kite">
                {featuredLabel}
              </span>
            )}
          </div>

          <span className="mt-2xs block font-display text-display-md font-black uppercase leading-[0.95] text-paper transition-editorial group-hover:translate-x-1">
            {project.name}
          </span>

          <div className="mt-2xs flex flex-wrap items-center gap-x-2xs gap-y-3xs font-body text-label font-semibold uppercase tracking-wide text-paper-soft">
            {project.services.map((service, si) => (
              <span key={service} className="flex items-center gap-2xs">
                {si > 0 && (
                  <span aria-hidden className="text-paper-soft">
                    /
                  </span>
                )}
                {service}
              </span>
            ))}
            {project.ongoing && (
              <span className="ml-xs flex items-center gap-2xs text-paper">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-kite" />
                {statusOngoing}
              </span>
            )}
          </div>

          <span
            aria-hidden
            className="absolute bottom-sm right-sm flex h-6 w-6 shrink-0 items-center justify-center bg-kite text-ink transition-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </button>
      ))}
    </div>
  );
}
