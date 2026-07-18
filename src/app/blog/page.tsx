import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { curatedBlogPosts } from "@/lib/blog-posts";
import { PAGE_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.blog);

export default function BlogPage() {
  return (
    <PageLayout
      badge="Blog"
      title="Study Tips & Learning Resources"
      description="Articles to help students learn better, prepare for exams, and master every subject."
      showAds={false}
      backHref="/"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {curatedBlogPosts.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group glass-card flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="theme-blog-card-media flex h-36 items-center justify-center">
              <BookOpen className="theme-blog-card-icon h-12 w-12 transition-colors group-hover:text-orange-400" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-xs font-medium text-orange-400">{article.category}</span>
              <h2 className="mt-2 font-semibold text-slate-900 transition-colors group-hover:text-sky-300">
                {article.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-slate-500">{article.excerpt}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
