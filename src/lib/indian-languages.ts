/** BCP-47 codes supported by Sarvam Bulbul v3 TTS. */
export type SpeechLang =
  | "en-IN"
  | "hi-IN"
  | "bn-IN"
  | "ta-IN"
  | "te-IN"
  | "kn-IN"
  | "ml-IN"
  | "mr-IN"
  | "gu-IN"
  | "pa-IN"
  | "od-IN";

export type IndianScript =
  | "latin"
  | "devanagari"
  | "bengali"
  | "gurmukhi"
  | "gujarati"
  | "odia"
  | "tamil"
  | "telugu"
  | "kannada"
  | "malayalam";

export const INDIAN_SPEECH_LANGS: SpeechLang[] = [
  "en-IN",
  "hi-IN",
  "bn-IN",
  "ta-IN",
  "te-IN",
  "kn-IN",
  "ml-IN",
  "mr-IN",
  "gu-IN",
  "pa-IN",
  "od-IN",
];

const SCRIPT_TO_LANG: Record<Exclude<IndianScript, "latin" | "devanagari">, SpeechLang> = {
  bengali: "bn-IN",
  gurmukhi: "pa-IN",
  gujarati: "gu-IN",
  odia: "od-IN",
  tamil: "ta-IN",
  telugu: "te-IN",
  kannada: "kn-IN",
  malayalam: "ml-IN",
};

const DEFAULT_SARVAM_SPEAKERS: Record<SpeechLang, string> = {
  "en-IN": "ratan",
  "hi-IN": "shubh",
  "bn-IN": "meera",
  "ta-IN": "vignesh",
  "te-IN": "sindhu",
  "kn-IN": "aditya",
  "ml-IN": "mohan",
  "mr-IN": "shubh",
  "gu-IN": "priya",
  "pa-IN": "suhani",
  "od-IN": "prasant",
};

const ENV_SPEAKER_KEYS: Record<SpeechLang, string> = {
  "en-IN": "SARVAM_ENGLISH_SPEAKER",
  "hi-IN": "SARVAM_HINDI_SPEAKER",
  "bn-IN": "SARVAM_BENGALI_SPEAKER",
  "ta-IN": "SARVAM_TAMIL_SPEAKER",
  "te-IN": "SARVAM_TELUGU_SPEAKER",
  "kn-IN": "SARVAM_KANNADA_SPEAKER",
  "ml-IN": "SARVAM_MALAYALAM_SPEAKER",
  "mr-IN": "SARVAM_MARATHI_SPEAKER",
  "gu-IN": "SARVAM_GUJARATI_SPEAKER",
  "pa-IN": "SARVAM_PUNJABI_SPEAKER",
  "od-IN": "SARVAM_ODIA_SPEAKER",
};

/** Shared prompt rule so AI replies in the student's language. */
export const RESPOND_IN_USER_LANGUAGE_RULE = `- Reply in the same language and script the student used (English, Hindi, Bengali, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Punjabi, Odia, or other Indian languages). Do not translate their question into English unless they wrote in English.`;

function codePoint(ch: string): number | undefined {
  return ch.codePointAt(0);
}

export function detectIndianScript(ch: string): IndianScript | "neutral" {
  if (!/\S/.test(ch)) return "neutral";
  const code = codePoint(ch);
  if (code == null) return "latin";

  if (code >= 0x0900 && code <= 0x097f) return "devanagari";
  if (code >= 0x0980 && code <= 0x09ff) return "bengali";
  if (code >= 0x0a00 && code <= 0x0a7f) return "gurmukhi";
  if (code >= 0x0a80 && code <= 0x0aff) return "gujarati";
  if (code >= 0x0b00 && code <= 0x0b7f) return "odia";
  if (code >= 0x0b80 && code <= 0x0bff) return "tamil";
  if (code >= 0x0c00 && code <= 0x0c7f) return "telugu";
  if (code >= 0x0c80 && code <= 0x0cff) return "kannada";
  if (code >= 0x0d00 && code <= 0x0d7f) return "malayalam";

  return "latin";
}

