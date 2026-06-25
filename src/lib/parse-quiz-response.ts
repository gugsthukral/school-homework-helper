export type QuizQuestion = {
  number: number;
  question: string;
  options: { letter: string; text: string }[];
  answerLetter: string;
  explanation: string;
};

const QUESTION_HEADER = /^##\s*Question\s*(\d+)/im;
const OPTION_LINE = /^([A-D])\)\s*(.+)$/i;
const ANSWER_LINE =
  /^(?:\*\*)?Answer:(?:\*\*)?\s*([A-D])\)?(?:\s*[^—\-–\n]*)?\s*(?:[—\-–:]\s*(.*))?$/i;
const HORIZONTAL_RULE = /^-{3,}\s*$/;
const ANSWER_ARTIFACT = /^\*+\s*\)\s*[^—\-–]*(?:[—\-–]\s*.*)?$/;

export function parseQuizResponse(text: string): QuizQuestion[] {
  const sections = text
    .split(/(?=^##\s*Question\s*\d+)/im)
    .map((section) => section.trim())
    .filter(Boolean);

  const questions = sections
    .map((section, index) => parseQuestionSection(section, index))
    .filter((question) => question.question || question.options.length > 0)
    .map(reconcileAnswerLetter);

  return questions;
}

function parseQuestionSection(section: string, index: number): QuizQuestion {
  const numberMatch = section.match(QUESTION_HEADER);
  const number = numberMatch ? Number(numberMatch[1]) : index + 1;

  const body = section.replace(QUESTION_HEADER, "").trim();
  const lines = body.split(/\n/);

  let answerLetter = "";
  let explanation = "";
  const questionLines: string[] = [];
  const options: { letter: string; text: string }[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || HORIZONTAL_RULE.test(trimmed)) continue;

    const answerMatch = trimmed.match(ANSWER_LINE);
    if (answerMatch) {
      answerLetter = answerMatch[1].toUpperCase();
      explanation = (answerMatch[2] ?? "").trim().replace(/\s+/g, " ");
      continue;
    }

    const optionMatch = trimmed.match(OPTION_LINE);
    if (optionMatch) {
      options.push({ letter: optionMatch[1].toUpperCase(), text: optionMatch[2].trim() });
      continue;
    }

    if (ANSWER_ARTIFACT.test(trimmed)) continue;

    questionLines.push(trimmed);
  }

  const question = cleanQuestionText(questionLines.join(" "));

  return { number, question, options, answerLetter, explanation };
}

function cleanQuestionText(text: string): string {
  return text
    .replace(/\s*[\*"]+\s*\)\s*(?:[A-D]\s*)?(?:\d+\s*)?[—\-–]\s*.*$/i, "")
    .replace(/^(?:\*\*)?Answer:(?:\*\*)?\s*.*$/i, "")
    .replace(/\s*[-*]{2,}\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stripLatex(text: string): string {
  return text
    .replace(/\\\(|\\\)|\\\[|\\\]/g, " ")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeAnswerValue(text: string): string {
  return stripLatex(text).replace(/[.,;:]+$/, "").trim().toLowerCase();
}

function extractConclusionValues(explanation: string): string[] {
  const plain = stripLatex(explanation);
  const values: string[] = [];

  const henceMatch = plain.match(
    /\b(?:hence|therefore|thus|so)\s*,?\s*(?:(?:the\s+)?(?:answer|number|value|result)\s+is\s+)?(?:[a-z]\s*=\s*)?([^\s,.;+=]+)/i
  );
  if (henceMatch?.[1]) values.push(henceMatch[1]);

  const answerIsMatch = plain.match(
    /\b(?:the\s+)?(?:answer|number|value|result)\s+is\s+([^\s,.;+=]+)/i
  );
  if (answerIsMatch?.[1]) values.push(answerIsMatch[1]);

  const varAssignments = [...plain.matchAll(/\b[a-z]\s*=\s*([^\s,.;+=]+)/gi)];
  if (varAssignments.length > 0) {
    values.push(varAssignments[varAssignments.length - 1][1]);
  }

  return values;
}

function findOptionByValue(
  options: QuizQuestion["options"],
  value: string
): QuizQuestion["options"][number] | undefined {
  const normalized = normalizeAnswerValue(value);
  if (!normalized) return undefined;

  return options.find((option) => normalizeAnswerValue(option.text) === normalized);
}

/** Fix AI mistakes where the declared letter disagrees with the explanation conclusion. */
function reconcileAnswerLetter(question: QuizQuestion): QuizQuestion {
  const { options, answerLetter, explanation } = question;
  if (!explanation || options.length === 0) return question;

  for (const value of extractConclusionValues(explanation)) {
    const matchingOption = findOptionByValue(options, value);
    if (!matchingOption) continue;

    if (matchingOption.letter !== answerLetter) {
      return { ...question, answerLetter: matchingOption.letter };
    }

    return question;
  }

  return question;
}
