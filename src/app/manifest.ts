import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo-config";
import { getSiteUrl } from "@/lib/seo-metadata";

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = getSiteUrl();

  return {
    name: SITE_NAME,
    short_name: "Homework Helper",
    description:
      "AI-powered homework help and CBSE study resources for Classes 1–12.",
    start_url: "/",
    display: "standalone",
    background_color: "#06101f",
    theme_color: "#06101f",
    lang: "en-IN",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["education", "productivity"],
    scope: baseUrl,
  };
}
