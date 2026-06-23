import { z } from "zod";
import { imagesFieldSchema } from "@/lib/attachment-schema";
import { createAIToolRoute } from "@/lib/create-ai-route";
import { buildHomeworkSolverPrompt } from "@/lib/prompts";

const schema = z
  .object({
    question: z.string().max(2000).default(""),
    grade: z.number().int().min(1).max(12),
    subject: z.string().max(50).optional(),
    images: imagesFieldSchema,
  })
  .refine(
    (data) => data.question.trim().length >= 5 || (data.images?.length ?? 0) > 0,
    { message: "Enter a question (min 5 characters) or upload an image/document." }
  );

export const POST = createAIToolRoute({
  toolName: "homework-solver",
  schema,
  getImages: (data) => data.images,
  buildPrompt: ({ question, grade, subject, images }) => {
    const imageNote =
      images && images.length > 0
        ? `\n\nThe student also uploaded ${images.length} image(s). Read the question from the image(s) if the typed text is empty or incomplete.`
        : "";
    return buildHomeworkSolverPrompt(grade, question.trim() || "See uploaded image(s).", subject) + imageNote;
  },
});
