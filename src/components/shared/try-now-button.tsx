import Link from "next/link";
import { cn } from "@/lib/utils";

type TryNowButtonProps = {
  href: string;
  className?: string;
};

export function TryNowButton({ href, className }: TryNowButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] hover:shadow-orange-500/35",
        className
      )}
    >
      Try now
    </Link>
  );
}
