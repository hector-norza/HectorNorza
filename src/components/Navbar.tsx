import { useState, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link as RouterLink } from 'react-router-dom';

const navigation = [
  { name: 'About', href: '/#about', isExternal: false },
  { name: 'Experience', href: '/#resume', isExternal: false },
  { name: 'Blog', href: '/blog', isExternal: true },
  { name: 'Contact', href: '/#contact', isExternal: false },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current language from Google Translate cookie
  const getCurrentLanguage = () => {
    const cookies = document.cookie.split(';');
    const googtransCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('googtrans=')
    );
    if (googtransCookie) {
      const value = googtransCookie.split('=')[1];
      const langCode = value.split('/')[2];
      return langCode || 'en';
    }
    return 'en';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLanguageDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper function to handle translation
  const handleTranslation = (langCode: string) => {
    if (langCode === 'en') {
      // Nuclear reset to English - this should work on deployed version

      // 1. Clear ALL possible Google Translate cookies
      const allCookieNames = [
        'googtrans',
        'googtrans-expire',
        'googtrans-session',
        'googlewiz',
        'goog-translate',
        '__Secure-googtrans',
        '__Host-googtrans',
      ];

      allCookieNames.forEach((cookieName) => {
        // Clear for current domain
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        // Clear for parent domain
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
        // Clear for root domain
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      });

      // 2. Clear localStorage and sessionStorage
      try {
        localStorage.removeItem('googtrans');
        sessionStorage.removeItem('googtrans');
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        console.warn('Could not clear storage:', e);
      }

      // 3. Remove ALL Google Translate elements and classes
      const gtSelectors = [
        '[id*="google_translate"]',
        '[class*="goog-te"]',
        '[class*="skiptranslate"]',
        '.VIpgJd-ZVi9od-l4eHX-hSRGPd',
        '.VIpgJd-ZVi9od-l4eHX',
        '[jsname]',
        '[data-gtm-form-interact-field-id]',
      ];

      gtSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => el.remove());
      });

      // 4. Reset body classes more aggressively
      document.body.className = document.body.className
        .replace(/\s*translated-\w+/g, '')
        .replace(/\s*goog-\w+/g, '')
        .replace(/\s*notranslate/g, '');

      // 5. Reset any translation-related attributes
      document.documentElement.removeAttribute('lang');
      document.documentElement.setAttribute('lang', 'en');

      // 6. Force complete page reload with cache bust
      const url = new URL(window.location.href);
      url.searchParams.set('_t', Date.now().toString());
      window.location.href = url.toString();
    } else {
      // Set the Google Translate cookie
      const setCookie = (name: string, value: string, days: number) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
      };

      // Clear any existing translation first
      document.cookie =
        'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Set new translation
      setCookie('googtrans', `/en/${langCode}`, 7);

      // Reload to apply translation
      window.location.reload();
    }

    setLanguageDropdownOpen(false);
  };

  const currentLang = getCurrentLanguage();
  const getLanguageDisplay = (langCode: string) => {
    const languages: Record<string, { flag: string; name: string }> = {
      en: { flag: '🇺🇸', name: 'English' },
      es: { flag: '🇪🇸', name: 'Español' },
      fr: { flag: '🇫🇷', name: 'Français' },
      pt: { flag: '🇵🇹', name: 'Português' },
      de: { flag: '🇩🇪', name: 'Deutsch' },
      it: { flag: '🇮🇹', name: 'Italiano' },
    };
    return languages[langCode] || languages['en'];
  };

  return (
    <header className="sticky top-0 z-[999] bg-white/95 backdrop-blur-sm border-b border-gray-200">
      {/* Google Translate styles */}
      <style>{`
        .goog-te-banner-frame,
        .goog-te-combo,
        .goog-te-gadget,
        .goog-te-gadget-simple {
          display: none !important;
        }
        
        .goog-te-gadget-icon {
          display: none !important;
        }
        
        body {
          top: 0px !important;
        }
        
        #google_translate_element,
        #google_translate_element_mobile {
          display: none !important;
        }
      `}</style>

      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-primary">
              Hector Norzagaray
            </span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) =>
            item.isExternal ? (
              <RouterLink
                key={item.name}
                to={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors"
              >
                {item.name}
              </RouterLink>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            )
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          {/* Clean Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary border border-gray-200 rounded-lg hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <span className="text-lg">
                {getLanguageDisplay(currentLang).flag}
              </span>
              <span>{getLanguageDisplay(currentLang).name}</span>
              <svg
                className={`h-3 w-3 ml-1 transition-transform duration-200 ${languageDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                languageDropdownOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              <div className="py-2">
                <button
                  onClick={() => handleTranslation('en')}
                  className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                    currentLang === 'en'
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <span className="text-lg">🇺🇸</span>
                  <span>English</span>
                  {currentLang === 'en' && (
                    <span className="ml-auto text-xs text-primary">✓</span>
                  )}
                </button>
                <button
                  onClick={() => handleTranslation('es')}
                  className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                    currentLang === 'es'
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <span className="text-lg">🇪🇸</span>
                  <span>Español</span>
                  {currentLang === 'es' && (
                    <span className="ml-auto text-xs text-primary">✓</span>
                  )}
                </button>
                <button
                  onClick={() => handleTranslation('fr')}
                  className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                    currentLang === 'fr'
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <span className="text-lg">🇫🇷</span>
                  <span>Français</span>
                  {currentLang === 'fr' && (
                    <span className="ml-auto text-xs text-primary">✓</span>
                  )}
                </button>
                <button
                  onClick={() => handleTranslation('pt')}
                  className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                    currentLang === 'pt'
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <span className="text-lg">🇵🇹</span>
                  <span>Português</span>
                  {currentLang === 'pt' && (
                    <span className="ml-auto text-xs text-primary">✓</span>
                  )}
                </button>
                <button
                  onClick={() => handleTranslation('de')}
                  className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                    currentLang === 'de'
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <span className="text-lg">🇩🇪</span>
                  <span>Deutsch</span>
                  {currentLang === 'de' && (
                    <span className="ml-auto text-xs text-primary">✓</span>
                  )}
                </button>
                <button
                  onClick={() => handleTranslation('it')}
                  className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                    currentLang === 'it'
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <span className="text-lg">🇮🇹</span>
                  <span>Italiano</span>
                  {currentLang === 'it' && (
                    <span className="ml-auto text-xs text-primary">✓</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Hidden Google Translate Widget */}
          <div id="google_translate_element" className="hidden"></div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-xl font-bold text-primary">
                Hector Norzagaray
              </span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) =>
                  item.isExternal ? (
                    <RouterLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </RouterLink>
                  ) : (
                    <RouterLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </RouterLink>
                  )
                )}
              </div>
              <div className="py-6">
                <div className="-mx-3 block rounded-lg px-3 py-2">
                  <div className="text-base font-semibold leading-7 text-gray-900 mb-3">
                    Language / Idioma
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        handleTranslation('en');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-lg ${
                        currentLang === 'en'
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">🇺🇸</span>
                      <span>English</span>
                      {currentLang === 'en' && (
                        <span className="ml-auto text-xs text-primary">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        handleTranslation('es');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-lg ${
                        currentLang === 'es'
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">🇪🇸</span>
                      <span>Español</span>
                      {currentLang === 'es' && (
                        <span className="ml-auto text-xs text-primary">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        handleTranslation('fr');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-lg ${
                        currentLang === 'fr'
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">🇫🇷</span>
                      <span>Français</span>
                      {currentLang === 'fr' && (
                        <span className="ml-auto text-xs text-primary">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        handleTranslation('pt');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-lg ${
                        currentLang === 'pt'
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">🇵🇹</span>
                      <span>Português</span>
                      {currentLang === 'pt' && (
                        <span className="ml-auto text-xs text-primary">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        handleTranslation('de');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-lg ${
                        currentLang === 'de'
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">🇩🇪</span>
                      <span>Deutsch</span>
                      {currentLang === 'de' && (
                        <span className="ml-auto text-xs text-primary">✓</span>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        handleTranslation('it');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-lg ${
                        currentLang === 'it'
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">🇮🇹</span>
                      <span>Italiano</span>
                      {currentLang === 'it' && (
                        <span className="ml-auto text-xs text-primary">✓</span>
                      )}
                    </button>
                  </div>

                  {/* Hidden mobile translate element */}
                  <div
                    id="google_translate_element_mobile"
                    className="hidden"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
