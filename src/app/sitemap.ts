import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { getChapterFocusRegistry } from "@/lib/chapter-focus";
import { chapterRegistry } from "@/lib/chapters";
import { aiTools } from "@/lib/data";
import { keyTopicsRegistry } from "@/lib/key-topics";
import { seoPages } from "@/lib/seo-pages";
import { subjectList } from "@/lib/subject-content";
import { getSiteUrl } from "@/lib/site-url";

const baseUrl = getSiteUrl();

const staticRoutes = [
  "",
  "/about",
  "/blog",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/classes",
  "/subjects",
  ...aiTools.map((tool) => tool.href),
  ...Array.from({ length: 12 }, (_, i) => `/classes/class-${i + 1}`),
  ...subjectList.map((s) => `/subjects/${s.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/tools") ? 0.9 : 0.8,
  }));

  const seoEntries: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const chapterEntries: MetadataRoute.Sitemap = chapterRegistry.map((c) => ({
    url: `${baseUrl}/classes/${c.classSlug}/${c.subjectSlug}/${c.chapterSlug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const subjectEntries: MetadataRoute.Sitemap = [
    ...new Set(chapterRegistry.map((c) => `${c.classSlug}/${c.subjectSlug}`)),
  ].map((key) => ({
    url: `${baseUrl}/classes/${key}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const keyTopicEntries: MetadataRoute.Sitemap = keyTopicsRegistry.map((t) => ({
    url: `${baseUrl}/classes/${t.classSlug}/topics/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  const chapterFocusEntries: MetadataRoute.Sitemap = getChapterFocusRegistry(
    chapterRegistry
  ).map((item) => ({
    url: `${baseUrl}/classes/${item.classSlug}/${item.subjectSlug}/${item.chapterSlug}/focus/${item.focusSlug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.68,
  }));

  return [
    ...staticEntries,
    ...seoEntries,
    ...blogEntries,
    ...subjectEntries,
    ...keyTopicEntries,
    ...chapterFocusEntries,
    ...chapterEntries,
  ];
}
