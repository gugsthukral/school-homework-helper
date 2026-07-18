import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdBanner } from "@/components/ads/ad-banner";
import { Footer } from "@/components/layout/footer";
import { RegionalLanguagesBadge } from "@/components/shared/regional-languages-badge";
import { SiteContainer } from "@/components/shared/site-container";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type PageLayoutProps = {
  backHref?: string;
  backLabel?: string;
  badge?: string;
  title: string;
  description: string;
  showRegionalLanguages?: boolean;
  showAds?: boolean;
  children: React.ReactNode;
};

export function PageLayout({
  backHref = "/",
  backLabel = "Back to Home",
  badge,
  title,
  description,
  showRegionalLanguages = false,
  showAds = true,
  children,
}: PageLayoutProps) {
  return (
    <>
      <main className={cn("min-h-screen w-full pb-20 sm:pb-16", SITE_HEADER_OFFSET_CLASS)}>
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-96" />
        <SiteContainer className="relative">
          <Link
            href={backHref}
            className="page-link mb-8 inline-flex items-center gap-2 text-sm transition-colors hover:text-orange-500"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>

          <div className="mb-12 max-w-3xl">
            {badge && (
              <span className="page-eyebrow text-sm font-semibold uppercase tracking-widest">
                {badge}
              </span>
            )}
            <h1 className="page-title mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
            <p className="page-description mt-4 text-lg">{description}</p>
            {showRegionalLanguages && (
              <RegionalLanguagesBadge className="mt-5" showDetail variant="light" />
            )}
          </div>

          {showAds ? <AdBanner placement="horizontal" className="mb-8" /> : null}

          {children}

          {showAds ? <AdBanner placement="inArticle" className="mt-10" /> : null}
        </SiteContainer>
      </main>
      <Footer />
    </>
  );
}
