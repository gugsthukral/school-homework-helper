import { z } from "zod";
import { createAIToolRoute } from "@/lib/create-ai-route";
import { buildQuizGeneratorPrompt } from "@/lib/prompts";

const schema = z
  .object({
    topic: z.string().max(200).default(""),
    subject: z.string().max(50).optional(),
    grade: z.number().int().min(1).max(12),
    count: z.number().int().min(3).max(20),
  })
  .refine((data) => data.topic.trim().length >= 3 || Boolean(data.subject?.trim()), {
    message: "Select a subject or enter a topic (min 3 characters).",
  });

export const POST = createAIToolRoute({
  toolName: "quiz-generator",
  schema,
  buildPrompt: ({ topic, grade, count, subject }) =>
    buildQuizGeneratorPrompt(grade, count, { topic: topic.trim(), subject }),
});
