import type {
  EnrichedScienceProject,
  ScienceProject,
  ScienceProjectStepMedia,
  ScienceProjectVideo,
} from "@/lib/science-projects-types";

type MediaBundle = {
  tags: string[];
  videos: (Omit<ScienceProjectVideo, "title"> & { defaultTitle: string })[];
  images: { url: string; alt: string }[];
};

const YT_THUMB = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

const MEDIA_LIBRARY: MediaBundle[] = [
  {
    tags: ["volcano", "volcano experiment", "baking soda volcano", "eruption demo"],
    videos: [
      {
        defaultTitle: "Baking Soda Volcano Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=a-rC4qXyHbQ",
        thumbnailUrl: YT_THUMB("a-rC4qXyHbQ"),
      },
      {
        defaultTitle: "Volcano Science Experiment for Kids",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=f5wgsQP5L4M",
        thumbnailUrl: YT_THUMB("f5wgsQP5L4M"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Volcano_experiment.jpg/640px-Volcano_experiment.jpg",
        alt: "Volcano experiment setup",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Baking_soda.jpg/640px-Baking_soda.jpg",
        alt: "Baking soda materials",
      },
    ],
  },
  {
    tags: ["lemon battery", "potato battery", "fruit battery", "simple circuit"],
    videos: [
      {
        defaultTitle: "Lemon Battery Tutorial",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=WNx-bwlTATI",
        thumbnailUrl: YT_THUMB("WNx-bwlTATI"),
      },
      {
        defaultTitle: "Lemon Battery Science DIY",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=EWyTMxVzb5U",
        thumbnailUrl: YT_THUMB("EWyTMxVzb5U"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Lemon-Battery.jpg/640px-Lemon-Battery.jpg",
        alt: "Lemon battery experiment",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/LEDs.jpg/640px-LEDs.jpg",
        alt: "LED connected in circuit",
      },
    ],
  },
  {
    tags: [
      "plant growth",
      "growing plant",
      "plant",
      "seed",
      "seeds",
      "germination",
      "photosynthesis",
      "leaf",
      "garden",
      "soil",
    ],
    videos: [
      {
        defaultTitle: "Plant Growth Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=-rJdVQNy6TY",
        thumbnailUrl: YT_THUMB("-rJdVQNy6TY"),
      },
      {
        defaultTitle: "Grow a Bean Plant in a Jar",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=RTRW2Cf9U2U",
        thumbnailUrl: YT_THUMB("RTRW2Cf9U2U"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Germinating_pea.jpg/640px-Germinating_pea.jpg",
        alt: "Seed germination",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Plants_in_pots.jpg/640px-Plants_in_pots.jpg",
        alt: "Plants growing in pots",
      },
    ],
  },
  {
    tags: [
      "acid base",
      "acids and bases",
      "acid and base",
      "ph level",
      "effect on plant",
      "plant and acid",
      "lemon juice plant",
    ],
    videos: [
      {
        defaultTitle: "Seed Germination Factors Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=Lq2Q5ZerNp0",
        thumbnailUrl: YT_THUMB("Lq2Q5ZerNp0"),
      },
      {
        defaultTitle: "Watch a Seed Sprout",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=-rJdVQNy6TY",
        thumbnailUrl: YT_THUMB("-rJdVQNy6TY"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Germinating_pea.jpg/640px-Germinating_pea.jpg",
        alt: "Seed germination experiment",
      },
    ],
  },
  {
    tags: ["magnet", "magnetic", "compass", "iron", "attraction"],
    videos: [
      {
        defaultTitle: "Magnet Experiments for Kids",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=orMuGrAN9Sk",
        thumbnailUrl: YT_THUMB("orMuGrAN9Sk"),
      },
      {
        defaultTitle: "Flying Bug Magnet Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=5hSO75D0HDA",
        thumbnailUrl: YT_THUMB("5hSO75D0HDA"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Horseshoe-magnet.jpg/640px-Horseshoe-magnet.jpg",
        alt: "Horseshoe magnet",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Magnetic_field_of_horseshoe_magnet.png/640px-Magnetic_field_of_horseshoe_magnet.png",
        alt: "Magnetic field diagram",
      },
    ],
  },
  {
    tags: ["water", "filtration", "purification", "filter", "clean"],
    videos: [
      {
        defaultTitle: "Water Filter Project",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=bqcll80EwWk",
        thumbnailUrl: YT_THUMB("bqcll80EwWk"),
      },
      {
        defaultTitle: "Turn Dirty Water into Clean Water",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=vh_63fV1lgI",
        thumbnailUrl: YT_THUMB("vh_63fV1lgI"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Water_filtration_system.jpg/640px-Water_filtration_system.jpg",
        alt: "Water filtration setup",
      },
    ],
  },
  {
    tags: ["sound", "vibration", "string", "telephone", "wave"],
    videos: [
      {
        defaultTitle: "Sound Vibrations Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=3yqB2KFwJCo",
        thumbnailUrl: YT_THUMB("3yqB2KFwJCo"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tuning_fork_by_johnnys.png/640px-Tuning_fork_by_johnnys.png",
        alt: "Sound vibration with tuning fork",
      },
    ],
  },
  {
    tags: ["rgb led", "led strip", "color mixing", "colour changing", "multicolor led", "light strip"],
    videos: [
      {
        defaultTitle: "RGB LED Color Mixing with Arduino",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=YqHkULDmmGU",
        thumbnailUrl: YT_THUMB("YqHkULDmmGU"),
      },
      {
        defaultTitle: "RGB LED Colour Mixing Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=hS7Sn4BDZzQ",
        thumbnailUrl: YT_THUMB("hS7Sn4BDZzQ"),
      },
      {
        defaultTitle: "Color Light Mixing Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=LNKaRKo7n24",
        thumbnailUrl: YT_THUMB("LNKaRKo7n24"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/LEDs.jpg/640px-LEDs.jpg",
        alt: "RGB LED lights",
      },
    ],
  },
  {
    tags: ["shadow experiment", "mirror reflection", "prism", "refraction", "light and shadow"],
    videos: [
      {
        defaultTitle: "Shadow and Light Science Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=5Mjefp037wU",
        thumbnailUrl: YT_THUMB("5Mjefp037wU"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Shadow_hand.jpg/640px-Shadow_hand.jpg",
        alt: "Shadow experiment",
      },
    ],
  },
  {
    tags: ["pressure", "force", "friction", "motion", "newton"],
    videos: [
      {
        defaultTitle: "Force and Pressure Demo",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=GXSXUQNJ8fk",
        thumbnailUrl: YT_THUMB("GXSXUQNJ8fk"),
      },
      {
        defaultTitle: "What is Friction in Physics?",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=C7NPD9W0kro",
        thumbnailUrl: YT_THUMB("C7NPD9W0kro"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Newtons_cradle_animation_book_2.gif/440px-Newtons_cradle_animation_book_2.gif",
        alt: "Force and motion demonstration",
      },
    ],
  },
  {
    tags: ["rust", "corrosion", "iron", "metal", "oxidation"],
    videos: [
      {
        defaultTitle: "Rusting of Iron Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=qd2B9yCKzc0",
        thumbnailUrl: YT_THUMB("qd2B9yCKzc0"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/RustyChainEdit1.jpg/640px-RustyChainEdit1.jpg",
        alt: "Rusted iron chain",
      },
    ],
  },
  {
    tags: ["density", "float", "sink", "buoyancy", "liquid"],
    videos: [
      {
        defaultTitle: "Density Tower Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=GuLlRoG6ahc",
        thumbnailUrl: YT_THUMB("GuLlRoG6ahc"),
      },
      {
        defaultTitle: "Denser Than You Think",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=Z50jEi1igNQ",
        thumbnailUrl: YT_THUMB("Z50jEi1igNQ"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Density_column.png/640px-Density_column.png",
        alt: "Density column layers",
      },
    ],
  },
  {
    tags: ["solar", "space", "planet", "sun", "moon", "astronomy"],
    videos: [
      {
        defaultTitle: "Solar System Model",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=libKVRa01L8",
        thumbnailUrl: YT_THUMB("libKVRa01L8"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Solar_system.jpg/640px-Solar_system.jpg",
        alt: "Solar system diagram",
      },
    ],
  },
  {
    tags: ["weather", "rain", "cloud", "climate", "wind"],
    videos: [
      {
        defaultTitle: "Water Cycle Model",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=al-do-HGuIk",
        thumbnailUrl: YT_THUMB("al-do-HGuIk"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Water_cycle.png/640px-Water_cycle.png",
        alt: "Water cycle diagram",
      },
    ],
  },
  {
    tags: ["crystal", "crystallization", "salt", "sugar", "dissolve", "solution"],
    videos: [
      {
        defaultTitle: "Crystal Growing Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=VpOU0Fo7QfU",
        thumbnailUrl: YT_THUMB("VpOU0Fo7QfU"),
      },
      {
        defaultTitle: "Creating Rock Candy Crystals",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=2Ju6F0rDLRs",
        thumbnailUrl: YT_THUMB("2Ju6F0rDLRs"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Crystalized_copper_sulfate.jpg/640px-Crystalized_copper_sulfate.jpg",
        alt: "Crystal growth experiment",
      },
    ],
  },
  {
    tags: ["balloon", "air", "pump", "inflate", "lung", "breathing"],
    videos: [
      {
        defaultTitle: "Balloon Air Pressure Demo",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=Zq-jeGOzZs4",
        thumbnailUrl: YT_THUMB("Zq-jeGOzZs4"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Balloon_inflating.jpg/640px-Balloon_inflating.jpg",
        alt: "Balloon inflation experiment",
      },
    ],
  },
  {
    tags: ["paper", "bridge", "structure", "tower", "build", "cardboard"],
    videos: [
      {
        defaultTitle: "Paper Bridge Engineering",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=CqYGVW2Eu6Y",
        thumbnailUrl: YT_THUMB("CqYGVW2Eu6Y"),
      },
      {
        defaultTitle: "STEM Challenge: Build a Bridge",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=g8mFuuyZC6A",
        thumbnailUrl: YT_THUMB("g8mFuuyZC6A"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Paper_bridge.jpg/640px-Paper_bridge.jpg",
        alt: "Paper bridge structure",
      },
    ],
  },
  {
    tags: ["soil", "compost", "earthworm", "decompose", "organic"],
    videos: [
      {
        defaultTitle: "Soil and Compost Science",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=Q5s4n9r-JGU",
        thumbnailUrl: YT_THUMB("Q5s4n9r-JGU"),
      },
      {
        defaultTitle: "Compost in a Cup Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=f8-q4I89WdM",
        thumbnailUrl: YT_THUMB("f8-q4I89WdM"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Compost_bin.jpg/640px-Compost_bin.jpg",
        alt: "Compost and soil study",
      },
    ],
  },
  {
    tags: ["thermometer", "temperature", "heat", "insulation", "cooling", "warm"],
    videos: [
      {
        defaultTitle: "Heat Transfer Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=KT26zGK_Igo",
        thumbnailUrl: YT_THUMB("KT26zGK_Igo"),
      },
      {
        defaultTitle: "Heat Conduction Experiment",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=ulWUMIugM44",
        thumbnailUrl: YT_THUMB("ulWUMIugM44"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Thermometer_CF.jpg/640px-Thermometer_CF.jpg",
        alt: "Temperature measurement",
      },
    ],
  },
  {
    tags: ["insect", "butterfly", "ant", "habitat", "observe", "ecosystem"],
    videos: [
      {
        defaultTitle: "Insect Observation Project",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=EIVWtXjcfhA",
        thumbnailUrl: YT_THUMB("EIVWtXjcfhA"),
      },
      {
        defaultTitle: "Raise Your Own Monarch Butterfly",
        platform: "youtube",
        watchUrl: "https://www.youtube.com/watch?v=ifHI8r1sO7E",
        thumbnailUrl: YT_THUMB("ifHI8r1sO7E"),
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Monarch_Butterfly.jpg/640px-Monarch_Butterfly.jpg",
        alt: "Butterfly observation",
      },
    ],
  },
];

function extractYoutubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

function normalizeWatchUrl(
  platform: ScienceProjectVideo["platform"],
  url: string
): string | null {
  if (platform === "vimeo") {
    return url.includes("vimeo.com") ? url : null;
  }

  const id = extractYoutubeId(url);
  if (!id) return null;

  return platform === "youtube-shorts"
    ? `https://www.youtube.com/shorts/${id}`
    : `https://www.youtube.com/watch?v=${id}`;
}

const IRRELEVANT_VIDEO_KEYWORDS = [
  "welding",
  "weld",
  "arc weld",
  "nova",
  "tig ",
  "mig ",
  "fabricat",
  "sword",
  "weapon",
  "gameplay",
  "minecraft",
  "prank",
  "music video",
  "trailer",
  "full movie",
];

const TOPIC_CONFLICTS: [string[], string[]][] = [
  [["volcano", "eruption", "lava"], ["plant", "seed", "germination", "growing", "garden", "sprout"]],
  [["magnet", "magnetic", "compass"], ["plant", "seed", "volcano", "water filter", "crystal"]],
  [["led", "rgb", "circuit", "arduino"], ["plant", "volcano", "magnet", "seed"]],
  [["butterfly", "insect", "monarch"], ["magnet", "volcano", "led", "density"]],
];

const MATERIAL_ONLY_TAGS = new Set([
  "baking soda",
  "vinegar",
  "lemon juice",
  "water",
  "tape",
  "scissors",
  "paper",
  "soil",
  "notebook",
]);

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "your",
  "this",
  "that",
  "students",
  "learn",
  "about",
  "using",
  "make",
  "project",
  "experiment",
  "science",
  "class",
  "simple",
  "easy",
  "step",
  "how",
  "what",
  "when",
  "will",
  "into",
  "each",
  "also",
  "them",
  "their",
  "then",
  "than",
  "have",
  "been",
  "were",
  "work",
  "works",
  "show",
  "shows",
]);

function projectFocusText(project: ScienceProject): string {
  return `${project.title} ${project.learningOutcome}`.toLowerCase();
}

function extractFocusKeywords(project: ScienceProject): string[] {
  const text = projectFocusText(project);

  const words = text
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3 && !STOP_WORDS.has(word));

  return [...new Set(words)];
}

function hasTopicConflict(projectFocus: string, videoTitle: string): boolean {
  const videoLower = videoTitle.toLowerCase();

  for (const [groupA, groupB] of TOPIC_CONFLICTS) {
    const projectInA = groupA.some((keyword) => projectFocus.includes(keyword));
    const projectInB = groupB.some((keyword) => projectFocus.includes(keyword));
    const videoInA = groupA.some((keyword) => videoLower.includes(keyword));
    const videoInB = groupB.some((keyword) => videoLower.includes(keyword));

    if (projectInB && videoInA && !projectInA) return true;
    if (projectInA && videoInB && !projectInB) return true;
  }

  return false;
}

function extractProjectKeywords(project: ScienceProject): string[] {
  const text = `${project.title} ${project.learningOutcome} ${project.materials.join(" ")} ${project.steps.map((s) => `${s.title} ${s.description}`).join(" ")}`.toLowerCase();

  const words = text
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3 && !STOP_WORDS.has(word));

  return [...new Set(words)];
}

function isVideoRelevantToProject(
  project: ScienceProject,
  videoTitle: string,
  bundleTags: string[]
): boolean {
  const videoLower = videoTitle.toLowerCase();
  const projectFocus = projectFocusText(project);

  if (IRRELEVANT_VIDEO_KEYWORDS.some((keyword) => videoLower.includes(keyword))) {
    return false;
  }

  if (hasTopicConflict(projectFocus, videoLower)) {
    return false;
  }

  const bundleTagInVideo = bundleTags.some((tag) => tagMatchesText(videoLower, tag));
  const bundleTagInFocus = bundleTags.some((tag) => tagMatchesText(projectFocus, tag));

  if (bundleTagInVideo && bundleTagInFocus) {
    return true;
  }

  const focusKeywords = extractFocusKeywords(project);
  const focusHits = focusKeywords.filter(
    (keyword) =>
      videoLower.includes(keyword) ||
      videoLower
        .split(/[^a-z0-9]+/)
        .some((word) => word.length > 3 && (word.includes(keyword) || keyword.includes(word)))
  );

  const tagHits = bundleTags.filter((tag) => {
    if (tag.includes(" ")) {
      return videoLower.includes(tag) && projectFocus.includes(tag.split(" ")[0]);
    }
    return videoLower.includes(tag) && tag.length > 4 && projectFocus.includes(tag);
  });

  if (focusHits.length >= 1 || tagHits.length >= 1) {
    return true;
  }

  const projectKeywords = extractProjectKeywords(project);
  const keywordHits = projectKeywords.filter(
    (keyword) =>
      focusKeywords.includes(keyword) &&
      (videoLower.includes(keyword) ||
        videoLower
          .split(/[^a-z0-9]+/)
          .some((word) => word.length > 3 && (word.includes(keyword) || keyword.includes(word))))
  );

  return keywordHits.length >= 2;
}

async function verifyVideoForProject(
  video: ScienceProjectVideo,
  project: ScienceProject,
  bundleTags: string[]
): Promise<ScienceProjectVideo | null> {
  const normalizedUrl = normalizeWatchUrl(video.platform, video.watchUrl);
  if (!normalizedUrl) return null;

  const videoId = extractYoutubeId(normalizedUrl);
  const oembedTargetUrl =
    video.platform === "vimeo"
      ? normalizedUrl
      : videoId
        ? `https://www.youtube.com/watch?v=${videoId}`
        : normalizedUrl;

  const oembedUrl =
    video.platform === "vimeo"
      ? `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(oembedTargetUrl)}`
      : `https://www.youtube.com/oembed?url=${encodeURIComponent(oembedTargetUrl)}&format=json`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(oembedUrl, {
      signal: controller.signal,
      next: { revalidate: 86400 },
    });
    clearTimeout(timeout);

    if (!response.ok) return null;

    const data = (await response.json()) as { title?: string };
    const oembedTitle = data.title?.trim() ?? "";

    if (!oembedTitle || !isVideoRelevantToProject(project, oembedTitle, bundleTags)) {
      return null;
    }

    const id = extractYoutubeId(normalizedUrl);

    return {
      title: oembedTitle,
      platform: video.platform,
      watchUrl: normalizedUrl,
      thumbnailUrl:
        video.platform === "vimeo"
          ? video.thumbnailUrl
          : id
            ? YT_THUMB(id)
            : video.thumbnailUrl,
    };
  } catch {
    return null;
  }
}

async function verifyVideosForProject(
  project: ScienceProject,
  videos: ScienceProjectVideo[],
  bundleTags: string[],
  usedVideoUrls: Set<string>
): Promise<ScienceProjectVideo[]> {
  const candidates = videos.filter((video) => {
    const url = normalizeWatchUrl(video.platform, video.watchUrl);
    return url && !usedVideoUrls.has(url);
  });

  for (const video of candidates) {
    const verified = await verifyVideoForProject(video, project, bundleTags);
    if (verified) {
      usedVideoUrls.add(verified.watchUrl);
      return [verified];
    }
  }

  return [];
}

async function isImageAvailable(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(url, {
      method: "GET",
      headers: { Range: "bytes=0-512" },
      signal: controller.signal,
      next: { revalidate: 86400 },
    });
    clearTimeout(timeout);
    return response.ok || response.status === 206;
  } catch {
    return false;
  }
}

async function filterAvailableStepImages(
  stepImages: ScienceProjectStepMedia[]
): Promise<ScienceProjectStepMedia[]> {
  const checks = await Promise.all(
    stepImages.map(async (image) => ({
      image,
      available: await isImageAvailable(image.imageUrl),
    }))
  );

  return checks.filter(({ available }) => available).map(({ image }) => image);
}

function tagMatchesText(text: string, tag: string): boolean {
  const normalizedTag = tag.toLowerCase();

  if (normalizedTag.includes(" ")) {
    return text.includes(normalizedTag);
  }

  if (normalizedTag.length <= 3) return false;

  const stem = normalizedTag.replace(/s$/, "");
  const pattern = new RegExp(`\\b${tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:s|es)?\\b`, "i");
  if (pattern.test(text)) return true;

  if (stem.length > 3) {
    const stemPattern = new RegExp(`\\b${stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:s|es)?\\b`, "i");
    return stemPattern.test(text);
  }

  return false;
}

function scoreBundle(text: string, tags: string[]): number {
  return tags.reduce((score, tag) => {
    const normalizedTag = tag.toLowerCase();

    if (MATERIAL_ONLY_TAGS.has(normalizedTag)) {
      return score;
    }

    if (normalizedTag.includes(" ")) {
      return tagMatchesText(text, normalizedTag) ? score + 2 : score;
    }

    return tagMatchesText(text, normalizedTag) ? score + 1 : score;
  }, 0);
}

type BundleMatch = { bundle: MediaBundle; index: number; focusScore: number; totalScore: number };

function rankBundles(
  project: ScienceProject,
  usedIndices: Set<number>,
  interest?: string
): BundleMatch[] {
  const focusText = `${projectFocusText(project)} ${interest ?? ""}`.toLowerCase();
  const detailText = [
    ...project.materials,
    ...project.steps.map((step) => `${step.title} ${step.description}`),
  ]
    .join(" ")
    .toLowerCase();

  return MEDIA_LIBRARY.map((bundle, index) => {
    const focusScore = scoreBundle(focusText, bundle.tags);
    const detailScore = scoreBundle(detailText, bundle.tags);
    const totalScore = focusScore * 3 + detailScore;

    return { index, bundle, focusScore, totalScore };
  })
    .filter(
      (item) =>
        !usedIndices.has(item.index) &&
        item.focusScore >= 2 &&
        item.totalScore >= 4
    )
    .sort((a, b) => b.focusScore - a.focusScore || b.totalScore - a.totalScore);
}

function buildStepImages(
  project: ScienceProject,
  images: { url: string; alt: string }[]
): ScienceProjectStepMedia[] {
  if (images.length === 0) return [];

  return project.steps
    .map((step, index) => {
      const image = images[index];
      if (!image) return null;

      return {
        stepNumber: step.stepNumber,
        caption: step.title,
        imageUrl: image.url,
        alt: image.alt,
      };
    })
    .filter((item): item is ScienceProjectStepMedia => item !== null);
}

export async function enrichScienceProject(
  project: ScienceProject,
  usedIndices: Set<number>,
  usedVideoUrls: Set<string>,
  interest?: string
): Promise<EnrichedScienceProject> {
  const rankedBundles = rankBundles(project, usedIndices, interest);

  for (const match of rankedBundles) {
    const candidateVideos: ScienceProjectVideo[] = match.bundle.videos
      .map((video) => {
        const normalizedUrl = normalizeWatchUrl(video.platform, video.watchUrl);
        if (!normalizedUrl) return null;

        const id = extractYoutubeId(normalizedUrl);
        const thumbnailUrl =
          video.platform === "vimeo"
            ? video.thumbnailUrl
            : id
              ? YT_THUMB(id)
              : video.thumbnailUrl;

        return {
          title: video.defaultTitle,
          platform: video.platform,
          watchUrl: normalizedUrl,
          thumbnailUrl,
        };
      })
      .filter((video): video is ScienceProjectVideo => video !== null);

    const candidateStepImages = buildStepImages(project, match.bundle.images);

    const [videos, stepImages] = await Promise.all([
      verifyVideosForProject(project, candidateVideos, match.bundle.tags, usedVideoUrls),
      filterAvailableStepImages(candidateStepImages),
    ]);

    if (videos.length === 0) continue;

    usedIndices.add(match.index);
    return {
      ...project,
      videos,
      stepImages,
    };
  }

  return { ...project, videos: [], stepImages: [] };
}

export async function enrichScienceProjects(
  projects: ScienceProject[],
  _grade: number,
  interest?: string
): Promise<EnrichedScienceProject[]> {
  const usedIndices = new Set<number>();
  const usedVideoUrls = new Set<string>();
  const enriched: EnrichedScienceProject[] = [];

  for (const project of projects) {
    enriched.push(
      await enrichScienceProject(project, usedIndices, usedVideoUrls, interest)
    );
  }

  return enriched;
}

export function parseScienceProjectsResponse(raw: string): ScienceProject[] {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();

  let payload: { projects?: ScienceProject[] };

  try {
    payload = JSON.parse(cleaned) as { projects?: ScienceProject[] };
  } catch {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse project data.");
    }
    payload = JSON.parse(jsonMatch[0]) as { projects?: ScienceProject[] };
  }

  if (!payload.projects?.length) {
    throw new Error("No projects returned.");
  }

  return normalizeProjectsForClass(
    payload.projects.map((project, index) => normalizeScienceProject(project, index))
  );
}

function isTooSimilarToAny(project: ScienceProject, selected: ScienceProject[]): boolean {
  const projectWords = new Set(
    `${project.title} ${project.materials.join(" ")}`
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 3)
  );

  return selected.some((existing) => {
    const existingWords = `${existing.title} ${existing.materials.join(" ")}`
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 3);

    const shared = existingWords.filter((word) => projectWords.has(word));
    return shared.length >= 2;
  });
}

function pickDistinctProject(
  candidates: ScienceProject[],
  selected: ScienceProject[]
): ScienceProject | undefined {
  return (
    candidates.find((project) => !selected.includes(project) && !isTooSimilarToAny(project, selected)) ??
    candidates.find((project) => !selected.includes(project))
  );
}

export function normalizeProjectsForClass(projects: ScienceProject[]): ScienceProject[] {
  const easy = projects.filter((project) => project.difficulty === "Easy");
  const medium = projects.filter((project) => project.difficulty === "Medium");
  const hard = projects.filter((project) => project.difficulty === "Hard");

  const selected: ScienceProject[] = [];

  for (const project of easy) {
    if (selected.filter((item) => item.difficulty === "Easy").length >= 2) break;
    if (isTooSimilarToAny(project, selected)) continue;
    selected.push(project);
  }

  while (selected.filter((item) => item.difficulty === "Easy").length < 2) {
    const next = pickDistinctProject(easy, selected);
    if (!next) break;
    selected.push(next);
  }

  const mediumPick = pickDistinctProject(medium, selected);
  if (mediumPick) selected.push(mediumPick);

  const hardPick = pickDistinctProject(hard, selected);
  if (hardPick) selected.push(hardPick);

  if (selected.length < 4) {
    for (const project of projects) {
      if (selected.includes(project) || isTooSimilarToAny(project, selected)) continue;
      selected.push(project);
      if (selected.length >= 4) break;
    }
  }

  if (selected.length < 4) {
    for (const project of projects) {
      if (selected.includes(project)) continue;
      selected.push(project);
      if (selected.length >= 4) break;
    }
  }

  const finalProjects = selected.slice(0, 4);

  if (finalProjects.length >= 1) finalProjects[0] = { ...finalProjects[0], difficulty: "Easy" };
  if (finalProjects.length >= 2) finalProjects[1] = { ...finalProjects[1], difficulty: "Easy" };
  if (finalProjects.length >= 3) finalProjects[2] = { ...finalProjects[2], difficulty: "Medium" };
  if (finalProjects.length >= 4) finalProjects[3] = { ...finalProjects[3], difficulty: "Hard" };

  return finalProjects;
}

function normalizeScienceProject(
  project: ScienceProject,
  index: number
): ScienceProject {
  const difficulty = String(project.difficulty ?? "Easy");
  const normalizedDifficulty: ScienceProject["difficulty"] =
    difficulty === "Medium" || difficulty === "Hard" ? difficulty : "Easy";

  return {
    title: project.title?.trim() || `Project ${index + 1}`,
    difficulty: normalizedDifficulty,
    materials: Array.isArray(project.materials)
      ? project.materials.map((m) => String(m).trim()).filter(Boolean)
      : [],
    learningOutcome: project.learningOutcome?.trim() ?? "",
    steps: Array.isArray(project.steps)
      ? project.steps.map((step, stepIndex) => ({
          stepNumber: Number(step.stepNumber) || stepIndex + 1,
          title: step.title?.trim() || `Step ${stepIndex + 1}`,
          description: step.description?.trim() ?? "",
        }))
      : [],
  };
}

export function toEnrichedWithoutMedia(projects: ScienceProject[]): EnrichedScienceProject[] {
  return projects.map((project) => ({
    ...project,
    videos: [],
    stepImages: [],
  }));
}

export async function processScienceProjectsResponse(
  raw: string,
  grade: number,
  interest?: string
): Promise<EnrichedScienceProject[]> {
  try {
    const parsed = parseScienceProjectsResponse(raw);

    try {
      const enriched = await Promise.race([
        enrichScienceProjects(parsed, grade, interest),
        new Promise<EnrichedScienceProject[]>((resolve) => {
          setTimeout(() => resolve(toEnrichedWithoutMedia(parsed)), 20000);
        }),
      ]);
      return enriched;
    } catch {
      return toEnrichedWithoutMedia(parsed);
    }
  } catch {
    return [];
  }
}

/** Client-side fallback when structured projects are missing from the API response. */
export function parseProjectsForDisplay(raw: string): EnrichedScienceProject[] | null {
  try {
    return toEnrichedWithoutMedia(parseScienceProjectsResponse(raw));
  } catch {
    return null;
  }
}

export function projectsToMarkdown(projects: EnrichedScienceProject[]): string {
  return projects
    .map((project, index) => {
      const steps = project.steps
        .map(
          (step) =>
            `${step.stepNumber}. **${step.title}** — ${step.description}`
        )
        .join("\n");

      return `## Project ${index + 1}: ${project.title}
- **Difficulty:** ${project.difficulty}
- **Materials needed:** ${project.materials.join(", ")}
- **Steps:**
${steps}
- **What you'll learn:** ${project.learningOutcome}${project.videos.length > 0 ? `\n- **Tutorial videos:** ${project.videos.map((v) => v.title).join("; ")}` : ""}${project.stepImages.length > 0 ? `\n- **Visual guide:** ${project.stepImages.length} step illustration(s) included` : ""}`;
    })
    .join("\n\n");
}
