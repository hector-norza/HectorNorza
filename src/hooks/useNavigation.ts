import { useCallback } from 'react';
import { trackSectionView } from '../utils/analytics';

export const useNavigation = () => {
  const scrollToSection = useCallback((href: string) => {
    if (href === '#blog') {
      trackSectionView('blog');
      window.location.hash = 'blog';
      return;
    }

    const sectionName = href.replace('#', '');
    trackSectionView(sectionName);

    const isOnBlogPage = window.location.hash === '#blog';
    
    if (isOnBlogPage) {
      // If on blog page, navigate back to portfolio first
      window.location.hash = '';
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    } else {
      // Direct scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, []);

  const scrollToContact = useCallback(() => {
    trackSectionView('contact');
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = 64;
      const additionalPadding = 32;
      const elementPosition = contactSection.offsetTop;
      const offsetPosition = elementPosition - headerHeight - additionalPadding;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const navigateToBlog = useCallback(() => {
    trackSectionView('blog');
    window.location.hash = 'blog';
  }, []);

  return {
    scrollToSection,
    scrollToContact,
    navigateToBlog,
  };
};