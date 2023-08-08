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
      },
      screens: {
        "mobile": {"max": "480px"},
        "tablet": {"min": "481px", "max": "1023px"}
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#66bb6a",
          "darkBlue": "#546c7c",
          "redCustome": "#ef5251",
          "greenCustome": "#66bb6a"
        }
      },
      "light"
    ],
  }
}

