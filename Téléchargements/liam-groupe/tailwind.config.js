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
        brand: {
          50: "#FDE8E8",
          100: "#FBC5C5",
          400: "#E84A4F",
          500: "#E21B22",
          600: "#C0171D",
          700: "#9A1217",
        },
        violet: {
          50: "#FDE8E8",
          100: "#FBC5C5",
          200: "#F8A0A0",
          500: "#E21B22",
          600: "#C0171D",
          700: "#9A1217",
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
        "card-hover": "0 20px 50px -16px rgba(19,0,37,0.25)",
        "hero": "0 30px 80px rgba(226,27,34,0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-down": "fadeDown 0.6s ease-out forwards",
        "fade-left": "fadeLeft 0.6s ease-out forwards",
        "fade-right": "fadeRight 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "zoom-in": "zoomIn 0.5s ease-out forwards",
        "blur-in": "blurIn 0.5s ease-out forwards",
        "scroll": "scroll 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        blurIn: {
          "0%": { opacity: "0", filter: "blur(10px)" },
          "100%": { opacity: "1", filter: "blur(0)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
}

