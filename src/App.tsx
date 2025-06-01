import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import ThemeProvider from './components/ThemeProvider';
import { useTheme } from './hooks/useTheme'; // New import path
import { ThemeToggle } from './components/ThemeToggle';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import Footer
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
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
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

// Create a new component inside the ThemeProvider
function AppContent({
  onPerformanceMetrics,
}: {
  onPerformanceMetrics: (metrics: PerformanceMetrics) => void;
}) {
  const { isDarkMode } = useTheme(); // Now we can use the theme context

  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20'
            : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20'
        }`}
      >
        <SkipLink href="#main">Skip to main content</SkipLink>
        <AccessibilityToolbar />
        <ThemeToggle />
        <PerformanceMonitor onMetricsCollected={onPerformanceMetrics} />

        <Router>
          <Navbar />
          <main id="main" className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Routes>
            </Suspense>
          </main>
          <Footer /> {/* Add Footer here */}
        </Router>
      </div>
    </ErrorBoundary>
  );
}

function App() {
  const handlePerformanceMetrics = (metrics: PerformanceMetrics) => {
    // Log metrics or send to analytics service
    console.log('Performance metrics:', metrics);
  };

  return (
    <ThemeProvider>
      <AppContent onPerformanceMetrics={handlePerformanceMetrics} />
    </ThemeProvider>
  );
}

export default App;
