import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // Stepwise frame reveal linked to scroll progress
        slideshowFrame: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.96)', filter: 'blur(4px)' },
          '15%, 85%': { opacity: '1', transform: 'scale(1)', filter: 'blur(0px)' },
        },
      },
      animation: {
        'frame-scrub': 'slideshowFrame 1s linear forwards',
      },
    },
  },
  plugins: [],
}

export default config