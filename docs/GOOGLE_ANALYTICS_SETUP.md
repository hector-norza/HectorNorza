# Google Analytics Setup Guide

## How to Add Google Analytics 4 to Your Portfolio

### Step 1: Create a Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create an account name (e.g., "Hector Portfolio")
5. Choose your data sharing settings

### Step 2: Set up a GA4 Property
1. Enter property name: "Hector Norzagaray Portfolio"
2. Select your time zone and currency
3. Choose your business category: "Technology" or "Professional Services"
4. Select business size: "Small"

### Step 3: Set up Data Stream
1. Choose "Web" platform
2. Enter your website URL: `https://www.hectornorza.com`
3. Enter stream name: "Portfolio Website"
4. Copy your **Measurement ID** (starts with G-)

### Step 4: Update Your Code
1. Open `/src/utils/analytics.ts`
2. Replace `'GA_MEASUREMENT_ID'` with your actual Measurement ID
3. Open `/src/main.tsx`
4. Uncomment the line: `// initGA();`

### Step 5: Deploy and Verify
1. Commit and push your changes
2. Wait for GitHub Pages deployment (3-5 minutes)
3. Visit your website
4. Check Google Analytics Real-time reports to see if tracking is working

## Privacy Considerations
- The current setup is privacy-friendly and follows GDPR guidelines
- No personal data is collected without user interaction
- Analytics only track page views and form submissions
- Consider adding a privacy policy page if needed

## What Gets Tracked
- Page views and navigation
- Contact form submissions
- External link clicks (GitHub, LinkedIn)
- Basic user engagement metrics

## Testing Analytics
After setup, you can test by:
1. Visiting your website
2. Filling out the contact form
3. Clicking social media links
4. Checking Google Analytics Real-time dashboard
