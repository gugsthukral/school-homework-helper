import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { AdBanner } from "@/components/ads/ad-banner";
import { formatResponse } from "@/lib/format-response";
import { Footer } from "@/components/layout/footer";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog-posts";
import { blogPosts } from "@/lib/blog-posts";

type BlogArticleProps = { post: BlogPost };

export function BlogArticle({ post }: BlogArticleProps) {
  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated =
    related.length >= 3
      ? related
      : [
          ...related,
          ...blogPosts
            .filter((p) => p.slug !== post.slug && !related.includes(p))
            .slice(0, 3 - related.length),
        ];

  return (
    <>
      <main className={cn("min-h-screen pb-20 sm:pb-16", SITE_HEADER_OFFSET_CLASS)}>
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-96" />
        <article className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-sky-300/70 transition-colors hover:text-orange-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <header className="mb-10">
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-400">
              {post.category}
            </span>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-sky-300/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <AdBanner placement="horizontal" />

          <div className="space-y-8">
            {post.sections.map((section, i) => (
              <section key={i}>
                {i === 1 && <AdBanner placement="inArticle" className="mb-8" />}
                <div className="glass-card rounded-2xl p-6 sm:p-8">
                {section.heading && (
                  <h2 className="mb-4 text-xl font-semibold text-white">{section.heading}</h2>
                )}
                <div
                  className="whitespace-pre-line text-sm leading-relaxed text-sky-100/90 sm:text-base"
                  dangerouslySetInnerHTML={{
                    __html: formatResponse(section.content),
                  }}
                />
                </div>
              </section>
            ))}
          </div>

          {fallbackRelated.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-lg font-semibold text-white">Related Articles</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {fallbackRelated.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="glass-card rounded-xl px-4 py-3 transition-all hover:border-sky-400/30"
                  >
                    <span className="text-xs text-orange-400">{rel.category}</span>
                    <h3 className="mt-1 text-sm font-medium text-white">{rel.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
