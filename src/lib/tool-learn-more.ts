export type ToolLearnMoreKey =
  | "ask-anything"
  | "homework-solver"
  | "essay-generator"
  | "math-solver"
  | "calculator"
  | "quiz-generator"
  | "science-projects"
  | "grammar-checker";

export type ToolLearnMoreContent = {
  title: string;
  intro: string;
  howTo: string[];
  examples: string[];
  integrity: string;
  faq: Array<{ q: string; a: string }>;
};

const COMMON_INTEGRITY =
  "Use the answer to understand the topic, then write your final work in your own words. If this is graded homework, ask for steps and reasoning—not just the final answer.";

const content: Record<ToolLearnMoreKey, ToolLearnMoreContent> = {
  "ask-anything": {
    title: "Learn better with your AI tutor",
    intro:
      "Ask any school question and get a clear explanation with steps, examples, and quick revision tips—tailored to your class level.",
    howTo: [
      "Start with your class/grade (e.g., “Class 7”).",
      "Mention the subject and the exact question.",
      "Tell us what you’re stuck on (formula, concept, steps, etc.).",
      "Ask for a short summary at the end for revision.",
    ],
    examples: [
      "Class 8 Science: Explain photosynthesis in simple words with a diagram description.",
      "Class 10 Maths: Solve \(x^2 - 5x + 6 = 0\) step-by-step and show factorization.",
      "Class 6 English: Make 10 sentences using “since” and “for”.",
    ],
    integrity: COMMON_INTEGRITY,
    faq: [
      {
        q: "Can I ask in Hindi or other languages?",
        a: "Yes—ask in your preferred language, and request the answer in the same language.",
      },
      {
        q: "What if I don’t understand the answer?",
        a: "Reply with “Explain simpler” or ask for more examples and an easier approach.",
      },
    ],
  },
  "homework-solver": {
    title: "Homework help—step by step",
    intro:
      "Paste your homework question and get a structured solution with steps, reasoning, and a final answer.",
    howTo: [
      "Add your class (e.g., “Class 9”) and subject.",
      "Paste the exact question (and given values/diagram details).",
      "Ask for steps + final answer + a quick check.",
      "If it’s long, paste one question at a time.",
    ],
    examples: [
      "Class 9 Physics: Define acceleration and solve this numerical with units.",
      "Class 7 History: Write short notes on the Mughal Empire (150 words).",
      "Class 10 Chemistry: Balance this equation and explain the method.",
    ],
    integrity: COMMON_INTEGRITY,
    faq: [
      {
        q: "Can you show the steps only (no final answer)?",
        a: "Yes—ask for “steps only” and you can calculate the final result yourself.",
      },
      {
        q: "Will it match my textbook method?",
        a: "Often, but not always. If your school uses a specific method, mention the book/board.",
      },
    ],
  },
  "essay-generator": {
    title: "Write better essays with a clear structure",
    intro:
      "Generate outlines, introductions, and full essays with the right tone and word count—then refine them with examples and better vocabulary.",
    howTo: [
      "Pick a topic and word count (e.g., 200 / 500).",
      "Mention class/grade and board if needed (CBSE/ICSE).",
      "Ask for an outline first, then a final essay.",
      "Request headings, conclusion, and 5–8 key points.",
    ],
    examples: [
      "Write a 250-word essay on “Importance of Discipline” for Class 7.",
      "Create an outline + 500-word essay on “Climate Change” with 3 examples.",
      "Write a speech (2 minutes) on “Digital India” with a strong opening.",
    ],
    integrity:
      "Use this as a draft. Add your own experiences, examples from your class, and rewrite in your own style to avoid copying.",
    faq: [
      {
        q: "Can you make it more simple or more advanced?",
        a: "Yes—ask for “simpler language” or “more formal/advanced vocabulary”.",
      },
      {
        q: "Can you add quotes or data?",
        a: "Yes—ask for “add 2 quotes” or “add 3 data points” (verify if required).",
      },
    ],
  },
  "math-solver": {
    title: "Math solutions you can follow",
    intro:
      "Get clear step-by-step math solutions with explanations, methods, and a quick verification.",
    howTo: [
      "Write the exact problem and any constraints.",
      "Ask for the method (factorization, substitution, etc.).",
      "Request a verification step at the end.",
      "If stuck, ask for an easier method.",
    ],
    examples: [
      "Class 9: Solve 3x + 7 = 22 with steps and check the answer.",
      "Class 10: Find the HCF and LCM of 36 and 84.",
      "Class 11: Differentiate \(x^3 + 2x\) and explain the rules used.",
    ],
    integrity: COMMON_INTEGRITY,
    faq: [
      {
        q: "Can you show two different methods?",
        a: "Yes—ask for “method 1” and “method 2” (e.g., factorization vs formula).",
      },
      {
        q: "Can you format for my exam?",
        a: "Yes—ask for “CBSE board style steps” or “show marks-wise steps”.",
      },
    ],
  },
  calculator: {
    title: "Fast calculations with clear steps",
    intro:
      "Use the calculator for quick results, then ask for the reasoning/steps if it’s a homework question.",
    howTo: [
      "Enter the expression clearly (use brackets).",
      "Ask for step-by-step simplification if needed.",
      "Mention units when doing word problems.",
      "Double-check signs (+/−) and brackets.",
    ],
    examples: [
      "Simplify: (3/4 + 2/3) × 6",
      "Compute: 15% of 260 and explain the steps.",
      "Evaluate: (2.5 × 4.2) − (1.8 ÷ 0.6)",
    ],
    integrity: COMMON_INTEGRITY,
    faq: [
      { q: "Why did I get a different answer?", a: "Usually brackets/order of operations. Share your steps and we’ll compare." },
      { q: "Can you show steps?", a: "Yes—ask “show working/steps”. That’s best for learning." },
    ],
  },
  "quiz-generator": {
    title: "Quizzes for practice and revision",
    intro:
      "Generate topic-based quizzes with answers and explanations to help you revise effectively.",
    howTo: [
      "Mention class, subject, and chapter/topic.",
      "Choose difficulty (easy/medium/hard).",
      "Ask for MCQs + short answers + 1–2 long questions.",
      "Request answer key + brief explanation.",
    ],
    examples: [
      "Class 8 Science: Quiz on ‘Friction’ (10 MCQ + answers).",
      "Class 10 History: Quiz on ‘Nationalism in India’ (mixed questions).",
      "Class 6 Maths: Fractions quiz with 5 word problems.",
    ],
    integrity:
      "Use quizzes for self-practice. Don’t use generated quizzes to cheat in class tests—practice honestly for better results.",
    faq: [
      { q: "Can you make it board-exam style?", a: "Yes—tell us CBSE/ICSE/state board and the chapter name." },
      { q: "Can you generate printable format?", a: "Yes—ask for a clean numbered format without emojis." },
    ],
  },
  "science-projects": {
    title: "Science project ideas with safe steps",
    intro:
      "Get science project ideas, materials, steps, and a short explanation—aligned with your class level and available materials.",
    howTo: [
      "Mention class, topic (physics/chem/bio), and time limit.",
      "Tell us what materials you can arrange at home/school.",
      "Ask for steps + precautions + observation table.",
      "Request a short viva Q&A list.",
    ],
    examples: [
      "Class 8: 3 working model ideas using cardboard and a motor.",
      "Class 9: Chemistry project using safe household items (no flames).",
      "Class 10: Biology model idea + 1-page explanation for file.",
    ],
    integrity:
      "Always follow safety rules. Ask a parent/teacher before using electricity, heat, blades, or chemicals.",
    faq: [
      { q: "Can you suggest a low-cost project?", a: "Yes—tell your budget and I’ll suggest ideas under that range." },
      { q: "Can you provide a file write-up?", a: "Yes—ask for aim, materials, procedure, observations, result, and conclusion." },
    ],
  },
  "grammar-checker": {
    title: "Clearer grammar, better writing",
    intro:
      "Fix grammar, spelling, and clarity while keeping the meaning the same. You can also ask for tone changes (formal, simple, etc.).",
    howTo: [
      "Paste your text (or one paragraph at a time).",
      "Ask for “minimal changes” or “rewrite for clarity”.",
      "Tell the tone: simple, formal, friendly, academic.",
      "Request a list of corrections if you want to learn.",
    ],
    examples: [
      "Fix grammar (minimal changes): “He don’t like going school.”",
      "Rewrite this paragraph in simple English for Class 6.",
      "Make this email more formal and polite.",
    ],
    integrity: COMMON_INTEGRITY,
    faq: [
      { q: "Can you explain the mistakes?", a: "Yes—ask for a short explanation after each correction." },
      { q: "Will you keep my meaning the same?", a: "If you choose “minimal changes”, yes. Otherwise I’ll improve clarity too." },
    ],
  },
};

export function getToolLearnMoreContent(key: ToolLearnMoreKey): ToolLearnMoreContent {
  return content[key];
}

