/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F8F4EE",
        surface: "#FFFDF9",
        charcoal: "#1E1B18",
        muted: "#635E59",
        saffron: "#C56A2D",
        gold: "#D8A24A",
        olive: "#6E7A52",
        linen: "#E7DFD3",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(30, 27, 24, 0.04)',
        'warm': '0 8px 24px rgba(30, 27, 24, 0.06)',
        'warm-lg': '0 16px 40px rgba(30, 27, 24, 0.09)',
        'glow-gold': '0 0 25px rgba(216, 162, 74, 0.25)',
        'glow-saffron': '0 0 25px rgba(197, 106, 45, 0.25)',
      },
      animation: {
        'steam-slow': 'steam 4s ease-in-out infinite',
        'steam-delayed': 'steam 4.5s ease-in-out 1.5s infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1) scaleY(1)', opacity: '0' },
          '20%': { opacity: '0.6' },
          '50%': { transform: 'translateY(-20px) scaleX(1.1) scaleY(1.1)', opacity: '0.4' },
          '100%': { transform: 'translateY(-45px) scaleX(1.3) scaleY(1.2)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
