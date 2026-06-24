import type { SpeechLang } from "@/lib/indian-languages";
import { sarvamSpeakerForLang } from "@/lib/indian-languages";

export async function synthesizeWithSarvam(text: string, lang: SpeechLang): Promise<Buffer> {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) {
    throw new Error("SARVAM_API_KEY is not configured.");
  }

  const response = await fetch("https://api.sarvam.ai/text-to-speech", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-subscription-key": apiKey,
    },
    body: JSON.stringify({
      text,
      target_language_code: lang,
      model: "bulbul:v3",
      speaker: sarvamSpeakerForLang(lang),
      output_audio_codec: "mp3",
      speech_sample_rate: "24000",
      pace: lang === "pa-IN" ? 0.92 : lang === "ml-IN" || lang === "ta-IN" ? 0.95 : 1,
      temperature: lang === "pa-IN" ? 0.4 : 0.55,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Sarvam TTS failed (${response.status}): ${detail}`);
  }

  const data = (await response.json()) as { audios?: string[] };
  const audioBase64 = data.audios?.[0];
  if (!audioBase64) {
    throw new Error("Sarvam TTS returned no audio.");
  }

  return Buffer.from(audioBase64, "base64");
}
