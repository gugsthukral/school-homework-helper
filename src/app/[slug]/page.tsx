import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoPageTemplate } from "@/components/seo/seo-page-template";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { getSeoPage } from "@/lib/seo-pages";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return { title: "Page Not Found" };

  return buildPageMetadata({
    title: page.title.replace(/ \| School Homework Helper$/, ""),
    description: page.description,
    keywords: page.keywords,
    path: `/${page.slug}`,
    type: "article",
    noIndex: true,
    absoluteTitle: page.title.includes("|"),
  });
}

export default async function SeoLandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  return <SeoPageTemplate page={page} />;
}
