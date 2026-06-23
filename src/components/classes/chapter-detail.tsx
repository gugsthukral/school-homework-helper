import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Target } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { getChapterFocusPath } from "@/lib/chapter-focus";
import type { ChapterContent, ChapterEntry } from "@/lib/chapters";
import {
  getAdjacentChapters,
  getChapterPath,
  getSubjectPath,
} from "@/lib/chapters";
import { ACADEMIC_SESSION } from "@/lib/syllabus-2026-27";

type ChapterDetailProps = {
  chapter: ChapterEntry;
  content: ChapterContent;
};

export function ChapterDetail({ chapter, content }: ChapterDetailProps) {
  const { prev, next } = getAdjacentChapters(chapter);

  return (
    <PageLayout
      badge={`Class ${chapter.classNumber} · ${chapter.subjectName}`}
      title={chapter.chapterTitle}
      description={content.overview}
      backHref={getSubjectPath(chapter.classSlug, chapter.subjectSlug)}
      backLabel={`Class ${chapter.classNumber} ${chapter.subjectName}`}
    >
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-sky-300/50">
        <span className="rounded-full border border-sky-400/20 px-3 py-1">
          Chapter {chapter.chapterNumber}
        </span>
        <span className="rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-orange-300/80">
          Session {ACADEMIC_SESSION}
        </span>
      </div>

      <Link
        href={content.toolHref}
        className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
      >
        Get Help with {content.toolLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>

      <div className="space-y-6">
        <section className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-sky-400" />
            <h2 className="text-lg font-semibold text-white">Chapter Overview</h2>
          </div>
          <p className="text-sm leading-relaxed text-sky-200/70 sm:text-base">
            {content.overview}
          </p>
        </section>

        <section className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-400" />
            <h2 className="text-lg font-semibold text-white">Key Topics</h2>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {content.keyTopics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={getChapterFocusPath(chapter, topic.slug)}
                  className="flex items-start gap-2 text-sm text-sky-200/70 transition-colors hover:text-orange-300"
                >
                  <span className="text-orange-400">→</span>
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-card rounded-2xl p-6 sm:p-8">
          <h2 className="mb-4 text-lg font-semibold text-white">Learning Objectives</h2>
          <ol className="space-y-2">
            {content.learningObjectives.map((obj, i) => (
              <li key={obj} className="flex gap-3 text-sm text-sky-200/70">
                <span className="font-medium text-sky-400">{i + 1}.</span>
                {obj}
              </li>
            ))}
          </ol>
        </section>

        <section className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-sky-400" />
            <h2 className="text-lg font-semibold text-white">Study Tips</h2>
          </div>
          <ul className="space-y-2">
            {content.studyTips.map((tip) => (
              <li key={tip} className="text-sm text-sky-200/70">
                • {tip}
              </li>
            ))}
          </ul>
        </section>

        {content.examTips && (
          <section className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6">
            <h2 className="font-semibold text-orange-200">Exam Preparation</h2>
            <p className="mt-2 text-sm text-orange-200/80">{content.examTips}</p>
          </section>
        )}
      </div>

      <nav className="mt-10 flex flex-col gap-3 border-t border-sky-400/10 pt-8 sm:flex-row sm:justify-between">
        {prev ? (
          <Link
            href={getChapterPath(prev)}
            className="glass-card flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-sky-200/70 transition-colors hover:text-orange-400"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span>
              <span className="block text-xs text-sky-400/50">Previous</span>
              {prev.chapterTitle}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link
            href={getChapterPath(next)}
            className="glass-card flex items-center justify-end gap-2 rounded-xl px-4 py-3 text-right text-sm text-sky-200/70 transition-colors hover:text-orange-400 sm:ml-auto"
          >
            <span>
              <span className="block text-xs text-sky-400/50">Next</span>
              {next.chapterTitle}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        )}
      </nav>
    </PageLayout>
  );
}
