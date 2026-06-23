import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdBanner } from "@/components/ads/ad-banner";
import { Footer } from "@/components/layout/footer";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type PageLayoutProps = {
  backHref?: string;
  backLabel?: string;
  badge?: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function PageLayout({
  backHref = "/",
  backLabel = "Back to Home",
  badge,
  title,
  description,
  children,
}: PageLayoutProps) {
  return (
    <>
      <main className={cn("min-h-screen pb-20 sm:pb-16", SITE_HEADER_OFFSET_CLASS)}>
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-96" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={backHref}
            className="mb-8 inline-flex items-center gap-2 text-sm text-sky-300/70 transition-colors hover:text-orange-400"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>

          <div className="mb-12 max-w-3xl">
            {badge && (
              <span className="text-sm font-semibold uppercase tracking-widest text-orange-400">
                {badge}
              </span>
            )}
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h1>
            <p className="mt-4 text-lg text-sky-200/70">{description}</p>
          </div>

          <AdBanner placement="horizontal" className="mb-8" />

          {children}

          <AdBanner placement="inArticle" className="mt-10" />
        </div>
      </main>
      <Footer />
    </>
  );
}
