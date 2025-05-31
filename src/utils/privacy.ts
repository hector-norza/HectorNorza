import { useState, useEffect } from 'react';

// Analytics consent management
export interface AnalyticsConsent {
  granted: boolean;
  timestamp: number;
}

const CONSENT_KEY = 'analytics-consent';
const CONSENT_EXPIRY = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds

export function getAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    
    const consent: AnalyticsConsent = JSON.parse(stored);
    
    // Check if consent has expired
    if (Date.now() - consent.timestamp > CONSENT_EXPIRY) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    
    return consent;
  } catch {
    return null;
  }
}

export function setAnalyticsConsent(granted: boolean): void {
  const consent: AnalyticsConsent = {
    granted,
    timestamp: Date.now()
  };
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  
  // Disable Google Analytics if consent is revoked
  if (!granted && window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied'
    });
  }
}

export function useAnalyticsConsent() {
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const storedConsent = getAnalyticsConsent();
    setConsent(storedConsent);
    
    // Show banner only if no consent stored and user hasn't seen it this session
    if (!storedConsent && !sessionStorage.getItem('consent-banner-shown')) {
      setShowBanner(true);
      sessionStorage.setItem('consent-banner-shown', 'true');
    }
  }, []);

  const acceptAnalytics = () => {
    setAnalyticsConsent(true);
    setConsent({ granted: true, timestamp: Date.now() });
    setShowBanner(false);
    
    // Enable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const declineAnalytics = () => {
    setAnalyticsConsent(false);
    setConsent({ granted: false, timestamp: Date.now() });
    setShowBanner(false);
  };

  const revokeConsent = () => {
    setAnalyticsConsent(false);
    setConsent({ granted: false, timestamp: Date.now() });
  };

  return {
    consent,
    showBanner,
    acceptAnalytics,
    declineAnalytics,
    revokeConsent
  };
}
