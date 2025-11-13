import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class', // Explicitly disable automatic dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ensure light mode colors are explicitly set
        background: '#ffffff',
        foreground: '#000000',
      },
    },
  },
  plugins: [],
} satisfies Config;