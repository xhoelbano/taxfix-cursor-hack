/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Taxfix brand palette (from the deck)
        forest: '#14401f',
        forestDark: '#0e2f16',
        lime: '#86c440',
        limeSoft: '#a7d96a',
        cream: '#f2efe9',
        ink: '#1b2a1b',
        muted: '#5c635c',
        // ring accents
        cashback: '#e0a82e',
        deduction: '#2fb6a6',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        xl2: '1.5rem',
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(20, 64, 31, 0.18)',
        cardsm: '0 4px 16px -6px rgba(20, 64, 31, 0.16)',
      },
      keyframes: {
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floatUp: 'floatUp 0.35s ease-out',
      },
    },
  },
  plugins: [],
}
