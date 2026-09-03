/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#071337',
          900: '#0B1647',
          800: '#121F59',
          700: '#172867'
        },
        brand: {
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(11, 22, 71, 0.08)',
        card: '0 8px 24px rgba(11, 22, 71, 0.08)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
