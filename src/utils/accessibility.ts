import { useState, useEffect } from 'react';

export function useHighContrast() {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Check for saved preference
    const saved = localStorage.getItem('high-contrast');
    if (saved) {
      setHighContrast(JSON.parse(saved));
    } else {
      // Check system preference
      const mediaQuery = window.matchMedia('(prefers-contrast: high)');
      setHighContrast(mediaQuery.matches);
      
      // Listen for changes
      const handler = (e: MediaQueryListEvent) => setHighContrast(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    // Apply high contrast class to document
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('high-contrast', JSON.stringify(newValue));
  };

  return { highContrast, toggleHighContrast };
}
