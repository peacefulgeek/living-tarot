// Site configuration — The Living Tarot
// Author: Kalesh — Consciousness Teacher & Writer
// Editorial: The Living Tarot Editorial

export const SITE_CONFIG = {
  title: "The Living Tarot",
  subtitle: "Learn to Read the Cards Like They're Talking to You",
  tagline: "The cards don't predict your future. They illuminate your present.",
  domain: "https://livingtarot.love",
  editorialName: "The Living Tarot Editorial",
  author: {
    name: "Kalesh",
    title: "Consciousness Teacher & Writer",
    bio: "Kalesh is a mystic and spiritual advisor who brings ancient wisdom and depth to life's biggest decisions.",
    link: "https://kalesh.love",
    linkText: "Visit Kalesh's Website",
    photo: "https://living-tarot.b-cdn.net/images/author/kalesh.webp",
    photoFull: "https://living-tarot.b-cdn.net/images/author/kalesh-full.webp",
  },
  bunny: {
    storageZone: "living-tarot",
    storageHost: "ny.storage.bunnycdn.com",
    storagePassword: "5c3e1087-a3d7-4dd7-abf23f446fda-3227-4fe6",
    cdnBase: "https://living-tarot.b-cdn.net",
  },
  categories: [
    { slug: "the-major-arcana", name: "The Major Arcana", description: "Journey through the 22 cards of transformation, from The Fool's leap to The World's completion." },
    { slug: "the-minor-arcana", name: "The Minor Arcana", description: "The 56 cards of daily life — Cups, Wands, Swords, and Pentacles as mirrors of everyday consciousness." },
    { slug: "the-spreads", name: "The Spreads", description: "Layouts and patterns for reading — from the Celtic Cross to custom spreads for specific questions." },
    { slug: "the-intuition", name: "The Intuition", description: "Developing the felt sense that transforms card reading from memorization into genuine knowing." },
    { slug: "the-practice", name: "The Practice", description: "Daily rituals, journaling techniques, and embodied approaches to living with the cards." },
  ],
  articlesPerPage: 12,
  liveArticleCount: 30,
  totalArticleCount: 300,
  gatedPerDay: 5,
  launchDate: "2026-01-01",
};

export const CATEGORIES = SITE_CONFIG.categories;

// Calculate visible articles based on date
export function getVisibleArticleCount(): number {
  const launch = new Date(SITE_CONFIG.launchDate);
  const now = new Date();
  const daysSinceLaunch = Math.floor((now.getTime() - launch.getTime()) / (1000 * 60 * 60 * 24));
  const gated = Math.min(SITE_CONFIG.totalArticleCount - SITE_CONFIG.liveArticleCount, daysSinceLaunch * SITE_CONFIG.gatedPerDay);
  return Math.min(SITE_CONFIG.totalArticleCount, SITE_CONFIG.liveArticleCount + gated);
}
