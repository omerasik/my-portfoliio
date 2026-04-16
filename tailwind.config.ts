import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void:    "#070711",
        deep:    "#0C0C1A",
        surface: "#111127",
        rim:     "#1C1C38",
        accent: {
          violet: "#8B5CF6",
          indigo: "#6D28D9",
          lime:   "#CCFF00",
          teal:   "#00D4AA",
        },
        ink:     "#F1F0FF",
        muted:   "rgba(241,240,255,0.45)",
        border:  "rgba(139,92,246,0.18)"
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "noise":      "url('/noise.png')",
        "grid-void":  "linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)",
        "radial-glow":"radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109,40,217,0.35), transparent)",
        "grad-v":     "linear-gradient(180deg, rgba(139,92,246,0.12) 0%, transparent 60%)",
        "lime-glow":  "radial-gradient(circle at 80% 50%, rgba(204,255,0,0.12), transparent 50%)",
      },
      boxShadow: {
        "violet": "0 0 40px rgba(139,92,246,0.4)",
        "lime":   "0 0 30px rgba(204,255,0,0.35)",
        "teal":   "0 0 25px rgba(0,212,170,0.3)",
        "card":   "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        "card-hover": "0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      keyframes: {
        "rotate-y": {
          "0%":   { transform: "rotateY(0deg) rotateX(10deg)" },
          "100%": { transform: "rotateY(360deg) rotateX(10deg)" }
        },
        "rotate-cube": {
          "0%":   { transform: "rotateX(0deg) rotateY(0deg)" },
          "35%":  { transform: "rotateX(180deg) rotateY(90deg)" },
          "70%":  { transform: "rotateX(270deg) rotateY(200deg)" },
          "100%": { transform: "rotateX(360deg) rotateY(360deg)" }
        },
        "float-up": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" }
        },
        "grain": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "30%": { transform: "translate(3%, 2%)" },
          "50%": { transform: "translate(-1%, 4%)" },
          "70%": { transform: "translate(2%, -2%)" },
          "90%": { transform: "translate(-3%, 1%)" }
        },
        "marquee": {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "pulse-ring": {
          "0%":   { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(2.2)", opacity: "0" }
        },
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "41%": { opacity: "1" },
          "42%": { opacity: "0.6" },
          "43%": { opacity: "1" },
          "89%": { opacity: "1" },
          "90%": { opacity: "0.8" },
          "91%": { opacity: "1" },
        }
      },
      animation: {
        "rotate-y":    "rotate-y 12s linear infinite",
        "rotate-cube": "rotate-cube 20s ease-in-out infinite",
        "float-up":    "float-up 6s ease-in-out infinite",
        "grain":       "grain 0.5s steps(1) infinite",
        "marquee":     "marquee 22s linear infinite",
        "pulse-ring":  "pulse-ring 2s ease-out infinite",
        "flicker":     "flicker 4s linear infinite",
      }
    }
  },
  plugins: []
};

export default config;
