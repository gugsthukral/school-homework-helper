import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { AdBanner } from "@/components/ads/ad-banner";
import { Hero } from "@/components/home/hero";
import { ToolsSection } from "@/components/home/tools-section";
import { ClassesSection } from "@/components/home/classes-section";
import { SubjectsSection } from "@/components/home/subjects-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { AudiencesSection } from "@/components/home/audiences-section";
import { BlogPreview } from "@/components/home/blog-preview";
import { CtaSection } from "@/components/home/cta-section";
import { FifaFootballLazy } from "@/components/seasonal/fifa-football-lazy";
import { SiteContainer } from "@/components/shared/site-container";
import { PAGE_SEO } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";

const homeSeo = PAGE_SEO.home;

export const metadata: Metadata = buildPageMetadata({
  title: homeSeo.title,
  description: homeSeo.description,
  keywords: [...homeSeo.keywords],
  path: homeSeo.path,
});

export default function HomePage() {
  return (
    <div className="home-ui">
      <div className="lg:hidden">
        <FifaFootballLazy mode="screen" />
      </div>

      <main>
        <Hero />

        <ToolsSection />

        <SiteContainer>
          <AdBanner placement="horizontal" />
        </SiteContainer>

        <ClassesSection />

        <SiteContainer>
          <AdBanner placement="inArticle" />
        </SiteContainer>

        <SubjectsSection />

        <HowItWorks />

        <AudiencesSection />

        <BlogPreview />

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
