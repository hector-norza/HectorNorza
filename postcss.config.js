export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        'Chrome >= 88',
        'ChromeAndroid >= 88',
        'Edge >= 88',
        'Firefox >= 78',
        'Safari >= 14',
      ],
      // Remove deprecated CSS properties to avoid warnings
      remove: true,
      // Disable specific autoprefixer features that generate deprecated CSS
      grid: false
    },
  },
};
