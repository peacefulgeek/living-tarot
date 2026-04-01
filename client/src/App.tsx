import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const StartHere = lazy(() => import("./pages/StartHere"));
const About = lazy(() => import("./pages/About"));
const QuizList = lazy(() => import("./pages/QuizList"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const DailyDraw = lazy(() => import("./pages/DailyDraw"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Tools = lazy(() => import("./pages/Tools"));
const Assessments = lazy(() => import("./pages/Assessments"));
const NotFound = lazy(() => import("./pages/NotFound"));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--mystic-cream)]">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-[var(--antique-gold)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-serif text-[var(--royal-purple)]">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/articles" component={Articles} />
        <Route path="/category/:slug" component={CategoryPage} />
        <Route path="/start-here" component={StartHere} />
        <Route path="/about" component={About} />
        <Route path="/quizzes" component={QuizList} />
        <Route path="/quiz/:slug" component={QuizPage} />
        <Route path="/daily-draw" component={DailyDraw} />
        <Route path="/tools" component={Tools} />
        <Route path="/assessments" component={Assessments} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/:category/:slug" component={ArticlePage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
