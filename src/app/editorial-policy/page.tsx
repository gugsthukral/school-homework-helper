import type { Metadata } from "next";
import Link from "next/link";

import { PageLayout } from "@/components/layout/page-layout";
import { LegalSection } from "@/components/legal/legal-section";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Editorial Policy",
  description:
    "How School Homework Helper creates, reviews, and updates educational content and AI tool guidance.",
  path: "/editorial-policy",
  keywords: ["editorial policy", "content quality", "AI transparency", "education website policy"],
});

const LAST_UPDATED = "July 8, 2026";

export default function EditorialPolicyPage() {
  return (
    <PageLayout
      badge="Trust"
      title="Editorial Policy"
      description="Our commitment to clear, accurate, and student-first educational content."
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
            AI-generated content may be incomplete or incorrect. Students should verify important
            answers with textbooks, teachers, and official curriculum guidance. We encourage users
            to request step-by-step reasoning and to write final work in their own words.
          </p>
        </LegalSection>

        <LegalSection title="4. Quality standards">
          <p>We aim to keep content:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Clear and age-appropriate for the requested class level</li>
            <li>Structured (headings, steps, examples, and summaries)</li>
            <li>Safe and responsible for students</li>
            <li>Up to date where curriculum changes apply</li>
          </ul>
        </LegalSection>

        <LegalSection title="5. Corrections and updates">
          <p>
            If you find an error, please report it via our{" "}
            <Link href="/contact" className="text-orange-400 hover:underline">
              contact page
            </Link>
            . We review reports and update content when needed. Significant policy updates will be
            reflected in the “Last updated” date above.
          </p>
        </LegalSection>

        <LegalSection title="6. Advertising and independence">
          <p>
            Ads (if enabled) help support the website. Advertising partners do not influence our
            educational content or the guidance we provide to students.
          </p>
        </LegalSection>
      </article>
    </PageLayout>
  );
}

