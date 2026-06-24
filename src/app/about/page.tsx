import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Heart, Sparkles, Target, Users, Zap } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { aiTools, stats } from "@/lib/data";
import { PAGE_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.about);

const values = [
  {
    icon: Target,
    title: "Student-First Learning",
    description: "Every explanation is tailored to the student's class level with simple, clear language.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Help",
    description: "Six smart tools that explain, generate, and check — not just give answers.",
  },
  {
    icon: Heart,
    title: "Free to Start",
    description: "Students can begin learning immediately with free AI tools — no barriers to education.",
  },
  {
    icon: Users,
    title: "For Everyone",
    description: "Built for students, supported by parents, and useful for teachers and tutors.",
  },
];

export default function AboutPage() {
  return (
    <PageLayout
      badge="About Us"
      title="Helping Every Student Learn Smarter"
      description="School Homework Helper is an AI-powered education platform designed for Indian students from Class 1 to Class 12."
      backHref="/"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="leading-relaxed text-sky-200/70">
            We believe every student deserves clear, patient explanations — not just answers.
            School Homework Helper uses AI to break down homework into step-by-step solutions
            that students can actually understand and learn from.
          </p>
          <p className="leading-relaxed text-sky-200/70">
            From Class 1 counting to Class 12 board exam prep, our platform grows with students
            across Mathematics, Science, English, Hindi, Punjabi, and Social Studies.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {stats.map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="glass-card rounded-xl px-4 py-4 text-center transition-all hover:scale-105 hover:border-sky-400/30 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-sky-300/60">{stat.label}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-card flex flex-col items-center justify-center rounded-2xl p-8 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-orange-500 shadow-xl shadow-sky-400/20">
            <GraduationCap className="h-10 w-10 text-white" />
          </span>
          <h3 className="mt-6 text-xl font-bold text-white">School Homework Helper</h3>
          <p className="mt-2 text-sm text-sky-300/60">AI School Hub for Classes 1–12</p>
          <Link
            href="/tools/homework-solver"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
          >
            <Zap className="h-4 w-4" />
            Try AI Tools Free
          </Link>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold text-white">What We Believe</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((item) => (
            <div key={item.title} className="glass-card rounded-2xl p-6">
              <item.icon className="h-8 w-8 text-sky-400" />
              <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sky-200/60">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-2 text-2xl font-bold text-white">Our AI Tools</h2>
        <p className="mb-6 text-sky-200/60">Eight tools to help with every type of schoolwork.</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {aiTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="glass-card rounded-xl px-5 py-4 transition-all hover:border-sky-400/30 hover:text-orange-400"
            >
              <h3 className="font-medium text-white">{tool.name}</h3>
              <p className="mt-1 text-xs text-sky-300/50">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
