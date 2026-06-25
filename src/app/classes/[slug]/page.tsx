import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { KeyTopicsSection } from "@/components/classes/key-topics-section";
import { StreamsSection } from "@/components/classes/streams-section";
import { ToolCardGrid } from "@/components/shared/resource-cards";
import { SyllabusSection } from "@/components/classes/syllabus-section";
import {
  classList,
  getClassBySlug,
  getRecommendedToolsForClass,
} from "@/lib/class-content";
import { getSubjectsForClassSlug } from "@/lib/chapters";
import { getKeyTopicsForClass } from "@/lib/key-topics";
import { seoPages } from "@/lib/seo-pages";
import { getSyllabusForClass } from "@/lib/syllabus-2026-27";
import { ACADEMIC_SESSION } from "@/lib/syllabus-2026-27";
import { buildPageMetadata } from "@/lib/seo-metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return classList.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cls = getClassBySlug(slug);
  if (!cls) return { title: "Class Not Found" };

  return buildPageMetadata({
    title: `${cls.label} Syllabus ${ACADEMIC_SESSION} & Homework Help`,
    description: `${cls.description} Updated CBSE syllabus for academic session ${ACADEMIC_SESSION}. Chapter notes, key topics, and AI tools.`,
    keywords: [
      `${cls.label} homework help`,
      `${cls.label} maths questions`,
      `${cls.label} science homework`,
      `${cls.label} essay topics`,
      `CBSE ${ACADEMIC_SESSION} ${cls.label}`,
    ],
    path: `/classes/${slug}`,
  });
}

export default async function ClassDetailPage({ params }: Props) {
  const { slug } = await params;
  const cls = getClassBySlug(slug);
  if (!cls) notFound();

  const tools = getRecommendedToolsForClass(cls.number);
  const syllabusSubjects = getSubjectsForClassSlug(slug);
  const classSeoPages = seoPages
    .filter((p) => p.classNumber === cls.number)
    .slice(0, 6);
  const syllabus = getSyllabusForClass(cls.number);
  const keyTopics = getKeyTopicsForClass(slug);

  return (
    <PageLayout
      badge={cls.label}
      title={cls.title}
      description={cls.description}
      backHref="/classes"
      backLabel="All Classes"
    >
      {cls.examNote && (
        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/10 px-5 py-4">
          <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
          <p className="text-sm text-orange-200/90">{cls.examNote}</p>
        </div>
      )}

      <KeyTopicsSection topics={keyTopics} />

      {(cls.number === 11 || cls.number === 12) && (
        <StreamsSection classSlug={slug} classNumber={cls.number} />
      )}

      <SyllabusSection classSlug={slug} classNumber={cls.number} subjects={syllabus} />

      <section className="mb-12">
        <h2 className="mb-2 text-xl font-semibold text-slate-900">Subjects for {cls.label}</h2>
        <p className="mb-6 text-sm text-slate-500">
          Browse chapter-wise syllabus for session {ACADEMIC_SESSION}.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {syllabusSubjects.map((subject) => (
            <Link
              key={subject.slug}
              href={`/classes/${slug}/${subject.slug}`}
              className="glass-card rounded-xl px-5 py-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="font-medium text-slate-900">{subject.name}</h3>
              <p className="mt-1 text-xs text-slate-400">
                {subject.chapterCount} chapters · {ACADEMIC_SESSION}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-semibold text-slate-900">Recommended AI Tools</h2>
        <p className="mb-6 text-sm text-slate-500">
          Tools picked for Class {cls.number} students.
        </p>
        <ToolCardGrid tools={tools} />
      </section>

      {classSeoPages.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">Study Guides &amp; Homework Help</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {classSeoPages.map((seo) => (
              <Link
                key={seo.slug}
                href={`/${seo.slug}`}
                className="glass-card rounded-xl px-5 py-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-sm font-medium text-slate-900">{seo.h1}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-400">{seo.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 flex flex-wrap gap-3">
        {classList
          .filter((c) => c.number !== cls.number)
          .slice(0, 4)
          .map((c) => (
            <Link
              key={c.slug}
              href={`/classes/${c.slug}`}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-500 transition-colors hover:border-orange-300 hover:text-orange-400"
            >
              {c.label}
            </Link>
          ))}
      </div>
    </PageLayout>
  );
}
