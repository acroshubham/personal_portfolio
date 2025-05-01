/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1ff',
          100: '#cce3ff',
          200: '#99c7ff',
          300: '#66aaff',
          400: '#338eff',
          500: '#0072ff', // Main primary color
          600: '#005bcb',
          700: '#004498',
          800: '#002e64',
          900: '#001731',
        },
        secondary: {
          50: '#eff6fe',
          100: '#deeefe',
          200: '#c0ddfd',
          300: '#a2ccfc',
          400: '#84bbfb',
          500: '#66aafa', // Main secondary color
          600: '#5288c8',
          700: '#3d6696',
          800: '#294464',
          900: '#142232',
        },
        accent: {
          50: '#fff0e6',
          100: '#ffe1cc',
          200: '#ffc399',
          300: '#ffa466',
          400: '#ff8633',
          500: '#ff6700', // Main accent color
          600: '#cc5200',
          700: '#993e00',
          800: '#662900',
          900: '#331500',
        },
        dark: {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
          950: '#0d0d0d', // Darkest shade for backgrounds
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}