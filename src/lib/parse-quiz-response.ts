export type QuizQuestion = {
  number: number;
  question: string;
  options: { letter: string; text: string }[];
  answerLetter: string;
  explanation: string;
};

const QUESTION_HEADER = /^##\s*Question\s*(\d+)/im;
const ANSWER_LINE = /(?:\*\*Answer:\*\*|Answer:)\s*([A-D])(?:\s*[—\-–:]\s*(.*))?/i;
const OPTION_LINE = /^([A-D])\)\s*(.+)$/gm;

export function parseQuizResponse(text: string): QuizQuestion[] {
  const sections = text
    .split(/(?=^##\s*Question\s*\d+)/im)
    .map((section) => section.trim())
    .filter(Boolean);

  const questions = sections
    .map((section, index) => parseQuestionSection(section, index))
    .filter((question) => question.question || question.options.length > 0);

  return questions;
}

function parseQuestionSection(section: string, index: number): QuizQuestion {
  const numberMatch = section.match(QUESTION_HEADER);
  const number = numberMatch ? Number(numberMatch[1]) : index + 1;

  let body = section.replace(QUESTION_HEADER, "").trim();
  const answerMatch = body.match(ANSWER_LINE);

  let answerLetter = "";
  let explanation = "";
  if (answerMatch) {
    answerLetter = answerMatch[1].toUpperCase();
    explanation = (answerMatch[2] ?? "").trim().replace(/\s+/g, " ");
    body = body.replace(answerMatch[0], "").trim();
  }

  const options: { letter: string; text: string }[] = [];
  for (const match of body.matchAll(OPTION_LINE)) {
    options.push({ letter: match[1], text: match[2].trim() });
  }

  const question = body
    .replace(OPTION_LINE, "")
    .trim()
    .replace(/\n+/g, " ");

  return { number, question, options, answerLetter, explanation };
}
