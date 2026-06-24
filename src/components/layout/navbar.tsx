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
import { TOPBAR_HEIGHT } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { hidden: topBarHidden } = useTopBarScroll();

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 border-b border-sky-400/10 bg-navy-950 transition-[top] duration-300 ease-in-out"
      )}
      style={{ top: topBarHidden ? 0 : TOPBAR_HEIGHT }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 sm:py-3 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center transition-opacity hover:opacity-90"
        >
          <SiteLogo priority variant="header" />
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-5 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <SiteSearch />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <SiteSearch />
          <button
            type="button"
            className="rounded-lg p-2 text-sky-200"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "border-t border-sky-400/10 bg-navy-900 md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              onNavigate={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 hover:bg-sky-400/10 hover:text-white"
            />
          ))}
          <div className="mt-3 border-t border-sky-400/10 pt-3 md:hidden">
            <TopBarAuth compact />
          </div>
        </div>
      </div>
    </header>
  );
}
