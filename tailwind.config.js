const daisyUi = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      'off-white': '#F9FAFC',
      'dark-gray': '#505050',
      'middle-gray': '#7E7E7E',
      'light-gray': '#E0E0E0',
      'dark-orange': '#F58F00',
      pink: '#EB2873',
      purple: '#8D00D8',
      'dark-black': '#2C3E50',
    },
    fontFamily: {
      Poppins: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [daisyUi],
};
