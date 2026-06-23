import { z } from "zod";
import { imagesFieldSchema } from "@/lib/attachment-schema";
import { createAIToolRoute, VISION_SYSTEM } from "@/lib/create-ai-route";
import {
  buildGrammarCheckerPrompt,
  buildGrammarCheckerVisionPrompt,
} from "@/lib/prompts";

const schema = z
  .object({
    text: z.string().max(3000).default(""),
    grade: z.number().int().min(1).max(12),
    images: imagesFieldSchema,
  })
  .refine(
    (data) => data.text.trim().length >= 10 || (data.images?.length ?? 0) > 0,
    { message: "Enter at least 10 characters or upload an image of your writing." }
  );

export const POST = createAIToolRoute({
  toolName: "grammar-checker",
  schema,
  getImages: (data) => data.images,
  visionSystemPrompt: VISION_SYSTEM,
  buildPrompt: ({ text, grade, images }) => {
    const typedText = text.trim();
    if (images && images.length > 0) {
      return buildGrammarCheckerVisionPrompt(grade, typedText || undefined);
    }
    return buildGrammarCheckerPrompt(grade, typedText);
  },
});
