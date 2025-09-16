/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        train: {
          green: "#2d4a2b",
          "green-light": "#3d5a3b",
          brown: "#6b3423",
          "brown-light": "#8b4513",
          dark: "#1a1a1a",
          light: "#f8f7f5",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
