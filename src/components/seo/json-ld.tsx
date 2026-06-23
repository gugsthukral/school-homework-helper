type JsonLdProps = {
  page: {
    title: string;
    description: string;
    slug: string;
    h1: string;
    faqs: { question: string; answer: string }[];
  };
};

export function SeoJsonLd({ page }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://schoolhomeworkhelper.com";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    url: `${baseUrl}/${page.slug}`,
    publisher: {
      "@type": "Organization",
      name: "School Homework Helper",
      url: baseUrl,
    },
    author: {
      "@type": "Organization",
      name: "School Homework Helper",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.h1,
        item: `${baseUrl}/${page.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
