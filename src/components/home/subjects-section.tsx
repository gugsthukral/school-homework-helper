import Link from "next/link";
import { subjects } from "@/lib/data";
import { RegionalLanguagesBadge } from "@/components/shared/regional-languages-badge";
import { SubjectIcon } from "@/components/shared/subject-icon";

export function SubjectsSection() {
  return (
    <section id="subjects" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-navy-800/30 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-400">
            Subjects
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            All Major Subjects Covered
          </h2>
          <p className="mt-4 text-sky-200/70">
            Mathematics, Science, English, Hindi, Punjabi, Computer, and Social Studies — all in one place.
          </p>
          <RegionalLanguagesBadge className="mt-6" centered />
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Link
              key={subject.name}
              href={subject.href}
              className={`group flex items-center gap-4 rounded-2xl border bg-navy-900/40 p-5 transition-all hover:-translate-y-0.5 hover:bg-navy-800/50 hover:shadow-lg ${subject.color}`}
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-orange-500/10">
                <SubjectIcon
                  icon={subject.icon}
                  className="h-7 w-7 text-sky-400 transition-colors group-hover:text-orange-400"
                />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">{subject.name}</h3>
                <p className="text-sm text-sky-300/50">Homework help &amp; resources</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/subjects"
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 px-6 py-2.5 text-sm font-medium text-sky-300 transition-colors hover:border-orange-400/50 hover:text-orange-400"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
