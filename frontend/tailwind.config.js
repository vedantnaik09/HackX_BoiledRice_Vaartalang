/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors:{
        'primary': {
          1: '#000416',
          2: '#1a2431',
          3: '#084D62',
          4: '#007C82',
          5: '#24AB8A',
          6: '#8BD67D',
          6: '#d6e6fa',
        },
        
      },
      fontFamily: {
        'asap': ['"Asap Condensed"'],
      },
    },
  },
  plugins: [],
}