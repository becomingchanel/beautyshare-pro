import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // BeautyShare Pro Brand Palette (warm brown/cream/orange)
        brand: {
          50: '#FDF8F3',
          100: '#F5F0EB',
          200: '#E8DDD2',
          300: '#D4C4B0',
          400: '#B8976E',
          500: '#A0764A',
          600: '#8B4513',
          700: '#723910',
          800: '#5A2D0D',
          900: '#42210A',
          950: '#2A1507',
        },
        cream: {
          50: '#FFFDFB',
          100: '#FDF8F3',
          200: '#F5F0EB',
          300: '#EDE5DB',
          400: '#E0D3C3',
        },
        accent: {
          DEFAULT: '#D4840A',
          light: '#F5A623',
          dark: '#A36708',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
        },
        warning: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
        },
        danger: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'sidebar': '2px 0 8px -2px rgb(0 0 0 / 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
