/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#004643',
        secondary: '#abd1c6',
        tertiary: '#e16162',
        accent: '#f9bc60',
        main: '#e8e4e6',
        white: '#fffffe',
        black: '#001e1d',
        success: '#20FC8F',
        info: '#2660A4',
        alert: '#F0A202',
        error: '#FF2E00'
      }
    }
  },
  plugins: []
};
