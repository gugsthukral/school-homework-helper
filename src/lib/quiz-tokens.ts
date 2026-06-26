/** Scale OpenAI output budget so large Class 10–12 quizzes are not truncated mid-response. */
export function getQuizMaxTokens(count: number, grade: number): number {
  const perQuestion = grade >= 10 ? 200 : grade >= 6 ? 175 : 150;
  return Math.min(16_384, 500 + count * perQuestion);
}
