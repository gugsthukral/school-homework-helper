"use client";

import { useState } from "react";
import { ExternalLink, FlaskConical, ListOrdered, Play, Youtube } from "lucide-react";
import type {
  EnrichedScienceProject,
  ScienceProjectStep,
  ScienceProjectStepMedia,
  ScienceProjectVideo,
} from "@/lib/science-projects-types";
import { ResultExportActions } from "@/components/tools/result-export-actions";
import { ResultShareIcons } from "@/components/tools/result-share-icons";
import { slugifyFileName } from "@/lib/export-result";

type ScienceProjectsResultProps = {
  projects: EnrichedScienceProject[];
  markdown: string;
  grade: number;
};

function formatProjectShareContent(project: EnrichedScienceProject): string {
  const steps = project.steps
    .map((step) => `${step.stepNumber}. ${step.title} — ${step.description}`)
    .join("\n");

  const lines = [
    `Difficulty: ${project.difficulty}`,
    `Materials: ${project.materials.join(", ")}`,
    "",
    "Steps:",
    steps,
    "",
    `What you'll learn: ${project.learningOutcome}`,
  ];

  if (project.videos.length > 0) {
    lines.push("", `Tutorial video: ${project.videos[0].title}`);
  }

  return lines.join("\n");
}

function formatAllProjectsContent(projects: EnrichedScienceProject[], markdown: string): string {
  if (markdown.trim()) return markdown;

  return projects
    .map((project, index) => `Project ${index + 1}: ${project.title}\n${formatProjectShareContent(project)}`)
    .join("\n\n");
}

function platformLabel(platform: ScienceProjectVideo["platform"]) {
  if (platform === "youtube-shorts") return "YouTube Shorts";
  if (platform === "vimeo") return "Vimeo";
  return "YouTube";
}

function platformBadgeClass(platform: ScienceProjectVideo["platform"]) {
  if (platform === "youtube-shorts") return "bg-red-500/20 text-red-300";
  if (platform === "vimeo") return "bg-sky-500/20 text-sky-300";
  return "bg-red-600/20 text-red-200";
}

