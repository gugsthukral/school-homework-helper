import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/page-layout";
import { SubjectIcon } from "@/components/shared/subject-icon";
import { ToolCardGrid, TopicPills } from "@/components/shared/resource-cards";
import { ChapterLinkList } from "@/components/classes/chapter-link-list";
import { classList } from "@/lib/class-content";
import { getChaptersForSubjectPage } from "@/lib/chapters";
import { getSubjectBySlug, getToolsForSubject, subjectList } from "@/lib/subject-content";
import { buildPageMetadata } from "@/lib/seo-metadata";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ class?: string }>;
};

export async function generateStaticParams() {
  return subjectList.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);
  if (!subject) return { title: "Subject Not Found" };

  return buildPageMetadata({
    title: `${subject.name} Homework Help & Study Resources`,
    description: subject.description,
    keywords: [
      `${subject.name} homework help`,
      `${subject.name} questions`,
      `CBSE ${subject.name.toLowerCase()}`,
      "class 1 to 12",
      `${subject.name} study guide`,
      "2026-27 syllabus",
      ...(slug === "computer"
        ? ["computer class 10", "ICT syllabus CBSE", "MS Office homework", "Python class 9"]
        : []),
    ],
    path: `/subjects/${slug}`,
  });
}

export default async function SubjectDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { class: classParam } = await searchParams;
  const subject = getSubjectBySlug(slug);
  if (!subject) notFound();

  const tools = getToolsForSubject(subject);
  const selectedClass = classParam ? Number(classParam) : null;
  const classChapters =
    selectedClass && selectedClass >= 1 && selectedClass <= 12
      ? getChaptersForSubjectPage(selectedClass, subject.slug)
      : [];

  return (
    <PageLayout
      badge="Subject"
      title={`${subject.name} Homework Help`}
      description={subject.description}
      backHref="/subjects"
      backLabel="All Subjects"
    >
      {selectedClass && (
        <div className="mb-8 rounded-2xl border border-sky-400/20 bg-sky-400/5 px-5 py-3 text-sm text-sky-200">
          Viewing resources for <strong className="text-white">Class {selectedClass}</strong>{" "}
          — <Link href={`/classes/class-${selectedClass}`} className="text-orange-400 hover:underline">view all Class {selectedClass} subjects</Link>
        </div>
      )}

      <div className="mb-10 flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/20 to-orange-500/10 ring-1 ring-sky-400/20">
          <SubjectIcon icon={subject.icon} className="h-8 w-8 text-sky-400" />
        </span>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-white">Topics Covered</h2>
        <TopicPills topics={subject.topics} />
      </section>

      <section className="mb-12">
        <h2 className="mb-2 text-xl font-semibold text-white">Browse by Class</h2>
        <p className="mb-6 text-sm text-sky-200/60">
          Select your class for {subject.name}-specific homework help.
        </p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
          {classList.map((cls) => (
            <Link
              key={cls.slug}
              href={`/subjects/${subject.slug}?class=${cls.number}`}
              className={`flex h-12 items-center justify-center rounded-xl border text-sm font-medium transition-all hover:-translate-y-0.5 ${
                selectedClass === cls.number
                  ? "border-orange-400/50 bg-orange-500/10 text-orange-400"
                  : "border-sky-400/15 text-sky-300/70 hover:border-sky-400/40 hover:text-white"
              }`}
            >
              {cls.number}
            </Link>
          ))}
        </div>
      </section>

      {classChapters.length > 0 && selectedClass && (
        <section className="mb-12">
          <h2 className="mb-2 text-xl font-semibold text-white">
            Class {selectedClass} {subject.name} Chapters
          </h2>
          <p className="mb-6 text-sm text-sky-200/60">
            Open any chapter for notes, study tips, and homework help.
          </p>
          <ChapterLinkList
            chapters={classChapters}
            classNumber={selectedClass}
            subjectName={subject.name}
          />
        </section>
      )}

      <section>
        <h2 className="mb-2 text-xl font-semibold text-white">AI Tools for {subject.name}</h2>
        <p className="mb-6 text-sm text-sky-200/60">
          Use these tools to get instant help with {subject.name} homework.
        </p>
        <ToolCardGrid tools={tools} />
      </section>
    </PageLayout>
  );
}
