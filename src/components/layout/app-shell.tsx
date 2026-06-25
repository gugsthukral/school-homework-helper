"use client";

import { useEffect } from "react";

/** Adds `app-page` on <html> for scroll-padding sync with fixed header. */
export function AppShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("app-page");
    return () => document.documentElement.classList.remove("app-page");
  }, []);

  return <>{children}</>;
}
