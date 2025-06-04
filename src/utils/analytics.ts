// Google Analytics tracking utility with performance optimizations

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: object) => void;
    dataLayer: unknown[];
  }
}

// Google Analytics 4 Configuration
const GA_TRACKING_ID = 'G-VPC78XB0H1';

// Performance tracking variables
let pageStartTime = Date.now();
let maxScrollDepth = 0;

// Debouncing timers
let scrollTimeout: NodeJS.Timeout;
let pageViewTimeout: NodeJS.Timeout;

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return;

  // Initialize gtag function and dataLayer first
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  // Load gtag script with proper loading handling
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  
  script.onload = () => {
    // Initialize GA after script loads
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: false, // We'll send page views manually
    });

    console.log('Google Analytics initialized with ID:', GA_TRACKING_ID);
    console.log('Script loaded from:', script.src);
    
    // Send initial page view
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
    
    console.log('Initial page view sent');
  };

  script.onerror = () => {
    console.warn('Failed to load Google Analytics');
  };

  document.head.appendChild(script);
};

// Utility function to wait for gtag to be available
const waitForGtag = (callback: () => void, maxAttempts = 50, attempt = 0) => {
  if (typeof window !== 'undefined' && window.gtag && typeof window.gtag === 'function') {
    callback();
  } else if (attempt < maxAttempts) {
    setTimeout(() => waitForGtag(callback, maxAttempts, attempt + 1), 100);
  }
};

// Debounced page view tracking
export const trackPageView = (url: string, title?: string) => {
  if (pageViewTimeout) clearTimeout(pageViewTimeout);
  
  pageViewTimeout = setTimeout(() => {
    waitForGtag(() => {
      if (typeof window !== 'undefined' && window.gtag && typeof window.gtag === 'function') {
        // Send page_view event for GA4
        window.gtag('event', 'page_view', {
          page_title: title || document.title,
          page_location: url,
          page_path: new URL(url).pathname,
        });
        
        // Also send config update for proper tracking
        window.gtag('config', GA_TRACKING_ID, {
          page_path: new URL(url).pathname,
          page_title: title || document.title,
        });
        
        console.log('✅ Page view tracked:', title || document.title, url);
      } else {
        console.warn('❌ gtag not available for page view:', url);
      }
    });
    pageStartTime = Date.now();
  }, 100);
};

// Track custom events with validation
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  // Validate inputs
  if (!action || !category) {
    return;
  }

  waitForGtag(() => {
    if (typeof window !== 'undefined' && window.gtag && typeof window.gtag === 'function') {
      // GA4-compatible event structure
      const eventData: Record<string, unknown> = {};
      
      if (label) eventData.custom_label = label;
      if (value !== undefined) eventData.value = value;
      if (category) eventData.event_category = category;
      
      window.gtag('event', action, eventData);
      console.log('✅ Event tracked:', action, 'category:', category, 'label:', label);
    } else {
      console.warn('❌ gtag not available for event:', action);
    }
  });
};

// Debug function to check if GA is working
export const debugGA = () => {
  if (typeof window !== 'undefined') {
    console.log('🔍 GA Debug Info:');
    console.log('- gtag function exists:', typeof window.gtag === 'function');
    console.log('- dataLayer exists:', Array.isArray(window.dataLayer));
    console.log('- dataLayer length:', window.dataLayer?.length || 0);
    console.log('- dataLayer contents:', window.dataLayer);
    console.log('- Tracking ID:', GA_TRACKING_ID);
    console.log('- Current URL:', window.location.href);
    console.log('- Domain:', window.location.hostname);
    
    // Check if GA script is loaded
    const gaScript = document.querySelector(`script[src*="${GA_TRACKING_ID}"]`);
    console.log('- GA script loaded:', !!gaScript);
    
    // Send a test event
    if (window.gtag && typeof window.gtag === 'function') {
      window.gtag('event', 'debug_test', {
        event_category: 'Debug',
        event_label: 'Manual Test',
        debug_mode: true,
      });
      console.log('✅ Test event sent');
    } else {
      console.error('❌ gtag function not available');
    }
  }
};

// Engagement tracking helper
const trackEngagement = (action: string, timeValue?: number) => {
  trackEvent(action, 'Engagement', undefined, timeValue);
};

// Modern engagement tracking setup
const setupEngagementTracking = () => {
  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
      trackEngagement('page_hidden', timeOnPage);
    } else {
      pageStartTime = Date.now();
      trackEngagement('page_visible');
    }
  });

  // Track when user is about to leave
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
    trackEngagement('page_exit', timeOnPage);
  });

  // Debounced scroll depth tracking
  const trackScrollDepth = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollDepth > maxScrollDepth && scrollDepth % 25 === 0) {
        maxScrollDepth = scrollDepth;
        trackEvent('scroll_depth', 'Engagement', `${scrollDepth}%`, scrollDepth);
      }
    }, 300); // Debounce by 300ms
  };

  window.addEventListener('scroll', trackScrollDepth, { passive: true });
};

