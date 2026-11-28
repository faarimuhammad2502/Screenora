/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './screener.html',
    './builder.html',
    './templates.html',
    './templates-pro.html',
    './app.js',
    './builder.js',
    './templates.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        dark: {
          bg: 'rgb(var(--twc-dark-bg) / <alpha-value>)',
          surface: 'rgb(var(--twc-dark-surface) / <alpha-value>)',
          border: 'rgb(var(--twc-dark-border) / <alpha-value>)',
          well: 'rgb(var(--twc-dark-well) / <alpha-value>)',
          wellBorder: 'rgb(var(--twc-dark-wellBorder) / <alpha-value>)',
          textPri: 'rgb(var(--twc-dark-textPri) / <alpha-value>)',
          textSec: 'rgb(var(--twc-dark-textSec) / <alpha-value>)',
          textMuted: 'rgb(var(--twc-dark-textMuted) / <alpha-value>)'
        },
        light: {
          bg: 'rgb(var(--twc-light-bg) / <alpha-value>)',
          surface: 'rgb(var(--twc-light-surface) / <alpha-value>)',
          border: 'rgb(var(--twc-light-border) / <alpha-value>)',
          well: 'rgb(var(--twc-light-well) / <alpha-value>)',
          wellBorder: 'rgb(var(--twc-light-wellBorder) / <alpha-value>)',
          textPri: 'rgb(var(--twc-light-textPri) / <alpha-value>)',
          textSec: 'rgb(var(--twc-light-textSec) / <alpha-value>)',
          textMuted: 'rgb(var(--twc-light-textMuted) / <alpha-value>)'
        },
        brand: {
          emerald: '#10B981',
          emeraldDark: '#059669',
          emeraldBg: 'rgb(var(--twc-brand-emeraldBg) / <alpha-value>)',
          emeraldBgLight: '#E6F7F0',
          amber: '#F59E0B',
          amberDark: '#D97706',
          amberBg: 'rgb(var(--twc-brand-amberBg) / <alpha-value>)',
          red: '#EF4444',
          redBg: '#261416',
          blue: '#38BDF8',
          blueBg: '#0C263A'
        }
      }
    }
  },
  plugins: []
};
