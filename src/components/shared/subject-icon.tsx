import { Globe2, Sigma, TestTube2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const lucideIconMap: Record<string, LucideIcon> = {
  Sigma,
  TestTube: TestTube2,
  Globe2,
};

const letterIconMap: Record<string, string> = {
  Abc: "abc",
  Hindi: "अ",
  Punjabi: "ੳ",
};

type SubjectIconProps = {
  icon: string;
  className?: string;
};

export function SubjectIcon({ icon, className }: SubjectIconProps) {
  const letter = letterIconMap[icon];
  if (letter) {
    return (
      <span
        className={cn(
          "font-semibold leading-none tracking-tight",
          icon === "Abc" && "text-base lowercase",
          (icon === "Hindi" || icon === "Punjabi") && "text-xl",
          className
        )}
        aria-hidden
      >
        {letter}
      </span>
    );
  }

  const LucideIcon = lucideIconMap[icon] ?? Sigma;
  return <LucideIcon className={className} aria-hidden />;
}
