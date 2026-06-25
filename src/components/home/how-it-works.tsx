import { steps } from "@/lib/data";
import { RegionalLanguagesBadge } from "@/components/shared/regional-languages-badge";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-400">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Get Help in 3 Simple Steps
          </h2>
          <p className="mt-4 text-sky-200/70">
            No complicated setup. Just pick a tool, ask your question, and learn.
          </p>
          <RegionalLanguagesBadge className="mt-6" centered />
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div className="pointer-events-none absolute top-16 hidden h-0.5 w-full bg-gradient-to-r from-transparent via-sky-400/30 to-transparent md:block" />

          {steps.map((item, index) => (
            <div key={item.step} className="relative text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-orange-500 text-xl font-bold text-white shadow-lg shadow-sky-400/20">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-sky-200/60">
                {item.description}
              </p>
              {index < steps.length - 1 && (
                <div className="mx-auto mt-6 h-8 w-px bg-gradient-to-b from-sky-400/50 to-transparent md:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
