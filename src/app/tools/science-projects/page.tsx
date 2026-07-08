import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { ScienceProjectsForm } from "@/components/tools/science-projects-form";
import { TOOL_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(TOOL_SEO["science-projects"]);

export default function ScienceProjectsPage() {
  return (
    <ToolLayout
      title="School Projects"
      description="Discover fun, safe school project ideas tailored to your class level."
      iconKey="FlaskConical"
      learnMoreKey="science-projects"
      path={TOOL_SEO["science-projects"].path}
    >
      <ScienceProjectsForm />
    </ToolLayout>
  );
}
