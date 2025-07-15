import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'forest-green': '#25523B',
        'herbal-green': '#358856',
        'fresh-sage': '#5AAB61',
        'spring-green': '#62BD69',
        'moss-green': '#30694B',
        'deep-jungle': '#0C3823',
      },
    },
  },
  plugins: [],
} satisfies Config