/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffdf0',
          100: '#fff9c2',
          200: '#fff285',
          300: '#ffe547',
          400: '#ffd700',
          500: '#f5b800',
          600: '#d48b00',
          700: '#a86100',
          800: '#7e4504',
          900: '#643708',
          metallic: '#D4AF37',
          pure: '#FFD700',
          foil: '#FFE57F',
        },
        obsidian: {
          950: '#070709',
          900: '#0C0C0F',
          800: '#14141A',
          700: '#1C1C24',
          600: '#2A2A36',
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFE57F 0%, #FFD700 50%, #B8860B 100%)',
        'gold-metallic': 'linear-gradient(90deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        'dark-glass': 'linear-gradient(180deg, rgba(20, 20, 26, 0.75) 0%, rgba(12, 12, 15, 0.9) 100%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'gold-shimmer': 'goldShimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 215, 0, 0.25)' },
          '50%': { boxShadow: '0 0 35px rgba(255, 215, 0, 0.6)' },
        },
        goldShimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
