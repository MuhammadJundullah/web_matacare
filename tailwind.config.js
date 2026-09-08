/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        matablue: {
          50: '#f0f7fd',
          100: '#dfedf9',
          200: '#bde0f5',
          300: '#87c7ee',
          400: '#4aaae4',
          500: '#00a3e0', // Signature vibrant eye cyan/blue
          600: '#0283bd',
          700: '#036898',
          800: '#08577d',
          900: '#0c4968',
          950: '#072e44',
        },
        matanavy: {
          50: '#f2f6fa',
          100: '#e1ebf4',
          200: '#c5d8ea',
          300: '#9bbfdc',
          400: '#6ca1cb',
          500: '#4783b9',
          600: '#34699c',
          700: '#2a537f',
          800: '#1e3c5d',
          900: '#0f243b', // Deep brand navy
          950: '#081422',
        },
        matagold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Amber gold accent
          600: '#d97706',
          700: '#b45309',
        },
        matared: {
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(0, 163, 224, 0.08), 0 4px 6px -2px rgba(15, 36, 59, 0.04)',
        'card': '0 12px 28px -4px rgba(15, 36, 59, 0.07), 0 4px 10px -2px rgba(0, 163, 224, 0.05)',
        'elevated': '0 20px 40px -10px rgba(15, 36, 59, 0.12), 0 8px 16px -4px rgba(0, 163, 224, 0.08)',
      }
    },
  },
  plugins: [],
};
