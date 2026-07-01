import Image from "next/image";

import { cn } from "@/lib/utils";

type FootballIconProps = {
  size?: number;
  className?: string;
};

export function FootballIcon({ size = 50, className }: FootballIconProps) {
  return (
    <Image
      src="/images/football.png"
      alt=""
      width={size}
      height={size}
      unoptimized
      aria-hidden
      className={cn("drop-shadow-md", className)}
    />
  );
}
