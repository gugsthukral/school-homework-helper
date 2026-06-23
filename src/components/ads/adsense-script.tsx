import Script from "next/script";
import { adsenseConfig } from "@/lib/adsense-config";

export function AdSenseScript() {
  if (!adsenseConfig.enabled) return null;

  return (
    <Script
      id="adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
