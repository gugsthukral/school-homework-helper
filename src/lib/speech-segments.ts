export type SpeechLang = "en-IN" | "hi-IN" | "pa-IN";

export type SpeechSegment = {
  text: string;
  lang: SpeechLang;
};

type Script = "en" | "hi" | "pa";

function charScript(ch: string): Script | "neutral" {
  if (!/\S/.test(ch)) return "neutral";
  const code = ch.codePointAt(0);
  if (code == null) return "en";
  if (code >= 0x0900 && code <= 0x097f) return "hi";
  if (code >= 0x0a00 && code <= 0x0a7f) return "pa";
  return "en";
}

function toSpeechLang(script: Script): SpeechLang {
  if (script === "hi") return "hi-IN";
  if (script === "pa") return "pa-IN";
  return "en-IN";
}

/** Split mixed English, Hindi (Devanagari), and Punjabi (Gurmukhi) text for TTS. */
export function splitTextForSpeech(text: string): SpeechSegment[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const segments: SpeechSegment[] = [];
  let currentScript: Script | null = null;
  let buffer = "";

  function flush() {
    const trimmed = buffer.trim();
    if (trimmed && currentScript) {
      segments.push({ text: trimmed, lang: toSpeechLang(currentScript) });
    }
    buffer = "";
  }

  for (const ch of normalized) {
    const script = charScript(ch);
    if (script === "neutral") {
      buffer += ch;
      continue;
    }
    if (currentScript && currentScript !== script) {
      flush();
    }
    currentScript = script;
    buffer += ch;
  }

  flush();
  return segments;
}

export function sarvamSpeakerForLang(lang: SpeechLang): string {
  if (lang === "pa-IN") {
    return process.env.SARVAM_PUNJABI_SPEAKER?.trim() || "suhani";
  }
  if (lang === "hi-IN") {
    return process.env.SARVAM_HINDI_SPEAKER?.trim() || "shubh";
  }
  return process.env.SARVAM_ENGLISH_SPEAKER?.trim() || "ratan";
}

export function pickVoiceForLang(
  lang: SpeechLang,
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | undefined {
  if (!voices.length) return undefined;

  const prefix = lang.split("-")[0].toLowerCase();
  const matches = voices.filter((voice) => voice.lang.toLowerCase().startsWith(prefix));

  if (matches.length > 0) {
    return (
      matches.find((voice) => voice.lang === lang) ??
      matches.find((voice) => voice.default) ??
      matches[0]
    );
  }

  if (lang === "pa-IN") {
    return pickVoiceForLang("hi-IN", voices) ?? pickVoiceForLang("en-IN", voices);
  }

  if (lang === "hi-IN") {
    return pickVoiceForLang("en-IN", voices);
  }

  return voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ?? voices[0];
}
