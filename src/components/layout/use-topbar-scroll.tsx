"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type TopBarScrollContextValue = {
  hidden: boolean;
};

const TopBarScrollContext = createContext<TopBarScrollContextValue>({ hidden: false });

export function TopBarScrollProvider({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;

      if (currentY <= 8) {
        setHidden(false);
      } else if (currentY > lastScrollY.current + 6) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 6) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <TopBarScrollContext.Provider value={{ hidden }}>{children}</TopBarScrollContext.Provider>
  );
}

export function useTopBarScroll() {
  return useContext(TopBarScrollContext);
}
