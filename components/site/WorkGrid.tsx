import Image from "next/image";
import { cn } from "@/lib/cn";

interface Project {
  number: string;
  name: string;
  services: string[];
  ongoing?: boolean;
  featured?: boolean;
  image?: string;
}

interface WorkGridProps {
  projects: Project[];
  featuredLabel: string;
  statusOngoing: string;
}

/**
 * Desktop column span per project (12-col track): DESETOUR gets extra
 * width for its "featured" prominence, the rest of row one splits the
 * remainder, row two is an even two-up split. Auto-flow wraps the row
 * automatically since each row's spans sum to 12 — no explicit row index
 * needed. Tailwind's class scanner needs literal strings, not runtime-built
 * ones (see EditorialGrid.tsx), hence the explicit lookup instead of
 * `xl:col-span-${n}`.
 */
const DESKTOP_SPAN_CLASSES = ["xl:col-span-5", "xl:col-span-4", "xl:col-span-3", "xl:col-span-6", "xl:col-span-6"];

/**
 * An editorial contact-sheet grid: each project is a flush image panel
 * (zero radius, zero shadow) with a permanent dark-to-transparent scrim
 * for caption legibility over any future photo. Real artwork isn't
 * supplied yet, so panels without a resolved `image` fall back to a dark
 * textured placeholder — never a grey skeleton box — and nothing about
 * the layout needs to change once real images land in /public/work.
 */
export function WorkGrid({ projects, featuredLabel, statusOngoing }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 xl:grid-cols-12 xl:auto-rows-[clamp(260px,22vw,380px)]">
      {projects.map((project, i) => (
        <button
          key={project.number}
          type="button"
          className={cn(
            "group relative flex aspect-[3/2] w-full flex-col justify-end overflow-hidden bg-ink p-sm text-left transition-editorial xl:aspect-auto xl:h-full",
            DESKTOP_SPAN_CLASSES[i],
          )}
        >
          <div className="absolute inset-0">
            {project.image ? (
              <Image src={project.image} alt="" fill sizes="(min-width: 1280px) 45vw, 100vw" className="object-cover" />
            ) : (
              <div className="paper-texture-dark absolute inset-0 bg-gradient-to-br from-[#232323] via-ink to-black" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent transition-editorial group-hover:from-ink/95" />
          </div>

          <div className="relative flex items-center gap-xs">
            <span className="font-display text-label font-semibold uppercase tabular-nums leading-none text-kite">
              {project.number}
            </span>
            {project.featured && (
              <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-kite">
                {featuredLabel}
              </span>
            )}
          </div>

          <span className="relative mt-2xs block font-display text-display-md font-black uppercase leading-[0.95] text-paper transition-editorial group-hover:translate-x-1">
            {project.name}
          </span>

          <div className="relative mt-2xs flex flex-wrap items-center gap-x-2xs gap-y-3xs font-body text-label font-semibold uppercase tracking-wide text-paper-soft">
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
