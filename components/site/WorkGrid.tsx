import Link from "next/link";
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

interface WorkGridCta {
  number: string;
  headline: string;
  label: string;
}

interface WorkGridProps {
  projects: Project[];
  featuredLabel: string;
  statusOngoing: string;
  cta: WorkGridCta;
}

/**
 * An editorial contact-sheet strip: every project shares one flush image
 * panel treatment (zero radius, zero shadow) with a permanent
 * dark-to-transparent scrim for caption legibility over any future photo.
 * Five real projects plus one closing CTA cell divide evenly into a 3×2
 * desktop grid, so every cell shares the same dimensions — no shrinking to
 * fit, no asymmetric last row. Real artwork isn't supplied for any project
 * yet, so panels without a resolved `image` fall back to a dark textured
 * placeholder — never a grey skeleton box — and nothing about the layout
 * needs to change once real images land in /public/work. The sixth cell
 * (cta) is the grid's own "there's more to talk about" — same size,
 * position and number treatment as a project cell, but flat black and
 * typographic (no image scrim) and linking straight to #contact, so it
 * reads as the natural sixth item rather than a bolted-on banner.
 */
export function WorkGrid({ projects, featuredLabel, statusOngoing, cta }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <button
          key={project.number}
          type="button"
          className="group relative flex aspect-[3/2] w-full flex-col justify-end overflow-hidden bg-ink p-sm text-left transition-editorial xl:aspect-auto xl:h-[200px]"
        >
          <div className="absolute inset-0">
            {project.image ? (
              <Image src={project.image} alt="" fill sizes="(min-width: 1280px) 34vw, 100vw" className="object-cover" />
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
                    ·
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

      <Link
        href="#contact"
        className="group relative flex aspect-[3/2] w-full flex-col justify-end bg-ink p-sm text-left transition-editorial xl:aspect-auto xl:h-[200px]"
      >
        <span className="font-display text-label font-semibold uppercase tabular-nums leading-none text-kite">
          {cta.number}
        </span>

        <span className="mt-2xs block font-display text-display-md font-black uppercase leading-[0.95] text-paper transition-editorial group-hover:translate-x-1">
          {cta.headline}
        </span>

        <span className="mt-2xs flex items-center gap-2xs font-body text-label font-semibold uppercase tracking-wide text-kite">
          {cta.label}
          <span aria-hidden className="transition-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </span>
      </Link>
    </div>
  );
}
