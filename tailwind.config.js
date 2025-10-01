/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Your existing custom colors
      colors: {
        'brand-primary': '#2c3e50',      // A modern, dark slate blue
        'brand-secondary': '#ecf0f1',    // A clean, soft off-white
        'brand-accent': '#e74c3c',       // A vibrant, eye-catching red
        'brand-accent-hover': '#c0392b', // A darker red for hover effects
        'brand-text': '#34495e',         // A dark gray for readable text
      },

      // NEW: Animations and Keyframes for the login page
      animation: {
        'fade-in-down': 'fadeInDown 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-in-out',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      }
    },
  },
  plugins: [],
}