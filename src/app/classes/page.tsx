import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { classList } from "@/lib/class-content";
import { REGIONAL_LANGUAGES_SEO_PHRASE } from "@/lib/indian-languages";
import { ACADEMIC_SESSION } from "@/lib/syllabus-2026-27";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: `All Classes — Syllabus ${ACADEMIC_SESSION}`,
  description: `Homework help and CBSE ${ACADEMIC_SESSION} syllabus for Class 1 to Class 12. Chapter-wise notes, key topics, and AI study tools. ${REGIONAL_LANGUAGES_SEO_PHRASE}`,
  keywords: [
    "class 1 to 12 syllabus",
    `CBSE ${ACADEMIC_SESSION}`,
    "homework help by class",
    "NCERT chapters",
  ],
  path: "/classes",
});

export default function ClassesPage() {
  return (
    <PageLayout
      badge="Classes"
      title="Homework Help for Every Class"
      description={`Class 1–12 resource directories and AI study tools for academic session ${ACADEMIC_SESSION}. Verify syllabus details with your school or education board.`}
      showRegionalLanguages
      showAds={false}
      backHref="/"
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {classList.map((cls) => (
          <Link
            key={cls.slug}
            href={`/classes/${cls.slug}`}
            className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-orange-300 hover:bg-slate-100 hover:shadow-lg hover:shadow-orange-500/10"
          >
            <span className="text-3xl font-bold text-slate-900 transition-colors group-hover:text-orange-400">
              {cls.number}
            </span>
            <span className="mt-1 text-xs font-medium text-slate-400">Class</span>
            <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-sky-400 to-orange-400 transition-transform group-hover:scale-x-100" />
          </Link>
        ))}
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classList.slice(0, 6).map((cls) => (
          <Link
            key={cls.slug}
            href={`/classes/${cls.slug}`}
            className="glass-card rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-900">{cls.label}</h2>
            <p className="mt-2 text-sm text-slate-500 line-clamp-2">{cls.description}</p>
            <span className="mt-4 inline-block text-sm font-medium text-orange-400">
              View resources →
            </span>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
