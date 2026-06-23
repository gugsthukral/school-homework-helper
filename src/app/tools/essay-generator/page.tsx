import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { EssayGeneratorForm } from "@/components/tools/essay-generator-form";

export const metadata: Metadata = {
  title: "Essay Generator | School Homework Helper",
  description: "Generate essays by topic, word count, and class level for Classes 1 to 12.",
};

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
