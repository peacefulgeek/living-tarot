import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <Layout>
      <SEOHead title="Page Not Found" description="The page you are looking for does not exist." />

      <div className="container py-20 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="font-serif text-6xl text-[var(--antique-gold)] mb-4">404</h1>
          <h2 className="font-serif text-2xl text-[var(--deep-purple)] mb-4">The Card Is Not Here</h2>
          <p className="text-[var(--deep-purple)]/60 mb-8">
            The page you are looking for may have been moved, removed, or perhaps it was never here to begin with — which is itself a kind of reading.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="px-6 py-3 bg-[var(--royal-purple)] text-[var(--mystic-cream)] rounded font-medium hover:bg-[var(--deep-purple)] transition-colors no-underline">
              Return Home
            </Link>
            <Link href="/articles" className="px-6 py-3 border border-[var(--royal-purple)] text-[var(--royal-purple)] rounded font-medium hover:bg-[var(--royal-purple)]/10 transition-colors no-underline">
              Browse Articles
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
