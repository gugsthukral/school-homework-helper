import {
  REGIONAL_LANGUAGES_SEO_PHRASE,
  REGIONAL_LANGUAGES_TAGLINE,
} from "@/lib/indian-languages";

export const SITE_NAME = "School Homework Helper";

export const SITE_TAGLINE = "AI Education for Classes 1–12";

export const DEFAULT_DESCRIPTION =
  `Free AI homework help with 8 tools — Ask Anything, Homework Solver, Essay Generator, Calculator, Math Solver, Quiz Generator, School Projects, and Grammar Checker — plus NCERT study resources and Computer subject guides for CBSE Classes 1–12. ${REGIONAL_LANGUAGES_TAGLINE}.`;

export const DEFAULT_KEYWORDS = [
  "school homework helper",
  "homework help India",
  "AI homework help",
  "CBSE study guide",
  "class 1 to 12 homework",
  "ask anything AI tutor",
  "homework solver",
  "essay generator",
  "AI calculator",
  "math solver",
  "quiz generator",
  "school project ideas",
  "science project ideas",
  "grammar checker",
  "NCERT chapter notes",
  "board exam preparation",
  "online study help",
  "free homework help",
  "computer homework help",
  "CBSE computer syllabus",
  "computer class 10",
  "ICT study help",
  "MS Office homework",
  "Python class 9 10",
  "regional languages India",
  "Hindi homework help",
  "Tamil homework help",
  "Bengali homework help",
  "multilingual AI tutor",
] as const;

export const TOOL_SEO = {
  "ask-anything": {
    title: "Ask Anything — AI Tutor",
    description:
      `Ask any school question across subjects and get clear answers from an AI tutor. Type or use voice input — for CBSE Classes 1–12. ${REGIONAL_LANGUAGES_TAGLINE}.`,
    keywords: [
      "ask anything AI",
      "homework questions",
      "AI tutor",
      "study help",
      "CBSE doubt solver",
      "voice homework help",
      "computer homework questions",
      "ICT doubts",
      "regional language homework help",
      "Hindi Tamil Bengali tutor",
    ],
    path: "/tools/ask-anything",
  },
  "homework-solver": {
    title: "AI Homework Solver",
    description:
      "Get step-by-step homework explanations for any question. AI-powered help for Maths, Science, English, Computer, and more — Classes 1 to 12.",
    keywords: [
      "homework solver",
      "AI homework help",
      "step by step solutions",
      "CBSE homework answers",
      "class 1-12 homework help",
      "computer homework help",
    ],
    path: "/tools/homework-solver",
  },
  "essay-generator": {
    title: "AI Essay Generator",
    description:
      "Generate school essays by topic, word count, and class level. Perfect for English homework from Class 1 to Class 12.",
    keywords: [
      "essay generator",
      "essay writing help",
      "English essay topics",
      "school essay maker",
      "class 6 essay",
      "class 10 essay",
    ],
    path: "/tools/essay-generator",
  },
  calculator: {
    title: "AI Calculator",
    description:
      "Calculate arithmetic, percentages, scientific expressions, and unit conversions with clear step-by-step explanations for school students.",
    keywords: [
      "online calculator",
      "percentage calculator",
      "scientific calculator",
      "unit converter",
      "school maths calculator",
    ],
    path: "/tools/calculator",
  },
  "math-solver": {
    title: "AI Math Solver",
    description:
      "Solve arithmetic, algebra, geometry, and word problems with clear step-by-step explanations for CBSE students.",
    keywords: [
      "math solver",
      "maths problem solver",
      "algebra solver",
      "word problems solver",
      "CBSE maths help",
    ],
    path: "/tools/math-solver",
  },
  "quiz-generator": {
    title: "AI Quiz Generator",
    description:
      "Create MCQ quizzes from any topic or chapter. Practice tests for Maths, Science, English, Computer, and SST — Classes 1–12.",
    keywords: [
      "quiz generator",
      "MCQ generator",
      "practice quiz maker",
      "online test generator",
      "CBSE quiz",
      "computer quiz class 10",
    ],
    path: "/tools/quiz-generator",
  },
  "science-projects": {
    title: "School Projects — AI Idea Generator",
    description:
      "Get class-wise school and science project ideas with materials, steps, and learning outcomes for CBSE students Class 1–12.",
    keywords: [
      "school project ideas",
      "school projects",
      "science project ideas",
      "class 8 science project",
      "CBSE science exhibition",
      "DIY school projects",
    ],
    path: "/tools/science-projects",
  },
  "grammar-checker": {
    title: "AI Grammar Checker",
    description:
      "Check and correct English grammar, spelling, and writing for school assignments. Ideal for Classes 1 to 12.",
    keywords: [
      "grammar checker",
      "English grammar check",
      "spell checker",
      "writing correction",
      "school English help",
    ],
    path: "/tools/grammar-checker",
  },
} as const;

