import { getSubjectSlug } from "./chapters";
import type { SyllabusSubject } from "./syllabus-2026-27";

export type StreamInfo = {
  id: string;
  label: string;
  description: string;
  subjects: string[];
};

const CLASS_11_STREAMS: StreamInfo[] = [
  {
    id: "non-medical",
    label: "Non-Medical (PCM)",
    description:
      "Physics, Chemistry & Mathematics — ideal for JEE, engineering, and pure science careers.",
    subjects: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "English",
      "Computer Science",
      "Hindi",
      "Punjabi",
    ],
  },
  {
    id: "medical",
    label: "Medical (PCB)",
    description:
      "Physics, Chemistry & Biology — for NEET, medicine, pharmacy, and life sciences.",
    subjects: ["Physics", "Chemistry", "Biology", "English", "Hindi", "Punjabi"],
  },
  {
    id: "commerce",
    label: "Commerce",
    description:
      "Accountancy, Business Studies & Economics — for CA, CS, banking, and management.",
    subjects: [
      "Accountancy",
      "Business Studies",
      "Economics",
      "Mathematics",
      "English",
      "Informatics Practices",
      "Hindi",
      "Punjabi",
    ],
  },
  {
    id: "arts",
    label: "Arts / Humanities",
    description:
      "History, Political Science, Geography & more — for civil services, law, and liberal arts.",
    subjects: [
      "History",
      "Political Science",
      "Geography",
      "Economics",
      "Psychology",
      "Sociology",
      "English",
      "Hindi",
      "Punjabi",
    ],
  },
];

const CLASS_12_STREAMS: StreamInfo[] = [
  {
    id: "non-medical",
    label: "Non-Medical (PCM)",
    description:
      "Board exam + JEE preparation with Physics, Chemistry & Mathematics.",
    subjects: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "English",
      "Computer Science",
      "Hindi",
      "Punjabi",
    ],
  },
  {
    id: "medical",
    label: "Medical (PCB)",
    description:
      "Board exam + NEET preparation with Physics, Chemistry & Biology.",
    subjects: ["Physics", "Chemistry", "Biology", "English", "Hindi", "Punjabi"],
  },
  {
    id: "commerce",
    label: "Commerce",
    description:
      "Accountancy, Business Studies & Economics for board exams and professional courses.",
    subjects: [
      "Accountancy",
      "Business Studies",
      "Economics",
      "Mathematics",
      "English",
      "Informatics Practices",
      "Hindi",
      "Punjabi",
    ],
  },
  {
    id: "arts",
    label: "Arts / Humanities",
    description:
      "Humanities subjects for board exams, UPSC, law, journalism, and social sciences.",
    subjects: [
      "History",
      "Political Science",
      "Geography",
      "Economics",
      "Psychology",
      "Sociology",
      "English",
      "Hindi",
      "Punjabi",
    ],
  },
];

export function getStreamsForClass(classNumber: number): StreamInfo[] {
  if (classNumber === 11) return CLASS_11_STREAMS;
  if (classNumber === 12) return CLASS_12_STREAMS;
  return [];
}

export function getStreamSubjects(
  classNumber: number,
  streamId: string,
  syllabusSubjects: SyllabusSubject[]
): { name: string; slug: string; chapterCount: number }[] {
  const stream = getStreamsForClass(classNumber).find((s) => s.id === streamId);
  if (!stream) return [];

  const subjectMap = new Map(syllabusSubjects.map((s) => [s.name, s]));

  return stream.subjects
    .filter((name) => subjectMap.has(name))
    .map((name) => {
      const subject = subjectMap.get(name)!;
      return {
        name,
        slug: getSubjectSlug(name),
        chapterCount: subject.chapters.length,
      };
    });
}
