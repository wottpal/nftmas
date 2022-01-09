module.exports = {
  purge: [`./pages/**/*.{js,ts,jsx,tsx}`, `./components/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {
      colors: {
        christred: '#ba3e48',
        christwhite: '#fefefe',
        christgray: '#c2c3cc',
        christblack: '#14313d',
        christdarkgray: '#2A5061',
        christgold: '#d7a42a',
        christyello: '#efc85a',
        christsand: '#f0e6da',
        christgreen: '#396135',

        // tusk: '#E7F6C8',
        // meteorite: '#3C207C',

        // alabaster: '#FCFBFC',
        // zigurat: '#B4E0E0',

        // voodoo: '#563664',
      },
      fontFamily: {
        mono: ['Space Mono', 'mono'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/line-clamp'),
  ],
}
