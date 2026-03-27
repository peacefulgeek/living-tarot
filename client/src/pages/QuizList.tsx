import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { SITE_CONFIG } from "@/data/config";
import { quizzes } from "@/data/quizzes";

export default function QuizList() {
  return (
    <Layout>
      <SEOHead
        title="Tarot Quizzes"
        description="Explore 9 interactive tarot quizzes to deepen your practice, discover your reading style, and test your knowledge of card meanings."
        canonical={`${SITE_CONFIG.domain}/quizzes`}
      />

      <div className="container py-12 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl text-[var(--deep-purple)] mb-3">Tarot Quizzes</h1>
        <p className="text-[var(--deep-purple)]/60 mb-10 max-w-2xl">
          Interactive quizzes to explore your relationship with the cards. No grades, no right answers — just honest self-inquiry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map(quiz => (
            <Link key={quiz.slug} href={`/quiz/${quiz.slug}`} className="group block no-underline">
              <div className="h-full p-6 border border-[var(--antique-gold)]/20 rounded bg-[var(--mystic-cream)] hover:border-[var(--antique-gold)]/50 hover:shadow-lg hover:shadow-[var(--royal-purple)]/5 transition-all">
                
                <h2 className="font-serif text-lg text-[var(--deep-purple)] group-hover:text-[var(--royal-purple)] transition-colors mb-2">
                  {quiz.title}
                </h2>
                <p className="text-sm text-[var(--deep-purple)]/60 mb-4">{quiz.description}</p>
                <span className="text-xs text-[var(--antique-gold)] font-medium">{quiz.questions.length} questions</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
