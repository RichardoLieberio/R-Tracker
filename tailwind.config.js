/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'phone': '320px',
        'tablet': '768px',
        'desktop': '1024px',
      },
    },
  },
  plugins: [],
}

