import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContrastColors } from '../hooks/useContrastColors';

const navigation = [
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#resume' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const colors = useContrastColors();

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();

    if (href.startsWith('#') || href.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const anchor = href.replace('/', '');
          const element = document.querySelector(anchor);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const anchor = href.replace('/', '');
        const element = document.querySelector(anchor);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to route and scroll to top
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-[999] backdrop-blur-sm border-b transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gray-900/95 border-gray-700'
          : 'bg-white/95 border-gray-200'
      }`}
    >
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Hector Norzagaray</span>
            <h1
              className={`text-xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Hector Norzagaray
            </h1>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${colors.interactive}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-sm font-semibold leading-6 transition-colors duration-300 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-primary'
                  : 'text-gray-900 hover:text-primary'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel
          className={`fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-900 ring-gray-700/50'
              : 'bg-white ring-gray-900/10'
          }`}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Hector Norzagaray</span>
              <h1
                className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Hector Norzagaray
              </h1>
            </a>
            <button
              type="button"
              className={`-m-2.5 rounded-md p-2.5 transition-colors duration-300 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile navigation */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-300 ${colors.interactive}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
