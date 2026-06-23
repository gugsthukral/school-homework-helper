import type { BlogPost } from "@/lib/blog/types";
import { getSubjectSlug } from "@/lib/chapters";
import { ACADEMIC_SESSION, getSyllabusForClass } from "@/lib/syllabus-2026-27";
const AUTHOR = "School Homework Helper";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[''&]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toolForSubject(subject: string): { href: string; label: string } {
  const map: Record<string, { href: string; label: string }> = {
    Mathematics: { href: "/tools/math-solver", label: "Math Solver" },
    Science: { href: "/tools/science-projects", label: "Science Projects" },
    Physics: { href: "/tools/math-solver", label: "Math Solver" },
    Chemistry: { href: "/tools/homework-solver", label: "Homework Solver" },
    Biology: { href: "/tools/science-projects", label: "Science Projects" },
    English: { href: "/tools/essay-generator", label: "Essay Generator" },
    Hindi: { href: "/tools/grammar-checker", label: "Grammar Checker" },
    Punjabi: { href: "/tools/grammar-checker", label: "Grammar Checker" },
    EVS: { href: "/tools/homework-solver", label: "Homework Solver" },
    "Social Science": { href: "/tools/quiz-generator", label: "Quiz Generator" },
    "Social Studies": { href: "/tools/quiz-generator", label: "Quiz Generator" },
    Accountancy: { href: "/tools/homework-solver", label: "Homework Solver" },
    "Business Studies": { href: "/tools/homework-solver", label: "Homework Solver" },
    Economics: { href: "/tools/homework-solver", label: "Homework Solver" },
  };
  return map[subject] ?? { href: "/tools/homework-solver", label: "Homework Solver" };
}

