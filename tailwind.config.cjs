/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue': '#5dc3fe',
        'red': '#ec4141',
        'white': 'rgba(255, 255, 255, 0.82);'
      },
      screens: { 'sm': { 'min': '350px', 'max': '767px' } },
      height: { 'main': 'calc(100vh - 3.5rem)' },
      transitionProperty: {
        'height': 'height',
        'width': 'width',
        'spacing': 'margin, padding'
      },
      width: {
        '50': '206px',
        '74': '302px',
        'xs': '240px'
      }
    }
  },
  plugins: [],
}
