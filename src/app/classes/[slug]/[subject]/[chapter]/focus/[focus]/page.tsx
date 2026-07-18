import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterFocusDetail } from "@/components/classes/chapter-focus-detail";
import { getChapterFocus } from "@/lib/chapter-focus";
import { chapterRegistry } from "@/lib/chapters";
import { ACADEMIC_SESSION } from "@/lib/syllabus-2026-27";
import { buildPageMetadata } from "@/lib/seo-metadata";

type Props = {
  params: Promise<{ slug: string; subject: string; chapter: string; focus: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subject, chapter, focus: focusSlug } = await params;
  const match = getChapterFocus(chapterRegistry, slug, subject, chapter, focusSlug);
  if (!match) return { title: "Topic Not Found" };

  const { entry, focus } = match;

  return buildPageMetadata({
    title: `${focus.title} — Class ${entry.classNumber} ${entry.subjectName}`,
    description: `General guidance for ${focus.title} in Class ${entry.classNumber} ${entry.subjectName}, Chapter ${entry.chapterNumber}: ${entry.chapterTitle}, session ${ACADEMIC_SESSION}.`,
    keywords: [
      focus.title,
      `class ${entry.classNumber} ${entry.chapterTitle}`,
      `${entry.subjectName} chapter ${entry.chapterNumber}`,
      "chapter study guidance",
    ],
    path: `/classes/${slug}/${subject}/${chapter}/focus/${focusSlug}`,
    noIndex: true,
  });
}

export default async function ChapterFocusPage({ params }: Props) {
  const { slug, subject, chapter, focus: focusSlug } = await params;
  const match = getChapterFocus(chapterRegistry, slug, subject, chapter, focusSlug);
  if (!match) notFound();

  return <ChapterFocusDetail chapter={match.entry} focus={match.focus} />;
}
