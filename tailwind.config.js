/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      width:{
        // '11/12screen': '91.666667vw',
      },
      animation: {
        'expand': 'spin 3s linear infinite',
      },
      keyframes: {
      },      
      backgroundImage: {
      },
      strokeWidth: {
        '4': '4px',
        '6': '6px',
        '8': '8px',
        '10': '10px',
        '12': '12px',
      },
      spacing: {
        '128': '32rem',
        '256': '64rem',
      },
      minWidth:{
        '6': '1.5rem',
        '96': '24rem',
        '128': '32rem',
        '256': '64rem',
      },
      transitionProperty: {
        "size": "width, height",
        // "height": "height",
      },
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
      },
      backgroundPosition: {
        '-bottom-4': 'center bottom -1rem',
        '-bottom-8': 'center bottom -2rem',
        '-bottom-32': 'center bottom -8rem',
        '-bottom-40': 'center bottom -10rem',
        '-top-4': 'center top -1rem',
        '-top-8': 'center top -2rem',
        '-top-24': 'center top -6rem',
        '-top-32': 'center top -8rem',
        '-top-40': 'center top -10rem',
      }
    },
  },
  plugins: [],
}

