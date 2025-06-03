import { useTheme } from '../contexts/ThemeContext';

export const useContrastColors = () => {
  const { isDarkMode } = useTheme();

  return {
    // Text colors
    heading: isDarkMode ? 'text-white' : 'text-gray-900',
    body: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    secondary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    muted: isDarkMode ? 'text-gray-500' : 'text-gray-500',
    accent: isDarkMode ? 'text-primary-400' : 'text-primary-600',
    placeholder: isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500',

    // Background colors
    background: {
      primary: isDarkMode ? 'bg-gray-900' : 'bg-white',
      page: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
      card: isDarkMode ? 'bg-gray-800' : 'bg-white',
      accent: isDarkMode ? 'bg-primary-900/20' : 'bg-primary-50',
      navbar: isDarkMode ? 'bg-gray-900/95' : 'bg-white/95',
      secondary: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
    },

    // Border colors
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',

    // Interactive colors
    interactive: isDarkMode ? 'hover:text-primary-400' : 'hover:text-primary-600',

    // Button colors
    button: {
      primary: isDarkMode 
        ? 'bg-primary-600 hover:bg-primary-700 text-white' 
        : 'bg-primary-600 hover:bg-primary-700 text-white',
      secondary: isDarkMode 
        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
        : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
    },
  };
};