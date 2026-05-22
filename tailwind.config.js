/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#09111F',
        paper: '#F7FBFE',
        navy: '#17324D',
        mist: '#D9F3FF',
        cyan: '#0B5CAD',
        teal: '#0F766E',
        coral: '#B4234D',
        rose: '#8E1F43',
        slateGlow: '#12233E',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(149, 177, 201, 0.22), 0 12px 30px rgba(92, 121, 145, 0.12)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(31, 84, 120, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(31, 84, 120, 0.06) 1px, transparent 1px)',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
