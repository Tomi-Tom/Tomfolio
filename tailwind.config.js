/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-1': '#242127',
        'background-2': '#343137',
        'interactive-1': '#AB5E00',
        'interactive-2': '#CB7E0C',
        'interactive-3': '#EB9E2C',
        'border-1': '#444147',
        'border-2': '#545157',
        'border-3': '#646167',
        'solid-1': '#747177',
        'solid-2': '#848187',
        'text-1': '#9B9E9C',
        'text-2': '#EDE7E2',
      }
    },
  },
  plugins: [],
}