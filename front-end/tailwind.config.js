/** @type {import('tailwindcss').Config} */
const daisy = require('daisyui');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      '2xl': { max: '1535px' },

      xl: { max: '1279px' },

      lg: { max: '1023px' },

      md: { max: '767px' },

      sm: { max: '639px' },
    },
    extend: {
      colors: {
        gray: {
          900: '#121214',
          800: '#1E1E1E',
          600: '#565656',
          300: '#C2C2C2',
          200: '#CECECE',
        },
        green: {
          600: '#02CA30',
          400: '#11D281',
        },
        blue: {
          600: '#23BCDD',
          400: '#03D8FF',
        },
        purple: {
          700: '#7C45FF',
        },
        pink: {
          400: '#FF43FF',
        }
      },
    },
  },
  plugins: [daisy],
  daisyui: {
    styled: true,
    themes: true,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: 'daisy-',
    darkTheme: 'dark',
  },
};