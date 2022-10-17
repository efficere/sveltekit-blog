/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily:{
        'etelkaTextPro': 'Etelka Text Pro',
        'poppins': 'Poppins'
      },
      colors:{
        'azul': {
          1: '#00A3D1',
          2: '#31577C',
          3: '#0D81AA'
        },
        'vermelho':{
          1: '#BA3345',
          2: '#ED3047',
        }

      }
    },
  },
  plugins: [require("daisyui")],
  daisyui:{
    themes: false,
  },
}
