"use client";

import Link from "next/link";
import { GlowButtonShell } from "@/components/motion-primitives/glow-button-shell";
import { cn } from "@/lib/utils";

type TryNowButtonProps = {
  href: string;
  className?: string;
};

export function TryNowButton({ href, className }: TryNowButtonProps) {
  return (
    <Link href={href} className={cn("inline-flex w-full transition-transform hover:scale-[1.02]", className)}>
      <GlowButtonShell className="w-full">
        <span className="px-4 py-2.5 text-sm font-semibold text-orange-600">Try now</span>
      </GlowButtonShell>
    </Link>
  );
}
