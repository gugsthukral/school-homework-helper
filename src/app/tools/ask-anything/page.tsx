import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { AskAnythingForm } from "@/components/tools/ask-anything-form";
import { TOOL_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(TOOL_SEO["ask-anything"]);

export default function AskAnythingPage() {
  return (
    <ToolLayout
      title="Ask Anything"
      description="Ask any school question and get a clear answer from your AI tutor. Type or use voice input."
      iconKey="MessageCircleQuestion"
    >
      <AskAnythingForm />
    </ToolLayout>
  );
}
