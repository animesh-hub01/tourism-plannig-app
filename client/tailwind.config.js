/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#eef4ff', 100: '#d9e6ff', 500: '#1e3a8a',
            600: '#172d69', 700: '#0f1f4d', 900: '#0a1636',
          },
          accent: { 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706' },
        },
        fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      },
    },
    plugins: [],
  };