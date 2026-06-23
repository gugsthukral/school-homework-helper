import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdBanner } from "@/components/ads/ad-banner";
import { Footer } from "@/components/layout/footer";
import { SITE_HEADER_OFFSET_CLASS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type ToolLayoutProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export function ToolLayout({ title, description, icon, children }: ToolLayoutProps) {
  return (
    <>
      <main className={cn("min-h-screen pb-20 sm:pb-16", SITE_HEADER_OFFSET_CLASS)}>
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-96" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#tools"
            className="mb-8 inline-flex items-center gap-2 text-sm text-sky-300/70 transition-colors hover:text-orange-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to AI Tools
          </Link>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/20 to-orange-500/10 ring-1 ring-sky-400/20">
              {icon}
            </span>
            <div className="min-w-0">
              <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
              <p className="mt-2 text-sky-200/70">{description}</p>
            </div>
          </div>

          <AdBanner placement="horizontal" className="mb-6" />

          {children}

          <AdBanner placement="inArticle" className="mt-8" />
        </div>
      </main>
      <Footer />
    </>
  );
}
