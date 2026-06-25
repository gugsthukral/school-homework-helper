import type { aiTools } from "@/lib/data";
import { ColorfulToolIcon } from "@/components/shared/colorful-icons";
import { TryNowButton } from "@/components/shared/try-now-button";

type Tool = (typeof aiTools)[number];

export function ToolCardGrid({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <div
          key={tool.name}
          className="group glass-card flex h-full flex-col rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <ColorfulToolIcon icon={tool.icon} size={48} />
          <h3 className="mt-4 font-semibold text-slate-900">{tool.name}</h3>
          <p className="mt-1 flex-1 text-sm text-slate-500">{tool.description}</p>
          <TryNowButton href={tool.href} className="mt-4" />
        </div>
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
