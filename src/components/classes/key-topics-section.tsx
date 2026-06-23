import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { KeyTopic } from "@/lib/key-topics";
import { getKeyTopicPagePath } from "@/lib/key-topics";

type KeyTopicsSectionProps = {
  topics: KeyTopic[];
};

export function KeyTopicsSection({ topics }: KeyTopicsSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-2 text-xl font-semibold text-white">Key Topics</h2>
      <p className="mb-6 text-sm text-sky-200/60">
        Click any topic to explore subject-wise study material and chapters.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={getKeyTopicPagePath(topic)}
            className="group glass-card flex items-center gap-4 rounded-xl px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-sky-400/30"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400/20 to-orange-500/10 text-xs font-bold text-sky-400">
              {topic.subjectName.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-white transition-colors group-hover:text-sky-300">
                {topic.title}
              </h3>
              <p className="mt-0.5 text-xs text-sky-300/50">{topic.subjectName}</p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-sky-400/30 transition-colors group-hover:text-orange-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ClickableTopicPills({
  topics,
}: {
  topics: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <Link
          key={topic.href}
          href={topic.href}
          className="rounded-full border border-sky-400/20 bg-sky-400/5 px-3 py-1 text-sm text-sky-200/80 transition-all hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300"
        >
          {topic.label}
        </Link>
      ))}
    </div>
  );
}
