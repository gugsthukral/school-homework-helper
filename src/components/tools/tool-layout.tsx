import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdBanner } from "@/components/ads/ad-banner";
import { Footer } from "@/components/layout/footer";
import { ColorfulToolIcon } from "@/components/shared/colorful-icons";
import { RegionalLanguagesBadge } from "@/components/shared/regional-languages-badge";
import { SiteContainer } from "@/components/shared/site-container";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type ToolLayoutProps = {
  title: string;
  description: string;
  iconKey: string;
  children: React.ReactNode;
};

export function ToolLayout({ title, description, iconKey, children }: ToolLayoutProps) {
  return (
    <>
      <main className={cn("min-h-screen w-full pb-20 sm:pb-16", SITE_HEADER_OFFSET_CLASS)}>
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-96" />
        <SiteContainer className="relative">
          <Link
            href="/#tools"
            className="page-link mb-8 inline-flex items-center gap-2 text-sm transition-colors hover:text-orange-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to AI Tools
          </Link>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start">
            <ColorfulToolIcon icon={iconKey} size={56} />
            <div className="min-w-0">
              <h1 className="page-title text-3xl font-bold sm:text-4xl">{title}</h1>
              <p className="page-description mt-2">{description}</p>
              <RegionalLanguagesBadge className="mt-4" variant="light" />
            </div>
          </div>

          <AdBanner placement="horizontal" className="mb-6" />

          {children}

          <AdBanner placement="inArticle" className="mt-8" />
        </SiteContainer>
      </main>
      <Footer />
    </>
  );
}
