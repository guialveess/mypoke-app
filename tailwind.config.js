/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-orange": "#E66D02",
        "accent-blue": "#4350E6",
        "accent-green": "#01B956",
        "accent-cream": "#FFAF65",
        "accent-red": "#DE2B2C",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      "myTheme": {
        "primary": '#FFCB3B',
        "secondary": "#E6AB09",
        "accent": "#18182F",

        "neutral": "#18182F",
        "base-100": "#FFFFFF",
        "info": "#3ABFF8",
        "success": "#36D399",
        "warning": "#FBBD23",
        "error": "#F87272",
      }
    }],
  }
}
