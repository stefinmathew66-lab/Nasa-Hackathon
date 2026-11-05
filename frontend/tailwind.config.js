/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nasa: {
          blue: '#0B3D91',
          red: '#FC3D21',
          light: '#F1F5F9',
          dark: '#0B132B'
        },
        agri: {
          green: '#15803D',
          emerald: '#059669',
          soil: '#78350F',
          sun: '#D97706',
          sky: '#0284C7'
        }
      }
    },
  },
  plugins: [],
}