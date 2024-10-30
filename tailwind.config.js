import breakpoints from './config/breakpoints';

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
    },
  },
  plugins: [],
}

