/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ultriti: '#4F46E5', // Example custom brand color
      },
      fontFamily: {
        ultriti: ['"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
