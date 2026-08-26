import Image from "next/image";

interface HeroArtworkProps {
  agencyLine: string;
  locationLine: string;
  coordinates: string[];
  stampLines: string[];
}

/**
 * The Galata Tower editorial plate. The source asset already carries its
 * own yellow sun and screenprinted light-ray, so only the devices the
 * asset doesn't provide are added here: the technical label, a small
 * hand-drawn kite + string (scaled to this box only, not the full Hero —
 * unlike the shared WindPath component, which is tuned for a much wider
 * canvas), and the "move brands forward" stamp.
 */
export function HeroArtwork({ agencyLine, locationLine, coordinates, stampLines }: HeroArtworkProps) {
  return (
    <div className="hero-artwork-reveal relative aspect-[6/5] w-full overflow-hidden xl:aspect-auto xl:h-full xl:min-h-[420px]">
      <Image
        src="/brand/galata.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1280px) 46vw, 92vw"
        className="object-cover object-[66%_40%]"
      />

      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
      >
        <path
          d="M 14 58 C 34 44, 52 30, 78 14"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth={0.35}
          vectorEffect="non-scaling-stroke"
        />
        <g transform="translate(78 14) rotate(20)">
          <rect x={-4} y={-4} width={8} height={8} fill="none" stroke="var(--color-ink)" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
          <line x1={-4} y1={0} x2={4} y2={0} stroke="var(--color-ink)" strokeWidth={0.35} vectorEffect="non-scaling-stroke" />
          <line x1={0} y1={-4} x2={0} y2={4} stroke="var(--color-ink)" strokeWidth={0.35} vectorEffect="non-scaling-stroke" />
        </g>
      </svg>

      <div
        aria-hidden
        className="absolute left-[5%] top-[5%] max-w-[46%] border border-ink bg-paper/90 px-2xs py-3xs font-body text-eyebrow font-semibold uppercase leading-snug tracking-wide text-ink sm:max-w-[42%]"
      >
        <p>{agencyLine}</p>
        <p>{locationLine}</p>
        {coordinates.map((c) => (
          <p key={c}>{c}</p>
        ))}
      </div>

      <div
        aria-hidden
        className="absolute bottom-[5%] right-[5%] flex h-16 w-16 shrink-0 items-center justify-center border border-dashed border-kite-dark text-center font-body text-[9px] font-bold uppercase leading-tight tracking-wide text-kite-dark sm:h-20 sm:w-20"
        style={{ borderRadius: "9999px" }}
      >
        <span>
          {stampLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
