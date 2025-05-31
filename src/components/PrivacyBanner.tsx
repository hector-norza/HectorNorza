import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface PrivacyBannerProps {
  show: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function PrivacyBanner({ show, onAccept, onDecline }: PrivacyBannerProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
          role="dialog"
          aria-labelledby="privacy-banner-title"
          aria-describedby="privacy-banner-description"
        >
          <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <ShieldCheckIcon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 id="privacy-banner-title" className="text-sm font-semibold text-gray-900 mb-2">
                  Privacy & Analytics
                </h3>
                <p id="privacy-banner-description" className="text-sm text-gray-600 mb-4">
                  I use Google Analytics to understand how visitors interact with my portfolio. 
                  This helps me improve the website experience. No personal data is collected or sold.{' '}
                  <Link 
                    to="/privacy" 
                    className="text-primary hover:text-secondary underline"
                    aria-label="Read our full privacy policy"
                  >
                    Learn more
                  </Link>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={onAccept}
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                    aria-describedby="privacy-banner-description"
                  >
                    Accept Analytics
                  </button>
                  <button
                    onClick={onDecline}
                    className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    aria-describedby="privacy-banner-description"
                  >
                    Decline
                  </button>
                </div>
              </div>
              
              <button
                onClick={onDecline}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                aria-label="Close privacy banner"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