function formatDate(classNumber: number, index: number): string {
  const month = ((classNumber + index) % 12) + 1;
  const day = ((classNumber * 3 + index * 7) % 26) + 1;
  return `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function readTimeForClass(classNumber: number, sectionCount: number): string {
  const base =
    classNumber <= 5 ? 5 : classNumber <= 8 ? 6 : classNumber <= 10 ? 7 : 8;
  const extra = Math.max(0, sectionCount - 5);
  const minutes = base + Math.floor(extra / 2);
  return `${minutes} min read`;
}

function defaultStudyTips(classNumber: number): string {
  if (classNumber <= 5) {
    return "• Study in short 20-minute sessions\n• Use pictures and real objects to understand concepts\n• Revise with fun quizzes and oral questions\n• Ask parents or teachers when a word is new";
  }
  if (classNumber <= 8) {
    return "• Make chapter-wise notes in a separate notebook\n• Solve NCERT exercises before reference books\n• Draw diagrams and label them clearly\n• Revise formulas and definitions every weekend";
  }
  if (classNumber <= 10) {
    return "• Follow a weekly timetable for all subjects\n• Solve sample papers and previous year questions\n• Focus on NCERT — most board questions come from it\n• Group study helps for Social Science and languages";
  }
  return "• Prioritise NCERT + PYQs for board and entrance exams\n• Maintain separate formula sheets for Maths/Science\n• Practice writing answers within word limits\n• Take mock tests under exam conditions";
}

function languageStudyTips(classNumber: number, subjectName: string): string | null {
  if (subjectName === "Hindi") {
    if (classNumber <= 5) {
      return "• वर्णमाला और मात्राएँ रोज़ पढ़ें\n• छोटे वाक्य लिखकर अभ्यास करें\n• कविता पाठ याद करें और बोलकर सुनाएँ\n• चित्र देखकर वर्णन लिखें";
    }
    if (classNumber <= 8) {
      return "• व्याकरण (संज्ञा, सर्वनाम, काल) के नियम नोटबुक में लिखें\n• अपठित गद्यांश रोज़ पढ़ें\n• निबंध और पत्र लेखन का अभ्यास करें\n• मुहावरे और लोकोक्तियाँ याद करें";
    }
    if (classNumber <= 10) {
      return "• NCERT पाठ्यपुस्तक दो बार पढ़ें\n• अपठित गद्यांश के अभ्यास प्रश्न हल करें\n• निबंध, पत्र और विज्ञापन लेखन का अभ्यास\n• बोर्ड परीक्षा के पिछले वर्ष के प्रश्न देखें";
    }
    return "• आरोह/वितान (या क्षितिज/कृतिका) के सभी पाठ पढ़ें\n• व्याकरण: वाच्य, समास, अलंकार पर फोकस\n• निबंध और पत्र लेखन का नियमित अभ्यास\n• अशुद्धि शोधन के प्रश्न रोज़ हल करें";
  }

  if (subjectName === "Punjabi") {
    if (classNumber <= 5) {
      return "• ਵਰਨਮਾਲਾ ਅਤੇ ਮਾਤਰਾਵਾਂ ਰੋਜ਼ ਪੜ੍ਹੋ\n• ਛੋਟੇ ਵਾਕ ਲਿਖ ਕੇ ਅਭਿਆਸ ਕਰੋ\n• ਕਵਿਤਾ ਪਾਠ ਯਾਦ ਕਰੋ ਅਤੇ ਬੋਲ ਕੇ ਸੁਣਾਓ\n• ਚਿੱਤਰ ਵੇਖ ਕੇ ਵਰਣਨ ਲਿਖੋ";
    }
    if (classNumber <= 8) {
      return "• ਵਿਆਕਰਣ (ਸੰਜਾ, ਸਰਵਨਾਮ, ਕਾਲ) ਦੇ ਨਿਯਮ ਨੋਟਬੁੱਕ ਵਿੱਚ ਲਿਖੋ\n• ਅਨਪਠਿਤ ਗਦ ਰੋਜ਼ ਪੜ੍ਹੋ\n• ਨਿਬੰਧ ਅਤੇ ਪੱਤਰ ਲੇਖਨ ਦਾ ਅਭਿਆਸ ਕਰੋ\n• ਮੁਹਾਵਰੇ ਅਤੇ ਅਖਾਣ ਯਾਦ ਕਰੋ";
    }
    if (classNumber <= 10) {
      return "• NCERT ਪਾਠ ਪੁਸਤਕ ਦੋ ਵਾਰ ਪੜ੍ਹੋ\n• ਅਨਪਠਿਤ ਗਦ ਦੇ ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ\n• ਨਿਬੰਧ, ਪੱਤਰ ਅਤੇ ਵਿਗਿਆਪਨ ਲੇਖਨ ਦਾ ਅਭਿਆਸ\n• ਬੋਰਡ ਪ੍ਰੀਖਿਆ ਦੇ ਪਿਛਲੇ ਸਾਲ ਦੇ ਪ੍ਰਸ਼ਨ ਵੇਖੋ";
    }
    return "• ਗੱਦ/ਕਾਵ ਸਾਹਿਤ ਦੇ ਸਾਰੇ ਪਾਠ ਪੜ੍ਹੋ\n• ਵਿਆਕਰਣ: ਵਾਚ, ਸਮਾਸ, ਅਲੰਕਾਰ 'ਤੇ ਧਿਆਨ ਦਿਓ\n• ਨਿਬੰਧ ਅਤੇ ਪੱਤਰ ਲੇਖਨ ਦਾ ਨਿਯਮਿਤ ਅਭਿਆਸ\n• ਅਸ਼ੁੱਧੀ ਸੋਧ ਦੇ ਪ੍ਰਸ਼ਨ ਰੋਜ਼ ਹੱਲ ਕਰੋ";
  }

  return null;
}

function subjectSlug(subjectName: string): string {
  return getSubjectSlug(subjectName);
}

function getSubjectFocusAreas(subjectName: string, classNumber: number, chapters: string[]): string {
  const first = chapters.slice(0, 3).join(", ");
  const maps: Record<string, string> = {
    Mathematics: `Focus on NCERT examples, formula application, and word problems. Key areas include ${first || "number systems, geometry, and algebra"} depending on your class level.`,
    English: `Reading comprehension, grammar rules, and writing formats (essays, letters, reports) are essential. Prioritise ${first || "literature and composition"}.`,
    Science: `Understand concepts with diagrams and experiments. Revise ${first || "physics, chemistry, and biology topics"} with numericals where applicable.`,
    Physics: `Master formulas, units, derivations, and numerical problems. Chapters like ${first || "mechanics and electricity"} need daily practice.`,
    Chemistry: `Balance chemical equations, learn reactions, and practise numericals on mole concept and stoichiometry. Start with ${first || "basic concepts"}.`,
    Biology: `Label diagrams, learn definitions, and understand processes. Focus on ${first || "cell biology, genetics, and human physiology"}.`,
    Hindi: `व्याकरण, लेखन (निबंध/पत्र), और अपठित गद्यांश — तीनों पर समान ध्यान दें।`,
    Punjabi: `ਵਿਆਕਰਣ, ਲੇਖਨ (ਨਿਬੰਧ/ਪੱਤਰ), ਅਤੇ ਅਨਪਠਿਤ ਗਦ — ਤਿੰਨਾਂ 'ਤੇ ਬਰਾਬਰ ਧਿਆਨ ਦਿਓ।`,
    EVS: `Connect topics to daily life — family, food, water, plants, and animals. Observe your surroundings while studying ${first || "EVS chapters"}.`,
    "Social Science": `Timeline events, map work, and key terms are crucial. Revise ${first || "history, geography, and civics"} chapter summaries.`,
    "Social Studies": `Learn map skills, important dates, and civics facts. Chapters on ${first || "community and citizenship"} build your foundation.`,
    Accountancy: `Practise journal entries, ledger posting, and financial statements. ${first || "Double-entry system"} must be crystal clear.`,
    "Business Studies": `Understand concepts with real business examples. Case-study based answers score well in ${first || "management and marketing"} topics.`,
    Economics: `Graphs, definitions, and numerical problems on statistics and micro/macro concepts. Revise ${first || "data presentation and national income"}.`,
  };
  return maps[subjectName] ?? `Revise all ${chapters.length} chapters systematically, starting with ${first || "the NCERT textbook"}.`;
}

