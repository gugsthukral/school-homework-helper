import { cn } from "@/lib/utils";
import type { ToolLearnMoreContent } from "@/lib/tool-learn-more";

type ToolLearnMoreProps = {
  content: ToolLearnMoreContent;
  className?: string;
};

const panelClass =
  "rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface-muted)] p-5";

export function ToolLearnMore({ content, className }: ToolLearnMoreProps) {
  return (
    <section className={cn("glass-card rounded-2xl p-6 sm:p-8", className)}>
      <h2 className="page-title text-xl font-bold sm:text-2xl">{content.title}</h2>
      <p className="page-description mt-2 max-w-3xl text-sm leading-relaxed sm:text-base">
        {content.intro}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className={panelClass}>
          <h3 className="page-title text-sm font-semibold">How to get the best answer</h3>
          <ul className="page-description mt-3 list-disc space-y-2 pl-5 text-sm">
            {content.howTo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={panelClass}>
          <h3 className="page-title text-sm font-semibold">Example prompts</h3>
          <ul className="mt-3 space-y-2">
            {content.examples.map((ex) => (
              <li
                key={ex}
                className="page-description rounded-xl border border-[var(--theme-border)] bg-[var(--theme-input-bg)] px-3 py-2 text-sm"
              >
                {ex}
              </li>
            ))}
          </ul>
        </div>

        <div className={panelClass}>
          <h3 className="page-title text-sm font-semibold">Academic integrity</h3>
          <p className="page-description mt-3 text-sm leading-relaxed">
            {content.integrity}
          </p>
        </div>
      </div>

      <div className={cn(panelClass, "mt-8")}>
        <h3 className="page-title text-sm font-semibold">FAQ</h3>
        <div className="mt-4 space-y-4">
          {content.faq.map((item) => (
            <div key={item.q}>
              <p className="page-title text-sm font-semibold">{item.q}</p>
              <p className="page-description mt-1 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

