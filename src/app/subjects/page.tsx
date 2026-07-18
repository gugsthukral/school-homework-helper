import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { SubjectIcon } from "@/components/shared/subject-icon";
import { subjectList } from "@/lib/subject-content";
import { PAGE_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.subjects);

export default function SubjectsPage() {
  return (
    <PageLayout
      badge="Subjects"
      title="All Subjects Covered"
      description={PAGE_SEO.subjects.description}
      showRegionalLanguages
      showAds={false}
      backHref="/"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subjectList.map((subject) => (
          <Link
            key={subject.slug}
            href={`/subjects/${subject.slug}`}
            className={`group flex flex-col rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1 hover:bg-slate-50 hover:shadow-lg ${subject.color}`}
          >
            <SubjectIcon icon={subject.icon} size={52} />
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{subject.name}</h2>
            <p className="mt-2 flex-1 text-sm text-slate-500">{subject.description}</p>
            <span className="mt-4 text-sm font-medium text-orange-400">Explore →</span>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
