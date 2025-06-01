import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import SkipLink from './components/SkipLink';
import PrivacyBanner from './components/PrivacyBanner';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import ErrorBoundary from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';
import type { PerformanceMetrics } from './components/PerformanceMonitor';
import { useAnalyticsConsent } from './utils/privacy';

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
        // Calculate header + extra offset (2rem)
        const rootStyle = getComputedStyle(document.documentElement);
        const rootFontSize = parseFloat(rootStyle.fontSize);
        const headerRem = parseFloat(
          rootStyle.getPropertyValue('--header-height')
        );
        const extraRem = 2;
        const offset = (headerRem + extraRem) * rootFontSize;
        const elementY =
          element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementY - offset, behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <SkipLink href="#about">Skip to about section</SkipLink>
      <SkipLink href="#resume">Skip to experience section</SkipLink>
      <SkipLink href="#contact">Skip to contact section</SkipLink>

      <main id="main-content">
        <Hero />
        <About />
        <Resume />
        <Contact />
      </main>
    </>
  );
}

function App() {
  const { showBanner, acceptAnalytics, declineAnalytics } =
    useAnalyticsConsent();

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          <ErrorBoundary
            fallback={
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Page Error
                  </h2>
                  <p className="text-gray-600">
                    Unable to load this page. Please try again.
                  </p>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/blog"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Blog />
                  </Suspense>
                }
              />
              <Route
                path="/blog/:slug"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <BlogPost />
                  </Suspense>
                }
              />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </ErrorBoundary>

          <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-gray-300">
                © {new Date().getFullYear()} Hector Norzagaray. All rights
                reserved.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                {' • '}
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </p>
            </div>
          </footer>

          {/* Privacy consent banner */}
          <PrivacyBanner
            show={showBanner}
            onAccept={acceptAnalytics}
            onDecline={declineAnalytics}
          />

          {/* Accessibility toolbar */}
          <AccessibilityToolbar />

          {/* Performance monitoring */}
          <PerformanceMonitor
            onMetricsCollected={(metrics: PerformanceMetrics) => {
              // You can send metrics to analytics here
              console.log('Performance metrics collected:', metrics);
            }}
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
