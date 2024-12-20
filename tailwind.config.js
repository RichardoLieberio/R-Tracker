import scrollbar from 'tailwind-scrollbar';

import breakpoints from './config/breakpoints';
import theme from './config/theme';

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: breakpoints,
      colors: theme,
    },
  },
  plugins: [
    scrollbar,
  ],
}

