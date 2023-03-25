/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        "flip-to-front": "flip-to-front 0.5s",
        "flip-to-back": "flip-to-back 0.5s",
      },
      keyframes: {
        "flip-to-front": {
          "0%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
        "flip-to-back": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
      },
      colors: {
        background: "#fff8f0",
        main: "#fff8f0",
      },
    },
  },
  variants: {
    extend: {
      transform: ["hover", "focus"],
    },
  },
  plugins: [],
};
