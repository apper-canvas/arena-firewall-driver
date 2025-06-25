/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070F3',
        secondary: '#1A1A1A',
        accent: '#00D4FF',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0A0A0A'
        },
        ps: {
          blue: '#0070F3',
          cyan: '#00D4FF',
          dark: '#1A1A1A',
          surface: '#0A0A0A',
          black: '#000000'
        },
        success: '#00E676',
        warning: '#FFB300',
        error: '#FF3B30',
        info: '#2196F3'
      },
      fontFamily: {
        display: ['Bebas Neue', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Bebas Neue', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'number-count': 'number-count 0.6s ease-out',
        'rank-change': 'rank-change 0.8s ease-out',
        'particle': 'particle 1s ease-out forwards'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(0, 112, 243, 0.7)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 0 10px rgba(0, 112, 243, 0)' }
        },
        'number-count': {
          '0%': { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'rank-change': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'particle': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-20px) scale(0)', opacity: '0' }
        }
      },
      backdropBlur: {
        'xs': '2px'
      }
    },
  },
  plugins: [],
}