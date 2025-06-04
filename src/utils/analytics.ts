// Google Analytics tracking utility with performance optimizations

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
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

  // Initialize dataLayer and gtag function exactly as Google specifies
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  // Load gtag script with proper loading handling
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  
  script.onload = () => {
    // Only log in development
    if (import.meta.env.DEV) {
      console.log('🚀 GA script loaded successfully');
    }
    
    // Initialize GA after script loads using window.gtag
    window.gtag('js', new Date());
    
    if (import.meta.env.DEV) {
      console.log('📊 Configuring GA with ID:', GA_TRACKING_ID);
    }
    
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true, // Let GA send automatic page views
      debug_mode: import.meta.env.DEV, // Enable debug mode only in development
      // Add domain configuration for proper tracking
      cookie_domain: 'hectornorza.com',
      cookie_flags: 'SameSite=None;Secure',
    });

    if (import.meta.env.DEV) {
      console.log('✅ Google Analytics configured with ID:', GA_TRACKING_ID);
      console.log('🌍 Domain:', window.location.hostname);
      console.log('📄 Page:', window.location.pathname);
    }
    
    // Send initial page view using proper GA4 format
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
    
    if (import.meta.env.DEV) {
      console.log('✅ Initial page view event sent');
    }
    
    // Send a simplified test event with minimal parameters (development only)
    if (import.meta.env.DEV) {
      window.gtag('event', 'analytics_test', {
        event_category: 'engagement',
        value: 1,
      });
      
      console.log('🧪 Simplified test event sent');
      
      // Also try sending a completely standard GA4 event
      window.gtag('event', 'login', {
        method: 'analytics_test'
      });
      
      console.log('🧪 Standard GA4 event sent');
    }
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
        
        if (import.meta.env.DEV) {
          console.log('✅ Page view tracked:', title || document.title, url);
        }
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
      // Use standard GA4 event parameters only
      const eventData: Record<string, unknown> = {};
      
      // Use GA4 standard parameters
      if (label) eventData.content_group1 = label;
      if (value !== undefined) eventData.value = value;
      if (category) eventData.content_group2 = category;
      
      window.gtag('event', action, eventData);
      if (import.meta.env.DEV) {
        console.log('✅ Event tracked:', action, 'category:', category, 'label:', label);
      }
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
    console.log('- Protocol:', window.location.protocol);
    console.log('- User Agent:', navigator.userAgent);
    
    // Check if GA script is loaded
    const gaScript = document.querySelector(`script[src*="${GA_TRACKING_ID}"]`);
    console.log('- GA script loaded:', !!gaScript);
    if (gaScript) {
      console.log('- GA script src:', (gaScript as HTMLScriptElement).src);
    }
    
    // Check for ad blockers or privacy settings
    const testPixel = document.createElement('img');
    testPixel.src = 'https://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-XXXXX-X&cid=test&dp=%2Ftest';
    testPixel.style.display = 'none';
    testPixel.onload = () => console.log('✅ No ad blocker detected');
    testPixel.onerror = () => console.warn('⚠️  Possible ad blocker or network issue');
    document.body.appendChild(testPixel);
    setTimeout(() => document.body.removeChild(testPixel), 1000);
    
    // Send a test event with minimal parameters
    if (window.gtag && typeof window.gtag === 'function') {
      window.gtag('event', 'debug_test', {
        debug_mode: true,
      });
      console.log('✅ Minimal test event sent');
      
      // Try a standard GA4 event
      window.gtag('event', 'page_view', {
        page_title: 'Debug Test',
        page_location: window.location.href,
      });
      console.log('✅ Standard page_view test sent');
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
  
  // First verify measurement ID
  if (!verifyMeasurementId()) {
    console.error('❌ Cannot test tracking - invalid measurement ID');
    return;
  }
  
  // Run debug to check setup
  debugGA();
  
  // Wait a moment then test events
  setTimeout(() => {
    console.log('🧪 Sending test events...');
    
    // Test standard GA4 events first
    if (window.gtag) {
      // Standard purchase event
      window.gtag('event', 'purchase', {
        transaction_id: 'test_' + Date.now(),
        value: 1.00,
        currency: 'USD'
      });
      console.log('✅ Standard purchase event sent');
      
      // Standard login event
      window.gtag('event', 'login', {
        method: 'test'
      });
      console.log('✅ Standard login event sent');
      
      // Custom events
      trackEvent('test_event', 'Testing', 'manual_test', 1);
      trackSectionView('test_section');
    }
    
    console.log('🧪 Test events sent! Check GA Real-time in 1-2 minutes');
    console.log('📊 Check console for tracking confirmations');
  }, 1000);
};

