import {
  detectIndianScript,
  type IndianScript,
  scriptToSpeechLang,
  type SpeechLang,
} from "@/lib/indian-languages";

export type { SpeechLang };

export type SpeechSegment = {
  text: string;
  lang: SpeechLang;
};

/** Split mixed Indian-language and English text for TTS. */
export function splitTextForSpeech(text: string): SpeechSegment[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const segments: SpeechSegment[] = [];
  let currentScript: IndianScript | "latin" | null = null;
  let buffer = "";

  function flush() {
    const trimmed = buffer.trim();
    if (trimmed && currentScript) {
      segments.push({
        text: trimmed,
        lang: scriptToSpeechLang(currentScript, trimmed),
      });
    }
    buffer = "";
  }

  for (const ch of normalized) {
    const script = detectIndianScript(ch);
    if (script === "neutral") {
      buffer += ch;
      continue;
    }

    const resolvedScript: IndianScript | "latin" = script === "latin" ? "latin" : script;
    if (currentScript && currentScript !== resolvedScript) {
      flush();
    }
    currentScript = resolvedScript;
    buffer += ch;
  }

  flush();
  return segments;
}

export { sarvamSpeakerForLang, pickVoiceForLang } from "@/lib/indian-languages";
