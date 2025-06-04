import { useEffect, useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';

// Lazy load heavy components
const Blog = lazy(() => import('./components/Blog'));
const About = lazy(() => import('./components/About'));
const Resume = lazy(() => import('./components/Resume'));
const Contact = lazy(() => import('./components/Contact'));

// Import immediately needed components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Import hooks and utilities
import { ThemeProvider } from './contexts/ThemeContext';
import { initGA, trackPageView, trackEvent } from './utils/analytics';
import { usePerformanceMonitoring } from './hooks/usePerformanceMonitoring';

function AppContent() {
  const [currentView, setCurrentView] = useState('portfolio');
  
  // Start performance monitoring
  usePerformanceMonitoring();

  // Initialize Google Analytics on app load
  useEffect(() => {
    // Initialize Google Analytics with your ID: G-VPC78XB0H1
    initGA();
    
    // Track initial page view
    trackPageView(window.location.href, 'Portfolio Home');
    
    // Track app initialization
    trackEvent('app_initialized', 'Application', 'startup', Date.now());
  }, []);

  // Handle hash changes for navigation tracking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#blog') {
        setCurrentView('blog');
        trackPageView(window.location.href, 'Blog');
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }, 100);
      } else if (hash === '') {
        setCurrentView('portfolio');
        // If we just switched from blog and have a pending scroll, set the hash to the target section
        const pendingScroll = sessionStorage.getItem('pendingScroll');
        if (pendingScroll) {
          setTimeout(() => {
            window.location.hash = pendingScroll;
            // Remove the flag immediately to avoid loops
            sessionStorage.removeItem('pendingScroll');
          }, 100); // Give React time to render portfolio view
        }
        trackPageView(window.location.href, 'Portfolio Home');
      } else {
        setCurrentView('portfolio');
        if (hash) {
          const sectionName = hash.replace('#', '');
          trackPageView(window.location.href, `Section: ${sectionName}`);
          // If this is a navigation from blog to section, scroll and clear flag
          const pendingScroll = sessionStorage.getItem('pendingScroll');
          if (pendingScroll === hash) {
            sessionStorage.removeItem('pendingScroll');
            setTimeout(() => {
              const element = document.querySelector(hash) as HTMLElement;
              if (element) {
                const headerHeight = 64;
                const additionalPadding = 32;
                const elementPosition = element.offsetTop;
                const offsetPosition = elementPosition - headerHeight - additionalPadding;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth',
                });
              }
            }, 200);
          }
        } else {
          trackPageView(window.location.href, 'Portfolio Home');
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle visibility changes for better analytics
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackEvent('page_hidden', 'Engagement', 'visibility_change');
      } else {
        trackEvent('page_visible', 'Engagement', 'visibility_change');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {currentView === 'blog' ? (
          <ErrorBoundary key="blog-boundary">
            <Suspense fallback={<LoadingSpinner />}>
              <Blog key="blog" />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <div key="portfolio">
            <Navbar />
            <main id="main-content" role="main">
              <Hero />
              <ErrorBoundary key="content-boundary">
                <Suspense fallback={<LoadingSpinner />}>
                  <About />
                  <Resume />
                  <Contact />
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary key="app-boundary">
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
