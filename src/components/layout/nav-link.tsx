"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
  variant?: "dark" | "light";
};

export function NavLink({ href, label, className, onNavigate, variant = "light" }: NavLinkProps) {
  const pathname = usePathname();
  const isHashLink = href.startsWith("/#");
  const hashId = isHashLink ? href.slice(2) : null;
  const isActive =
    (!isHashLink && pathname === href) ||
    (href === "/classes" && pathname.startsWith("/classes")) ||
    (href === "/blog" && pathname.startsWith("/blog")) ||
    (href === "/subjects" && pathname.startsWith("/subjects"));

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();

    if (!isHashLink || pathname !== "/" || !hashId) return;

    event.preventDefault();
    const target = document.getElementById(hashId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      scroll={!isHashLink || pathname !== "/"}
      className={cn(
        "text-sm font-medium transition-colors hover:text-orange-400",
        variant === "light"
          ? isActive
            ? "text-orange-500"
            : "text-navy-900"
          : isActive
            ? "text-orange-400"
            : "text-sky-300",
        className
      )}
    >
      {label}
    </Link>
  );
}
