import { z } from "zod";
import { createAIToolRoute } from "@/lib/create-ai-route";
import { buildCalculatorPrompt } from "@/lib/prompts";

const schema = z.object({
  expression: z.string().trim().min(1, "Enter a calculation.").max(500),
  grade: z.number().int().min(1).max(12),
  calcType: z.enum(["basic", "percentage", "scientific", "unit"]),
});

export const POST = createAIToolRoute({
  toolName: "calculator",
  schema,
  buildPrompt: ({ expression, grade, calcType }) =>
    buildCalculatorPrompt(grade, expression, calcType),
});
