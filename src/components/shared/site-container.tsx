import { SITE_CONTAINER_CLASS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type SiteContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "nav";
};

export function SiteContainer({ children, className, as: Tag = "div" }: SiteContainerProps) {
  return <Tag className={cn(SITE_CONTAINER_CLASS, className)}>{children}</Tag>;
}
