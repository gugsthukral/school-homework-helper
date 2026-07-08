import type { Metadata } from "next";
import { ToolLayout } from "@/components/tools/tool-layout";
import { CalculatorForm } from "@/components/tools/calculator-form";
import { TOOL_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = buildPageMetadata(TOOL_SEO.calculator);

export default function CalculatorPage() {
  return (
    <ToolLayout
      title="AI Calculator"
      description="Calculate expressions, percentages, scientific values, and unit conversions with step-by-step explanations."
      iconKey="SquareFunction"
      learnMoreKey="calculator"
      path={TOOL_SEO.calculator.path}
    >
      <CalculatorForm />
    </ToolLayout>
  );
}
