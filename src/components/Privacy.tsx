import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useAnalyticsConsent } from '../utils/privacy';

export default function Privacy() {
  const { consent, revokeConsent } = useAnalyticsConsent();

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back to Home Navigation */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Portfolio
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          {/* Privacy Control Panel */}
          <motion.div 
            className="bg-white rounded-lg border border-gray-200 p-6 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start gap-4">
              <ShieldCheckIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Privacy Preferences</h2>
                <p className="text-gray-600 mb-4">
                  Analytics Status: {' '}
                  <span className={`font-medium ${consent?.granted ? 'text-green-600' : 'text-red-600'}`}>
                    {consent?.granted ? 'Enabled' : 'Disabled'}
                  </span>
                </p>
                {consent?.granted && (
                  <button
                    onClick={revokeConsent}
                    className="bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Disable Analytics
                  </button>
                )}
                {!consent?.granted && (
                  <p className="text-sm text-gray-500">
                    Refresh the page to see the consent banner if you want to re-enable analytics.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p className="text-sm text-gray-500 mb-8">
              <strong>Last Updated:</strong> January 2025
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                <p>
                  This privacy policy describes how I, Hector Norzagaray, collect, use, and protect 
                  information when you visit my personal portfolio website at www.hectornorza.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Collection</h2>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Analytics Data</h3>
                <p className="mb-4">
                  I use Google Analytics 4 to understand how visitors interact with my website. 
                  This service automatically collects:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Page views and session duration</li>
                  <li>General geographic location (country/region level)</li>
                  <li>Device and browser information</li>
                  <li>Referral sources</li>
                </ul>
                
                <h3 className="text-lg font-medium text-gray-800 mb-2 mt-6">Contact Information</h3>
                <p>
                  When you use the contact form, the information you provide (name, email, message) 
                  is sent directly to my email address. No data is stored on this website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How I Use Information</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>To understand website performance and improve user experience</li>
                  <li>To respond to contact form submissions and professional inquiries</li>
                  <li>To analyze general usage patterns for website optimization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sharing</h2>
                <p>
                  I do not sell, trade, or share your personal information with third parties, 
                  except as required by law. Analytics data is processed by Google Analytics 
                  according to their privacy policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Opt out of analytics tracking by using browser privacy settings</li>
                  <li>Request information about any data I may have about you</li>
                  <li>Request deletion of any personal information</li>
                  <li>Update or correct any information you've provided</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
                <p>
                  This website uses Google Analytics 4, which may use cookies and similar 
                  technologies. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
                <p>
                  If you have questions about this privacy policy or your data, 
                  please contact me at{' '}
                  <a 
                    href="mailto:hnorza@proton.me" 
                    className="text-primary hover:underline"
                  >
                    hnorza@proton.me
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates</h2>
                <p>
                  This privacy policy may be updated occasionally. Any changes will be 
                  posted on this page with an updated "Last Updated" date.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
