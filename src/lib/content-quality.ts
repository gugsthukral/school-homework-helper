import { approvedBlogPosts, curatedBlogPosts } from "@/lib/blog-posts";
import { getChapterFocusRegistry } from "@/lib/chapter-focus";
import { chapterRegistry, getChapterPath } from "@/lib/chapters";
import { keyTopicsRegistry } from "@/lib/key-topics";
import { seoPages } from "@/lib/seo-pages";

function assertUnique(label: string, values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  if (duplicates.size > 0) {
    throw new Error(`${label} contains duplicate paths: ${[...duplicates].join(", ")}`);
  }
}

function countQuestionPrompts(post: (typeof curatedBlogPosts)[number]) {
  const questionHeadings = new Set([
    "Numbers & Place Value",
    "Fractions & Decimals",
    "Geometry & Measurement",
    "Word Problems",
  ]);

  return post.sections
    .filter((section) => section.heading && questionHeadings.has(section.heading))
    .reduce(
      (total, section) =>
        total + section.content.split("\n").filter((line) => line.trim().startsWith("•")).length,
      0
    );
}

export function validateContentQuality() {
  assertUnique("Chapter registry", chapterRegistry.map(getChapterPath));

  const now = Date.now();
  for (const post of approvedBlogPosts) {
    if (post.reviewStatus !== "reviewed") {
      throw new Error(`Approved blog post is not reviewed: ${post.slug}`);
    }
    if (new Date(post.publishedAt).getTime() > now) {
      throw new Error(`Approved blog post has a future publication date: ${post.slug}`);
    }
  }

  for (const post of curatedBlogPosts) {
    const claim = post.title.match(/^(\d+)\s+Maths Practice Questions/i);
    if (!claim) continue;

    const promised = Number(claim[1]);
    const provided = countQuestionPrompts(post);
    if (promised !== provided) {
      throw new Error(
        `Question-count claim mismatch for ${post.slug}: promised ${promised}, found ${provided}`
      );
    }
  }
}

export function validateSitemapUrls(urls: string[]) {
  assertUnique("Sitemap", urls);

  const blockedPaths = new Set([
    ...seoPages.map((page) => `/${page.slug}`),
    ...chapterRegistry.map(getChapterPath),
    ...keyTopicsRegistry.map((topic) => `/classes/${topic.classSlug}/topics/${topic.slug}`),
    ...getChapterFocusRegistry(chapterRegistry).map(
      (item) =>
        `/classes/${item.classSlug}/${item.subjectSlug}/${item.chapterSlug}/focus/${item.focusSlug}`
    ),
  ]);

  const blocked = urls.find((url) => {
    const path = new URL(url).pathname.replace(/\/$/, "") || "/";
    return blockedPaths.has(path);
  });

  if (blocked) {
    throw new Error(`Noindexed route must not appear in sitemap: ${blocked}`);
  }
}
