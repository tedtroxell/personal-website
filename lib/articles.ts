import { articles } from "./article-index";
import type { Article } from "./article-index";
export { articles };
export type { Article };
export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
