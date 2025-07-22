/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["mainFontEn", "sans-serif"],
        ar: ["mainFontAr", "sans-serif"],
      },
    },
  },
  plugins: [],
};
