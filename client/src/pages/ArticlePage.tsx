import { useParams } from "wouter";
import { useMemo, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";
import { Link } from "wouter";
import { SITE_CONFIG } from "@/data/config";
import { getArticleBySlug, getRelatedArticles, getPopularArticles, getArticlesByCategory, formatDate, type Article } from "@/data/articles-helper";
import { Copy, Share2, ChevronDown, ChevronUp } from "lucide-react";

function extractHeadings(html: string): { id: string; text: string }[] {
  const regex = /<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/gi;
  const headings: { id: string; text: string }[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({ id: match[1], text: match[2].replace(/<[^>]*>/g, "") });
  }
  // If no id attributes, try to extract h2 text and generate ids
  if (headings.length === 0) {
    const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
    while ((match = h2Regex.exec(html)) !== null) {
      const text = match[1].replace(/<[^>]*>/g, "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      headings.push({ id, text });
    }
  }
  return headings;
}

function addIdsToHeadings(html: string): string {
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, content) => {
    if (attrs.includes('id="')) return match;
    const text = content.replace(/<[^>]*>/g, "");
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `<h2${attrs} id="${id}">${content}</h2>`;
  });
}

export default function ArticlePage() {
  const params = useParams<{ category: string; slug: string }>();
  const article = getArticleBySlug(params.slug || "");
  const [tocOpen, setTocOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!article) {
    return (
      <Layout>
        <SEOHead title="Article Not Found" description="This article could not be found." />
        <div className="container py-20 text-center">
          <h1 className="font-serif text-3xl text-[var(--deep-purple)] mb-4">Article Not Found</h1>
          <p className="text-[var(--deep-purple)]/60 mb-6">The article you're looking for doesn't exist or hasn't been published yet.</p>
          <Link href="/articles" className="text-[var(--royal-purple)] underline">Browse all articles</Link>
        </div>
      </Layout>
    );
  }

  const processedContent = addIdsToHeadings(article.content);
  const headings = extractHeadings(processedContent);
  const related = getRelatedArticles(article, 6);
  const sameCategory = getArticlesByCategory(article.category).filter(a => a.id !== article.id).slice(0, 4);
  const popular = getPopularArticles(5).filter(a => a.id !== article.id);
  const articleUrl = `${SITE_CONFIG.domain}/${article.category}/${article.slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`, "_blank");
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, "_blank");
  };

  // JSON-LD for Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: article.heroImage,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: { "@type": "Person", name: "Kalesh" },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.title,
      url: SITE_CONFIG.domain,
    },
    mainEntityOfPage: articleUrl,
    wordCount: article.wordCount,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".article-body h2", ".article-body p:first-of-type"],
    },
  };

  // BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.domain },
      { "@type": "ListItem", position: 2, name: article.categoryName, item: `${SITE_CONFIG.domain}/category/${article.category}` },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  const jsonLdArray = [articleJsonLd, breadcrumbJsonLd];

  // Extract FAQ from content if present
  const faqMatch = article.content.match(/<div class="faq-section">([\s\S]*?)<\/div>\s*(?:<\/div>)?/);

  return (
    <Layout>
      <SEOHead
        title={article.title}
        description={article.metaDescription}
        canonical={articleUrl}
        ogImage={article.ogImage}
        ogType="article"
        jsonLd={jsonLdArray}
      />

      {/* Hero Image - NOT lazy loaded */}
      <div className="w-full aspect-[16/7] md:aspect-[21/9] overflow-hidden relative">
        <img
          src={article.heroImage}
          alt={article.title}
          width={1200}
          height={675}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--parchment)] via-transparent to-transparent" />
      </div>

      <div className="container py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content - 70% */}
          <article className="lg:w-[70%]">
            {/* Breadcrumb */}
            <nav className="text-sm text-[var(--deep-purple)]/50 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--royal-purple)] no-underline">Home</Link>
              <span className="mx-2">/</span>
              <Link href={`/category/${article.category}`} className="hover:text-[var(--royal-purple)] no-underline">{article.categoryName}</Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--deep-purple)]/70">{article.title}</span>
            </nav>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--deep-purple)] leading-tight mb-4">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
              <Link href={`/category/${article.category}`} className="px-3 py-1 bg-[var(--royal-purple)]/10 text-[var(--royal-purple)] rounded text-xs font-semibold uppercase tracking-wider no-underline hover:bg-[var(--royal-purple)]/20 transition-colors">
                {article.categoryName}
              </Link>
              <time dateTime={article.dateISO} className="text-[var(--deep-purple)]/50">{formatDate(article.dateISO)}</time>
              <span className="text-[var(--deep-purple)]/30">&middot;</span>
              <span className="text-[var(--deep-purple)]/50">{article.readingTime} min read</span>
            </div>

            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="border border-[var(--antique-gold)]/30 rounded bg-[var(--mystic-cream)] mb-8">
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="w-full flex items-center justify-between p-4 text-left"
                  aria-expanded={tocOpen}
                >
                  <span className="font-serif text-lg text-[var(--deep-purple)]">Table of Contents</span>
                  {tocOpen ? <ChevronUp className="w-5 h-5 text-[var(--deep-purple)]/50" /> : <ChevronDown className="w-5 h-5 text-[var(--deep-purple)]/50" />}
                </button>
                {tocOpen && (
                  <nav className="px-4 pb-4">
                    <ol className="space-y-1">
                      {headings.map((h, i) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="text-sm text-[var(--royal-purple)] hover:text-[var(--antique-gold)] transition-colors no-underline"
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                            }}
                          >
                            {i + 1}. {h.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
              </div>
            )}

            {/* Article Body */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Disclaimer */}
            <div className="mt-8 p-4 border border-[var(--antique-gold)]/20 rounded bg-[var(--mystic-cream)]/50 text-xs text-[var(--deep-purple)]/50 leading-relaxed">
              <strong>Disclaimer:</strong> This content is for educational and entertainment purposes only. It is not a substitute for professional advice. Tarot reading is a contemplative practice, not a diagnostic tool.
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[var(--antique-gold)]/20">
              <span className="text-sm text-[var(--deep-purple)]/60 font-medium">Share:</span>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-[var(--antique-gold)]/30 rounded hover:bg-[var(--royal-purple)]/10 transition-colors"
                aria-label="Copy link"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={shareTwitter}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-[var(--antique-gold)]/30 rounded hover:bg-[var(--royal-purple)]/10 transition-colors"
                aria-label="Share on Twitter"
              >
                <Share2 className="w-4 h-4" />
                Twitter/X
              </button>
              <button
                onClick={shareFacebook}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-[var(--antique-gold)]/30 rounded hover:bg-[var(--royal-purple)]/10 transition-colors"
                aria-label="Share on Facebook"
              >
                <Share2 className="w-4 h-4" />
                Facebook
              </button>
            </div>

            <hr className="gold-divider" />

            {/* Keep Reading */}
            <section className="mt-8">
              <h2 className="font-serif text-2xl text-[var(--deep-purple)] mb-6">Keep Reading</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map(a => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </section>
          </article>

          {/* Sidebar - 30% */}
          <aside className="lg:w-[30%]">
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* Author Bio */}
              <div className="p-6 border border-[var(--antique-gold)]/30 rounded bg-[var(--mystic-cream)]">
                <div className="w-16 h-16 rounded-full bg-[var(--royal-purple)]/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="font-serif text-2xl text-[var(--royal-purple)]">K</span>
                </div>
                <h3 className="font-serif text-lg text-[var(--deep-purple)] text-center mb-1">
                  {SITE_CONFIG.author.name}
                </h3>
                <p className="text-xs text-[var(--antique-gold)] text-center mb-3">{SITE_CONFIG.author.title}</p>
                <p className="text-sm text-[var(--deep-purple)]/70 text-center mb-4 leading-relaxed">
                  {SITE_CONFIG.author.bio}
                </p>
                <a
                  href={SITE_CONFIG.author.link}
                  className="block w-full text-center px-4 py-2 bg-[var(--royal-purple)] text-[var(--mystic-cream)] rounded text-sm font-medium hover:bg-[var(--deep-purple)] transition-colors no-underline"
                >
                  {SITE_CONFIG.author.linkText}
                </a>
              </div>

              {/* Same Category */}
              {sameCategory.length > 0 && (
                <div className="p-5 border border-[var(--antique-gold)]/20 rounded bg-[var(--mystic-cream)]">
                  <h3 className="font-serif text-base text-[var(--deep-purple)] mb-4">More in {article.categoryName}</h3>
                  <div className="space-y-4">
                    {sameCategory.map(a => (
                      <ArticleCard key={a.id} article={a} variant="compact" />
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Articles */}
              <div className="p-5 border border-[var(--antique-gold)]/20 rounded bg-[var(--mystic-cream)]">
                <h3 className="font-serif text-base text-[var(--deep-purple)] mb-4">Popular Articles</h3>
                <div className="space-y-4">
                  {popular.slice(0, 5).map(a => (
                    <ArticleCard key={a.id} article={a} variant="compact" />
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="p-5 border border-[var(--antique-gold)]/20 rounded bg-[var(--mystic-cream)]">
                <h3 className="font-serif text-base text-[var(--deep-purple)] mb-3">Stay Connected</h3>
                <NewsletterForm source={`article-${article.slug}`} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
