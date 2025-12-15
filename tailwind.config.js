/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundSize: {
        '200': '200% 200%',
      },
      keyframes: {
        blink: {
          '0%, 50%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0' },
        },
        'gradient-rotate': {
          '0%, 100%': { 'background-position': '50% 0%' },
          '50%': { 'background-position': '50% 100%' },
        },
      },
      animation: {
        'gradient-rotate': 'gradient-rotate 4s ease infinite',
        blink: 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
};
