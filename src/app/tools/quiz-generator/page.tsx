import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { QuizGeneratorForm } from "@/components/tools/quiz-generator-form";

export const metadata: Metadata = {
  title: "Quiz Generator | School Homework Helper",
  description: "Generate MCQ quizzes from any topic for Classes 1 to 12.",
};

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
