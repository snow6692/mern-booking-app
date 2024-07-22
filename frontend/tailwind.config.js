/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{tsx,jsx,js,ts}"],
  theme: {
    extend: {
      colors: {
        emerald: "#10b981",
        primary_bg: "#020617"


      }
    },
    container: {

      padding: {
        md: "10rem",

      },

    }
  },
  plugins: [],
}

