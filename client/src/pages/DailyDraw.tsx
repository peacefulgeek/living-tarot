import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { SITE_CONFIG } from "@/data/config";
import { getRandomCard, type TarotCard } from "@/data/tarot-cards";

type Lens = "traditional" | "vedantic" | "somatic";

export default function DailyDraw() {
  const [card, setCard] = useState<TarotCard | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeLens, setActiveLens] = useState<Lens>("traditional");

  const drawCard = useCallback(() => {
    setIsDrawing(true);
    setCard(null);
    // Simulate shuffling animation
    setTimeout(() => {
      setCard(getRandomCard());
      setIsDrawing(false);
      setActiveLens("traditional");
    }, 1200);
  }, []);

  return (
    <Layout>
      <SEOHead
        title="Daily Draw — Pull a Tarot Card"
        description="Draw a single tarot card each day and explore it through three lenses: traditional symbolism, Vedantic perspective, and somatic experience."
        canonical={`${SITE_CONFIG.domain}/daily-draw`}
      />

      <div className="container py-12 md:py-16 max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--deep-purple)] mb-3 text-center">Daily Draw</h1>
        <p className="text-center text-[var(--deep-purple)]/60 mb-10 max-w-xl mx-auto">
          Pull one card. Sit with it. Notice what arises in your body before your mind starts interpreting.
        </p>

        {!card && !isDrawing && (
          <div className="text-center">
            <div className="w-48 h-72 mx-auto mb-8 border-2 border-[var(--antique-gold)]/40 rounded-lg bg-[var(--royal-purple)]/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgxODMsMTUyLDg5LDAuMikiLz48L3N2Zz4=')] opacity-50" />
              <span className="font-serif text-4xl text-[var(--antique-gold)]/50">?</span>
            </div>
            <button
              onClick={drawCard}
              className="px-8 py-4 bg-[var(--royal-purple)] text-[var(--mystic-cream)] rounded-lg font-serif text-lg hover:bg-[var(--deep-purple)] transition-all shadow-lg shadow-[var(--royal-purple)]/20 hover:shadow-xl hover:shadow-[var(--royal-purple)]/30"
            >
              Draw a Card
            </button>
          </div>
        )}

        {isDrawing && (
          <div className="text-center">
            <div className="w-48 h-72 mx-auto mb-8 border-2 border-[var(--antique-gold)] rounded-lg bg-[var(--royal-purple)]/20 flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 border-2 border-[var(--antique-gold)] border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="font-serif text-lg text-[var(--deep-purple)]/60 italic">Shuffling the deck...</p>
          </div>
        )}

        {card && !isDrawing && (
          <div className="space-y-8">
            {/* Card Display */}
            <div className="text-center">
              <div className="w-48 h-72 mx-auto mb-6 border-2 border-[var(--antique-gold)] rounded-lg bg-gradient-to-b from-[var(--royal-purple)] to-[var(--deep-purple)] flex flex-col items-center justify-center p-4 shadow-xl shadow-[var(--royal-purple)]/20">
                <span className="text-[var(--antique-gold)] text-sm font-medium tracking-wider uppercase mb-2">{card.suit}</span>
                <span className="font-serif text-2xl text-[var(--mystic-cream)] text-center leading-tight">{card.name}</span>
                <span className="text-[var(--antique-gold)]/60 text-xs mt-2">{card.number}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {card.keywords.map(kw => (
                  <span key={kw} className="px-3 py-1 text-xs bg-[var(--royal-purple)]/10 text-[var(--royal-purple)] rounded-full">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Three Lens Tabs */}
            <div className="border border-[var(--antique-gold)]/30 rounded-lg overflow-hidden bg-[var(--mystic-cream)]">
              <div className="flex border-b border-[var(--antique-gold)]/20">
                {(["traditional", "vedantic", "somatic"] as Lens[]).map(lens => (
                  <button
                    key={lens}
                    onClick={() => setActiveLens(lens)}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${
                      activeLens === lens
                        ? "bg-[var(--royal-purple)] text-[var(--mystic-cream)]"
                        : "text-[var(--deep-purple)]/60 hover:bg-[var(--royal-purple)]/10"
                    }`}
                  >
                    {lens === "traditional" ? "Traditional" : lens === "vedantic" ? "Vedantic" : "Somatic"}
                  </button>
                ))}
              </div>
              <div className="p-6">
                <p className="text-[var(--deep-purple)]/80 leading-relaxed">
                  {activeLens === "traditional" && card.traditional}
                  {activeLens === "vedantic" && card.vedantic}
                  {activeLens === "somatic" && card.somatic}
                </p>
              </div>
            </div>

            {/* Journal Prompt */}
            <div className="p-6 border border-[var(--antique-gold)]/30 rounded-lg bg-[var(--antique-gold)]/5">
              <h3 className="font-serif text-lg text-[var(--deep-purple)] mb-3">Journal Prompt</h3>
              <p className="text-[var(--deep-purple)]/80 italic leading-relaxed">{card.journalPrompt}</p>
            </div>

            {/* Draw Again */}
            <div className="text-center">
              <button
                onClick={drawCard}
                className="px-6 py-3 border border-[var(--royal-purple)] text-[var(--royal-purple)] rounded font-medium hover:bg-[var(--royal-purple)]/10 transition-colors"
              >
                Draw Another Card
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
