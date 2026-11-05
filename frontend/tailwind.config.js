/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#002869',
          container: '#0b3d91',
          fixed: '#dae2ff',
          'fixed-dim': '#b1c5ff',
          'on-container': '#8dadff'
        },
        secondary: {
          DEFAULT: '#006c4a',
          container: '#82f5c1',
          fixed: '#85f8c4',
          'fixed-dim': '#68dba9',
          'on-container': '#00714e'
        },
        tertiary: {
          DEFAULT: '#002f43',
          container: '#004762',
          fixed: '#c4e7ff',
          'fixed-dim': '#7bd0ff',
          'on-container': '#33baf5'
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
          'on-container': '#93000a'
        },
        surface: {
          DEFAULT: '#faf8ff',
          dim: '#d2d9fa',
          bright: '#faf8ff',
          variant: '#dbe1ff',
          container: '#ebedff',
          'container-low': '#f3f3ff',
          'container-high': '#e3e7ff',
          'container-highest': '#dbe1ff',
          'container-lowest': '#ffffff'
        },
        'on-surface': '#131a33',
        'on-surface-variant': '#434652',
        'outline': '#747783',
        'outline-variant': '#c4c6d3',
        'inverse-surface': '#282f49'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        headline: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
