import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  href?: string;
  className?: string;
  size?: number;
  alt?: string;
}

/**
 * Renders the official KITE mark from /public/brand as-is. Never redraw
 * or reconstruct the logo in code — this component only handles sizing
 * and optional link-wrapping.
 */
export function Logo({ href, className, size = 44, alt = "KITE Growth Agency" }: LogoProps) {
  const image = (
    <Image
      src="/brand/kite-logo.png"
      alt={alt}
      width={size}
      height={size}
      priority
      className={cn("h-auto shrink-0", className)}
      style={{ width: size, height: size }}
    />
  );

  if (href) {
    return (
      <Link href={href} aria-label={alt} className="inline-flex shrink-0">
        {image}
      </Link>
    );
  }

  return image;
}
