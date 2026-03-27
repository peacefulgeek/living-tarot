import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { Link } from "wouter";
import { SITE_CONFIG, getVisibleArticleCount } from "@/data/config";
import { getVisibleArticles, getArticlesByCategory } from "@/data/articles-helper";
import { quizzes } from "@/data/quizzes";

export default function Home() {
  const visible = getVisibleArticles();
  const heroArticle = visible[0];
  const featuredArticles = visible.slice(1, 7);
  const visibleCount = getVisibleArticleCount();

  return (
    <Layout>
      <SEOHead
        title={`${SITE_CONFIG.title} — ${SITE_CONFIG.subtitle}`}
        description={SITE_CONFIG.tagline}
        canonical={SITE_CONFIG.domain}
        ogImage="https://living-tarot.b-cdn.net/images/og/court-cards-in-relationship-readings.png"
      />

      {/* Hero */}
      <section className="relative">
        {heroArticle && <ArticleCard article={heroArticle} variant="hero" />}
        <div className="absolute top-6 left-6 md:top-10 md:left-10">
          <p className="font-serif text-sm md:text-base text-[var(--antique-gold)] italic">
            {SITE_CONFIG.tagline}
          </p>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="container py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-[var(--deep-purple)]">Recent Articles</h2>
          <Link href="/articles" className="text-sm text-[var(--royal-purple)] hover:text-[var(--antique-gold)] transition-colors no-underline font-medium">
            View all {visibleCount} articles &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <hr className="gold-divider container" />

      {/* Category Sections */}
      {SITE_CONFIG.categories.map(cat => {
        const catArticles = getArticlesByCategory(cat.slug).slice(0, 4);
        if (catArticles.length === 0) return null;
        return (
          <section key={cat.slug} className="container py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl md:text-2xl text-[var(--deep-purple)]">{cat.name}</h2>
              <Link href={`/category/${cat.slug}`} className="text-sm text-[var(--royal-purple)] hover:text-[var(--antique-gold)] transition-colors no-underline">
                See all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {catArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        );
      })}

      <hr className="gold-divider container" />

      {/* Newsletter CTA */}
      <section className="container py-12 md:py-16">
        <div className="bg-[var(--royal-purple)] rounded-lg p-8 md:p-12 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-[var(--mystic-cream)] mb-3">Stay Connected</h2>
          <p className="text-[var(--mystic-cream)]/70 mb-6 max-w-lg mx-auto">
            Join our community of tarot practitioners exploring consciousness through the cards.
          </p>
          <NewsletterForm source="homepage" variant="dark" />
        </div>
      </section>

      {/* Quizzes Teaser */}
      <section className="container py-8 pb-16">
        <h2 className="font-serif text-2xl md:text-3xl text-[var(--deep-purple)] mb-6 text-center">Explore Your Practice</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {quizzes.slice(0, 3).map(quiz => (
            <Link key={quiz.slug} href={`/quiz/${quiz.slug}`} className="group block no-underline">
              <div className="p-6 border border-[var(--antique-gold)]/30 rounded bg-[var(--mystic-cream)] hover:border-[var(--antique-gold)] transition-all hover:shadow-md">
                <h3 className="font-serif text-lg text-[var(--deep-purple)] group-hover:text-[var(--royal-purple)] transition-colors mb-2">
                  {quiz.title}
                </h3>
                <p className="text-sm text-[var(--deep-purple)]/60">{quiz.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/quizzes" className="text-sm text-[var(--royal-purple)] hover:text-[var(--antique-gold)] transition-colors no-underline font-medium">
            All 9 quizzes &rarr;
          </Link>
        </div>
      </section>
    </Layout>
  );
}
