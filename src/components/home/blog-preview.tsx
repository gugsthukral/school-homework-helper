import Link from "next/link";
import { BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";

export function BlogPreview() {
  const articles = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-sky-400">
              Blog
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Study Tips &amp; Resources
            </h2>
            <p className="mt-4 max-w-xl text-sky-200/70">
              Daily articles to help students learn better and prepare for exams.
            </p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 rounded-full border border-sky-400/30 px-5 py-2 text-sm font-medium text-sky-300 transition-colors hover:border-orange-400/50 hover:text-orange-400"
          >
            Read All Articles
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group glass-card overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:border-sky-400/30"
            >
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900">
                <BookOpen className="h-12 w-12 text-sky-400/30 transition-colors group-hover:text-orange-400/50" />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-orange-400">{article.category}</span>
                <h3 className="mt-2 font-semibold text-white transition-colors group-hover:text-sky-300">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs text-sky-300/50">{article.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
