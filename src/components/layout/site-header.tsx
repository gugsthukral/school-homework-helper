"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { TopBar } from "@/components/layout/top-bar";
import { TopBarScrollProvider } from "@/components/layout/use-topbar-scroll";

const HIDDEN_HEADER_PATHS = ["/signin"];

export function SiteHeader() {
  const pathname = usePathname();

  if (HIDDEN_HEADER_PATHS.includes(pathname)) {
    return null;
  }

  return (
    <TopBarScrollProvider>
      <TopBar />
      <Navbar />
    </TopBarScrollProvider>
  );
}
