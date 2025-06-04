import React, { createContext, useState, useEffect } from 'react';
import { trackThemeToggle } from '../utils/analytics';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Export the context for the hook
export { ThemeContext };

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set dark mode as the default
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Default to dark mode if no theme is set
    if (savedTheme === 'dark' || (!savedTheme && prefersDark) || (!savedTheme && !prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        // Track theme change in Google Analytics
        trackThemeToggle('dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        // Track theme change in Google Analytics
        trackThemeToggle('light');
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
