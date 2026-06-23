import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ChapterEntry } from "@/lib/chapters";
import { getChapterPath } from "@/lib/chapters";
import { cn } from "@/lib/utils";

type ChapterLinkListProps = {
  chapters: ChapterEntry[];
  classNumber: number;
  subjectName: string;
  variant?: "cards" | "compact";
  className?: string;
};

export function ChapterLinkList({
  chapters,
  classNumber,
  subjectName,
  variant = "cards",
  className,
}: ChapterLinkListProps) {
  if (chapters.length === 0) return null;

  if (variant === "compact") {
    return (
      <ul className={cn("grid gap-1 sm:grid-cols-2", className)}>
        {chapters.map((chapter) => (
          <li key={`${chapter.chapterSlug}-${chapter.chapterNumber}`}>
            <Link
              href={getChapterPath(chapter)}
              className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm text-sky-200/70 transition-colors hover:bg-sky-400/5 hover:text-orange-400"
            >
              <span className="mt-0.5 shrink-0 text-xs font-medium text-orange-400/80">
                {chapter.chapterNumber}.
              </span>
              {chapter.chapterTitle}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {chapters.map((chapter) => (
        <Link
          key={`${chapter.chapterSlug}-${chapter.chapterNumber}`}
          href={getChapterPath(chapter)}
          className="group glass-card flex items-center gap-4 rounded-xl px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-sky-400/30"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-400/10 text-sm font-bold text-sky-400">
            {chapter.chapterNumber}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-medium text-white transition-colors group-hover:text-sky-300">
              {chapter.chapterTitle}
            </h2>
            <p className="mt-0.5 text-xs text-sky-300/50">
              Chapter {chapter.chapterNumber} · Class {classNumber} {subjectName}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-sky-400/30 transition-colors group-hover:text-orange-400" />
        </Link>
      ))}
    </div>
  );
}
