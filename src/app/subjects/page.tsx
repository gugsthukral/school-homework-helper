import type { Metadata } from "next";
import Link from "next/link";
import {
  Atom,
  Globe2,
  Languages,
  Sigma,
  Type,
  type LucideIcon,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { subjectList } from "@/lib/subject-content";
import { PAGE_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

const iconMap: Record<string, LucideIcon> = {
  Sigma,
  Atom,
  Languages,
  Type,
  Globe2,
};

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.subjects);

export default function SubjectsPage() {
  return (
    <PageLayout
      badge="Subjects"
      title="All Subjects Covered"
      description="Mathematics, Science, English, Hindi, Punjabi, and Social Studies — AI-powered help for every subject."
      backHref="/"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjectList.map((subject) => {
          const Icon = iconMap[subject.icon] ?? Languages;
          return (
            <Link
              key={subject.slug}
              href={`/subjects/${subject.slug}`}
              className={`group flex flex-col rounded-2xl border bg-navy-900/40 p-6 transition-all hover:-translate-y-1 hover:bg-navy-800/50 hover:shadow-lg ${subject.color}`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-orange-500/10">
                <Icon className="h-7 w-7 text-sky-400 transition-colors group-hover:text-orange-400" />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-white">{subject.name}</h2>
              <p className="mt-2 flex-1 text-sm text-sky-200/60">{subject.description}</p>
              <span className="mt-4 text-sm font-medium text-orange-400">Explore →</span>
            </Link>
          );
        })}
      </div>
    </PageLayout>
  );
}
