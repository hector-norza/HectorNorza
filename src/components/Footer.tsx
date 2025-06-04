import { useContrastColors } from '../hooks/useContrastColors';
import { useNavigation } from '../hooks/useNavigation';
import { NAVIGATION, SOCIAL_LINKS, SITE_CONFIG } from '../utils/constants';
import { trackSocialClick } from '../utils/analytics';

// Social media icon components with improved accessibility
const LinkedInIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SubstackIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
);

const MediumIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const RssIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
  </svg>
);

export default function Footer() {
  const colors = useContrastColors();
  const { scrollToSection } = useNavigation();

  const handleSocialClick = (platform: string) => {
    trackSocialClick(platform, `Social click: ${platform}`); // Add the second argument
  };

  return (
    <footer 
      className={`py-12 transition-colors duration-300 ${colors.background.card} ${colors.border} border-t`}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Links */}
        <nav aria-label="Footer navigation" className="mb-8">
          <div className="flex flex-wrap justify-center space-x-8">
            {NAVIGATION.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-all duration-300 ${colors.secondary} hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-md px-2 py-1`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8" role="group" aria-label="Social media links">
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => handleSocialClick('linkedin')}
            className="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Visit LinkedIn profile (opens in new tab)"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>

          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => handleSocialClick('twitter')}
            className="p-2 bg-gray-900 hover:bg-black text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Visit X (Twitter) profile (opens in new tab)"
          >
            <XIcon className="w-4 h-4" />
          </a>

          <a
            href={SOCIAL_LINKS.substack}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => handleSocialClick('substack')}
            className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Visit Substack newsletter (opens in new tab)"
          >
            <SubstackIcon className="w-4 h-4" />
          </a>

          <a
            href={SOCIAL_LINKS.medium}
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => handleSocialClick('medium')}
            className="p-2 bg-gray-800 hover:bg-black text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Visit Medium blog (opens in new tab)"
          >
            <MediumIcon className="w-4 h-4" />
          </a>

          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('rss')}
            className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Subscribe to RSS feed (opens in new tab)"
          >
            <RssIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className={`text-sm transition-colors duration-300 ${colors.secondary}`}>
            © 2024 {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className={`text-xs mt-2 transition-colors duration-300 ${colors.secondary}`}>
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}