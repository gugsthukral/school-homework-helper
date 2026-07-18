import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KeyTopicDetail } from "@/components/classes/key-topic-detail";
import { getClassBySlug } from "@/lib/class-content";
import {
  getKeyTopic,
} from "@/lib/key-topics";
import { buildPageMetadata } from "@/lib/seo-metadata";

type Props = { params: Promise<{ slug: string; topic: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, topic } = await params;
  const entry = getKeyTopic(slug, topic);
  if (!entry) return { title: "Topic Not Found" };

  return buildPageMetadata({
    title: `Class ${entry.classNumber} ${entry.title} — ${entry.subjectName}`,
    description: entry.description,
    keywords: [
      `class ${entry.classNumber} ${entry.title.toLowerCase()}`,
      `class ${entry.classNumber} ${entry.subjectName.toLowerCase()}`,
      `key topics class ${entry.classNumber}`,
      "CBSE study topics",
    ],
    path: `/classes/${slug}/topics/${topic}`,
    noIndex: true,
  });
}

export default async function KeyTopicPage({ params }: Props) {
  const { slug, topic } = await params;
  const cls = getClassBySlug(slug);
  if (!cls) notFound();

  const entry = getKeyTopic(slug, topic);
  if (!entry) notFound();

  return <KeyTopicDetail topic={entry} />;
}