function getExamQuestionTypes(subjectName: string, classNumber: number): string {
  if (classNumber <= 5) {
    return "• Short answer (1–2 marks)\n• Fill in the blanks\n• Match the following\n• Simple word problems\n• Picture-based questions";
  }
  if (subjectName === "Mathematics" || subjectName === "Physics") {
    return "• MCQs and assertion-reason\n• Short answer (2–3 marks)\n• Long answer with steps (4–5 marks)\n• Numerical problems\n• Prove/derive type questions (higher classes)";
  }
  if (subjectName === "English" || subjectName === "Hindi" || subjectName === "Punjabi") {
    return "• Reading comprehension / unseen passage\n• Grammar correction and fill-ups\n• Essay, letter, or report writing\n• Literature short and long answers\n• Value-based questions";
  }
  if (subjectName === "Science" || subjectName === "Biology" || subjectName === "Chemistry") {
    return "• MCQs and reasoning\n• Diagram-based questions (label & explain)\n• Numerical problems\n• Short definitions (2–3 marks)\n• Application-based long answers";
  }
  if (subjectName === "Social Science" || subjectName === "Social Studies") {
    return "• Map-based questions\n• Timeline and chronology\n• Short definitions and key terms\n• Source-based questions\n• Long answers (5 marks) with points";
  }
  return "• MCQs\n• Short answer questions (2–3 marks)\n• Long descriptive answers (5 marks)\n• Application-based problems\n• Case-study questions (Class 11–12)";
}

function getCommonMistakes(subjectName: string): string {
  const maps: Record<string, string> = {
    Mathematics: "• Skipping steps in solutions\n• Sign errors in algebra\n• Forgetting units in answers\n• Not reading word problems carefully\n• Copying answers without understanding the method",
    English: "• Spelling and punctuation errors\n• Writing off-topic in essays\n• Ignoring word limits\n• Not proofreading before submission\n• Confusing tenses in paragraphs",
    Science: "• Mixing up similar terms (speed/velocity)\n• Poorly labelled diagrams\n• Missing units in numericals\n• Not learning definitions precisely\n• Ignoring NCERT intext questions",
    Hindi: "• वर्तनी की गलतियाँ\n• समय की अशुद्धि (काल)\n• अपठित गद्यांश में अनुचित उत्तर\n• शब्द सीमा से अधिक लेखन",
    Punjabi: "• ਸ਼ਬਦ-ਜੋੜ ਦੀਆਂ ਗਲਤੀਆਂ\n• ਕਾਲ ਦੀਆਂ ਅਸ਼ੁੱਧੀਆਂ\n• ਅਨਪਠਿਤ ਗਦ ਵਿੱਚ ਗਲਤ ਉੱਤਰ\n• ਸ਼ਬਦ ਸੀਮਾ ਤੋਂ ਵੱਧ ਲਿਖਣਾ",
    "Social Science": "• Confusing dates and events\n• Incomplete map labelling\n• Writing paragraphs without points\n• Ignoring key terms from NCERT",
  };
  return maps[subjectName] ?? "• Leaving questions unanswered\n• Not revising before tests\n• Rote learning without understanding\n• Ignoring NCERT textbook exercises\n• Studying only one day before exams";
}

