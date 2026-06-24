import { stripMarkdownForSpeech } from "@/lib/plain-text";
import { synthesizeWithOpenAI } from "@/lib/openai-tts";
import { synthesizeWithSarvam } from "@/lib/sarvam-tts";
import {
  chunkTextBySentences,
  OPENAI_TTS_CHUNK_SIZE,
  SARVAM_TTS_CHUNK_SIZE,
} from "@/lib/speech-chunks";
import { splitTextForSpeech, type SpeechLang } from "@/lib/speech-segments";
import { normalizeTextForSpeech } from "@/lib/speech-text";

export type SpeechAudioChunk = {
  index: number;
  total: number;
  audio: string;
  mimeType: string;
  lang: SpeechLang;
};

export type SpeechJob = {
  text: string;
  lang: SpeechLang;
};

function hasSarvamKey() {
  return Boolean(process.env.SARVAM_API_KEY?.trim());
}

function hasOpenAIKey() {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

async function synthesizeChunk(text: string, lang: SpeechLang): Promise<Buffer> {
  if (!text.trim()) {
    throw new Error("No speakable text.");
  }

  if (hasSarvamKey()) {
    try {
      return await synthesizeWithSarvam(text, lang);
    } catch (error) {
      console.error("Sarvam TTS error:", error);
    }
  }

  return synthesizeWithOpenAI(text);
}

export function isServerTtsConfigured() {
  return hasSarvamKey() || hasOpenAIKey();
}

export function buildSpeechJobs(text: string): SpeechJob[] {
  const cleaned = stripMarkdownForSpeech(text);
  const langSegments = splitTextForSpeech(cleaned);
  const segments =
    langSegments.length > 0 ? langSegments : [{ text: cleaned, lang: "en-IN" as SpeechLang }];

  const maxLen = hasSarvamKey() ? SARVAM_TTS_CHUNK_SIZE : OPENAI_TTS_CHUNK_SIZE;
  const jobs: SpeechJob[] = [];

  for (const segment of segments) {
    for (const piece of chunkTextBySentences(segment.text, maxLen)) {
      const spokenText = normalizeTextForSpeech(piece, segment.lang);
      if (spokenText) {
        jobs.push({ text: spokenText, lang: segment.lang });
      }
    }
  }

  return jobs;
}

/** Synthesize all jobs in parallel; emit each chunk in order as soon as it is ready. */
export async function* streamSpeechAudioChunks(text: string): AsyncGenerator<SpeechAudioChunk> {
  if (!isServerTtsConfigured()) {
    throw new Error("Text-to-speech is not configured on the server.");
  }

  const jobs = buildSpeechJobs(text);
  if (!jobs.length) return;

  const total = jobs.length;
  const tasks = jobs.map((job, index) =>
    synthesizeChunk(job.text, job.lang).then((audio) => ({ index, audio, lang: job.lang }))
  );

  for (let i = 0; i < total; i += 1) {
    const { audio, lang } = await tasks[i];
    yield {
      index: i,
      total,
      audio: audio.toString("base64"),
      mimeType: "audio/mpeg",
      lang,
    };
  }
}

export async function buildSpeechAudioChunks(text: string): Promise<SpeechAudioChunk[]> {
  const chunks: SpeechAudioChunk[] = [];
  for await (const chunk of streamSpeechAudioChunks(text)) {
    chunks.push(chunk);
  }
  return chunks;
}
