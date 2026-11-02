import { HomePage } from "@/components/HomePage";
import { LatestArticleToast } from "@/components/LatestArticleToast";

import { BlogIndex } from "@/components/BlogIndex";

export default async function Home({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const query = await searchParams;
  if (query.s) return <BlogIndex />;
  return <><HomePage /><LatestArticleToast /></>;
}
