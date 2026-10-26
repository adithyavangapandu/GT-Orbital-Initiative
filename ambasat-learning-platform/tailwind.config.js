/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Near-black navy "mission control" palette
        space: {
          950: '#04070d',
          900: '#070d18',
          850: '#0a1220',
          800: '#0d1728',
          700: '#122036',
          600: '#1a2c47',
        },
        accent: {
          DEFAULT: '#38bdf8', // sky-400
          soft: '#7dd3fc',
          dim: '#0ea5e9',
        },
        gold: '#b3a369', // GT accent, used sparingly for Orbital Initiative branding
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
