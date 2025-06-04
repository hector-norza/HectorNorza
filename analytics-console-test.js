// Quick Analytics Verification Script
// Run this in your browser's console on hectornorza.com

console.log('🔍 Starting Analytics Verification...');
console.log('='.repeat(50));

// 1. Check if analytics is loaded
console.log('1. Checking if Google Analytics is loaded...');
if (typeof gtag === 'function') {
    console.log('✅ gtag function is available');
} else {
    console.log('❌ gtag function is NOT available');
    console.log('Try: window.gtag or check if the script loaded');
}

if (window.dataLayer && Array.isArray(window.dataLayer)) {
    console.log(`✅ dataLayer exists with ${window.dataLayer.length} items`);
} else {
    console.log('❌ dataLayer is not properly initialized');
}

// 2. Check debug functions from your analytics.ts
console.log('\n2. Checking custom debug functions...');
if (typeof window.debugGA === 'function') {
    console.log('✅ window.debugGA() is available');
    console.log('Running debug function...');
    window.debugGA();
} else {
    console.log('❌ window.debugGA() is not available');
}

if (typeof window.analytics === 'object' && window.analytics) {
    console.log('✅ window.analytics object is available');
    console.log('Available methods:', Object.keys(window.analytics));
    
    if (typeof window.analytics.test === 'function') {
        console.log('Running analytics test...');
        window.analytics.test();
    }
} else {
    console.log('❌ window.analytics object is not available');
}

// 3. Send immediate test events
console.log('\n3. Sending test events...');
if (typeof gtag === 'function') {
    // Send test events
    gtag('event', 'console_test', {
        event_category: 'testing',
        event_label: 'manual_console_test',
        value: 1
    });
    console.log('✅ Test event sent: console_test');
    
    gtag('event', 'page_view', {
        page_title: 'Manual Console Test',
        page_location: window.location.href
    });
    console.log('✅ Test page view sent');
    
    // Send a standard GA4 event
    gtag('event', 'login', {
        method: 'console_test'
    });
    console.log('✅ Standard login event sent');
    
    console.log('\n🎯 Test events sent! Check Google Analytics Real-time reports');
    console.log('📊 Go to: Google Analytics → Reports → Real-time');
    console.log('⏱️  Events should appear within 1-2 minutes');
}

// 4. Network connectivity test
console.log('\n4. Testing network connectivity...');
fetch('https://www.googletagmanager.com/gtag/js?id=G-VPC78XB0H1', { method: 'HEAD' })
    .then(response => {
        if (response.ok) {
            console.log('✅ Network connection to Google Analytics: OK');
        } else {
            console.log('⚠️  Network response not OK:', response.status);
        }
    })
    .catch(error => {
        console.log('❌ Network connectivity issue:', error.message);
        console.log('This might indicate an ad blocker or network restriction');
    });

// 5. Check for ad blockers
console.log('\n5. Checking for ad blockers...');
const testImg = new Image();
testImg.onload = () => console.log('✅ No ad blocker detected');
testImg.onerror = () => console.log('⚠️  Possible ad blocker detected');
testImg.src = 'https://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-XXXXX-X&cid=test&dp=%2Ftest';

console.log('\n='.repeat(50));
console.log('🏁 Verification complete!');
console.log('💡 Next steps:');
console.log('   1. Check Google Analytics Real-time reports');
console.log('   2. Wait 1-2 minutes for events to appear');
console.log('   3. Look for events: console_test, login, page_view');
console.log('   4. If no events appear, check for ad blockers');
