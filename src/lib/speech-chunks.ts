/** Split long text into speakable chunks at sentence boundaries. */
export function chunkTextBySentences(text: string, maxLen: number): string[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];
  if (normalized.length <= maxLen) return [normalized];

  const chunks: string[] = [];
  const paragraphs = normalized.split(/\n{2,}/);

  for (const paragraph of paragraphs) {
    const sentences = paragraph
      .split(/(?<=[.!?।॥])\s+|\n+/u)
      .map((part) => part.trim())
      .filter(Boolean);

    let current = "";

    function flushCurrent() {
      const trimmed = current.trim();
      if (trimmed) chunks.push(trimmed);
      current = "";
    }

    for (const sentence of sentences) {
      const next = current ? `${current} ${sentence}` : sentence;

      if (next.length <= maxLen) {
        current = next;
        continue;
      }

      flushCurrent();

      if (sentence.length <= maxLen) {
        current = sentence;
        continue;
      }

      for (let i = 0; i < sentence.length; i += maxLen) {
        chunks.push(sentence.slice(i, i + maxLen).trim());
      }
    }

    flushCurrent();
  }

  return chunks.filter(Boolean);
}

export const SARVAM_TTS_CHUNK_SIZE = 2200;
export const OPENAI_TTS_CHUNK_SIZE = 3500;
export const BROWSER_TTS_CHUNK_SIZE = 180;
