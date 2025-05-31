// Google Analytics 4 configuration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: Record<string, any>[];
  }
}

export const GA_MEASUREMENT_ID = 'G-VPC78XB0H1'; // Replace with your actual GA4 Measurement ID

// Initialize Google Analytics
export const initGA = () => {
  // Only initialize if we have a valid measurement ID and we're in the browser
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'GA_MEASUREMENT_ID') {
    console.log('Google Analytics not initialized: Invalid or placeholder measurement ID');
    return;
  }

  try {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Create gtag function
    window.gtag = function(...args: any[]) {
      window.dataLayer.push(args);
    };
    
    // Set initial timestamp
    window.gtag('js', new Date().toISOString());
    
    // Create and load the GA script asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = () => {
      // Configure GA after script loads
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
      });
      console.log('Google Analytics initialized successfully');
    };
    script.onerror = () => {
      console.warn('Failed to load Google Analytics');
    };
    
    document.head.appendChild(script);
  } catch (error) {
    console.error('Error initializing Google Analytics:', error);
  }
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
  }
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', 'engagement', formName);
};

// Track external link clicks
export const trackExternalLinkClick = (url: string) => {
  trackEvent('click', 'external_link', url);
};
