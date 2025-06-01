import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Contact from './components/Contact';
import SkipLink from './components/SkipLink';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import ErrorBoundary from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';
import type { PerformanceMetrics } from './components/PerformanceMonitor';

// Lazy load blog components for code splitting
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./components/BlogPost'));

// Loading component for Suspense
const LoadingSpinner = () => (
  <div
    className="flex justify-center items-center min-h-[400px]"
    role="status"
    aria-label="Loading"
  >
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <Resume />
      <Contact />
    </>
  );
}

function App() {
  const handlePerformanceMetrics = (metrics: PerformanceMetrics) => {
    // Simple analytics tracking - no consent needed
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: 'Core Web Vitals',
        lcp: metrics.lcp,
        fid: metrics.fid,
        cls: metrics.cls,
        fcp: metrics.fcp,
        ttfb: metrics.ttfb,
      });
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <SkipLink href="#main">Skip to main content</SkipLink>
        <AccessibilityToolbar />
        <PerformanceMonitor onMetricsCollected={handlePerformanceMetrics} />

        <Router>
          <Navbar />
          <main id="main">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Routes>
            </Suspense>
          </main>
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
