/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0A0E27',
        'space-blue': '#1a1f3a',
        'space-purple': '#6B46C1',
        'space-gold': '#FFB800',
        'space-cyan': '#00D9FF',
      },
    },
  },
  plugins: [],
}