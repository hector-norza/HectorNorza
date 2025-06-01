// src/hooks/useContrastColors.ts
import { useTheme } from './useTheme';

export const useContrastColors = () => {
  const { isDarkMode } = useTheme();

  return {
    heading: isDarkMode ? 'text-white' : 'text-gray-900',
    body: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    secondary: isDarkMode ? 'text-gray-200' : 'text-gray-800',
    muted: isDarkMode ? 'text-gray-400' : 'text-gray-600', // Only for non-essential text
    interactive: isDarkMode
      ? 'text-gray-300 hover:text-white'
      : 'text-gray-700 hover:text-gray-900',
    placeholder: isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500',
    border: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    background: {
      primary: isDarkMode ? 'bg-gray-900' : 'bg-white',
      secondary: isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
      card: isDarkMode ? 'bg-gray-800' : 'bg-white',
    },
  };
};
