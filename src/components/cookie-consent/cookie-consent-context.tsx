"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  hasMarketingConsent,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";

type CookieConsentContextValue = {
  choice: CookieConsentChoice | null;
  hasChosen: boolean;
  marketingAllowed: boolean;
  bannerOpen: boolean;
  acceptCookies: () => void;
  rejectCookies: () => void;
  openBanner: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<CookieConsentChoice | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readCookieConsent();
    setChoice(stored);
    setBannerOpen(stored === null);
    setReady(true);
  }, []);

  const persistChoice = useCallback((next: CookieConsentChoice) => {
    writeCookieConsent(next);
    setChoice(next);
    setBannerOpen(false);
  }, []);

  const acceptCookies = useCallback(() => persistChoice("accepted"), [persistChoice]);
  const rejectCookies = useCallback(() => persistChoice("rejected"), [persistChoice]);
  const openBanner = useCallback(() => setBannerOpen(true), []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      choice: ready ? choice : null,
      hasChosen: ready && choice !== null,
      marketingAllowed: hasMarketingConsent(choice),
      bannerOpen: ready && bannerOpen,
      acceptCookies,
      rejectCookies,
      openBanner,
    }),
    [ready, choice, bannerOpen, acceptCookies, rejectCookies, openBanner]
  );

  return (
    <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }

  return context;
}
