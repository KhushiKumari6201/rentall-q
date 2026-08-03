import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f1f5f3',
          100: '#dbe4df',
          200: '#b7c9bf',
          300: '#8fa99c',
          400: '#6b897b',
          500: '#4d695b',
          600: '#395044',
          700: '#2b3e34',
          800: '#202f27',
          900: '#16261E',
          950: '#0e1913',
        },
        amber: {
          50: '#fdf8ef',
          100: '#f9edda',
          200: '#f2d8b0',
          300: '#e9be7e',
          400: '#e0a54e',
          500: '#D89B3C',
          600: '#c08530',
          700: '#9e6a26',
          800: '#7d5320',
          900: '#5e3e18',
        },
        cream: {
          50: '#FCFBF7',
          100: '#F3F1E7',
          200: '#E8E4D5',
          300: '#DDD7C2',
          400: '#CFC7AE',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
