// Google Analytics 4 event tracking utilities with privacy consent
// GA is initialized directly in index.html for better performance and reliability

import { getAnalyticsConsent } from './privacy';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: Record<string, unknown>[];
  }
}

export const GA_MEASUREMENT_ID = 'G-VPC78XB0H1';

// Check if analytics is allowed
const isAnalyticsAllowed = (): boolean => {
  const consent = getAnalyticsConsent();
  return consent?.granted === true;
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (!isAnalyticsAllowed()) return;
  
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
  }
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!isAnalyticsAllowed()) return;
  
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
