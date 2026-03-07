/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#161b21',
          surface: '#343434',
          accent: '#dcff17',
          orange: '#ff9f2a',
          badge: '#303f9f',
          muted: '#8695a4'
        }
      },
      fontFamily: {
        heebo: ['var(--font-heebo)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}