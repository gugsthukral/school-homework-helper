import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { EssayGeneratorForm } from "@/components/tools/essay-generator-form";
import { TOOL_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(TOOL_SEO["essay-generator"]);

export default function EssayGeneratorPage() {
  return (
    <ToolLayout
      title="Essay Generator"
      description="Write essays on any topic with the right word count and language for your class level."
      icon={<PenLine className="h-7 w-7 text-orange-400" />}
    >
      <EssayGeneratorForm />
    </ToolLayout>
  );
}
