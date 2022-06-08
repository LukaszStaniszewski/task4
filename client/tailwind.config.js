module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1330px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      spacing: {
        '5vw': '5vw',
        '10vw': '10vw',
        '20vw': '20vw',
        '40vw': '40vw',
        '60vw': '60vw',
        '80vw': '80vw',
        '95vw': '95vw',

      }
    },
  },
  plugins: [require("daisyui")],
}
