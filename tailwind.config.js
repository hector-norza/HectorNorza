/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Make sure this is set to 'class'
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // your primary color
        secondary: '#8B5CF6', // your secondary color
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...other plugins
  ],
};
