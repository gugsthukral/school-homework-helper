import dynamic from "next/dynamic";
import { HeroBannerImage } from "@/components/home/hero-banner-image";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const FifaFootballAnimation = dynamic(
  () =>
    import("@/components/seasonal/fifa-football-animation").then(
      (mod) => mod.FifaFootballAnimation
    ),
  { ssr: false }
);

const HERO_BANNER = {
  light: {
    src: "/images/hero-banner-light.webp",
    srcSet:
      "/images/hero-banner-light-640.webp 640w, /images/hero-banner-light-960.webp 960w, /images/hero-banner-light.webp 1920w",
    alt: "Your Smart School Homework Helper — eight AI tools for Classes 1 to 12",
  },
  dark: {
    src: "/images/hero-banner-dark.webp",
    srcSet:
      "/images/hero-banner-dark-640.webp 640w, /images/hero-banner-dark-960.webp 960w, /images/hero-banner-dark.webp 1920w",
    alt: "Your Smart School Homework Helper — eight AI tools for Classes 1 to 12 (dark theme)",
  },
} as const;

export function Hero() {
  return (
    <>
      {/* Early LCP discovery for the default (light) theme — mobile-first srcset */}
      <link
        rel="preload"
        as="image"
        href="/images/hero-banner-light-640.webp"
        imageSrcSet={HERO_BANNER.light.srcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />
      <section
        className={cn(
          "relative w-full overflow-hidden",
          SITE_HEADER_OFFSET_CLASS
        )}
      >
        <div className="hero-banner relative aspect-[1920/600] w-full bg-[var(--theme-bg)]">
          <div className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden lg:block">
            <FifaFootballAnimation mode="hero" />
          </div>
          <HeroBannerImage
            src={HERO_BANNER.light.src}
            srcSet={HERO_BANNER.light.srcSet}
            alt={HERO_BANNER.light.alt}
            className="hero-banner-image hero-banner-image-light object-cover object-center"
            priority
          />
          <HeroBannerImage
            src={HERO_BANNER.dark.src}
            srcSet={HERO_BANNER.dark.srcSet}
            alt={HERO_BANNER.dark.alt}
            className="hero-banner-image hero-banner-image-dark object-cover object-center"
          />
        </div>
      </section>
    </>
  );
}
