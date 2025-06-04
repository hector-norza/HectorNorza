// Google Analytics tracking utility with performance optimizations

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: object) => void;
    dataLayer: any[];
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
  console.log('🚀 Analytics: Starting Google Analytics initialization...');
  
  if (typeof window === 'undefined') {
    console.log('❌ Analytics: Window is undefined, skipping initialization');
    return;
  }

  console.log('✅ Analytics: Window detected, proceeding with GA setup');

  // Initialize gtag function and dataLayer first
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  console.log('📊 Analytics: DataLayer and gtag function initialized');

  // Load gtag script with proper loading handling
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  
  script.onload = () => {
    console.log('📜 Analytics: Google Analytics script loaded successfully');
    
    // Initialize GA after script loads
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    console.log('🎯 Google Analytics initialized with ID:', GA_TRACKING_ID);
    console.log('📊 Analytics: Ready to track events and page views');
  };

  script.onerror = () => {
    console.error('❌ Analytics: Failed to load Google Analytics script');
  };

  document.head.appendChild(script);
};

// Utility function to wait for gtag to be available
const waitForGtag = (callback: () => void, maxAttempts = 50, attempt = 0) => {
  if (typeof window !== 'undefined' && window.gtag && typeof window.gtag === 'function') {
    callback();
  } else if (attempt < maxAttempts) {
    setTimeout(() => waitForGtag(callback, maxAttempts, attempt + 1), 100);
  } else {
    console.warn('⏰ Analytics: Timeout waiting for gtag to become available');
  }
};

// Debounced page view tracking
export const trackPageView = (url: string, title?: string) => {
  console.log('📄 Analytics: trackPageView called with:', { url, title });
  
  if (pageViewTimeout) clearTimeout(pageViewTimeout);
  
  pageViewTimeout = setTimeout(() => {
    waitForGtag(() => {
      if (typeof window !== 'undefined' && window.gtag && typeof window.gtag === 'function') {
        window.gtag('config', GA_TRACKING_ID, {
          page_title: title || document.title,
          page_location: url,
        });
        console.log('🎯 Page view tracked successfully:', {
          title: title || document.title,
          url: url,
          timestamp: new Date().toISOString()
        });
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
  console.log('🎯 Analytics: trackEvent called with:', { action, category, label, value });
  
  // Validate inputs
  if (!action || !category) {
    console.warn('❌ Analytics: Invalid event tracking - action and category are required');
    return;
  }

  waitForGtag(() => {
    if (typeof window !== 'undefined' && window.gtag && typeof window.gtag === 'function') {
      const eventData = {
        event_category: category,
        event_label: label,
        value: value,
      };
      
      window.gtag('event', action, eventData);
      
      console.log('🚀 Event tracked successfully:', {
        action,
        category,
        label,
        value,
        timestamp: new Date().toISOString(),
        ga_id: GA_TRACKING_ID
      });
    } else {
      console.log('⚠️ Analytics: gtag still not available for event tracking');
    }
  });
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
  
  // Test basic events
  trackEvent('test_event', 'Testing', 'manual_test', 1);
  trackSectionView('test_section');
  trackContactAction('test_contact');
  trackThemeToggle('test_theme');
  trackSocialClick('test_platform', 'test_action');
  
  console.log('🧪 Test events sent! Check GA Real-time in 1-2 minutes');
  console.log('📊 Check console for tracking confirmations');
};

// Initialize everything when window is available
if (typeof window !== 'undefined') {
  // Initialize performance tracking
  trackPerformance();
  
  // Setup engagement tracking
  setupEngagementTracking();
  
  // Initialize user engagement tracking
  trackUserEngagement();
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
