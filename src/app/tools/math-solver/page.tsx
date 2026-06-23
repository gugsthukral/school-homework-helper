import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { MathSolverForm } from "@/components/tools/math-solver-form";

export const metadata: Metadata = {
  title: "Math Solver | School Homework Helper",
  description: "Solve arithmetic, algebra, geometry, and word problems with step-by-step explanations.",
};

export default function MathSolverPage() {
  return (
    <ToolLayout
      title="Math Solver"
      description="Get step-by-step solutions for arithmetic, algebra, geometry, and word problems."
      icon={<Calculator className="h-7 w-7 text-sky-300" />}
    >
      <MathSolverForm />
    </ToolLayout>
  );
}
