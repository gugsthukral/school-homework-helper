import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { HomeworkSolverForm } from "@/components/tools/homework-solver-form";
import { TOOL_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(TOOL_SEO["homework-solver"]);

export default function HomeworkSolverPage() {
  return (
    <ToolLayout
      title="Homework Solver"
      description="Enter any homework question and get a clear, step-by-step explanation tailored to your class level."
      iconKey="BookOpen"
    >
      <HomeworkSolverForm />
    </ToolLayout>
  );
}
