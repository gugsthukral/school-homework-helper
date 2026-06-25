import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { LegalSection } from "@/components/legal/legal-section";
import { PAGE_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.privacy);

const LAST_UPDATED = "June 20, 2026";

export default function PrivacyPolicyPage() {
  return (
    <PageLayout
      badge="Legal"
      title="Privacy Policy"
      description="We respect your privacy. This policy explains what information we collect and how we use it."
      backHref="/"
    >
      <article className="glass-card w-full max-w-[1280px] rounded-2xl p-6 sm:p-8">
        <p className="text-sm text-slate-400">Last updated: {LAST_UPDATED}</p>

        <LegalSection title="1. Introduction">
          <p>
            School Homework Helper (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates an
            AI-powered education website for students from Class 1 to Class 12. This Privacy Policy
            describes how we handle information when you visit our website, use our AI tools, or sign
            in to your account.
          </p>
          <p>
            By using School Homework Helper, you agree to the practices described in this policy. If
            you do not agree, please do not use our services.
          </p>
        </LegalSection>

        <LegalSection title="2. Information We Collect">
          <p>We may collect the following types of information:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-slate-800">Account information:</strong> If you sign in with
              Google, we receive your name, email address, profile picture, and a unique user ID from
              our authentication provider.
            </li>
            <li>
              <strong className="text-slate-800">AI tool inputs and outputs:</strong> When you use our
              AI tools (such as the homework solver, essay generator, or math solver), we process the
              text, questions, or prompts you submit, along with the AI-generated responses.
            </li>
            <li>
              <strong className="text-slate-800">Usage data:</strong> We track how many free AI tries
              guest users have used via a cookie, and we may log which tools are used and when.
            </li>
            <li>
              <strong className="text-slate-800">Contact information:</strong> If you contact us, we
              receive the name, email, subject, and message you provide.
            </li>
            <li>
              <strong className="text-slate-800">Technical data:</strong> Like most websites, our
              hosting and analytics providers may automatically collect information such as your IP
              address, browser type, device type, and pages visited.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Provide, operate, and improve our AI education tools</li>
            <li>Authenticate users and manage free usage limits for guests</li>
            <li>Generate AI responses tailored to your class level and requests</li>
            <li>Monitor service performance, prevent abuse, and maintain security</li>
            <li>Respond to support requests and feedback</li>
            <li>Display relevant advertisements where enabled</li>
          </ul>
        </LegalSection>

        <LegalSection title="4. AI Processing">
          <p>
            Our AI tools send your prompts and related context to third-party AI providers (such as
            OpenAI) to generate responses. We do not use your submissions to train our own models.
            Third-party AI providers process data according to their own privacy policies and terms.
          </p>
          <p>
            AI-generated content is provided for educational assistance only. Please review important
            schoolwork yourself and do not share sensitive personal information in AI prompts.
          </p>
        </LegalSection>

        <LegalSection title="5. Cookies">
          <p>We use cookies and similar technologies for essential site functionality, including:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-slate-800">Guest usage cookie:</strong> Tracks how many free AI
              tool uses remain before sign-in is required.
            </li>
            <li>
              <strong className="text-slate-800">Authentication cookies:</strong> Keep you signed in
              when you use Google sign-in.
            </li>
            <li>
              <strong className="text-slate-800">Advertising cookies:</strong> If ads are enabled, our
              advertising partners (such as Google AdSense) may use cookies to serve and measure ads.
            </li>
          </ul>
          <p>
            You can control cookies through your browser settings or our{" "}
            <Link href="/cookies" className="text-orange-400 hover:underline">
              Cookie Policy
            </Link>
            . Disabling cookies may limit some features, such as staying signed in or tracking
            free guest usage.
          </p>
        </LegalSection>

        <LegalSection title="6. Third-Party Services">
          <p>We rely on trusted third-party services to operate our platform, including:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-slate-800">Supabase</strong> — authentication and database hosting
            </li>
            <li>
              <strong className="text-slate-800">Google</strong> — sign-in (OAuth) and optional
              advertising
            </li>
            <li>
              <strong className="text-slate-800">OpenAI</strong> — AI text generation for our tools
            </li>
          </ul>
          <p>
            These providers process data on our behalf and under their own privacy policies. We
            encourage you to review their policies for more detail.
          </p>
        </LegalSection>

        <LegalSection title="7. Data Retention">
          <p>
            We retain account information for as long as your account is active. AI request logs may
            be stored to improve reliability, monitor usage, and prevent misuse. We delete or
            anonymize data when it is no longer needed for these purposes, unless we are required to
            keep it by law.
          </p>
        </LegalSection>

        <LegalSection title="8. Children's Privacy">
          <p>
            School Homework Helper is designed for school students, including children under 13. We
            do not knowingly collect more personal information than is necessary to provide our
            services. Parents and guardians should supervise younger students&apos; use of AI tools
            and online accounts.
          </p>
          <p>
            If you believe we have collected personal information from a child without appropriate
            consent, please contact us and we will take steps to delete it.
          </p>
        </LegalSection>

        <LegalSection title="9. Data Security">
          <p>
            We use reasonable technical and organizational measures to protect your information,
            including encrypted connections (HTTPS) and secure authentication. However, no method of
            transmission or storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </LegalSection>

        <LegalSection title="10. Your Rights">
          <p>
            Depending on your location, you may have the right to access, correct, or delete your
            personal information, or to withdraw consent where applicable. To make a request, contact
            us at{" "}
            <a
              href="mailto:hello@schoolhomeworkhelper.com"
              className="text-orange-400 hover:underline"
            >
              hello@schoolhomeworkhelper.com
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the
            &quot;Last updated&quot; date at the top of this page. Continued use of the site after
            changes means you accept the updated policy.
          </p>
        </LegalSection>

        <LegalSection title="12. Contact Us">
          <p>
            If you have questions about this Privacy Policy or how we handle your data, please
            contact us:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Email:{" "}
              <a
                href="mailto:hello@schoolhomeworkhelper.com"
                className="text-orange-400 hover:underline"
              >
                hello@schoolhomeworkhelper.com
              </a>
            </li>
            <li>
              Contact page:{" "}
              <Link href="/contact" className="text-orange-400 hover:underline">
                schoolhomeworkhelper.com/contact
              </Link>
            </li>
          </ul>
        </LegalSection>
      </article>
    </PageLayout>
  );
}