function getWeeklySchedule(classNumber: number, subjectName: string): string {
  const sessions = classNumber <= 5 ? 3 : classNumber <= 8 ? 4 : 5;
  return `**Suggested weekly plan (${sessions} sessions):**\n\n• **Session 1:** Read new chapter from NCERT\n• **Session 2:** Solve textbook exercises\n• **Session 3:** Revise notes + attempt 5 extra questions\n${sessions >= 4 ? "• **Session 4:** Practice writing answers / diagrams\n" : ""}${sessions >= 5 ? "• **Session 5:** Weekly test + fix weak areas\n" : ""}\nConsistency beats cramming — ${sessions} focused sessions per week for ${subjectName} is ideal for Class ${classNumber}.`;
}

function getParentTips(classNumber: number): string | null {
  if (classNumber > 5) return null;
  return "• Sit with your child for 15–20 minutes during study time\n• Ask them to explain what they learned in their own words\n• Praise effort, not just correct answers\n• Keep a fixed homework routine after school\n• Use our AI tools together to understand difficult questions";
}

function buildSubjectGuidePost(
  classNumber: number,
  subjectName: string,
  index: number
): BlogPost {
  const syllabus = getSyllabusForClass(classNumber);
  const subject = syllabus.find((s) => s.name === subjectName);
  const chapters = subject?.chapters ?? [];
  const tool = toolForSubject(subjectName);
  const classSlug = `class-${classNumber}`;
  const slug = `${classSlug}-${slugify(subjectName)}-study-guide`;
  const chapterList = chapters.map((c, i) => `${i + 1}. ${c}`).join("\n");
  const studyTips = languageStudyTips(classNumber, subjectName) ?? defaultStudyTips(classNumber);
  const subjectPath = `/classes/${classSlug}/${subjectSlug(subjectName)}`;
  const parentTips = getParentTips(classNumber);

  const sections: BlogPost["sections"] = [
    {
      heading: `Why Class ${classNumber} ${subjectName} Matters`,
      content: `Class ${classNumber} ${subjectName} is a core part of the CBSE (NCERT) syllabus for academic session ${ACADEMIC_SESSION}. Strong performance in this subject improves your overall percentage and builds skills needed in higher classes.\n\nWhether you are preparing for weekly tests, half-yearly exams, or ${classNumber >= 10 ? "board exams" : "annual exams"}, this guide gives you a complete roadmap — syllabus, study plan, common mistakes, and free AI homework help.`,
    },
    {
      heading: "Complete Syllabus — All Chapters",
      content: `The ${ACADEMIC_SESSION} NCERT syllabus for Class ${classNumber} ${subjectName} includes **${chapters.length} chapters**:\n\n${chapterList}\n\nEach chapter is available on our website with notes, key topics, and chapter-wise AI help.`,
    },
    {
      heading: "Important Topics to Focus On",
      content: getSubjectFocusAreas(subjectName, classNumber, chapters),
    },
    {
      heading: "Weekly Study Schedule",
      content: getWeeklySchedule(classNumber, subjectName),
    },
    {
      heading: "How to Study Effectively",
      content: studyTips,
    },
    {
      heading: "Types of Exam Questions",
      content: `Class ${classNumber} ${subjectName} exams typically include:\n\n${getExamQuestionTypes(subjectName, classNumber)}\n\nPractise each type using NCERT exercises and sample papers. Time yourself to build exam speed.`,
    },
    {
      heading: "Common Mistakes to Avoid",
      content: getCommonMistakes(subjectName),
    },
    {
      heading: "Homework & Exam Preparation",
      content:
        classNumber >= 10
          ? `**Board exam checklist:**\n• Complete NCERT textbook twice\n• Solve previous 5 years' board papers\n• Make formula/definition sheets\n• Attempt full-length mock tests\n• Revise weak chapters every weekend\n\nUse our ${tool.label} for step-by-step help on questions you cannot solve alone.`
          : `**Before every test:**\n• Revise chapter summaries and highlighted notes\n• Attempt at least 5 questions per chapter\n• Review mistakes from previous tests\n• Focus on diagrams, formulas, and definitions\n\nOur ${tool.label} explains answers in simple, class-appropriate language.`,
    },
    {
      heading: "Resources on School Homework Helper",
      content: `• **Class hub:** /classes/${classSlug}\n• **Subject page:** ${subjectPath}\n• **AI tool:** ${tool.href} (${tool.label})\n• **Blog:** More study guides at /blog\n\nBookmark these pages for quick access during homework and revision.`,
    },
    {
      heading: "Get AI Help for This Subject",
      content: `Stuck on Class ${classNumber} ${subjectName} homework? Open our ${tool.label}, select Class ${classNumber}, paste your question, and get instant step-by-step explanations.\n\nYou can also browse every chapter with notes and key topics on our Class ${classNumber} ${subjectName} page.`,
    },
  ];

  if (parentTips) {
    sections.splice(6, 0, {
      heading: "Tips for Parents",
      content: parentTips,
    });
  }

  return {
    slug,
    title: `Class ${classNumber} ${subjectName} Study Guide (${ACADEMIC_SESSION})`,
    category: subjectName,
    readTime: readTimeForClass(classNumber, sections.length),
    excerpt: `Complete Class ${classNumber} ${subjectName} guide for CBSE ${ACADEMIC_SESSION} — full syllabus, weekly plan, exam tips, and AI homework help.`,
    publishedAt: formatDate(classNumber, index),
    author: AUTHOR,
    sections,
  };
}

