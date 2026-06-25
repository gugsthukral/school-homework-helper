import { GraduationCap, Heart, Users, type LucideIcon } from "lucide-react";
import { RegionalLanguagesBadge } from "@/components/shared/regional-languages-badge";
import { audiences } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Heart,
  Users,
};

export function AudiencesSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="section-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-400">
            For Everyone
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Built for the Whole School Community
          </h2>
          <RegionalLanguagesBadge className="mt-6" centered />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {audiences.map((audience) => {
            const Icon = iconMap[audience.icon] ?? GraduationCap;
            return (
              <div
                key={audience.title}
                className="glass-card group rounded-2xl p-8 transition-all hover:-translate-y-1 hover:border-orange-400/20"
              >
                <span
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${audience.accent}`}
                >
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white">{audience.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sky-200/60">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
