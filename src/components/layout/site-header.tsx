"use client";

import { TopBarScrollProvider } from "@/components/layout/use-topbar-scroll";
import { Navbar } from "@/components/layout/navbar";
import { TopBar } from "@/components/layout/top-bar";
import { useTheme } from "@/components/theme/theme-provider";
import { usePathname } from "next/navigation";

const HIDDEN_HEADER_PATHS = ["/signin"];

export function SiteHeader() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const headerVariant = theme === "dark" ? "dark" : "light";

  if (HIDDEN_HEADER_PATHS.includes(pathname)) {
    return null;
  }

  return (
    <TopBarScrollProvider>
      <TopBar variant={headerVariant} />
      <Navbar variant={headerVariant} />
    </TopBarScrollProvider>
  );
}
