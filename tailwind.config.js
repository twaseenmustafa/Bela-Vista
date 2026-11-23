/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.tsx', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: '#F9F9F4',
        navy: '#0F172A',
        gold: '#D4AF37',
        goldhover: '#B5952F',
        golddeep: '#8A6A12', // gold for text on light surfaces (4.8:1 on sand)
        charcoal: '#333333',
        offwhite: '#F5F5F0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
        chisel: ['"Cinzel"', 'serif'],
        majestic: ['"Italiana"', 'serif'],
        hand: ['"Shadows Into Light"', 'cursive'],
      },
      letterSpacing: { widest: '.25em' },
    },
  },
  plugins: [],
};
