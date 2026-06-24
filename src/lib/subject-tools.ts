export const SUBJECT_TOOLS: Record<string, { href: string; label: string }> = {
  mathematics: { href: "/tools/math-solver", label: "Math Solver" },
  english: { href: "/tools/essay-generator", label: "Essay Generator" },
  hindi: { href: "/tools/homework-solver", label: "Homework Solver" },
  punjabi: { href: "/tools/homework-solver", label: "Homework Solver" },
  science: { href: "/tools/homework-solver", label: "Homework Solver" },
  evs: { href: "/tools/science-projects", label: "School Projects" },
  "social-science": { href: "/tools/quiz-generator", label: "Quiz Generator" },
  physics: { href: "/tools/math-solver", label: "Math Solver" },
  chemistry: { href: "/tools/homework-solver", label: "Homework Solver" },
  biology: { href: "/tools/science-projects", label: "School Projects" },
  accountancy: { href: "/tools/homework-solver", label: "Homework Solver" },
  "business-studies": { href: "/tools/quiz-generator", label: "Quiz Generator" },
  economics: { href: "/tools/homework-solver", label: "Homework Solver" },
  "computer-science": { href: "/tools/homework-solver", label: "Homework Solver" },
  "informatics-practices": { href: "/tools/homework-solver", label: "Homework Solver" },
  history: { href: "/tools/essay-generator", label: "Essay Generator" },
  "political-science": { href: "/tools/quiz-generator", label: "Quiz Generator" },
  geography: { href: "/tools/quiz-generator", label: "Quiz Generator" },
  psychology: { href: "/tools/homework-solver", label: "Homework Solver" },
  sociology: { href: "/tools/essay-generator", label: "Essay Generator" },
};

export function getToolForSubjectSlug(subjectSlug: string) {
  return SUBJECT_TOOLS[subjectSlug] ?? {
    href: "/tools/homework-solver",
    label: "Homework Solver",
  };
}
