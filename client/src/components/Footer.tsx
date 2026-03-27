import { useState } from "react";
import { Link } from "wouter";
import { SITE_CONFIG } from "@/data/config";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-[var(--deep-purple)] text-[var(--mystic-cream)]">
      {/* Newsletter Section */}
      <div className="border-b border-[var(--antique-gold)]/20">
        <div className="container py-12 text-center max-w-xl mx-auto">
          <h3 className="font-serif text-2xl mb-3 text-[var(--antique-gold)]">Stay Connected</h3>
          <p className="text-[var(--mystic-cream)]/70 mb-6 text-base">
            Join our community of tarot practitioners exploring consciousness through the cards.
          </p>
          <NewsletterForm source="footer" variant="dark" />
        </div>
      </div>

      {/* Links */}
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-lg text-[var(--antique-gold)] mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/articles" className="text-[var(--mystic-cream)]/60 hover:text-[var(--antique-gold)] transition-colors text-sm no-underline">All Articles</Link></li>
              <li><Link href="/start-here" className="text-[var(--mystic-cream)]/60 hover:text-[var(--antique-gold)] transition-colors text-sm no-underline">Start Here</Link></li>
              <li><Link href="/daily-draw" className="text-[var(--mystic-cream)]/60 hover:text-[var(--antique-gold)] transition-colors text-sm no-underline">Daily Draw</Link></li>
              <li><Link href="/quizzes" className="text-[var(--mystic-cream)]/60 hover:text-[var(--antique-gold)] transition-colors text-sm no-underline">Quizzes</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg text-[var(--antique-gold)] mb-4">Categories</h4>
            <ul className="space-y-2">
              {SITE_CONFIG.categories.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-[var(--mystic-cream)]/60 hover:text-[var(--antique-gold)] transition-colors text-sm no-underline">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg text-[var(--antique-gold)] mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-[var(--mystic-cream)]/60 hover:text-[var(--antique-gold)] transition-colors text-sm no-underline">About Us</Link></li>
              <li><a href={SITE_CONFIG.author.link} className="text-[var(--mystic-cream)]/60 hover:text-[var(--antique-gold)] transition-colors text-sm no-underline">{SITE_CONFIG.author.name}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg text-[var(--antique-gold)] mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-[var(--mystic-cream)]/60 hover:text-[var(--antique-gold)] transition-colors text-sm no-underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[var(--mystic-cream)]/60 hover:text-[var(--antique-gold)] transition-colors text-sm no-underline">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-[var(--antique-gold)]/20">
        <div className="container py-6">
          <p className="text-xs text-[var(--mystic-cream)]/40 text-center leading-relaxed">
            <strong>Disclaimer:</strong> The content on The Living Tarot is for educational and entertainment purposes only. 
            It is not a substitute for professional medical, psychological, legal, or financial advice. 
            Tarot reading is a contemplative practice, not a diagnostic tool. Always consult qualified professionals for specific concerns.
          </p>
          <p className="text-xs text-[var(--mystic-cream)]/30 text-center mt-4">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.title}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
