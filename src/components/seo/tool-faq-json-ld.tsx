import type { ToolLearnMoreContent } from "@/lib/tool-learn-more";

type ToolFaqJsonLdProps = {
  content: ToolLearnMoreContent;
};

export function ToolFaqJsonLd({ content }: ToolFaqJsonLdProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

