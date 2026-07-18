import type { Metadata } from "next";
import Link from "next/link";

import { PageLayout } from "@/components/layout/page-layout";
import { LegalSection } from "@/components/legal/legal-section";
import { editorialIdentity } from "@/lib/editorial";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Editorial Policy",
  description:
    "How School Homework Helper creates, reviews, and updates educational content and AI tool guidance.",
  path: "/editorial-policy",
  keywords: ["editorial policy", "content quality", "AI transparency", "education website policy"],
});

const LAST_UPDATED = "July 19, 2026";

export default function EditorialPolicyPage() {
  return (
    <PageLayout
      badge="Trust"
      title="Editorial Policy"
      description="Our commitment to clear, accurate, and student-first educational content."
      showAds={false}
      backHref="/"
    >
      <article className="glass-card w-full max-w-[1280px] rounded-2xl p-6 sm:p-8">
        <p className="text-sm text-slate-400">Last updated: {LAST_UPDATED}</p>

        <LegalSection title="1. Our mission">
          <p>
            School Homework Helper is built to help students understand concepts—not to encourage
            cheating. Our goal is to publish useful, structured, and easy-to-follow educational
            content for Classes 1–12.
          </p>
        </LegalSection>

        <LegalSection title="2. What we publish">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-slate-800">AI tool guidance</strong> (how to use our tools,
              example prompts, and FAQs)
            </li>
            <li>
              <strong className="text-slate-800">Learning resources</strong> (class, subject, and
              chapter pages)
            </li>
            <li>
              <strong className="text-slate-800">Blog articles</strong> (study tips and exam
              preparation guidance)
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. AI transparency and limitations">
          <p>
            Our interactive tools generate answers with artificial intelligence. Some static
            resources may also be drafted or structured with AI assistance. AI output can be
            incomplete, outdated, or incorrect, so students should verify important answers with
            their prescribed textbook, teacher, and official curriculum guidance.
          </p>
          <p>
            A page is not described as reviewed merely because it was generated successfully.
            Unreviewed and template-based pages are excluded from search indexing while they await
            substantive editorial work.
          </p>
        </LegalSection>

        <LegalSection title="4. Review statuses">
          <ul className="list-disc space-y-2 pl-5">
            <li><strong className="text-slate-800">Draft:</strong> not approved for search indexing or advertising.</li>
            <li><strong className="text-slate-800">Editorial review pending:</strong> selected for improvement, but not represented as expert-reviewed.</li>
            <li><strong className="text-slate-800">Reviewed for publication:</strong> checked for scope, clarity, internal consistency, source support, and accurate claims.</li>
          </ul>
        </LegalSection>

        <LegalSection title="5. Review process and source hierarchy">
          <p>Before material is approved for publication, the review process should:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Confirm that the title and description match what the page actually provides</li>
            <li>Check worked steps, counts, formulas, dates, and internal consistency</li>
            <li>Use age-appropriate language and include safety cautions where relevant</li>
            <li>Distinguish general study guidance from official curriculum requirements</li>
            <li>Record genuine publication and update dates rather than generated dates</li>
          </ul>
          <p>
            Sources are prioritized in this order: official education-board or government
            publications, prescribed textbooks and school notices, established educational
            references, and clearly labelled general guidance. Where no source is listed, readers
            should not assume that a page has been verified against the latest board syllabus.
          </p>
        </LegalSection>

        <LegalSection title="6. Editorial responsibility">
          <p>
            The publisher is {editorialIdentity.publisher}.
            {editorialIdentity.ownerName
              ? ` Editorial responsibility is held by ${editorialIdentity.ownerName}${editorialIdentity.ownerCredentials ? ` (${editorialIdentity.ownerCredentials})` : ""}.`
              : " A named editor profile will be published only after the owner supplies accurate public details; we do not invent credentials."}
          </p>
        </LegalSection>

        <LegalSection title="7. Corrections and updates">
          <p>
            If you find an error, please report it via our{" "}
            <Link href="/contact" className="text-orange-400 hover:underline">
              contact page
            </Link>
            . Reports are assessed against the source hierarchy above. When a material correction
            is made, the page&apos;s genuine update date should be changed. Significant policy
            updates are reflected in the “Last updated” date above.
          </p>
        </LegalSection>

        <LegalSection title="8. Advertising and independence">
          <p>
            Ads (if enabled) help support the website. Advertising partners do not influence our
            educational content or the guidance we provide to students.
          </p>
          <p>
            Because the service is intended for a broad school audience that can include children,
            the site owner must review age handling, consent, and child-directed advertising
            requirements before enabling or changing advertising. This editorial policy is not a
            substitute for legal or platform-policy advice.
          </p>
        </LegalSection>
      </article>
    </PageLayout>
  );
}