// Specific tracking functions
export const trackSectionView = (sectionName: string) => {
  trackEvent('view_section', 'Navigation', sectionName);
};

export const trackSocialClick = (platform: string, action: string) => {
  trackEvent('social_click', 'Social Media', `${platform}_${action}`);
};

export const trackContactAction = (action: string) => {
  trackEvent('contact_action', 'Contact', action);
};

export const trackThemeToggle = (theme: string) => {
  trackEvent('theme_toggle', 'UI', theme);
};

export const trackResumeAction = (action: string, section?: string) => {
  trackEvent('resume_action', 'Resume', section ? `${action}_${section}` : action);
};

export const trackFormSubmission = (formType: string, success: boolean = true) => {
  trackEvent('form_submission', 'Contact', `${formType}_${success ? 'success' : 'error'}`);
};

// Blog-specific tracking functions
export const trackBlogView = (slug: string, title: string) => {
  trackPageView(window.location.href, title);
  trackEvent('view_blog_post', 'Blog', slug);
};

export const trackBlogInteraction = (action: string, slug: string, title: string) => {
  trackEvent('blog_interaction', action, slug, 1);
  
  // Also track with more context
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'blog',
      event_label: title,
      custom_parameter_1: slug,
    });
  }
};

export const trackBlogSearch = (query: string, resultsCount: number) => {
  trackEvent('blog_search', 'search', query, resultsCount);
};

export const trackBlogCategory = (category: string) => {
  trackEvent('blog_category', 'filter', category, 1);
};

// Performance tracking
export const trackPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        trackEvent('page_load_time', 'Performance', 'load_complete', Math.round(loadTime));
      }, 100);
    });
  }
};

// Enhanced user engagement tracking
export const trackUserEngagement = () => {
  let engagementTime = 0;
  let isEngaged = true;
  
  const startTime = Date.now();
  
  // Track engagement every 15 seconds
  const engagementInterval = setInterval(() => {
    if (isEngaged && !document.hidden) {
      engagementTime += 15;
      trackEvent('engagement_time', 'Engagement', '15_second_intervals', engagementTime);
    }
  }, 15000);
  
  // Stop engagement tracking on page unload
  const cleanup = () => {
    clearInterval(engagementInterval);
    const totalTime = Math.round((Date.now() - startTime) / 1000);
    trackEvent('session_duration', 'Engagement', 'total_time', totalTime);
  };
  
  window.addEventListener('beforeunload', cleanup);
  document.addEventListener('visibilitychange', () => {
    isEngaged = !document.hidden;
  });
  
  return cleanup;
};

// Debug function for testing
export const testTracking = () => {
  console.log('🧪 Testing Google Analytics tracking...');
  console.log('🔗 GA Property ID:', GA_TRACKING_ID);
  
  // First run debug to check setup
  debugGA();
  
  // Wait a moment then test events
  setTimeout(() => {
    console.log('🧪 Sending test events...');
    
    // Test basic events
    trackEvent('test_event', 'Testing', 'manual_test', 1);
    trackSectionView('test_section');
    trackContactAction('test_contact');
    trackThemeToggle('test_theme');
    trackSocialClick('test_platform', 'test_action');
    
    console.log('🧪 Test events sent! Check GA Real-time in 1-2 minutes');
    console.log('📊 Check console for tracking confirmations');
  }, 1000);
};

// Initialize everything when window is available
if (typeof window !== 'undefined') {
  // Initialize performance tracking
  trackPerformance();
  
  // Setup engagement tracking
  setupEngagementTracking();
  
  // Initialize user engagement tracking
  trackUserEngagement();
  
  // Expose debug functions for browser console testing
  (window as unknown as Record<string, unknown>).debugGA = debugGA;
  (window as unknown as Record<string, unknown>).testTracking = testTracking;
  console.log('🔍 Analytics debug tools available: window.debugGA() and window.testTracking()');
}

// Production-only optimizations
if (import.meta.env.PROD && typeof window !== 'undefined') {
  // Track unhandled errors in production
  window.addEventListener('error', (event) => {
    trackEvent('javascript_error', 'Error', event.error?.name || 'Unknown', 1);
  });

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', () => {
    trackEvent('promise_rejection', 'Error', 'Unhandled Promise', 1);
  });

  // Track resource loading errors
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      const target = event.target as HTMLElement;
      trackEvent('resource_error', 'Error', target.tagName?.toLowerCase() || 'unknown', 1);
    }
  }, true);
}
