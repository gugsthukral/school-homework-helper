import type { Metadata } from "next";
import { SpellCheck } from "lucide-react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { GrammarCheckerForm } from "@/components/tools/grammar-checker-form";

export const metadata: Metadata = {
  title: "Grammar Checker | School Homework Helper",
  description: "Check and correct English grammar and writing for school students.",
};

export default function GrammarCheckerPage() {
  return (
    <ToolLayout
      title="Grammar Checker"
      description="Fix grammar mistakes, get corrections, and learn from clear explanations."
      icon={<SpellCheck className="h-7 w-7 text-sky-400" />}
    >
      <GrammarCheckerForm />
    </ToolLayout>
  );
}
