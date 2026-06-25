import { getSiteUrl } from "@/lib/site-url";

export function markdownToPlainText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*]\s+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function getSiteOrigin(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return getSiteUrl();
}

export function buildSharePageUrl(sharePath: string): string {
  const origin = getSiteOrigin();
  const path = sharePath.startsWith("/") ? sharePath : `/${sharePath}`;
  return `${origin}${path}`;
}

export function buildShareText(options: {
  title: string;
  subtitle?: string;
  content: string;
  pageUrl: string;
  /** Omit or null for full content. Set a number to truncate (e.g. Twitter). */
  maxContentLength?: number | null;
  includeFooter?: boolean;
}): string {
  const plain = markdownToPlainText(options.content);
  let body = plain;

  if (typeof options.maxContentLength === "number" && options.maxContentLength > 0) {
    body =
      plain.length > options.maxContentLength
        ? `${plain.slice(0, options.maxContentLength).trim()}…`
        : plain;
  }

  const parts = [options.title, options.subtitle ?? "", "", body];

  if (options.includeFooter !== false) {
    parts.push("", `Try this free AI tool: ${options.pageUrl}`);
  }

  return parts
    .filter((line, index, lines) => line !== "" || (index > 0 && lines[index - 1] !== ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const WHATSAPP_SHARE_BASE = "https://api.whatsapp.com/send?text=";
const WHATSAPP_URL_SAFE_LENGTH = 7500;

export function buildWhatsAppShareUrl(text: string): string {
  const encoded = encodeURIComponent(text);
  if (WHATSAPP_SHARE_BASE.length + encoded.length <= WHATSAPP_URL_SAFE_LENGTH) {
    return `${WHATSAPP_SHARE_BASE}${encoded}`;
  }

  return `${WHATSAPP_SHARE_BASE}${encodeURIComponent(
    "📋 The full result was copied to your clipboard — paste it here in WhatsApp."
  )}`;
}

export async function openWhatsAppShare(text: string): Promise<"opened" | "copied"> {
  const encoded = encodeURIComponent(text);

  if (WHATSAPP_SHARE_BASE.length + encoded.length <= WHATSAPP_URL_SAFE_LENGTH) {
    window.open(`${WHATSAPP_SHARE_BASE}${encoded}`, "_blank", "noopener,noreferrer");
    return "opened";
  }

  await copyShareText(text);
  window.open(buildWhatsAppShareUrl(text), "_blank", "noopener,noreferrer");
  return "copied";
}

export function buildShareLinks(options: {
  title: string;
  subtitle?: string;
  content: string;
  sharePath: string;
}) {
  const pageUrl = buildSharePageUrl(options.sharePath);
  const shareText = buildShareText({
    title: options.title,
    subtitle: options.subtitle,
    content: options.content,
    pageUrl,
    maxContentLength: null,
  });

  const tweetText = buildShareText({
    title: options.title,
    subtitle: options.subtitle,
    content: options.content,
    pageUrl,
    maxContentLength: 240,
  });

  return {
    pageUrl,
    shareText,
    whatsappUrl: buildWhatsAppShareUrl(shareText),
    facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    linkedinUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    twitterUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`,
  };
}

export async function copyShareText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

export async function nativeShare(options: {
  title: string;
  text: string;
  url: string;
}): Promise<"shared" | "cancelled" | "unsupported" | "failed"> {
  if (typeof navigator === "undefined" || !navigator.share) {
    return "unsupported";
  }

  try {
    await navigator.share({
      title: options.title,
      text: options.text,
      url: options.url,
    });
    return "shared";
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return "cancelled";
    }
    return "failed";
  }
}
