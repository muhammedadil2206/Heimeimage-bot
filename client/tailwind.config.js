import lineClamp from '@tailwindcss/line-clamp';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        'hb-primary': '#6c63ff',
        'hb-secondary': '#8f7eff',
        'hb-dark': '#1a1b1f',
      },
    },
  },
  plugins: [lineClamp],
};
