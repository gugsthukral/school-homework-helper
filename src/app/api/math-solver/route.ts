import { z } from "zod";
import { imagesFieldSchema } from "@/lib/attachment-schema";
import { createAIToolRoute } from "@/lib/create-ai-route";
import { buildMathSolverPrompt } from "@/lib/prompts";

const schema = z
  .object({
    problem: z.string().max(2000).default(""),
    grade: z.number().int().min(1).max(12),
    mathType: z.enum(["arithmetic", "algebra", "geometry", "word-problem"]),
    images: imagesFieldSchema,
  })
  .refine(
    (data) => data.problem.trim().length >= 3 || (data.images?.length ?? 0) > 0,
    { message: "Enter a problem (min 3 characters) or upload an image." }
  );

export const POST = createAIToolRoute({
  toolName: "math-solver",
  schema,
  getImages: (data) => data.images,
  buildPrompt: ({ problem, grade, mathType, images }) => {
    const imageNote =
      images && images.length > 0
        ? `\n\nThe student uploaded ${images.length} image(s) of the math problem. Read and solve from the image(s) if needed.`
        : "";
    return buildMathSolverPrompt(grade, problem.trim() || "See uploaded image(s).", mathType) + imageNote;
  },
});
