import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectChaptersPage } from "@/components/classes/subject-chapters-page";
import { getClassBySlug } from "@/lib/class-content";
import {
  chapterRegistry,
  getChaptersForSubject,
  getSubjectSlug,
} from "@/lib/chapters";
import { getSyllabusForClass } from "@/lib/syllabus-2026-27";
import { ACADEMIC_SESSION } from "@/lib/syllabus-2026-27";

type Props = { params: Promise<{ slug: string; subject: string }> };

export async function generateStaticParams() {
  const params: { slug: string; subject: string }[] = [];
  const seen = new Set<string>();

  for (const entry of chapterRegistry) {
    const key = `${entry.classSlug}/${entry.subjectSlug}`;
    if (!seen.has(key)) {
      seen.add(key);
      params.push({ slug: entry.classSlug, subject: entry.subjectSlug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subject } = await params;
  const cls = getClassBySlug(slug);
  if (!cls) return { title: "Not Found" };

  const syllabus = getSyllabusForClass(cls.number);
  const subjectData = syllabus.find((s) => getSubjectSlug(s.name) === subject);
  if (!subjectData) return { title: "Not Found" };

  return {
    title: `Class ${cls.number} ${subjectData.name} Syllabus ${ACADEMIC_SESSION}`,
    description: `Class ${cls.number} ${subjectData.name} chapter-wise syllabus for CBSE session ${ACADEMIC_SESSION}. ${subjectData.chapters.length} chapters with notes and homework help.`,
    keywords: [
      `class ${cls.number} ${subjectData.name.toLowerCase()} syllabus`,
      `class ${cls.number} ${subject} chapters`,
      `CBSE ${ACADEMIC_SESSION} class ${cls.number}`,
    ],
  };
}

export default async function ClassSubjectPage({ params }: Props) {
  const { slug, subject } = await params;
  const cls = getClassBySlug(slug);
  if (!cls) notFound();

  const chapters = getChaptersForSubject(slug, subject);
  if (chapters.length === 0) notFound();

  const subjectName = chapters[0].subjectName;

  return (
    <SubjectChaptersPage
      classSlug={slug}
      classNumber={cls.number}
      subjectName={subjectName}
      subjectSlug={subject}
      chapters={chapters}
    />
  );
}
