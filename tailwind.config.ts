import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}" // <- aggiunto fallback per pages
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