const SCIENCE_SUBJECTS_BY_CLASS: Record<number, string[]> = {
  1: ["EVS"],
  2: ["EVS"],
  3: ["EVS", "Science"],
  4: ["EVS", "Science"],
  5: ["EVS", "Science"],
  6: ["Science"],
  7: ["Science"],
  8: ["Science"],
  9: ["Science"],
  10: ["Science"],
  11: ["Physics", "Chemistry", "Biology"],
  12: ["Physics", "Chemistry", "Biology"],
};

const HINDI_CLASSES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const PUNJABI_CLASSES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const SOCIAL_CLASSES = [3, 4, 5, 6, 7, 8, 9, 10];

export function buildGeneratedBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  let index = 0;

  for (let classNumber = 1; classNumber <= 12; classNumber++) {
    posts.push(buildSubjectGuidePost(classNumber, "Mathematics", index++));
    posts.push(buildSubjectGuidePost(classNumber, "English", index++));
  }

  for (let classNumber = 1; classNumber <= 12; classNumber++) {
    const subjects = SCIENCE_SUBJECTS_BY_CLASS[classNumber] ?? [];
    for (const subject of subjects) {
      posts.push(buildSubjectGuidePost(classNumber, subject, index++));
    }
  }

  for (const classNumber of HINDI_CLASSES) {
    posts.push(buildSubjectGuidePost(classNumber, "Hindi", index++));
  }

  for (const classNumber of PUNJABI_CLASSES) {
    const syllabus = getSyllabusForClass(classNumber);
    if (syllabus.some((s) => s.name === "Punjabi")) {
      posts.push(buildSubjectGuidePost(classNumber, "Punjabi", index++));
    }
  }

  for (const classNumber of SOCIAL_CLASSES) {
    const subjectName =
      classNumber <= 5 ? "Social Studies" : "Social Science";
    const syllabus = getSyllabusForClass(classNumber);
    if (syllabus.some((s) => s.name === subjectName)) {
      posts.push(buildSubjectGuidePost(classNumber, subjectName, index++));
    }
  }

  for (const classNumber of [11, 12]) {
    for (const subject of ["Accountancy", "Business Studies", "Economics"]) {
      const syllabus = getSyllabusForClass(classNumber);
      if (syllabus.some((s) => s.name === subject)) {
        posts.push(buildSubjectGuidePost(classNumber, subject, index++));
      }
    }
  }

  return posts;
}
