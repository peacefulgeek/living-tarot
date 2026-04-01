import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search } from "lucide-react";
import { SITE_CONFIG } from "@/data/config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/start-here", label: "Start Here" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/daily-draw", label: "Daily Draw" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-[var(--mystic-cream)]/95 backdrop-blur-sm border-b border-[var(--antique-gold)]/30">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="font-serif text-xl md:text-2xl font-bold text-[var(--royal-purple)] tracking-tight">
            {SITE_CONFIG.title}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium transition-colors no-underline rounded ${
                location === link.href
                  ? "text-[var(--royal-purple)] bg-[var(--royal-purple)]/10"
                  : "text-[var(--deep-purple)]/70 hover:text-[var(--royal-purple)] hover:bg-[var(--royal-purple)]/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/articles?q="
            className="ml-2 p-2 text-[var(--deep-purple)]/60 hover:text-[var(--royal-purple)] transition-colors no-underline"
            aria-label="Search articles"
          >
            <Search className="w-4 h-4" />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[var(--royal-purple)]"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-[var(--antique-gold)]/20 bg-[var(--mystic-cream)] pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-base no-underline transition-colors ${
                location === link.href
                  ? "text-[var(--royal-purple)] bg-[var(--royal-purple)]/10 font-semibold"
                  : "text-[var(--deep-purple)]/70 hover:text-[var(--royal-purple)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
