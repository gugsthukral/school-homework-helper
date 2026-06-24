"use client";

import { useEffect } from "react";
import {
  tcfDataAllowsMarketing,
  updateGoogleConsent,
} from "@/lib/google-consent-mode";

type GoogleCmpBridgeProps = {
  onGdprApplies: (applies: boolean) => void;
  onMarketingConsent: (allowed: boolean) => void;
};

function readTcfMarketingConsent(callback: (allowed: boolean, gdprApplies: boolean) => void) {
  if (typeof window === "undefined" || !window.__tcfapi) {
    callback(false, false);
    return;
  }

  window.__tcfapi("getTCData", 2, (tcData, success) => {
    if (!success || !tcData) {
      callback(false, false);
      return;
    }

    const gdprApplies = Boolean(tcData.gdprApplies);
    callback(gdprApplies ? tcfDataAllowsMarketing(tcData) : false, gdprApplies);
  });
}

export function GoogleCmpBridge({ onGdprApplies, onMarketingConsent }: GoogleCmpBridgeProps) {
  useEffect(() => {
    let disposed = false;

    const applyTcfState = (allowed: boolean, gdprApplies: boolean) => {
      if (disposed) return;
      onGdprApplies(gdprApplies);
      if (gdprApplies) {
        onMarketingConsent(allowed);
        updateGoogleConsent(allowed);
      }
    };

    const setupTcfListener = () => {
      if (!window.__tcfapi) {
        applyTcfState(false, false);
        return;
      }

      readTcfMarketingConsent(applyTcfState);

      window.__tcfapi("addEventListener", 2, (tcData, success) => {
        if (!success || !tcData) return;

        const gdprApplies = Boolean(tcData.gdprApplies);
        onGdprApplies(gdprApplies);

        if (!gdprApplies) return;

        if (
          tcData.eventStatus === "tcloaded" ||
          tcData.eventStatus === "useractioncomplete"
        ) {
          const allowed = tcfDataAllowsMarketing(tcData);
          onMarketingConsent(allowed);
          updateGoogleConsent(allowed);
        }
      });
    };

    const waitForGoogleCmp = () => {
      if (window.googlefc?.callbackQueue) {
        window.googlefc.callbackQueue.push({
          CONSENT_API_READY: setupTcfListener,
        });
        return;
      }

      // AdSense privacy messaging not ready yet — fall back to custom banner.
      const timer = window.setTimeout(() => {
        if (!window.__tcfapi) {
          applyTcfState(false, false);
        } else {
          setupTcfListener();
        }
      }, 1200);

      return () => window.clearTimeout(timer);
    };

    const cleanupTimer = waitForGoogleCmp();

    return () => {
      disposed = true;
      cleanupTimer?.();
    };
  }, [onGdprApplies, onMarketingConsent]);

  return null;
}
