import Image from "next/image";
import { FifaFootballAnimation } from "@/components/seasonal/fifa-football-animation";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const HERO_BANNER = {
  light: {
    src: "/images/hero-banner-light.png",
    alt: "Your Smart School Homework Helper — eight AI tools for Classes 1 to 12",
  },
  dark: {
    src: "/images/hero-banner-dark.png",
    alt: "Your Smart School Homework Helper — eight AI tools for Classes 1 to 12 (dark theme)",
  },
} as const;

export function Hero() {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        SITE_HEADER_OFFSET_CLASS
      )}
    >
      <div className="hero-banner relative aspect-[1920/600] w-full">
        <div className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden lg:block">
          <FifaFootballAnimation mode="hero" />
        </div>
        <Image
          src={HERO_BANNER.light.src}
          alt={HERO_BANNER.light.alt}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-banner-image hero-banner-image-light object-cover object-center"
        />
        <Image
          src={HERO_BANNER.dark.src}
          alt={HERO_BANNER.dark.alt}
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hero-banner-image hero-banner-image-dark object-cover object-center"
        />
      </div>
    </section>
  );
}
