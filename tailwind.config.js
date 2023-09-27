/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},

    screens: {
      'xs': '300px',

      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },

    colors: {
      'black': '#0e141e',
      'pureBlack': '#000000',
      'black2': '#4c4c4c',
      'white': '#d1d3d4',
      'gray': '#545454',
      'darkGray': '#333333',
      'deepBlue': '#051031',
      'navyBlue': '#040c54',
      'blue': '#134fbd',
      'silver': '#575966',
      'green': '#25b102',
      'red': '#c80000',
    },
  },
  plugins: [],
}
