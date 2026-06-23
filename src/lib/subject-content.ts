import { aiTools } from "./data";

export type SubjectInfo = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  topics: string[];
  color: string;
  recommendedTools: string[];
};

export const subjectList: SubjectInfo[] = [
  {
    slug: "mathematics",
    name: "Mathematics",
    icon: "Sigma",
    description:
      "From basic arithmetic to advanced algebra and geometry — get step-by-step math help for every class.",
    topics: ["Arithmetic", "Algebra", "Geometry", "Trigonometry", "Word Problems", "Statistics"],
    color: "border-sky-400/30 hover:border-sky-400/60",
    recommendedTools: ["Math Solver", "Homework Solver", "Quiz Generator"],
  },
  {
    slug: "science",
    name: "Science",
    icon: "Atom",
    description:
      "Physics, chemistry, and biology explained simply with project ideas and homework solutions.",
    topics: ["Physics", "Chemistry", "Biology", "Environment", "Experiments", "Projects"],
    color: "border-orange-500/30 hover:border-orange-500/60",
    recommendedTools: ["Science Projects", "Homework Solver", "Quiz Generator"],
  },
  {
    slug: "english",
    name: "English",
    icon: "Languages",
    description:
      "Essay writing, grammar, comprehension, and vocabulary help for all class levels.",
    topics: ["Grammar", "Essays", "Comprehension", "Vocabulary", "Letter Writing", "Literature"],
    color: "border-sky-400/30 hover:border-sky-400/60",
    recommendedTools: ["Essay Generator", "Grammar Checker", "Homework Solver"],
  },
  {
    slug: "hindi",
    name: "Hindi",
    icon: "Type",
    description:
      "Hindi grammar, essay writing, and comprehension support for school students.",
    topics: ["व्याकरण", "निबंध", "अपठित गद्यांश", "पत्र लेखन", "कविता", "कहानी"],
    color: "border-orange-500/30 hover:border-orange-500/60",
    recommendedTools: ["Essay Generator", "Homework Solver", "Quiz Generator"],
  },
  {
    slug: "punjabi",
    name: "Punjabi",
    icon: "Type",
    description:
      "Punjabi language homework help including grammar, essays, and reading practice.",
    topics: ["ਵਿਆਕਰਣ", "ਲੇਖ", "ਪਠਨ", "ਸ਼ਬਦਾਵਲੀ", "ਕਵਿਤਾ", "ਕਹਾਣੀ"],
    color: "border-sky-400/30 hover:border-sky-400/60",
    recommendedTools: ["Essay Generator", "Homework Solver", "Quiz Generator"],
  },
  {
    slug: "evs",
    name: "EVS",
    icon: "Atom",
    description:
      "Environmental Studies for Classes 1–5 — nature, community, health, and the world around us.",
    topics: ["Plants & Animals", "Food & Water", "Family & Community", "Maps & Environment", "Health & Habits", "Festivals & Culture"],
    color: "border-emerald-500/30 hover:border-emerald-500/60",
    recommendedTools: ["Science Projects", "Homework Solver", "Quiz Generator"],
  },
  {
    slug: "accountancy",
    name: "Accountancy",
    icon: "Sigma",
    description:
      "Financial accounting, partnership accounts, and company accounts for Classes 11–12 commerce stream.",
    topics: ["Journal Entries", "Financial Statements", "Partnership", "Company Accounts", "Ratio Analysis", "Cash Flow"],
    color: "border-orange-500/30 hover:border-orange-500/60",
    recommendedTools: ["Homework Solver", "Quiz Generator"],
  },
  {
    slug: "business-studies",
    name: "Business Studies",
    icon: "Globe2",
    description:
      "Business organisation, management, marketing, and finance for Classes 11–12 commerce students.",
    topics: ["Management", "Business Environment", "Marketing", "Finance", "Organising", "Consumer Protection"],
    color: "border-sky-400/30 hover:border-sky-400/60",
    recommendedTools: ["Quiz Generator", "Homework Solver", "Essay Generator"],
  },
  {
    slug: "economics",
    name: "Economics",
    icon: "Globe2",
    description:
      "Microeconomics, macroeconomics, and statistics for Classes 11–12 commerce and arts streams.",
    topics: ["Demand & Supply", "National Income", "Statistics", "Money & Banking", "Government Budget", "Globalisation"],
    color: "border-orange-500/30 hover:border-orange-500/60",
    recommendedTools: ["Homework Solver", "Quiz Generator", "Essay Generator"],
  },
  {
    slug: "sst",
    name: "SST",
    icon: "Globe2",
    description:
      "Social Studies covering history, geography, civics, and economics for Classes 6–12.",
    topics: ["History", "Geography", "Civics", "Economics", "Maps", "Current Affairs"],
    color: "border-orange-500/30 hover:border-orange-500/60",
    recommendedTools: ["Homework Solver", "Quiz Generator", "Essay Generator"],
  },
];

export function getSubjectBySlug(slug: string) {
  return subjectList.find((s) => s.slug === slug);
}

export function getToolsForSubject(subject: SubjectInfo) {
  return aiTools.filter((t) => subject.recommendedTools.includes(t.name));
}
