/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nanum Gothic"],
        nanum: ["Nanum Gothic"]
      },
      backgroundImage: {
        "izakaya": "url('src/assets/theme/izakaya_theme.png')",
        "pocha": "url('src/assets/theme/pocha_theme.png')",
        "hof": "url('src/assets/theme/hof_theme.png')",
        "rain": "url('src/assets/theme/rain_theme.gif')",
        "china": "url('src/assets/theme/china_theme.png')",
        "beer": "url('src/assets/theme/beer_theme.gif')",
      }
    },
  },
  plugins: [],
}