/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    // './node_modules/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailgrids/plugin')]
};
