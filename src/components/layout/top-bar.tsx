"use client";

import { socialLinks, TOPBAR_HEIGHT } from "@/lib/site-config";
import { SocialIcon } from "@/components/layout/social-icons";
import { TopBarAuth } from "@/components/layout/top-bar-auth";
import { useTopBarScroll } from "@/components/layout/use-topbar-scroll";
import { cn } from "@/lib/utils";

export function TopBar() {
  const { hidden } = useTopBarScroll();

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-[60] border-b border-sky-400/10 bg-navy-900 transition-transform duration-300 ease-in-out",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
      style={{ height: TOPBAR_HEIGHT }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.icon}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full text-sky-300/70 transition-colors hover:bg-sky-400/10 hover:text-orange-400"
              aria-label={social.label}
              title={social.label}
            >
              <SocialIcon icon={social.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>

        <TopBarAuth />
      </div>
    </div>
  );
}
