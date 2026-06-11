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
        a1:   "rgb(var(--a1) / <alpha-value>)",
        a2:   "rgb(var(--a2) / <alpha-value>)",
        a3:   "rgb(var(--a3) / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "monospace"]
      },
      boxShadow: {
        "glow-a1": "0 0 36px rgb(var(--a1) / 0.35)",
        "glow-a2": "0 0 36px rgb(var(--a2) / 0.35)",
        "glow-a3": "0 0 30px rgb(var(--a3) / 0.3)",
        card: "0 20px 60px rgb(0 0 0 / 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
