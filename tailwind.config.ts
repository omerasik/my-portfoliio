import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:   "rgb(var(--bg) / <alpha-value>)",
        bg2:  "rgb(var(--bg2) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        edge: "rgb(var(--edge) / <alpha-value>)",
        ink:  "rgb(var(--ink) / <alpha-value>)",
        dim:  "rgb(var(--dim) / <alpha-value>)",
        cy:   "rgb(var(--cy) / <alpha-value>)",
        vi:   "rgb(var(--vi) / <alpha-value>)",
        mg:   "rgb(var(--mg) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "monospace"]
      },
      boxShadow: {
        "glow-cy": "0 0 36px rgb(var(--cy) / 0.35)",
        "glow-vi": "0 0 36px rgb(var(--vi) / 0.35)",
        "glow-mg": "0 0 30px rgb(var(--mg) / 0.3)",
        card: "0 20px 60px rgb(0 0 0 / 0.35)",
        "card-hover": "0 30px 80px rgb(0 0 0 / 0.45), 0 0 40px rgb(var(--vi) / 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
