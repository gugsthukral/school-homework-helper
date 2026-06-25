import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

export function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openaiClient;
}

export async function generateAIResponse(
  systemPrompt: string,
  userPrompt: string,
  maxTokens = 1500,
  options?: { jsonObject?: boolean }
) {
  const client = getOpenAIClient();

  if (!client) {
    throw new Error("OPENAI_API_KEY is not configured. Add it to your .env.local file.");
  }

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: maxTokens,
    ...(options?.jsonObject ? { response_format: { type: "json_object" as const } } : {}),
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No response received from AI.");
  }

  return content;
}

export async function generateAIResponseWithVision(
  systemPrompt: string,
  userPrompt: string,
  images: string[]
) {
  const client = getOpenAIClient();

  if (!client) {
    throw new Error("OPENAI_API_KEY is not configured. Add it to your .env.local file.");
  }

  // Always use a vision-capable model when images are attached
  const visionModel = "gpt-4o-mini";

  const userContent: OpenAI.Chat.ChatCompletionContentPart[] = [
    ...images.map(
      (url): OpenAI.Chat.ChatCompletionContentPart => ({
        type: "image_url",
        image_url: { url, detail: "high" },
      })
    ),
    { type: "text", text: userPrompt },
  ];

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_VISION_MODEL ?? visionModel,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ],
    temperature: 0.4,
    max_tokens: 2000,
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No response received from AI.");
  }

  return content;
}
