import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo-config";
import { REGIONAL_LANGUAGES_TAGLINE } from "@/lib/indian-languages";
import { getSiteUrl } from "@/lib/seo-metadata";

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = getSiteUrl();

  return {
    name: SITE_NAME,
    short_name: "Homework Helper",
    description:
      `Eight AI tools for homework help, calculator, ask anything, school projects, Computer subject guides, and CBSE study resources for Classes 1–12. ${REGIONAL_LANGUAGES_TAGLINE}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#06101f",
    theme_color: "#06101f",
    lang: "en-IN",
    icons: [
      {
        src: "/favicon.png",
        sizes: "14x16",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "180x92",
        type: "image/png",
      },
    ],
    categories: ["education", "productivity"],
    scope: baseUrl,
  };
}
