import Link from "next/link";
import { subjects } from "@/lib/data";
import { RegionalLanguagesBadge } from "@/components/shared/regional-languages-badge";
import { SubjectIcon } from "@/components/shared/subject-icon";
import { SiteContainer } from "@/components/shared/site-container";

export function SubjectsSection() {
  return (
    <section id="subjects" className="relative w-full py-16 sm:py-20">
      <SiteContainer>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Subjects
          </span>
          <h2 className="home-section-title mt-3 text-3xl font-bold sm:text-4xl">
            All Major Subjects Covered
          </h2>
          <p className="home-section-subtitle mt-4">
            Mathematics, Science, English, Hindi, Punjabi, Computer, and Social Studies — all in one place.
          </p>
          <RegionalLanguagesBadge className="mt-6" centered variant="light" />
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subjects.map((subject) => (
            <Link
              key={subject.name}
              href={subject.href}
              className="home-card group flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <SubjectIcon icon={subject.icon} size={52} />
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{subject.name}</h3>
                <p className="text-sm text-slate-500">Homework help &amp; resources</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/subjects"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-orange-300 hover:text-orange-500"
          >
            View More
          </Link>
        </div>
      </SiteContainer>
    </section>
  );
}
