import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { LegalSection } from "@/components/legal/legal-section";
import { CookiePreferenceActions } from "@/components/cookie-consent/cookie-preference-actions";
import { PAGE_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.cookies);

const LAST_UPDATED = "June 20, 2026";

const cookieTable = [
  {
    name: "cookie_consent",
    purpose: "Stores your cookie consent choice (accept or reject).",
    type: "Essential",
    duration: "1 year",
  },
  {
    name: "ai_guest_usage",
    purpose: "Tracks how many free AI tool uses remain for guests before sign-in.",
    type: "Essential",
    duration: "1 year",
  },
  {
    name: "Supabase auth cookies",
    purpose: "Keeps you signed in when you use Google sign-in.",
    type: "Essential",
    duration: "Session / up to 1 year",
  },
  {
    name: "Google AdSense cookies",
    purpose: "Serve and measure advertisements when you accept optional cookies.",
    type: "Optional",
    duration: "Varies by Google",
  },
];

export default function CookiePolicyPage() {
  return (
    <PageLayout
      badge="Legal"
      title="Cookie Policy"
      description="This page explains what cookies we use, why we use them, and how you can control your preferences."
      backHref="/"
    >
      <article className="glass-card w-full max-w-[1280px] rounded-2xl p-6 sm:p-8">
        <p className="text-sm text-sky-300/50">Last updated: {LAST_UPDATED}</p>

        <LegalSection title="1. What Are Cookies?">
          <p>
            Cookies are small text files stored on your device when you visit a website. They help
            websites remember your preferences, keep you signed in, and understand how the site is
            used.
          </p>
        </LegalSection>

        <LegalSection title="2. How We Use Cookies">
          <p>
            School Homework Helper uses cookies to provide core features (such as guest AI usage
            limits and sign-in) and, with your permission, to show advertisements through partners
            like Google AdSense.
          </p>
          <p>
            When you first visit our site, a cookie banner appears at the bottom of the screen. You
            can <strong className="text-sky-100">Accept</strong> all cookies or{" "}
            <strong className="text-sky-100">Reject</strong> non-essential cookies. You can change
            your choice at any time using the buttons below.
          </p>
          <CookiePreferenceActions className="pt-2" />
        </LegalSection>

        <LegalSection title="3. Types of Cookies We Use">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-sky-400/20 text-sky-200">
                  <th className="py-3 pr-4 font-semibold">Cookie / technology</th>
                  <th className="py-3 pr-4 font-semibold">Purpose</th>
                  <th className="py-3 pr-4 font-semibold">Type</th>
                  <th className="py-3 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody>
                {cookieTable.map((row) => (
                  <tr key={row.name} className="border-b border-sky-400/10 align-top">
                    <td className="py-3 pr-4 font-medium text-white">{row.name}</td>
                    <td className="py-3 pr-4 text-sky-200/70">{row.purpose}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={
                          row.type === "Essential"
                            ? "rounded-full bg-sky-400/10 px-2.5 py-1 text-xs font-medium text-sky-300"
                            : "rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-300"
                        }
                      >
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3 text-sky-200/70">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LegalSection>

        <LegalSection title="4. Essential vs Optional Cookies">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-sky-100">Essential cookies</strong> are required for the site
              to function. They include consent storage, guest usage tracking, and authentication.
              These still apply if you reject optional cookies.
            </li>
            <li>
              <strong className="text-sky-100">Optional cookies</strong> are used for advertising
              and analytics. They are only enabled if you click Accept in the cookie banner.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="5. Managing Cookies in Your Browser">
          <p>
            You can also block or delete cookies through your browser settings. Note that blocking
            essential cookies may prevent sign-in, free guest AI usage tracking, or other core
            features from working correctly.
          </p>
        </LegalSection>

        <LegalSection title="6. More Information">
          <p>
            For details on how we handle personal data, see our{" "}
            <Link href="/privacy" className="text-orange-400 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-orange-400 hover:underline">
              Terms of Service
            </Link>
            .
          </p>
          <p>
            Questions? Email{" "}
            <a
              href="mailto:hello@schoolhomeworkhelper.com"
              className="text-orange-400 hover:underline"
            >
              hello@schoolhomeworkhelper.com
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className="text-orange-400 hover:underline">
              contact page
            </Link>
            .
          </p>
        </LegalSection>
      </article>
    </PageLayout>
  );
}
