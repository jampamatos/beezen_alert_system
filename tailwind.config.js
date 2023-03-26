/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./app/**/*.html.erb', './app/helpers/**/*.rb', './app/javascript/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  content: [
    './app/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    // Add any other file extensions that you want to be scanned for class usage
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark-blue': '#1C2A48',
        'light-blue': '#365F9C',
        'light-gray': '#F5F5F5',
        'lighter-gray': '#FAFAFA',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

