import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#040711',
          900: '#060b18',
          850: '#081022',
          800: '#0b162f',
          750: '#0e1c3b',
          700: '#112247',
          600: '#193368',
          500: '#234790'
        },
        brand: {
          green: '#00f59b',
          'green-dark': '#00d084',
          'green-glow': '#10b981',
          cyan: '#00d2ff'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        glow: '0 0 25px rgba(0, 245, 155, 0.3)',
        'glow-sm': '0 0 15px rgba(0, 245, 155, 0.2)',
        'glow-cyan': '0 0 25px rgba(0, 210, 255, 0.25)',
        'dark-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'soft-card': '0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'premium': '0 20px 50px -12px rgba(6, 11, 24, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)'
      }
    }
  },
  plugins: []
};

export default config;
