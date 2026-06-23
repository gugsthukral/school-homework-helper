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

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <ToolsSection />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdBanner placement="horizontal" />
        </div>
        <ClassesSection />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdBanner placement="inArticle" />
        </div>
        <SubjectsSection />
        <HowItWorks />
        <AudiencesSection />
        <BlogPreview />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
