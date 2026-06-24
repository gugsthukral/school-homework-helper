import Script from "next/script";
import { adsenseConfig } from "@/lib/adsense-config";

/**
 * Must run before Google tags (AdSense) so Consent Mode v2 defaults apply.
 */
export function ConsentModeDefaults() {
  if (!adsenseConfig.enabled) return null;

  return (
    <Script id="google-consent-mode-defaults" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted',
          wait_for_update: 500
        });
      `}
    </Script>
  );
}
