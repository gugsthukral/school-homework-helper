"use client";

import { socialLinks, SITE_CONTAINER_CLASS, TOPBAR_HEIGHT } from "@/lib/site-config";
import { SocialIcon } from "@/components/layout/social-icons";
import { TopBarAuth } from "@/components/layout/top-bar-auth";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useTopBarScroll } from "@/components/layout/use-topbar-scroll";
import { cn } from "@/lib/utils";

type TopBarProps = {
  variant?: "dark" | "light";
};

export function TopBar({ variant = "dark" }: TopBarProps) {
  const { hidden } = useTopBarScroll();
  const isLight = variant === "light";

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-[60] border-b transition-transform duration-300 ease-in-out",
        isLight
          ? "border-slate-200/80 bg-white/95 backdrop-blur-md"
          : "border-[#101a2d] bg-[#050a14]/95 backdrop-blur-md",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
      style={{ height: TOPBAR_HEIGHT }}
    >
      <div className={cn(SITE_CONTAINER_CLASS, "flex h-full items-center justify-between")}>
        <div className="flex items-center gap-2 sm:gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.icon}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                isLight
                  ? "text-slate-500 hover:bg-slate-100 hover:text-orange-500"
                  : "text-[#5c93e1] hover:bg-sky-400/10 hover:text-orange-400"
              )}
              aria-label={social.label}
              title={social.label}
            >
              <SocialIcon icon={social.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle variant="topbar" />
          <TopBarAuth variant={isLight ? "light" : "dark"} />
        </div>
      </div>
    </div>
  );
}
