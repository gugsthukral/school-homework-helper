import {
  Atom,
  BookOpen,
  Calculator,
  FlaskConical,
  HelpCircle,
  Languages,
  MessageCircleQuestion,
  PenLine,
  Sigma,
  SpellCheck,
  Globe2,
  SquareFunction,
  Type,
  type LucideIcon,
} from "lucide-react";
import type { aiTools } from "@/lib/data";
import { TryNowButton } from "@/components/shared/try-now-button";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  PenLine,
  Calculator,
  HelpCircle,
  SpellCheck,
  FlaskConical,
  Sigma,
  Atom,
  Languages,
  Type,
  Globe2,
  MessageCircleQuestion,
  SquareFunction,
};

type Tool = (typeof aiTools)[number];

export function ToolCardGrid({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => {
        const Icon = iconMap[tool.icon] ?? BookOpen;
        return (
          <div
            key={tool.name}
            className="group glass-card flex h-full flex-col rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-sky-400/30"
          >
            <div className="flex flex-1 items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950/60 ring-1 ring-sky-400/20">
                <Icon className={`h-5 w-5 ${tool.accent}`} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white">{tool.name}</h3>
                <p className="mt-1 text-sm text-sky-200/60">{tool.description}</p>
              </div>
            </div>
            <TryNowButton href={tool.href} className="mt-4" />
          </div>
        );
      })}
    </div>
  );
}

export function TopicPills({ topics }: { topics: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <span
          key={topic}
          className="rounded-full border border-sky-400/20 bg-sky-400/5 px-3 py-1 text-sm text-sky-200/80"
        >
          {topic}
        </span>
      ))}
    </div>
  );
}
