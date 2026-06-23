import Link from "next/link";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  HelpCircle,
  PenLine,
  SpellCheck,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { aiTools } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  PenLine,
  Calculator,
  HelpCircle,
  SpellCheck,
  FlaskConical,
};

export function ToolsSection() {
  return (
    <section id="tools" className="relative py-20 sm:py-28">
      <div className="section-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-400">
            AI Tools
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Six Powerful Tools, One Platform
          </h2>
          <p className="mt-4 text-sky-200/70">
            Everything you need for homework, exams, and learning — powered by AI and
            tailored to your class level.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiTools.map((tool) => {
            const Icon = iconMap[tool.icon] ?? BookOpen;
            return (
              <Link
                key={tool.name}
                href={tool.href}
                className="group glass-card relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:shadow-xl hover:shadow-sky-400/10"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 transition-opacity group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="mb-4 flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950/60 ring-1 ring-sky-400/20">
                      <Icon className={`h-6 w-6 ${tool.accent}`} />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-sky-400/40 transition-all group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sky-200/60">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-orange-400 opacity-0 transition-opacity group-hover:opacity-100">
                    Try now →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
