export function appendVoiceText(current: string, spoken: string) {
  const trimmed = spoken.trim();
  if (!trimmed) return current;
  if (!current.trim()) return trimmed;
  return `${current.trimEnd()} ${trimmed}`;
}
