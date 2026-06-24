import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { stats } from "@/lib/data";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className={cn("relative overflow-hidden pb-20 sm:pb-24 md:pb-28", SITE_HEADER_OFFSET_CLASS)}>
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-sm text-sky-300">
              <Sparkles className="h-4 w-4 text-orange-400" />
              AI-Powered Learning for Every Student
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Smart{" "}
              <span className="gradient-text">School Homework Helper</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sky-200/70 lg:mx-0">
              Eight AI tools for homework, essays, maths, quizzes, school projects, and more —
              built for students from Class 1 to Class 12. Learn smarter, not harder.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/tools/homework-solver"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-orange-500/30 transition-all hover:scale-105 hover:shadow-orange-500/50 sm:w-auto"
              >
                Try AI Tools Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#classes"
                className="inline-flex w-full items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/5 px-8 py-3.5 text-base font-semibold text-sky-200 transition-all hover:border-sky-400/50 hover:bg-sky-400/10 sm:w-auto"
              >
                Browse by Class
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-sm text-sky-200/60">
                Trusted by students, parents &amp; teachers
              </p>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="animate-float glass-card relative rounded-3xl p-6 shadow-2xl shadow-sky-400/10">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-orange-400" />
                <div className="h-3 w-3 rounded-full bg-sky-400" />
                <div className="h-3 w-3 rounded-full bg-sky-300/50" />
                <span className="ml-2 text-xs text-sky-300/50">Homework Solver</span>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl bg-navy-950/60 p-4">
                  <p className="text-xs font-medium text-orange-400">Question</p>
                  <p className="mt-1 text-sm text-sky-100">
                    If 3x + 7 = 22, what is the value of x?
                  </p>
                </div>
                <div className="rounded-xl border border-sky-400/20 bg-sky-400/5 p-4">
                  <p className="text-xs font-medium text-sky-400">Step-by-step Solution</p>
                  <div className="mt-2 space-y-2 text-sm text-sky-200/80">
                    <p>Step 1: Subtract 7 from both sides → 3x = 15</p>
                    <p>Step 2: Divide both sides by 3 → x = 5</p>
                    <p className="font-semibold text-orange-400">Answer: x = 5</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl px-5 py-3 shadow-xl">
              <p className="text-2xl font-bold text-orange-400">8</p>
              <p className="text-xs text-sky-300/70">AI Tools Ready</p>
            </div>
            <div className="absolute -right-4 -top-4 glass-card rounded-2xl px-5 py-3 shadow-xl">
              <p className="text-2xl font-bold text-sky-400">1–12</p>
              <p className="text-xs text-sky-300/70">All Classes</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="glass-card rounded-2xl px-4 py-5 text-center transition-all hover:scale-105 hover:border-sky-400/30 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
            >
              <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-sky-300/60 sm:text-sm">{stat.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
