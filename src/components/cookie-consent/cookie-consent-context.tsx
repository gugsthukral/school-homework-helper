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
import { GoogleCmpBridge } from "@/components/cookie-consent/google-cmp-bridge";
import {
  hasMarketingConsent,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";
import { updateGoogleConsent } from "@/lib/google-consent-mode";

type CookieConsentContextValue = {
  choice: CookieConsentChoice | null;
  hasChosen: boolean;
  marketingAllowed: boolean;
  bannerOpen: boolean;
  googleGdprApplies: boolean | null;
  acceptCookies: () => void;
  rejectCookies: () => void;
  openBanner: () => void;
  openGooglePrivacySettings: () => boolean;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<CookieConsentChoice | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [googleGdprApplies, setGoogleGdprApplies] = useState<boolean | null>(null);
  const [tcfMarketingAllowed, setTcfMarketingAllowed] = useState(false);

  useEffect(() => {
    const stored = readCookieConsent();
    setChoice(stored);
    setBannerOpen(stored === null);
    setReady(true);

    if (stored === "accepted") {
      updateGoogleConsent(true);
    }
  }, []);

  useEffect(() => {
    if (!ready || googleGdprApplies !== false) return;

    setBannerOpen(choice === null);
  }, [ready, googleGdprApplies, choice]);

  const persistChoice = useCallback((next: CookieConsentChoice) => {
    writeCookieConsent(next);
    setChoice(next);
    setBannerOpen(false);
    updateGoogleConsent(next === "accepted");
  }, []);

  const acceptCookies = useCallback(() => persistChoice("accepted"), [persistChoice]);
  const rejectCookies = useCallback(() => persistChoice("rejected"), [persistChoice]);
  const openBanner = useCallback(() => {
    if (googleGdprApplies) return;
    setBannerOpen(true);
  }, [googleGdprApplies]);

  const openGooglePrivacySettings = useCallback(() => {
    if (typeof window === "undefined" || !window.googlefc) return false;
    window.googlefc.callbackQueue = window.googlefc.callbackQueue ?? [];
    window.googlefc.callbackQueue.push(window.googlefc.showRevocationMessage);
    return true;
  }, []);

  const handleGdprApplies = useCallback((applies: boolean) => {
    setGoogleGdprApplies(applies);
    if (applies) {
      setBannerOpen(false);
    }
  }, []);

  const marketingAllowed = googleGdprApplies
    ? tcfMarketingAllowed
    : hasMarketingConsent(choice);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      choice: ready ? choice : null,
      hasChosen: ready && (googleGdprApplies ? tcfMarketingAllowed || choice !== null : choice !== null),
      marketingAllowed: ready ? marketingAllowed : false,
      bannerOpen: ready && bannerOpen && googleGdprApplies === false,
      googleGdprApplies: ready ? googleGdprApplies : null,
      acceptCookies,
      rejectCookies,
      openBanner,
      openGooglePrivacySettings,
    }),
    [
      ready,
      choice,
      googleGdprApplies,
      tcfMarketingAllowed,
      marketingAllowed,
      bannerOpen,
      acceptCookies,
      rejectCookies,
      openBanner,
      openGooglePrivacySettings,
    ]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      <GoogleCmpBridge
        onGdprApplies={handleGdprApplies}
        onMarketingConsent={setTcfMarketingAllowed}
      />
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }

  return context;
}
