import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import type { KeyTopic } from "@/lib/key-topics";
import {
  ACADEMIC_SESSION,
  getKeyTopicSubjectHref,
  getKeyTopicsForClass,
  getToolForSubject,
} from "@/lib/key-topics";

type KeyTopicDetailProps = {
  topic: KeyTopic;
};

export function KeyTopicDetail({ topic }: KeyTopicDetailProps) {
  const tool = getToolForSubject(topic.subjectSlug);
  const subjectHref = getKeyTopicSubjectHref(topic);
  const otherTopics = getKeyTopicsForClass(topic.classSlug).filter(
    (t) => t.slug !== topic.slug
  );

  return (
    <PageLayout
      badge={`Class ${topic.classNumber} · ${topic.subjectName}`}
      title={topic.title}
      description={topic.description}
      showAds={false}
      backHref={`/classes/${topic.classSlug}`}
      backLabel={`Class ${topic.classNumber} Hub`}
    >
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-sky-300">
          {topic.subjectName}
        </span>
        <span className="rounded-full border border-orange-500/20 bg-orange-500/5 px-3 py-1 text-xs text-orange-300">
          Session {ACADEMIC_SESSION}
        </span>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          href={subjectHref}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
        >
          Go to {topic.subjectName} Syllabus
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={tool.href}
          className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-orange-400/50 hover:text-orange-400"
        >
          Open {tool.label}
        </Link>
      </div>

      <section className="glass-card mb-6 rounded-2xl p-6 sm:p-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">What You&apos;ll Learn</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {topic.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="text-orange-400">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <Link
        href={`/classes/${topic.classSlug}/${topic.subjectSlug}`}
        className="group glass-card flex items-center justify-between rounded-2xl p-6 transition-all hover:shadow-md"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/10">
            <BookOpen className="h-6 w-6 text-sky-400" />
          </span>
          <div>
            <h2 className="font-semibold text-slate-900">
              Class {topic.classNumber} {topic.subjectName}
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
            {otherTopics.map((t) => (
              <Link
                key={t.slug}
                href={`/classes/${t.classSlug}/topics/${t.slug}`}
                className="glass-card rounded-xl px-4 py-3 transition-all hover:shadow-md"
              >
                <span className="text-xs text-orange-400">{t.subjectName}</span>
                <h3 className="mt-1 text-sm font-medium text-slate-900">{t.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  );
}
