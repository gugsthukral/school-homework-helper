export function buildHomeworkSolverPrompt(grade: number, question: string, subject?: string) {
  const subjectLine = subject ? `\nSubject: ${subject}` : "";

  return `You are a friendly teacher.
Explain this homework answer in a way that a Class ${grade} student can understand.
${subjectLine}

Question:
${question}

Rules:
- Show step-by-step solution
- Use simple language appropriate for Class ${grade}
- Give final answer clearly at the end
- Add quick revision notes (2-3 bullet points)
- Use markdown formatting with headings and numbered steps`;
}

export function buildEssayGeneratorPrompt(grade: number, topic: string, wordCount: number) {
  return `Write a ${wordCount} word essay on: ${topic}
For Class ${grade} student.

Use:
- Introduction
- Main Body (with clear paragraphs)
- Conclusion

Rules:
- Easy language only, appropriate for Class ${grade}
- Stay close to the requested word count
- Use markdown headings for each section`;
}

export function buildMathSolverPrompt(
  grade: number,
  problem: string,
  mathType: string
) {
  return `Solve this ${mathType} problem for a Class ${grade} student.

Problem:
${problem}

Rules:
- Show every step clearly with explanations
- Use simple language appropriate for Class ${grade}
- Highlight the final answer
- Add 2-3 quick revision tips related to this type of problem
- Use markdown formatting with numbered steps`;
}

export function buildQuizGeneratorPrompt(
  grade: number,
  count: number,
  options: { topic?: string; subject?: string }
) {
  const topic = options.topic?.trim();
  const subject = options.subject?.trim();

  let focus: string;
  if (topic && subject) {
    focus = `on "${topic}" for Class ${grade} ${subject}`;
  } else if (topic) {
    focus = `on the topic: ${topic} for Class ${grade} students`;
  } else if (subject) {
    focus = `for Class ${grade} ${subject} — draw questions from typical NCERT/CBSE syllabus chapters for this class and subject (mix key concepts across the subject)`;
  } else {
    focus = `for Class ${grade} students`;
  }

  return `Generate ${count} multiple choice questions (MCQs) ${focus}.

Format each question as:
## Question [number]
[Question text]

A) [option]
B) [option]
C) [option]
D) [option]

**Answer:** [correct letter] — [brief explanation]

Rules:
- Questions should match Class ${grade} difficulty
- Cover different aspects of ${subject ? `${subject} and ` : ""}the chosen focus
- Make distractors realistic but clearly wrong
- Use easy language`;
}

export function buildGrammarCheckerPrompt(grade: number, text: string) {
  return `Check and correct the following English writing for a Class ${grade} student.

Text:
${text}

Provide:
1. **Corrected Version** — the full corrected text
2. **Mistakes Found** — list each error with explanation
3. **Grammar Tips** — 2-3 quick tips based on the mistakes

Rules:
- Use simple explanations appropriate for Class ${grade}
- Use markdown formatting`;
}

export function buildGrammarCheckerVisionPrompt(grade: number, typedText?: string) {
  const extraText = typedText
    ? `\nThe student also typed this text (combine with any text you read from the image(s)):\n${typedText}\n`
    : "";

  return `The student uploaded a photo of their English writing for a Class ${grade} grammar check.${extraText}

Your task:
1. **Read the attached image(s)** carefully — including handwriting and printed text.
2. **Transcribe** all text you see from the image(s).
3. **Correct** the grammar and spelling.

Provide your response in this format:
1. **Text from Image** — full transcription of what you read
2. **Corrected Version** — the fully corrected text
3. **Mistakes Found** — each error with a simple explanation
4. **Grammar Tips** — 2-3 tips based on the mistakes

Rules:
- You MUST read and use the attached image(s). Never say you cannot read images.
- Use simple explanations appropriate for Class ${grade}
- Use markdown formatting`;
}

