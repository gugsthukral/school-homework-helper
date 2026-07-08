import { blogPosts } from "@/lib/blog-posts";
import { getSiteUrl } from "@/lib/site-url";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const baseUrl = getSiteUrl();
  const now = new Date().toUTCString();

  const items = blogPosts
    .slice(0, 50)
    .map((post) => {
      const url = `${baseUrl}/blog/${post.slug}`;
      const title = escapeXml(post.title);
      const description = escapeXml(post.excerpt);
      const pubDate = new Date(post.publishedAt).toUTCString();

      return [
        "<item>",
        `<title>${title}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink=\"true\">${url}</guid>`,
        `<pubDate>${pubDate}</pubDate>`,
        `<description>${description}</description>`,
        `<category>${escapeXml(post.category)}</category>`,
        "</item>",
      ].join("");
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>School Homework Helper Blog</title>
  <link>${baseUrl}/blog</link>
  <description>Study tips, exam preparation, and learning resources for CBSE Classes 1–12.</description>
  <language>en-IN</language>
  <lastBuildDate>${now}</lastBuildDate>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

