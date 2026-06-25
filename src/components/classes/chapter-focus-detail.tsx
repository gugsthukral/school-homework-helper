import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import type { ChapterEntry } from "@/lib/chapters";
import {
  buildChapterFocusContent,
  getChapterFocusPath,
  getOtherFocusTopics,
  type ChapterFocusTopic,
} from "@/lib/chapter-focus";
import { getChapterPath, getSubjectPath } from "@/lib/chapters";
import { ACADEMIC_SESSION } from "@/lib/syllabus-2026-27";

type ChapterFocusDetailProps = {
  chapter: ChapterEntry;
  focus: ChapterFocusTopic;
};

export function ChapterFocusDetail({ chapter, focus }: ChapterFocusDetailProps) {
  const content = buildChapterFocusContent(chapter, focus);
  const otherTopics = getOtherFocusTopics(chapter, focus.slug);

  return (
    <PageLayout
      badge={`Class ${chapter.classNumber} · ${chapter.subjectName}`}
      title={focus.title}
      description={content.intro}
      backHref={getChapterPath(chapter)}
      backLabel={`Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-sky-300">
          Chapter {chapter.chapterNumber}
        </span>
        <span className="rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-xs text-orange-300">
          Session {ACADEMIC_SESSION}
        </span>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          href={getChapterPath(chapter)}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
        >
          Back to Chapter
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={content.toolHref}
          className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-orange-400/50 hover:text-orange-400"
        >
          Open {content.toolLabel}
        </Link>
      </div>

      <section className="glass-card mb-6 rounded-2xl p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{content.intro}</p>
      </section>

      <div className="space-y-6">
        {content.sections.map((section) => (
          <section key={section.heading} className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">{section.heading}</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 sm:text-base">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      <section className="glass-card mt-6 rounded-2xl p-6 sm:p-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Key Highlights</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {content.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="text-orange-400">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <Link
        href={getSubjectPath(chapter.classSlug, chapter.subjectSlug)}
        className="group mt-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-sky-400/5 p-6 transition-all hover:shadow-md"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/10">
            <BookOpen className="h-6 w-6 text-sky-400" />
          </span>
          <div>
            <h2 className="font-semibold text-slate-900">
              Class {chapter.classNumber} {chapter.subjectName}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              View all chapters for session {ACADEMIC_SESSION}
            </p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-sky-400/40 transition-colors group-hover:text-orange-400" />
      </Link>

      {otherTopics.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Other Key Topics</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={getChapterFocusPath(chapter, topic.slug)}
                className="glass-card rounded-xl px-4 py-3 transition-all hover:shadow-md"
              >
                <span className="text-xs text-orange-400">Chapter {chapter.chapterNumber}</span>
                <h3 className="mt-1 text-sm font-medium text-slate-900">{topic.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  );
}