function getScienceProjectsGradeGuidance(grade: number): string {
  if (grade <= 3) {
    return `Class ${grade} (primary): very simple observation projects, 3–4 short steps, everyday materials (paper, water, magnets, seeds). Focus on seeing and describing — no complex measurements.`;
  }
  if (grade <= 5) {
    return `Class ${grade} (upper primary): hands-on demos with 4–5 steps, basic cause-and-effect, simple comparisons (hot vs cold, light vs dark). Use items found at home or school.`;
  }
  if (grade <= 8) {
    return `Class ${grade} (middle school): structured experiments with variables, simple measurements (ruler, thermometer, timer), NCERT topics like force, light, acids/bases, plant life. Medium/Hard projects should compare two conditions or record a small data table.`;
  }
  if (grade <= 10) {
    return `Class ${grade} (secondary): hypothesis-driven projects aligned with NCERT Classes 9–10 science — chemical reactions, electricity, optics, biology dissections/models. Include observation tables or graphs where appropriate. Hard project should test a clear hypothesis.`;
  }
  return `Class ${grade} (senior secondary): investigative projects for Classes 11–12 — controlled variables, repeated trials, data analysis, research-style conclusions. Topics may include advanced physics/chemistry/biology (e.g. titration demos, optics, ecology surveys, electronics). Hard project should resemble a mini lab investigation.`;
}

export function buildScienceProjectsSystemPrompt(grade: number) {
  return `You are a CBSE science teacher creating project ideas ONLY for Class ${grade} students.

Critical rules:
- Every response must be tailored specifically to Class ${grade} — not generic ideas that could fit any class.
- Class 6 ideas must be simpler than Class 12 ideas. Never reuse the same project titles or concepts across different class levels.
- Return only valid JSON — no markdown fences, no commentary outside the JSON object.`;
}

export function buildScienceProjectsPrompt(grade: number, interest?: string) {
  const gradeGuidance = getScienceProjectsGradeGuidance(grade);
  const interestLine = interest
    ? `\nStudent interest or preferred area: ${interest}. If an interest is given, spread the 4 projects across different subtopics within that area — do NOT repeat the same subtopic four times.`
    : "";

  return `Suggest exactly 4 science project ideas for a Class ${grade} Indian CBSE student.

Class-level guidance:
${gradeGuidance}
${interestLine}

Return ONLY valid JSON (no markdown fences, no extra text) in this shape:
{
  "projects": [
    {
      "title": "Project name",
      "difficulty": "Easy",
      "materials": ["item 1", "item 2"],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Short step title",
          "description": "Clear instruction for this step"
        }
      ],
      "learningOutcome": "What concept the student learns"
    }
  ]
}

Rules:
- Exactly 4 projects total: 2 with difficulty "Easy", 1 "Medium", and 1 "Hard"
- difficulty must be exactly "Easy", "Medium", or "Hard"
- Each project needs 4–6 detailed steps with stepNumber 1, 2, 3...
- materials: 3–8 simple, affordable household or school items appropriate for Class ${grade}
- Projects must be safe and doable at home or school with adult supervision where needed
- All 4 projects MUST cover completely different science topics (e.g. plants, magnets, water, light). Do NOT suggest four variations of the same theme (e.g. four LED or four electricity projects)
- Each project title must be unique and specific to Class ${grade}
- The Hard project must be noticeably more challenging than the Easy projects for Class ${grade}
- Steps should be specific enough to follow with photos/diagrams`;
}

export const SCIENCE_PROJECTS_SYSTEM = buildScienceProjectsSystemPrompt(6);

export function buildCalculatorPrompt(grade: number, expression: string, calcType: string) {
  return `You are a smart school calculator assistant for a Class ${grade} student.

Calculation type: ${calcType}

Expression or problem:
${expression}

Rules:
- Compute the correct numerical answer (show the exact result)
- Show step-by-step working in simple language appropriate for Class ${grade}
- For percentages, ratios, and unit conversions, explain each step clearly
- Use markdown with **Final Answer** highlighted at the end
- If the input is invalid, explain what to fix and give an example`;
}

export function buildAskAnythingPrompt(question: string) {
  return `You are a friendly, knowledgeable tutor for Indian CBSE school students (Classes 1–12).
Answer this question with clear, age-appropriate language.

Question:
${question}

Rules:
- Give a clear, accurate answer suitable for school students
- Use short paragraphs and bullet points where helpful
- If the question is about homework or exams, include 1-2 study tips
- Use markdown formatting
- If the question is unclear, answer the most likely intent and note any assumptions`;
}

export function buildAskAnythingVisionPrompt(question: string) {
  const questionLine = question.trim()
    ? `\nThe student also wrote:\n${question}\n`
    : "";

  return `The student uploaded image(s) with a school-related question.${questionLine}

Your task:
1. Read and understand the attached image(s)
2. Answer the question clearly for a school student (CBSE Classes 1–12)

Rules:
- You MUST use the attached image(s). Never say you cannot read images.
- Use simple language and markdown formatting
- Include step-by-step help when solving problems`;
}

