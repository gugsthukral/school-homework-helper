import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoPageTemplate } from "@/components/seo/seo-page-template";
import { getSeoPage, seoPages } from "@/lib/seo-pages";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return { title: "Page Not Found" };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://schoolhomeworkhelper.com";

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: `${baseUrl}/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${baseUrl}/${page.slug}`,
      siteName: "School Homework Helper",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function SeoLandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  return <SeoPageTemplate page={page} />;
}
