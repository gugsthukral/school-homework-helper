import { getSiteUrl } from "@/lib/seo-metadata";
import { SITE_NAME } from "@/lib/seo-config";

export function SiteJsonLd() {
  const baseUrl = getSiteUrl();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "AI-powered homework help and CBSE study resources for students from Class 1 to Class 12.",
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
      "Free AI homework help, math solver, essay generator, and NCERT chapter resources for CBSE Classes 1–12.",
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
    </>
  );
}
