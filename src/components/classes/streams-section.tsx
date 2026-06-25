import Link from "next/link";
import { ChevronRight, GraduationCap } from "lucide-react";
import { getSubjectPath, getSubjectSlug } from "@/lib/chapters";
import { getStreamsForClass } from "@/lib/streams-2026-27";
import { ACADEMIC_SESSION } from "@/lib/syllabus-2026-27";

type StreamsSectionProps = {
  classSlug: string;
  classNumber: number;
};

const streamColors: Record<string, string> = {
  "non-medical": "from-sky-400/20 to-sky-400/5 border-sky-400/25",
  medical: "from-emerald-400/20 to-emerald-400/5 border-emerald-400/25",
  commerce: "from-orange-500/20 to-orange-500/5 border-orange-500/25",
  arts: "from-violet-400/20 to-violet-400/5 border-violet-400/25",
};

export function StreamsSection({ classSlug, classNumber }: StreamsSectionProps) {
  const streams = getStreamsForClass(classNumber);
  if (streams.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-start gap-3">
        <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-orange-400" />
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Choose Your Stream — Session {ACADEMIC_SESSION}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            CBSE senior secondary streams: Non-Medical (PCM), Medical (PCB), Commerce, and Arts.
            Select your stream to browse subject-wise chapters.
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className={`glass-card overflow-hidden rounded-2xl border bg-gradient-to-br ${streamColors[stream.id] ?? "border-slate-200"}`}
          >
            <div className="border-b border-slate-200 px-5 py-4">
              <h3 className="font-semibold text-slate-900">{stream.label}</h3>
              <p className="mt-1 text-xs text-slate-500">{stream.description}</p>
            </div>
            <ul className="divide-y divide-sky-400/10">
              {stream.subjects.map((subjectName) => {
                const subjectSlug = getSubjectSlug(subjectName);

                return (
                  <li key={subjectName}>
                    <Link
                      href={getSubjectPath(classSlug, subjectSlug)}
                      className="group flex items-center justify-between px-5 py-3 text-sm transition-colors hover:bg-sky-400/5"
                    >
                      <span className="text-slate-600 group-hover:text-slate-900">
                        {subjectName}
                      </span>
                      <ChevronRight className="h-4 w-4 text-sky-400/30 group-hover:text-orange-400" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
