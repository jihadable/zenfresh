/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "boldPurple": "#6c35de"
      },
      screens: {
        "mobile": {"max": "480px"},
        "tablet": {"min": "481px", "max": "1023px"}
      }
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "primary": "#6c35de"
        },
      },
    ]
  },
  plugins: [require("daisyui")]
}