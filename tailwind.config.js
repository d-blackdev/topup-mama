/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#166CB4",
          main: "#20639B",
          dark: "#16588F",
          gray: "#ECECEC",
          blue: "#4589C3",
          overlay: "rgba(0, 0, 0, 0.6)",
        },
        secondary: {
          error: "#F5000F",
          success: "#009E52",
          yellow: "#F69F13",
          other: "#4BC7EA",
          purple: "#9E09E4",
        },
        white: {
          black: "#000",
          bg: "#F5F5F5",
          main: "#fff",
          light: "#FAF9F9",
          dim: "#F0F4F9",
          text: "#464F54",
          dark: "#1C1F37",
          border: "#BDBDBD",
          gray: "#4F5665",
          darkGray: "#272D4E",
          ash: "#C2C2C2",
          lightGray: "#9FA5C0",
          dimWhite: "#F3F3F3",
          main2: "#2F3133",
          text2: "#718096",
        },
        transparent: "transparent",
      },
    },
  },
  plugins: [],
};
