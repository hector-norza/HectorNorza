import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useContrastColors } from '../hooks/useContrastColors';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '../hooks/useNavigation'; // ← ADD THIS
import { NAVIGATION } from '../utils/constants'; // ← ADD THIS
import { trackThemeToggle } from '../utils/analytics';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const colors = useContrastColors();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { scrollToSection } = useNavigation(); // ← ADD THIS

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeToggle = () => {
    toggleDarkMode();
    // Track theme toggle in analytics
    trackThemeToggle(isDarkMode ? 'light' : 'dark');
  };

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    closeMenu();
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 font-medium transition-all duration-200"
      >
        Skip to main content
      </a>
      
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${colors.background.navbar} backdrop-blur-md`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleNavClick('#hero')}
                className={`text-xl font-bold transition-colors duration-300 ${colors.heading} hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-md px-2 py-1`}
                aria-label="Go to homepage"
              >
                Hector Norzagaray
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {NAVIGATION.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                      activeSection === item.id
                        ? `${colors.accent} bg-primary-100 dark:bg-primary-900/50`
                        : `${colors.secondary} hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/25`
                    }`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className={`p-2 rounded-lg transition-all duration-300 ${colors.background.card} ${colors.border} border hover:bg-primary-50 dark:hover:bg-primary-900/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? (
                <SunIcon className="w-5 h-5 text-yellow-500" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-700" aria-hidden="true" />
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md transition-all duration-300 ${colors.secondary} hover:bg-primary-50 dark:hover:bg-primary-900/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? (
                  <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="mobile-menu-button"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {NAVIGATION.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                        activeSection === item.id
                          ? `${colors.accent} bg-primary-100 dark:bg-primary-900/50`
                          : `${colors.secondary} hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/25`
                      }`}
                      role="menuitem"
                      aria-current={activeSection === item.id ? 'page' : undefined}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
