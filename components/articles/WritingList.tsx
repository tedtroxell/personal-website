import { publishedArticles } from '@/lib/article-index';
export function WritingList() {return <ul className="writing-list">{publishedArticles.slice(0,3).map(article=><li key={article.slug}><span>{article.category}</span><a href={`/${article.slug}/`}>{article.title} <span aria-hidden="true">↗</span></a></li>)}</ul>;}
