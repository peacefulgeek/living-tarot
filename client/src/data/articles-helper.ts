import articlesData from './articles.json';
import { getVisibleArticleCount, SITE_CONFIG } from './config';

export interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  categoryName: string;
  dateISO: string;
  content: string;
  heroImage: string;
  ogImage: string;
  wordCount: number;
  readingTime: number;
  metaDescription: string;
  faqCount: number;
  backlinkType: string;
  openerType: string;
  conclusionType: string;
}

const allArticles: Article[] = articlesData as Article[];

export function getVisibleArticles(): Article[] {
  const count = getVisibleArticleCount();
  return allArticles.slice(0, count);
}

export function getAllArticles(): Article[] {
  return allArticles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  const visible = getVisibleArticles();
  return visible.find(a => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getVisibleArticles().filter(a => a.category === categorySlug);
}

export function getRelatedArticles(article: Article, count: number = 4): Article[] {
  const visible = getVisibleArticles();
  const sameCategory = visible.filter(a => a.category === article.category && a.id !== article.id);
  const otherCategory = visible.filter(a => a.category !== article.category);
  const related = [...sameCategory.slice(0, 2), ...otherCategory.slice(0, count - 2)];
  return related.slice(0, count);
}

export function getPopularArticles(count: number = 5): Article[] {
  const visible = getVisibleArticles();
  // Use a deterministic "popular" selection based on article properties
  return visible
    .filter(a => a.id <= 30) // First 30 are "popular"
    .slice(0, count);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return getVisibleArticles().filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.categoryName.toLowerCase().includes(q) ||
    a.metaDescription.toLowerCase().includes(q)
  );
}

export function getRecentArticles(count: number = 20): Article[] {
  return getVisibleArticles()
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
    .slice(0, count);
}

export function formatDate(dateISO: string): string {
  return new Date(dateISO).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getCategoryArticleCount(categorySlug: string): number {
  return getArticlesByCategory(categorySlug).length;
}

// For sitemap/RSS - only visible articles
export function getVisibleArticleSlugs(): string[] {
  return getVisibleArticles().map(a => `${a.category}/${a.slug}`);
}
