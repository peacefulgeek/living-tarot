import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { SITE_CONFIG } from "@/data/config";
import { getVisibleArticles } from "@/data/articles-helper";

export default function StartHere() {
  const articles = getVisibleArticles();
  // Pick 3 beginner-friendly articles from different categories
  const beginnerPicks = [
    articles.find(a => a.category === "card-meanings"),
    articles.find(a => a.category === "tarot-spreads"),
    articles.find(a => a.category === "learning-tarot"),
    articles.find(a => a.category === "tarot-practice"),
    articles.find(a => a.category === "intuition-and-inner-work"),
  ].filter(Boolean).slice(0, 5);

  return (
    <Layout>
      <SEOHead
        title="Start Here"
        description="New to The Living Tarot? Start here. A guided introduction to tarot as a mirror for consciousness, self-inquiry, and inner work."
        canonical={`${SITE_CONFIG.domain}/start-here`}
      />

      <div className="container py-12 md:py-16 max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--deep-purple)] mb-6">Start Here</h1>

        <div className="prose-tarot space-y-6">
          <p className="text-lg text-[var(--deep-purple)]/80 leading-relaxed">
            Welcome to The Living Tarot. If you are here, something in you is ready to look more closely — not at the future, but at yourself.
          </p>

          <p className="text-[var(--deep-purple)]/70 leading-relaxed">
            This site approaches tarot differently than most. We do not treat the cards as fortune-telling devices or mystical oracles that reveal hidden destinies. Instead, we use them as mirrors — structured frameworks for self-inquiry that help you see what you already know but have not yet acknowledged.
          </p>

          <h2 className="font-serif text-2xl text-[var(--deep-purple)] mt-10 mb-4">What You Will Find Here</h2>

          <p className="text-[var(--deep-purple)]/70 leading-relaxed">
            Every article on this site explores tarot through three lenses simultaneously: the <strong>traditional symbolism</strong> that has evolved over centuries, the <strong>Vedantic perspective</strong> that connects card meanings to consciousness itself, and the <strong>somatic dimension</strong> that grounds these insights in your body's direct experience.
          </p>

          <p className="text-[var(--deep-purple)]/70 leading-relaxed">
            This three-lens approach is not academic. It is practical. When you read a card through all three perspectives, something shifts — not just in your understanding, but in your felt sense of what the card is pointing toward.
          </p>

          <h2 className="font-serif text-2xl text-[var(--deep-purple)] mt-10 mb-4">Where to Begin</h2>

          <div className="space-y-4">
            {beginnerPicks.map((article, i) => article && (
              <Link
                key={article.id}
                href={`/${article.category}/${article.slug}`}
                className="group flex items-start gap-4 p-4 border border-[var(--antique-gold)]/20 rounded bg-[var(--mystic-cream)] hover:border-[var(--antique-gold)]/50 transition-all no-underline"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--royal-purple)]/10 text-[var(--royal-purple)] flex items-center justify-center font-serif text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-base text-[var(--deep-purple)] group-hover:text-[var(--royal-purple)] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[var(--deep-purple)]/50 mt-1">{article.categoryName} &middot; {article.readingTime} min read</p>
                </div>
              </Link>
            ))}
          </div>

          <h2 className="font-serif text-2xl text-[var(--deep-purple)] mt-10 mb-4">The Daily Draw</h2>

          <p className="text-[var(--deep-purple)]/70 leading-relaxed">
            If you want to start with a single practice, try the <Link href="/daily-draw" className="text-[var(--royal-purple)] underline">Daily Draw</Link>. Pull one card each morning and sit with it — not analyzing, but feeling. Notice what arises in your body before your mind starts interpreting. That gap between sensation and story is where the real reading happens.
          </p>

          <h2 className="font-serif text-2xl text-[var(--deep-purple)] mt-10 mb-4">A Note on Approach</h2>

          <p className="text-[var(--deep-purple)]/70 leading-relaxed">
            You do not need to believe in anything supernatural to benefit from tarot. The cards work because they provide a structured framework for self-reflection — a way of asking questions you might not think to ask on your own. Whether the "magic" is in the cards or in the quality of attention you bring to them is a question we leave open.
          </p>

          <p className="text-[var(--deep-purple)]/70 leading-relaxed">
            What we do ask is that you approach this material with genuine curiosity rather than either blind belief or reflexive skepticism. The most interesting things tend to happen in that middle space — the space where you are willing to look without already knowing what you will find.
          </p>

          <div className="mt-10 p-6 bg-[var(--royal-purple)]/5 border border-[var(--royal-purple)]/20 rounded">
            <p className="font-serif text-lg text-[var(--deep-purple)] mb-2">Ready to explore?</p>
            <p className="text-sm text-[var(--deep-purple)]/60 mb-4">
              Browse all {articles.length} articles or take a quiz to find your starting point.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/articles" className="px-5 py-2 bg-[var(--royal-purple)] text-[var(--mystic-cream)] rounded text-sm font-medium hover:bg-[var(--deep-purple)] transition-colors no-underline">
                Browse Articles
              </Link>
              <Link href="/quizzes" className="px-5 py-2 border border-[var(--royal-purple)] text-[var(--royal-purple)] rounded text-sm font-medium hover:bg-[var(--royal-purple)]/10 transition-colors no-underline">
                Take a Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
