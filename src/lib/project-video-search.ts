import type { ScienceProject, ScienceProjectVideo } from "@/lib/science-projects-types";

const YT_THUMB = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export function buildProjectVideoSearchQuery(
  project: ScienceProject,
  grade: number,
  interest?: string
): string {
  const parts = [
    project.title,
    ...project.materials.slice(0, 4),
    interest,
    `class ${grade}`,
    "science experiment",
  ].filter(Boolean);

  return parts.join(" ").replace(/\s+/g, " ").trim().slice(0, 120);
}

async function searchYoutubeDataApi(query: string, maxResults: number): Promise<ScienceProjectVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  try {
    const params = new URLSearchParams({
      part: "snippet",
      q: query,
      type: "video",
      maxResults: String(maxResults),
      safeSearch: "strict",
      relevanceLanguage: "en",
      key: apiKey,
    });

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params.toString()}`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) }
    );

    if (!response.ok) return [];

    const data = (await response.json()) as {
      items?: { id?: { videoId?: string }; snippet?: { title?: string; thumbnails?: { medium?: { url?: string }; high?: { url?: string } } } }[];
    };

    return (data.items ?? []).flatMap((item) => {
        const videoId = item.id?.videoId;
        const title = item.snippet?.title?.trim();
        if (!videoId || !title) return [];

        const thumbnailUrl =
          item.snippet?.thumbnails?.medium?.url ??
          item.snippet?.thumbnails?.high?.url ??
          YT_THUMB(videoId);

        return [
          {
            title,
            platform: "youtube" as const,
            watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnailUrl,
          },
        ];
      });
  } catch {
    return [];
  }
}

async function searchYoutubeInvidious(query: string, maxResults: number): Promise<ScienceProjectVideo[]> {
  const instances = ["https://invidious.perennialte.ch", "https://inv.nade.social"];

  for (const base of instances) {
    try {
      const response = await fetch(
        `${base}/api/v1/search?q=${encodeURIComponent(query)}&type=video`,
        { signal: AbortSignal.timeout(4500), next: { revalidate: 3600 } }
      );

      if (!response.ok) continue;

      const data = (await response.json()) as {
        videoId?: string;
        title?: string;
        videoThumbnails?: { quality?: string; url?: string }[];
      }[];

      return data.slice(0, maxResults).flatMap((item) => {
        if (!item.videoId || !item.title) return [];

        const thumb =
          item.videoThumbnails?.find((t) => t.quality === "medium")?.url ??
          item.videoThumbnails?.[0]?.url ??
          YT_THUMB(item.videoId);

        return [
          {
            title: item.title,
            platform: "youtube" as const,
            watchUrl: `https://www.youtube.com/watch?v=${item.videoId}`,
            thumbnailUrl: thumb,
          },
        ];
      });
    } catch {
      continue;
    }
  }

  return [];
}

export async function searchExternalTutorialVideos(
  project: ScienceProject,
  grade: number,
  interest?: string,
  maxResults = 4
): Promise<ScienceProjectVideo[]> {
  const query = buildProjectVideoSearchQuery(project, grade, interest);
  if (!query) return [];

  const fromApi = await searchYoutubeDataApi(query, maxResults);
  if (fromApi.length > 0) return fromApi;

  return searchYoutubeInvidious(query, maxResults);
}
