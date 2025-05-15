/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        colorBG: "#E4F0FB",
        colorBGCard: "#FFFFFF",
        colorBtn: "#3A8DFF",
        colorText: "#333333",
        colorTextSecundary: "#888888",
        colorBGResult: "#4CAF50",
        colorPlaceholder: "#707070",
      },
    },
  },
  plugins: [],
};
