import { useParams } from "wouter";
import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { SITE_CONFIG } from "@/data/config";
import { getArticlesByCategory } from "@/data/articles-helper";
import { Link } from "wouter";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState(1);
  const perPage = SITE_CONFIG.articlesPerPage;

  const category = SITE_CONFIG.categories.find(c => c.slug === slug);
  const articles = useMemo(() => getArticlesByCategory(slug || ""), [slug]);
  const totalPages = Math.ceil(articles.length / perPage);
  const paged = articles.slice((page - 1) * perPage, page * perPage);

  if (!category) {
    return (
      <Layout>
        <SEOHead title="Category Not Found" description="This category does not exist." />
        <div className="container py-20 text-center">
          <h1 className="font-serif text-3xl text-[var(--deep-purple)] mb-4">Category Not Found</h1>
          <Link href="/articles" className="text-[var(--royal-purple)] underline">Browse all articles</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={category.name}
        description={`Explore articles about ${category.name.toLowerCase()} — in-depth tarot guides, insights, and practices.`}
        canonical={`${SITE_CONFIG.domain}/category/${slug}`}
      />

      <div className="container py-10 md:py-14">
        <nav className="text-sm text-[var(--deep-purple)]/50 mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--royal-purple)] no-underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/articles" className="hover:text-[var(--royal-purple)] no-underline">Articles</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--deep-purple)]/70">{category.name}</span>
        </nav>

        <h1 className="font-serif text-3xl md:text-4xl text-[var(--deep-purple)] mb-2">{category.name}</h1>
        <p className="text-[var(--deep-purple)]/60 mb-8">{articles.length} articles</p>

        {paged.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

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
            <p className="font-serif text-xl text-[var(--deep-purple)]/60">No articles in this category yet</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
