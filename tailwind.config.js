/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          purple: {
            light: '#8B5CF6',
            DEFAULT: '#6D28D9',
            dark: '#5B21B6'
          },
          turquoise: {
            light: '#00E5D1',
            DEFAULT: '#00C6B7',
            dark: '#00A89D'
          }
        },
        dark: {
          DEFAULT: '#1F2937',
          50: '#9CA3AF',
          100: '#4B5563',
          200: '#374151',
          300: '#1F2937',
          400: '#111827',
          500: '#0F172A',
        },
        light: {
          DEFAULT: '#FFFFFF',
          50: '#FFFFFF',
          100: '#F9FAFB',
          200: '#F3F4F6',
          300: '#E5E7EB',
          400: '#D1D5DB',
          500: '#9CA3AF',
          600: '#6B7280',
          700: '#4B5563',
          800: '#374151',
          900: '#1F2937'
        }
      },
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.35)',
        'dark': '0 1px 3px 0 rgba(0, 0, 0, 0.35), 0 1px 2px -1px rgba(0, 0, 0, 0.35)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.35), 0 2px 4px -2px rgba(0, 0, 0, 0.35)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.35), 0 4px 6px -4px rgba(0, 0, 0, 0.35)',
      }
    }
  },
  plugins: []
};