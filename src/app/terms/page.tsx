import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { LegalSection } from "@/components/legal/legal-section";
import { PAGE_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.terms);

const LAST_UPDATED = "June 20, 2026";

export default function TermsOfServicePage() {
  return (
    <PageLayout
      badge="Legal"
      title="Terms of Service"
      description="Please read these terms carefully before using School Homework Helper."
      backHref="/"
    >
      <article className="glass-card w-full max-w-[1280px] rounded-2xl p-6 sm:p-8">
        <p className="text-sm text-sky-300/50">Last updated: {LAST_UPDATED}</p>

        <LegalSection title="1. Acceptance of Terms">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of School
            Homework Helper (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), including our
            website, AI tools, and related services (collectively, the &quot;Service&quot;).
          </p>
          <p>
            By accessing or using the Service, you agree to these Terms and our{" "}
            <Link href="/privacy" className="text-orange-400 hover:underline">
              Privacy Policy
            </Link>
            . If you do not agree, you may not use the Service.
          </p>
        </LegalSection>

        <LegalSection title="2. Description of Service">
          <p>
            School Homework Helper provides AI-powered educational tools for students from Class 1 to
            Class 12, including homework help, essay writing, math solving, quiz generation, grammar
            checking, and school project ideas. The Service also includes class- and subject-based
            learning resources.
          </p>
          <p>
            The Service is intended to support learning — not to replace teachers, textbooks, or
            official school guidance.
          </p>
        </LegalSection>

        <LegalSection title="3. Eligibility and Accounts">
          <p>
            The Service is designed for students, parents, teachers, and other learners. Users under
            18 should use the Service with permission and supervision from a parent, guardian, or
            teacher where appropriate.
          </p>
          <p>
            You may use a limited number of AI tools without signing in. To continue after free guest
            usage limits, you must sign in with a Google account. You are responsible for keeping
            your account secure and for all activity that occurs under your account.
          </p>
        </LegalSection>

        <LegalSection title="4. Acceptable Use">
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Violate any applicable law, school policy, or exam rules</li>
            <li>Submit harmful, abusive, harassing, or illegal content</li>
            <li>Attempt to cheat on exams or misrepresent AI output as entirely your own work when prohibited</li>
            <li>Reverse engineer, scrape, or overload our systems</li>
            <li>Share sensitive personal information (such as passwords, ID numbers, or private addresses) in AI prompts</li>
            <li>Use the Service for commercial purposes without our written permission</li>
          </ul>
          <p>
            We may suspend or terminate access if we believe you have violated these Terms or misused
            the Service.
          </p>
        </LegalSection>

        <LegalSection title="5. AI-Generated Content">
          <p>
            AI responses are generated automatically and may contain errors, outdated information,
            or incomplete explanations. You are responsible for reviewing, verifying, and using AI
            output appropriately for your class level and school requirements.
          </p>
          <p>
            We do not guarantee that AI-generated content is accurate, complete, or suitable for any
            particular assignment, exam, or grade. Always use your own judgment and consult teachers
            or textbooks when needed.
          </p>
        </LegalSection>

        <LegalSection title="6. Intellectual Property">
          <p>
            The School Homework Helper name, logo, website design, and original content are owned by
            us or our licensors and are protected by applicable intellectual property laws.
          </p>
          <p>
            You retain ownership of the content you submit to our AI tools. By using the Service,
            you grant us a limited license to process your submissions solely to provide and improve
            the Service, as described in our Privacy Policy.
          </p>
        </LegalSection>

        <LegalSection title="7. Free Service and Limitations">
          <p>
            We currently offer free access to AI tools, subject to usage limits for guests and
            reasonable fair-use limits for signed-in users. We may change features, limits, pricing,
            or availability at any time.
          </p>
          <p>
            The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do
            not warrant uninterrupted, error-free, or secure operation at all times.
          </p>
        </LegalSection>

        <LegalSection title="8. Third-Party Links and Services">
          <p>
            The Service may link to third-party websites, videos, or services (such as YouTube
            resources in school projects). We are not responsible for the content, policies, or
            practices of third parties. Your use of third-party services is at your own risk.
          </p>
        </LegalSection>

        <LegalSection title="9. Advertising">
          <p>
            We may display advertisements on the Service through partners such as Google AdSense.
            Advertisers may use cookies and similar technologies as described in our Privacy Policy.
          </p>
        </LegalSection>

        <LegalSection title="10. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, School Homework Helper and its operators will not
            be liable for any indirect, incidental, special, consequential, or punitive damages
            arising from your use of the Service, including reliance on AI-generated content, loss of
            data, or academic outcomes.
          </p>
          <p>
            Our total liability for any claim related to the Service will not exceed the amount you
            paid us in the twelve months before the claim, or zero if you used the Service for free.
          </p>
        </LegalSection>

        <LegalSection title="11. Indemnification">
          <p>
            You agree to indemnify and hold harmless School Homework Helper from claims, damages,
            and expenses arising from your misuse of the Service or violation of these Terms.
          </p>
        </LegalSection>

        <LegalSection title="12. Changes to These Terms">
          <p>
            We may update these Terms from time to time. When we do, we will update the &quot;Last
            updated&quot; date above. Your continued use of the Service after changes become
            effective constitutes acceptance of the revised Terms.
          </p>
        </LegalSection>

        <LegalSection title="13. Governing Law">
          <p>
            These Terms are governed by the laws of India, without regard to conflict-of-law
            principles. Any disputes will be subject to the exclusive jurisdiction of the courts
            located in India, unless otherwise required by applicable law.
          </p>
        </LegalSection>

        <LegalSection title="14. Contact Us">
          <p>
            If you have questions about these Terms, please contact us:
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
