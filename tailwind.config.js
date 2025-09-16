/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-custom': 'bounce 1s ease-in-out',
        'pulse-winner': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        'wheel': {
          'primary': '#6366F1',
          'secondary': '#8B5CF6',
          'accent': '#10B981',
        }
      }
    },
  },
  plugins: [],
}