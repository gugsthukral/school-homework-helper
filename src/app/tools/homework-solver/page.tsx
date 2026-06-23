import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { HomeworkSolverForm } from "@/components/tools/homework-solver-form";

export const metadata: Metadata = {
  title: "Homework Solver | School Homework Helper",
  description:
    "Get step-by-step homework explanations for any question. AI-powered help for Classes 1 to 12.",
};

export default function HomeworkSolverPage() {
  return (
    <ToolLayout
      title="Homework Solver"
      description="Enter any homework question and get a clear, step-by-step explanation tailored to your class level."
      icon={<BookOpen className="h-7 w-7 text-sky-400" />}
    >
      <HomeworkSolverForm />
    </ToolLayout>
  );
}
