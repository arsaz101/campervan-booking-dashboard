module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#6B9EFF",
          DEFAULT: "#4A90E2",
          dark: "#357ABD",
        },
        secondary: {
          light: "#F0F4F8",
          DEFAULT: "#D9E3F0",
          dark: "#B4C4D8",
        },
        accent: {
          light: "#FFD02C",
          DEFAULT: "#FFC107",
          dark: "#E0A800",
        },
        success: "#28A745",
        danger: "#DC3545",
        warning: "#FFC107",
        info: "#17A2B8",
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
