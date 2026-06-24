import { z } from "zod";
import { imagesFieldSchema } from "@/lib/attachment-schema";
import { createAIToolRoute } from "@/lib/create-ai-route";
import { buildAskAnythingPrompt, buildAskAnythingVisionPrompt } from "@/lib/prompts";

const schema = z
  .object({
    question: z.string().max(3000).default(""),
    images: imagesFieldSchema,
  })
  .refine(
    (data) => data.question.trim().length >= 5 || (data.images?.length ?? 0) > 0,
    { message: "Enter your question (min 5 characters) or upload an image." }
  );

export const POST = createAIToolRoute({
  toolName: "ask-anything",
  schema,
  getImages: (data) => data.images,
  buildPrompt: ({ question, images }) => {
    const imageNote =
      images && images.length > 0
        ? `\n\nThe student uploaded ${images.length} image(s). Read the question from the image(s) if needed.`
        : "";

    if (images && images.length > 0) {
      return buildAskAnythingVisionPrompt(question) + imageNote;
    }

    return buildAskAnythingPrompt(question.trim()) + imageNote;
  },
});
