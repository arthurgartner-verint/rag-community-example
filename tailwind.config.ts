import type { Config } from 'tailwindcss'
import colors from './app/styles/colors'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        verintBlue: colors.verintBlue
      },
      boxShadow: {
        'card': '0 10px 15px 10px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [],
} satisfies Config