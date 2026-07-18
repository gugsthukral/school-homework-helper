import { getSiteUrl } from "@/lib/seo-metadata";
import { SITE_NAME } from "@/lib/seo-config";
import type { BlogPost } from "@/lib/blog-posts";

type BlogJsonLdProps = {
  post: BlogPost;
};

export function BlogJsonLd({ post }: BlogJsonLdProps) {
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}/blog/${post.slug}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: post.category,
    keywords: [post.category, post.title, "CBSE", "homework help", "study tips"].join(", "),
    ...(post.reviewer
      ? { reviewedBy: { "@type": "Person", name: post.reviewer } }
      : {}),
    ...(post.sources && post.sources.length > 0
      ? { citation: post.sources.map((source) => source.url) }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
