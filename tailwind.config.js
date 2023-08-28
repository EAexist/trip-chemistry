/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'expand': 'spin 3s linear infinite',
      },
      keyframes: {
      }      
    },
  },
  plugins: [],
}

