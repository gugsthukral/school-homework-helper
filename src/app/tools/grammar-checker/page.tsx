import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { GrammarCheckerForm } from "@/components/tools/grammar-checker-form";
import { TOOL_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(TOOL_SEO["grammar-checker"]);

export default function GrammarCheckerPage() {
  return (
    <ToolLayout
      title="Grammar Checker"
      description="Fix grammar mistakes, get corrections, and learn from clear explanations."
      iconKey="SpellCheck"
      learnMoreKey="grammar-checker"
    >
      <GrammarCheckerForm />
    </ToolLayout>
  );
}