function TutorialVideosSection({ videos }: { videos: ScienceProjectVideo[] }) {
  const [hiddenCount, setHiddenCount] = useState(0);

  if (videos.length === 0 || hiddenCount >= videos.length) {
    return null;
  }

  return (
    <section>
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-300">
        <Youtube className="h-4 w-4 text-red-400" />
        Tutorial Videos
      </h4>
      <div
        className={`grid gap-3 ${
          videos.length - hiddenCount === 1
            ? "sm:max-w-sm"
            : videos.length - hiddenCount === 2
              ? "sm:grid-cols-2"
              : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {videos.map((video) => (
          <VideoCardWithFallback
            key={video.watchUrl}
            video={video}
            onUnavailable={() => setHiddenCount((count) => count + 1)}
          />
        ))}
      </div>
    </section>
  );
}

function VideoCardWithFallback({
  video,
  onUnavailable,
}: {
  video: ScienceProjectVideo;
  onUnavailable: () => void;
}) {
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable) return null;

  return (
    <a
      href={video.watchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl border border-sky-400/15 bg-navy-900/50 transition-all hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-500/10"
    >
      <div className="relative aspect-video overflow-hidden bg-navy-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnailUrl}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={() => {
            setUnavailable(true);
            onUnavailable();
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg">
            <Play className="h-5 w-5 fill-white pl-0.5" />
          </span>
        </div>
        <span
          className={`absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${platformBadgeClass(video.platform)}`}
        >
          {platformLabel(video.platform)}
        </span>
      </div>
      <div className="flex items-start justify-between gap-2 p-3">
        <p className="line-clamp-2 text-xs font-medium text-sky-100/90 group-hover:text-white">
          {video.title}
        </p>
        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-sky-400/50 group-hover:text-orange-400" />
      </div>
    </a>
  );
}

function StepImage({ image }: { image: ScienceProjectStepMedia }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-sky-400/10 bg-navy-950/60">
      {!loaded && (
        <div className="flex h-40 items-center justify-center bg-sky-400/5">
          <div className="h-8 w-8 animate-pulse rounded-full bg-sky-400/20" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.imageUrl}
        alt=""
        className={`max-h-52 w-full object-cover ${loaded ? "block" : "hidden"}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function StepGuideSection({
  steps,
  stepImages,
}: {
  steps: ScienceProjectStep[];
  stepImages: ScienceProjectStepMedia[];
}) {
  return (
    <section>
      <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-300">
        <ListOrdered className="h-4 w-4 text-orange-400" />
        Step-by-Step Guide
      </h4>

      <div className="relative">
        {steps.map((step, index) => {
          const stepImage = stepImages.find((img) => img.stepNumber === step.stepNumber);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.stepNumber} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-400 text-sm font-bold text-white shadow-lg shadow-orange-500/30">
                  {step.stepNumber}
                </span>
                {!isLast && (
                  <span className="my-1 w-0.5 flex-1 min-h-[2rem] bg-gradient-to-b from-orange-500/40 to-sky-400/10" />
                )}
              </div>

              <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-6"}`}>
                <div className="rounded-xl border border-sky-400/10 bg-navy-950/40 p-4 sm:p-5">
                  <h5 className="text-base font-semibold text-white">{step.title}</h5>
                  <p className="mt-2 text-sm leading-relaxed text-sky-200/75">
                    {step.description}
                  </p>
                  {stepImage && <StepImage image={stepImage} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ScienceProjectsResult({ projects, markdown, grade }: ScienceProjectsResultProps) {
  return (
    <div className="space-y-8">
      <div className="glass-card flex flex-wrap items-center justify-between gap-3 rounded-2xl border-b border-sky-400/10 bg-sky-400/5 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <FlaskConical className="h-5 w-5 text-sky-400" />
          <div>
            <h2 className="font-semibold text-white">School Project Ideas</h2>
            <p className="text-xs text-sky-300/50">
              Class {grade} · {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <ResultExportActions
          content={formatAllProjectsContent(projects, markdown)}
          fileName={`science-projects-class-${grade}`}
          title="School Project Ideas"
          subtitle={`Class ${grade}`}
          showShare={false}
        />
      </div>

      {projects.map((project, index) => (
        <article
          key={`${project.title}-${index}`}
          className="glass-card animate-fade-up overflow-hidden rounded-2xl"
        >
          <div className="border-b border-sky-400/10 bg-gradient-to-r from-sky-400/5 to-transparent px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <span className="inline-flex items-center rounded-full bg-orange-500/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-orange-300">
                  Project {index + 1}
                </span>
                <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">{project.title}</h3>
              </div>
              <div className="flex shrink-0 flex-row flex-wrap items-center gap-3 sm:flex-col sm:items-end">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    project.difficulty === "Easy"
                      ? "bg-green-500/15 text-green-300 ring-1 ring-green-500/20"
                      : project.difficulty === "Medium"
                        ? "bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/20"
                        : "bg-red-500/15 text-red-300 ring-1 ring-red-500/20"
                  }`}
                >
                  {project.difficulty}
                </span>
                <ResultShareIcons
                  content={formatProjectShareContent(project)}
                  title={project.title}
                  subtitle={`Class ${grade} · ${project.difficulty} · Project ${index + 1}`}
                  sharePath="/tools/science-projects"
                />
              </div>
            </div>
            <p className="mt-4 rounded-lg border border-sky-400/10 bg-navy-950/30 px-4 py-3 text-sm leading-relaxed text-sky-200/75">
              <span className="font-medium text-sky-300">What you&apos;ll learn: </span>
              {project.learningOutcome}
            </p>
          </div>

          <div className="space-y-8 px-4 py-6 sm:px-6">
            <section>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-sky-300">
                Materials Needed
              </h4>
              <ul className="flex flex-wrap gap-2">
                {project.materials.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-sky-400/15 bg-sky-400/5 px-3 py-1.5 text-xs font-medium text-sky-100/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <TutorialVideosSection videos={project.videos} />

            <StepGuideSection steps={project.steps} stepImages={project.stepImages} />

            <div className="flex flex-wrap gap-2 border-t border-sky-400/10 pt-6">
              <ResultExportActions
                content={formatProjectShareContent(project)}
                fileName={`${slugifyFileName(project.title)}-class-${grade}`}
                title={project.title}
                subtitle={`Class ${grade} · ${project.difficulty} · Project ${index + 1}`}
                showShare={false}
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
