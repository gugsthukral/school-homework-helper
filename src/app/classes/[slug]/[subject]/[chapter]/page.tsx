import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterDetail } from "@/components/classes/chapter-detail";
import {
  buildChapterContent,
  getChapter,
} from "@/lib/chapters";
import { ACADEMIC_SESSION } from "@/lib/syllabus-2026-27";
import { buildPageMetadata } from "@/lib/seo-metadata";

type Props = {
  params: Promise<{ slug: string; subject: string; chapter: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subject, chapter } = await params;
  const entry = getChapter(slug, subject, chapter);
  if (!entry) return { title: "Chapter Not Found" };

  return buildPageMetadata({
    title: `Class ${entry.classNumber} ${entry.subjectName}: ${entry.chapterTitle} (${ACADEMIC_SESSION})`,
    description: `Directory and general study guidance for Class ${entry.classNumber} ${entry.subjectName} Chapter ${entry.chapterNumber} — ${entry.chapterTitle}, session ${ACADEMIC_SESSION}.`,
    keywords: [
      `class ${entry.classNumber} ${entry.chapterTitle}`,
      `${entry.subjectName} chapter ${entry.chapterNumber}`,
      `class ${entry.classNumber} ${entry.subjectName} ${ACADEMIC_SESSION}`,
      "chapter study guidance",
    ],
    path: `/classes/${slug}/${subject}/${chapter}`,
    noIndex: true,
  });
}

export default async function ChapterPage({ params }: Props) {
  const { slug, subject, chapter } = await params;
  const entry = getChapter(slug, subject, chapter);
  if (!entry) notFound();

  const content = buildChapterContent(entry);

  return <ChapterDetail chapter={entry} content={content} />;
}
