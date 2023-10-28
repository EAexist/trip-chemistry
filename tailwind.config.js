/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      width:{
        // '11/12screen': '91.666667vw',
        '160': '40rem',
        '192': '48rem',
      },
      animation: {
        'expand': 'spin 3s linear infinite',
        'focusCard': 'focusCard 0.5s ease-in-out 0s normal forwards',
        'delay1': 'show 1s linear 1s',
      },
      keyframes: {
        focusCard: {
          '0%': {      
            width:'16rem',
            height:'10rem'
          },
          '100%':{      
            width:'18rem',
            height:'16rem'
          },
        },
        show: {
          '0%': {      
            visibility: "hidden",
          },
          '100%':{      
            visibility: "visible",
          },
        },

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
        "display": "display",
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

