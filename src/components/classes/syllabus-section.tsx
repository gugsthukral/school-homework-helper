import Link from "next/link";
import { Calendar, BookMarked, ChevronRight } from "lucide-react";
import { ChapterLinkList } from "@/components/classes/chapter-link-list";
import type { SyllabusSubject } from "@/lib/syllabus-2026-27";
import { ACADEMIC_SESSION, SYLLABUS_BOARD } from "@/lib/syllabus-2026-27";
import { getChaptersForSubject, getSubjectSlug } from "@/lib/chapters";

type SyllabusSectionProps = {
  classSlug: string;
  classNumber: number;
  subjects: SyllabusSubject[];
};

export function SyllabusSection({ classSlug, classNumber, subjects }: SyllabusSectionProps) {
  if (subjects.length === 0) return null;

  const totalChapters = subjects.reduce((sum, s) => sum + s.chapters.length, 0);

  return (
    <section className="mb-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Syllabus — Session {ACADEMIC_SESSION}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {SYLLABUS_BOARD} · {subjects.length} subjects · {totalChapters} chapters
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-sky-400/5 px-4 py-1.5 text-xs font-medium text-sky-300">
          <Calendar className="h-3.5 w-3.5" />
          Academic Year {ACADEMIC_SESSION}
        </span>
      </div>

      <div className="space-y-5">
        {subjects.map((subject) => {
          const subjectSlug = getSubjectSlug(subject.name);
          const chapters = getChaptersForSubject(classSlug, subjectSlug);
          return (
            <div key={subject.name} className="glass-card overflow-hidden rounded-2xl">
              <Link
                href={`/classes/${classSlug}/${subjectSlug}`}
                className="flex items-center gap-3 border-b border-slate-200 bg-sky-400/5 px-5 py-3 transition-colors hover:bg-sky-400/10"
              >
                <BookMarked className="h-4 w-4 text-orange-400" />
                <h3 className="font-semibold text-slate-900">{subject.name}</h3>
                <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
                  {subject.chapters.length} chapters
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </Link>
              <div className="px-5 py-4">
                <ChapterLinkList
                  chapters={chapters}
                  classNumber={classNumber}
                  subjectName={subject.name}
                  variant="compact"
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Syllabus based on NCERT/CBSE curriculum for session {ACADEMIC_SESSION}. Need help with any
        chapter?{" "}
        <Link href="/tools/homework-solver" className="text-orange-400 hover:underline">
          Try Homework Solver
        </Link>
      </p>
    </section>
  );
}
