import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ChapterLinkList } from "@/components/classes/chapter-link-list";
import { PageLayout } from "@/components/layout/page-layout";
import type { ChapterEntry } from "@/lib/chapters";
import { getSubjectPath, getSubjectsForClassSlug } from "@/lib/chapters";
import { ACADEMIC_SESSION } from "@/lib/syllabus-2026-27";

type SubjectChaptersPageProps = {
  classSlug: string;
  classNumber: number;
  subjectName: string;
  subjectSlug: string;
  chapters: ChapterEntry[];
};

const tools: Record<string, { href: string; label: string }> = {
  mathematics: { href: "/tools/math-solver", label: "Math Solver" },
  english: { href: "/tools/essay-generator", label: "Essay Generator" },
  hindi: { href: "/tools/homework-solver", label: "Homework Solver" },
  science: { href: "/tools/homework-solver", label: "Homework Solver" },
  evs: { href: "/tools/science-projects", label: "School Projects" },
  "social-science": { href: "/tools/quiz-generator", label: "Quiz Generator" },
  physics: { href: "/tools/math-solver", label: "Math Solver" },
  chemistry: { href: "/tools/homework-solver", label: "Homework Solver" },
  biology: { href: "/tools/science-projects", label: "School Projects" },
  computer: { href: "/tools/ask-anything", label: "Ask Anything" },
};

export function SubjectChaptersPage({
  classSlug,
  classNumber,
  subjectName,
  subjectSlug,
  chapters,
}: SubjectChaptersPageProps) {
  const tool = tools[subjectSlug] ?? {
    href: "/tools/homework-solver",
    label: "Homework Solver",
  };

  const otherSubjects = getSubjectsForClassSlug(classSlug)
    .filter((s) => s.slug !== subjectSlug)
    .slice(0, 4);

  return (
    <PageLayout
      badge={`Class ${classNumber}`}
      title={`Class ${classNumber} ${subjectName}`}
      description={`Complete ${subjectName} syllabus with chapter-wise notes, study material, and homework help for CBSE session ${ACADEMIC_SESSION}.`}
      backHref={`/classes/${classSlug}`}
      backLabel={`Class ${classNumber} Hub`}
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-sky-200/60">
          {chapters.length} chapters · NCERT aligned · Session {ACADEMIC_SESSION}
        </p>
        <Link
          href={tool.href}
          className="rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
        >
          Open {tool.label}
        </Link>
      </div>

      <ChapterLinkList
        chapters={chapters}
        classNumber={classNumber}
        subjectName={subjectName}
      />

      {otherSubjects.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-white">Other Subjects</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherSubjects.map((s) => (
              <Link
                key={s.slug}
                href={getSubjectPath(classSlug, s.slug)}
                className="glass-card flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:border-sky-400/30"
              >
                <BookOpen className="h-4 w-4 text-sky-400" />
                <span className="text-sm text-sky-200/70">
                  Class {classNumber} {s.name}
                  <span className="ml-1 text-sky-400/40">({s.chapterCount} ch.)</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
