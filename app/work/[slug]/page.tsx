import type { Metadata } from "next";
import { WorkAIContent } from "@/components/reference/WorkAIContent";
import { WorkFounderContent } from "@/components/reference/WorkFounderContent";
import { WorkCommunityContent } from "@/components/reference/WorkCommunityContent";
import { notFound } from "next/navigation";
import { experiences, type ExperienceSlug } from "@/lib/experience";

export function generateStaticParams() { return Object.keys(experiences).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences[slug as ExperienceSlug];
  return experience ? { title: `${experience.title} | Ted Troxell`, description: experience.excerpt } : {};
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = experiences[slug as ExperienceSlug];
  if (!experience) notFound();
  const Content = { "ai-in-the-physical-world": WorkAIContent, "different-seats-same-table": WorkFounderContent, "a-community-for-curiosity": WorkCommunityContent }[slug as ExperienceSlug];
  return <Content />;
}
