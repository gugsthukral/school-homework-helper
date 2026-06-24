import { aiTools, subjects } from "./data";

export type ClassInfo = {
  slug: string;
  number: number;
  label: string;
  title: string;
  description: string;
  focus: string[];
  examNote?: string;
};

const classFocus: Record<number, { focus: string[]; examNote?: string }> = {
  1: { focus: ["Reading & writing basics", "Numbers 1–100", "Shapes & patterns", "Nature around us"] },
  2: { focus: ["Simple sentences", "Addition & subtraction", "Plants & animals", "Good habits"] },
  3: { focus: ["Paragraph writing", "Multiplication & division", "Living things", "Maps & directions"] },
  4: { focus: ["Grammar basics", "Fractions introduction", "Matter & energy", "Indian states"] },
  5: { focus: ["Essay writing", "Decimals & percentages", "Human body", "History & civics"] },
  6: { focus: ["Creative writing", "Algebra basics", "Light & electricity", "Ancient civilizations"] },
  7: { focus: ["Comprehension", "Linear equations", "Acids & bases", "Medieval India"] },
  8: { focus: ["Formal essays", "Geometry proofs", "Force & pressure", "Modern history"] },
  9: { focus: ["Literature analysis", "Polynomials", "Atoms & molecules", "Democracy & economics"] },
  10: { focus: ["Board exam writing", "Trigonometry", "Chemical reactions", "Board exam prep"], examNote: "CBSE 2026-27 board exam year — focus on NCERT syllabus and sample papers" },
  11: { focus: ["Advanced writing", "Calculus intro", "Physics fundamentals", "Stream selection prep"], examNote: "Choose your stream — Non-Medical (PCM), Medical (PCB), Commerce, or Arts — and follow the CBSE 2026-27 syllabus" },
  12: { focus: ["Competitive writing", "Advanced maths", "Board + entrance prep", "Career guidance"], examNote: "CBSE 2026-27 final board exams — PCM, PCB, Commerce, or Arts stream revision plan" },
};

export const classList: ClassInfo[] = Array.from({ length: 12 }, (_, i) => {
  const number = i + 1;
  const meta = classFocus[number];
  return {
    slug: `class-${number}`,
    number,
    label: `Class ${number}`,
    title: `Class ${number} Homework Help`,
    description: `AI-powered homework help, study resources, and practice tools designed for Class ${number} students.`,
    focus: meta.focus,
    examNote: meta.examNote,
  };
});

export function getClassBySlug(slug: string) {
  return classList.find((c) => c.slug === slug);
}

export function getRecommendedToolsForClass(classNumber: number) {
  if (classNumber <= 4) {
    return aiTools.filter((t) =>
      ["Homework Solver", "Math Solver", "Quiz Generator", "School Projects"].includes(t.name)
    );
  }
  if (classNumber <= 8) {
    return aiTools.filter((t) =>
      ["Homework Solver", "Essay Generator", "Math Solver", "Quiz Generator", "Grammar Checker"].includes(t.name)
    );
  }
  return aiTools;
}

export function getClassSubjectHref(classSlug: string, subjectSlug: string) {
  return `/classes/${classSlug}/${subjectSlug}`;
}

export const subjectSlugMap: Record<string, string> = {
  Mathematics: "mathematics",
  Science: "science",
  English: "english",
  Hindi: "hindi",
  Punjabi: "punjabi",
  SST: "sst",
};

export function getSubjectsForClass() {
  return subjects.map((s) => ({
    ...s,
    slug: subjectSlugMap[s.name] ?? s.name.toLowerCase(),
  }));
}
