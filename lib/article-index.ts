import { getPublicationDate } from './articles/publication-dates';
import { fieldNotes } from "./articles/field-notes";

export type Article = {
  slug: string;
  title: string;
  date: string;
  publishedAt?: string;
  category: string;
  excerpt: string;
  source: string;
  kind: "data" | "pareto" | "note" | "field-note";
  cover?: string;
  published?: boolean;
};

export const articles: Article[] = [
  ...fieldNotes.map(note => ({ slug:note.slug,title:note.title,date:getPublicationDate(note.slug).label,publishedAt:getPublicationDate(note.slug).iso,category:note.category,excerpt:note.deck,source:"",kind:"field-note" as const,cover:`/assets/articles/${note.slug}.svg` })),
  { slug: "hello-world", title: "Hello world!", date: "11 October 2026", category: "Uncategorized", excerpt: "Welcome to WordPress.", source: "", kind: "note" },
  {
    slug: "what-gives-a-data-center-away",
    title: "What gives a data center away",
    date: "26 October 2026",
    category: "Data journalism",
    excerpt: "A look at 38 large projects finds that code names are weak clues. The parties behind land records and jobs promised per dollar offer a more useful lead, with important limits.",
    source: "what-gives-a-data-center-away.html",
    kind: "data",
  },
  {
    slug: "pareto-mold-fill",
    title: "A faster answer first",
    date: "20 October 2026",
    category: "Engineering",
    excerpt: "A small geometry proxy can help answer an early design question. Scroll through the tradeoffs, then drive the simulated fill with your keyboard.",
    source: "pareto-mold-fill.html",
    kind: "pareto",
    published: false,
  },
  {
    slug: "whats-a-pinn",
    title: "What’s a PINN?",
    date: "11 October 2026",
    category: "Machine learning",
    excerpt: "A physics-informed neural network combines a neural network with the equations a system is known to obey.",
    source: "",
    kind: "note",
  },
];

export const publishedArticles = articles.filter(article => article.published !== false).sort((a,b) => Date.parse(b.date)-Date.parse(a.date));
