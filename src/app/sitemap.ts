import type { MetadataRoute } from "next";
import { approvedBlogPosts } from "@/lib/blog-posts";
import { chapterRegistry } from "@/lib/chapters";
import { validateContentQuality, validateSitemapUrls } from "@/lib/content-quality";
import { aiTools } from "@/lib/data";
import { subjectList } from "@/lib/subject-content";
import { getSiteUrl } from "@/lib/site-url";

const baseUrl = getSiteUrl();

const staticRoutes = [
  "",
  "/about",
  "/blog",
  "/contact",
  "/editorial-policy",
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
  validateContentQuality();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/tools") ? 0.9 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = approvedBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const subjectEntries: MetadataRoute.Sitemap = [
    ...new Set(chapterRegistry.map((c) => `${c.classSlug}/${c.subjectSlug}`)),
  ].map((key) => ({
    url: `${baseUrl}/classes/${key}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const entries = [
    ...staticEntries,
    ...blogEntries,
    ...subjectEntries,
  ];

  validateSitemapUrls(entries.map((entry) => entry.url));
  return entries;
}
