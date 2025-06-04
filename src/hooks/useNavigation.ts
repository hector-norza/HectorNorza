import { useCallback } from 'react';
import { trackSectionView } from '../utils/analytics';

export const useNavigation = () => {
  const scrollToSection = useCallback((href: string) => {
    if (href === '#blog') {
      trackSectionView('blog');
      // Always use window.location.hash assignment for consistent behavior
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
      // When coming from blog, first clear the hash to ensure we're back on main view
      // Use history.replaceState to avoid creating extra history entries
      history.replaceState(null, '', window.location.pathname);
      
      // Wait a moment for view to switch, then set the hash to navigate
      setTimeout(() => {
        window.location.hash = href.replace('#', '');
        
        // After hash is set, scroll to ensure proper positioning
        setTimeout(() => {
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
        }, 100);
      }, 50);
    } else {
      // Direct scroll to section (not coming from blog)
      // Set the hash directly to ensure clean URL
      window.location.hash = href.replace('#', '');
      
      // Scroll to the section
      setTimeout(() => {
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
      }, 50);
    }
  }, []);

  const scrollToContact = useCallback(() => {
    trackSectionView('contact');
    
    // Use consistent approach with scrollToSection
    window.location.hash = 'contact';
    
    setTimeout(() => {
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
    }, 50);
  }, []);

  const navigateToBlog = useCallback(() => {
    trackSectionView('blog');
    // Always use window.location.hash assignment for consistent behavior
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