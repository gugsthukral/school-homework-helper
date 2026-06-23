export type ScienceProjectStep = {
  stepNumber: number;
  title: string;
  description: string;
};

export type ScienceProject = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  materials: string[];
  steps: ScienceProjectStep[];
  learningOutcome: string;
};

export type ScienceProjectVideo = {
  title: string;
  platform: "youtube" | "vimeo" | "youtube-shorts";
  watchUrl: string;
  thumbnailUrl: string;
};

export type ScienceProjectStepMedia = {
  stepNumber: number;
  caption: string;
  imageUrl: string;
  alt: string;
};

export type EnrichedScienceProject = ScienceProject & {
  videos: ScienceProjectVideo[];
  stepImages: ScienceProjectStepMedia[];
};

export type ScienceProjectsPayload = {
  projects: EnrichedScienceProject[];
};
