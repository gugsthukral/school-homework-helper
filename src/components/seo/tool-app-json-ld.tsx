import { getSiteUrl } from "@/lib/seo-metadata";
import { SITE_NAME } from "@/lib/seo-config";
import type { ToolLearnMoreContent } from "@/lib/tool-learn-more";

type ToolAppJsonLdProps = {
  tool: {
    name: string;
    description: string;
    path: string;
  };
  content: ToolLearnMoreContent;
};

export function ToolAppJsonLd({ tool, content }: ToolAppJsonLdProps) {
  const baseUrl = getSiteUrl();
  const url = `${baseUrl}${tool.path}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE_NAME} — ${tool.name}`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url,
    description: tool.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isAccessibleForFree: true,
    keywords: content.examples.slice(0, 3).join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

