import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagsHead } from "@/components/analytics/google-tags-head";
import { CookieConsentRoot } from "@/components/cookie-consent/cookie-consent-root";
import { BackToTop } from "@/components/layout/back-to-top";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { buildRootMetadata } from "@/lib/seo-metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06101f",
};

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleTagsHead />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SiteJsonLd />
        <CookieConsentRoot>
          <SiteHeader />
          {children}
          <BackToTop />
        </CookieConsentRoot>
        <SpeedInsights sampleRate={0.25} />
      </body>
    </html>
  );
}
