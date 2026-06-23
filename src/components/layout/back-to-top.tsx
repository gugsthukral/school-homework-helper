"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const HIDDEN_PATHS = ["/signin"];
const SHOW_AFTER_PX = 320;

export function BackToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDDEN_PATHS.includes(pathname)) {
    return null;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={cn(
        "fixed bottom-24 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full",
        "bg-gradient-to-br from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-500/30",
        "transition-all duration-300 hover:scale-110 hover:shadow-orange-500/50",
        "focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:ring-offset-2 focus:ring-offset-navy-950",
        "sm:bottom-8 sm:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
