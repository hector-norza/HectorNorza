/**
 * Enhanced Google Analytics implementation for hash-based SPA
 */

const GA_TRACKING_ID = 'G-VPC78XB0H1';

// Initialize Google Analytics
export const initGA = () => {
  // Check if GA is already initialized
  if (typeof window.gtag === 'function') {
    return;
  }
  
  if (!GA_TRACKING_ID) {
    console.warn('Google Analytics ID is not set.');
    return;
  }

  // Validate tracking ID format
  const ga4Pattern = /^G-[A-Z0-9]{10}$/;
  if (!ga4Pattern.test(GA_TRACKING_ID)) {
    console.error('❌ Invalid GA4 Measurement ID format! Should be G-XXXXXXXXXX');
    return;
  }

  // Assume gtag is already available from the script in index.html
  // If for some reason it's not, this is a fallback
  if (typeof window.gtag !== 'function') {
    console.log('Initializing GA via JS API');
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    // Fix TS error by converting Date to string
    window.gtag('js', new Date().toString());
    window.gtag('config', GA_TRACKING_ID, {
      send_page_view: false
    });
  }
};

// Track page views (works with hash navigation)
export const trackPageView = (url?: string, title?: string) => {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics not initialized. Cannot track page view.');
    return;
  }
  
  const pageUrl = url || window.location.href;
  const pageTitle = title || getPageTitle();
  
  window.gtag('event', 'page_view', {
    page_title: pageTitle,
    page_path: window.location.pathname + window.location.hash,
    page_location: pageUrl,
    send_to: GA_TRACKING_ID
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 [GA] Tracked page view: ${pageTitle} (${pageUrl})`);
  }
};

// Get the page title based on the current hash
function getPageTitle() {
  const hash = window.location.hash.replace('#', '');
  
  if (!hash) return 'Home';
  
  const sectionMapping: Record<string, string> = {
    'about': 'About Me',
    'resume': 'Resume',
    'contact': 'Contact',
    'blog': 'Blog'
  };
  
  // Fix TS error by using type guard
  return hash in sectionMapping ? sectionMapping[hash] : 'Hector Norza | Portfolio';
}

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics not initialized. Cannot track event.');
    return;
  }
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    send_to: GA_TRACKING_ID
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 [GA] Tracked event: ${action} (${category}${label ? ` - ${label}` : ''})`);
  }
};

// Track section views for specific sections
export const trackSectionView = (sectionId: string) => {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics not initialized. Cannot track section view.');
    return;
  }
  
  window.gtag('event', 'section_view', {
    event_category: 'engagement',
    event_label: sectionId,
    send_to: GA_TRACKING_ID
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 [GA] Tracked section view: ${sectionId}`);
  }
};

// Add missing function: trackBlogInteraction
export const trackBlogInteraction = (action: string, postSlug?: string, postTitle?: string) => {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics not initialized. Cannot track blog interaction.');
    return;
  }
  
  window.gtag('event', action, {
    event_category: 'blog',
    event_label: postTitle || 'Blog Post',
    post_slug: postSlug,
    send_to: GA_TRACKING_ID
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 [GA] Tracked blog interaction: ${action}${postSlug ? ` - ${postSlug}` : ''}`);
  }
};

// Add missing function: trackBlogView - for backward compatibility
export const trackBlogView = (postSlug: string, postTitle: string) => {
  trackBlogInteraction('blog_view', postSlug, postTitle);
};

// Add missing function: trackFormSubmission
export const trackFormSubmission = (formName: string) => {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics not initialized. Cannot track form submission.');
    return;
  }
  
  window.gtag('event', 'form_submit', {
    event_category: 'conversion',
    event_label: formName,
    send_to: GA_TRACKING_ID
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 [GA] Tracked form submission: ${formName}`);
  }
};

// Add missing function: trackContactAction
export const trackContactAction = (action: string, label?: string) => {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics not initialized. Cannot track contact action.');
    return;
  }
  
  window.gtag('event', action, {
    event_category: 'contact',
    event_label: label,
    send_to: GA_TRACKING_ID
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 [GA] Tracked contact action: ${action}${label ? ` - ${label}` : ''}`);
  }
};

// Update the trackSocialClick function to accept an optional source parameter
export const trackSocialClick = (platform: string, source?: string) => {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics not initialized. Cannot track social click.');
    return;
  }
  
  window.gtag('event', 'social_click', {
    event_category: 'engagement',
    event_label: platform,
    source: source, // Add the source parameter
    send_to: GA_TRACKING_ID
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 [GA] Tracked social click: ${platform}${source ? ` from ${source}` : ''}`);
  }
};

// Add missing function: trackThemeToggle
export const trackThemeToggle = (theme: string) => {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics not initialized. Cannot track theme toggle.');
    return;
  }
  
  window.gtag('event', 'theme_toggle', {
    event_category: 'ui_interaction',
    event_label: theme,
    send_to: GA_TRACKING_ID
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 [GA] Tracked theme toggle: ${theme}`);
  }
};

// Add missing function: trackResumeAction
export const trackResumeAction = (action: string, label?: string) => {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics not initialized. Cannot track resume action.');
    return;
  }
  
  window.gtag('event', action, {
    event_category: 'resume',
    event_label: label,
    send_to: GA_TRACKING_ID
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 [GA] Tracked resume action: ${action}${label ? ` - ${label}` : ''}`);
  }
};

// Type declaration for global gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}
