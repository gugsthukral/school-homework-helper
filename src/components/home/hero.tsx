import Link from "next/link";
import { GraduationCap, Mic, Paperclip, Sparkles, Star, Volume2 } from "lucide-react";
import { RegionalLanguagesBadge } from "@/components/shared/regional-languages-badge";
import { stats } from "@/lib/data";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/site-config";
import { SiteContainer } from "@/components/shared/site-container";
import { cn } from "@/lib/utils";

const heroFeatures = [
  {
    label: "Ask by Voice",
    icon: Mic,
  },
  {
    label: "Upload Homework Photo",
    icon: Paperclip,
  },
  {
    label: "Read Answer Aloud",
    icon: Volume2,
  },
] as const;

export function Hero() {
  return (
    <section className={cn("relative w-full overflow-hidden pb-16 sm:pb-20", SITE_HEADER_OFFSET_CLASS)}>
      <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-32 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />

      <SiteContainer className="relative">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="animate-fade-up text-center lg:text-left">
            <div className="home-pill mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-orange-500" />
              AI-Powered Learning for Every Student
            </div>

            <h1 className="home-section-title text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              Your Smart{" "}
              <span className="text-orange-500">School Homework Helper</span>
            </h1>

            <p className="home-section-subtitle mx-auto mt-5 max-w-xl text-lg leading-relaxed lg:mx-0">
              Eight AI tools for homework, essays, maths, quizzes, school projects, and more —
              built for students from Class 1 to Class 12. Learn smarter, not harder.
            </p>

            <RegionalLanguagesBadge className="mt-5" showDetail variant="light" centered />

            <div className="home-pastel-blue mt-8 rounded-2xl border px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6">
                {heroFeatures.map((feature) => (
                  <div
                    key={feature.label}
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-700 sm:justify-start"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-sky-100">
                      <feature.icon className="h-4 w-4 text-sky-500" aria-hidden />
                    </span>
                    {feature.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-sm text-slate-500">
                Trusted by students, parents &amp; teachers
              </p>
            </div>
          </div>

          <div className="relative lg:pt-6">
            <div className="home-card animate-float rounded-3xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-orange-100 text-2xl">
                  🤖
                </span>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">Hi! I&apos;m your AI study buddy.</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    I can explain your answer in easy words — step by step, in your language.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-left text-sm text-sky-800">
                Try: &ldquo;If 3x + 7 = 22, what is the value of x?&rdquo;
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-slate-50 p-4 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">Question</p>
                  <p className="mt-1 text-sm text-slate-700">
                    If 3x + 7 = 22, what is the value of x?
                  </p>
                </div>
                <div className="rounded-xl border border-sky-100 bg-white p-4 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">Step-by-step Solution</p>
                  <div className="mt-2 space-y-1.5 text-sm text-slate-600">
                    <p>Step 1: Subtract 7 from both sides → 3x = 15</p>
                    <p>Step 2: Divide both sides by 3 → x = 5</p>
                    <p className="font-semibold text-orange-500">Answer: x = 5</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 home-card hidden rounded-2xl px-5 py-3 sm:block">
              <p className="text-2xl font-bold text-orange-500">8</p>
              <p className="text-xs text-slate-500">AI Tools Ready</p>
            </div>
            <div className="absolute -right-2 -top-3 home-card hidden rounded-2xl px-5 py-3 sm:block">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-sky-500" />
                <p className="text-2xl font-bold text-sky-600">1–12</p>
              </div>
              <p className="text-xs text-slate-500">All Classes</p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="home-card rounded-2xl px-4 py-5 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400/40"
            >
              <p className="text-2xl font-bold text-slate-800 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">{stat.label}</p>
            </Link>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
