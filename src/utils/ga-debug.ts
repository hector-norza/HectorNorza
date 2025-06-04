/**
 * Google Analytics Debug Helper
 * 
 * Use by adding ?gadebug=true to any URL on your site
 */

export const enableGADebugMode = () => {
  // Check if we should enable debug mode
  const urlParams = new URLSearchParams(window.location.search);
  const debugRequested = urlParams.get('gadebug') === 'true';
  
  if (debugRequested) {
    console.log('🔍 Google Analytics Debug Mode Enabled');
    
    // Check if GA exists
    if (typeof window.gtag === 'function') {
      console.log('✅ Google Analytics detected');
      
      // Set to debug mode
      window.gtag('config', 'G-VPC78XB0H1', {
        debug_mode: true
      });
      
      // Test a pageview
      window.gtag('event', 'page_view', {
        page_title: 'Debug Test',
        page_path: window.location.pathname + window.location.hash,
        debug_mode: true
      });
      
      console.log('📊 Test pageview sent. Check GA DebugView!');
      console.log('🔗 Open GA DebugView: https://analytics.google.com/analytics/web/#/debugview');
    } else {
      console.error('❌ Google Analytics not detected. Check your implementation!');
    }
  }
};