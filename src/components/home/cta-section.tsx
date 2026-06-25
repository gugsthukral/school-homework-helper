import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { RegionalLanguagesBadge } from "@/components/shared/regional-languages-badge";
import { SiteContainer } from "@/components/shared/site-container";

export function CtaSection() {
  return (
    <section className="home-pastel-orange w-full border-y border-orange-100 py-16 sm:py-20">
      <SiteContainer>
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="home-pill mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-orange-500" />
            Free to get started
          </div>
          <h2 className="home-section-title text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ready to Ace Your Homework?
          </h2>
          <p className="home-section-subtitle mt-4 text-lg">
            Join thousands of students using School Homework Helper to learn faster,
            understand better, and score higher.
          </p>
          <RegionalLanguagesBadge className="mt-6" centered showDetail variant="light" />
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#tools"
              className="home-btn-primary group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Start Learning Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-base font-semibold text-navy-900 transition-colors hover:border-orange-300 hover:text-orange-500 sm:w-auto"
            >
              Learn More
            </Link>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
