/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#B8860B',
          700: '#92400E',
          800: '#78350F',
          900: '#451A03',
        },
        stone: {
          50: '#FAF9F7',
          100: '#F5F1E8',
          200: '#E7E0D5',
          300: '#D6CCC0',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(74, 55, 40, 0.1), 0 2px 4px -1px rgba(74, 55, 40, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(74, 55, 40, 0.1), 0 4px 6px -2px rgba(74, 55, 40, 0.05)',
      },
    },
  },
  plugins: [],
};
