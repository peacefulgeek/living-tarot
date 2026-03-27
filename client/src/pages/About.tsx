import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { SITE_CONFIG } from "@/data/config";

export default function About() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kalesh",
    url: "https://kalesh.love",
    jobTitle: "Consciousness Teacher & Writer",
    sameAs: ["https://kalesh.love"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.title,
    url: SITE_CONFIG.domain,
    description: SITE_CONFIG.tagline,
    author: { "@type": "Person", name: "Kalesh", url: "https://kalesh.love" },
    publisher: { "@type": "Organization", name: SITE_CONFIG.title },
  };

  return (
    <Layout>
      <SEOHead
        title="About"
        description="The Living Tarot is created by Kalesh — Consciousness Teacher & Writer. Exploring tarot as a mirror for self-inquiry, not fortune-telling."
        canonical={`${SITE_CONFIG.domain}/about`}
        jsonLd={[personJsonLd, websiteJsonLd]}
      />

      <div className="container py-12 md:py-16 max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--deep-purple)] mb-8">About The Living Tarot</h1>

        <div className="space-y-6 text-[var(--deep-purple)]/80 leading-relaxed">
          <p className="text-lg">
            The Living Tarot exists because tarot deserves better than what most of the internet offers — vague predictions, recycled keyword lists, and spiritual bypassing dressed up as wisdom.
          </p>

          <p>
            This site approaches tarot as a contemplative practice. Not fortune-telling. Not New Age escapism. A genuine tool for self-inquiry that works whether or not you believe in anything supernatural. The cards provide structure for the kind of honest self-examination that most of us avoid — and that all of us need.
          </p>

          <h2 className="font-serif text-2xl text-[var(--deep-purple)] mt-10 mb-4">The Three-Lens Approach</h2>

          <p>
            Every article on this site explores tarot through three simultaneous perspectives:
          </p>

          <ul className="space-y-3 pl-5">
            <li className="text-[var(--deep-purple)]/70">
              <strong className="text-[var(--deep-purple)]">Traditional Symbolism</strong> — The accumulated wisdom of centuries of tarot practice, treated with respect but not reverence.
            </li>
            <li className="text-[var(--deep-purple)]/70">
              <strong className="text-[var(--deep-purple)]">Vedantic Perspective</strong> — Connections to non-dual consciousness traditions that illuminate what the cards are actually pointing toward.
            </li>
            <li className="text-[var(--deep-purple)]/70">
              <strong className="text-[var(--deep-purple)]">Somatic Dimension</strong> — Body-based practices that ground abstract insights in direct, felt experience.
            </li>
          </ul>

          <p>
            This is not eclecticism for its own sake. These three lenses work together because tarot is not just an intellectual exercise — it is a practice that involves the whole person. When you read a card through all three perspectives, something shifts that no single approach can produce on its own.
          </p>

          <h2 className="font-serif text-2xl text-[var(--deep-purple)] mt-10 mb-4">About the Author</h2>

          <div className="p-6 border border-[var(--antique-gold)]/30 rounded bg-[var(--mystic-cream)]">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-full bg-[var(--royal-purple)]/20 flex-shrink-0 flex items-center justify-center">
                <span className="font-serif text-3xl text-[var(--royal-purple)]">K</span>
              </div>
              <div>
                <h3 className="font-serif text-xl text-[var(--deep-purple)] mb-1">Kalesh</h3>
                <p className="text-sm text-[var(--antique-gold)] mb-3">Consciousness Teacher & Writer</p>
                <p className="text-[var(--deep-purple)]/70 leading-relaxed mb-4">
                  {SITE_CONFIG.author.bio}
                </p>
                <a
                  href="https://kalesh.love"
                  className="inline-block px-5 py-2 bg-[var(--royal-purple)] text-[var(--mystic-cream)] rounded text-sm font-medium hover:bg-[var(--deep-purple)] transition-colors no-underline"
                >
                  Visit kalesh.love &rarr;
                </a>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-2xl text-[var(--deep-purple)] mt-10 mb-4">Our Commitment</h2>

          <p>
            Every article on this site is written with care — not generated carelessly and published without thought. We cite real researchers and practitioners: Jiddu Krishnamurti, Alan Watts, Sam Harris, Sadhguru, Tara Brach, and others whose work has genuinely contributed to the understanding of consciousness and contemplative practice.
          </p>

          <p>
            We do not make claims we cannot support. We do not promise that tarot will solve your problems or reveal your destiny. What we do promise is that if you approach these cards with genuine curiosity and honest self-inquiry, something useful will happen — not because the cards are magic, but because paying attention always is.
          </p>

          <div className="mt-10 p-4 border border-[var(--antique-gold)]/20 rounded bg-[var(--mystic-cream)]/50 text-xs text-[var(--deep-purple)]/50 leading-relaxed">
            <strong>Disclaimer:</strong> The content on The Living Tarot is for educational and entertainment purposes only. It is not a substitute for professional medical, psychological, legal, or financial advice. Tarot reading is a contemplative practice, not a diagnostic tool.
          </div>
        </div>
      </div>
    </Layout>
  );
}
