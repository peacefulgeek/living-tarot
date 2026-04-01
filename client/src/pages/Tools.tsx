import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { SITE_CONFIG } from "@/data/config";
import { Link } from "wouter";

interface Product {
  name: string;
  description: string;
  url: string;
  isAmazon: boolean;
}

interface Category {
  title: string;
  products: Product[];
}

const TOOLS_DATA: Category[] = [
  {
    title: "Essential Tarot Books",
    products: [
      {
        name: "Seventy-Eight Degrees of Wisdom by Rachel Pollack",
        description: "If you read one tarot book in your life, make it this one. Pollack treats each card as a doorway into psychological and spiritual territory that most authors barely touch. This is the book that turned tarot from a parlor trick into a genuine contemplative practice for an entire generation of readers.",
        url: "https://www.amazon.com/dp/1578636655?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "Man and His Symbols by Carl Jung",
        description: "Jung never wrote a tarot book, but this is the closest thing to understanding why the cards work. His exploration of archetypes, the collective unconscious, and symbolic thinking is the intellectual foundation beneath every serious tarot practice. We wrote about this connection in our guide to Jungian archetypes in the Major Arcana.",
        url: "https://www.amazon.com/dp/0385052219?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "The Tarot: History, Symbolism, and Divination by Robert Place",
        description: "Place is one of the few authors who actually traces the historical lineage of tarot imagery without romanticizing it. If you want to understand where these symbols came from — not the New Age mythology, but the real art history — this is your book.",
        url: "https://www.amazon.com/dp/1585423491?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "Waking Up by Sam Harris",
        description: "Not a tarot book at all, but Harris makes the case for contemplative practice without the metaphysical baggage better than anyone writing today. If you approach tarot as a mindfulness tool rather than a fortune-telling device, this book will sharpen your understanding of why that matters.",
        url: "https://www.amazon.com/dp/1451636024?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "The Creative Tarot by Jessa Crispin",
        description: "Crispin connects each card to specific works of art, literature, and music. It is the most original approach to tarot meaning I have encountered in years — treating the deck as a creative toolkit rather than a prediction engine.",
        url: "https://www.amazon.com/dp/1501120239?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "Kitchen Table Tarot by Melissa Cynova",
        description: "Cynova strips away the mystical pretension and talks about reading cards the way you would talk to a friend over coffee. Practical, funny, and deeply human. Perfect for readers who want to use tarot in everyday life without the ceremonial overhead.",
        url: "https://www.amazon.com/dp/0738750786?tag=spankyspinola-20",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Tarot Decks We Trust",
    products: [
      {
        name: "The Rider-Waite Tarot Deck",
        description: "The standard for a reason. Pamela Colman Smith's illustrations are the visual language that 90% of tarot literature references. Start here, learn here, and you will always have a common vocabulary with other readers.",
        url: "https://www.amazon.com/dp/0913866164?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "The Wild Unknown Tarot Deck and Guidebook",
        description: "Kim Krans created something genuinely new — animal and nature imagery that bypasses the medieval European aesthetic entirely. The cards feel alive in a way that opens up readings for people who find traditional imagery alienating.",
        url: "https://www.amazon.com/dp/0062466593?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "Ethereal Visions Illuminated Tarot Deck",
        description: "Matt Hughes' Art Nouveau illustrations are stunning. Gold foil details on every card. This is the deck you buy when you want your practice to feel like holding a piece of art in your hands.",
        url: "https://www.amazon.com/dp/1572819723?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "The Thoth Tarot Deck by Aleister Crowley",
        description: "Lady Frieda Harris painted these cards under Crowley's direction, and the result is one of the most symbolically dense decks ever created. Not for beginners, but if you want to go deep into esoteric symbolism, nothing else compares.",
        url: "https://www.amazon.com/dp/1572815108?tag=spankyspinola-20",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Journals & Workbooks",
    products: [
      {
        name: "Tarot Journal for Recording & Interpreting Readings",
        description: "A structured journal with spaces for card positions, initial impressions, and follow-up reflections. The format forces you to slow down and actually process what the cards are showing you, which is where the real work happens.",
        url: "https://www.amazon.com/dp/B08TZHGMCD?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "The Artist's Way by Julia Cameron",
        description: "Cameron's morning pages practice pairs beautifully with daily tarot draws. Pull a card, then write three pages. The combination of symbolic input and freeform output creates a contemplative practice that goes deeper than either one alone.",
        url: "https://www.amazon.com/dp/0143129252?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "Leuchtturm1917 Dotted Notebook",
        description: "The best blank journal for creating your own tarot practice log. Dot grid lets you sketch card layouts, write reflections, and create your own spread diagrams. Numbered pages and table of contents make it easy to find past readings.",
        url: "https://www.amazon.com/dp/B002TSIMW4?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "The Body Keeps the Score by Bessel van der Kolk",
        description: "Understanding how trauma lives in the body transforms how you read cards like The Tower, the Ten of Swords, and the Three of Swords. Van der Kolk's work is essential background for anyone doing emotionally honest tarot work.",
        url: "https://www.amazon.com/dp/0143127748?tag=spankyspinola-20",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Meditation & Practice Tools",
    products: [
      {
        name: "Zafu Meditation Cushion — Buckwheat Fill",
        description: "A proper meditation cushion changes everything about your sitting practice. Buckwheat hull filling conforms to your body and stays firm. Use it for pre-reading meditation — even five minutes of stillness before pulling cards makes a noticeable difference in reading quality.",
        url: "https://www.amazon.com/dp/B0002046F8?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "Singing Bowl Set — Hand Hammered",
        description: "The resonance of a singing bowl clears the mental chatter before a reading in a way that no amount of deep breathing quite matches. Hand-hammered bowls have richer overtones than machine-made ones. Strike it once, let the sound decay, then begin.",
        url: "https://www.amazon.com/dp/B07XLNLQL9?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "Palo Santo Sticks — Sustainably Sourced",
        description: "Lighter and sweeter than sage, palo santo creates a ritual transition between ordinary thinking and the contemplative state that good readings require. The scent itself becomes an anchor — your nervous system learns to associate it with focused attention.",
        url: "https://www.amazon.com/dp/B07BDFP3K5?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "Tarot Cloth — Velvet Reading Mat",
        description: "A dedicated reading surface creates a physical boundary between the cards and the everyday world. Velvet protects card faces from scratching and gives readings a tactile quality that matters more than you would expect.",
        url: "https://www.amazon.com/dp/B07WNKF3DK?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "Beeswax Candles — Hand-Rolled",
        description: "Beeswax burns cleaner than paraffin and produces a warm, steady light that is genuinely different from electric lighting. A single candle during evening readings creates the kind of focused atmosphere that supports deeper intuitive work.",
        url: "https://www.amazon.com/dp/B00LNHFHQM?tag=spankyspinola-20",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Apps & Digital Tools",
    products: [
      {
        name: "Insight Timer — Meditation App",
        description: "The best free meditation app for building a pre-reading practice. Thousands of guided meditations, a simple timer, and a community of practitioners. Use the five-minute body scan before any reading session.",
        url: "https://insighttimer.com",
        isAmazon: false,
      },
      {
        name: "Labyrinthos — Tarot Learning App",
        description: "The most effective flashcard-style tarot learning app available. Spaced repetition helps you internalize card meanings without rote memorization. Excellent for beginners building foundational knowledge.",
        url: "https://labyrinthos.co",
        isAmazon: false,
      },
      {
        name: "Day One Journal App",
        description: "The most polished digital journaling app for tracking daily draws and reading reflections. Photo support means you can photograph your spreads and annotate them. Encrypted and private.",
        url: "https://dayoneapp.com",
        isAmazon: false,
      },
      {
        name: "Calm — Sleep & Meditation",
        description: "The body scan and breathing exercises in Calm are excellent preparation for readings that require emotional presence. The sleep stories also help process intense readings that linger after the session ends.",
        url: "https://www.calm.com",
        isAmazon: false,
      },
    ],
  },
  {
    title: "Deeper Study & Courses",
    products: [
      {
        name: "Radical Acceptance by Tara Brach",
        description: "Brach's integration of Buddhist psychology with Western therapeutic practice is the best framework I have found for understanding what happens emotionally during a tarot reading. The cards often surface what we have been avoiding — Brach teaches you how to meet that with compassion rather than fear.",
        url: "https://www.amazon.com/dp/0553380990?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "The Power of Now by Eckhart Tolle",
        description: "Tolle's core insight — that presence is the foundation of all genuine understanding — applies directly to tarot practice. The cards can only speak to you in the present moment. Everything else is projection.",
        url: "https://www.amazon.com/dp/1577314808?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "Memories, Dreams, Reflections by Carl Jung",
        description: "Jung's autobiography reveals how he developed his understanding of symbols and the unconscious through direct personal experience. Reading this alongside a tarot practice creates a dialogue between his journey and your own.",
        url: "https://www.amazon.com/dp/0679723951?tag=spankyspinola-20",
        isAmazon: true,
      },
      {
        name: "Biddy Tarot Certification Program",
        description: "The most comprehensive online tarot certification available. Brigit Esselmont built a structured curriculum that takes you from card meanings through professional reading skills. Worth the investment if you want to read for others.",
        url: "https://www.biddytarot.com/tarot-certification/",
        isAmazon: false,
      },
      {
        name: "Inner Traditions — Tarot Publisher",
        description: "The publisher behind many of the best tarot books in print. Their catalog is worth browsing when you are ready to go beyond the basics. They consistently publish authors who treat tarot as a serious contemplative discipline.",
        url: "https://www.innertraditions.com",
        isAmazon: false,
      },
    ],
  },
];

// Count products
const totalProducts = TOOLS_DATA.reduce((sum, cat) => sum + cat.products.length, 0);
const amazonProducts = TOOLS_DATA.reduce((sum, cat) => sum + cat.products.filter(p => p.isAmazon).length, 0);

// ItemList schema
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tarot Tools & Resources We Recommend",
  description: "Curated list of the best books, decks, tools, apps, and resources for tarot practitioners. Personally vetted recommendations from Kalesh.",
  numberOfItems: totalProducts,
  itemListElement: TOOLS_DATA.flatMap((cat, ci) =>
    cat.products.map((p, pi) => ({
      "@type": "ListItem",
      position: ci * 10 + pi + 1,
      name: p.name,
      url: p.url,
    }))
  ),
};

export default function Tools() {
  return (
    <Layout>
      <SEOHead
        title="Best Tarot Tools & Resources We Recommend"
        description={`Curated list of the best ${totalProducts} books, decks, tools, apps, and resources for tarot practitioners. Personally vetted recommendations from Kalesh.`}
        canonical={`${SITE_CONFIG.domain}/tools`}
        jsonLd={[itemListSchema]}
      />

      <div className="container py-12 md:py-16 max-w-4xl mx-auto">
        {/* Affiliate Disclosure */}
        <div className="mb-8 p-4 border border-[var(--antique-gold)]/30 rounded-lg bg-[var(--mystic-cream)] text-xs text-[var(--deep-purple)]/60 leading-relaxed">
          This page contains affiliate links. We may earn a small commission if you make a purchase — at no extra cost to you.
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-[var(--deep-purple)] mb-4">
          Tarot Tools & Resources We Recommend
        </h1>

        <p className="text-[var(--deep-purple)]/70 text-base leading-relaxed mb-4 max-w-2xl">
          These are the tools, books, and resources I actually trust. Every recommendation here has been chosen because it serves the work this site is about — using tarot as a mirror for consciousness, not a crystal ball for the future.
        </p>
        <p className="text-[var(--deep-purple)]/60 text-sm leading-relaxed mb-10 max-w-2xl">
          Some of these links are affiliate links, which means I may earn a small commission if you purchase through them. That does not affect the price you pay or the honesty of these recommendations. I only recommend what I would hand to a friend.
        </p>

        {/* Category Sections */}
        {TOOLS_DATA.map((category) => (
          <section key={category.title} className="mb-12">
            <h2 className="font-serif text-2xl text-[var(--deep-purple)] mb-6 pb-2 border-b border-[var(--antique-gold)]/30">
              {category.title}
            </h2>
            <div className="grid gap-4">
              {category.products.map((product) => (
                <div
                  key={product.name}
                  className="p-5 border border-[var(--antique-gold)]/20 rounded-lg bg-[var(--parchment)] hover:border-[var(--antique-gold)]/40 transition-colors"
                >
                  <h3 className="font-serif text-lg text-[var(--deep-purple)] mb-2">
                    <a
                      href={product.url}
                      target="_blank"
                      rel={product.isAmazon ? "noopener" : "noopener nofollow"}
                      className="text-[var(--royal-purple)] hover:text-[var(--deep-purple)] transition-colors no-underline"
                    >
                      {product.name}
                    </a>
                    {product.isAmazon && (
                      <span className="text-xs text-[var(--deep-purple)]/40 ml-2">(paid link)</span>
                    )}
                  </h3>
                  <p className="text-sm text-[var(--deep-purple)]/70 leading-relaxed mb-3">
                    {product.description}
                  </p>
                  <a
                    href={product.url}
                    target="_blank"
                    rel={product.isAmazon ? "noopener" : "noopener nofollow"}
                    className="inline-flex items-center gap-1 text-sm text-[var(--royal-purple)] font-medium hover:text-[var(--deep-purple)] transition-colors no-underline"
                  >
                    {product.isAmazon ? "View on Amazon →" : "Visit Website →"}
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Internal Links Section */}
        <section className="mt-12 p-6 border border-[var(--antique-gold)]/30 rounded-lg bg-[var(--mystic-cream)]">
          <h2 className="font-serif text-xl text-[var(--deep-purple)] mb-4">Continue Your Practice</h2>
          <p className="text-sm text-[var(--deep-purple)]/70 mb-4">
            These tools work best alongside a consistent reading practice. Here are some places to start:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/start-here" className="px-4 py-2 bg-[var(--royal-purple)]/10 text-[var(--royal-purple)] rounded text-sm font-medium no-underline hover:bg-[var(--royal-purple)]/20 transition-colors">
              Start Here Guide
            </Link>
            <Link href="/daily-draw" className="px-4 py-2 bg-[var(--royal-purple)]/10 text-[var(--royal-purple)] rounded text-sm font-medium no-underline hover:bg-[var(--royal-purple)]/20 transition-colors">
              Daily Card Draw
            </Link>
            <Link href="/quizzes" className="px-4 py-2 bg-[var(--royal-purple)]/10 text-[var(--royal-purple)] rounded text-sm font-medium no-underline hover:bg-[var(--royal-purple)]/20 transition-colors">
              Tarot Quizzes
            </Link>
            <Link href="/articles" className="px-4 py-2 bg-[var(--royal-purple)]/10 text-[var(--royal-purple)] rounded text-sm font-medium no-underline hover:bg-[var(--royal-purple)]/20 transition-colors">
              Browse All Articles
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
