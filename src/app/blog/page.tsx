import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | School Homework Helper",
  description:
    "Study tips, homework help articles, exam preparation guides, and learning resources for Classes 1–12.",
};

export default function BlogPage() {
  return (
    <PageLayout
      badge="Blog"
      title="Study Tips & Learning Resources"
      description="Articles to help students learn better, prepare for exams, and master every subject."
      backHref="/"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group glass-card flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:border-sky-400/30"
          >
            <div className="flex h-36 items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900">
              <BookOpen className="h-12 w-12 text-sky-400/30 transition-colors group-hover:text-orange-400/40" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-xs font-medium text-orange-400">{article.category}</span>
              <h2 className="mt-2 font-semibold text-white transition-colors group-hover:text-sky-300">
                {article.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-sky-200/60">{article.excerpt}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-sky-300/40">
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
