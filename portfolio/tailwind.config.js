/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'prompt': ['Prompt', 'sans-serif'],
        'roboto': ['"Roboto Mono"', 'monospace'],
        'merriweather': ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
}
