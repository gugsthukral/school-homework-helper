import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CookieConsentRoot } from "@/components/cookie-consent/cookie-consent-root";
import { BackToTop } from "@/components/layout/back-to-top";
import { SiteHeader } from "@/components/layout/site-header";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://schoolhomeworkhelper.com"
  ),
  title: {
    default: "School Homework Helper | AI Education for Classes 1–12",
    template: "%s | School Homework Helper",
  },
  description:
    "Free AI-powered homework help, essay generator, math solver, quizzes, and more for students from Class 1 to Class 12.",
  keywords: [
    "homework helper",
    "AI education",
    "class 1-12",
    "math solver",
    "essay generator",
    "school homework",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "School Homework Helper",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "vtaBwWyRbATOVYiugu6crxh5OUjB2-GI05Dge3tB45k",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <CookieConsentRoot>
          <SiteHeader />
          {children}
          <BackToTop />
        </CookieConsentRoot>
      </body>
    </html>
  );
}
