import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'About', href: '#about', isExternal: false },
  { name: 'Experience', href: '#resume', isExternal: false },
  { name: 'Blog', href: '/blog', isExternal: true },
  { name: 'Contact', href: '#contact', isExternal: false },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-primary">Hector Norzagaray</span>
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
          {navigation.map((item) => (
            item.isExternal ? (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            )
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          {/* Google Translate Widget */}
          <div id="google_translate_element" className="text-sm"></div>
          
          {/* Manual Language Selector (for future use) */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-primary transition-colors">
              <LanguageIcon className="h-4 w-4" />
              <span>ES</span>
            </button>
          </div>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-xl font-bold text-primary">Hector Norzagaray</span>
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
                {navigation.map((item) => (
                  item.isExternal ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )
                ))}
              </div>
              <div className="py-6">
                <div className="-mx-3 block rounded-lg px-3 py-2">
                  <div className="text-base font-semibold leading-7 text-gray-900 mb-2">Language / Idioma</div>
                  <div id="google_translate_element_mobile" className="text-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
