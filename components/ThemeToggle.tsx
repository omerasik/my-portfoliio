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
      className="btn-chamfer flex h-10 w-10 items-center justify-center border border-edge/25 bg-card/50 backdrop-blur transition-colors duration-300 hover:border-a1/50"
    >
      <span className="relative h-[16px] w-[16px]">
        {mounted && (
          <>
            <Sun
              size={16}
              className={`absolute inset-0 text-a3 transition-all duration-500 ${
                theme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            />
            <Moon
              size={16}
              className={`absolute inset-0 text-a2 transition-all duration-500 ${
                theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
              }`}
            />
          </>
        )}
      </span>
    </button>
  );
}
