import Image from "next/image";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "default" | "header" | "footer";
};

const logoConfig = {
  header: {
    src: "/logo.png",
    width: 180,
    height: 92,
    sizes: "(max-width: 640px) 140px, (max-width: 768px) 160px, 180px",
    className:
      "h-auto w-[140px] max-w-[min(100%,140px)] object-contain object-left sm:w-[160px] sm:max-w-[min(100%,160px)] md:w-[180px] md:max-w-[min(100%,180px)]",
  },
  footer: {
    src: "/footer-logo.png",
    width: 196,
    height: 100,
    sizes: "(max-width: 640px) 160px, 196px",
    className:
      "h-auto w-[160px] max-w-[min(100%,160px)] object-contain object-left sm:w-[180px] sm:max-w-[min(100%,180px)] md:w-[196px] md:max-w-[min(100%,196px)]",
  },
  default: {
    src: "/logo.png",
    width: 180,
    height: 92,
    sizes: "(max-width: 640px) 140px, (max-width: 768px) 160px, 180px",
    className:
      "h-auto w-[140px] max-w-[min(100%,140px)] object-contain object-left sm:w-[160px] sm:max-w-[min(100%,160px)] md:w-[180px] md:max-w-[min(100%,180px)]",
  },
} as const;

export function SiteLogo({ className, priority = false, variant = "default" }: SiteLogoProps) {
  const config = logoConfig[variant];

  return (
    <Image
      src={config.src}
      alt="School Homework Helper"
      width={config.width}
      height={config.height}
      priority={priority}
      sizes={config.sizes}
      className={cn(config.className, className)}
    />
  );
}
