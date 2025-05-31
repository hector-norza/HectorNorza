import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cog6ToothIcon, 
  EyeIcon, 
  SpeakerWaveIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { useHighContrast } from '../utils/accessibility';

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { highContrast, toggleHighContrast } = useHighContrast();
  const [fontSize, setFontSize] = useState(100);

  const adjustFontSize = (increment: number) => {
    const newSize = Math.max(75, Math.min(150, fontSize + increment));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem('font-size', newSize.toString());
  };

  const resetAccessibility = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
    document.documentElement.classList.remove('high-contrast');
    localStorage.removeItem('font-size');
    localStorage.removeItem('high-contrast');
  };

  // Load saved font size on mount
  useState(() => {
    const saved = localStorage.getItem('font-size');
    if (saved) {
      const size = parseInt(saved, 10);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}%`;
    }
  });

  return (
    <>
      {/* Accessibility toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-1/2 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
        style={{ transform: 'translateY(-50%)' }}
        aria-label={isOpen ? 'Close accessibility toolbar' : 'Open accessibility toolbar'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" aria-hidden="true" />
        ) : (
          <Cog6ToothIcon className="w-6 h-6" aria-hidden="true" />
        )}
      </motion.button>

      {/* Accessibility toolbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-4 top-1/2 z-40 bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-80"
            style={{ transform: 'translateY(-50%)' }}
            role="dialog"
            aria-labelledby="accessibility-toolbar-title"
          >
            <h2 id="accessibility-toolbar-title" className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5" aria-hidden="true" />
              Accessibility Options
            </h2>

            <div className="space-y-6">
              {/* Font Size Control */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Text Size: {fontSize}%
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adjustFontSize(-25)}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    aria-label="Decrease font size"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => adjustFontSize(25)}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    aria-label="Increase font size"
                  >
                    A+
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    (75% - 150%)
                  </span>
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={toggleHighContrast}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <EyeIcon className="w-4 h-4" aria-hidden="true" />
                    High Contrast Mode
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-7">
                  Increases contrast for better visibility
                </p>
              </div>

              {/* Screen Reader Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-start gap-2">
                  <SpeakerWaveIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-gray-700 font-medium">Screen Reader Ready</p>
                    <p className="text-xs text-gray-500">
                      This site supports NVDA, JAWS, and VoiceOver
                    </p>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={resetAccessibility}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
