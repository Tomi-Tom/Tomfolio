/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        spotlight: {
          '0%': {
            opacity: 0,
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/heroBanner.jpg')",
        'transition-pattern': "url('/src/assets/transition.png')",
      },
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
      },
    },
  },
  plugins: [],
}
