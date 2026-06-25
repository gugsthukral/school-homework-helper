import {
  BookOpen,
  Calculator,
  FlaskConical,
  HelpCircle,
  MessageCircleQuestion,
  PenLine,
  SpellCheck,
  SquareFunction,
  type LucideIcon,
} from "lucide-react";
import { aiTools } from "@/lib/data";
import { RegionalLanguagesBadge } from "@/components/shared/regional-languages-badge";
import { TryNowButton } from "@/components/shared/try-now-button";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  PenLine,
  Calculator,
  HelpCircle,
  SpellCheck,
  FlaskConical,
  SquareFunction,
  MessageCircleQuestion,
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
            Eight Powerful Tools, One Platform
          </h2>
          <p className="mt-4 text-sky-200/70">
            Everything you need for homework, exams, and learning — powered by AI and
            tailored to your class level.
          </p>
          <RegionalLanguagesBadge className="mt-6" centered />
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {aiTools.map((tool) => {
            const Icon = iconMap[tool.icon] ?? BookOpen;
            return (
              <div
                key={tool.name}
                className="group glass-card relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:shadow-xl hover:shadow-sky-400/10"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 transition-opacity group-hover:opacity-100`}
                />
                <div className="relative flex flex-1 flex-col">
                  <div className="mb-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950/60 ring-1 ring-sky-400/20">
                      <Icon className={`h-6 w-6 ${tool.accent}`} />
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-sky-200/60">
                    {tool.description}
                  </p>
                  <TryNowButton href={tool.href} className="relative mt-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
