import { ACADEMIC_SESSION, getSyllabusForClass } from "./syllabus-2026-27";
import {
  getChapterFocusTopics,
  type ChapterFocusTopic,
} from "./chapter-focus";

export type { ChapterFocusTopic } from "./chapter-focus";

export type ChapterEntry = {
  classSlug: string;
  classNumber: number;
  subjectSlug: string;
  subjectName: string;
  chapterSlug: string;
  chapterNumber: number;
  chapterTitle: string;
};

export type ChapterContent = {
  overview: string;
  keyTopics: ChapterFocusTopic[];
  learningObjectives: string[];
  studyTips: string[];
  examTips?: string;
  toolHref: string;
  toolLabel: string;
};

export function getChapterTool(subjectSlug: string) {
  return SUBJECT_TOOLS[subjectSlug] ?? {
    href: "/tools/homework-solver",
    label: "Homework Solver",
  };
}

const SUBJECT_SLUGS: Record<string, string> = {
  Mathematics: "mathematics",
  English: "english",
  Hindi: "hindi",
  Science: "science",
  EVS: "evs",
  "Social Studies": "social-science",
  "Social Science": "social-science",
  Physics: "physics",
  Chemistry: "chemistry",
  Biology: "biology",
};

const SUBJECT_TOOLS: Record<string, { href: string; label: string }> = {
  mathematics: { href: "/tools/math-solver", label: "Math Solver" },
  english: { href: "/tools/essay-generator", label: "Essay Generator" },
  hindi: { href: "/tools/homework-solver", label: "Homework Solver" },
  science: { href: "/tools/homework-solver", label: "Homework Solver" },
  evs: { href: "/tools/science-projects", label: "School Projects" },
  "social-science": { href: "/tools/quiz-generator", label: "Quiz Generator" },
  physics: { href: "/tools/math-solver", label: "Math Solver" },
  chemistry: { href: "/tools/homework-solver", label: "Homework Solver" },
  biology: { href: "/tools/science-projects", label: "School Projects" },
};

export function getSubjectSlug(subjectName: string): string {
  return (
    SUBJECT_SLUGS[subjectName] ??
    subjectName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  );
}

export function toChapterSlug(title: string, index: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[''&]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug.length >= 2 ? slug : `chapter-${index + 1}`;
}

export function getChapterPath(entry: ChapterEntry): string {
  return `/classes/${entry.classSlug}/${entry.subjectSlug}/${entry.chapterSlug}`;
}

export function getSubjectPath(classSlug: string, subjectSlug: string): string {
  return `/classes/${classSlug}/${subjectSlug}`;
}

function buildRegistry(): ChapterEntry[] {
  const entries: ChapterEntry[] = [];

  for (let classNum = 1; classNum <= 12; classNum++) {
    const classSlug = `class-${classNum}`;
    const subjects = getSyllabusForClass(classNum);

    for (const subject of subjects) {
      const subjectSlug = getSubjectSlug(subject.name);

      subject.chapters.forEach((title, index) => {
        entries.push({
          classSlug,
          classNumber: classNum,
          subjectSlug,
          subjectName: subject.name,
          chapterSlug: toChapterSlug(title, index),
          chapterNumber: index + 1,
          chapterTitle: title,
        });
      });
    }
  }

  return entries;
}

export const chapterRegistry = buildRegistry();

const chapterMap = new Map(
  chapterRegistry.map((c) => [
    `${c.classSlug}/${c.subjectSlug}/${c.chapterSlug}`,
    c,
  ])
);

export function getChapter(
  classSlug: string,
  subjectSlug: string,
  chapterSlug: string
): ChapterEntry | undefined {
  return chapterMap.get(`${classSlug}/${subjectSlug}/${chapterSlug}`);
}

export function getChaptersForSubject(
  classSlug: string,
  subjectSlug: string
): ChapterEntry[] {
  return chapterRegistry.filter(
    (c) => c.classSlug === classSlug && c.subjectSlug === subjectSlug
  );
}

export function getChaptersForSubjectPage(
  classNumber: number,
  subjectSlug: string
): ChapterEntry[] {
  const classSlug = `class-${classNumber}`;

  if (subjectSlug === "science" && classNumber >= 11) {
    return chapterRegistry.filter(
      (c) =>
        c.classSlug === classSlug &&
        ["physics", "chemistry", "biology"].includes(c.subjectSlug)
    );
  }

  if (subjectSlug === "sst") {
    return getChaptersForSubject(classSlug, "social-science");
  }

  return getChaptersForSubject(classSlug, subjectSlug);
}

export function getSubjectsForClassSlug(classSlug: string) {
  const classNumber = parseInt(classSlug.replace("class-", ""), 10);
  return getSyllabusForClass(classNumber).map((s) => ({
    name: s.name,
    slug: getSubjectSlug(s.name),
    chapterCount: s.chapters.length,
  }));
}

export function buildChapterContent(entry: ChapterEntry): ChapterContent {
  const tool = getChapterTool(entry.subjectSlug);

  const isBoardClass = entry.classNumber >= 10;

  return {
    overview: `Welcome to Class ${entry.classNumber} ${entry.subjectName}, Chapter ${entry.chapterNumber}: "${entry.chapterTitle}". This page covers the complete CBSE (NCERT) syllabus for academic session ${ACADEMIC_SESSION}. Use it for homework help, revision, and exam preparation.`,
    keyTopics: getChapterFocusTopics(
      entry.subjectName,
      entry.chapterTitle,
      entry.classNumber
    ),
    learningObjectives: [
      `Understand the main concepts of ${entry.chapterTitle}`,
      `Solve textbook and NCERT exercise questions`,
      `Apply knowledge to homework and class tests`,
      `Revise key points before unit tests and exams`,
    ],
    studyTips: [
      "Read the NCERT chapter thoroughly before attempting exercises.",
      "Write down important formulas, definitions, and diagrams in your notebook.",
      "Practice 5–10 questions daily from this chapter.",
      `Use our ${tool.label} if you get stuck on any problem.`,
    ],
    examTips: isBoardClass
      ? `For Class ${entry.classNumber} board exams (${ACADEMIC_SESSION}), focus on NCERT examples, previous year questions, and sample papers for this chapter.`
      : `Revise this chapter before your school unit test. Practice MCQs using our Quiz Generator.`,
    toolHref: tool.href,
    toolLabel: tool.label,
  };
}

export function getAdjacentChapters(entry: ChapterEntry) {
  const chapters = getChaptersForSubject(entry.classSlug, entry.subjectSlug);
  const index = chapters.findIndex((c) => c.chapterSlug === entry.chapterSlug);
  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}
