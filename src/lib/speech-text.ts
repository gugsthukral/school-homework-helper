import type { SpeechLang } from "@/lib/speech-segments";

/**
 * Remove punctuation that Sarvam/browser TTS often reads aloud
 * (e.g. "comma", "period", humming on dashes) for natural speech.
 */
export function normalizeTextForSpeech(text: string, lang: SpeechLang): string {
  let result = text
    .replace(/[*#_~`|]/g, "")
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  if (lang === "pa-IN" || lang === "hi-IN") {
    result = result
      // Danda / full stop variants
      .replace(/[।॥]/gu, " ")
      // Commas (Latin + Arabic comma)
      .replace(/[,،]/gu, " ")
      // Dashes and hyphens
      .replace(/[–—\-‐‑‒―]/gu, " ")
      // Other sentence punctuation
      .replace(/[.!?;:…]/gu, " ")
      // Quotes and brackets
      .replace(/["'"''""()[\]{}]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  } else {
    result = result
      .replace(/[।॥]/gu, " ")
      .replace(/[–—‐‑‒―]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  return result;
}
