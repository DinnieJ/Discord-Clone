module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {
        '1/5': '20%',
        '100': '50%'
      }
    },
  },
  variants: {
    extend: {
      borderRadius: ['hover']
    },
  },
  plugins: [],
}
