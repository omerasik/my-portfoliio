"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-edge/20 bg-card/50 backdrop-blur transition-all duration-300 hover:border-cy/50 hover:shadow-glow-cy"
    >
      <span className="relative h-[18px] w-[18px]">
        {mounted && (
          <>
            <Sun
              size={18}
              className={`absolute inset-0 text-cy transition-all duration-500 ${
                theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            />
            <Moon
              size={18}
              className={`absolute inset-0 text-vi transition-all duration-500 ${
                theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
              }`}
            />
          </>
        )}
      </span>
    </button>
  );
}
