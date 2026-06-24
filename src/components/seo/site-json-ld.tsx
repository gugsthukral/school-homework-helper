import { getSiteUrl } from "@/lib/seo-metadata";
import { SITE_NAME } from "@/lib/seo-config";
import { aiTools } from "@/lib/data";

export function SiteJsonLd() {
  const baseUrl = getSiteUrl();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Eight AI tools for homework help, essays, maths, quizzes, school projects, grammar, calculator, and ask-anything tutoring — for CBSE Classes 1–12.",
    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://x.com/",
      "https://www.linkedin.com/",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: baseUrl,
    description:
      "Free AI homework help with Ask Anything, Homework Solver, Essay Generator, Calculator, Math Solver, Quiz Generator, School Projects, and Grammar Checker for CBSE Classes 1–12.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: `${baseUrl}/logo.png`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const toolsListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} AI Tools`,
    description: "Eight free AI study tools for CBSE students Class 1–12.",
    numberOfItems: aiTools.length,
    itemListElement: aiTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${baseUrl}${tool.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsListSchema) }}
      />
    </>
  );
}
