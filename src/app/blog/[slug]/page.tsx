import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { BlogJsonLd } from "@/components/seo/blog-json-ld";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { buildPageMetadata } from "@/lib/seo-metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article Not Found" };

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, post.title, "school homework", "study tips", "CBSE", "exam preparation"],
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <BlogJsonLd post={post} />
      <BlogArticle post={post} />
    </>
  );
}
