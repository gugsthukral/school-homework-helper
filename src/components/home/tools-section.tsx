import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aiTools } from "@/lib/data";
import { ColorfulToolIcon } from "@/components/shared/colorful-icons";
import { RegionalLanguagesBadge } from "@/components/shared/regional-languages-badge";
import { SiteContainer } from "@/components/shared/site-container";

export function ToolsSection() {
  return (
    <section id="tools" className="w-full py-16 sm:py-20">
      <SiteContainer>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            AI Tools
          </span>
          <h2 className="home-section-title mt-3 text-3xl font-bold sm:text-4xl">
            Eight Powerful Tools, One Platform
          </h2>
          <p className="home-section-subtitle mt-4">
            Everything you need for homework, exams, and learning — powered by AI and
            tailored to your class level.
          </p>
          <RegionalLanguagesBadge className="mt-6" centered variant="light" />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {aiTools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="home-card group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400/40"
            >
              <ColorfulToolIcon icon={tool.icon} size={52} />
              <h3 className="mt-4 text-lg font-semibold text-slate-800">{tool.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                {tool.description}
              </p>
              <span className="home-link-action mt-5 inline-flex items-center gap-1 text-sm transition-transform group-hover:gap-2">
                Try now
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
