import { cn } from "@/lib/utils";

type HeroBannerImageProps = {
  src: string;
  srcSet: string;
  alt: string;
  className?: string;
  /** Only the default (light) theme should preload — avoid competing LCP bandwidth. */
  priority?: boolean;
};

/**
 * Native responsive <img> for the homepage LCP element.
 * Pre-built WebP widths avoid shipping the original ~1MB PNGs to mobile.
 */
export function HeroBannerImage({
  src,
  srcSet,
  alt,
  className,
  priority = false,
}: HeroBannerImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentional LCP-optimized static WebP srcset
    <img
      src={src}
      srcSet={srcSet}
      sizes="100vw"
      alt={alt}
      width={1920}
      height={600}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}
