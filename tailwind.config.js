/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        mono: ["DM Mono", "monospace"],
        display: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        accent: "#00fff0",
        danger: "#ff2d6b",
        purple: "#7b2fff",
      },
      animation: {
        "spin-slow": "spin 15s linear infinite",
        float: "float 5s ease-in-out infinite",
        blink: "blink 0.85s step-end infinite",
        marquee: "marquee 18s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        blink: {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};