// Verify measurement ID is working
export const verifyMeasurementId = () => {
  console.log('🔍 Verifying Measurement ID:', GA_TRACKING_ID);
  
  // Check if it's a valid GA4 format
  const ga4Pattern = /^G-[A-Z0-9]{10}$/;
  const isValidFormat = ga4Pattern.test(GA_TRACKING_ID);
  console.log('- Valid GA4 format:', isValidFormat);
  
  if (!isValidFormat) {
    console.error('❌ Invalid GA4 Measurement ID format! Should be G-XXXXXXXXXX');
    return false;
  }
  
  // Try to ping Google Analytics to verify the ID exists
  fetch(`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        console.log('✅ Measurement ID exists and is accessible');
      } else {
        console.error('❌ Measurement ID not found or not accessible');
      }
    })
    .catch(error => {
      console.warn('⚠️  Could not verify measurement ID:', error.message);
    });
  
  return isValidFormat;
};

// Immediate debug function that works right away
export const runAnalyticsDebug = () => {
  console.log('🚀 Running immediate analytics debug...');
  
  setTimeout(() => {
    console.log('🔍 === ANALYTICS DEBUG REPORT ===');
    
    // Check if window and functions exist
    if (typeof window !== 'undefined') {
      console.log('✅ Window object available');
      console.log('- Location:', window.location.href);
      console.log('- Domain:', window.location.hostname);
      
      // Check GA script
      const gaScript = document.querySelector('script[src*="googletagmanager.com"]');
      console.log('- GA Script loaded:', !!gaScript);
      
      // Check gtag
      console.log('- gtag function:', typeof window.gtag);
      console.log('- dataLayer:', Array.isArray(window.dataLayer) ? `Array[${window.dataLayer.length}]` : 'Not found');
      
      // Check measurement ID
      console.log('- Tracking ID:', GA_TRACKING_ID);
      const ga4Pattern = /^G-[A-Z0-9]{10}$/;
      console.log('- Valid format:', ga4Pattern.test(GA_TRACKING_ID));
      
      // Try sending a test event
      if (window.gtag && typeof window.gtag === 'function') {
        console.log('✅ Sending test event...');
        window.gtag('event', 'debug_immediate', {
          debug_mode: true,
          value: 1
        });
        console.log('✅ Test event sent successfully');
      } else {
        console.error('❌ gtag function not available');
      }
      
      // Check for ad blockers using GA4 endpoint
      fetch(`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`, { method: 'HEAD', mode: 'no-cors' })
        .then(() => console.log('✅ No ad blocker detected'))
        .catch(() => console.warn('⚠️  Possible ad blocker or network issue'));
        
    } else {
      console.error('❌ Window object not available');
    }
    
    console.log('🔍 === END DEBUG REPORT ===');
  }, 2000); // Wait 2 seconds for everything to load
};

// Auto-run debug in development
if (typeof window !== 'undefined' && !import.meta.env.PROD) {
  setTimeout(runAnalyticsDebug, 3000);
}

// Initialize everything when window is available
if (typeof window !== 'undefined') {
  // Initialize performance tracking
  trackPerformance();
  
  // Setup engagement tracking
  setupEngagementTracking();
  
  // Initialize user engagement tracking
  trackUserEngagement();
  
  // Expose debug functions for browser console testing
  try {
    const globalWindow = window as unknown as Record<string, unknown>;
    globalWindow.debugGA = debugGA;
    globalWindow.testTracking = testTracking;
    globalWindow.verifyMeasurementId = verifyMeasurementId;
    
    // Also attach to a global analytics object for easier access
    globalWindow.analytics = {
      debug: debugGA,
      test: testTracking,
      verify: verifyMeasurementId,
      runDebug: runAnalyticsDebug,
      trackEvent,
      trackPageView
    };
    
    console.log('🔍 Analytics debug tools available:');
    console.log('  - window.debugGA() or window.analytics.debug() - Check GA setup');
    console.log('  - window.testTracking() or window.analytics.test() - Send test events');
    console.log('  - window.verifyMeasurementId() or window.analytics.verify() - Verify measurement ID');
    console.log('  - window.analytics.runDebug() - Run immediate comprehensive debug');
    
    // Test that the functions are actually attached
    console.log('✅ Functions attached to window:', {
      debugGA: typeof globalWindow.debugGA === 'function',
      testTracking: typeof globalWindow.testTracking === 'function',
      verifyMeasurementId: typeof globalWindow.verifyMeasurementId === 'function'
    });
  } catch (error) {
    console.error('❌ Failed to attach debug functions to window:', error);
  }
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
