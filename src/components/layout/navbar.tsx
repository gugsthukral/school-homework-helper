"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/components/layout/nav-link";
import { SiteLogo } from "@/components/layout/site-logo";
import { SiteSearch } from "@/components/layout/site-search";
import { TopBarAuth } from "@/components/layout/top-bar-auth";
import { useTopBarScroll } from "@/components/layout/use-topbar-scroll";
import { navLinks } from "@/lib/data";
import { SiteContainer } from "@/components/shared/site-container";
import { TOPBAR_HEIGHT } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type NavbarProps = {
  variant?: "dark" | "light";
};

export function Navbar({ variant = "dark" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { hidden: topBarHidden } = useTopBarScroll();
  const isLight = variant === "light";

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 transition-[top,background-color,box-shadow] duration-300 ease-in-out",
        isLight
          ? "border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-200/50 backdrop-blur-md"
          : "border-b border-[#101a2d] bg-[#050a14]/95 backdrop-blur-md"
      )}
      style={{ top: topBarHidden ? 0 : TOPBAR_HEIGHT }}
    >
      <SiteContainer as="nav" className="flex items-center justify-between gap-3 py-2 sm:py-3">
        <Link
          href="/"
          className="group flex shrink-0 items-center transition-opacity hover:opacity-90"
        >
          <SiteLogo priority variant="header" />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} variant={variant} />
          ))}
          <SiteSearch />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <SiteSearch />
          <button
            type="button"
            className={cn("rounded-lg p-2", isLight ? "text-navy-900" : "text-sky-300")}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </SiteContainer>

      <div
        className={cn(
          "border-t md:hidden",
          isLight ? "border-slate-200 bg-white" : "border-[#101a2d] bg-[#050a14]",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              variant={variant}
              onNavigate={() => setOpen(false)}
              className={cn(
                "rounded-lg px-3 py-2.5",
                isLight ? "hover:bg-slate-50 hover:text-orange-500" : "hover:bg-sky-400/10 hover:text-white"
              )}
            />
          ))}
          <div className={cn("mt-3 border-t pt-3", isLight ? "border-slate-200" : "border-[#1e293b]")}>
            <TopBarAuth compact variant={isLight ? "light" : "dark"} />
          </div>
        </div>
      </div>
    </header>
  );
}
