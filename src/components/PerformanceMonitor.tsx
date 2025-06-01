import { useEffect } from 'react';

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

interface PerformanceMonitorProps {
  onMetricsCollected?: (metrics: PerformanceMetrics) => void;
  enabled?: boolean;
}

export default function PerformanceMonitor({
  onMetricsCollected,
  enabled = import.meta.env.PROD,
}: PerformanceMonitorProps) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const metrics: PerformanceMetrics = {};

    // Collect Core Web Vitals
    const collectMetrics = () => {
      // First Contentful Paint
      const fcpEntry = performance.getEntriesByName(
        'first-contentful-paint'
      )[0] as PerformanceEntry;
      if (fcpEntry) {
        metrics.fcp = fcpEntry.startTime;
      }

      // Navigation timing for TTFB
      const navigationEntry = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        metrics.ttfb =
          navigationEntry.responseStart - navigationEntry.requestStart;
      }

      // Use PerformanceObserver for other metrics if available
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
            startTime: number;
          };
          metrics.lcp = lastEntry.startTime;
        });

        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch {
          // LCP not supported
        }

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(
            (entry: PerformanceEntry & { processingStart?: number }) => {
              if (entry.processingStart) {
                metrics.fid = entry.processingStart - entry.startTime;
              }
            }
          );
        });

        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch {
          // FID not supported
        }

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach(
            (
              entry: PerformanceEntry & {
                hadRecentInput?: boolean;
                value?: number;
              }
            ) => {
              if (!entry.hadRecentInput && entry.value) {
                clsValue += entry.value;
              }
            }
          );
          metrics.cls = clsValue;
        });

        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch {
          // CLS not supported
        }

        // Collect metrics after page load
        setTimeout(() => {
          onMetricsCollected?.(metrics);

          // Log to console in development
          if (import.meta.env.DEV) {
            console.group('🚀 Performance Metrics');
            console.log(
              'First Contentful Paint:',
              metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A'
            );
            console.log(
              'Largest Contentful Paint:',
              metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A'
            );
            console.log(
              'First Input Delay:',
              metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A'
            );
            console.log(
              'Cumulative Layout Shift:',
              metrics.cls ? metrics.cls.toFixed(4) : 'N/A'
            );
            console.log(
              'Time to First Byte:',
              metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'N/A'
            );
            console.groupEnd();
          }
        }, 3000); // Wait 3 seconds for metrics to stabilize
      }
    };

    // Wait for page load
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    return () => {
      window.removeEventListener('load', collectMetrics);
    };
  }, [enabled, onMetricsCollected]);

  return null; // This component doesn't render anything
}

// Utility function to evaluate metrics
export const evaluateMetrics = (metrics: PerformanceMetrics) => {
  const evaluation = {
    fcp: metrics.fcp
      ? metrics.fcp <= 1800
        ? 'good'
        : metrics.fcp <= 3000
          ? 'needs-improvement'
          : 'poor'
      : 'unknown',
    lcp: metrics.lcp
      ? metrics.lcp <= 2500
        ? 'good'
        : metrics.lcp <= 4000
          ? 'needs-improvement'
          : 'poor'
      : 'unknown',
    fid: metrics.fid
      ? metrics.fid <= 100
        ? 'good'
        : metrics.fid <= 300
          ? 'needs-improvement'
          : 'poor'
      : 'unknown',
    cls: metrics.cls
      ? metrics.cls <= 0.1
        ? 'good'
        : metrics.cls <= 0.25
          ? 'needs-improvement'
          : 'poor'
      : 'unknown',
  };

  return evaluation;
};