/** Heuristic: Marathi-specific letters in Devanagari text. */
function looksLikeMarathi(text: string): boolean {
  return /[ळॅॉऑआईऊएऐओऔ]/.test(text) || /\b(आहे|नाही|म्हणून|तुम्ही|आम्ही)\b/u.test(text);
}

export function scriptToSpeechLang(script: IndianScript, sampleText = ""): SpeechLang {
  if (script === "latin") return "en-IN";
  if (script === "devanagari") return looksLikeMarathi(sampleText) ? "mr-IN" : "hi-IN";
  return SCRIPT_TO_LANG[script];
}

function getBrowserSpeechLang(): SpeechLang {
  if (typeof navigator !== "undefined") {
    for (const locale of navigator.languages ?? []) {
      const matched = normalizeLocale(locale);
      if (matched) return matched;
    }
    const browser = normalizeLocale(navigator.language);
    if (browser) return browser;
  }
  return "hi-IN";
}

/** BCP-47 tag for Web Speech API voice input. */
export function detectRecognitionLang(contextText: string): SpeechLang {
  const trimmed = contextText.trim();
  if (trimmed) return detectDominantSpeechLang(trimmed);
  return getBrowserSpeechLang();
}

export function detectDominantSpeechLang(text: string): SpeechLang {
  const counts = new Map<SpeechLang, number>();
  let devanagariSample = "";

  for (const ch of text) {
    const script = detectIndianScript(ch);
    if (script === "neutral") continue;
    const lang = scriptToSpeechLang(script, script === "devanagari" ? text : "");
    counts.set(lang, (counts.get(lang) ?? 0) + 1);
    if (script === "devanagari") devanagariSample += ch;
  }

  if (counts.size === 0) return getBrowserSpeechLang();

  let dominant: SpeechLang = "en-IN";
  let max = 0;
  for (const [lang, count] of counts) {
    if (count > max) {
      max = count;
      dominant = lang;
    }
  }

  if (dominant === "hi-IN" && looksLikeMarathi(devanagariSample || text)) {
    return "mr-IN";
  }

  return dominant;
}

function normalizeLocale(locale: string): SpeechLang | null {
  const lower = locale.trim().toLowerCase().replace("_", "-");
  const exact = INDIAN_SPEECH_LANGS.find((lang) => lang.toLowerCase() === lower);
  if (exact) return exact;

  const prefix = lower.split("-")[0];
  const byPrefix: Record<string, SpeechLang> = {
    en: "en-IN",
    hi: "hi-IN",
    bn: "bn-IN",
    ta: "ta-IN",
    te: "te-IN",
    kn: "kn-IN",
    ml: "ml-IN",
    mr: "mr-IN",
    gu: "gu-IN",
    pa: "pa-IN",
    or: "od-IN",
    od: "od-IN",
  };

  return byPrefix[prefix] ?? null;
}

export function sarvamSpeakerForLang(lang: SpeechLang): string {
  const envKey = ENV_SPEAKER_KEYS[lang];
  const override = process.env[envKey]?.trim();
  if (override) return override;
  return DEFAULT_SARVAM_SPEAKERS[lang];
}

export function isIndicSpeechLang(lang: SpeechLang): boolean {
  return lang !== "en-IN";
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
      matches.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase()) ??
      matches.find((voice) => voice.default) ??
      matches[0]
    );
  }

  const fallbackChain: SpeechLang[] = [];
  if (lang === "mr-IN") fallbackChain.push("hi-IN");
  if (lang !== "en-IN") fallbackChain.push("en-IN");

  for (const fallback of fallbackChain) {
    const voice = pickVoiceForLang(fallback, voices);
    if (voice) return voice;
  }

  return voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ?? voices[0];
}
