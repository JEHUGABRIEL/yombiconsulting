/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Baloo 2", "ui-rounded", "sans-serif"],
        body: ["Poppins", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        violet: {
          50: "#FBF9FF",
          100: "#F1E5FF",
          200: "#E0C2FF",
          500: "#9C05FA",
          600: "#8601D8",
          700: "#6E01B3",
        },
        coral: {
          50: "#FFF1F1",
          100: "#FFE1E2",
          400: "#ED625E",
          500: "#F5323D",
          600: "#DE1C28",
        },
        ink: {
          DEFAULT: "#130025",
          900: "#0F001D",
          800: "#1B0331",
        },
        rose: {
          50: "#FFF8F7",
          600: "#C81E2E",
          700: "#8A0015",
        },
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(19,0,37,0.15)",
      },
    },
  },
  plugins: [],
}

