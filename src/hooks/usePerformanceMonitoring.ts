import { useEffect, useRef } from 'react';
import { trackEvent } from '../utils/analytics';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

export const usePerformanceMonitoring = () => {
  const metricsRef = useRef<PerformanceMetrics>({
    loadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
  });

  useEffect(() => {
    const trackWebVitals = () => {
      // Track page load time
      window.addEventListener('load', () => {
        setTimeout(() => {
          if ('performance' in window && performance.timing) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            metricsRef.current.loadTime = loadTime;
            trackEvent('performance_load', 'Performance', 'page_load_time', Math.round(loadTime));
          }
        }, 0);
      });

      // Track First Contentful Paint
      if ('performance' in window && 'getEntriesByType' in performance) {
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        
        if (fcpEntry) {
          metricsRef.current.firstContentfulPaint = fcpEntry.startTime;
          trackEvent('performance_fcp', 'Performance', 'first_contentful_paint', Math.round(fcpEntry.startTime));
        }
      }

      // Track Core Web Vitals with PerformanceObserver (if supported)
      if ('PerformanceObserver' in window) {
        try {
          // Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
            if (lastEntry) {
              metricsRef.current.largestContentfulPaint = lastEntry.startTime;
              trackEvent('performance_lcp', 'Performance', 'largest_contentful_paint', Math.round(lastEntry.startTime));
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((entryList) => {
            let clsValue = 0;
            for (const entry of entryList.getEntries()) {
              const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
              if (!layoutShiftEntry.hadRecentInput) {
                clsValue += layoutShiftEntry.value || 0;
              }
            }
            metricsRef.current.cumulativeLayoutShift = clsValue;
            trackEvent('performance_cls', 'Performance', 'cumulative_layout_shift', Math.round(clsValue * 1000));
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // Cleanup observers after 30 seconds
          setTimeout(() => {
            lcpObserver.disconnect();
            clsObserver.disconnect();
          }, 30000);

        } catch (error) {
          if (import.meta.env.DEV) {
            console.warn('Performance monitoring not fully supported:', error);
          }
        }
      }
    };

    trackWebVitals();
  }, []);

  return metricsRef.current;
};