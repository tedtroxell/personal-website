import type { Metadata } from "next";
import { getFieldNote } from "@/lib/articles/field-notes";
import { InteractiveArticle } from "@/components/articles/InteractiveArticle";
import { PinnArticle } from "@/components/articles/PinnArticle";
import { notFound } from "next/navigation";
import { ArticleRuntime } from "@/components/ArticleRuntime";
import { ParetoContent } from "@/components/reference/ParetoContent";
import { DataCenterContent } from "@/components/reference/DataCenterContent";
import { articles, getArticle } from "@/lib/articles";

export const dynamicParams = false;
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Ted Troxell`, description: article.excerpt,
    alternates: { canonical: `/${slug}/` },
    ...(article.cover ? {
      openGraph: { type: "article", ...(article.publishedAt?{publishedTime:article.publishedAt+"T00:00:00Z"}:{}), title: article.title, description: article.excerpt, url: `/${slug}/`, images: [{ url: article.cover.replace(".svg", ".png"), width: 1200, height: 630, alt: article.title }] },
      twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [article.cover.replace(".svg", ".png")] },
    } : {}),
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const note = getFieldNote(slug);
  if (note) return <InteractiveArticle note={note} />;



  if (article.kind === "pareto") return <><ParetoContent /><ArticleRuntime kind="pareto" /></>;
  if (article.kind === "data") return <><DataCenterContent /><ArticleRuntime kind="data" /></>;

  return <PinnArticle />;
}
