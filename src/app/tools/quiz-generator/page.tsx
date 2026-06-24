import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { QuizGeneratorForm } from "@/components/tools/quiz-generator-form";
import { TOOL_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(TOOL_SEO["quiz-generator"]);

export default function QuizGeneratorPage() {
  return (
    <ToolLayout
      title="Quiz Generator"
      description="Create multiple-choice quizzes by subject or topic, with answers and explanations."
      icon={<HelpCircle className="h-7 w-7 text-orange-400" />}
    >
      <QuizGeneratorForm />
    </ToolLayout>
  );
}
