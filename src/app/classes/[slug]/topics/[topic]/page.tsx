import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KeyTopicDetail } from "@/components/classes/key-topic-detail";
import { getClassBySlug } from "@/lib/class-content";
import {
  getKeyTopic,
  keyTopicsRegistry,
  ACADEMIC_SESSION,
} from "@/lib/key-topics";

type Props = { params: Promise<{ slug: string; topic: string }> };

export async function generateStaticParams() {
  return keyTopicsRegistry.map((t) => ({
    slug: t.classSlug,
    topic: t.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, topic } = await params;
  const entry = getKeyTopic(slug, topic);
  if (!entry) return { title: "Topic Not Found" };

  return {
    title: `Class ${entry.classNumber} ${entry.title} — ${entry.subjectName} (${ACADEMIC_SESSION})`,
    description: entry.description,
    keywords: [
      `class ${entry.classNumber} ${entry.title.toLowerCase()}`,
      `class ${entry.classNumber} ${entry.subjectName.toLowerCase()}`,
      `key topics class ${entry.classNumber}`,
    ],
  };
}

export default async function KeyTopicPage({ params }: Props) {
  const { slug, topic } = await params;
  const cls = getClassBySlug(slug);
  if (!cls) notFound();

  const entry = getKeyTopic(slug, topic);
  if (!entry) notFound();

  return <KeyTopicDetail topic={entry} />;
}
