/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on where your components are
  ],
  theme: {
    extend: {
      colors: {
        light: "#F1F0E8",
        light1: "#E5E1DA",
        lightBlue: "#B3C8CF",
        darkBlue: "#89A8B2",
        dark: "#121212", // Custom dark color for background
        primary: "#FF5C00",
      },
    },
  },
  plugins: [],
};

