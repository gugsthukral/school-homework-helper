import Script from "next/script";
import { analyticsConfig } from "@/lib/analytics-config";

/**
 * GA4 gtag.js in <head> — required for Search Console Google Analytics verification.
 * Consent Mode defaults (loaded first) gate analytics_storage until the user consents.
 */
export function GoogleAnalytics() {
  if (!analyticsConfig.enabled) return null;

  const { measurementId } = analyticsConfig;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="beforeInteractive"
      />
      <Script id="google-analytics-config" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
