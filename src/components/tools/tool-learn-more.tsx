import { cn } from "@/lib/utils";
import type { ToolLearnMoreContent } from "@/lib/tool-learn-more";

type ToolLearnMoreProps = {
  content: ToolLearnMoreContent;
  className?: string;
};

export function ToolLearnMore({ content, className }: ToolLearnMoreProps) {
  return (
    <section className={cn("glass-card rounded-2xl p-6 sm:p-8", className)}>
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{content.title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
        {content.intro}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white/60 p-5">
          <h3 className="text-sm font-semibold text-slate-900">How to get the best answer</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
            {content.howTo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/60 p-5">
          <h3 className="text-sm font-semibold text-slate-900">Example prompts</h3>
          <ul className="mt-3 space-y-2">
            {content.examples.map((ex) => (
              <li key={ex} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                {ex}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/60 p-5">
          <h3 className="text-sm font-semibold text-slate-900">Academic integrity</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {content.integrity}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white/60 p-5">
        <h3 className="text-sm font-semibold text-slate-900">FAQ</h3>
        <div className="mt-4 space-y-4">
          {content.faq.map((item) => (
            <div key={item.q}>
              <p className="text-sm font-semibold text-slate-900">{item.q}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

