import type { ChapterEntry } from "./chapters";
import { getChapterTool } from "./chapters";
import { ACADEMIC_SESSION } from "./syllabus-2026-27";

export type ChapterFocusCategory =
  | "core-concepts"
  | "ncert-notes"
  | "definitions"
  | "solved-examples"
  | "subject-extra";

export type ChapterFocusTopic = {
  slug: string;
  title: string;
  category: ChapterFocusCategory;
};

export type ChapterFocusContent = {
  intro: string;
  sections: { heading: string; content: string }[];
  highlights: string[];
  toolHref: string;
  toolLabel: string;
};

function focusSlugFromTitle(title: string, fallback: string) {
  const slug = title
    .toLowerCase()
    .replace(/[''&]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug.length >= 2 ? slug : fallback;
}

const SUBJECT_EXTRAS: Record<string, string[]> = {
  Mathematics: ["Step-by-step problem solving", "Common mistakes to avoid"],
  Science: ["Diagrams and experiments", "Real-life applications"],
  Physics: ["Numerical problems", "Derivations and units"],
  Chemistry: ["Chemical equations", "Reactions and properties"],
  Biology: ["Labelled diagrams", "Processes and functions"],
  English: ["Reading and writing practice", "Grammar rules"],
  Hindi: ["व्याकरण और रचना", "अपठित अभ्यास"],
  EVS: ["Observation and activities", "Environment connections"],
  "Social Science": ["Timeline and map work", "Key terms and events"],
  "Social Studies": ["Map skills", "Civics and history facts"],
};

export function getChapterFocusTopics(
  subjectName: string,
  chapterTitle: string,
  classNumber: number
): ChapterFocusTopic[] {
  const base: ChapterFocusTopic[] = [
    {
      slug: "core-concepts",
      title: `Core concepts of ${chapterTitle}`,
      category: "core-concepts",
    },
    {
      slug: "ncert-chapter-notes",
      title: `NCERT Class ${classNumber} ${subjectName} — Chapter notes`,
      category: "ncert-notes",
    },
    {
      slug: "definitions-and-formulas",
      title: "Important definitions and formulas",
      category: "definitions",
    },
    {
      slug: "solved-examples",
      title: "Solved examples and practice questions",
      category: "solved-examples",
    },
  ];

  const extras = (SUBJECT_EXTRAS[subjectName] ?? ["Revision notes", "Exam-style questions"]).map(
    (title, index) => ({
      slug: focusSlugFromTitle(title, `subject-extra-${index + 1}`),
      title,
      category: "subject-extra" as const,
    })
  );

  return [...base, ...extras];
}

export function getChapterFocusPath(entry: ChapterEntry, focusSlug: string) {
  return `/classes/${entry.classSlug}/${entry.subjectSlug}/${entry.chapterSlug}/focus/${focusSlug}`;
}

export function buildChapterFocusContent(
  entry: ChapterEntry,
  focus: ChapterFocusTopic
): ChapterFocusContent {
  const tool = getChapterTool(entry.subjectSlug);
  const { chapterTitle, subjectName, classNumber, chapterNumber } = entry;

  const sharedHighlights = [
    `Aligned with CBSE NCERT Class ${classNumber} syllabus`,
    `Session ${ACADEMIC_SESSION} study material`,
    `Chapter ${chapterNumber}: ${chapterTitle}`,
  ];

  switch (focus.category) {
    case "core-concepts":
      return {
        intro: `Understand the fundamental ideas of "${chapterTitle}" for Class ${classNumber} ${subjectName}. This guide breaks down the chapter into easy-to-learn concepts for homework and exams.`,
        sections: [
          {
            heading: "Main Concepts",
            content: `This chapter introduces the key ideas behind ${chapterTitle}. Focus on understanding definitions, processes, and how each concept connects to earlier topics in ${subjectName}. Read the NCERT textbook section carefully and note down terms you find new.`,
          },
          {
            heading: "Why This Chapter Matters",
            content: `${chapterTitle} is an important part of the Class ${classNumber} ${subjectName} syllabus. Questions from this chapter often appear in unit tests and annual exams. Strong basics here help you in later chapters too.`,
          },
          {
            heading: "Quick Revision Checklist",
            content: `• Read the chapter summary in NCERT\n• List 5–10 key terms from ${chapterTitle}\n• Practice at least one question from each exercise set\n• Revise with our ${tool.label} if you get stuck`,
          },
        ],
        highlights: [
          ...sharedHighlights,
          "Concept-by-concept breakdown",
          "Exam-focused revision tips",
        ],
        toolHref: tool.href,
        toolLabel: tool.label,
      };

    case "ncert-notes":
      return {
        intro: `NCERT-aligned chapter notes for Class ${classNumber} ${subjectName}, Chapter ${chapterNumber}: ${chapterTitle}. Use these points for quick revision before class tests and exams.`,
        sections: [
          {
            heading: "Chapter Summary",
            content: `${chapterTitle} covers essential topics from the NCERT Class ${classNumber} ${subjectName} textbook. Make short notes in your own words while reading — this improves memory better than copying the book.`,
          },
          {
            heading: "Important Points to Remember",
            content: `• Follow the NCERT exercise order when practising\n• Pay attention to solved examples in the textbook\n• Mark diagrams, tables, and boxed definitions\n• Connect this chapter to previous ${subjectName} units`,
          },
          {
            heading: "Homework & Test Prep",
            content: `After reading NCERT, attempt back exercise questions without looking at answers. Use our AI tools for step-by-step help on questions you cannot solve.`,
          },
        ],
        highlights: [...sharedHighlights, "NCERT exercise guidance", "Revision-friendly format"],
        toolHref: tool.href,
        toolLabel: tool.label,
      };

    case "definitions":
      return {
        intro: `Key definitions, terms, and formulas from "${chapterTitle}" for Class ${classNumber} ${subjectName}. Memorise these for short-answer and objective questions.`,
        sections: [
          {
            heading: "Definitions & Terminology",
            content: `Write down every new term introduced in ${chapterTitle}. For each definition, add a simple example from daily life or the textbook. Flashcards work well for ${subjectName} vocabulary.`,
          },
          {
            heading: "Formulas & Rules",
            content:
              subjectName === "Mathematics" || subjectName === "Physics"
                ? `List all formulas from ${chapterTitle} with units and conditions. Practice substituting values into each formula with 2–3 solved examples.`
                : `Note important rules, dates, events, or grammar points from ${chapterTitle}. Understand when each rule applies before memorising.`,
          },
          {
            heading: "Common Exam Questions",
            content: `Definitions and terms from this chapter frequently appear as 1-mark or 2-mark questions. Practice writing crisp, complete answers within the word limit.`,
          },
        ],
        highlights: [...sharedHighlights, "Key terms & formulas", "Short-answer exam prep"],
        toolHref: tool.href,
        toolLabel: tool.label,
      };

    case "solved-examples":
      return {
        intro: `Solved examples and practice questions for Class ${classNumber} ${subjectName} — ${chapterTitle}. Work through NCERT examples first, then try similar problems on your own.`,
        sections: [
          {
            heading: "NCERT Solved Examples",
            content: `Start with every solved example in the NCERT chapter on ${chapterTitle}. Cover the steps, then close the book and try the same problem again without help.`,
          },
          {
            heading: "Practice Strategy",
            content: `• Do odd-numbered exercises first, even-numbered next\n• Time yourself — 1 minute per mark in tests\n• Check answers and note where you went wrong\n• Ask our ${tool.label} to explain any step you don't understand`,
          },
          {
            heading: "Get AI Help Instantly",
            content: `Stuck on a homework question from ${chapterTitle}? Use our ${tool.label} to get step-by-step explanations tailored for Class ${classNumber} students.`,
          },
        ],
        highlights: [...sharedHighlights, "Step-by-step practice", "Homework help available"],
        toolHref: tool.href,
        toolLabel: tool.label,
      };

    default:
      return {
        intro: `${focus.title} — supplementary study material for Class ${classNumber} ${subjectName}, Chapter ${chapterNumber}: ${chapterTitle}.`,
        sections: [
          {
            heading: focus.title,
            content: `This topic supports your understanding of ${chapterTitle}. Combine textbook reading with active practice. For ${subjectName}, regular revision of this area strengthens your overall chapter performance.`,
          },
          {
            heading: "Study Approach",
            content: `Dedicate 15–20 minutes daily to ${focus.title.toLowerCase()} while studying this chapter. Link what you learn here to NCERT exercises and class notes.`,
          },
          {
            heading: "Need Help?",
            content: `Use our ${tool.label} for instant explanations on questions related to ${chapterTitle}.`,
          },
        ],
        highlights: [...sharedHighlights, focus.title],
        toolHref: tool.href,
        toolLabel: tool.label,
      };
  }
}

export type ChapterFocusEntry = ChapterEntry & {
  focusSlug: string;
  focus: ChapterFocusTopic;
};

export function getChapterFocusRegistry(chapterRegistry: ChapterEntry[]): ChapterFocusEntry[] {
  return chapterRegistry.flatMap((entry) =>
    getChapterFocusTopics(entry.subjectName, entry.chapterTitle, entry.classNumber).map(
      (focus) => ({
        ...entry,
        focusSlug: focus.slug,
        focus,
      })
    )
  );
}

export function getChapterFocus(
  chapterRegistry: ChapterEntry[],
  classSlug: string,
  subjectSlug: string,
  chapterSlug: string,
  focusSlug: string
): { entry: ChapterEntry; focus: ChapterFocusTopic } | undefined {
  const match = getChapterFocusRegistry(chapterRegistry).find(
    (item) =>
      item.classSlug === classSlug &&
      item.subjectSlug === subjectSlug &&
      item.chapterSlug === chapterSlug &&
      item.focusSlug === focusSlug
  );

  if (!match) return undefined;

  const { focus } = match;
  const entry: ChapterEntry = {
    classSlug: match.classSlug,
    classNumber: match.classNumber,
    subjectSlug: match.subjectSlug,
    subjectName: match.subjectName,
    chapterSlug: match.chapterSlug,
    chapterNumber: match.chapterNumber,
    chapterTitle: match.chapterTitle,
  };
  return { entry, focus };
}

export function getOtherFocusTopics(entry: ChapterEntry, currentFocusSlug: string) {
  return getChapterFocusTopics(entry.subjectName, entry.chapterTitle, entry.classNumber).filter(
    (f) => f.slug !== currentFocusSlug
  );
}
