import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { ChapterLinkList } from "@/components/classes/chapter-link-list";
import { PageLayout } from "@/components/layout/page-layout";
import { ToolCardGrid } from "@/components/shared/resource-cards";
import { SeoJsonLd } from "@/components/seo/json-ld";
import { aiTools } from "@/lib/data";
import { getChaptersForSubjectPage } from "@/lib/chapters";
import type { SeoPage } from "@/lib/seo-pages";
import { getRelatedSeoPages, getSubjectDbSlug } from "@/lib/seo-pages";

type SeoPageTemplateProps = {
  page: SeoPage;
};

export function SeoPageTemplate({ page }: SeoPageTemplateProps) {
  const related = getRelatedSeoPages(page);
  const primaryTool = aiTools.find((t) => t.href === page.toolHref);
  const recommendedTools = primaryTool
    ? [primaryTool, ...aiTools.filter((t) => t.href !== page.toolHref).slice(0, 2)]
    : aiTools.slice(0, 3);
  const subjectSlug = page.subject ? getSubjectDbSlug(page.subject) : null;
  const subjectNames: Record<NonNullable<SeoPage["subject"]>, string> = {
    maths: "Mathematics",
    science: "Science",
    english: "English",
    hindi: "Hindi",
    punjabi: "Punjabi",
    sst: "Social Studies",
    computer: "Computer",
  };
  const subjectName = page.subject ? subjectNames[page.subject] : "";
  const chapters =
    page.subject && subjectSlug
      ? getChaptersForSubjectPage(page.classNumber, subjectSlug)
      : [];

  return (
    <>
      <SeoJsonLd page={page} />
      <PageLayout
        badge={`Class ${page.classNumber}`}
        title={page.h1}
        description={page.intro}
        showAds={false}
        backHref={`/classes/class-${page.classNumber}`}
        backLabel={`Class ${page.classNumber} Resources`}
      >
        <div className="mb-10">
          <Link
            href={page.toolHref}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
          >
            Try {page.toolLabel} Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {chapters.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              Class {page.classNumber} {subjectName} Chapters
            </h2>
            <p className="mb-6 text-sm text-slate-500">
              Browse chapter-wise study material and homework help.
            </p>
            <ChapterLinkList
              chapters={chapters}
              classNumber={page.classNumber}
              subjectName={subjectName}
            />
          </section>
        )}

        <div className="space-y-8">
          {page.sections.map((section) => (
            <section key={section.heading} className="glass-card rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">{section.heading}</h2>
              <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-600 sm:text-base">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">Recommended AI Tools</h2>
          <ToolCardGrid tools={recommendedTools} />
        </section>

        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {page.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group glass-card rounded-xl p-5 open:border-sky-400/30"
              >
                <summary className="cursor-pointer list-none font-medium text-slate-900 marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-sky-400 transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 flex flex-wrap gap-3">
          <Link
            href={`/classes/class-${page.classNumber}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500 transition-colors hover:border-orange-300 hover:text-orange-400"
          >
            <GraduationCap className="h-4 w-4" />
            Class {page.classNumber} Hub
          </Link>
          {page.subject && (
            <Link
              href={`/subjects/${getSubjectDbSlug(page.subject)}?class=${page.classNumber}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500 transition-colors hover:border-orange-300 hover:text-orange-400"
            >
              <BookOpen className="h-4 w-4" />
              Subject Resources
            </Link>
          )}
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-semibold text-slate-900">Related Pages</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}`}
                  className="glass-card rounded-xl px-5 py-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-sm font-medium text-slate-900">{rel.h1}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-400">{rel.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </PageLayout>
    </>
  );
}
