/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./public/*.html"],
  theme: {
    colors: {
      ...colors,
      'oceanBlue': '#1f7dfe',
      'aquaGreen': '#3ecdbc',
      'deepNavy': '#0e1426',
      'deepNavyOpacity': 'rgba(14, 20, 38, 0.6)',
      'seaGray': '#262626',
      'mistyGray': '#a0a9c0',
      'stormGray': '#404040',
      'pureWhite': '#ffffff', 
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'spiderverse': "url('../public/images/cover.webp')",
      }
    },
  },
  plugins: [],
}
