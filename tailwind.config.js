// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E50914',
          dark: '#B81D24',
          light: '#F40612',
        },
        secondary: {
          DEFAULT: '#FFFFFF',
          dark: '#F8F8F8',
          light: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}