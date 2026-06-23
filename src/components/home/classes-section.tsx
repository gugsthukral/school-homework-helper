import Link from "next/link";
import { classes } from "@/lib/data";

export function ClassesSection() {
  return (
    <section id="classes" className="relative py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-400">
            Classes
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Help for Every Class
          </h2>
          <p className="mt-4 max-w-xl text-sky-200/70">
            From Class 1 basics to Class 12 board exam prep — find resources tailored
            to your grade level.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:gap-4">
          {classes.map((cls) => (
            <Link
              key={cls.number}
              href={cls.href}
              className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border border-sky-400/15 bg-navy-900/50 transition-all hover:-translate-y-1 hover:border-orange-400/40 hover:bg-navy-800/60 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <span className="text-2xl font-bold text-white transition-colors group-hover:text-orange-400 sm:text-3xl">
                {cls.number}
              </span>
              <span className="mt-1 text-[10px] font-medium text-sky-300/50 sm:text-xs">
                Class
              </span>
              <div className="absolute inset-x-0 bottom-0 h-1 scale-x-0 bg-gradient-to-r from-sky-400 to-orange-400 transition-transform group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
