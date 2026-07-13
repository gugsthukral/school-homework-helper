"use client";

import dynamic from "next/dynamic";

const FifaFootballAnimationLazy = dynamic(
  () =>
    import("@/components/seasonal/fifa-football-animation").then(
      (mod) => mod.FifaFootballAnimation
    ),
  { ssr: false }
);

type FifaFootballLazyProps = {
  mode: "screen" | "hero";
};

/** Client wrapper — `dynamic(..., { ssr: false })` is only allowed in Client Components. */
export function FifaFootballLazy({ mode }: FifaFootballLazyProps) {
  return <FifaFootballAnimationLazy mode={mode} />;
}
