/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#FFA400",
          50: "#FFF6E6",
          100: "#FFF1D9",
          200: "#FFE3B0",
        },
        secondary: {
          DEFAULT: "#1F1F1F",
          muted: "#979797",
        },
        background: "#F7F7F7",
        danger: "#FF5652",
        success: "#33AD75",
      },
    },
  },
  plugins: [],
};
