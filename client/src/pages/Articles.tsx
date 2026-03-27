import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { SITE_CONFIG, getVisibleArticleCount } from "@/data/config";
import { getVisibleArticles } from "@/data/articles-helper";
import { Search } from "lucide-react";
import { useSearch } from "wouter";

export default function Articles() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialQ = params.get("q") || "";
  
  const [query, setQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = SITE_CONFIG.articlesPerPage;
  const visibleCount = getVisibleArticleCount();

  const allVisible = getVisibleArticles();

  const filtered = useMemo(() => {
    let result = allVisible;
    if (selectedCategory !== "all") {
      result = result.filter(a => a.category === selectedCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.categoryName.toLowerCase().includes(q) ||
        a.metaDescription.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allVisible, selectedCategory, query]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <Layout>
      <SEOHead
        title="Articles"
        description={`Explore ${visibleCount} in-depth articles on tarot learning, card meanings, spreads, intuition, and practice.`}
        canonical={`${SITE_CONFIG.domain}/articles`}
      />

      <div className="container py-10 md:py-14">
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--deep-purple)] mb-2">Articles</h1>
        <p className="text-[var(--deep-purple)]/60 mb-8">{visibleCount} articles exploring tarot as a mirror for consciousness</p>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--deep-purple)]/40" />
            <input
              type="search"
              placeholder="Search articles..."
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-3 border border-[var(--antique-gold)]/30 rounded bg-[var(--mystic-cream)] text-[var(--deep-purple)] placeholder:text-[var(--deep-purple)]/40 outline-none focus:border-[var(--royal-purple)] transition-colors"
              aria-label="Search articles"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={e => { setSelectedCategory(e.target.value); setPage(1); }}
            className="px-4 py-3 border border-[var(--antique-gold)]/30 rounded bg-[var(--mystic-cream)] text-[var(--deep-purple)] outline-none focus:border-[var(--royal-purple)] transition-colors"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {SITE_CONFIG.categories.map(cat => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        {paged.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm border border-[var(--antique-gold)]/30 rounded text-[var(--deep-purple)] hover:bg-[var(--royal-purple)]/10 disabled:opacity-30 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-[var(--deep-purple)]/60">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm border border-[var(--antique-gold)]/30 rounded text-[var(--deep-purple)] hover:bg-[var(--royal-purple)]/10 disabled:opacity-30 transition-colors"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="font-serif text-xl text-[var(--deep-purple)]/60">No articles found</p>
            <p className="text-sm text-[var(--deep-purple)]/40 mt-2">Try a different search term or category</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
