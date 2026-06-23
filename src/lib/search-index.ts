import { blogPosts } from "@/lib/blog-posts";
import { chapterRegistry, getChapterPath } from "@/lib/chapters";
import { aiTools, classes, navLinks, subjects } from "@/lib/data";

export type SearchResultType = "blog" | "tool" | "class" | "subject" | "chapter" | "page";

export type SearchResult = {
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  keywords: string;
};

const staticPages: SearchResult[] = [
  {
    type: "page",
    title: "Home",
    description: "AI homework help for Classes 1–12",
    href: "/",
    keywords: "home homepage school homework helper ai",
  },
  {
    type: "page",
    title: "About",
    description: "About School Homework Helper",
    href: "/about",
    keywords: "about us team mission",
  },
  {
    type: "page",
    title: "Contact",
    description: "Get in touch with us",
    href: "/contact",
    keywords: "contact support email help",
  },
  {
    type: "page",
    title: "Sign In",
    description: "Sign in to your account",
    href: "/signin",
    keywords: "sign in login account auth",
  },
  {
    type: "page",
    title: "All Classes",
    description: "Browse CBSE syllabus for Classes 1–12",
    href: "/classes",
    keywords: "classes class 1 2 3 4 5 6 7 8 9 10 11 12 syllabus",
  },
  {
    type: "page",
    title: "All Subjects",
    description: "Mathematics, Science, English, Hindi, and more",
    href: "/subjects",
    keywords: "subjects maths science english hindi punjabi sst",
  },
  {
    type: "page",
    title: "Blog",
    description: "Study tips, exam guides, and learning resources",
    href: "/blog",
    keywords: "blog articles tips study guide exam",
  },
];

function buildSearchIndex(): SearchResult[] {
  const blogResults: SearchResult[] = blogPosts.map((post) => ({
    type: "blog",
    title: post.title,
    description: post.excerpt,
    href: `/blog/${post.slug}`,
    keywords: `${post.category} ${post.title} ${post.excerpt} ${post.sections.map((s) => `${s.heading ?? ""} ${s.content}`).join(" ")}`,
  }));

  const toolResults: SearchResult[] = aiTools.map((tool) => ({
    type: "tool",
    title: tool.name,
    description: tool.description,
    href: tool.href,
    keywords: `${tool.name} ${tool.description} ai tool homework`,
  }));

  const classResults: SearchResult[] = classes.map((c) => ({
    type: "class",
    title: c.label,
    description: `CBSE Class ${c.number} syllabus, chapters, and study material`,
    href: c.href,
    keywords: `class ${c.number} class-${c.number} cbse ncert syllabus`,
  }));

  const subjectResults: SearchResult[] = subjects.map((s) => ({
    type: "subject",
    title: s.name,
    description: `${s.name} resources for Classes 1–12`,
    href: s.href,
    keywords: `${s.name} subject study notes`,
  }));

  const chapterResults: SearchResult[] = chapterRegistry.map((chapter) => ({
    type: "chapter",
    title: `Class ${chapter.classNumber} ${chapter.subjectName}: ${chapter.chapterTitle}`,
    description: `Chapter ${chapter.chapterNumber} — ${chapter.chapterTitle}`,
    href: getChapterPath(chapter),
    keywords: `class ${chapter.classNumber} ${chapter.subjectName} ${chapter.chapterTitle} chapter ${chapter.chapterNumber} ${chapter.subjectSlug}`,
  }));

  const navResults: SearchResult[] = navLinks.map((link) => ({
    type: "page",
    title: link.label,
    description: link.href,
    href: link.href.startsWith("/#") ? link.href : link.href,
    keywords: link.label,
  }));

  return [
    ...staticPages,
    ...navResults,
    ...toolResults,
    ...classResults,
    ...subjectResults,
    ...blogResults,
    ...chapterResults,
  ];
}

export const searchIndex = buildSearchIndex();

function scoreResult(result: SearchResult, query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  const title = result.title.toLowerCase();
  const description = result.description.toLowerCase();
  const keywords = result.keywords.toLowerCase();

  let score = 0;
  if (title === q) score += 100;
  if (title.startsWith(q)) score += 50;
  if (title.includes(q)) score += 30;
  if (description.includes(q)) score += 15;
  if (keywords.includes(q)) score += 10;

  const terms = q.split(/\s+/).filter(Boolean);
  for (const term of terms) {
    if (title.includes(term)) score += 8;
    if (keywords.includes(term)) score += 4;
    if (description.includes(term)) score += 2;
  }

  return score;
}

export function searchSite(query: string, limit = 12): SearchResult[] {
  const q = query.trim();
  if (q.length < 2) return [];

  return searchIndex
    .map((result) => ({ result, score: scoreResult(result, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ result }) => result);
}

export const searchTypeLabels: Record<SearchResultType, string> = {
  blog: "Blog",
  tool: "AI Tool",
  class: "Class",
  subject: "Subject",
  chapter: "Chapter",
  page: "Page",
};
