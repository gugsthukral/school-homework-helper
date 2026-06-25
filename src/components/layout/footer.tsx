import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { GooglePrivacyFooterLink } from "@/components/cookie-consent/google-privacy-footer-link";
import { SiteLogo } from "@/components/layout/site-logo";
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
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-sky-400/10 bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <SiteLogo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-sky-200/50">
              AI-powered education platform for students from Class 1 to Class 12.
              Homework help, essays, math, quizzes, and more. {REGIONAL_LANGUAGES_TAGLINE}.
            </p>
            <div className="mt-5 space-y-2">
              <p className="flex items-center gap-2 text-sm text-sky-300/50">
                <Mail className="h-4 w-4 text-sky-400" />
                hello@schoolhomeworkhelper.com
              </p>
              <p className="flex items-center gap-2 text-sm text-sky-300/50">
                <MapPin className="h-4 w-4 text-sky-400" />
                India
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              AI Tools
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sky-200/50 transition-colors hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sky-200/50 transition-colors hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Classes
            </h4>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }, (_, i) => (
                <Link
                  key={i + 1}
                  href={`/classes/class-${i + 1}`}
                  className="flex h-9 items-center justify-center rounded-lg border border-sky-400/10 text-xs font-medium text-sky-300/60 transition-colors hover:border-orange-400/30 hover:text-orange-400"
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sky-400/10 pt-8 sm:flex-row">
          <p className="text-sm text-sky-300/40">
            &copy; {new Date().getFullYear()} School Homework Helper. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/privacy" className="text-sm text-sky-300/40 hover:text-sky-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-sky-300/40 hover:text-sky-300">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-sky-300/40 hover:text-sky-300">
              Cookie Policy
            </Link>
            <GooglePrivacyFooterLink />
          </div>
        </div>
      </div>
    </footer>
  );
}
