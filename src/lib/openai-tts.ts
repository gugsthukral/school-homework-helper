import { getOpenAIClient } from "@/lib/openai";

export async function synthesizeWithOpenAI(text: string): Promise<Buffer> {
  const client = getOpenAIClient();
  if (!client) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const preferredModel = process.env.OPENAI_TTS_MODEL ?? "gpt-4o-mini-tts";
  const voice = (process.env.OPENAI_TTS_VOICE ?? "nova") as "alloy" | "nova" | "shimmer" | "echo" | "fable" | "onyx";

  async function create(model: string) {
    const speech = await client!.audio.speech.create({
      model,
      voice,
      input: text,
      response_format: "mp3",
    });
    return Buffer.from(await speech.arrayBuffer());
  }

  try {
    return await create(preferredModel);
  } catch (error) {
    if (preferredModel === "tts-1") throw error;
    return create("tts-1");
  }
}
