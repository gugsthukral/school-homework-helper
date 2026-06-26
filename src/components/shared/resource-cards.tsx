import Link from "next/link";
import type { aiTools } from "@/lib/data";
import { ColorfulToolIcon } from "@/components/shared/colorful-icons";
import { GlowButtonShell } from "@/components/motion-primitives/glow-button-shell";

type Tool = (typeof aiTools)[number];

export function ToolCardGrid({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <Link
          key={tool.name}
          href={tool.href}
          className="group glass-card flex h-full flex-col rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400/40"
        >
          <ColorfulToolIcon icon={tool.icon} size={48} />
          <h3 className="mt-4 font-semibold text-slate-900">{tool.name}</h3>
          <p className="mt-1 flex-1 text-sm text-slate-500">{tool.description}</p>
          <GlowButtonShell className="mt-4 w-full">
            <span className="px-4 py-2.5 text-sm font-semibold text-orange-600">Try now</span>
          </GlowButtonShell>
        </Link>
      ))}
    </div>
  );
}

export function TopicPills({ topics }: { topics: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <span
          key={topic}
          className="rounded-full border border-slate-200 bg-sky-50 px-3 py-1 text-sm text-slate-700"
        >
          {topic}
        </span>
      ))}
    </div>
  );
}
