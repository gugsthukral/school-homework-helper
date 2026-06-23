import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-sky-400/20 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-300">
              <Sparkles className="h-4 w-4" />
              Free to get started
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Ace Your Homework?
            </h2>
            <p className="mt-4 text-lg text-sky-200/70">
              Join thousands of students using School Homework Helper to learn faster,
              understand better, and score higher.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#tools"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-orange-500/30 transition-all hover:scale-105 sm:w-auto"
              >
                Start Learning Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex w-full items-center justify-center rounded-full border border-sky-400/30 px-8 py-3.5 text-base font-semibold text-sky-200 transition-colors hover:border-sky-400/50 hover:text-white sm:w-auto"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
