import { RssIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { useContrastColors } from '../hooks/useContrastColors'; // Add this import
import { useNavigate, useLocation } from 'react-router-dom';

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
  </svg>
);

const navigation = [
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#resume' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

export default function Footer() {
  const { isDarkMode } = useTheme();
  const colors = useContrastColors(); // Add this line
  const navigate = useNavigate();
  const location = useLocation();

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
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className={`border-t transition-colors duration-300 overflow-hidden ${colors.background.primary} ${colors.border}`} // Add overflow-hidden
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          {' '}
          {/* Add w-full */}
          {/* About */}
          <div>
            <h3
              className={`text-lg font-semibold mb-4 transition-colors duration-300 ${colors.heading}`}
            >
              Hector Norzagaray
            </h3>
            <p
              className={`text-sm leading-relaxed transition-colors duration-300 ${colors.body}`}
            >
              Product Manager focused on creating tools for community and
              connection through responsible AI. Passionate about building tools
              that bring people together.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3
              className={`text-lg font-semibold mb-4 transition-colors duration-300 ${colors.heading}`}
            >
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-sm font-medium transition-colors duration-300 py-1 px-2 -mx-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${colors.interactive} ${
                        isDarkMode
                          ? 'focus:ring-offset-gray-900'
                          : 'focus:ring-offset-white'
                      }`}
                      aria-label={`Navigate to ${item.name} section`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* Newsletter Signup */}
          <div>
            <h3
              className={`text-lg font-semibold mb-4 transition-colors duration-300 ${colors.heading}`}
            >
              Stay Connected
            </h3>
            <p
              className={`mb-4 text-sm leading-relaxed transition-colors duration-300 ${colors.body}`}
            >
              Subscribe to my newsletter for the latest insights and articles.
            </p>
            <div
              className="flex gap-3"
              role="group"
              aria-label="Newsletter subscription options"
            >
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                  isDarkMode
                    ? 'focus:ring-offset-gray-900'
                    : 'focus:ring-offset-white'
                }`}
                aria-label="Subscribe to RSS feed"
              >
                <RssIcon className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://blogtrottr.com/?subscribe=https://hectornorza.com/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  isDarkMode
                    ? 'focus:ring-offset-gray-900'
                    : 'focus:ring-offset-white'
                }`}
                aria-label="Subscribe via email using BlogTrottr"
              >
                <EnvelopeIcon className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          {/* Social Media */}
          <div>
            <h3
              className={`text-lg font-semibold mb-4 transition-colors duration-300 ${colors.heading}`}
            >
              Connect
            </h3>
            <p
              className={`mb-4 text-sm leading-relaxed transition-colors duration-300 ${colors.body}`}
            >
              Follow me on social media for updates and insights.
            </p>
            <div
              className="flex gap-3"
              role="group"
              aria-label="Social media links"
            >
              <a
                href="https://www.linkedin.com/in/norza/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isDarkMode
                    ? 'focus:ring-offset-gray-900'
                    : 'focus:ring-offset-white'
                }`}
                aria-label="Connect with Hector on LinkedIn (opens in new tab)"
              >
                <LinkedInIcon className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://x.com/hectorOnCloud"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-gray-900 hover:bg-black text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                  isDarkMode
                    ? 'focus:ring-offset-gray-900'
                    : 'focus:ring-offset-white'
                }`}
                aria-label="Follow Hector on X (formerly Twitter) (opens in new tab)"
              >
                <XIcon className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`mt-8 pt-8 border-t transition-colors duration-300 ${colors.border}`}
        >
          <p
            className={`text-center text-sm transition-colors duration-300 ${colors.body}`}
          >
            © {new Date().getFullYear()} Hector Norzagaray. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
