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
      // If on blog page, navigate back to portfolio first, then scroll to section
      window.location.hash = href; // Set the target section hash directly
      
      // Wait for view change, then scroll to the section
      setTimeout(() => {
        const element = document.querySelector(href) as HTMLElement;
        if (element) {
          // Calculate header offset
          const headerHeight = 64; // 4rem = 64px
          const additionalPadding = 32; // 2rem = 32px
          const elementPosition = element.offsetTop;
          const offsetPosition = elementPosition - headerHeight - additionalPadding;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 300); // Increased timeout to allow for view transition
    } else {
      // Direct scroll to section
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        // Calculate header offset for consistency
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
  }, []);

  return {
    scrollToSection,
    scrollToContact,
    navigateToBlog,
  };
};