import type { ReactNode } from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { SiteLogo } from "@/components/layout/site-logo";
import { GooglePrivacyFooterLink } from "@/components/cookie-consent/google-privacy-footer-link";
import { SiteContainer } from "@/components/shared/site-container";
import { REGIONAL_LANGUAGES_TAGLINE } from "@/lib/indian-languages";

const footerLinks = {
  tools: [
    { label: "Ask Anything", href: "/tools/ask-anything" },
    { label: "Homework Solver", href: "/tools/homework-solver" },
    { label: "Essay Generator", href: "/tools/essay-generator" },
    { label: "Calculator", href: "/tools/calculator" },
    { label: "Math Solver", href: "/tools/math-solver" },
    { label: "Quiz Generator", href: "/tools/quiz-generator" },
    { label: "School Projects", href: "/tools/science-projects" },
    { label: "Grammar Checker", href: "/tools/grammar-checker" },
  ],
  resources: [
    { label: "All Classes", href: "/classes" },
    { label: "All Subjects", href: "/subjects" },
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/about" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "Contact", href: "/contact" },
  ],
};

function FooterColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="theme-footer-heading text-xs font-bold uppercase tracking-wider">{children}</h4>
  );
}

function FooterLinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="theme-footer-link text-sm transition-colors hover:text-orange-500"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="theme-footer w-full border-t">
      <SiteContainer className="py-10 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <SiteLogo variant="footer" />
            </Link>
            <p className="theme-footer-body mt-4 text-sm leading-relaxed">
              AI-powered education platform for students from Class 1 to Class 12.
              Homework help, essays, math, quizzes, and more. {REGIONAL_LANGUAGES_TAGLINE}.
            </p>
            <div className="mt-4 space-y-2">
              <p className="theme-footer-body flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-orange-500" />
                hello@schoolhomeworkhelper.com
              </p>
              <p className="theme-footer-body flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 shrink-0 text-orange-500" />
                India
              </p>
            </div>
          </div>

          <div>
            <FooterColumnHeading>AI Tools</FooterColumnHeading>
            <FooterLinkList links={footerLinks.tools} />
          </div>

          <div>
            <FooterColumnHeading>Resources</FooterColumnHeading>
            <FooterLinkList links={footerLinks.resources} />
          </div>

          <div>
            <FooterColumnHeading>Classes</FooterColumnHeading>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }, (_, i) => (
                <Link
                  key={i + 1}
                  href={`/classes/class-${i + 1}`}
                  className="theme-class-chip flex h-9 items-center justify-center rounded-lg border text-sm font-semibold transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                  aria-label={`Class ${i + 1}`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="theme-footer-divider mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="theme-footer-muted text-sm">
            &copy; {new Date().getFullYear()} School Homework Helper. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy" className="theme-footer-muted text-sm transition-colors hover:text-orange-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="theme-footer-muted text-sm transition-colors hover:text-orange-500">
              Terms of Service
            </Link>
            <Link href="/cookies" className="theme-footer-muted text-sm transition-colors hover:text-orange-500">
              Cookie Policy
            </Link>
            <Link href="/editorial-policy" className="theme-footer-muted text-sm transition-colors hover:text-orange-500">
              Editorial Policy
            </Link>
            <GooglePrivacyFooterLink />
          </div>
        </div>
      </SiteContainer>
    </footer>
  );
}
