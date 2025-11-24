import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#05060a",
        graphite: "#11131b",
        onyx: "#181b24",
        accent: {
          pink: "#ff007f",
          magenta: "#ff72d2",
          cyan: "#4de9ff"
        },
        stroke: "rgba(255,255,255,0.12)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"]
      },
      borderRadius: {
        glass: "1rem",
        pill: "999px"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(255, 114, 210, 0.25)",
        cyan: "0 15px 45px rgba(77, 233, 255, 0.3)",
        card: "0 30px 80px rgba(5, 6, 10, 0.65)"
      },
      backgroundImage: {
        "gradient-mesh":
          "radial-gradient(circle at 20% 20%, rgba(77, 233, 255, 0.2), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255, 114, 210, 0.2), transparent 40%), radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.06), transparent 55%)",
        "grid-lines":
          "linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        },
        blob: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "33%": { transform: "scale(1.05) translate(10px, -15px)" },
          "66%": { transform: "scale(0.95) translate(-10px, 10px)" },
          "100%": { transform: "scale(1) translate(0, 0)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        blob: "blob 12s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
