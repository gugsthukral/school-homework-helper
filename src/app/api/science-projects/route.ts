import { z } from "zod";
import { createAIToolRoute } from "@/lib/create-ai-route";
import {
  processScienceProjectsResponse,
  projectsToMarkdown,
} from "@/lib/science-project-media";
import {
  buildScienceProjectsPrompt,
  buildScienceProjectsSystemPrompt,
} from "@/lib/prompts";

const schema = z.object({
  grade: z.number().int().min(1).max(12),
  interest: z.string().trim().min(2, "Please enter an area of interest.").max(200),
});

export const POST = createAIToolRoute({
  toolName: "science-projects",
  schema,
  buildSystemPrompt: ({ grade }) => buildScienceProjectsSystemPrompt(grade),
  buildPrompt: ({ grade, interest }) => buildScienceProjectsPrompt(grade, interest),
  maxTokens: 4500,
  jsonObject: true,
  transformResponse: async (raw, { grade, interest }) => {
    const projects = await processScienceProjectsResponse(raw, grade, interest);
    return {
      projects,
      response: projectsToMarkdown(projects),
    };
  },
});
