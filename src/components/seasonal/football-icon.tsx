import Image from "next/image";

import { cn } from "@/lib/utils";

type FootballIconProps = {
  className?: string;
};

export function FootballIcon({ className }: FootballIconProps) {
  return (
    <Image
      src="/images/football.png"
      alt=""
      width={50}
      height={50}
      unoptimized
      aria-hidden
      className={cn("fifa-football-image drop-shadow-md", className)}
    />
  );
}
