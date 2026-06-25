import Link from "next/link";
import { classes } from "@/lib/data";
import { SiteContainer } from "@/components/shared/site-container";

export function ClassesSection() {
  return (
    <section id="classes" className="w-full bg-white py-16 sm:py-20">
      <SiteContainer>
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Classes
          </span>
          <h2 className="home-section-title mt-3 text-3xl font-bold sm:text-4xl">
            Help for Every Class
          </h2>
          <p className="home-section-subtitle mx-auto mt-4 max-w-2xl">
            From Class 1 basics to Class 12 board exam prep — find resources tailored
            to your grade level.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {classes.map((cls) => (
            <Link
              key={cls.number}
              href={cls.href}
              className="home-card group flex min-h-[4.5rem] flex-col items-center justify-center rounded-2xl px-3 py-4 text-center transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg"
            >
              <span className="text-sm font-semibold text-navy-900 transition-colors group-hover:text-orange-500 sm:text-base">
                {cls.label}
              </span>
            </Link>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
