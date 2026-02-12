/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        brand: {
          info: '#9333ea',  // Changed to PURPLE (Purple-600)
          dark: '#2e1065',  // Changed to DARK PURPLE (Purple-950) for footer
          light: '#f3e8ff', // Changed to LIGHT PURPLE TINT for backgrounds
        }
      }
    },
  },
  plugins: [],
}