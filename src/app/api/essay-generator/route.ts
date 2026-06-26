import { z } from "zod";
import { createAIToolRoute } from "@/lib/create-ai-route";
import { buildEssayGeneratorPrompt } from "@/lib/prompts";

const schema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters.").max(200),
  wordCount: z.number().int().min(100).max(1000),
  grade: z.number().int().min(1).max(12),
});

export const POST = createAIToolRoute({
  toolName: "essay-generator",
  schema,
  buildPrompt: ({ topic, wordCount, grade }) =>
    buildEssayGeneratorPrompt(grade, topic, wordCount),
  maxTokens: ({ wordCount }) => Math.min(4096, Math.max(1500, Math.ceil(wordCount * 1.6))),
});
