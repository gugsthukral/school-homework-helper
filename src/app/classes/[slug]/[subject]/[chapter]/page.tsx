import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterDetail } from "@/components/classes/chapter-detail";
import {
  buildChapterContent,
  chapterRegistry,
  getChapter,
} from "@/lib/chapters";
import { ACADEMIC_SESSION } from "@/lib/syllabus-2026-27";

type Props = {
  params: Promise<{ slug: string; subject: string; chapter: string }>;
};

export async function generateStaticParams() {
  return chapterRegistry.map((c) => ({
    slug: c.classSlug,
    subject: c.subjectSlug,
    chapter: c.chapterSlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subject, chapter } = await params;
  const entry = getChapter(slug, subject, chapter);
  if (!entry) return { title: "Chapter Not Found" };

  return {
    title: `Class ${entry.classNumber} ${entry.subjectName}: ${entry.chapterTitle} (${ACADEMIC_SESSION})`,
    description: `Study Class ${entry.classNumber} ${entry.subjectName} Chapter ${entry.chapterNumber} — ${entry.chapterTitle}. CBSE NCERT syllabus ${ACADEMIC_SESSION} with notes, tips, and AI homework help.`,
    keywords: [
      `class ${entry.classNumber} ${entry.chapterTitle}`,
      `${entry.subjectName} chapter ${entry.chapterNumber}`,
      `class ${entry.classNumber} ${entry.subjectName} ${ACADEMIC_SESSION}`,
    ],
  };
}

export default async function ChapterPage({ params }: Props) {
  const { slug, subject, chapter } = await params;
  const entry = getChapter(slug, subject, chapter);
  if (!entry) notFound();

  const content = buildChapterContent(entry);

  return <ChapterDetail chapter={entry} content={content} />;
}
