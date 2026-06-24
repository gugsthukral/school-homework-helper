import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { MathSolverForm } from "@/components/tools/math-solver-form";
import { TOOL_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(TOOL_SEO["math-solver"]);

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
