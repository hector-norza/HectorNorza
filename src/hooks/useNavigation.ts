import { useCallback } from 'react';
import { trackSectionView } from '../utils/analytics';

export const useNavigation = () => {
  const scrollToSection = useCallback((href: string) => {
    if (href === '#blog') {
      trackSectionView('blog');
      window.location.hash = 'blog';
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 100);
      return;
    }

    const sectionName = href.replace('#', '');
    trackSectionView(sectionName);

    const isOnBlogPage = window.location.hash === '#blog';
    
    if (isOnBlogPage) {
      // Store the target section in sessionStorage so App.tsx can handle it
      sessionStorage.setItem('pendingScroll', href);
      window.location.hash = '';
      // Do NOT set the target hash here. App.tsx will handle it after switching views.
    } else {
      // Direct scroll to section
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const headerHeight = 64;
        const additionalPadding = 32;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerHeight - additionalPadding;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const scrollToContact = useCallback(() => {
    trackSectionView('contact');
    
    const contactSection = document.getElementById('contact') as HTMLElement;
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
    // Ensure blog always starts at the top
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 100);
  }, []);

  return {
    scrollToSection,
    scrollToContact,
    navigateToBlog,
  };
};

// No changes needed for dark mode in this file.