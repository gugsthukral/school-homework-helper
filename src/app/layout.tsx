import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagsHead } from "@/components/analytics/google-tags-head";
import { CookieConsentRoot } from "@/components/cookie-consent/cookie-consent-root";
import { AppShell } from "@/components/layout/app-shell";
import { BackToTop } from "@/components/layout/back-to-top";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { buildRootMetadata } from "@/lib/seo-metadata";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f9fc",
};

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagsHead />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} app-ui font-sans antialiased`}>
        <SiteJsonLd />
        <CookieConsentRoot>
          <ThemeProvider>
            <AppShell>
              <SiteHeader />
              {children}
              <BackToTop />
            </AppShell>
          </ThemeProvider>
        </CookieConsentRoot>
        <SpeedInsights sampleRate={0.25} />
      </body>
    </html>
  );
}
