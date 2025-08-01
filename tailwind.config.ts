import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './*.{js,ts,jsx,tsx,mdx}'
],

  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#00BFFF',
          orange: '#FF3D00',
          black: '#000000',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        serif: ['"Libre Baskerville"', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config


