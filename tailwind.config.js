/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "lightBlue": "#b2e5fd",
        "darkBlue": "#546c7c",
        "redCustome": "#ef5251",
        "greenCustome": "#66bb6a"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  }
}

