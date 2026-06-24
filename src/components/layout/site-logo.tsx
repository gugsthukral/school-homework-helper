import Image from "next/image";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "default" | "header";
};

export function SiteLogo({ className, priority = false, variant = "default" }: SiteLogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="School Homework Helper"
      width={196}
      height={100}
      priority={priority}
      sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 196px"
      className={cn(
        variant === "header"
          ? "h-10 w-auto max-w-[min(100%,10rem)] object-contain object-left sm:h-12 sm:max-w-[min(100%,12rem)] md:h-16 md:max-w-[min(100%,14rem)]"
          : "h-11 w-auto max-w-[min(100%,11rem)] object-contain object-left sm:h-14 sm:max-w-[min(100%,14rem)] md:h-[100px] md:max-w-[196px]",
        className
      )}
    />
  );
}
