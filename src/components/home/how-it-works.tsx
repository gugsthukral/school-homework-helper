import { steps } from "@/lib/data";
import { ColorfulStepIcon } from "@/components/shared/colorful-icons";
import { RegionalLanguagesBadge } from "@/components/shared/regional-languages-badge";
import { SiteContainer } from "@/components/shared/site-container";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full bg-white py-16 sm:py-20">
      <SiteContainer>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            How It Works
          </span>
          <h2 className="home-section-title mt-3 text-3xl font-bold sm:text-4xl">
            Get Help in 3 Simple Steps
          </h2>
          <p className="home-section-subtitle mt-4">
            No complicated setup. Just pick a tool, ask your question, and learn.
          </p>
          <RegionalLanguagesBadge className="mt-6" centered variant="light" />
        </div>

        <div className="relative mt-12 grid gap-8 md:grid-cols-3">
          <div className="pointer-events-none absolute top-20 hidden h-0.5 w-full bg-gradient-to-r from-transparent via-orange-200 to-transparent md:block" />

          {steps.map((item, index) => (
            <div key={item.step} className="home-card relative rounded-2xl p-8 text-center">
              <div className="mb-5 flex justify-center">
                <ColorfulStepIcon icon={item.icon} step={item.step} size={60} />
              </div>
              <h3 className="text-xl font-semibold text-navy-900">{item.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
                {item.description}
              </p>
              {index < steps.length - 1 && (
                <div className="mx-auto mt-6 h-8 w-px bg-gradient-to-b from-orange-200 to-transparent md:hidden" />
              )}
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