export const PAGE_SEO = {
  home: {
    title: SITE_TAGLINE,
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    path: "/",
  },
  about: {
    title: "About Us",
    description:
      `Learn about School Homework Helper — eight AI tools and CBSE study resources helping students, parents, and teachers from Class 1 to Class 12 across India. ${REGIONAL_LANGUAGES_TAGLINE}.`,
    keywords: [
      "about school homework helper",
      "AI education platform",
      "CBSE homework help",
      "online learning India",
      "regional languages India",
    ],
    path: "/about",
  },
  blog: {
    title: "Study Tips & Homework Blog",
    description:
      "Study tips, homework help articles, exam preparation guides, and NCERT learning resources for CBSE Classes 1–12.",
    keywords: [
      "study tips",
      "homework help blog",
      "exam preparation",
      "CBSE study guide",
      "learning resources",
    ],
    path: "/blog",
  },
  classes: {
    title: "All Classes — CBSE Syllabus & Homework Help",
    description:
      `Homework help and CBSE syllabus for Class 1 to Class 12. Chapter-wise notes for Maths, Science, English, Computer, and more — plus AI tools for every grade. ${REGIONAL_LANGUAGES_SEO_PHRASE}`,
    keywords: [
      "class 1 to 12 syllabus",
      "CBSE homework help",
      "class wise study material",
      "NCERT chapters",
      "computer syllabus class 1 to 10",
    ],
    path: "/classes",
  },
  subjects: {
    title: "All Subjects — Maths, Science, English, Computer & More",
    description:
      `Homework help for Mathematics, Science, English, Hindi, Punjabi, Computer, SST, EVS, Accountancy, Business Studies, and Economics — CBSE session 2026-27, Classes 1–12. ${REGIONAL_LANGUAGES_SEO_PHRASE}`,
    keywords: [
      "maths homework help",
      "science homework help",
      "english homework help",
      "computer homework help",
      "hindi homework",
      "social studies help",
      "CBSE subjects",
      "computer class 10",
      "ICT syllabus CBSE",
    ],
    path: "/subjects",
  },
  contact: {
    title: "Contact Us",
    description:
      "Contact School Homework Helper for support, feedback, partnership inquiries, or questions about our AI study tools.",
    keywords: ["contact school homework helper", "homework help support", "education platform contact"],
    path: "/contact",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "Learn how School Homework Helper collects, uses, and protects your information when you use our AI education tools and website.",
    keywords: ["privacy policy", "data protection", "student privacy"],
    path: "/privacy",
  },
  terms: {
    title: "Terms of Service",
    description:
      "Read the terms and conditions for using School Homework Helper's AI education tools, study resources, and website.",
    keywords: ["terms of service", "terms and conditions", "website terms"],
    path: "/terms",
  },
  cookies: {
    title: "Cookie Policy",
    description:
      "Learn how School Homework Helper uses cookies, what types we use, and how to manage your cookie preferences.",
    keywords: ["cookie policy", "cookies", "cookie consent"],
    path: "/cookies",
  },
  signin: {
    title: "Sign In",
    description: "Sign in or sign up to School Homework Helper with your Google account to save progress and unlock features.",
    keywords: ["sign in", "login", "Google sign in"],
    path: "/signin",
    noIndex: true,
  },
} as const;
