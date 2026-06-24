import type { Metadata } from "next";
import { DEFAULT_KEYWORDS, SITE_NAME } from "@/lib/seo-config";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://schoolhomeworkhelper.com";
}

const OG_IMAGE_PATH = "/logo.png";

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string | readonly string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  /** Use when the title already includes the site name */
  absoluteTitle?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path = "",
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
  absoluteTitle = false,
}: BuildPageMetadataOptions): Metadata {
  const baseUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") || path === "" ? path : `/${path}`;
  const url = `${baseUrl}${normalizedPath}`;
  const keywordList =
    keywords === undefined
      ? [...DEFAULT_KEYWORDS]
      : typeof keywords === "string"
        ? keywords.split(",").map((k) => k.trim())
        : [...keywords];
  const imageUrl = `${baseUrl}${OG_IMAGE_PATH}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywordList,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: absoluteTitle ? title : `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_IN",
      images: [
        {
          url: imageUrl,
          width: 250,
          height: 91,
          alt: SITE_NAME,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | ${SITE_NAME}`,
      description,
      images: [imageUrl],
    },
  };
}

export function buildRootMetadata(): Metadata {
  const baseUrl = getSiteUrl();
  const imageUrl = `${baseUrl}${OG_IMAGE_PATH}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${SITE_NAME} | AI Education for Classes 1–12`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "Free AI-powered homework help, essay generator, math solver, quizzes, and more for students from Class 1 to Class 12.",
    keywords: DEFAULT_KEYWORDS,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: baseUrl }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "education",
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      title: `${SITE_NAME} | AI Education for Classes 1–12`,
      description:
        "Free AI-powered homework help, essay generator, math solver, quizzes, and NCERT study resources for CBSE Classes 1–12.",
      url: baseUrl,
      images: [
        {
          url: imageUrl,
          width: 250,
          height: 91,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} | AI Education for Classes 1–12`,
      description:
        "Free AI homework help, math solver, essay generator, and study resources for CBSE Classes 1–12.",
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
    verification: {
      google: "vtaBwWyRbATOVYiugu6crxh5OUjB2-GI05Dge3tB45k",
    },
  };
}
