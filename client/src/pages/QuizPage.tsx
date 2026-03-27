import { useState } from "react";
import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { SITE_CONFIG } from "@/data/config";
import { quizzes } from "@/data/quizzes";
import { getArticleBySlug } from "@/data/articles-helper";
import ArticleCard from "@/components/ArticleCard";

export default function QuizPage() {
  const { slug } = useParams<{ slug: string }>();
  const quiz = quizzes.find(q => q.slug === slug);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  if (!quiz) {
    return (
      <Layout>
        <SEOHead title="Quiz Not Found" description="This quiz does not exist." />
        <div className="container py-20 text-center">
          <h1 className="font-serif text-3xl text-[var(--deep-purple)] mb-4">Quiz Not Found</h1>
          <Link href="/quizzes" className="text-[var(--royal-purple)] underline">Browse all quizzes</Link>
        </div>
      </Layout>
    );
  }

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = showResult ? quiz.getResult(answers) : null;
  const recommendedArticles = result
    ? result.articles.map(s => getArticleBySlug(s)).filter(Boolean)
    : [];

  return (
    <Layout>
      <SEOHead
        title={quiz.title}
        description={quiz.metaDescription}
        canonical={`${SITE_CONFIG.domain}/quiz/${quiz.slug}`}
      />

      <div className="container py-12 md:py-16 max-w-2xl mx-auto">
        {!showResult ? (
          <>
            <div className="mb-8">
              <Link href="/quizzes" className="text-sm text-[var(--royal-purple)] no-underline hover:text-[var(--antique-gold)] transition-colors">
                &larr; All Quizzes
              </Link>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl text-[var(--deep-purple)] mb-6">{quiz.title}</h1>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-[var(--deep-purple)]/50 mb-2">
                <span>Question {currentQ + 1} of {quiz.questions.length}</span>
                <span>{Math.round(((currentQ) / quiz.questions.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-[var(--antique-gold)]/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--royal-purple)] transition-all duration-500 rounded-full"
                  style={{ width: `${((currentQ) / quiz.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="font-serif text-xl text-[var(--deep-purple)] mb-6">
                {quiz.questions[currentQ].question}
              </h2>
              <div className="space-y-3">
                {quiz.questions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left p-4 border border-[var(--antique-gold)]/30 rounded bg-[var(--mystic-cream)] hover:border-[var(--royal-purple)] hover:bg-[var(--royal-purple)]/5 transition-all text-[var(--deep-purple)]/80 hover:text-[var(--deep-purple)]"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : result ? (
          <>
            <div className="mb-8">
              <Link href="/quizzes" className="text-sm text-[var(--royal-purple)] no-underline hover:text-[var(--antique-gold)] transition-colors">
                &larr; All Quizzes
              </Link>
            </div>

            <div className="text-center mb-10">
              <h1 className="font-serif text-2xl md:text-3xl text-[var(--deep-purple)] mb-4">Your Result</h1>
              <div className="p-8 border border-[var(--antique-gold)]/30 rounded bg-[var(--mystic-cream)]">
                <h2 className="font-serif text-2xl text-[var(--royal-purple)] mb-4">{result.title}</h2>
                <p className="text-[var(--deep-purple)]/70 leading-relaxed">{result.description}</p>
              </div>
            </div>

            {/* Recommended Articles */}
            {recommendedArticles.length > 0 && (
              <section>
                <h3 className="font-serif text-xl text-[var(--deep-purple)] mb-4">Recommended Reading</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendedArticles.map(a => a && (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              </section>
            )}

            <div className="text-center mt-8">
              <button
                onClick={restart}
                className="px-6 py-3 border border-[var(--royal-purple)] text-[var(--royal-purple)] rounded font-medium hover:bg-[var(--royal-purple)]/10 transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </>
        ) : null}
      </div>
    </Layout>
  );
}
