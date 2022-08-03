/** @type {import('tailwindcss').Config} */ 
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/src/assets/images/login/login-bg.svg')"
      }
    },
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      orange: colors.orange,
      red: colors.red,
      teal: colors.teal,
      primary: '#F13130'
    },
  },
  plugins: [],
}