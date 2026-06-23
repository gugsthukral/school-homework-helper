import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { ScienceProjectsForm } from "@/components/tools/science-projects-form";

export const metadata: Metadata = {
  title: "Science Project Ideas | School Homework Helper",
  description: "Get class-wise science project ideas for Classes 1 to 12.",
};

export default function ScienceProjectsPage() {
  return (
    <ToolLayout
      title="Science Project Ideas"
      description="Discover fun, safe science project ideas tailored to your class level."
      icon={<FlaskConical className="h-7 w-7 text-orange-400" />}
    >
      <ScienceProjectsForm />
    </ToolLayout>
  );
}
