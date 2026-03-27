import { Link } from "wouter";
import { formatDate, type Article } from "@/data/articles-helper";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "hero" | "compact";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const articleUrl = `/${article.category}/${article.slug}`;

  if (variant === "hero") {
    return (
      <Link href={articleUrl} className="group block no-underline">
        <article className="relative overflow-hidden rounded bg-[var(--deep-purple)]">
          <div className="aspect-[16/9] md:aspect-[21/9]">
            <img
              src={article.heroImage}
              alt={article.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep-purple)] via-[var(--deep-purple)]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-[var(--antique-gold)] text-[var(--deep-purple)] rounded mb-3">
              {article.categoryName}
            </span>
            <h2 className="font-serif text-2xl md:text-4xl text-[var(--mystic-cream)] mb-2 leading-tight">
              {article.title}
            </h2>
            <div className="flex items-center gap-3 text-[var(--mystic-cream)]/60 text-sm">
              <time dateTime={article.dateISO}>{formatDate(article.dateISO)}</time>
              <span>&middot;</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={articleUrl} className="group flex gap-3 no-underline">
        <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.title}
            width={64}
            height={64}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="min-w-0">
          <h4 className="font-serif text-sm text-[var(--deep-purple)] group-hover:text-[var(--royal-purple)] transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h4>
          <span className="text-xs text-[var(--deep-purple)]/50 mt-1 block">{article.readingTime} min</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={articleUrl} className="group block no-underline">
      <article className="bg-[var(--mystic-cream)] border border-[var(--antique-gold)]/20 rounded overflow-hidden hover:border-[var(--antique-gold)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--royal-purple)]/5">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.title}
            width={600}
            height={375}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-[var(--antique-gold)]">
              {article.categoryName}
            </span>
            <span className="text-[var(--deep-purple)]/20">&middot;</span>
            <time dateTime={article.dateISO} className="text-xs text-[var(--deep-purple)]/50">
              {formatDate(article.dateISO)}
            </time>
          </div>
          <h3 className="font-serif text-lg text-[var(--deep-purple)] group-hover:text-[var(--royal-purple)] transition-colors leading-snug mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-[var(--deep-purple)]/60 line-clamp-2">
            {article.metaDescription}
          </p>
          <div className="mt-3 text-xs text-[var(--deep-purple)]/40">
            {article.readingTime} min read
          </div>
        </div>
      </article>
    </Link>
  );
}
