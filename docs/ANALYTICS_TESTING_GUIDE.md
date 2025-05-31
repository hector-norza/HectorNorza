# Google Analytics Testing Guide

## 🧪 Testing Methods

### 1. Real-Time Reports (Recommended)
1. Go to [Google Analytics](https://analytics.google.com)
2. Select your property: "Hector Norzagaray Portfolio"
3. Navigate to **Reports** → **Realtime** → **Overview**
4. Visit your website in a new tab: https://www.hectornorza.com
5. ✅ You should see your visit appear within 30 seconds

### 2. Browser Developer Tools
1. Visit your website: https://www.hectornorza.com
2. Open Developer Tools (F12 or Cmd+Option+I on Mac)
3. Go to **Network** tab
4. Filter by "gtag" or "google"
5. Refresh the page
6. ✅ Look for requests to:
   - `www.googletagmanager.com/gtag/js`
   - `www.google-analytics.com/g/collect`

### 3. Console Testing
1. Visit your website
2. Open Developer Tools → **Console** tab
3. Type these commands to test:

```javascript
// Check if gtag is loaded
console.log(typeof gtag);
// Should return "function"

// Check dataLayer
console.log(window.dataLayer);
// Should show array with GA data

// Test manual event tracking
gtag('event', 'test_event', {
  event_category: 'testing',
  event_label: 'manual_test'
});
```

### 4. Test Event Tracking
Test the events implemented in your Contact component:

#### Form Submission Test:
1. Go to your website's contact section
2. Fill out and submit the contact form
3. Check Google Analytics → **Reports** → **Realtime** → **Events**
4. ✅ Look for "form_submit" event

#### External Link Test:
1. Click on GitHub or LinkedIn links in your portfolio
2. Check realtime events in GA
3. ✅ Look for "click" events with "external_link" category

### 5. Google Analytics Debugger Extension
1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) for Chrome
2. Enable the extension
3. Visit your website
4. Open Developer Tools → **Console**
5. ✅ You'll see detailed GA debug information

### 6. GA4 Debug View
1. In Google Analytics, go to **Configure** → **DebugView**
2. Visit your website with debug parameters:
   ```
   https://www.hectornorza.com?debug_mode=true
   ```
3. ✅ See real-time detailed event data

## 🎯 What to Look For

### ✅ Successful Tracking Indicators:
- **Real-time users**: Count increases when you visit
- **Page views**: Appear in realtime reports
- **Events**: Form submissions and link clicks tracked
- **Network requests**: GA scripts loading successfully
- **Console**: No GA-related errors

### ❌ Issues to Watch For:
- **No real-time data**: Check measurement ID
- **Console errors**: JavaScript issues blocking GA
- **Missing events**: Event tracking code problems
- **404 errors**: GA script loading failures

## 🔧 Troubleshooting

### If Analytics Isn't Working:
1. **Check measurement ID**: Verify `G-VPC78XB0H1` is correct
2. **Clear browser cache**: Hard refresh (Cmd+Shift+R)
3. **Check ad blockers**: Disable temporarily for testing
4. **Incognito mode**: Test in private browsing
5. **Wait 24-48 hours**: Some reports have delays

### Test Commands for Your Site:
```bash
# Test if your site loads properly
curl -I https://www.hectornorza.com

# Check if GA script is present in HTML
curl https://www.hectornorza.com | grep -i "gtag\|analytics"
```

## 📊 Expected Results

When working correctly, you should see:
- ✅ Real-time visitor count increases
- ✅ Page views logged immediately  
- ✅ Events tracked (form submissions, link clicks)
- ✅ Geographic and device data
- ✅ No JavaScript errors in console

## 🎉 Your Current Setup

Your Google Analytics is configured with:
- **Measurement ID**: `G-VPC78XB0H1`
- **Implementation**: HTML script tags (optimal)
- **Event Tracking**: Contact forms and external links
- **Privacy**: No PII collection, GDPR-friendly

Test now by visiting your site and checking the real-time reports!
