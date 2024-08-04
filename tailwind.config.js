/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'primary': '#FFFFFF',
        'secondary': '#BBC3D7',
        'dark': '#2D2A43'
  
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


