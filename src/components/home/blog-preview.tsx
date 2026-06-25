import Link from "next/link";
import { BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";
import { SiteContainer } from "@/components/shared/site-container";

export function BlogPreview() {
  const articles = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="relative w-full bg-white py-16 sm:py-20">
      <SiteContainer>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-sky-600">
              Blog
            </span>
            <h2 className="home-section-title mt-3 text-3xl font-bold sm:text-4xl">
              Study Tips &amp; Resources
            </h2>
            <p className="home-section-subtitle mt-4 max-w-xl">
              Daily articles to help students learn better and prepare for exams.
            </p>
          </div>
          <Link
            href="/blog"
            className="theme-outline-btn shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-colors hover:border-orange-300 hover:text-orange-500"
          >
            Read All Articles
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="home-card group overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="theme-blog-card-media flex h-36 items-center justify-center">
                <BookOpen className="theme-blog-card-icon h-12 w-12 transition-colors group-hover:text-orange-400" />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-orange-500">{article.category}</span>
                <h3 className="mt-2 font-semibold text-slate-800 transition-colors group-hover:text-sky-700">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400">{article.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
